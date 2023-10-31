import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  fragmentShaderSource,
  vertexShaderSource,
} from '@/components/ImageEditor/WebGLEditor/shaders';
import { canvasElementId } from '@/constants';
import { compileShader } from '../utils/compileShader';
import { useShallow } from 'zustand/react/shallow';
import {
  gl,
  setGL,
  positionBuffer,
  setPositionBuffer,
  program,
  setProgram,
  texCoordBuffer,
  setTexCoordBuffer,
} from '../contexts';
import drawPos from '../draw/drawPos';
import useEditorStore from '../../store';

const EditorImage = () => {
  const params = useParams();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosStart = useRef([0, 0]);
  const isDragging = useRef(false);
  const scaleMod = useRef<[number, number]>([1, 1]);
  const scale = useRef(1);
  const position = useRef<[number, number]>([0, 0]);

  const { setImageState } = useEditorStore(
    useShallow((state) => ({ setImageState: state.setImageState }))
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    setImageState('loading');

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = 600;

    const glToSet = canvas.getContext('webgl', { preserveDrawingBuffer: true });

    if (!glToSet) {
      console.error('WebGL not supported');
      return;
    }
    setGL(glToSet);

    const vertexShader = compileShader(
      vertexShaderSource,
      gl.VERTEX_SHADER,
      gl
    );
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER,
      gl
    );

    if (!vertexShader || !fragmentShader) {
      return;
    }

    // Link shaders to program
    const programToSet = gl.createProgram();

    if (!programToSet) {
      return;
    }
    setProgram(programToSet);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    // Create buffers
    const positionBufferToSet = gl.createBuffer();

    if (!positionBufferToSet) {
      throw new Error('posBuffer is null');
    }

    setPositionBuffer(positionBufferToSet);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const texCoordBufferToSet = gl.createBuffer();
    if (!texCoordBufferToSet) {
      throw new Error('texBuffer is null');
    }
    setTexCoordBuffer(texCoordBufferToSet);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0,
      ]),
      gl.STATIC_DRAW
    );

    // Load Image
    const image = new Image();
    image.src = `/api/image/${params.name}`;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const canvasAspectRatio = canvas.width / canvas.height;
      let scaleX, scaleY;

      if (canvasAspectRatio > aspectRatio) {
        scaleY = 1;
        scaleX = aspectRatio / canvasAspectRatio;
      } else {
        scaleX = 1;
        scaleY = canvasAspectRatio / aspectRatio;
      }

      scaleMod.current = [scaleX, scaleY];

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );

      const uMinLocation = gl.getUniformLocation(program, 'u_min');
      gl.uniform1f(uMinLocation, 0);

      const uMaxLocation = gl.getUniformLocation(program, 'u_max');
      gl.uniform1f(uMaxLocation, 1);

      setImageState('loaded');
      drawPos({
        position: position.current,
        scale: scale.current,
        scaleMod: scaleMod.current,
      });
    };
  }, [params.name, setImageState]);

  const wheelHandler = (e: any) => {
    if (e.deltaY > 0) {
      scale.current -= 0.05;
    } else {
      scale.current += 0.05;
    }

    drawPos({
      position: position.current,
      scale: scale.current,
      scaleMod: scaleMod.current,
    });
  };

  const updatePosition = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const deltaX = x - mousePosStart.current[0];
    const deltaY = y - mousePosStart.current[1];

    position.current[0] += (deltaX / width) * 2;
    position.current[1] -= (deltaY / height) * 2;

    mousePosStart.current = [x, y];
    drawPos({
      position: position.current,
      scale: scale.current,
      scaleMod: scaleMod.current,
    });
  };

  const dragStartHandler = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    isDragging.current = true;
    mousePosStart.current = [e.pageX, e.pageY];
  };

  const dragEndHandler = () => (isDragging.current = false);

  const dragHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDragging.current || !canvasRef.current) return;

    updatePosition(
      e.pageX,
      e.pageY,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const touchStartHandler = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return; // Single touch only

    isDragging.current = true;
    mousePosStart.current = [e.touches[0].pageX, e.touches[0].pageY];
  };

  const touchMoveHandler = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1 || !canvasRef.current) return;

    updatePosition(
      e.touches[0].pageX,
      e.touches[0].pageY,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div>
      <canvas
        onTouchStart={touchStartHandler}
        onTouchEnd={dragEndHandler}
        onTouchMove={touchMoveHandler}
        onMouseDown={dragStartHandler}
        onMouseUp={dragEndHandler}
        onMouseMove={dragHandler}
        onWheel={wheelHandler}
        id={canvasElementId}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default EditorImage;
