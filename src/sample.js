import samplePng from './textures/duck.png'

const canvas = document.getElementById('stage')
let gl
let shaderProgram
let triangleBuffer
let cubeBuffer
let cubeVertexIndexBuffer
let colorBuffer
let cubeColorBuffer
// let cubeTexture
let cubeVertexTextureCoordBuffer
let cubeVertexNormalBuffer
let projectionMatrix = mat4.create()
let modelViewMatrix = mat4.create()
let rotateX = 0
let rotateY = 0
let rotateZ = 0
let rotateSpeedX = 0
let rotateSpeedY = 0
let rotateSpeedZ = 0
let currentPressedKeys = {}
let cubeTextures = []
let currentCubeTextureIndex = 0
let z = -5

let cubes = []

///// Utils /////
const modelViewMatrixStack = []
function modelViewPushMatrix () {
  let copy = mat4.create()
  mat4.copy(copy, modelViewMatrix)
  modelViewMatrixStack.push(copy)
}

function modelViewPopMatrix () {
  if (modelViewMatrixStack.length === 0) {
    throw new Error('Empty model view matrix stack')
  }
  
  modelViewMatrix = modelViewMatrixStack.pop()
}

function degToRad (deg) {
  return deg / 180 * Math.PI
}

///// Shader Source /////
const vertexShaderSource = `
  attribute vec3 aVertexPosition;
  // attribute vec4 aVertexColor;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;

  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;

  uniform bool uUseLighting;

  // varying vec4 vColor;
  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  void main (void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
    // vColor = aVertexColor;
    vTextureCoord = aTextureCoord;

    if (uUseLighting) {
      vLightWeighting = vec3(1.0, 1.0, 1.0);
    } else {
      vec3 transformedNormal = uNMatrix * aVertexNormal;
      float directionalLightWeighting = max(0.0, dot(transformedNormal, uLightingDirection));
      vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
  }
`
const fragmentShaderSource = `
  precision mediump float;
  // varying vec4 vColor;
  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  uniform sampler2D uSampler;
  uniform float uAlpha;

  void main(void) {
    // gl_FragColor = vColor;
    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    // Adjust textureColor rgb value by light weight
    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
    // gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a * uAlpha);
  }
`

///// Prep Phase ///// 
function handleKeydown (e) {
  currentPressedKeys[e.keyCode] = true
  
  cubes.forEach(cube => {
    if (e.keyCode === 70) {
      cube.currentCubeTextureIndex = (cube.currentCubeTextureIndex + 1) % 3
    }
  })
}

function handleKeyup (e) {
  currentPressedKeys[e.keyCode] = false
}

function prep () {
  gl = canvas.getContext('webgl')
  
  if (!gl) {
    alert('webgl is not supported')
    return
  }
  
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('keyup', handleKeyup)
}

///// Objects /////
function createArrayBuffer (verts = [], vertsOption = {}) {
  const {
    vertDataConstructor = Float32Array,
    bindTarget = gl.ARRAY_BUFFER,
    itemSize = 1,
    numItems = verts.length
  } = vertsOption
  
  const cubeBuffer = gl.createBuffer()
  gl.bindBuffer(bindTarget, cubeBuffer)
  
  gl.bufferData(bindTarget, new vertDataConstructor(verts), gl.STATIC_DRAW)
  cubeBuffer.info = {
    itemSize,
    numItems
  }

  return cubeBuffer
}

class Cube {
  constructor (options = {}) {
    let {
      isBlend = false,
      x = 0,
      y = 0,
      z = 0
    } = options

    this.isBlend = isBlend

    // position
    this.x = x
    this.y = y
    this.z = z

    // rotate speeds
    this.rotateSpeedX = 0
    this.rotateSpeedY = 0
    this.rotateSpeedZ = 0

    // rotate radius
    this.rotateX = 0
    this.rotateY = 0
    this.rotateZ = 0

    // vertex buffer
    this.cubeBuffer = null

    // normal buffer
    this.cubeVertexNormalBuffer = null

    // texture buffer
    this.cubeVertexTextureCoordBuffer = null
    this.cubeTextures = []
    this.currentCubeTextureIndex = 0
  }

  initBuffer () {
    this.cubeBuffer = createArrayBuffer([
      // front
      -1.0, 1.0, 1.0,
      -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0,
      1.0, 1.0, 1.0,
      
      // back
      -1.0, 1.0, -1.0,
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, 1.0, -1.0,
      
      // top
      -1.0, 1.0, 1.0,
      -1.0, 1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, 1.0, 1.0,
      
      // bottom
      -1.0, -1.0, 1.0,
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0, 1.0,

      // right
      1.0, 1.0, 1.0,
      1.0, 1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0, 1.0,

      // left
      -1.0, 1.0, 1.0,
      -1.0, 1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0, -1.0, 1.0
    ], {
      itemSize: 3,
      numItems: 24
    })

    this.cubeVertexNormalBuffer = createArrayBuffer([
      // Front face
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      
      // Back face
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,

      // Top face
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      // Bottom face
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,

      // Right face
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,

      // Left face
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0
    ], {
      itemSize: 3,
      numItems: 24
    })

    this.cubeVertexTextureCoordBuffer = createArrayBuffer([
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ], {
      itemSize: 2,
      numItems: 24
    })

    this.cubeVertexIndexBuffer = createArrayBuffer([
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ], {
      itemSize: 1,
      numItems: 36,
      vertDataConstructor: Uint16Array,
      bindTarget: gl.ELEMENT_ARRAY_BUFFER
    })
  }

  createTexture (image) {
    for (let i = 0; i < 3; i++) {
      const cubeTexture = gl.createTexture()
      cubeTexture.image = image
      this.cubeTextures.push(cubeTexture)
    }
    
    this.handleTextureLoaded()
  }

  handleTextureLoaded () {
    // Use three different filters
    gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[0])
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.cubeTextures[0].image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    
    gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[1])
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.cubeTextures[1].image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    
    gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[2])
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.cubeTextures[2].image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
    gl.generateMipmap(gl.TEXTURE_2D)

    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  animate (dt) {
    this.rotateX += degToRad(dt * this.rotateSpeedX) / 100
    this.rotateY += degToRad(dt * this.rotateSpeedY) / 100
    this.rotateZ += degToRad(dt * this.rotateSpeedZ) / 100
  }

  draw () {
    // Check if need to blend
    if (this.isBlend) {
      // Add blending effect to simulate transparency
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.enable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);
      gl.uniform1f(shaderProgram.info.alphaUniform, 0.5);
    }
    else {
      gl.enable(gl.DEPTH_TEST)
      gl.disable(gl.BLEND)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeBuffer)
    gl.vertexAttribPointer(shaderProgram.info.vertexPositionAttribute, this.cubeBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer)
    gl.vertexAttribPointer(shaderProgram.info.textureCoordAttribute, this.cubeVertexTextureCoordBuffer.info.itemSize, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer)
    gl.vertexAttribPointer(shaderProgram.info.vertexNormalAttribute, this.cubeVertexNormalBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
    
    // Active texture
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[this.currentCubeTextureIndex])
    gl.uniform1i(shaderProgram.info.samplerUniform, 0)
    
    // Add light
    // TODO: add more interaction
    gl.uniform1i(shaderProgram.info.useLightingUniform, 'checked')
    gl.uniform3f(shaderProgram.info.ambientColorUniform, 0.2, 0.2, 0.2)
    gl.uniform3f(shaderProgram.info.directionalColorUniform, 0.8, 0.8, 0.8)

    let lightingDirection = [
      0.0, 0.0, -1.0
    ]
    let adjustedLightDirection = vec3.create()
    // Normalize so that the dot product is the same to cosine
    vec3.normalize(adjustedLightDirection, lightingDirection)
    // Reverse the direction
    vec3.scale(adjustedLightDirection, adjustedLightDirection, -1)
    gl.uniform3fv(shaderProgram.info.lightingDirectionUniform, adjustedLightDirection)

    // Specific to this model
    modelViewPushMatrix()
    mat4.translate(modelViewMatrix, modelViewMatrix, [this.x, this.y, this.z])
    mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotateX, [1.0, 0.0, 0.0])
    mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotateY, [0.0, 1.0, 0.0])
    mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotateZ, [0.0, 0.0, 1.0])
    
    setUniformMatrix()
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer)
    gl.drawElements(gl.TRIANGLES, this.cubeVertexIndexBuffer.info.numItems, gl.UNSIGNED_SHORT, 0)
    modelViewPopMatrix()
  }
}

///// Init Phase ///// 
function createShader (type) {
  let shader
  
  switch (type) {
    case 'vertex':
      shader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(shader, vertexShaderSource)
      break
      
    case 'fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(shader, fragmentShaderSource)
      break
      
    default:
      throw new Error(`Invalid shader type to create: ${type}`)
  }
  
  gl.compileShader(shader)
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // The shader is not correctly compiled
    throw new Error(gl.getShaderInfoLog(shader))
  }
  
  return shader
}

function createShaderProgram () {
  shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, createShader('vertex'))
  gl.attachShader(shaderProgram, createShader('fragment'))
  gl.linkProgram(shaderProgram)
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    // The shader program is not correctly linked
    throw new Error(gl.getProgramInfoLog(shaderProgram))
  }
}

function initShaders () {
  createShaderProgram()
  gl.useProgram(shaderProgram)
  
  // Put all attached information to shader program meta information
  shaderProgram.info = {}
  
  shaderProgram.info.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
  gl.enableVertexAttribArray(shaderProgram.info.vertexPositionAttribute)
  
  // shaderProgram.info.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor')
  // gl.enableVertexAttribArray(shaderProgram.info.vertexColorAttribute)
  
  shaderProgram.info.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord')
  gl.enableVertexAttribArray(shaderProgram.info.textureCoordAttribute)
  
  shaderProgram.info.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, 'aVertexNormal')
  gl.enableVertexAttribArray(shaderProgram.info.vertexNormalAttribute)

  // will put uniform here
  shaderProgram.info.projectionMatrixUniform = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')
  shaderProgram.info.modelViewMatrixUniform = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
  shaderProgram.info.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler')
  shaderProgram.info.useLightingUniform = gl.getUniformLocation(shaderProgram, 'uUseLighting')
  shaderProgram.info.ambientColorUniform = gl.getUniformLocation(shaderProgram, 'uAmbientColor')
  shaderProgram.info.directionalColorUniform = gl.getUniformLocation(shaderProgram, 'uDirectionalColor')
  shaderProgram.info.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, 'uLightingDirection')
  shaderProgram.info.nMatrixUniform = gl.getUniformLocation(shaderProgram, 'uNMatrix')
  shaderProgram.info.alphaUniform = gl.getUniformLocation(shaderProgram, 'uAlpha')
}

// function initTriangleBuffers () {
//   triangleBuffer = gl.createBuffer()
//   gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)
  
//   const verts = [
//     // front
//     0.0, 2.0, 0.0,
//     -1.0, 0.0, 1.0,
//     1.0, 0.0, 1.0,
    
//     // left
//     0.0, 2.0, 0.0,
//     -1.0, 0.0, 1.0,
//     -1.0, 0.0, -1.0,
    
//     // back
//     0.0, 2.0, 0.0,
//     -1.0, 0.0, -1.0,
//     1.0, 0.0, -1.0,
    
//     // right
//     0.0, 2.0, 0.0,
//     1.0, 0.0, -1.0,
//     1.0, 0.0, 1.0
//   ]
  
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW)
//   triangleBuffer.info = {
//     itemSize: 3,
//     numItems: 12
//   }
  
//   colorBuffer = gl.createBuffer()
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  
//   const vertColors = [
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
    
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
    
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
    
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
//   ]
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertColors), gl.STATIC_DRAW)
//   colorBuffer.info = {
//     itemSize: 4,
//     numItems: 12
//   }
// }

// function initCubeBuffers () {
// //   cubeBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer)
  
// //   const verts = [
// //     // front
// //     -1.0, 1.0, 1.0,
// //     -1.0, -1.0, 1.0,
// //     1.0, -1.0, 1.0,
// //     1.0, 1.0, 1.0,
    
// //     // back
// //     -1.0, 1.0, -1.0,
// //     -1.0, -1.0, -1.0,
// //     1.0, -1.0, -1.0,
// //     1.0, 1.0, -1.0,
    
// //     // top
// //     -1.0, 1.0, 1.0,
// //     -1.0, 1.0, -1.0,
// //     1.0, 1.0, -1.0,
// //     1.0, 1.0, 1.0,
    
// //     // bottom
// //     -1.0, -1.0, 1.0,
// //     -1.0, -1.0, -1.0,
// //     1.0, -1.0, -1.0,
// //     1.0, -1.0, 1.0,

// //     // right
// //     1.0, 1.0, 1.0,
// //     1.0, 1.0, -1.0,
// //     1.0, -1.0, -1.0,
// //     1.0, -1.0, 1.0,

// //     // left
// //     -1.0, 1.0, 1.0,
// //     -1.0, 1.0, -1.0,
// //     -1.0, -1.0, -1.0,
// //     -1.0, -1.0, 1.0
// //   ]
  
// //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW)
// //   cubeBuffer.info = {
// //     itemSize: 3,
// //     numItems: 24
// //   }

// //   cubeVertexNormalBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer)

// //   const vertNormals = [
// //     // Front face
// //     0.0, 0.0, 1.0,
// //     0.0, 0.0, 1.0,
// //     0.0, 0.0, 1.0,
// //     0.0, 0.0, 1.0,
    
// //     // Back face
// //     0.0, 0.0, -1.0,
// //     0.0, 0.0, -1.0,
// //     0.0, 0.0, -1.0,
// //     0.0, 0.0, -1.0,

// //     // Top face
// //     0.0, 1.0, 0.0,
// //     0.0, 1.0, 0.0,
// //     0.0, 1.0, 0.0,
// //     0.0, 1.0, 0.0,

// //     // Bottom face
// //     0.0, -1.0, 0.0,
// //     0.0, -1.0, 0.0,
// //     0.0, -1.0, 0.0,
// //     0.0, -1.0, 0.0,

// //     // Right face
// //     1.0, 0.0, 0.0,
// //     1.0, 0.0, 0.0,
// //     1.0, 0.0, 0.0,
// //     1.0, 0.0, 0.0,

// //     // Left face
// //     -1.0, 0.0, 0.0,
// //     -1.0, 0.0, 0.0,
// //     -1.0, 0.0, 0.0,
// //     -1.0, 0.0, 0.0
// //   ]
// //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertNormals), gl.STATIC_DRAW)
// //   cubeVertexNormalBuffer.info = {
// //     itemSize: 3, 
// //     numItems: 24
// //   }
  
// //   cubeVertexTextureCoordBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer)
  
// //   const vertCoords = [
// //     // Front face
// //     0.0, 0.0,
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,

// //     // Back face
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,
// //     0.0, 0.0,

// //     // Top face
// //     0.0, 1.0,
// //     0.0, 0.0,
// //     1.0, 0.0,
// //     1.0, 1.0,

// //     // Bottom face
// //     1.0, 1.0,
// //     0.0, 1.0,
// //     0.0, 0.0,
// //     1.0, 0.0,

// //     // Right face
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,
// //     0.0, 0.0,

// //     // Left face
// //     0.0, 0.0,
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,
// //   ]
  
// //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertCoords), gl.STATIC_DRAW)
// //   cubeVertexTextureCoordBuffer.info = {
// //     itemSize: 2,
// //     numItems: 24
// //   }
  
// // //   cubeColorBuffer = gl.createBuffer()
// // //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer)
  
// // //   const vertColors = [
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
    
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
    
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
    
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
    
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
    
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0
// // //   ]
// // //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertColors), gl.STATIC_DRAW)
// // //   cubeColorBuffer.info = {
// // //     itemSize: 4,
// // //     numItems: 24
// // //   }
  
// //   // When drawing, we are still drawing triangles.
// //   // We are going to use an index buffer to guide webgl to draw them at the right positions
// //   cubeVertexIndexBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer)
// //   let vertIndices = [
// //     0, 1, 2,      0, 2, 3,    // Front face
// //     4, 5, 6,      4, 6, 7,    // Back face
// //     8, 9, 10,     8, 10, 11,  // Top face
// //     12, 13, 14,   12, 14, 15, // Bottom face
// //     16, 17, 18,   16, 18, 19, // Right face
// //     20, 21, 22,   20, 22, 23  // Left face
// //   ]
// //   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertIndices), gl.STATIC_DRAW)
// //   cubeVertexIndexBuffer.info = {
// //     itemSize: 1, 
// //     numItems: 36
// //   }
// }

function initBuffers () {
  // initTriangleBuffers()
  // initCubeBuffers()
  cubes.forEach((cube) => cube.initBuffer())
}

// function handleTextureLoaded () {
//   // Use three different filters
//   gl.bindTexture(gl.TEXTURE_2D, cubeTextures[0])
//   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeTextures[0].image)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  
//   gl.bindTexture(gl.TEXTURE_2D, cubeTextures[1])
//   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeTextures[1].image)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  
//   gl.bindTexture(gl.TEXTURE_2D, cubeTextures[2])
//   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeTextures[2].image)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
//   gl.generateMipmap(gl.TEXTURE_2D)

//   gl.bindTexture(gl.TEXTURE_2D, null)
// }

function initTexture () {
  let image = new Image()
  image.onload = function () {
    cubes.forEach(cube => cube.createTexture(image))
    // handleTextureLoaded()
  }
  
  // Need to request CORS (Cross Origin Resource Sharing)
  // image.crossOrigin = ''
  // Can only use power of 2 size images
  // image.src = 'https://cdn6.aptoide.com/imgs/8/5/f/85fd58c917dbf46ae064da7c7299182e_icon.png'
  // image.src = 'https://c2.staticflickr.com/4/3408/3271626596_33347fac19_o.png'
  // image.src = '../crate.gif'
  image.src = samplePng
}

function init () {
  for (let i = 0; i < 2; i++) {
    cubes.push(new Cube({
      isBlend: true,
      x: Math.random() * 20 - 10,
      y: Math.random() * 20 - 10,
      z: -20
    }))
  }
  
  initShaders()
  initBuffers()
  initTexture()
}

///// Draw Phase ///// 
function resizeCanvas (width, height) {
  canvas.width = width
  canvas.height = height
}

function setUniformMatrix () {
  gl.uniformMatrix4fv(shaderProgram.info.projectionMatrixUniform, false, projectionMatrix)
  gl.uniformMatrix4fv(shaderProgram.info.modelViewMatrixUniform, false, modelViewMatrix)

  // Get the right normal matrix
  let normalMatrix = mat3.create()
  // mat3.fromMat4(normalMatrix, modelViewMatrix)
  // mat3.invert(normalMatrix, normalMatrix)
  // // mat4.toInverseMat3(modelViewMatrix, normalMatrix)
  // mat3.transpose(normalMatrix, normalMatrix)
  mat3.normalFromMat4(normalMatrix, modelViewMatrix)
  gl.uniformMatrix3fv(shaderProgram.info.nMatrixUniform, false, normalMatrix)
}

// function drawTriangle (dt) {
//   gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)
//   gl.vertexAttribPointer(shaderProgram.info.vertexPositionAttribute, triangleBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
  
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
//   gl.vertexAttribPointer(shaderProgram.info.vertexColorAttribute, colorBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
  
//   // Specific to this model
//   modelViewPushMatrix()
//   mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.5, -5])
//   mat4.rotate(modelViewMatrix, modelViewMatrix, (rotateY += Math.PI * 0.001 * dt % (Math.PI * 2)), [0.0, 1.0, 0.0])
  
//   setUniformMatrix()
  
//   gl.drawArrays(gl.TRIANGLES, 0, triangleBuffer.info.numItems)
//   modelViewPopMatrix()
// }

function drawCube () {
  // gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer)
  // gl.vertexAttribPointer(shaderProgram.info.vertexPositionAttribute, cubeBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
  
  // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer)
  // gl.vertexAttribPointer(shaderProgram.info.textureCoordAttribute, cubeVertexTextureCoordBuffer.info.itemSize, gl.FLOAT, false, 0, 0)

  // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer)
  // gl.vertexAttribPointer(shaderProgram.info.vertexNormalAttribute, cubeVertexNormalBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
  
  // // Active texture
  // gl.activeTexture(gl.TEXTURE0)
  // gl.bindTexture(gl.TEXTURE_2D, cubeTextures[currentCubeTextureIndex])
  // gl.uniform1i(shaderProgram.info.samplerUniform, 0)
  
  // // Add light
  // // TODO: add more interaction
  // gl.uniform1i(shaderProgram.info.useLightingUniform, 'checked')
  // gl.uniform3f(shaderProgram.info.ambientColorUniform, 0.2, 0.2, 0.2)
  // gl.uniform3f(shaderProgram.info.directionalColorUniform, 0.8, 0.8, 0.8)

  // let lightingDirection = [
  //   0.0, 0.0, -1.0
  // ]
  // let adjustedLightDirection = vec3.create()
  // // Normalize so that the dot product is the same to cosine
  // vec3.normalize(adjustedLightDirection, lightingDirection)
  // // Reverse the direction
  // vec3.scale(adjustedLightDirection, adjustedLightDirection, -1)
  // gl.uniform3fv(shaderProgram.info.lightingDirectionUniform, adjustedLightDirection)

  // // Specific to this model
  // modelViewPushMatrix()
  // mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, z])
  // mat4.rotate(modelViewMatrix, modelViewMatrix, rotateX, [1.0, 0.0, 0.0])
  // mat4.rotate(modelViewMatrix, modelViewMatrix, rotateY, [0.0, 1.0, 0.0])
  // mat4.rotate(modelViewMatrix, modelViewMatrix, rotateZ, [0.0, 0.0, 1.0])
  
  // setUniformMatrix()
  
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer)
  // gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.info.numItems, gl.UNSIGNED_SHORT, 0)
  // modelViewPopMatrix()
}

function drawScene () {
  resizeCanvas(500, 500)
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  
  mat4.perspective(projectionMatrix, 45, canvas.width / canvas.height, 0.1, 100)
  mat4.identity(modelViewMatrix)
  
  // drawTriangle(dt)
  cubes.forEach((cube) => cube.draw())
  // drawCube()
}

function draw (dt) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)
  drawScene()
}

function animate (dt) {
  cubes.forEach((cube) => cube.animate(dt))
  // rotateX += degToRad(dt * rotateSpeedX) / 100
  // rotateY += degToRad(dt * rotateSpeedY) / 100
  // rotateZ += degToRad(dt * rotateSpeedZ) / 100
}

function handleKeys (dt) {
  cubes.forEach(cube => {
    // Calculate rotations
    // up
    if (currentPressedKeys[38] && cube.rotateSpeedX > -50) {
      cube.rotateSpeedX -= 0.3
    }
    
    // down
    if (currentPressedKeys[40] && cube.rotateSpeedX < 50) {
      cube.rotateSpeedX += 0.3
    }
    
    // left
    if (currentPressedKeys[37] && cube.rotateSpeedY > -50) {
      cube.rotateSpeedY -= 0.3
    }
    
    // up
    if (currentPressedKeys[39] && cube.rotateSpeedY < 50) {
      cube.rotateSpeedY += 0.3
    }
    
    // zoom out
    if (currentPressedKeys[49] && cube.z > -30) {
      cube.z -= 0.2
    }
    
    // zoom in
    if (currentPressedKeys[50] && cube.z < -1) {
      cube.z += 0.2
    }
  })
}

function tick (dt) {
  animate(dt)
  handleKeys(dt)
  draw(dt)
}

// Animation loop
const fps = 60
function loop (cb) {
  const dt = 1000 / fps
  const now = Date.now()
  loop.duration = (loop.duration || 0) + now - (loop.lastRun || now)
  
  while (loop.duration >= dt) {
    cb(dt)
    loop.duration -= dt
  }
  
  loop.lastRun = now
  window.requestAnimationFrame(() => loop(cb))
}

function run () {
  prep()
  init()
  
  loop(tick)
}

run()