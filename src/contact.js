// Entry file for contact game

/***** Global States *****/
// Game frame per second
const fps = 60

/***** Game class *****/
class Game {
  constructor (gameOptions = {}) {
    const {
      fps
    } = gameOptions

    this.fps = fps
  }

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

  init () {

  }

  handleKeys (dt) {

  }

  animate (dt) {

  }

  draw (dt) {

  }
}

// Create game instance
const contactGame = new Game({
  fps: 60
})

// Start game
contactGame.start()
