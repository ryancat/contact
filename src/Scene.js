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
    this.models.forEach(model => model.handleKeys(dt))
  }

  animate (dt) {
    this.models.forEach(model => model.animate(dt))
  }

  draw (dt) {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    
    mat4.perspective(this.projectionMatrix, 45, this.canvas.width / this.canvas.height, 0.1, 100)
    mat4.identity(this.modelViewMatrix)
    
    this.models.forEach(model => model.draw(dt))
  }
}