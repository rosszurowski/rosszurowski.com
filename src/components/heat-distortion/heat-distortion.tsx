import fit from "./fit"
import type { WebGLTexture2DSource } from "./glsl"
import {
  createProgram,
  createShader,
  createTexture,
  createUniform,
  getContext,
  setRectangle,
} from "./glsl"
import getImage from "./image"

const fragmentSource = `
  precision mediump float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform sampler2D u_image;

  varying vec2 v_texCoord;

  vec2 pixel() {
    float dpi = 2.0;
    return vec2(1.0 * dpi) / u_resolution;
  }

  float wave(float val, float freq, float speed) {
    return sin(val * freq + ((u_time * (3.141 / 2.0)) * speed));
  }

  vec2 waves(vec2 pos) {
    vec2 intensity = vec2(4, 2) * pixel();
    vec2 waves = vec2(
      wave(pos.y, 200.0, 0.02),
      wave(pos.x, 80.0, 0.05)
    );

    return pos + (waves * intensity);
  }

  void main() {
    vec4 color = texture2D(u_image, waves(v_texCoord));

    gl_FragColor = color;
  }
`

const vertexSource = `
  precision mediump float;

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
`

type Scene = {
  program: WebGLProgram
  attributes: Record<string, number>
  buffers: Record<string, WebGLBuffer>
  uniforms: Record<string, WebGLUniformLocation>
}

const initScene = (
  gl: WebGLRenderingContext,
  textureSource: WebGLTexture2DSource
): Scene => {
  const width = gl.canvas.width
  const height = gl.canvas.height

  const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER)
  const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER)

  const program = createProgram(gl, fragmentShader, vertexShader)
  gl.useProgram(program)

  /**
   * Program code
   */

  const buffers: Record<string, WebGLBuffer> = {}
  const bufferA = gl.createBuffer()
  if (!bufferA) {
    throw new Error("Failed to create buffer")
  }
  buffers.position = bufferA
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  setRectangle(gl, 0, 0, width, height)

  const bufferTex = gl.createBuffer()
  if (!bufferTex) {
    throw new Error("Failed to create buffer")
  }
  buffers.texCoord = bufferTex
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoord)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]),
    gl.STATIC_DRAW
  )

  createTexture(gl, textureSource)

  const uniforms: Record<string, WebGLUniformLocation> = {}
  const uRes = gl.getUniformLocation(program, "u_resolution")
  const uTime = gl.getUniformLocation(program, "u_time")
  if (!uRes || !uTime) {
    throw new Error("Failed to get uniforms")
  }
  uniforms.resolution = uRes
  uniforms.time = uTime

  gl.viewport(0, 0, width, height)
  gl.clearColor(0, 0.0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
  gl.enable(gl.BLEND)
  gl.disable(gl.DEPTH_TEST)

  const attributes: Record<string, number> = {}
  attributes.position = gl.getAttribLocation(program, "a_position")
  attributes.texCoord = gl.getAttribLocation(program, "a_texCoord")

  gl.enableVertexAttribArray(attributes.position)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 0, 0)

  gl.enableVertexAttribArray(attributes.texCoord)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoord)
  gl.vertexAttribPointer(attributes.texCoord, 2, gl.FLOAT, false, 0, 0)

  gl.uniform2f(uniforms.resolution, width, height)
  gl.uniform1f(uniforms.time, 0)

  draw(gl)

  return { program, attributes, buffers, uniforms }
}

const draw = (gl: WebGLRenderingContext) => {
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

type Renderer = (width: number, height: number) => Promise<HTMLImageElement>

function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: number | null = null
  return function (this: any, ...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay)
  } as F
}

/**
 * HeatDistortionProgram renders an image with a heat distortion ripple effect.
 * Requires a canvas and a function that returns a Promise for an image.
 */
export default class HeatDistortionProgram {
  $canvas: HTMLCanvasElement
  gl: WebGLRenderingContext
  renderer: Renderer
  program: WebGLProgram | null = null
  attributes: Record<string, number> = {}
  buffers: Record<string, WebGLBuffer> = {}
  uniforms: Record<string, WebGLUniformLocation> = {}
  tickId: number | null = null
  frame = 0
  isSetup = false
  resizeCanvas: () => void
  resizeProgram: () => void

  constructor(canvas: HTMLCanvasElement, svg: string) {
    this.$canvas = canvas
    this.renderer = getImage.bind(getImage, svg)
    this.gl = getContext(canvas)
    this.gl.viewport(0, 0, canvas.width, canvas.height)
    if (!canvas.parentElement) {
      throw new Error("Failed to find canvas parent")
    }
    this.resizeCanvas = fit(
      canvas,
      canvas.parentElement,
      window.devicePixelRatio
    )
    this.resizeProgram = debounce(this.resize.bind(this), 50)
    window.addEventListener("resize", this.resizeCanvas, false)
    window.addEventListener("resize", this.resizeProgram, false)
  }

  /**
   * Start the program.
   */
  async setup() {
    if (this.isSetup) {
      return
    }
    const image = await this.renderer(this.$canvas.width, this.$canvas.height)
    const scene = initScene(this.gl, image)
    this.program = scene.program
    this.attributes = scene.attributes
    this.buffers = scene.buffers
    this.uniforms = scene.uniforms
    this.isSetup = true
  }

  _tick = () => {
    const { gl, program, frame } = this
    if (!program) {
      return
    }

    createUniform(gl, program, "1f", "u_time", frame)
    draw(gl)

    this.frame++
    this.tickId = requestAnimationFrame(this._tick)
  }

  stop() {
    if (this.tickId) {
      cancelAnimationFrame(this.tickId)
      this.tickId = null
    }
  }

  start() {
    if (!this.tickId) {
      this._tick()
    }
  }

  /**
   * End the animation and clear the tick timer.
   */
  destroy() {
    if (this.tickId) {
      cancelAnimationFrame(this.tickId)
      this.tickId = null
    }
    window.removeEventListener("resize", this.resize)
    window.removeEventListener("resize", this.resizeProgram)
  }

  /**
   * Reset the program with new width and height variables.
   */
  resize() {
    if (!this.$canvas) {
      return
    }

    const { width, height } = this.$canvas
    const { gl, buffers, uniforms } = this

    if (!buffers || !uniforms) {
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    setRectangle(gl, 0, 0, width, height)
    this.renderer(width, height).then((image) => {
      createTexture(gl, image)
    })
    gl.uniform2f(uniforms.resolution, width, height)
    gl.viewport(0, 0, width, height)
  }
}
