attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;

vec2 toClipSpace(vec2 position, vec2 resolution) {
  vec2 zeroToOne = a_position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipspace = (zeroToTwo - 1.0) * vec2(1, -1);
  return clipspace;
}

void main() {
  gl_Position = vec4(toClipSpace(a_position, u_resolution), 0.0, 1.0);
  v_texCoord = a_texCoord;
}
