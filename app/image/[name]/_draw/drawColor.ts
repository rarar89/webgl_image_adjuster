import {
  gl,
  positionBuffer,
  program,
  texCoordBuffer,
} from '@/image/[name]/contexts';

type drawColorProps = {
  brightness: number;
  exposure: number;
};

const drawColor = ({ brightness, exposure }: drawColorProps) => {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const brightnessLocation = gl.getUniformLocation(program, 'u_brightness');
  gl.uniform1f(brightnessLocation, brightness);

  const exposureLocation = gl.getUniformLocation(program, 'u_exposure');
  gl.uniform1f(exposureLocation, exposure);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

export default drawColor;
