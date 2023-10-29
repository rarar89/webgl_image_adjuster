export const compileShader = (source: string, type: number, gl: WebGLRenderingContext) => {
  var shader = gl.createShader(type);

  if(!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const isPowerOf2 = (value: number) => {
  return (value & (value - 1)) === 0;
}

export const getMinMaxFromImage = (width: number, height: number, gl: WebGLRenderingContext) => {
  let pixels = new Uint8Array(width * height * 4);

  console.log('gl', gl);

  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  let minVal = 255;
  let maxVal = 0;

  for (let i = 0, len = pixels.length; i < len; i += 4) {
    let r = pixels[i] / 255;
    let g = pixels[i + 1] / 255;
    let b = pixels[i + 2] / 255;
    let avg = (r + g + b) / 3.0;

    if (avg < minVal) minVal = avg;
    if (avg > maxVal) maxVal = avg;
  }
  
  console.log('minVal', minVal);
  console.log('maxVal', maxVal);

  return [minVal, maxVal];
};