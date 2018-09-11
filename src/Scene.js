import gameUtil from './gameUtil'
import gameState from './gameState'

/***** Scene class *****/
export default class Scene {
  constructor (sceneOptions = {}) {
    const {
      game
    } = sceneOptions

    if (!game) {
      throw new Error('No game for the scene')
    }
    
    this.gl = game.gl
    this.shaderProgram = game.shaderProgram
    this.canvas = game.canvas

    // Each scene has it's own model view matrix and project matrix
    this.modelViewMatrixStack = []
    this.modelViewMatrix = mat4.create()
    this.projectionMatrix = mat4.create()

    this.models = []

    // Define camera matrix for controlling first person view
    this.cameraMatrix = mat4.create()
    this.yaw = 0
    this.pitch = 0
    this.roll = 0
    this.yawRate = 0
    this.pitchRate = 0
    this.rollRate = 0
    this.cameraSpeed = 0
  }

  addModel (model) {
    this.models.push(model)
  }

  modelViewPushMatrix () {
    let copy = mat4.create()
    mat4.copy(copy, this.modelViewMatrix)
    this.modelViewMatrixStack.push(copy)
  }

  modelViewPopMatrix () {
    if (this.modelViewMatrixStack.length === 0) {
      throw new Error('Empty model view matrix stack')
    }
    
    this.modelViewMatrix = this.modelViewMatrixStack.pop()
  }

  setUniformMatrix () {
    this.gl.uniformMatrix4fv(this.shaderProgram.variableMap.projectionMatrixUniform, false, this.projectionMatrix)
    this.gl.uniformMatrix4fv(this.shaderProgram.variableMap.modelViewMatrixUniform, false, this.modelViewMatrix)
  
    // Get the right normal matrix
    let normalMatrix = mat3.create()
    mat3.normalFromMat4(normalMatrix, this.modelViewMatrix)
    this.gl.uniformMatrix3fv(this.shaderProgram.variableMap.nMatrixUniform, false, normalMatrix)
  }

  handleKeys (dt) {
    // Player can control where he is in the universe
    // space to move forward on the current direction
    // arrow key to tilt up, down (pitch), or rotate left or right (roll)
    // E key to turn left (pitch)
    // R key to turn right (pitch)

    // space
    if (gameState.currentPressedKeys[32] && this.cameraSpeed < 1) {
      this.cameraSpeed += 0.001
    }
    
    // up
    if (gameState.currentPressedKeys[38] && this.pitchRate > -0.1) {
      this.pitchRate -= 0.03
    }

    // down
    if (gameState.currentPressedKeys[40] && this.pitchRate < 0.1) {
      this.pitchRate += 0.03
    }

    // left
    if (gameState.currentPressedKeys[37] && this.rollRate > -0.1) {
      this.rollRate -= 0.03
    }

    // right
    if (gameState.currentPressedKeys[39] && this.rollRate < 0.1) {
      this.rollRate += 0.03
    }

    // E key
    if (gameState.currentPressedKeys[69] && this.yawRate > -0.1) {
      this.yawRate -= 0.03
    }
    
    // R key
    if (gameState.currentPressedKeys[82] && this.yawRate < 0.1) {
      this.yawRate += 0.03
    }
    
    // this.models.forEach(model => model.handleKeys(dt))
  }

  animate (dt) {
    // Update camera rotations
    this.yaw = this.yawRate * dt / 1000
    this.pitch = this.pitchRate * dt / 1000
    this.roll = this.rollRate * dt / 1000

    mat4.rotate(this.cameraMatrix, this.cameraMatrix, this.pitch, gameUtil.xAxis)
    mat4.rotate(this.cameraMatrix, this.cameraMatrix, this.yaw, gameUtil.yAxis)
    mat4.rotate(this.cameraMatrix, this.cameraMatrix, this.roll, gameUtil.zAxis)

    // Update scene camera matrix
    if (this.cameraSpeed !== 0) {
      let xPos = dt * this.cameraSpeed * Math.sin(gameUtil.degToRad(this.yaw)) * Math.cos(gameUtil.degToRad(this.roll))
      let yPos = dt * this.cameraSpeed * Math.sin(gameUtil.degToRad(this.pitch)) * (-Math.sin(gameUtil.degToRad(this.roll)))
      let zPos = -dt * this.cameraSpeed * (-Math.cos(gameUtil.degToRad(this.yaw))) * (-Math.cos(gameUtil.degToRad(this.pitch)))
      mat4.translate(this.cameraMatrix, this.cameraMatrix, [xPos, yPos, zPos])
    }

    mat4.invert(this.modelViewMatrix, this.cameraMatrix)

    this.models.forEach(model => model.animate(dt))
  }

  draw (dt) {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    
    mat4.perspective(this.projectionMatrix, 120, this.canvas.width / this.canvas.height, 0.1, 500)
    // mat4.identity(this.modelViewMatrix)
    
    this.models.forEach(model => model.draw(dt))
  }
}