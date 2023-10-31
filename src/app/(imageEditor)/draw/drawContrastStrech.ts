import { canvasElementId } from '@/constants';
import { gl, program } from '@/app/(imageEditor)/contexts';
import getMinMaxFromImage from '@/app/(imageEditor)/utils/getMinMax';

const setContrastStrech = () => {
  const canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;

  const [min, max] = getMinMaxFromImage(canvas.width, canvas.height, 1, gl);

  const uMinLocation = gl.getUniformLocation(program, 'u_min');
  gl.uniform1f(uMinLocation, min);

  const uMaxLocation = gl.getUniformLocation(program, 'u_max');
  gl.uniform1f(uMaxLocation, max);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

export default setContrastStrech;
