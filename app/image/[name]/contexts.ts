export let gl: WebGLRenderingContext;
export let program: WebGLProgram;
export let positionBuffer: WebGLBuffer;
export let texCoordBuffer: WebGLBuffer;

export const setGL = (newGL: WebGLRenderingContext) => {
  gl = newGL;
};

export const setProgram = (newProgram: WebGLProgram) => {
  program = newProgram;
};

export const setPositionBuffer = (newPositionBuffer: WebGLBuffer) => {
  positionBuffer = newPositionBuffer;
};

export const setTexCoordBuffer = (newTexCoordBuffer: WebGLBuffer) => {
  texCoordBuffer = newTexCoordBuffer;
};
