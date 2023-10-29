import { useParams } from "next/navigation";
import { SyntheticEvent, TouchEventHandler, WheelEventHandler, useEffect, useRef, useState } from "react";
import { fragmentShaderSource, vertexShaderSource } from "@/components/ImageEditor/WebGLEditor/shaders";
import useSliderStore from "../store";
import { canvasElementId } from "@/constants";
import { compileShader, isPowerOf2 } from "./utils";
import { scaleMatrix, translationMatrix } from "./positionMatrixes";

let gl: WebGLRenderingContext;
let program: WebGLProgram;
let positionBuffer: WebGLBuffer | null;
let texCoordBuffer: WebGLBuffer | null;

var tx = 0.0; // Translate 0.5 units to the right.
var ty = 0.0; // No vertical movement.
var tz = 0.0; // No depth movement in this 2D example.
var scaleX = 2.0; // Double the size (zoom in).
var scaleY = 2.0; // Double the size (zoom in).
var scaleZ = 1.0; // No depth scale in this 2D example.


type RenderProps = {
  brightness: number;
  contrast: number;
  exposure: number;
  scale: number;
  position: [number, number];
}

const draw = ({ brightness, contrast, exposure, scale, position } 
  : RenderProps
  ) => {

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set shader uniform values
  const brightnessLocation = gl.getUniformLocation(program, 'u_brightness');
  gl.uniform1f(brightnessLocation, brightness);

  const contrastLocation = gl.getUniformLocation(program, 'u_contrast');
  gl.uniform1f(contrastLocation, contrast);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  var translationMat = translationMatrix(tx, ty, tz);
  var scaleMat = scaleMatrix(scale, scale, 1.0);

  // Get uniform locations and set the matrices.
  var uTranslationMatrixLocation = gl.getUniformLocation(program, 'uTranslationMatrix');
  gl.uniformMatrix4fv(uTranslationMatrixLocation, false, translationMat);

  var uScaleMatrixLocation = gl.getUniformLocation(program, 'uScaleMatrix');
  gl.uniformMatrix4fv(uScaleMatrixLocation, false, scaleMat);

  // Clear the canvas and draw the triangle.
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const EditorImage = () => {
  
  const params = useParams();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosStart = useRef([0, 0]);
  const isDragging = useRef(false);

  const { brightness, contrast, exposure } = useSliderStore(state => state);
  const [ imageSize, setImageSize] = useState([0, 0]);
  const [ position, setPosition ] = useState<[number, number]>([0, 0]); //x, y
  const [ scale, setScale ] = useState(1);

  useEffect(() => {

    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = 600;

    const glCntx = canvas.getContext('webgl');

    if (!glCntx) {
      console.error("WebGL not supported");
      return;
    }

    gl = glCntx;

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER, gl);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER, gl);

    if(!vertexShader || !fragmentShader) {
      return;
    }

    // Link shaders to program
    const glProgram = gl.createProgram();

    if(!glProgram) {
      return;
    }

    program = glProgram;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create buffers
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,
      1.0, -1.0,
      -1.0, 1.0,
      -1.0, 1.0,
      1.0, -1.0,
      1.0, 1.0
    ]), gl.STATIC_DRAW);

    texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0, 1.0,
      1.0, 1.0,
      0.0, 0.0,
      0.0, 0.0,
      1.0, 1.0,
      1.0, 0.0
    ]), gl.STATIC_DRAW);

    // Load Image
    const image = new Image();
    image.src = `/api/image/${params.name}`;
    image.onload = () => {
      setImageSize([image.width, image.height]);
    //  canvas.width = image.width;
    //  canvas.height = image.height;
    
      const ratioX = canvas.width / image.width;
      const ratioY = canvas.height / image.height;
      console.log('ratioX ratioY', ratioY, ratioX);

    //  gl.viewport(0, 0, image.width, image.height);
      
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }

    /*  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);*/
      
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      
      draw({brightness, contrast, exposure, position, scale});

    };

  }, [params.name]);

  useEffect(() => {
    
    draw({brightness, contrast, exposure, position, scale});

  }, [brightness, contrast, scale, position]);

  const wheelHandler = (e: any) => {

    console.log('wheelHandler', e);

    if(e.deltaY > 0) {
      setScale((prev) => prev - 0.05);

    } else {  
      
      setScale((prev) => prev + 0.05);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  const dragStartHandler = (e: MouseEvent<HTMLCanvasElement, MouseEvent>) => {

    isDragging.current = true;
    mousePosStart.current = [e.pageX, e.pageY];
  }

  const dragEndHandler = (e: any) => {
    
    isDragging.current = false;
  }

  const dragHandler = (e: any) => {
    if(!isDragging.current || !canvasRef.current) return;

    const deltaX = e.pageX - mousePosStart.current[0];
    const deltaY = e.pageY - mousePosStart.current[1];

    tx += deltaX / canvasRef.current.width * 2;
    ty -= deltaY / canvasRef.current.height * 2;

    mousePosStart.current = [e.pageX, e.pageY];

    draw({ brightness, contrast, exposure, position, scale });
  }

  const touchStartHandler = (e: TouchEvent<HTMLCanvasElement>) => {
      if (e.touches.length !== 1) return; // Single touch only

      isDragging.current = true;
      mousePosStart.current = [e.touches[0].pageX, e.touches[0].pageY];
  };

  const touchMoveHandler = (e: TouchEvent<HTMLCanvasElement>) => {
      if (e.touches.length !== 1 || !canvasRef.current) return; // Single touch only

      const deltaX = e.touches[0].pageX - mousePosStart.current[0];
      const deltaY = e.touches[0].pageY - mousePosStart.current[1];

      tx += deltaX / canvasRef.current.width * 2; // Normalize for WebGL clip space [-1, 1]
      ty -= deltaY / canvasRef.current.height * 2; // Invert Y and normalize

      mousePosStart.current = [e.touches[0].pageX, e.touches[0].pageY];  // Reset the start position

      draw({ brightness, contrast, exposure, position, scale });
  };

  return <div
      className="w-full h-full"
    >
      <canvas
        onTouchStart={touchStartHandler}
        onTouchEnd={dragEndHandler}
        onTouchMove={touchMoveHandler}
        onMouseDown={dragStartHandler} 
        onMouseUp={dragEndHandler} 
        onMouseMove={dragHandler}
        onWheel={wheelHandler} 
        id={canvasElementId} 
        ref={canvasRef}>
      </canvas>
    </div>
}

export default EditorImage;