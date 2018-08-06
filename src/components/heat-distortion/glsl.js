// @flow

export type WebGLTexture2DSource =
  | HTMLCanvasElement
  | HTMLImageElement
  | HTMLVideoElement;
export type WebGLUniformType = '1f' | '2f' | '3f';

export function getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
  let gl = null;
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    throw new Error(`Could not get WebGL context`);
  }

  return gl;
}

export function createShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number,
): WebGLShader {
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

export function createProgram(
  gl: WebGLRenderingContext,
  fragmentShader: WebGLShader,
  vertexShader: WebGLShader,
): WebGLProgram {
  const program: WebGLProgram = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) || '';
    gl.deleteProgram(program);
    throw new Error(`Could not link shader program: ${log}`);
  }

  gl.useProgram(program);

  return program;
}

export function createTexture(
  gl: WebGLRenderingContext,
  source: WebGLTexture2DSource,
  textureWrap: ?number,
): WebGLTexture {
  const wrap =
    textureWrap === undefined || textureWrap === null
      ? gl.CLAMP_TO_EDGE
      : textureWrap;
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  updateTexture(gl, source);

  return texture;
}

export function updateTexture(
  gl: WebGLRenderingContext,
  source: WebGLTexture2DSource,
) {
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
}

export function createUniform(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  type: WebGLUniformType,
  name: string,
  ...args: any
) {
  const location = gl.getUniformLocation(program, name);
  // $FlowFixMe: support computed property method calls
  gl[`uniform${type}`](location, ...args);
}

export function setRectangle(
  gl: WebGLRenderingContext,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW,
  );
}
