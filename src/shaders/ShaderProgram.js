import defaultVertexShaderSource from './vertexShader'
import defaultFragmentShaderSource from './fragmentShader'

const defaultAttributeMap = {
  vertexPositionAttribute: 'aVertexPosition',
  textureCoordAttribute: 'aTextureCoord',
  vertexNormalAttribute: 'aVertexNormal'
}

const defaultUniformMap = {
  projectionMatrixUniform: 'uProjectionMatrix',
  modelViewMatrixUniform: 'uModelViewMatrix',
  samplerUniform: 'uSampler',
  useLightingUniform: 'uUseLighting',
  ambientColorUniform: 'uAmbientColor',
  directionalColorUniform: 'uDirectionalColor',
  lightingDirectionUniform: 'uLightingDirection',
  nMatrixUniform: 'uNMatrix',
  isBlendUniform: 'uIsBlend',
  alphaUniform: 'uAlpha'
}

export default class ShaderProgram {
  constructor (shaderOptions = {}) {
    const {
      gl,
      vertexShaderSource = defaultVertexShaderSource,
      fragmentShaderSource = defaultFragmentShaderSource,
      attributeMap = defaultAttributeMap,
      uniformMap = defaultUniformMap
    } = shaderOptions

    if (!gl) {
      throw new Error('No webgl context for shader program')
    }

    this.gl = gl
    this.vertexShaderSource = vertexShaderSource
    this.fragmentShaderSource = fragmentShaderSource
    this.attributeMap = attributeMap
    this.uniformMap = uniformMap

    this.createProgram()
    this.initVariableMap()
  }

  createShader (shaderType) {
    let shader
  
    switch (shaderType) {
      case 'vertex':
        shader = this.gl.createShader(this.gl.VERTEX_SHADER)
        this.gl.shaderSource(shader, this.vertexShaderSource)
        break
        
      case 'fragment':
        shader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
        this.gl.shaderSource(shader, this.fragmentShaderSource)
        break
        
      default:
        throw new Error(`Invalid shader type to create: ${type}`)
    }
    
    this.gl.compileShader(shader)
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      // The shader is not correctly compiled
      throw new Error(this.gl.getShaderInfoLog(shader))
    }
    
    return shader
  }

  createProgram () {
    this.program = this.gl.createProgram()
    this.gl.attachShader(this.program, this.createShader('vertex'))
    this.gl.attachShader(this.program, this.createShader('fragment'))
    this.gl.linkProgram(this.program)
    
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      // The shader program is not correctly linked
      throw new Error(this.gl.getProgramInfoLog(this.program))
    }
  }

  initVariableMap () {
    this.gl.useProgram(this.program)
  
    // Put all attached information to shader program meta information
    this.variableMap = {}

    for (let attribKey in this.attributeMap) {
      if (this.attributeMap.hasOwnProperty(attribKey)) {
        let attribLocation = this.gl.getAttribLocation(this.program, this.attributeMap[attribKey])
        this.variableMap[attribKey] = attribLocation
        this.gl.enableVertexAttribArray(attribLocation)
      }
    }

    for (let uniformKey in this.uniformMap) {
      if (this.uniformMap.hasOwnProperty(uniformKey)) {
        this.variableMap[uniformKey] = this.gl.getUniformLocation(this.program, this.uniformMap[uniformKey])
      }
    }
  }
}