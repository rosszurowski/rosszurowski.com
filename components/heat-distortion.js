import React, { Component } from 'react';
import fit from 'canvas-fit';

const fragShader = `
precision mediump float;

uniform float u_time;
varying vec2 v_position;
uniform sampler2D u_image;
uniform sampler2D u_maps;
uniform sampler2D u_noise;
uniform sampler2D u_content;
uniform int u_contentLoaded;
uniform vec2 u_contentSize;
uniform vec2 u_contentPos;
uniform int u_noiseSize;
uniform float u_dpi;
uniform vec2 u_noiseR;
uniform vec2 u_noiseG;
uniform vec2 u_noiseB;
uniform vec2 u_resolution;

vec2 pos(){
  return vec2(0.0,0.0);
}

vec4 blend(vec4 bg,vec4 fg) {
  vec3 bgm=bg.rgb*bg.a;
  vec3 fgm=fg.rgb*fg.a;
  float ia=1.0-fg.a;
  float a=(fg.a + bg.a * ia);
  vec3 rgb;
  if(a!=0.0){
    rgb=(fgm + bgm * ia) / a;
    }else{
      rgb=vec3(0.0,0.0,0.0);
    }
    return vec4(rgb,a);
  }

  vec2 pixel(){
    return vec2(1.0*u_dpi)/u_resolution;
  }
  vec2 ratio(){
    return vec2(u_resolution.x/u_resolution.y,u_resolution.y/u_resolution.x);
  }

  float wave(float x,float freq, float speed){
    return sin(x*freq+((u_time*(3.1415/2.0))*speed));
  }
  vec2 waves(vec2 pos,bool masked){
    float mask=texture2D(u_maps,pos).b;

    vec2 intensity=vec2(2.0,1.0)*pixel();

    vec2 waves=vec2(
      wave(pos.y,190.0,0.35),
      wave(pos.x,100.0,0.4)
      );
      return pos+(waves*intensity*(masked?mask:1.0));
    }
    float getNoise(vec2 offset){
      float noisePixel=(1.0/float(u_noiseSize))*0.7;
      return texture2D(u_noise,(gl_FragCoord.xy+offset)*noisePixel).r;
    }
    vec2 getContentPos(vec2 pos){
      vec2 pixelPos=pos*u_resolution;
      return (pixelPos-u_contentPos)/u_contentSize;
    }
    void main(){
      vec2 pos=v_position.xy;

      vec2 turbulence=waves(pos,true);
      vec4 c=texture2D(u_image,turbulence);

      float noiseIntensity=0.1;
      vec3 noise = vec3(getNoise(u_noiseR),getNoise(u_noiseG),getNoise(u_noiseB));
      vec3 il = vec3(1.0)-c.rgb;
      vec3 noiseLightIntensity=il*noiseIntensity;
      c.rgb += noiseLightIntensity.rgb*noise;

      float vdepth=texture2D(u_maps,pos).g;
      float threshold=0.5;
      float thresholdLimit=0.1;
      float thresholdSize=threshold-thresholdLimit;
      if(vdepth<threshold){
        float amult=clamp(1.0-(vdepth-thresholdLimit)/thresholdSize,0.0,1.0);

        if(u_contentLoaded==1){
          float wavep=0.3;

          vec2 contentPos=getContentPos(waves(pos,false)*wavep+(1.0-wavep)*pos);
          vec2 contentPosNoWaves=getContentPos(pos);
          contentPos=contentPos*contentPosNoWaves.y+contentPosNoWaves*(1.0-contentPosNoWaves.y);
          if(contentPos.x>=0.0 && contentPos.x<=1.0 && contentPos.y>=0.0 && contentPos.y<=1.0){
            vec4 content=texture2D(u_image,contentPos);
            c=blend(c,vec4(content.rgb,content.a*amult));
          }
        }
      }

      gl_FragColor=vec4(c.rgb,1.0);
    }
`;

const vertShader = `
  precision mediump float;

  attribute vec2 a_position;
  varying vec2 v_position;

  void main() {
    v_position=(a_position+1.0)*0.5;
    v_position.y=1.0-v_position.y;
    gl_Position = vec4(a_position,0.0,1.0);
  }
`;

const getContext = (canvas) => {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    // TODO: handle case
  }
  return gl;
};

const createShader = (gl, type, script) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, script);
  gl.compileShader(shader);

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!compiled) {
    console.error(`Error compiling shader '${shader.name}': ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const createProgram = (gl, vertexSource, fragmentSource) => {
  const vert = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const frag = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);

  gl.linkProgram(program);

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!linked) {
    console.error(`Error linking program: ${gl.getProgramInfoLog(program)}`);
    gl.deleteProgram(program);
    return null;
  }

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    1.0, 1.0,
  ]), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  // Create a buffer for the position of the rectangle corners.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  return program;
};

const createUniform = (gl, program, type, name, ...args) => {
  const location = gl.getUniformLocation(program, `u_${name}`);
  gl[`uniform${type}`](location, ...args);
};

const draw = (gl) => {
  const x1 = -1;
  const x2 = -1 + 2;
  const y1 = -1;
  const y2 = -1 + 2;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2]),
  gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const createTexture = (gl, source, index) => {
  const wrap = gl.REPEAT;

  const texture = gl.createTexture();
  gl.activeTexture(gl[`TEXTURE${index}`]);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

  return texture;
};

const loadTexture = (gl, program, name, index, url) => new Promise((resolve) => {
  const image = new Image();

  image.onload = () => {
    createUniform(gl, program, '1i', name, index);

    const texture = processTexture(gl, index, image, 600, 600);
    createUniform(gl, program, '1i', 'contentLoaded', 1);
    createUniform(gl, program, '2f', 'contentPos', 0, 0);
    createUniform(gl, program, '2f', 'contentSize', 600, 600);
    resolve(texture);
  };

  image.src = url;
});

const processTexture = (gl, index, image, width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  ctx.drawImage(
    image,
    0, 0,
    image.width, image.height,
  );

  createTexture(gl, canvas, index);
};

const getRenderableSVG = (html, width, height) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${html}
      </div>
    </foreignObject>
  </svg>
`;

const renderHTMLToCanvas = ({ createObjectURL, revokeObjectURL }, ctx) => (html) => {
  const data = getRenderableSVG(html, ctx.canvas.width, ctx.canvas.height);
  const img = new Image();
  const svg = new Blob([data], { type: 'image/svg+xml' });
  const url = createObjectURL(svg);

  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    revokeObjectURL(url);
  };

  img.src = url;
};

export default class HeatDistortion extends Component {
  componentDidMount () {
    const w = window.URL || window.webkitURL || window;

    this.fit = fit(this.canvas, window, window.devicePixelRatio);
    this.ctx = this.canvas.getContext('2d');
    this.renderHTML = renderHTMLToCanvas(w, this.ctx);

    this.draw();

    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize, false);
  }

  ctx = null
  fit = null

  handleResize = () => {
    this.fit();
    this.draw();
  }

  draw = () => {
    this.renderHTML(`
      <div style="padding: 80px; font-size: 300px; font-family: 'Calibre', sans-serif;">
        <span style="color:white;">hello</span>
      </div>
    `);
  }

  renderHTML = null

  render () {
    return <canvas ref={el => (this.canvas = el)} width={600} height={600} />;
  }
}
