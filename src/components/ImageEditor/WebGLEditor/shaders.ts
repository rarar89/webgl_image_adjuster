export const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  uniform mat4 uTranslationMatrix;
  uniform mat4 uScaleMatrix;
  void main() {
    gl_Position = uScaleMatrix * uTranslationMatrix * vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

export const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_image;
  uniform float u_brightness;
  uniform float u_contrast;
  uniform float u_exposure;
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    color.rgb += u_brightness;
    color.rgb = ((color.rgb - 0.5) * max(u_contrast, 0.0)) + 0.5;
    gl_FragColor = color;
  }
`;