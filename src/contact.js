import Scene from './Scene'
import Cube from './shapes/cube'
import Sphere from './shapes/sphere'
import ShaderProgram from './shaders/ShaderProgram'
import gameState from './gameState'

// Entry file for contact game
/***** Game class *****/
class Game {
  constructor (gameOptions = {}) {
    const {
      fps,
      canvas
    } = gameOptions

    this.fps = fps
    this.canvas = canvas
  }

  /*** Game loop ***/
  static loop (game, cb) {
    const dt = 1000 / game.fps
    const now = Date.now()
    Game.loop.duration = (Game.loop.duration || 0) + now - (Game.loop.lastRun || now)
    
    while (Game.loop.duration >= dt) {
      cb(dt)
      Game.loop.duration -= dt
    }
    
    Game.loop.lastRun = now
    window.requestAnimationFrame(() => Game.loop(game, cb))
  }

  start () {
    // Init the game
    this.init()

    // Start animation loop to draw game frames
    Game.loop(this, this.tick.bind(this))
  }

  tick (dt) {
    // Check user interactions
    this.handleKeys(dt)

    // Update game states
    this.animate(dt)

    // Draw game frame
    this.draw(dt)
  }

  /*** Game Init Phase ***/
  init () {
    // Detect webgl support
    this.gl = this.canvas.getContext('webgl')
  
    if (!this.gl) {
      alert('webgl is not supported')
      this.glNotSupported = true
      return
    }

    // resize the canvas
    this.resizeCanvas(500, 500)
    
    // Bind keyboard events
    document.addEventListener('keydown', this.handleKeydown.bind(this))
    document.addEventListener('keyup', this.handleKeyup.bind(this))

    // Init shaders
    this.shaderProgram = new ShaderProgram({
      gl: this.gl
    })

    // Init scene
    this.scene = new Scene({
      game: this
    })

    // The init logic goes below
    // let cube = new Cube({
    //   shaderProgram: this.shaderProgram,
    //   scene: this.scene
    // })

    // this.scene.addModel(cube)

    // Create the universe!
    // The whole universe is a huge cube. Each star occupies a fraction of that cube.
    // Player will start at a random position in the universe
    // The home star will start at another random position in the universe
    // Put the player at the 
    for (let xi = 0; xi < gameState.universeXCount; xi++) {
      for (let yi = 0; yi < gameState.universeYCount; yi++) {
        for (let zi = 0; zi < gameState.universeZCount; zi++) {

          const radius = Math.random() * gameState.universeBlockSize / 2
          
          const x0 = (xi - gameState.universeXCount / 2) * gameState.universeBlockSize + radius
          const x1 = (xi + 1 - gameState.universeXCount / 2) * gameState.universeBlockSize - radius
          const x = x0 + (x1 - x0) * Math.random()

          const y0 = (yi - gameState.universeYCount / 2) * gameState.universeBlockSize + radius
          const y1 = (yi + 1 - gameState.universeYCount / 2) * gameState.universeBlockSize - radius
          const y = y0 + (y1 - y0) * Math.random()

          const z0 = (zi - gameState.universeZCount / 2) * gameState.universeBlockSize + radius
          const z1 = (zi + 1 - gameState.universeZCount / 2) * gameState.universeBlockSize - radius
          const z = z0 + (z1 - x0) * Math.random()

          this.scene.addModel(new Sphere({
            shaderProgram: this.shaderProgram,
            scene: this.scene,
            x,
            y,
            z,
            radius
          }))
        }
      }
    }
  }

  handleKeydown (e) {
    gameState.currentPressedKeys[e.keyCode] = true
  }

  handleKeyup (e) {
    gameState.currentPressedKeys[e.keyCode] = false
  }

  resizeCanvas (width, height) {
    if (this.canvas.offsetWidth !== width || this.canvas.offsetHeight !== height) {
      this.canvas.style.offsetWidth = width + 'px'
      this.canvas.style.offsetHeight = height + 'px'
    }
    
    this.canvas.width = width
    this.canvas.height = height
  }

  /*** Game Draw Phase ***/
  handleKeys (dt) {
    this.scene.handleKeys(dt)
  }

  animate (dt) {
    this.scene.animate(dt)
  }

  draw (dt) {
    if (this.glNotSupported) {
      const context = this.canvas.getContext('2d')
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText('WebGL is not supported :(', this.canvas.width / 2, this.canvas.height / 2)
      return
    }

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    this.gl.enable(this.gl.DEPTH_TEST)
    this.scene.draw(dt)
  }
}

// Create game instance
const contactGame = new Game({
  fps: gameState.fps,
  canvas: document.getElementById('stage')
})

// Start game
contactGame.start()
