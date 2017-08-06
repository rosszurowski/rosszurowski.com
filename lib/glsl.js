// @flow

export function createShader (gl: WebGLRenderingContext, source: string, type: number): WebGLShader {
  const shader: WebGLShader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) || '';
    console.error(`Could not compile WebGL shader: ${info}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createProgram (gl: WebGLRenderingContext, fragmentShader: WebGLShader, vertexShader: WebGLShader): WebGLProgram {
  const program: WebGLProgram = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) || '';
    throw new Error(`Could not link shader program: ${log}`);
  }

  gl.useProgram(program);

  return program;
}
