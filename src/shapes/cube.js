import shapeUtil from './shapeUtil'
import gameUtil from '../gameUtil'
import defaultTextureSrc from '../textures/duck.png'
import gameState from '../gameState'

export default class Cube {
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
      z = -5,
      speedX = 0,
      speedY = 0,
      speedZ = 0,
      rotateSpeedX = 0,
      rotateSpeedY = 0,
      rotateSpeedZ = 0,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0
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
    this.cubeBuffer = null

    // normal buffer
    this.cubeVertexNormalBuffer = null

    // texture buffer
    this.cubeVertexTextureCoordBuffer = null

    // init the cube
    this.initBuffer()
    this.initTexture()
  }

  initBuffer () {
    this.cubeBuffer = shapeUtil.createArrayBuffer(this.gl, [
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

    this.cubeVertexNormalBuffer = shapeUtil.createArrayBuffer(this.gl, [
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

    this.cubeVertexTextureCoordBuffer = shapeUtil.createArrayBuffer(this.gl, [
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

    this.cubeVertexIndexBuffer = shapeUtil.createArrayBuffer(this.gl, [
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
    // this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
    // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
    // this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image)
    // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
    // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST)
    // this.gl.generateMipmap(this.gl.TEXTURE_2D)

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image)
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)

    // It's always good to reset active texture flag
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }

  handleKeys (dt) {
    // Calculate rotations
    // up
    if (gameState.currentPressedKeys[38] && this.rotateSpeedX > -50) {
      this.rotateSpeedX -= 0.3
    }
    
    // down
    if (gameState.currentPressedKeys[40] && this.rotateSpeedX < 50) {
      this.rotateSpeedX += 0.3
    }
    
    // left
    if (gameState.currentPressedKeys[37] && this.rotateSpeedY > -50) {
      this.rotateSpeedY -= 0.3
    }
    
    // up
    if (gameState.currentPressedKeys[39] && this.rotateSpeedY < 50) {
      this.rotateSpeedY += 0.3
    }
    
    // zoom out
    if (gameState.currentPressedKeys[49] && this.z > -30) {
      this.z -= 0.2
    }
    
    // zoom in
    if (gameState.currentPressedKeys[50] && this.z < -1) {
      this.z += 0.2
    }
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
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeBuffer)
    this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexPositionAttribute, this.cubeBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0)
    
    // Pass texture coordinates into shader
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer)
    this.gl.vertexAttribPointer(this.shaderProgram.variableMap.textureCoordAttribute, this.cubeVertexTextureCoordBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0)

    // Active texture using the first texture unit
    this.gl.activeTexture(this.gl.TEXTURE0)
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
    this.gl.uniform1i(this.shaderProgram.variableMap.samplerUniform, 0)

    // Pass normals into shader
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer)
    this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexNormalAttribute, this.cubeVertexNormalBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0)
    
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
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer)
    this.gl.drawElements(this.gl.TRIANGLES, this.cubeVertexIndexBuffer.info.numItems, this.gl.UNSIGNED_SHORT, 0)
    this.scene.modelViewPopMatrix()
  }
}
