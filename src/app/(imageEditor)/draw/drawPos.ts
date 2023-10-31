import { gl, positionBuffer, program, texCoordBuffer } from '../contexts';
import { scaleMatrix, translationMatrix } from '../utils/positionMatrixes';

type DrawPosProps = {
  scale: number;
  position: [number, number];
  scaleMod: [number, number];
};

const drawPos = ({ scale, scaleMod, position }: DrawPosProps) => {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  var translationMat = translationMatrix(
    position[0] / (scale * scaleMod[0]),
    position[1] / (scale * scaleMod[1]),
    0
  );
  var scaleMat = scaleMatrix(scale * scaleMod[0], scale * scaleMod[1], 1.0);

  var uTranslationMatrixLocation = gl.getUniformLocation(
    program,
    'uTranslationMatrix'
  );
  gl.uniformMatrix4fv(uTranslationMatrixLocation, false, translationMat);

  var uScaleMatrixLocation = gl.getUniformLocation(program, 'uScaleMatrix');
  gl.uniformMatrix4fv(uScaleMatrixLocation, false, scaleMat);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

export default drawPos;
