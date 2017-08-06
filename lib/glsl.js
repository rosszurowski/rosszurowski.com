// @flow

export function getContext (canvas: HTMLCanvasElement): WebGLRenderingContext {
  let gl = null;
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    throw new Error(`Could not get WebGL context`);
  }

  return gl;
}

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

export function createTexture (gl: WebGLRenderingContext, source: HTMLCanvasElement, index: number, textureWrap: ?number): WebGLTexture {
  const wrap = textureWrap || gl.CLAMP_TO_EDGE;
  const texture = gl.createTexture();
  gl.activeTexture(index);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  updateTexture(gl, source);

  return texture;
}

export function updateTexture (gl: WebGLRenderingContext, source: HTMLCanvasElement): void {
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
}
