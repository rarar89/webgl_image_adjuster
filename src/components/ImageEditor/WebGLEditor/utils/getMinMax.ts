export const getMinMaxFromImage = (
  width: number,
  height: number,
  scale: number,
  gl: WebGLRenderingContext
): [number, number] => {
  let pixels = new Uint8Array(width * height * 4);

  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  let minVal = 255;
  let maxVal = 0;

  for (let i = 0, len = pixels.length; i < len; i += 4) {
    let r = pixels[i] / 255;
    let g = pixels[i + 1] / 255;
    let b = pixels[i + 2] / 255;
    let avg = (r + g + b) / 3.0;

    if (avg === 0) {
      continue;
    }

    if (avg < minVal) minVal = avg;
    if (avg > maxVal) maxVal = avg;
  }

  return [minVal, maxVal];
};

export default getMinMaxFromImage;
