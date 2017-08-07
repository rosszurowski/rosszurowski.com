precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_image;

varying vec2 v_texCoord;

vec2 pixel() {
  float dpi = 2.0;
  return vec2(1.0 * dpi) / u_resolution;
}

float wave(float x, float freq, float speed) {
  return sin(x * freq + ((u_time * (3.141 / 2.0)) * speed));
}

vec2 waves(vec2 pos) {
  float mask = texture2D(u_image, pos).b;
  vec2 intensity = vec2(2.0, 1.0) * pixel();
  vec2 waves = vec2(
    wave(pos.y, 190.0, 0.35),
    wave(pos.x, 100.0, 0.4)
  );

  return pos + (waves * intensity);
}

vec2 depth(vec2 pos) {
  vec2 intensity = vec2(0.004, 0.004);
  float d = 0.0 - pow(texture2D(u_image, pos).r, 1.0);
  return pos + (intensity * d);
}

void main() {
  vec2 turbulence = waves(depth(v_texCoord));
  gl_FragColor = texture2D(u_image, turbulence);
}
