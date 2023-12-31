export const loadImage = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  program: WebGLProgram
): { scale: [number, number] } => {
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

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  const uMinLocation = gl.getUniformLocation(program, 'u_min');
  gl.uniform1f(uMinLocation, 0);

  const uMaxLocation = gl.getUniformLocation(program, 'u_max');
  gl.uniform1f(uMaxLocation, 1);

  return {
    scale: [scaleX, scaleY],
  };
};
