import shapeUtil from './shapeUtil'
import gameUtil from '../gameUtil'
import defaultTextureSrc from '../textures/duck.png'
import gameState from '../gameState'

export default class Sphere {
  constructor (options = {}) {
    let {
      scene,
      shaderProgram,
      isBlend = false,
      blendAlpha = 0.5,
      textureSrc = defaultTextureSrc,
      useLight = true,
      ambientColor = [0.2, 0.2, 0.2],
      directionalColor = [0.8, 0.8, 0.8],
      lightingDirection = [0.0, 0.0, -1.0],
      x = 0,
      y = 0,
      z = -10,
      speedX = 0,
      speedY = 0,
      speedZ = 0,
      rotateSpeedX = Math.random() * 15,
      rotateSpeedY = Math.random() * 15,
      rotateSpeedZ = Math.random() * 15,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0,

      radius = Math.random() * 20,
      latitudeBands = Math.floor(Math.random() * 10) + 5,
      longitudeBands = Math.floor(Math.random() * 10) + 5
    } = options

    if (!shaderProgram) {
      throw new Error('No shader program provided!')
    }

    if (!scene) {
      throw new Error('No scene for this shape', this)
    }

    this.gl = shaderProgram.gl
    this.shaderProgram = shaderProgram
    this.scene = scene
    this.isBlend = isBlend
    this.blendAlpha = blendAlpha
    this.textureSrc = textureSrc
    this.useLight = useLight
    this.ambientColor = ambientColor
    this.directionalColor = directionalColor
    this.lightingDirection = lightingDirection

    // move speeds
    this.speedX = speedX
    this.speedY = speedY
    this.speedZ = speedZ

    // position
    this.x = x
    this.y = y
    this.z = z

    // rotate speeds
    this.rotateSpeedX = rotateSpeedX
    this.rotateSpeedY = rotateSpeedY
    this.rotateSpeedZ = rotateSpeedZ

    // rotate radius
    this.rotateX = rotateX
    this.rotateY = rotateY
    this.rotateZ = rotateZ

    // vertex buffer
    this.positionBuffer = null

    // normal buffer
    this.normalBuffer = null

    // texture buffer
    this.textureCoordBuffer = null

    // index buffer
    this.vertexIndexBuffer = null

    // Sphere things
    this.latitudeBands = latitudeBands
    this.longitudeBands = longitudeBands
    this.radius = radius

    // init the cube
    this.initBuffer()
    this.initTexture()
  }

  initBuffer () {
    // Calculate the array data
    const vertexPositionData = []
    const normalData = []
    const textureCoordData = []
    
    for (let latNumber = 0; latNumber <= this.latitudeBands; latNumber++) {
      let theta = latNumber * Math.PI / this.latitudeBands
      let sinTheta = Math.sin(theta)
      let cosTheta = Math.cos(theta)

      for (let longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
        let phi = longNumber * 2 * Math.PI / this.longitudeBands
        let sinPhi = Math.sin(phi)
        let cosPhi = Math.cos(phi)

        // Convert radius coordinate into cartesian coordinate (assume radius is unit).
        let x = sinTheta * cosPhi
        let y = cosTheta
        let z = sinTheta * sinPhi

        // The texture coordinate is computed by 'Mercator projection'
        let u = 1 - (longNumber / this.longitudeBands)
        let v = 1 - (latNumber / this.latitudeBands)

        // Pass all these values into the data array
        vertexPositionData.push(this.radius * x)
        vertexPositionData.push(this.radius * y)
        vertexPositionData.push(this.radius * z)

        normalData.push(x)
        normalData.push(y)
        normalData.push(z)

        textureCoordData.push(u)
        textureCoordData.push(v)
      }
    }

    this.positionBuffer = shapeUtil.createArrayBuffer(this.gl, vertexPositionData, {
      itemSize: 3,
      numItems: (this.latitudeBands + 1) * (this.longitudeBands + 1)
    })

    this.normalBuffer = shapeUtil.createArrayBuffer(this.gl, normalData, {
      itemSize: 3,
      numItems: (this.latitudeBands + 1) * (this.longitudeBands + 1)
    })

    this.textureCoordBuffer = shapeUtil.createArrayBuffer(this.gl, textureCoordData, {
      itemSize: 2,
      numItems: (this.latitudeBands + 1) * (this.longitudeBands + 1)
    })

    // Calculate the sphere index buffer
    const indexData = []

    for (let latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
      for (let longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
        let first = longNumber + (latNumber * (this.longitudeBands + 1))
        let second = first + this.longitudeBands + 1

        indexData.push(first)
        indexData.push(second)
        indexData.push(first + 1)

        indexData.push(second)
        indexData.push(second + 1)
        indexData.push(first + 1)
      }
    }

    this.vertexIndexBuffer = shapeUtil.createArrayBuffer(this.gl, indexData, {
      itemSize: 1,
      numItems: this.latitudeBands * this.longitudeBands * 6,
      vertDataConstructor: Uint16Array,
      bindTarget: this.gl.ELEMENT_ARRAY_BUFFER
    })
  }

  initTexture () {
    const image = new Image()
    image.onload = () => {
      this.createTexture(image)
    }

    image.src = this.textureSrc
  }

  createTexture (image) {
    this.cubeTexture = this.gl.createTexture()
    this.cubeTexture.image = image
    
    // Config texture related logic
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image)
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST)
    this.gl.generateMipmap(this.gl.TEXTURE_2D)

    // TODO: use nearest filter for better performance
    // this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
    // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
    // this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image)
    // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
    // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)

    // It's always good to reset active texture flag
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }

  handleKeys (dt) {
    // Calculate rotations
    // forward
    if (gameState.currentPressedKeys[38] && this.rotateSpeedX > -50) {
      this.z += 0.3
    }
    
    // backward
    if (gameState.currentPressedKeys[40] && this.rotateSpeedX < 50) {
      this.z -= 0.3
    }
    
    // move left
    if (gameState.currentPressedKeys[37] && this.rotateSpeedY > -50) {
      this.x += 0.3
    }
    
    // move right
    if (gameState.currentPressedKeys[39] && this.rotateSpeedY < 50) {
      this.x -= 0.3
    }

    // move top
    if (gameState.currentPressedKeys[87] && this.rotateSpeedY < 50) {
      this.y -= 0.3
    }

    // move down
    if (gameState.currentPressedKeys[83] && this.rotateSpeedY < 50) {
      this.y += 0.3
    }
    
    // // turn left
    // if (gameState.currentPressedKeys[49] && this.z > -30) {
    //   this.z += 0.2
    // }
    
    // // turn right
    // if (gameState.currentPressedKeys[50] && this.z < -1) {
    //   this.z -= 0.2
    // }
  }

  animate (dt) {
    this.rotateX += gameUtil.degToRad(dt * this.rotateSpeedX) / 100
    this.rotateY += gameUtil.degToRad(dt * this.rotateSpeedY) / 100
    this.rotateZ += gameUtil.degToRad(dt * this.rotateSpeedZ) / 100
  }

  draw () {
    // Check if need to blend
    if (this.isBlend) {
      // Add blending effect to simulate transparency
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
      this.gl.enable(this.gl.BLEND);
      this.gl.disable(this.gl.DEPTH_TEST);
      // Pass alpha uniform to shader
      this.gl.uniform1i(this.shaderProgram.variableMap.isBlendUniform, true);
      this.gl.uniform1f(this.shaderProgram.variableMap.alphaUniform, this.blendAlpha);
    }
    else {
      this.gl.enable(this.gl.DEPTH_TEST)
      this.gl.disable(this.gl.BLEND)
      this.gl.uniform1i(this.shaderProgram.variableMap.isBlendUniform, false);
    }

    // Pass vertex position into shader
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexPositionAttribute, this.positionBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0)
    
    // Pass texture coordinates into shader
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer)
    this.gl.vertexAttribPointer(this.shaderProgram.variableMap.textureCoordAttribute, this.textureCoordBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0)

    // Active texture using the first texture unit
    this.gl.activeTexture(this.gl.TEXTURE0)
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
    this.gl.uniform1i(this.shaderProgram.variableMap.samplerUniform, 0)

    // Pass normals into shader
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer)
    this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexNormalAttribute, this.normalBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0)
    
    // Add light
    this.gl.uniform1i(this.shaderProgram.variableMap.useLightingUniform, !!this.useLight)
    this.gl.uniform3f(this.shaderProgram.variableMap.ambientColorUniform, this.ambientColor[0], this.ambientColor[1], this.ambientColor[2])
    this.gl.uniform3f(this.shaderProgram.variableMap.directionalColorUniform, this.directionalColor[0], this.directionalColor[1], this.directionalColor[2])

    let adjustedLightDirection = vec3.create()
    // Normalize so that the dot product is the same to cosine
    vec3.normalize(adjustedLightDirection, this.lightingDirection)
    // Reverse the direction to describe light source
    vec3.scale(adjustedLightDirection, adjustedLightDirection, -1)
    // Pass lighting direction uniform to shader
    this.gl.uniform3fv(this.shaderProgram.variableMap.lightingDirectionUniform, adjustedLightDirection)

    // Transform model view matrix
    this.scene.modelViewPushMatrix()
    mat4.translate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, [this.x, this.y, this.z])
    mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateX, gameUtil.xAxis)
    mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateY, gameUtil.yAxis)
    mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateZ, gameUtil.zAxis)
    
    // Pass the model view matrix, projection matrix and normal matrix into shader
    this.scene.setUniformMatrix()
    
    // draw the cube
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer)
    this.gl.drawElements(this.gl.TRIANGLES, this.vertexIndexBuffer.info.numItems, this.gl.UNSIGNED_SHORT, 0)
    this.scene.modelViewPopMatrix()
  }
}
