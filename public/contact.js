(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2592274a75e6c343e6fe044e632c463c.png";

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var gameState = {
  // Game frame per second
  fps: 60,
  universeBlockSize: 20,
  universeXCount: 3,
  universeYCount: 3,
  universeZCount: 3,
  numOfStars: 9,
  starLocationMap: [],
  currentPressedKeys: []
};
/* harmony default export */ __webpack_exports__["a"] = (gameState);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var shapeUtil = {
  createArrayBuffer: function createArrayBuffer(gl) {
    var verts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var vertsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _vertsOption$vertData = vertsOption.vertDataConstructor,
        vertDataConstructor = _vertsOption$vertData === void 0 ? Float32Array : _vertsOption$vertData,
        _vertsOption$bindTarg = vertsOption.bindTarget,
        bindTarget = _vertsOption$bindTarg === void 0 ? gl.ARRAY_BUFFER : _vertsOption$bindTarg,
        _vertsOption$itemSize = vertsOption.itemSize,
        itemSize = _vertsOption$itemSize === void 0 ? 1 : _vertsOption$itemSize,
        _vertsOption$numItems = vertsOption.numItems,
        numItems = _vertsOption$numItems === void 0 ? verts.length : _vertsOption$numItems;
    var cubeBuffer = gl.createBuffer();
    gl.bindBuffer(bindTarget, cubeBuffer);
    gl.bufferData(bindTarget, new vertDataConstructor(verts), gl.STATIC_DRAW);
    cubeBuffer.info = {
      itemSize: itemSize,
      numItems: numItems
    };
    return cubeBuffer;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (shapeUtil);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scene__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shapes_cube__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shapes_sphere__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shaders_ShaderProgram__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameState__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





 // Entry file for contact game

/***** Game class *****/

var Game =
/*#__PURE__*/
function () {
  function Game() {
    var gameOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Game);

    var fps = gameOptions.fps,
        canvas = gameOptions.canvas;
    this.fps = fps;
    this.canvas = canvas;
  }
  /*** Game loop ***/


  _createClass(Game, [{
    key: "start",
    value: function start() {
      // Init the game
      this.init(); // Start animation loop to draw game frames

      Game.loop(this, this.tick.bind(this));
    }
  }, {
    key: "tick",
    value: function tick(dt) {
      // Check user interactions
      this.handleKeys(dt); // Update game states

      this.animate(dt); // Draw game frame

      this.draw(dt);
    }
    /*** Game Init Phase ***/

  }, {
    key: "init",
    value: function init() {
      // Detect webgl support
      this.gl = this.canvas.getContext('webgl');

      if (!this.gl) {
        alert('webgl is not supported');
        this.glNotSupported = true;
        return;
      } // resize the canvas


      this.resizeCanvas(500, 500); // Bind keyboard events

      document.addEventListener('keydown', this.handleKeydown.bind(this));
      document.addEventListener('keyup', this.handleKeyup.bind(this)); // Init shaders

      this.shaderProgram = new __WEBPACK_IMPORTED_MODULE_3__shaders_ShaderProgram__["a" /* default */]({
        gl: this.gl
      }); // Init scene

      this.scene = new __WEBPACK_IMPORTED_MODULE_0__Scene__["a" /* default */]({
        game: this
      }); // The init logic goes below
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

      for (var xi = 0; xi < __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeXCount; xi++) {
        for (var yi = 0; yi < __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeYCount; yi++) {
          for (var zi = 0; zi < __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeZCount; zi++) {
            var radius = Math.random() * __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeBlockSize / 2;
            var x0 = (xi - __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeXCount / 2) * __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeBlockSize + radius;
            var x1 = (xi + 1 - __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeXCount / 2) * __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeBlockSize - radius;
            var x = x0 + (x1 - x0) * Math.random();
            var y0 = (yi - __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeYCount / 2) * __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeBlockSize + radius;
            var y1 = (yi + 1 - __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeYCount / 2) * __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeBlockSize - radius;
            var y = y0 + (y1 - y0) * Math.random();
            var z0 = (zi - __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeZCount / 2) * __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeBlockSize + radius;
            var z1 = (zi + 1 - __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeZCount / 2) * __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].universeBlockSize - radius;
            var z = z0 + (z1 - x0) * Math.random();
            this.scene.addModel(new __WEBPACK_IMPORTED_MODULE_2__shapes_sphere__["a" /* default */]({
              shaderProgram: this.shaderProgram,
              scene: this.scene,
              x: x,
              y: y,
              z: z,
              radius: radius
            }));
          }
        }
      }
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(e) {
      __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].currentPressedKeys[e.keyCode] = true;
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup(e) {
      __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].currentPressedKeys[e.keyCode] = false;
    }
  }, {
    key: "resizeCanvas",
    value: function resizeCanvas(width, height) {
      if (this.canvas.offsetWidth !== width || this.canvas.offsetHeight !== height) {
        this.canvas.style.offsetWidth = width + 'px';
        this.canvas.style.offsetHeight = height + 'px';
      }

      this.canvas.width = width;
      this.canvas.height = height;
    }
    /*** Game Draw Phase ***/

  }, {
    key: "handleKeys",
    value: function handleKeys(dt) {
      this.scene.handleKeys(dt);
    }
  }, {
    key: "animate",
    value: function animate(dt) {
      this.scene.animate(dt);
    }
  }, {
    key: "draw",
    value: function draw(dt) {
      if (this.glNotSupported) {
        var context = this.canvas.getContext('2d');
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('WebGL is not supported :(', this.canvas.width / 2, this.canvas.height / 2);
        return;
      }

      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.scene.draw(dt);
    }
  }], [{
    key: "loop",
    value: function loop(game, cb) {
      var dt = 1000 / game.fps;
      var now = Date.now();
      Game.loop.duration = (Game.loop.duration || 0) + now - (Game.loop.lastRun || now);

      while (Game.loop.duration >= dt) {
        cb(dt);
        Game.loop.duration -= dt;
      }

      Game.loop.lastRun = now;
      window.requestAnimationFrame(function () {
        return Game.loop(game, cb);
      });
    }
  }]);

  return Game;
}(); // Create game instance


var contactGame = new Game({
  fps: __WEBPACK_IMPORTED_MODULE_4__gameState__["a" /* default */].fps,
  canvas: document.getElementById('stage')
}); // Start game

contactGame.start();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameUtil__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameState__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/***** Scene class *****/

var Scene =
/*#__PURE__*/
function () {
  function Scene() {
    var sceneOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Scene);

    var game = sceneOptions.game;

    if (!game) {
      throw new Error('No game for the scene');
    }

    this.gl = game.gl;
    this.shaderProgram = game.shaderProgram;
    this.canvas = game.canvas; // Each scene has it's own model view matrix and project matrix

    this.modelViewMatrixStack = [];
    this.modelViewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.models = []; // Define camera matrix for controlling first person view

    this.cameraMatrix = mat4.create();
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.yawRate = 0;
    this.pitchRate = 0;
    this.rollRate = 0;
    this.cameraSpeed = 0;
  }

  _createClass(Scene, [{
    key: "addModel",
    value: function addModel(model) {
      this.models.push(model);
    }
  }, {
    key: "modelViewPushMatrix",
    value: function modelViewPushMatrix() {
      var copy = mat4.create();
      mat4.copy(copy, this.modelViewMatrix);
      this.modelViewMatrixStack.push(copy);
    }
  }, {
    key: "modelViewPopMatrix",
    value: function modelViewPopMatrix() {
      if (this.modelViewMatrixStack.length === 0) {
        throw new Error('Empty model view matrix stack');
      }

      this.modelViewMatrix = this.modelViewMatrixStack.pop();
    }
  }, {
    key: "setUniformMatrix",
    value: function setUniformMatrix() {
      this.gl.uniformMatrix4fv(this.shaderProgram.variableMap.projectionMatrixUniform, false, this.projectionMatrix);
      this.gl.uniformMatrix4fv(this.shaderProgram.variableMap.modelViewMatrixUniform, false, this.modelViewMatrix); // Get the right normal matrix

      var normalMatrix = mat3.create();
      mat3.normalFromMat4(normalMatrix, this.modelViewMatrix);
      this.gl.uniformMatrix3fv(this.shaderProgram.variableMap.nMatrixUniform, false, normalMatrix);
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(dt) {
      // Player can control where he is in the universe
      // space to move forward on the current direction
      // arrow key to tilt up, down (pitch), or rotate left or right (roll)
      // E key to turn left (pitch)
      // R key to turn right (pitch)
      // space
      if (__WEBPACK_IMPORTED_MODULE_1__gameState__["a" /* default */].currentPressedKeys[32] && this.cameraSpeed < 1) {
        this.cameraSpeed += 0.001;
      } // up


      if (__WEBPACK_IMPORTED_MODULE_1__gameState__["a" /* default */].currentPressedKeys[38] && this.pitchRate > -0.1) {
        this.pitchRate -= 0.03;
      } // down


      if (__WEBPACK_IMPORTED_MODULE_1__gameState__["a" /* default */].currentPressedKeys[40] && this.pitchRate < 0.1) {
        this.pitchRate += 0.03;
      } // left


      if (__WEBPACK_IMPORTED_MODULE_1__gameState__["a" /* default */].currentPressedKeys[37] && this.rollRate > -0.1) {
        this.rollRate -= 0.03;
      } // right


      if (__WEBPACK_IMPORTED_MODULE_1__gameState__["a" /* default */].currentPressedKeys[39] && this.rollRate < 0.1) {
        this.rollRate += 0.03;
      } // E key


      if (__WEBPACK_IMPORTED_MODULE_1__gameState__["a" /* default */].currentPressedKeys[69] && this.yawRate > -0.1) {
        this.yawRate -= 0.03;
      } // R key


      if (__WEBPACK_IMPORTED_MODULE_1__gameState__["a" /* default */].currentPressedKeys[82] && this.yawRate < 0.1) {
        this.yawRate += 0.03;
      } // this.models.forEach(model => model.handleKeys(dt))

    }
  }, {
    key: "animate",
    value: function animate(dt) {
      // Update camera rotations
      this.yaw = this.yawRate * dt / 1000;
      this.pitch = this.pitchRate * dt / 1000;
      this.roll = this.rollRate * dt / 1000;
      mat4.rotate(this.cameraMatrix, this.cameraMatrix, this.pitch, __WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].xAxis);
      mat4.rotate(this.cameraMatrix, this.cameraMatrix, this.yaw, __WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].yAxis);
      mat4.rotate(this.cameraMatrix, this.cameraMatrix, this.roll, __WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].zAxis); // Update scene camera matrix

      if (this.cameraSpeed !== 0) {
        var xPos = dt * this.cameraSpeed * Math.sin(__WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].degToRad(this.yaw)) * Math.cos(__WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].degToRad(this.roll));
        var yPos = dt * this.cameraSpeed * Math.sin(__WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].degToRad(this.pitch)) * -Math.sin(__WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].degToRad(this.roll));
        var zPos = -dt * this.cameraSpeed * -Math.cos(__WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].degToRad(this.yaw)) * -Math.cos(__WEBPACK_IMPORTED_MODULE_0__gameUtil__["a" /* default */].degToRad(this.pitch));
        mat4.translate(this.cameraMatrix, this.cameraMatrix, [xPos, yPos, zPos]);
      }

      mat4.invert(this.modelViewMatrix, this.cameraMatrix);
      this.models.forEach(function (model) {
        return model.animate(dt);
      });
    }
  }, {
    key: "draw",
    value: function draw(dt) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      mat4.perspective(this.projectionMatrix, 120, this.canvas.width / this.canvas.height, 0.1, 500); // mat4.identity(this.modelViewMatrix)

      this.models.forEach(function (model) {
        return model.draw(dt);
      });
    }
  }]);

  return Scene;
}();



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapeUtil__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameUtil__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__textures_duck_png__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__textures_duck_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__textures_duck_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameState__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var Cube =
/*#__PURE__*/
function () {
  function Cube() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cube);

    var scene = options.scene,
        shaderProgram = options.shaderProgram,
        _options$isBlend = options.isBlend,
        isBlend = _options$isBlend === void 0 ? false : _options$isBlend,
        _options$blendAlpha = options.blendAlpha,
        blendAlpha = _options$blendAlpha === void 0 ? 0.5 : _options$blendAlpha,
        _options$textureSrc = options.textureSrc,
        textureSrc = _options$textureSrc === void 0 ? __WEBPACK_IMPORTED_MODULE_2__textures_duck_png___default.a : _options$textureSrc,
        _options$useLight = options.useLight,
        useLight = _options$useLight === void 0 ? true : _options$useLight,
        _options$ambientColor = options.ambientColor,
        ambientColor = _options$ambientColor === void 0 ? [0.2, 0.2, 0.2] : _options$ambientColor,
        _options$directionalC = options.directionalColor,
        directionalColor = _options$directionalC === void 0 ? [0.8, 0.8, 0.8] : _options$directionalC,
        _options$lightingDire = options.lightingDirection,
        lightingDirection = _options$lightingDire === void 0 ? [0.0, 0.0, -1.0] : _options$lightingDire,
        _options$x = options.x,
        x = _options$x === void 0 ? 0 : _options$x,
        _options$y = options.y,
        y = _options$y === void 0 ? 0 : _options$y,
        _options$z = options.z,
        z = _options$z === void 0 ? -5 : _options$z,
        _options$speedX = options.speedX,
        speedX = _options$speedX === void 0 ? 0 : _options$speedX,
        _options$speedY = options.speedY,
        speedY = _options$speedY === void 0 ? 0 : _options$speedY,
        _options$speedZ = options.speedZ,
        speedZ = _options$speedZ === void 0 ? 0 : _options$speedZ,
        _options$rotateSpeedX = options.rotateSpeedX,
        rotateSpeedX = _options$rotateSpeedX === void 0 ? 0 : _options$rotateSpeedX,
        _options$rotateSpeedY = options.rotateSpeedY,
        rotateSpeedY = _options$rotateSpeedY === void 0 ? 0 : _options$rotateSpeedY,
        _options$rotateSpeedZ = options.rotateSpeedZ,
        rotateSpeedZ = _options$rotateSpeedZ === void 0 ? 0 : _options$rotateSpeedZ,
        _options$rotateX = options.rotateX,
        rotateX = _options$rotateX === void 0 ? 0 : _options$rotateX,
        _options$rotateY = options.rotateY,
        rotateY = _options$rotateY === void 0 ? 0 : _options$rotateY,
        _options$rotateZ = options.rotateZ,
        rotateZ = _options$rotateZ === void 0 ? 0 : _options$rotateZ;

    if (!shaderProgram) {
      throw new Error('No shader program provided!');
    }

    if (!scene) {
      throw new Error('No scene for this shape', this);
    }

    this.gl = shaderProgram.gl;
    this.shaderProgram = shaderProgram;
    this.scene = scene;
    this.isBlend = isBlend;
    this.blendAlpha = blendAlpha;
    this.textureSrc = textureSrc;
    this.useLight = useLight;
    this.ambientColor = ambientColor;
    this.directionalColor = directionalColor;
    this.lightingDirection = lightingDirection; // move speeds

    this.speedX = speedX;
    this.speedY = speedY;
    this.speedZ = speedZ; // position

    this.x = x;
    this.y = y;
    this.z = z; // rotate speeds

    this.rotateSpeedX = rotateSpeedX;
    this.rotateSpeedY = rotateSpeedY;
    this.rotateSpeedZ = rotateSpeedZ; // rotate radius

    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.rotateZ = rotateZ; // vertex buffer

    this.cubeBuffer = null; // normal buffer

    this.cubeVertexNormalBuffer = null; // texture buffer

    this.cubeVertexTextureCoordBuffer = null; // init the cube

    this.initBuffer();
    this.initTexture();
  }

  _createClass(Cube, [{
    key: "initBuffer",
    value: function initBuffer() {
      this.cubeBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, [// front
      -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, // back
      -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // top
      -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, // bottom
      -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, // right
      1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, // left
      -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0], {
        itemSize: 3,
        numItems: 24
      });
      this.cubeVertexNormalBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, [// Front face
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // Back face
      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // Bottom face
      0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // Right face
      1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // Left face
      -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0], {
        itemSize: 3,
        numItems: 24
      });
      this.cubeVertexTextureCoordBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, [// Front face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, // Back face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, // Bottom face
      1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // Right face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, // Left face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], {
        itemSize: 2,
        numItems: 24
      });
      this.cubeVertexIndexBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, [0, 1, 2, 0, 2, 3, // Front face
      4, 5, 6, 4, 6, 7, // Back face
      8, 9, 10, 8, 10, 11, // Top face
      12, 13, 14, 12, 14, 15, // Bottom face
      16, 17, 18, 16, 18, 19, // Right face
      20, 21, 22, 20, 22, 23 // Left face
      ], {
        itemSize: 1,
        numItems: 36,
        vertDataConstructor: Uint16Array,
        bindTarget: this.gl.ELEMENT_ARRAY_BUFFER
      });
    }
  }, {
    key: "initTexture",
    value: function initTexture() {
      var _this = this;

      var image = new Image();

      image.onload = function () {
        _this.createTexture(image);
      };

      image.src = this.textureSrc;
    }
  }, {
    key: "createTexture",
    value: function createTexture(image) {
      this.cubeTexture = this.gl.createTexture();
      this.cubeTexture.image = image; // Config texture related logic
      // this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
      // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
      // this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image)
      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST)
      // this.gl.generateMipmap(this.gl.TEXTURE_2D)

      this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture);
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST); // It's always good to reset active texture flag

      this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(dt) {
      // Calculate rotations
      // up
      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[38] && this.rotateSpeedX > -50) {
        this.rotateSpeedX -= 0.3;
      } // down


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[40] && this.rotateSpeedX < 50) {
        this.rotateSpeedX += 0.3;
      } // left


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[37] && this.rotateSpeedY > -50) {
        this.rotateSpeedY -= 0.3;
      } // up


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[39] && this.rotateSpeedY < 50) {
        this.rotateSpeedY += 0.3;
      } // zoom out


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[49] && this.z > -30) {
        this.z -= 0.2;
      } // zoom in


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[50] && this.z < -1) {
        this.z += 0.2;
      }
    }
  }, {
    key: "animate",
    value: function animate(dt) {
      this.rotateX += __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].degToRad(dt * this.rotateSpeedX) / 100;
      this.rotateY += __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].degToRad(dt * this.rotateSpeedY) / 100;
      this.rotateZ += __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].degToRad(dt * this.rotateSpeedZ) / 100;
    }
  }, {
    key: "draw",
    value: function draw() {
      // Check if need to blend
      if (this.isBlend) {
        // Add blending effect to simulate transparency
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
        this.gl.enable(this.gl.BLEND);
        this.gl.disable(this.gl.DEPTH_TEST); // Pass alpha uniform to shader

        this.gl.uniform1i(this.shaderProgram.variableMap.isBlendUniform, true);
        this.gl.uniform1f(this.shaderProgram.variableMap.alphaUniform, this.blendAlpha);
      } else {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.disable(this.gl.BLEND);
        this.gl.uniform1i(this.shaderProgram.variableMap.isBlendUniform, false);
      } // Pass vertex position into shader


      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeBuffer);
      this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexPositionAttribute, this.cubeBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0); // Pass texture coordinates into shader

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);
      this.gl.vertexAttribPointer(this.shaderProgram.variableMap.textureCoordAttribute, this.cubeVertexTextureCoordBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0); // Active texture using the first texture unit

      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture);
      this.gl.uniform1i(this.shaderProgram.variableMap.samplerUniform, 0); // Pass normals into shader

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer);
      this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexNormalAttribute, this.cubeVertexNormalBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0); // Add light

      this.gl.uniform1i(this.shaderProgram.variableMap.useLightingUniform, !!this.useLight);
      this.gl.uniform3f(this.shaderProgram.variableMap.ambientColorUniform, this.ambientColor[0], this.ambientColor[1], this.ambientColor[2]);
      this.gl.uniform3f(this.shaderProgram.variableMap.directionalColorUniform, this.directionalColor[0], this.directionalColor[1], this.directionalColor[2]);
      var adjustedLightDirection = vec3.create(); // Normalize so that the dot product is the same to cosine

      vec3.normalize(adjustedLightDirection, this.lightingDirection); // Reverse the direction to describe light source

      vec3.scale(adjustedLightDirection, adjustedLightDirection, -1); // Pass lighting direction uniform to shader

      this.gl.uniform3fv(this.shaderProgram.variableMap.lightingDirectionUniform, adjustedLightDirection); // Transform model view matrix

      this.scene.modelViewPushMatrix();
      mat4.translate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, [this.x, this.y, this.z]);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateX, __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].xAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateY, __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].yAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateZ, __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].zAxis); // Pass the model view matrix, projection matrix and normal matrix into shader

      this.scene.setUniformMatrix(); // draw the cube

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
      this.gl.drawElements(this.gl.TRIANGLES, this.cubeVertexIndexBuffer.info.numItems, this.gl.UNSIGNED_SHORT, 0);
      this.scene.modelViewPopMatrix();
    }
  }]);

  return Cube;
}();



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sphere; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapeUtil__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameUtil__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__textures_duck_png__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__textures_duck_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__textures_duck_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameState__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var Sphere =
/*#__PURE__*/
function () {
  function Sphere() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Sphere);

    var scene = options.scene,
        shaderProgram = options.shaderProgram,
        _options$isBlend = options.isBlend,
        isBlend = _options$isBlend === void 0 ? false : _options$isBlend,
        _options$blendAlpha = options.blendAlpha,
        blendAlpha = _options$blendAlpha === void 0 ? 0.5 : _options$blendAlpha,
        _options$textureSrc = options.textureSrc,
        textureSrc = _options$textureSrc === void 0 ? __WEBPACK_IMPORTED_MODULE_2__textures_duck_png___default.a : _options$textureSrc,
        _options$useLight = options.useLight,
        useLight = _options$useLight === void 0 ? true : _options$useLight,
        _options$ambientColor = options.ambientColor,
        ambientColor = _options$ambientColor === void 0 ? [0.2, 0.2, 0.2] : _options$ambientColor,
        _options$directionalC = options.directionalColor,
        directionalColor = _options$directionalC === void 0 ? [0.8, 0.8, 0.8] : _options$directionalC,
        _options$lightingDire = options.lightingDirection,
        lightingDirection = _options$lightingDire === void 0 ? [0.0, 0.0, -1.0] : _options$lightingDire,
        _options$x = options.x,
        x = _options$x === void 0 ? 0 : _options$x,
        _options$y = options.y,
        y = _options$y === void 0 ? 0 : _options$y,
        _options$z = options.z,
        z = _options$z === void 0 ? -10 : _options$z,
        _options$speedX = options.speedX,
        speedX = _options$speedX === void 0 ? 0 : _options$speedX,
        _options$speedY = options.speedY,
        speedY = _options$speedY === void 0 ? 0 : _options$speedY,
        _options$speedZ = options.speedZ,
        speedZ = _options$speedZ === void 0 ? 0 : _options$speedZ,
        _options$rotateSpeedX = options.rotateSpeedX,
        rotateSpeedX = _options$rotateSpeedX === void 0 ? Math.random() * 15 : _options$rotateSpeedX,
        _options$rotateSpeedY = options.rotateSpeedY,
        rotateSpeedY = _options$rotateSpeedY === void 0 ? Math.random() * 15 : _options$rotateSpeedY,
        _options$rotateSpeedZ = options.rotateSpeedZ,
        rotateSpeedZ = _options$rotateSpeedZ === void 0 ? Math.random() * 15 : _options$rotateSpeedZ,
        _options$rotateX = options.rotateX,
        rotateX = _options$rotateX === void 0 ? 0 : _options$rotateX,
        _options$rotateY = options.rotateY,
        rotateY = _options$rotateY === void 0 ? 0 : _options$rotateY,
        _options$rotateZ = options.rotateZ,
        rotateZ = _options$rotateZ === void 0 ? 0 : _options$rotateZ,
        _options$radius = options.radius,
        radius = _options$radius === void 0 ? Math.random() * 20 : _options$radius,
        _options$latitudeBand = options.latitudeBands,
        latitudeBands = _options$latitudeBand === void 0 ? Math.floor(Math.random() * 10) + 5 : _options$latitudeBand,
        _options$longitudeBan = options.longitudeBands,
        longitudeBands = _options$longitudeBan === void 0 ? Math.floor(Math.random() * 10) + 5 : _options$longitudeBan;

    if (!shaderProgram) {
      throw new Error('No shader program provided!');
    }

    if (!scene) {
      throw new Error('No scene for this shape', this);
    }

    this.gl = shaderProgram.gl;
    this.shaderProgram = shaderProgram;
    this.scene = scene;
    this.isBlend = isBlend;
    this.blendAlpha = blendAlpha;
    this.textureSrc = textureSrc;
    this.useLight = useLight;
    this.ambientColor = ambientColor;
    this.directionalColor = directionalColor;
    this.lightingDirection = lightingDirection; // move speeds

    this.speedX = speedX;
    this.speedY = speedY;
    this.speedZ = speedZ; // position

    this.x = x;
    this.y = y;
    this.z = z; // rotate speeds

    this.rotateSpeedX = rotateSpeedX;
    this.rotateSpeedY = rotateSpeedY;
    this.rotateSpeedZ = rotateSpeedZ; // rotate radius

    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.rotateZ = rotateZ; // vertex buffer

    this.positionBuffer = null; // normal buffer

    this.normalBuffer = null; // texture buffer

    this.textureCoordBuffer = null; // index buffer

    this.vertexIndexBuffer = null; // Sphere things

    this.latitudeBands = latitudeBands;
    this.longitudeBands = longitudeBands;
    this.radius = radius; // init the cube

    this.initBuffer();
    this.initTexture();
  }

  _createClass(Sphere, [{
    key: "initBuffer",
    value: function initBuffer() {
      // Calculate the array data
      var vertexPositionData = [];
      var normalData = [];
      var textureCoordData = [];

      for (var latNumber = 0; latNumber <= this.latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / this.latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
          var phi = longNumber * 2 * Math.PI / this.longitudeBands;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi); // Convert radius coordinate into cartesian coordinate (assume radius is unit).

          var x = sinTheta * cosPhi;
          var y = cosTheta;
          var z = sinTheta * sinPhi; // The texture coordinate is computed by 'Mercator projection'

          var u = 1 - longNumber / this.longitudeBands;
          var v = 1 - latNumber / this.latitudeBands; // Pass all these values into the data array

          vertexPositionData.push(this.radius * x);
          vertexPositionData.push(this.radius * y);
          vertexPositionData.push(this.radius * z);
          normalData.push(x);
          normalData.push(y);
          normalData.push(z);
          textureCoordData.push(u);
          textureCoordData.push(v);
        }
      }

      this.positionBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, vertexPositionData, {
        itemSize: 3,
        numItems: (this.latitudeBands + 1) * (this.longitudeBands + 1)
      });
      this.normalBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, normalData, {
        itemSize: 3,
        numItems: (this.latitudeBands + 1) * (this.longitudeBands + 1)
      });
      this.textureCoordBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, textureCoordData, {
        itemSize: 2,
        numItems: (this.latitudeBands + 1) * (this.longitudeBands + 1)
      }); // Calculate the sphere index buffer

      var indexData = [];

      for (var _latNumber = 0; _latNumber < this.latitudeBands; _latNumber++) {
        for (var _longNumber = 0; _longNumber < this.longitudeBands; _longNumber++) {
          var first = _longNumber + _latNumber * (this.longitudeBands + 1);
          var second = first + this.longitudeBands + 1;
          indexData.push(first);
          indexData.push(second);
          indexData.push(first + 1);
          indexData.push(second);
          indexData.push(second + 1);
          indexData.push(first + 1);
        }
      }

      this.vertexIndexBuffer = __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].createArrayBuffer(this.gl, indexData, {
        itemSize: 1,
        numItems: this.latitudeBands * this.longitudeBands * 6,
        vertDataConstructor: Uint16Array,
        bindTarget: this.gl.ELEMENT_ARRAY_BUFFER
      });
    }
  }, {
    key: "initTexture",
    value: function initTexture() {
      var _this = this;

      var image = new Image();

      image.onload = function () {
        _this.createTexture(image);
      };

      image.src = this.textureSrc;
    }
  }, {
    key: "createTexture",
    value: function createTexture(image) {
      this.cubeTexture = this.gl.createTexture();
      this.cubeTexture.image = image; // Config texture related logic

      this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture);
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
      this.gl.generateMipmap(this.gl.TEXTURE_2D); // TODO: use nearest filter for better performance
      // this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture)
      // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
      // this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.cubeTexture.image)
      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
      // It's always good to reset active texture flag

      this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(dt) {
      // Calculate rotations
      // forward
      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[38] && this.rotateSpeedX > -50) {
        this.z += 0.3;
      } // backward


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[40] && this.rotateSpeedX < 50) {
        this.z -= 0.3;
      } // move left


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[37] && this.rotateSpeedY > -50) {
        this.x += 0.3;
      } // move right


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[39] && this.rotateSpeedY < 50) {
        this.x -= 0.3;
      } // move top


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[87] && this.rotateSpeedY < 50) {
        this.y -= 0.3;
      } // move down


      if (__WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[83] && this.rotateSpeedY < 50) {
        this.y += 0.3;
      } // // turn left
      // if (gameState.currentPressedKeys[49] && this.z > -30) {
      //   this.z += 0.2
      // }
      // // turn right
      // if (gameState.currentPressedKeys[50] && this.z < -1) {
      //   this.z -= 0.2
      // }

    }
  }, {
    key: "animate",
    value: function animate(dt) {
      this.rotateX += __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].degToRad(dt * this.rotateSpeedX) / 100;
      this.rotateY += __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].degToRad(dt * this.rotateSpeedY) / 100;
      this.rotateZ += __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].degToRad(dt * this.rotateSpeedZ) / 100;
    }
  }, {
    key: "draw",
    value: function draw() {
      // Check if need to blend
      if (this.isBlend) {
        // Add blending effect to simulate transparency
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
        this.gl.enable(this.gl.BLEND);
        this.gl.disable(this.gl.DEPTH_TEST); // Pass alpha uniform to shader

        this.gl.uniform1i(this.shaderProgram.variableMap.isBlendUniform, true);
        this.gl.uniform1f(this.shaderProgram.variableMap.alphaUniform, this.blendAlpha);
      } else {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.disable(this.gl.BLEND);
        this.gl.uniform1i(this.shaderProgram.variableMap.isBlendUniform, false);
      } // Pass vertex position into shader


      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexPositionAttribute, this.positionBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0); // Pass texture coordinates into shader

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer);
      this.gl.vertexAttribPointer(this.shaderProgram.variableMap.textureCoordAttribute, this.textureCoordBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0); // Active texture using the first texture unit

      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture);
      this.gl.uniform1i(this.shaderProgram.variableMap.samplerUniform, 0); // Pass normals into shader

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
      this.gl.vertexAttribPointer(this.shaderProgram.variableMap.vertexNormalAttribute, this.normalBuffer.info.itemSize, this.gl.FLOAT, false, 0, 0); // Add light

      this.gl.uniform1i(this.shaderProgram.variableMap.useLightingUniform, !!this.useLight);
      this.gl.uniform3f(this.shaderProgram.variableMap.ambientColorUniform, this.ambientColor[0], this.ambientColor[1], this.ambientColor[2]);
      this.gl.uniform3f(this.shaderProgram.variableMap.directionalColorUniform, this.directionalColor[0], this.directionalColor[1], this.directionalColor[2]);
      var adjustedLightDirection = vec3.create(); // Normalize so that the dot product is the same to cosine

      vec3.normalize(adjustedLightDirection, this.lightingDirection); // Reverse the direction to describe light source

      vec3.scale(adjustedLightDirection, adjustedLightDirection, -1); // Pass lighting direction uniform to shader

      this.gl.uniform3fv(this.shaderProgram.variableMap.lightingDirectionUniform, adjustedLightDirection); // Transform model view matrix

      this.scene.modelViewPushMatrix();
      mat4.translate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, [this.x, this.y, this.z]);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateX, __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].xAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateY, __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].yAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateZ, __WEBPACK_IMPORTED_MODULE_1__gameUtil__["a" /* default */].zAxis); // Pass the model view matrix, projection matrix and normal matrix into shader

      this.scene.setUniformMatrix(); // draw the cube

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
      this.gl.drawElements(this.gl.TRIANGLES, this.vertexIndexBuffer.info.numItems, this.gl.UNSIGNED_SHORT, 0);
      this.scene.modelViewPopMatrix();
    }
  }]);

  return Sphere;
}();



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShaderProgram; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vertexShader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fragmentShader__ = __webpack_require__(9);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var defaultAttributeMap = {
  vertexPositionAttribute: 'aVertexPosition',
  textureCoordAttribute: 'aTextureCoord',
  vertexNormalAttribute: 'aVertexNormal'
};
var defaultUniformMap = {
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
};

var ShaderProgram =
/*#__PURE__*/
function () {
  function ShaderProgram() {
    var shaderOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ShaderProgram);

    var gl = shaderOptions.gl,
        _shaderOptions$vertex = shaderOptions.vertexShaderSource,
        vertexShaderSource = _shaderOptions$vertex === void 0 ? __WEBPACK_IMPORTED_MODULE_0__vertexShader__["a" /* default */] : _shaderOptions$vertex,
        _shaderOptions$fragme = shaderOptions.fragmentShaderSource,
        fragmentShaderSource = _shaderOptions$fragme === void 0 ? __WEBPACK_IMPORTED_MODULE_1__fragmentShader__["a" /* default */] : _shaderOptions$fragme,
        _shaderOptions$attrib = shaderOptions.attributeMap,
        attributeMap = _shaderOptions$attrib === void 0 ? defaultAttributeMap : _shaderOptions$attrib,
        _shaderOptions$unifor = shaderOptions.uniformMap,
        uniformMap = _shaderOptions$unifor === void 0 ? defaultUniformMap : _shaderOptions$unifor;

    if (!gl) {
      throw new Error('No webgl context for shader program');
    }

    this.gl = gl;
    this.vertexShaderSource = vertexShaderSource;
    this.fragmentShaderSource = fragmentShaderSource;
    this.attributeMap = attributeMap;
    this.uniformMap = uniformMap;
    this.createProgram();
    this.initVariableMap();
  }

  _createClass(ShaderProgram, [{
    key: "createShader",
    value: function createShader(shaderType) {
      var shader;

      switch (shaderType) {
        case 'vertex':
          shader = this.gl.createShader(this.gl.VERTEX_SHADER);
          this.gl.shaderSource(shader, this.vertexShaderSource);
          break;

        case 'fragment':
          shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
          this.gl.shaderSource(shader, this.fragmentShaderSource);
          break;

        default:
          throw new Error("Invalid shader type to create: ".concat(type));
      }

      this.gl.compileShader(shader);

      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        // The shader is not correctly compiled
        throw new Error(this.gl.getShaderInfoLog(shader));
      }

      return shader;
    }
  }, {
    key: "createProgram",
    value: function createProgram() {
      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, this.createShader('vertex'));
      this.gl.attachShader(this.program, this.createShader('fragment'));
      this.gl.linkProgram(this.program);

      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        // The shader program is not correctly linked
        throw new Error(this.gl.getProgramInfoLog(this.program));
      }
    }
  }, {
    key: "initVariableMap",
    value: function initVariableMap() {
      this.gl.useProgram(this.program); // Put all attached information to shader program meta information

      this.variableMap = {};

      for (var attribKey in this.attributeMap) {
        if (this.attributeMap.hasOwnProperty(attribKey)) {
          var attribLocation = this.gl.getAttribLocation(this.program, this.attributeMap[attribKey]);
          this.variableMap[attribKey] = attribLocation;
          this.gl.enableVertexAttribArray(attribLocation);
        }
      }

      for (var uniformKey in this.uniformMap) {
        if (this.uniformMap.hasOwnProperty(uniformKey)) {
          this.variableMap[uniformKey] = this.gl.getUniformLocation(this.program, this.uniformMap[uniformKey]);
        }
      }
    }
  }]);

  return ShaderProgram;
}();



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uProjectionMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat3 uNMatrix;\n\nuniform vec3 uAmbientColor;\n\nuniform vec3 uLightingDirection;\nuniform vec3 uDirectionalColor;\n\nuniform bool uUseLighting;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vLightWeighting;\n\nvoid main (void) {\n  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);\n  vTextureCoord = aTextureCoord;\n\n  if (uUseLighting) {\n    vec3 transformedNormal = uNMatrix * aVertexNormal;\n    float directionalLightWeighting = max(0.0, dot(transformedNormal, uLightingDirection));\n    vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;\n  } else {\n    vLightWeighting = vec3(1.0, 1.0, 1.0);\n  }\n}\n");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("\nprecision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec3 vLightWeighting;\n\nuniform sampler2D uSampler;\nuniform bool uIsBlend;\nuniform float uAlpha;\n\nvoid main(void) {\n  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n  // Adjust textureColor rgb value by light weight\n  if (uIsBlend) {\n    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a * uAlpha);\n  } else {\n    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);\n  }\n}\n");

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  // Some constants
  xAxis: [1.0, 0.0, 0.0],
  yAxis: [0.0, 1.0, 0.0],
  zAxis: [0.0, 0.0, 1.0],
  degToRad: function degToRad(deg) {
    return deg / 180 * Math.PI;
  }
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5N2YwODQxN2M4NTRhMjdhMWI4MiIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4dHVyZXMvZHVjay5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGVzL3NoYXBlVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXBlcy9jdWJlLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFwZXMvc3BoZXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL1NoYWRlclByb2dyYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL2ZyYWdtZW50U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lVXRpbC5qcyJdLCJuYW1lcyI6WyJnYW1lU3RhdGUiLCJmcHMiLCJ1bml2ZXJzZUJsb2NrU2l6ZSIsInVuaXZlcnNlWENvdW50IiwidW5pdmVyc2VZQ291bnQiLCJ1bml2ZXJzZVpDb3VudCIsIm51bU9mU3RhcnMiLCJzdGFyTG9jYXRpb25NYXAiLCJjdXJyZW50UHJlc3NlZEtleXMiLCJzaGFwZVV0aWwiLCJjcmVhdGVBcnJheUJ1ZmZlciIsImdsIiwidmVydHMiLCJ2ZXJ0c09wdGlvbiIsInZlcnREYXRhQ29uc3RydWN0b3IiLCJGbG9hdDMyQXJyYXkiLCJiaW5kVGFyZ2V0IiwiQVJSQVlfQlVGRkVSIiwiaXRlbVNpemUiLCJudW1JdGVtcyIsImxlbmd0aCIsImN1YmVCdWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJiaW5kQnVmZmVyIiwiYnVmZmVyRGF0YSIsIlNUQVRJQ19EUkFXIiwiaW5mbyIsIkdhbWUiLCJnYW1lT3B0aW9ucyIsImNhbnZhcyIsImluaXQiLCJsb29wIiwidGljayIsImJpbmQiLCJkdCIsImhhbmRsZUtleXMiLCJhbmltYXRlIiwiZHJhdyIsImdldENvbnRleHQiLCJhbGVydCIsImdsTm90U3VwcG9ydGVkIiwicmVzaXplQ2FudmFzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlS2V5ZG93biIsImhhbmRsZUtleXVwIiwic2hhZGVyUHJvZ3JhbSIsInNjZW5lIiwiZ2FtZSIsInhpIiwieWkiLCJ6aSIsInJhZGl1cyIsIk1hdGgiLCJyYW5kb20iLCJ4MCIsIngxIiwieCIsInkwIiwieTEiLCJ5IiwiejAiLCJ6MSIsInoiLCJhZGRNb2RlbCIsImUiLCJrZXlDb2RlIiwid2lkdGgiLCJoZWlnaHQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInN0eWxlIiwiY29udGV4dCIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxUZXh0IiwiY2xlYXJDb2xvciIsImVuYWJsZSIsIkRFUFRIX1RFU1QiLCJjYiIsIm5vdyIsIkRhdGUiLCJkdXJhdGlvbiIsImxhc3RSdW4iLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjb250YWN0R2FtZSIsImdldEVsZW1lbnRCeUlkIiwic3RhcnQiLCJTY2VuZSIsInNjZW5lT3B0aW9ucyIsIkVycm9yIiwibW9kZWxWaWV3TWF0cml4U3RhY2siLCJtb2RlbFZpZXdNYXRyaXgiLCJtYXQ0IiwiY3JlYXRlIiwicHJvamVjdGlvbk1hdHJpeCIsIm1vZGVscyIsImNhbWVyYU1hdHJpeCIsInlhdyIsInBpdGNoIiwicm9sbCIsInlhd1JhdGUiLCJwaXRjaFJhdGUiLCJyb2xsUmF0ZSIsImNhbWVyYVNwZWVkIiwibW9kZWwiLCJwdXNoIiwiY29weSIsInBvcCIsInVuaWZvcm1NYXRyaXg0ZnYiLCJ2YXJpYWJsZU1hcCIsInByb2plY3Rpb25NYXRyaXhVbmlmb3JtIiwibW9kZWxWaWV3TWF0cml4VW5pZm9ybSIsIm5vcm1hbE1hdHJpeCIsIm1hdDMiLCJub3JtYWxGcm9tTWF0NCIsInVuaWZvcm1NYXRyaXgzZnYiLCJuTWF0cml4VW5pZm9ybSIsInJvdGF0ZSIsInhBeGlzIiwieUF4aXMiLCJ6QXhpcyIsInhQb3MiLCJzaW4iLCJkZWdUb1JhZCIsImNvcyIsInlQb3MiLCJ6UG9zIiwidHJhbnNsYXRlIiwiaW52ZXJ0IiwiZm9yRWFjaCIsInZpZXdwb3J0IiwiY2xlYXIiLCJDT0xPUl9CVUZGRVJfQklUIiwiREVQVEhfQlVGRkVSX0JJVCIsInBlcnNwZWN0aXZlIiwiQ3ViZSIsIm9wdGlvbnMiLCJpc0JsZW5kIiwiYmxlbmRBbHBoYSIsInRleHR1cmVTcmMiLCJ1c2VMaWdodCIsImFtYmllbnRDb2xvciIsImRpcmVjdGlvbmFsQ29sb3IiLCJsaWdodGluZ0RpcmVjdGlvbiIsInNwZWVkWCIsInNwZWVkWSIsInNwZWVkWiIsInJvdGF0ZVNwZWVkWCIsInJvdGF0ZVNwZWVkWSIsInJvdGF0ZVNwZWVkWiIsInJvdGF0ZVgiLCJyb3RhdGVZIiwicm90YXRlWiIsImN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIiLCJjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyIiwiaW5pdEJ1ZmZlciIsImluaXRUZXh0dXJlIiwiY3ViZVZlcnRleEluZGV4QnVmZmVyIiwiVWludDE2QXJyYXkiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJjcmVhdGVUZXh0dXJlIiwic3JjIiwiY3ViZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJwaXhlbFN0b3JlaSIsIlVOUEFDS19GTElQX1lfV0VCR0wiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORSIsIkJMRU5EIiwiZGlzYWJsZSIsInVuaWZvcm0xaSIsImlzQmxlbmRVbmlmb3JtIiwidW5pZm9ybTFmIiwiYWxwaGFVbmlmb3JtIiwidmVydGV4QXR0cmliUG9pbnRlciIsInZlcnRleFBvc2l0aW9uQXR0cmlidXRlIiwiRkxPQVQiLCJ0ZXh0dXJlQ29vcmRBdHRyaWJ1dGUiLCJhY3RpdmVUZXh0dXJlIiwiVEVYVFVSRTAiLCJzYW1wbGVyVW5pZm9ybSIsInZlcnRleE5vcm1hbEF0dHJpYnV0ZSIsInVzZUxpZ2h0aW5nVW5pZm9ybSIsInVuaWZvcm0zZiIsImFtYmllbnRDb2xvclVuaWZvcm0iLCJkaXJlY3Rpb25hbENvbG9yVW5pZm9ybSIsImFkanVzdGVkTGlnaHREaXJlY3Rpb24iLCJ2ZWMzIiwibm9ybWFsaXplIiwic2NhbGUiLCJ1bmlmb3JtM2Z2IiwibGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtIiwibW9kZWxWaWV3UHVzaE1hdHJpeCIsInNldFVuaWZvcm1NYXRyaXgiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsIm1vZGVsVmlld1BvcE1hdHJpeCIsIlNwaGVyZSIsImxhdGl0dWRlQmFuZHMiLCJmbG9vciIsImxvbmdpdHVkZUJhbmRzIiwicG9zaXRpb25CdWZmZXIiLCJub3JtYWxCdWZmZXIiLCJ0ZXh0dXJlQ29vcmRCdWZmZXIiLCJ2ZXJ0ZXhJbmRleEJ1ZmZlciIsInZlcnRleFBvc2l0aW9uRGF0YSIsIm5vcm1hbERhdGEiLCJ0ZXh0dXJlQ29vcmREYXRhIiwibGF0TnVtYmVyIiwidGhldGEiLCJQSSIsInNpblRoZXRhIiwiY29zVGhldGEiLCJsb25nTnVtYmVyIiwicGhpIiwic2luUGhpIiwiY29zUGhpIiwidSIsInYiLCJpbmRleERhdGEiLCJmaXJzdCIsInNlY29uZCIsIkxJTkVBUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIiwiZGVmYXVsdEF0dHJpYnV0ZU1hcCIsImRlZmF1bHRVbmlmb3JtTWFwIiwiU2hhZGVyUHJvZ3JhbSIsInNoYWRlck9wdGlvbnMiLCJ2ZXJ0ZXhTaGFkZXJTb3VyY2UiLCJmcmFnbWVudFNoYWRlclNvdXJjZSIsImF0dHJpYnV0ZU1hcCIsInVuaWZvcm1NYXAiLCJjcmVhdGVQcm9ncmFtIiwiaW5pdFZhcmlhYmxlTWFwIiwic2hhZGVyVHlwZSIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJGUkFHTUVOVF9TSEFERVIiLCJ0eXBlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsInByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsImdldFByb2dyYW1JbmZvTG9nIiwidXNlUHJvZ3JhbSIsImF0dHJpYktleSIsImhhc093blByb3BlcnR5IiwiYXR0cmliTG9jYXRpb24iLCJnZXRBdHRyaWJMb2NhdGlvbiIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidW5pZm9ybUtleSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsImRlZyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFD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QUtWLE9BQS9CLEVBQXdDLEtBQUtmLFlBQUwsQ0FBa0JzQixTQUFsQixDQUF4QyxDQUFyQjtBQUNBLGVBQUs3SixXQUFMLENBQWlCNkosU0FBakIsSUFBOEJFLGNBQTlCO0FBQ0EsZUFBS25RLEVBQUwsQ0FBUXFRLHVCQUFSLENBQWdDRixjQUFoQztBQUNEO0FBQ0Y7O0FBRUQsV0FBSyxJQUFJRyxVQUFULElBQXVCLEtBQUsxQixVQUE1QixFQUF3QztBQUN0QyxZQUFJLEtBQUtBLFVBQUwsQ0FBZ0JzQixjQUFoQixDQUErQkksVUFBL0IsQ0FBSixFQUFnRDtBQUM5QyxlQUFLbEssV0FBTCxDQUFpQmtLLFVBQWpCLElBQStCLEtBQUt0USxFQUFMLENBQVF1USxrQkFBUixDQUEyQixLQUFLYixPQUFoQyxFQUF5QyxLQUFLZCxVQUFMLENBQWdCMEIsVUFBaEIsQ0FBekMsQ0FBL0I7QUFDRDtBQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7QUN6R1kseTRCOzs7Ozs7O0FDQUEsNGtCOzs7Ozs7OztBQ0FBO0FBQ2I7QUFDQXpKLE9BQUssRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUZNO0FBR2JDLE9BQUssRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUhNO0FBSWJDLE9BQUssRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUpNO0FBTWJHLFVBQVEsRUFBRSxrQkFBQ3NKLEdBQUQsRUFBUztBQUNqQixXQUFPQSxHQUFHLEdBQUcsR0FBTixHQUFZOU4sSUFBSSxDQUFDNEssRUFBeEI7QUFDRDtBQVJZLENBQWYsRSIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTdmMDg0MTdjODU0YTI3YTFiODIiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIyNTkyMjc0YTc1ZTZjMzQzZTZmZTA0NGU2MzJjNDYzYy5wbmdcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZXh0dXJlcy9kdWNrLnBuZ1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImNvbnN0IGdhbWVTdGF0ZSA9IHtcbiAgLy8gR2FtZSBmcmFtZSBwZXIgc2Vjb25kXG4gIGZwczogNjAsXG4gIHVuaXZlcnNlQmxvY2tTaXplOiAyMCxcbiAgdW5pdmVyc2VYQ291bnQ6IDMsXG4gIHVuaXZlcnNlWUNvdW50OiAzLFxuICB1bml2ZXJzZVpDb3VudDogMyxcbiAgbnVtT2ZTdGFyczogOSxcbiAgc3RhckxvY2F0aW9uTWFwOiBbXSxcbiAgY3VycmVudFByZXNzZWRLZXlzOiBbXVxufVxuXG5leHBvcnQgZGVmYXVsdCBnYW1lU3RhdGVcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nYW1lU3RhdGUuanMiLCJjb25zdCBzaGFwZVV0aWwgPSB7XG4gIGNyZWF0ZUFycmF5QnVmZmVyOiAoZ2wsIHZlcnRzID0gW10sIHZlcnRzT3B0aW9uID0ge30pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB2ZXJ0RGF0YUNvbnN0cnVjdG9yID0gRmxvYXQzMkFycmF5LFxuICAgICAgYmluZFRhcmdldCA9IGdsLkFSUkFZX0JVRkZFUixcbiAgICAgIGl0ZW1TaXplID0gMSxcbiAgICAgIG51bUl0ZW1zID0gdmVydHMubGVuZ3RoXG4gICAgfSA9IHZlcnRzT3B0aW9uXG4gICAgXG4gICAgY29uc3QgY3ViZUJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgZ2wuYmluZEJ1ZmZlcihiaW5kVGFyZ2V0LCBjdWJlQnVmZmVyKVxuICAgIFxuICAgIGdsLmJ1ZmZlckRhdGEoYmluZFRhcmdldCwgbmV3IHZlcnREYXRhQ29uc3RydWN0b3IodmVydHMpLCBnbC5TVEFUSUNfRFJBVylcbiAgICBjdWJlQnVmZmVyLmluZm8gPSB7XG4gICAgICBpdGVtU2l6ZSxcbiAgICAgIG51bUl0ZW1zXG4gICAgfVxuICBcbiAgICByZXR1cm4gY3ViZUJ1ZmZlclxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNoYXBlVXRpbFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFwZXMvc2hhcGVVdGlsLmpzIiwiaW1wb3J0IFNjZW5lIGZyb20gJy4vU2NlbmUnXG5pbXBvcnQgQ3ViZSBmcm9tICcuL3NoYXBlcy9jdWJlJ1xuaW1wb3J0IFNwaGVyZSBmcm9tICcuL3NoYXBlcy9zcGhlcmUnXG5pbXBvcnQgU2hhZGVyUHJvZ3JhbSBmcm9tICcuL3NoYWRlcnMvU2hhZGVyUHJvZ3JhbSdcbmltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi9nYW1lU3RhdGUnXG5cbi8vIEVudHJ5IGZpbGUgZm9yIGNvbnRhY3QgZ2FtZVxuLyoqKioqIEdhbWUgY2xhc3MgKioqKiovXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IgKGdhbWVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBmcHMsXG4gICAgICBjYW52YXNcbiAgICB9ID0gZ2FtZU9wdGlvbnNcblxuICAgIHRoaXMuZnBzID0gZnBzXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgfVxuXG4gIC8qKiogR2FtZSBsb29wICoqKi9cbiAgc3RhdGljIGxvb3AgKGdhbWUsIGNiKSB7XG4gICAgY29uc3QgZHQgPSAxMDAwIC8gZ2FtZS5mcHNcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gICAgR2FtZS5sb29wLmR1cmF0aW9uID0gKEdhbWUubG9vcC5kdXJhdGlvbiB8fCAwKSArIG5vdyAtIChHYW1lLmxvb3AubGFzdFJ1biB8fCBub3cpXG4gICAgXG4gICAgd2hpbGUgKEdhbWUubG9vcC5kdXJhdGlvbiA+PSBkdCkge1xuICAgICAgY2IoZHQpXG4gICAgICBHYW1lLmxvb3AuZHVyYXRpb24gLT0gZHRcbiAgICB9XG4gICAgXG4gICAgR2FtZS5sb29wLmxhc3RSdW4gPSBub3dcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IEdhbWUubG9vcChnYW1lLCBjYikpXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgLy8gSW5pdCB0aGUgZ2FtZVxuICAgIHRoaXMuaW5pdCgpXG5cbiAgICAvLyBTdGFydCBhbmltYXRpb24gbG9vcCB0byBkcmF3IGdhbWUgZnJhbWVzXG4gICAgR2FtZS5sb29wKHRoaXMsIHRoaXMudGljay5iaW5kKHRoaXMpKVxuICB9XG5cbiAgdGljayAoZHQpIHtcbiAgICAvLyBDaGVjayB1c2VyIGludGVyYWN0aW9uc1xuICAgIHRoaXMuaGFuZGxlS2V5cyhkdClcblxuICAgIC8vIFVwZGF0ZSBnYW1lIHN0YXRlc1xuICAgIHRoaXMuYW5pbWF0ZShkdClcblxuICAgIC8vIERyYXcgZ2FtZSBmcmFtZVxuICAgIHRoaXMuZHJhdyhkdClcbiAgfVxuXG4gIC8qKiogR2FtZSBJbml0IFBoYXNlICoqKi9cbiAgaW5pdCAoKSB7XG4gICAgLy8gRGV0ZWN0IHdlYmdsIHN1cHBvcnRcbiAgICB0aGlzLmdsID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKVxuICBcbiAgICBpZiAoIXRoaXMuZ2wpIHtcbiAgICAgIGFsZXJ0KCd3ZWJnbCBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICAgIHRoaXMuZ2xOb3RTdXBwb3J0ZWQgPSB0cnVlXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyByZXNpemUgdGhlIGNhbnZhc1xuICAgIHRoaXMucmVzaXplQ2FudmFzKDUwMCwgNTAwKVxuICAgIFxuICAgIC8vIEJpbmQga2V5Ym9hcmQgZXZlbnRzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXl1cC5iaW5kKHRoaXMpKVxuXG4gICAgLy8gSW5pdCBzaGFkZXJzXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gbmV3IFNoYWRlclByb2dyYW0oe1xuICAgICAgZ2w6IHRoaXMuZ2xcbiAgICB9KVxuXG4gICAgLy8gSW5pdCBzY2VuZVxuICAgIHRoaXMuc2NlbmUgPSBuZXcgU2NlbmUoe1xuICAgICAgZ2FtZTogdGhpc1xuICAgIH0pXG5cbiAgICAvLyBUaGUgaW5pdCBsb2dpYyBnb2VzIGJlbG93XG4gICAgLy8gbGV0IGN1YmUgPSBuZXcgQ3ViZSh7XG4gICAgLy8gICBzaGFkZXJQcm9ncmFtOiB0aGlzLnNoYWRlclByb2dyYW0sXG4gICAgLy8gICBzY2VuZTogdGhpcy5zY2VuZVxuICAgIC8vIH0pXG5cbiAgICAvLyB0aGlzLnNjZW5lLmFkZE1vZGVsKGN1YmUpXG5cbiAgICAvLyBDcmVhdGUgdGhlIHVuaXZlcnNlIVxuICAgIC8vIFRoZSB3aG9sZSB1bml2ZXJzZSBpcyBhIGh1Z2UgY3ViZS4gRWFjaCBzdGFyIG9jY3VwaWVzIGEgZnJhY3Rpb24gb2YgdGhhdCBjdWJlLlxuICAgIC8vIFBsYXllciB3aWxsIHN0YXJ0IGF0IGEgcmFuZG9tIHBvc2l0aW9uIGluIHRoZSB1bml2ZXJzZVxuICAgIC8vIFRoZSBob21lIHN0YXIgd2lsbCBzdGFydCBhdCBhbm90aGVyIHJhbmRvbSBwb3NpdGlvbiBpbiB0aGUgdW5pdmVyc2VcbiAgICAvLyBQdXQgdGhlIHBsYXllciBhdCB0aGUgXG4gICAgZm9yIChsZXQgeGkgPSAwOyB4aSA8IGdhbWVTdGF0ZS51bml2ZXJzZVhDb3VudDsgeGkrKykge1xuICAgICAgZm9yIChsZXQgeWkgPSAwOyB5aSA8IGdhbWVTdGF0ZS51bml2ZXJzZVlDb3VudDsgeWkrKykge1xuICAgICAgICBmb3IgKGxldCB6aSA9IDA7IHppIDwgZ2FtZVN0YXRlLnVuaXZlcnNlWkNvdW50OyB6aSsrKSB7XG5cbiAgICAgICAgICBjb25zdCByYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogZ2FtZVN0YXRlLnVuaXZlcnNlQmxvY2tTaXplIC8gMlxuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IHgwID0gKHhpIC0gZ2FtZVN0YXRlLnVuaXZlcnNlWENvdW50IC8gMikgKiBnYW1lU3RhdGUudW5pdmVyc2VCbG9ja1NpemUgKyByYWRpdXNcbiAgICAgICAgICBjb25zdCB4MSA9ICh4aSArIDEgLSBnYW1lU3RhdGUudW5pdmVyc2VYQ291bnQgLyAyKSAqIGdhbWVTdGF0ZS51bml2ZXJzZUJsb2NrU2l6ZSAtIHJhZGl1c1xuICAgICAgICAgIGNvbnN0IHggPSB4MCArICh4MSAtIHgwKSAqIE1hdGgucmFuZG9tKClcblxuICAgICAgICAgIGNvbnN0IHkwID0gKHlpIC0gZ2FtZVN0YXRlLnVuaXZlcnNlWUNvdW50IC8gMikgKiBnYW1lU3RhdGUudW5pdmVyc2VCbG9ja1NpemUgKyByYWRpdXNcbiAgICAgICAgICBjb25zdCB5MSA9ICh5aSArIDEgLSBnYW1lU3RhdGUudW5pdmVyc2VZQ291bnQgLyAyKSAqIGdhbWVTdGF0ZS51bml2ZXJzZUJsb2NrU2l6ZSAtIHJhZGl1c1xuICAgICAgICAgIGNvbnN0IHkgPSB5MCArICh5MSAtIHkwKSAqIE1hdGgucmFuZG9tKClcblxuICAgICAgICAgIGNvbnN0IHowID0gKHppIC0gZ2FtZVN0YXRlLnVuaXZlcnNlWkNvdW50IC8gMikgKiBnYW1lU3RhdGUudW5pdmVyc2VCbG9ja1NpemUgKyByYWRpdXNcbiAgICAgICAgICBjb25zdCB6MSA9ICh6aSArIDEgLSBnYW1lU3RhdGUudW5pdmVyc2VaQ291bnQgLyAyKSAqIGdhbWVTdGF0ZS51bml2ZXJzZUJsb2NrU2l6ZSAtIHJhZGl1c1xuICAgICAgICAgIGNvbnN0IHogPSB6MCArICh6MSAtIHgwKSAqIE1hdGgucmFuZG9tKClcblxuICAgICAgICAgIHRoaXMuc2NlbmUuYWRkTW9kZWwobmV3IFNwaGVyZSh7XG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtOiB0aGlzLnNoYWRlclByb2dyYW0sXG4gICAgICAgICAgICBzY2VuZTogdGhpcy5zY2VuZSxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgeixcbiAgICAgICAgICAgIHJhZGl1c1xuICAgICAgICAgIH0pKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlS2V5ZG93biAoZSkge1xuICAgIGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbZS5rZXlDb2RlXSA9IHRydWVcbiAgfVxuXG4gIGhhbmRsZUtleXVwIChlKSB7XG4gICAgZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1tlLmtleUNvZGVdID0gZmFsc2VcbiAgfVxuXG4gIHJlc2l6ZUNhbnZhcyAod2lkdGgsIGhlaWdodCkge1xuICAgIGlmICh0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCAhPT0gd2lkdGggfHwgdGhpcy5jYW52YXMub2Zmc2V0SGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLm9mZnNldFdpZHRoID0gd2lkdGggKyAncHgnXG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5vZmZzZXRIZWlnaHQgPSBoZWlnaHQgKyAncHgnXG4gICAgfVxuICAgIFxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcbiAgfVxuXG4gIC8qKiogR2FtZSBEcmF3IFBoYXNlICoqKi9cbiAgaGFuZGxlS2V5cyAoZHQpIHtcbiAgICB0aGlzLnNjZW5lLmhhbmRsZUtleXMoZHQpXG4gIH1cblxuICBhbmltYXRlIChkdCkge1xuICAgIHRoaXMuc2NlbmUuYW5pbWF0ZShkdClcbiAgfVxuXG4gIGRyYXcgKGR0KSB7XG4gICAgaWYgKHRoaXMuZ2xOb3RTdXBwb3J0ZWQpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICBjb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnXG4gICAgICBjb250ZXh0LmZpbGxUZXh0KCdXZWJHTCBpcyBub3Qgc3VwcG9ydGVkIDooJywgdGhpcy5jYW52YXMud2lkdGggLyAyLCB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMClcbiAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpXG4gICAgdGhpcy5zY2VuZS5kcmF3KGR0KVxuICB9XG59XG5cbi8vIENyZWF0ZSBnYW1lIGluc3RhbmNlXG5jb25zdCBjb250YWN0R2FtZSA9IG5ldyBHYW1lKHtcbiAgZnBzOiBnYW1lU3RhdGUuZnBzLFxuICBjYW52YXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFnZScpXG59KVxuXG4vLyBTdGFydCBnYW1lXG5jb250YWN0R2FtZS5zdGFydCgpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFjdC5qcyIsImltcG9ydCBnYW1lVXRpbCBmcm9tICcuL2dhbWVVdGlsJ1xuaW1wb3J0IGdhbWVTdGF0ZSBmcm9tICcuL2dhbWVTdGF0ZSdcblxuLyoqKioqIFNjZW5lIGNsYXNzICoqKioqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmUge1xuICBjb25zdHJ1Y3RvciAoc2NlbmVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBnYW1lXG4gICAgfSA9IHNjZW5lT3B0aW9uc1xuXG4gICAgaWYgKCFnYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhbWUgZm9yIHRoZSBzY2VuZScpXG4gICAgfVxuICAgIFxuICAgIHRoaXMuZ2wgPSBnYW1lLmdsXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gZ2FtZS5zaGFkZXJQcm9ncmFtXG4gICAgdGhpcy5jYW52YXMgPSBnYW1lLmNhbnZhc1xuXG4gICAgLy8gRWFjaCBzY2VuZSBoYXMgaXQncyBvd24gbW9kZWwgdmlldyBtYXRyaXggYW5kIHByb2plY3QgbWF0cml4XG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjayA9IFtdXG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG4gICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKVxuXG4gICAgdGhpcy5tb2RlbHMgPSBbXVxuXG4gICAgLy8gRGVmaW5lIGNhbWVyYSBtYXRyaXggZm9yIGNvbnRyb2xsaW5nIGZpcnN0IHBlcnNvbiB2aWV3XG4gICAgdGhpcy5jYW1lcmFNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG4gICAgdGhpcy55YXcgPSAwXG4gICAgdGhpcy5waXRjaCA9IDBcbiAgICB0aGlzLnJvbGwgPSAwXG4gICAgdGhpcy55YXdSYXRlID0gMFxuICAgIHRoaXMucGl0Y2hSYXRlID0gMFxuICAgIHRoaXMucm9sbFJhdGUgPSAwXG4gICAgdGhpcy5jYW1lcmFTcGVlZCA9IDBcbiAgfVxuXG4gIGFkZE1vZGVsIChtb2RlbCkge1xuICAgIHRoaXMubW9kZWxzLnB1c2gobW9kZWwpXG4gIH1cblxuICBtb2RlbFZpZXdQdXNoTWF0cml4ICgpIHtcbiAgICBsZXQgY29weSA9IG1hdDQuY3JlYXRlKClcbiAgICBtYXQ0LmNvcHkoY29weSwgdGhpcy5tb2RlbFZpZXdNYXRyaXgpXG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjay5wdXNoKGNvcHkpXG4gIH1cblxuICBtb2RlbFZpZXdQb3BNYXRyaXggKCkge1xuICAgIGlmICh0aGlzLm1vZGVsVmlld01hdHJpeFN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbXB0eSBtb2RlbCB2aWV3IG1hdHJpeCBzdGFjaycpXG4gICAgfVxuICAgIFxuICAgIHRoaXMubW9kZWxWaWV3TWF0cml4ID0gdGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjay5wb3AoKVxuICB9XG5cbiAgc2V0VW5pZm9ybU1hdHJpeCAoKSB7XG4gICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5wcm9qZWN0aW9uTWF0cml4VW5pZm9ybSwgZmFsc2UsIHRoaXMucHJvamVjdGlvbk1hdHJpeClcbiAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLm1vZGVsVmlld01hdHJpeFVuaWZvcm0sIGZhbHNlLCB0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgXG4gICAgLy8gR2V0IHRoZSByaWdodCBub3JtYWwgbWF0cml4XG4gICAgbGV0IG5vcm1hbE1hdHJpeCA9IG1hdDMuY3JlYXRlKClcbiAgICBtYXQzLm5vcm1hbEZyb21NYXQ0KG5vcm1hbE1hdHJpeCwgdGhpcy5tb2RlbFZpZXdNYXRyaXgpXG4gICAgdGhpcy5nbC51bmlmb3JtTWF0cml4M2Z2KHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5uTWF0cml4VW5pZm9ybSwgZmFsc2UsIG5vcm1hbE1hdHJpeClcbiAgfVxuXG4gIGhhbmRsZUtleXMgKGR0KSB7XG4gICAgLy8gUGxheWVyIGNhbiBjb250cm9sIHdoZXJlIGhlIGlzIGluIHRoZSB1bml2ZXJzZVxuICAgIC8vIHNwYWNlIHRvIG1vdmUgZm9yd2FyZCBvbiB0aGUgY3VycmVudCBkaXJlY3Rpb25cbiAgICAvLyBhcnJvdyBrZXkgdG8gdGlsdCB1cCwgZG93biAocGl0Y2gpLCBvciByb3RhdGUgbGVmdCBvciByaWdodCAocm9sbClcbiAgICAvLyBFIGtleSB0byB0dXJuIGxlZnQgKHBpdGNoKVxuICAgIC8vIFIga2V5IHRvIHR1cm4gcmlnaHQgKHBpdGNoKVxuXG4gICAgLy8gc3BhY2VcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szMl0gJiYgdGhpcy5jYW1lcmFTcGVlZCA8IDEpIHtcbiAgICAgIHRoaXMuY2FtZXJhU3BlZWQgKz0gMC4wMDFcbiAgICB9XG4gICAgXG4gICAgLy8gdXBcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szOF0gJiYgdGhpcy5waXRjaFJhdGUgPiAtMC4xKSB7XG4gICAgICB0aGlzLnBpdGNoUmF0ZSAtPSAwLjAzXG4gICAgfVxuXG4gICAgLy8gZG93blxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzQwXSAmJiB0aGlzLnBpdGNoUmF0ZSA8IDAuMSkge1xuICAgICAgdGhpcy5waXRjaFJhdGUgKz0gMC4wM1xuICAgIH1cblxuICAgIC8vIGxlZnRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szN10gJiYgdGhpcy5yb2xsUmF0ZSA+IC0wLjEpIHtcbiAgICAgIHRoaXMucm9sbFJhdGUgLT0gMC4wM1xuICAgIH1cblxuICAgIC8vIHJpZ2h0XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbMzldICYmIHRoaXMucm9sbFJhdGUgPCAwLjEpIHtcbiAgICAgIHRoaXMucm9sbFJhdGUgKz0gMC4wM1xuICAgIH1cblxuICAgIC8vIEUga2V5XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNjldICYmIHRoaXMueWF3UmF0ZSA+IC0wLjEpIHtcbiAgICAgIHRoaXMueWF3UmF0ZSAtPSAwLjAzXG4gICAgfVxuICAgIFxuICAgIC8vIFIga2V5XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbODJdICYmIHRoaXMueWF3UmF0ZSA8IDAuMSkge1xuICAgICAgdGhpcy55YXdSYXRlICs9IDAuMDNcbiAgICB9XG4gICAgXG4gICAgLy8gdGhpcy5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiBtb2RlbC5oYW5kbGVLZXlzKGR0KSlcbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgLy8gVXBkYXRlIGNhbWVyYSByb3RhdGlvbnNcbiAgICB0aGlzLnlhdyA9IHRoaXMueWF3UmF0ZSAqIGR0IC8gMTAwMFxuICAgIHRoaXMucGl0Y2ggPSB0aGlzLnBpdGNoUmF0ZSAqIGR0IC8gMTAwMFxuICAgIHRoaXMucm9sbCA9IHRoaXMucm9sbFJhdGUgKiBkdCAvIDEwMDBcblxuICAgIG1hdDQucm90YXRlKHRoaXMuY2FtZXJhTWF0cml4LCB0aGlzLmNhbWVyYU1hdHJpeCwgdGhpcy5waXRjaCwgZ2FtZVV0aWwueEF4aXMpXG4gICAgbWF0NC5yb3RhdGUodGhpcy5jYW1lcmFNYXRyaXgsIHRoaXMuY2FtZXJhTWF0cml4LCB0aGlzLnlhdywgZ2FtZVV0aWwueUF4aXMpXG4gICAgbWF0NC5yb3RhdGUodGhpcy5jYW1lcmFNYXRyaXgsIHRoaXMuY2FtZXJhTWF0cml4LCB0aGlzLnJvbGwsIGdhbWVVdGlsLnpBeGlzKVxuXG4gICAgLy8gVXBkYXRlIHNjZW5lIGNhbWVyYSBtYXRyaXhcbiAgICBpZiAodGhpcy5jYW1lcmFTcGVlZCAhPT0gMCkge1xuICAgICAgbGV0IHhQb3MgPSBkdCAqIHRoaXMuY2FtZXJhU3BlZWQgKiBNYXRoLnNpbihnYW1lVXRpbC5kZWdUb1JhZCh0aGlzLnlhdykpICogTWF0aC5jb3MoZ2FtZVV0aWwuZGVnVG9SYWQodGhpcy5yb2xsKSlcbiAgICAgIGxldCB5UG9zID0gZHQgKiB0aGlzLmNhbWVyYVNwZWVkICogTWF0aC5zaW4oZ2FtZVV0aWwuZGVnVG9SYWQodGhpcy5waXRjaCkpICogKC1NYXRoLnNpbihnYW1lVXRpbC5kZWdUb1JhZCh0aGlzLnJvbGwpKSlcbiAgICAgIGxldCB6UG9zID0gLWR0ICogdGhpcy5jYW1lcmFTcGVlZCAqICgtTWF0aC5jb3MoZ2FtZVV0aWwuZGVnVG9SYWQodGhpcy55YXcpKSkgKiAoLU1hdGguY29zKGdhbWVVdGlsLmRlZ1RvUmFkKHRoaXMucGl0Y2gpKSlcbiAgICAgIG1hdDQudHJhbnNsYXRlKHRoaXMuY2FtZXJhTWF0cml4LCB0aGlzLmNhbWVyYU1hdHJpeCwgW3hQb3MsIHlQb3MsIHpQb3NdKVxuICAgIH1cblxuICAgIG1hdDQuaW52ZXJ0KHRoaXMubW9kZWxWaWV3TWF0cml4LCB0aGlzLmNhbWVyYU1hdHJpeClcblxuICAgIHRoaXMubW9kZWxzLmZvckVhY2gobW9kZWwgPT4gbW9kZWwuYW5pbWF0ZShkdCkpXG4gIH1cblxuICBkcmF3IChkdCkge1xuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcbiAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVClcbiAgICBcbiAgICBtYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdGlvbk1hdHJpeCwgMTIwLCB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuY2FudmFzLmhlaWdodCwgMC4xLCA1MDApXG4gICAgLy8gbWF0NC5pZGVudGl0eSh0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgICBcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG1vZGVsID0+IG1vZGVsLmRyYXcoZHQpKVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NjZW5lLmpzIiwiaW1wb3J0IHNoYXBlVXRpbCBmcm9tICcuL3NoYXBlVXRpbCdcbmltcG9ydCBnYW1lVXRpbCBmcm9tICcuLi9nYW1lVXRpbCdcbmltcG9ydCBkZWZhdWx0VGV4dHVyZVNyYyBmcm9tICcuLi90ZXh0dXJlcy9kdWNrLnBuZydcbmltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi4vZ2FtZVN0YXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB7XG4gICAgICBzY2VuZSxcbiAgICAgIHNoYWRlclByb2dyYW0sXG4gICAgICBpc0JsZW5kID0gZmFsc2UsXG4gICAgICBibGVuZEFscGhhID0gMC41LFxuICAgICAgdGV4dHVyZVNyYyA9IGRlZmF1bHRUZXh0dXJlU3JjLFxuICAgICAgdXNlTGlnaHQgPSB0cnVlLFxuICAgICAgYW1iaWVudENvbG9yID0gWzAuMiwgMC4yLCAwLjJdLFxuICAgICAgZGlyZWN0aW9uYWxDb2xvciA9IFswLjgsIDAuOCwgMC44XSxcbiAgICAgIGxpZ2h0aW5nRGlyZWN0aW9uID0gWzAuMCwgMC4wLCAtMS4wXSxcbiAgICAgIHggPSAwLFxuICAgICAgeSA9IDAsXG4gICAgICB6ID0gLTUsXG4gICAgICBzcGVlZFggPSAwLFxuICAgICAgc3BlZWRZID0gMCxcbiAgICAgIHNwZWVkWiA9IDAsXG4gICAgICByb3RhdGVTcGVlZFggPSAwLFxuICAgICAgcm90YXRlU3BlZWRZID0gMCxcbiAgICAgIHJvdGF0ZVNwZWVkWiA9IDAsXG4gICAgICByb3RhdGVYID0gMCxcbiAgICAgIHJvdGF0ZVkgPSAwLFxuICAgICAgcm90YXRlWiA9IDBcbiAgICB9ID0gb3B0aW9uc1xuXG4gICAgaWYgKCFzaGFkZXJQcm9ncmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNoYWRlciBwcm9ncmFtIHByb3ZpZGVkIScpXG4gICAgfVxuXG4gICAgaWYgKCFzY2VuZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzY2VuZSBmb3IgdGhpcyBzaGFwZScsIHRoaXMpXG4gICAgfVxuXG4gICAgdGhpcy5nbCA9IHNoYWRlclByb2dyYW0uZ2xcbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBzaGFkZXJQcm9ncmFtXG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lXG4gICAgdGhpcy5pc0JsZW5kID0gaXNCbGVuZFxuICAgIHRoaXMuYmxlbmRBbHBoYSA9IGJsZW5kQWxwaGFcbiAgICB0aGlzLnRleHR1cmVTcmMgPSB0ZXh0dXJlU3JjXG4gICAgdGhpcy51c2VMaWdodCA9IHVzZUxpZ2h0XG4gICAgdGhpcy5hbWJpZW50Q29sb3IgPSBhbWJpZW50Q29sb3JcbiAgICB0aGlzLmRpcmVjdGlvbmFsQ29sb3IgPSBkaXJlY3Rpb25hbENvbG9yXG4gICAgdGhpcy5saWdodGluZ0RpcmVjdGlvbiA9IGxpZ2h0aW5nRGlyZWN0aW9uXG5cbiAgICAvLyBtb3ZlIHNwZWVkc1xuICAgIHRoaXMuc3BlZWRYID0gc3BlZWRYXG4gICAgdGhpcy5zcGVlZFkgPSBzcGVlZFlcbiAgICB0aGlzLnNwZWVkWiA9IHNwZWVkWlxuXG4gICAgLy8gcG9zaXRpb25cbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMueiA9IHpcblxuICAgIC8vIHJvdGF0ZSBzcGVlZHNcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWCA9IHJvdGF0ZVNwZWVkWFxuICAgIHRoaXMucm90YXRlU3BlZWRZID0gcm90YXRlU3BlZWRZXG4gICAgdGhpcy5yb3RhdGVTcGVlZFogPSByb3RhdGVTcGVlZFpcblxuICAgIC8vIHJvdGF0ZSByYWRpdXNcbiAgICB0aGlzLnJvdGF0ZVggPSByb3RhdGVYXG4gICAgdGhpcy5yb3RhdGVZID0gcm90YXRlWVxuICAgIHRoaXMucm90YXRlWiA9IHJvdGF0ZVpcblxuICAgIC8vIHZlcnRleCBidWZmZXJcbiAgICB0aGlzLmN1YmVCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBub3JtYWwgYnVmZmVyXG4gICAgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gdGV4dHVyZSBidWZmZXJcbiAgICB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBpbml0IHRoZSBjdWJlXG4gICAgdGhpcy5pbml0QnVmZmVyKClcbiAgICB0aGlzLmluaXRUZXh0dXJlKClcbiAgfVxuXG4gIGluaXRCdWZmZXIgKCkge1xuICAgIHRoaXMuY3ViZUJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBbXG4gICAgICAvLyBmcm9udFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAtMS4wLCAxLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcbiAgICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIGJhY2tcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAgIFxuICAgICAgLy8gdG9wXG4gICAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gYm90dG9tXG4gICAgICAtMS4wLCAtMS4wLCAxLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAxLjAsXG5cbiAgICAgIC8vIHJpZ2h0XG4gICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcblxuICAgICAgLy8gbGVmdFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAxLjAsIC0xLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgMS4wXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDMsXG4gICAgICBudW1JdGVtczogMjRcbiAgICB9KVxuXG4gICAgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIFtcbiAgICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIEJhY2sgZmFjZVxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG5cbiAgICAgIC8vIFRvcCBmYWNlXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuXG4gICAgICAvLyBCb3R0b20gZmFjZVxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG5cbiAgICAgIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG5cbiAgICAgIC8vIExlZnQgZmFjZVxuICAgICAgLTEuMCwgMC4wLCAwLjAsXG4gICAgICAtMS4wLCAwLjAsIDAuMCxcbiAgICAgIC0xLjAsIDAuMCwgMC4wLFxuICAgICAgLTEuMCwgMC4wLCAwLjBcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMyxcbiAgICAgIG51bUl0ZW1zOiAyNFxuICAgIH0pXG5cbiAgICB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgW1xuICAgICAgLy8gRnJvbnQgZmFjZVxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG5cbiAgICAgIC8vIEJhY2sgZmFjZVxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG5cbiAgICAgIC8vIFRvcCBmYWNlXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcblxuICAgICAgLy8gQm90dG9tIGZhY2VcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuXG4gICAgICAvLyBSaWdodCBmYWNlXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcblxuICAgICAgLy8gTGVmdCBmYWNlXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMixcbiAgICAgIG51bUl0ZW1zOiAyNFxuICAgIH0pXG5cbiAgICB0aGlzLmN1YmVWZXJ0ZXhJbmRleEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBbXG4gICAgICAwLCAxLCAyLCAgICAgIDAsIDIsIDMsICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDQsIDUsIDYsICAgICAgNCwgNiwgNywgICAgLy8gQmFjayBmYWNlXG4gICAgICA4LCA5LCAxMCwgICAgIDgsIDEwLCAxMSwgIC8vIFRvcCBmYWNlXG4gICAgICAxMiwgMTMsIDE0LCAgIDEyLCAxNCwgMTUsIC8vIEJvdHRvbSBmYWNlXG4gICAgICAxNiwgMTcsIDE4LCAgIDE2LCAxOCwgMTksIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDIwLCAyMSwgMjIsICAgMjAsIDIyLCAyMyAgLy8gTGVmdCBmYWNlXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDEsXG4gICAgICBudW1JdGVtczogMzYsXG4gICAgICB2ZXJ0RGF0YUNvbnN0cnVjdG9yOiBVaW50MTZBcnJheSxcbiAgICAgIGJpbmRUYXJnZXQ6IHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVJcbiAgICB9KVxuICB9XG5cbiAgaW5pdFRleHR1cmUgKCkge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKClcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZVRleHR1cmUoaW1hZ2UpXG4gICAgfVxuXG4gICAgaW1hZ2Uuc3JjID0gdGhpcy50ZXh0dXJlU3JjXG4gIH1cblxuICBjcmVhdGVUZXh0dXJlIChpbWFnZSkge1xuICAgIHRoaXMuY3ViZVRleHR1cmUgPSB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKVxuICAgIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UgPSBpbWFnZVxuICAgIFxuICAgIC8vIENvbmZpZyB0ZXh0dXJlIHJlbGF0ZWQgbG9naWNcbiAgICAvLyB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZSlcbiAgICAvLyB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbiAgICAvLyB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlLmltYWdlKVxuICAgIC8vIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLkxJTkVBUilcbiAgICAvLyB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpXG4gICAgLy8gdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLmdsLlRFWFRVUkVfMkQpXG5cbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZSlcbiAgICB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbiAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlLmltYWdlKVxuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLk5FQVJFU1QpXG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTkVBUkVTVClcblxuICAgIC8vIEl0J3MgYWx3YXlzIGdvb2QgdG8gcmVzZXQgYWN0aXZlIHRleHR1cmUgZmxhZ1xuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBudWxsKVxuICB9XG5cbiAgaGFuZGxlS2V5cyAoZHQpIHtcbiAgICAvLyBDYWxjdWxhdGUgcm90YXRpb25zXG4gICAgLy8gdXBcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szOF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPiAtNTApIHtcbiAgICAgIHRoaXMucm90YXRlU3BlZWRYIC09IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBkb3duXG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNDBdICYmIHRoaXMucm90YXRlU3BlZWRYIDwgNTApIHtcbiAgICAgIHRoaXMucm90YXRlU3BlZWRYICs9IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBsZWZ0XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbMzddICYmIHRoaXMucm90YXRlU3BlZWRZID4gLTUwKSB7XG4gICAgICB0aGlzLnJvdGF0ZVNwZWVkWSAtPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gdXBcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szOV0gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPCA1MCkge1xuICAgICAgdGhpcy5yb3RhdGVTcGVlZFkgKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIHpvb20gb3V0XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNDldICYmIHRoaXMueiA+IC0zMCkge1xuICAgICAgdGhpcy56IC09IDAuMlxuICAgIH1cbiAgICBcbiAgICAvLyB6b29tIGluXG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNTBdICYmIHRoaXMueiA8IC0xKSB7XG4gICAgICB0aGlzLnogKz0gMC4yXG4gICAgfVxuICB9XG5cbiAgYW5pbWF0ZSAoZHQpIHtcbiAgICB0aGlzLnJvdGF0ZVggKz0gZ2FtZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWCkgLyAxMDBcbiAgICB0aGlzLnJvdGF0ZVkgKz0gZ2FtZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWSkgLyAxMDBcbiAgICB0aGlzLnJvdGF0ZVogKz0gZ2FtZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWikgLyAxMDBcbiAgfVxuXG4gIGRyYXcgKCkge1xuICAgIC8vIENoZWNrIGlmIG5lZWQgdG8gYmxlbmRcbiAgICBpZiAodGhpcy5pc0JsZW5kKSB7XG4gICAgICAvLyBBZGQgYmxlbmRpbmcgZWZmZWN0IHRvIHNpbXVsYXRlIHRyYW5zcGFyZW5jeVxuICAgICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FKTtcbiAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgICAgdGhpcy5nbC5kaXNhYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XG4gICAgICAvLyBQYXNzIGFscGhhIHVuaWZvcm0gdG8gc2hhZGVyXG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuaXNCbGVuZFVuaWZvcm0sIHRydWUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmFscGhhVW5pZm9ybSwgdGhpcy5ibGVuZEFscGhhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpXG4gICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5CTEVORClcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5pc0JsZW5kVW5pZm9ybSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIFBhc3MgdmVydGV4IHBvc2l0aW9uIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC52ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZSwgdGhpcy5jdWJlQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIFBhc3MgdGV4dHVyZSBjb29yZGluYXRlcyBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyKVxuICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAudGV4dHVyZUNvb3JkQXR0cmlidXRlLCB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG5cbiAgICAvLyBBY3RpdmUgdGV4dHVyZSB1c2luZyB0aGUgZmlyc3QgdGV4dHVyZSB1bml0XG4gICAgdGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTApXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnNhbXBsZXJVbmlmb3JtLCAwKVxuXG4gICAgLy8gUGFzcyBub3JtYWxzIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC52ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUsIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlci5pbmZvLml0ZW1TaXplLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgICBcbiAgICAvLyBBZGQgbGlnaHRcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAudXNlTGlnaHRpbmdVbmlmb3JtLCAhIXRoaXMudXNlTGlnaHQpXG4gICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmFtYmllbnRDb2xvclVuaWZvcm0sIHRoaXMuYW1iaWVudENvbG9yWzBdLCB0aGlzLmFtYmllbnRDb2xvclsxXSwgdGhpcy5hbWJpZW50Q29sb3JbMl0pXG4gICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMF0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclsxXSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzJdKVxuXG4gICAgbGV0IGFkanVzdGVkTGlnaHREaXJlY3Rpb24gPSB2ZWMzLmNyZWF0ZSgpXG4gICAgLy8gTm9ybWFsaXplIHNvIHRoYXQgdGhlIGRvdCBwcm9kdWN0IGlzIHRoZSBzYW1lIHRvIGNvc2luZVxuICAgIHZlYzMubm9ybWFsaXplKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIHRoaXMubGlnaHRpbmdEaXJlY3Rpb24pXG4gICAgLy8gUmV2ZXJzZSB0aGUgZGlyZWN0aW9uIHRvIGRlc2NyaWJlIGxpZ2h0IHNvdXJjZVxuICAgIHZlYzMuc2NhbGUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgLTEpXG4gICAgLy8gUGFzcyBsaWdodGluZyBkaXJlY3Rpb24gdW5pZm9ybSB0byBzaGFkZXJcbiAgICB0aGlzLmdsLnVuaWZvcm0zZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbilcblxuICAgIC8vIFRyYW5zZm9ybSBtb2RlbCB2aWV3IG1hdHJpeFxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UHVzaE1hdHJpeCgpXG4gICAgbWF0NC50cmFuc2xhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCBbdGhpcy54LCB0aGlzLnksIHRoaXMuel0pXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVgsIGdhbWVVdGlsLnhBeGlzKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVZLCBnYW1lVXRpbC55QXhpcylcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWiwgZ2FtZVV0aWwuekF4aXMpXG4gICAgXG4gICAgLy8gUGFzcyB0aGUgbW9kZWwgdmlldyBtYXRyaXgsIHByb2plY3Rpb24gbWF0cml4IGFuZCBub3JtYWwgbWF0cml4IGludG8gc2hhZGVyXG4gICAgdGhpcy5zY2VuZS5zZXRVbmlmb3JtTWF0cml4KClcbiAgICBcbiAgICAvLyBkcmF3IHRoZSBjdWJlXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyKVxuICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuZ2wuVFJJQU5HTEVTLCB0aGlzLmN1YmVWZXJ0ZXhJbmRleEJ1ZmZlci5pbmZvLm51bUl0ZW1zLCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKVxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UG9wTWF0cml4KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXBlcy9jdWJlLmpzIiwiaW1wb3J0IHNoYXBlVXRpbCBmcm9tICcuL3NoYXBlVXRpbCdcbmltcG9ydCBnYW1lVXRpbCBmcm9tICcuLi9nYW1lVXRpbCdcbmltcG9ydCBkZWZhdWx0VGV4dHVyZVNyYyBmcm9tICcuLi90ZXh0dXJlcy9kdWNrLnBuZydcbmltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi4vZ2FtZVN0YXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGhlcmUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIHNjZW5lLFxuICAgICAgc2hhZGVyUHJvZ3JhbSxcbiAgICAgIGlzQmxlbmQgPSBmYWxzZSxcbiAgICAgIGJsZW5kQWxwaGEgPSAwLjUsXG4gICAgICB0ZXh0dXJlU3JjID0gZGVmYXVsdFRleHR1cmVTcmMsXG4gICAgICB1c2VMaWdodCA9IHRydWUsXG4gICAgICBhbWJpZW50Q29sb3IgPSBbMC4yLCAwLjIsIDAuMl0sXG4gICAgICBkaXJlY3Rpb25hbENvbG9yID0gWzAuOCwgMC44LCAwLjhdLFxuICAgICAgbGlnaHRpbmdEaXJlY3Rpb24gPSBbMC4wLCAwLjAsIC0xLjBdLFxuICAgICAgeCA9IDAsXG4gICAgICB5ID0gMCxcbiAgICAgIHogPSAtMTAsXG4gICAgICBzcGVlZFggPSAwLFxuICAgICAgc3BlZWRZID0gMCxcbiAgICAgIHNwZWVkWiA9IDAsXG4gICAgICByb3RhdGVTcGVlZFggPSBNYXRoLnJhbmRvbSgpICogMTUsXG4gICAgICByb3RhdGVTcGVlZFkgPSBNYXRoLnJhbmRvbSgpICogMTUsXG4gICAgICByb3RhdGVTcGVlZFogPSBNYXRoLnJhbmRvbSgpICogMTUsXG4gICAgICByb3RhdGVYID0gMCxcbiAgICAgIHJvdGF0ZVkgPSAwLFxuICAgICAgcm90YXRlWiA9IDAsXG5cbiAgICAgIHJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiAyMCxcbiAgICAgIGxhdGl0dWRlQmFuZHMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyA1LFxuICAgICAgbG9uZ2l0dWRlQmFuZHMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyA1XG4gICAgfSA9IG9wdGlvbnNcblxuICAgIGlmICghc2hhZGVyUHJvZ3JhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzaGFkZXIgcHJvZ3JhbSBwcm92aWRlZCEnKVxuICAgIH1cblxuICAgIGlmICghc2NlbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2NlbmUgZm9yIHRoaXMgc2hhcGUnLCB0aGlzKVxuICAgIH1cblxuICAgIHRoaXMuZ2wgPSBzaGFkZXJQcm9ncmFtLmdsXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gc2hhZGVyUHJvZ3JhbVxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxuICAgIHRoaXMuaXNCbGVuZCA9IGlzQmxlbmRcbiAgICB0aGlzLmJsZW5kQWxwaGEgPSBibGVuZEFscGhhXG4gICAgdGhpcy50ZXh0dXJlU3JjID0gdGV4dHVyZVNyY1xuICAgIHRoaXMudXNlTGlnaHQgPSB1c2VMaWdodFxuICAgIHRoaXMuYW1iaWVudENvbG9yID0gYW1iaWVudENvbG9yXG4gICAgdGhpcy5kaXJlY3Rpb25hbENvbG9yID0gZGlyZWN0aW9uYWxDb2xvclxuICAgIHRoaXMubGlnaHRpbmdEaXJlY3Rpb24gPSBsaWdodGluZ0RpcmVjdGlvblxuXG4gICAgLy8gbW92ZSBzcGVlZHNcbiAgICB0aGlzLnNwZWVkWCA9IHNwZWVkWFxuICAgIHRoaXMuc3BlZWRZID0gc3BlZWRZXG4gICAgdGhpcy5zcGVlZFogPSBzcGVlZFpcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnogPSB6XG5cbiAgICAvLyByb3RhdGUgc3BlZWRzXG4gICAgdGhpcy5yb3RhdGVTcGVlZFggPSByb3RhdGVTcGVlZFhcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWSA9IHJvdGF0ZVNwZWVkWVxuICAgIHRoaXMucm90YXRlU3BlZWRaID0gcm90YXRlU3BlZWRaXG5cbiAgICAvLyByb3RhdGUgcmFkaXVzXG4gICAgdGhpcy5yb3RhdGVYID0gcm90YXRlWFxuICAgIHRoaXMucm90YXRlWSA9IHJvdGF0ZVlcbiAgICB0aGlzLnJvdGF0ZVogPSByb3RhdGVaXG5cbiAgICAvLyB2ZXJ0ZXggYnVmZmVyXG4gICAgdGhpcy5wb3NpdGlvbkJ1ZmZlciA9IG51bGxcblxuICAgIC8vIG5vcm1hbCBidWZmZXJcbiAgICB0aGlzLm5vcm1hbEJ1ZmZlciA9IG51bGxcblxuICAgIC8vIHRleHR1cmUgYnVmZmVyXG4gICAgdGhpcy50ZXh0dXJlQ29vcmRCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBpbmRleCBidWZmZXJcbiAgICB0aGlzLnZlcnRleEluZGV4QnVmZmVyID0gbnVsbFxuXG4gICAgLy8gU3BoZXJlIHRoaW5nc1xuICAgIHRoaXMubGF0aXR1ZGVCYW5kcyA9IGxhdGl0dWRlQmFuZHNcbiAgICB0aGlzLmxvbmdpdHVkZUJhbmRzID0gbG9uZ2l0dWRlQmFuZHNcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1c1xuXG4gICAgLy8gaW5pdCB0aGUgY3ViZVxuICAgIHRoaXMuaW5pdEJ1ZmZlcigpXG4gICAgdGhpcy5pbml0VGV4dHVyZSgpXG4gIH1cblxuICBpbml0QnVmZmVyICgpIHtcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGFycmF5IGRhdGFcbiAgICBjb25zdCB2ZXJ0ZXhQb3NpdGlvbkRhdGEgPSBbXVxuICAgIGNvbnN0IG5vcm1hbERhdGEgPSBbXVxuICAgIGNvbnN0IHRleHR1cmVDb29yZERhdGEgPSBbXVxuICAgIFxuICAgIGZvciAobGV0IGxhdE51bWJlciA9IDA7IGxhdE51bWJlciA8PSB0aGlzLmxhdGl0dWRlQmFuZHM7IGxhdE51bWJlcisrKSB7XG4gICAgICBsZXQgdGhldGEgPSBsYXROdW1iZXIgKiBNYXRoLlBJIC8gdGhpcy5sYXRpdHVkZUJhbmRzXG4gICAgICBsZXQgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSlcbiAgICAgIGxldCBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKVxuXG4gICAgICBmb3IgKGxldCBsb25nTnVtYmVyID0gMDsgbG9uZ051bWJlciA8PSB0aGlzLmxvbmdpdHVkZUJhbmRzOyBsb25nTnVtYmVyKyspIHtcbiAgICAgICAgbGV0IHBoaSA9IGxvbmdOdW1iZXIgKiAyICogTWF0aC5QSSAvIHRoaXMubG9uZ2l0dWRlQmFuZHNcbiAgICAgICAgbGV0IHNpblBoaSA9IE1hdGguc2luKHBoaSlcbiAgICAgICAgbGV0IGNvc1BoaSA9IE1hdGguY29zKHBoaSlcblxuICAgICAgICAvLyBDb252ZXJ0IHJhZGl1cyBjb29yZGluYXRlIGludG8gY2FydGVzaWFuIGNvb3JkaW5hdGUgKGFzc3VtZSByYWRpdXMgaXMgdW5pdCkuXG4gICAgICAgIGxldCB4ID0gc2luVGhldGEgKiBjb3NQaGlcbiAgICAgICAgbGV0IHkgPSBjb3NUaGV0YVxuICAgICAgICBsZXQgeiA9IHNpblRoZXRhICogc2luUGhpXG5cbiAgICAgICAgLy8gVGhlIHRleHR1cmUgY29vcmRpbmF0ZSBpcyBjb21wdXRlZCBieSAnTWVyY2F0b3IgcHJvamVjdGlvbidcbiAgICAgICAgbGV0IHUgPSAxIC0gKGxvbmdOdW1iZXIgLyB0aGlzLmxvbmdpdHVkZUJhbmRzKVxuICAgICAgICBsZXQgdiA9IDEgLSAobGF0TnVtYmVyIC8gdGhpcy5sYXRpdHVkZUJhbmRzKVxuXG4gICAgICAgIC8vIFBhc3MgYWxsIHRoZXNlIHZhbHVlcyBpbnRvIHRoZSBkYXRhIGFycmF5XG4gICAgICAgIHZlcnRleFBvc2l0aW9uRGF0YS5wdXNoKHRoaXMucmFkaXVzICogeClcbiAgICAgICAgdmVydGV4UG9zaXRpb25EYXRhLnB1c2godGhpcy5yYWRpdXMgKiB5KVxuICAgICAgICB2ZXJ0ZXhQb3NpdGlvbkRhdGEucHVzaCh0aGlzLnJhZGl1cyAqIHopXG5cbiAgICAgICAgbm9ybWFsRGF0YS5wdXNoKHgpXG4gICAgICAgIG5vcm1hbERhdGEucHVzaCh5KVxuICAgICAgICBub3JtYWxEYXRhLnB1c2goeilcblxuICAgICAgICB0ZXh0dXJlQ29vcmREYXRhLnB1c2godSlcbiAgICAgICAgdGV4dHVyZUNvb3JkRGF0YS5wdXNoKHYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wb3NpdGlvbkJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCB2ZXJ0ZXhQb3NpdGlvbkRhdGEsIHtcbiAgICAgIGl0ZW1TaXplOiAzLFxuICAgICAgbnVtSXRlbXM6ICh0aGlzLmxhdGl0dWRlQmFuZHMgKyAxKSAqICh0aGlzLmxvbmdpdHVkZUJhbmRzICsgMSlcbiAgICB9KVxuXG4gICAgdGhpcy5ub3JtYWxCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgbm9ybWFsRGF0YSwge1xuICAgICAgaXRlbVNpemU6IDMsXG4gICAgICBudW1JdGVtczogKHRoaXMubGF0aXR1ZGVCYW5kcyArIDEpICogKHRoaXMubG9uZ2l0dWRlQmFuZHMgKyAxKVxuICAgIH0pXG5cbiAgICB0aGlzLnRleHR1cmVDb29yZEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCB0ZXh0dXJlQ29vcmREYXRhLCB7XG4gICAgICBpdGVtU2l6ZTogMixcbiAgICAgIG51bUl0ZW1zOiAodGhpcy5sYXRpdHVkZUJhbmRzICsgMSkgKiAodGhpcy5sb25naXR1ZGVCYW5kcyArIDEpXG4gICAgfSlcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgc3BoZXJlIGluZGV4IGJ1ZmZlclxuICAgIGNvbnN0IGluZGV4RGF0YSA9IFtdXG5cbiAgICBmb3IgKGxldCBsYXROdW1iZXIgPSAwOyBsYXROdW1iZXIgPCB0aGlzLmxhdGl0dWRlQmFuZHM7IGxhdE51bWJlcisrKSB7XG4gICAgICBmb3IgKGxldCBsb25nTnVtYmVyID0gMDsgbG9uZ051bWJlciA8IHRoaXMubG9uZ2l0dWRlQmFuZHM7IGxvbmdOdW1iZXIrKykge1xuICAgICAgICBsZXQgZmlyc3QgPSBsb25nTnVtYmVyICsgKGxhdE51bWJlciAqICh0aGlzLmxvbmdpdHVkZUJhbmRzICsgMSkpXG4gICAgICAgIGxldCBzZWNvbmQgPSBmaXJzdCArIHRoaXMubG9uZ2l0dWRlQmFuZHMgKyAxXG5cbiAgICAgICAgaW5kZXhEYXRhLnB1c2goZmlyc3QpXG4gICAgICAgIGluZGV4RGF0YS5wdXNoKHNlY29uZClcbiAgICAgICAgaW5kZXhEYXRhLnB1c2goZmlyc3QgKyAxKVxuXG4gICAgICAgIGluZGV4RGF0YS5wdXNoKHNlY29uZClcbiAgICAgICAgaW5kZXhEYXRhLnB1c2goc2Vjb25kICsgMSlcbiAgICAgICAgaW5kZXhEYXRhLnB1c2goZmlyc3QgKyAxKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudmVydGV4SW5kZXhCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgaW5kZXhEYXRhLCB7XG4gICAgICBpdGVtU2l6ZTogMSxcbiAgICAgIG51bUl0ZW1zOiB0aGlzLmxhdGl0dWRlQmFuZHMgKiB0aGlzLmxvbmdpdHVkZUJhbmRzICogNixcbiAgICAgIHZlcnREYXRhQ29uc3RydWN0b3I6IFVpbnQxNkFycmF5LFxuICAgICAgYmluZFRhcmdldDogdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUlxuICAgIH0pXG4gIH1cblxuICBpbml0VGV4dHVyZSAoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlVGV4dHVyZShpbWFnZSlcbiAgICB9XG5cbiAgICBpbWFnZS5zcmMgPSB0aGlzLnRleHR1cmVTcmNcbiAgfVxuXG4gIGNyZWF0ZVRleHR1cmUgKGltYWdlKSB7XG4gICAgdGhpcy5jdWJlVGV4dHVyZSA9IHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpXG4gICAgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSA9IGltYWdlXG4gICAgXG4gICAgLy8gQ29uZmlnIHRleHR1cmUgcmVsYXRlZCBsb2dpY1xuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UpXG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKVxuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVClcbiAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRClcblxuICAgIC8vIFRPRE86IHVzZSBuZWFyZXN0IGZpbHRlciBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgLy8gdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgLy8gdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgLy8gdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSlcbiAgICAvLyB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5ORUFSRVNUKVxuICAgIC8vIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLk5FQVJFU1QpXG5cbiAgICAvLyBJdCdzIGFsd2F5cyBnb29kIHRvIHJlc2V0IGFjdGl2ZSB0ZXh0dXJlIGZsYWdcbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgbnVsbClcbiAgfVxuXG4gIGhhbmRsZUtleXMgKGR0KSB7XG4gICAgLy8gQ2FsY3VsYXRlIHJvdGF0aW9uc1xuICAgIC8vIGZvcndhcmRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szOF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPiAtNTApIHtcbiAgICAgIHRoaXMueiArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gYmFja3dhcmRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s0MF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPCA1MCkge1xuICAgICAgdGhpcy56IC09IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBtb3ZlIGxlZnRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szN10gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPiAtNTApIHtcbiAgICAgIHRoaXMueCArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gbW92ZSByaWdodFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM5XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICB0aGlzLnggLT0gMC4zXG4gICAgfVxuXG4gICAgLy8gbW92ZSB0b3BcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s4N10gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPCA1MCkge1xuICAgICAgdGhpcy55IC09IDAuM1xuICAgIH1cblxuICAgIC8vIG1vdmUgZG93blxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzgzXSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICB0aGlzLnkgKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIC8vIHR1cm4gbGVmdFxuICAgIC8vIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzQ5XSAmJiB0aGlzLnogPiAtMzApIHtcbiAgICAvLyAgIHRoaXMueiArPSAwLjJcbiAgICAvLyB9XG4gICAgXG4gICAgLy8gLy8gdHVybiByaWdodFxuICAgIC8vIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzUwXSAmJiB0aGlzLnogPCAtMSkge1xuICAgIC8vICAgdGhpcy56IC09IDAuMlxuICAgIC8vIH1cbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgdGhpcy5yb3RhdGVYICs9IGdhbWVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFgpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVZICs9IGdhbWVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFkpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVaICs9IGdhbWVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFopIC8gMTAwXG4gIH1cblxuICBkcmF3ICgpIHtcbiAgICAvLyBDaGVjayBpZiBuZWVkIHRvIGJsZW5kXG4gICAgaWYgKHRoaXMuaXNCbGVuZCkge1xuICAgICAgLy8gQWRkIGJsZW5kaW5nIGVmZmVjdCB0byBzaW11bGF0ZSB0cmFuc3BhcmVuY3lcbiAgICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORSk7XG4gICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICAgIHRoaXMuZ2wuZGlzYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuICAgICAgLy8gUGFzcyBhbHBoYSB1bmlmb3JtIHRvIHNoYWRlclxuICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmlzQmxlbmRVbmlmb3JtLCB0cnVlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5hbHBoYVVuaWZvcm0sIHRoaXMuYmxlbmRBbHBoYSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKVxuICAgICAgdGhpcy5nbC5kaXNhYmxlKHRoaXMuZ2wuQkxFTkQpXG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuaXNCbGVuZFVuaWZvcm0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBQYXNzIHZlcnRleCBwb3NpdGlvbiBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5wb3NpdGlvbkJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCB0aGlzLnBvc2l0aW9uQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIFBhc3MgdGV4dHVyZSBjb29yZGluYXRlcyBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy50ZXh0dXJlQ29vcmRCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC50ZXh0dXJlQ29vcmRBdHRyaWJ1dGUsIHRoaXMudGV4dHVyZUNvb3JkQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuXG4gICAgLy8gQWN0aXZlIHRleHR1cmUgdXNpbmcgdGhlIGZpcnN0IHRleHR1cmUgdW5pdFxuICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkUwKVxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5zYW1wbGVyVW5pZm9ybSwgMClcblxuICAgIC8vIFBhc3Mgbm9ybWFscyBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5ub3JtYWxCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC52ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUsIHRoaXMubm9ybWFsQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIEFkZCBsaWdodFxuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC51c2VMaWdodGluZ1VuaWZvcm0sICEhdGhpcy51c2VMaWdodClcbiAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuYW1iaWVudENvbG9yVW5pZm9ybSwgdGhpcy5hbWJpZW50Q29sb3JbMF0sIHRoaXMuYW1iaWVudENvbG9yWzFdLCB0aGlzLmFtYmllbnRDb2xvclsyXSlcbiAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclswXSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzFdLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMl0pXG5cbiAgICBsZXQgYWRqdXN0ZWRMaWdodERpcmVjdGlvbiA9IHZlYzMuY3JlYXRlKClcbiAgICAvLyBOb3JtYWxpemUgc28gdGhhdCB0aGUgZG90IHByb2R1Y3QgaXMgdGhlIHNhbWUgdG8gY29zaW5lXG4gICAgdmVjMy5ub3JtYWxpemUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgdGhpcy5saWdodGluZ0RpcmVjdGlvbilcbiAgICAvLyBSZXZlcnNlIHRoZSBkaXJlY3Rpb24gdG8gZGVzY3JpYmUgbGlnaHQgc291cmNlXG4gICAgdmVjMy5zY2FsZShhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCAtMSlcbiAgICAvLyBQYXNzIGxpZ2h0aW5nIGRpcmVjdGlvbiB1bmlmb3JtIHRvIHNoYWRlclxuICAgIHRoaXMuZ2wudW5pZm9ybTNmdih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAubGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uKVxuXG4gICAgLy8gVHJhbnNmb3JtIG1vZGVsIHZpZXcgbWF0cml4XG4gICAgdGhpcy5zY2VuZS5tb2RlbFZpZXdQdXNoTWF0cml4KClcbiAgICBtYXQ0LnRyYW5zbGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XSlcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWCwgZ2FtZVV0aWwueEF4aXMpXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVksIGdhbWVVdGlsLnlBeGlzKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVaLCBnYW1lVXRpbC56QXhpcylcbiAgICBcbiAgICAvLyBQYXNzIHRoZSBtb2RlbCB2aWV3IG1hdHJpeCwgcHJvamVjdGlvbiBtYXRyaXggYW5kIG5vcm1hbCBtYXRyaXggaW50byBzaGFkZXJcbiAgICB0aGlzLnNjZW5lLnNldFVuaWZvcm1NYXRyaXgoKVxuICAgIFxuICAgIC8vIGRyYXcgdGhlIGN1YmVcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhJbmRleEJ1ZmZlcilcbiAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgdGhpcy52ZXJ0ZXhJbmRleEJ1ZmZlci5pbmZvLm51bUl0ZW1zLCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKVxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UG9wTWF0cml4KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXBlcy9zcGhlcmUuanMiLCJpbXBvcnQgZGVmYXVsdFZlcnRleFNoYWRlclNvdXJjZSBmcm9tICcuL3ZlcnRleFNoYWRlcidcbmltcG9ydCBkZWZhdWx0RnJhZ21lbnRTaGFkZXJTb3VyY2UgZnJvbSAnLi9mcmFnbWVudFNoYWRlcidcblxuY29uc3QgZGVmYXVsdEF0dHJpYnV0ZU1hcCA9IHtcbiAgdmVydGV4UG9zaXRpb25BdHRyaWJ1dGU6ICdhVmVydGV4UG9zaXRpb24nLFxuICB0ZXh0dXJlQ29vcmRBdHRyaWJ1dGU6ICdhVGV4dHVyZUNvb3JkJyxcbiAgdmVydGV4Tm9ybWFsQXR0cmlidXRlOiAnYVZlcnRleE5vcm1hbCdcbn1cblxuY29uc3QgZGVmYXVsdFVuaWZvcm1NYXAgPSB7XG4gIHByb2plY3Rpb25NYXRyaXhVbmlmb3JtOiAndVByb2plY3Rpb25NYXRyaXgnLFxuICBtb2RlbFZpZXdNYXRyaXhVbmlmb3JtOiAndU1vZGVsVmlld01hdHJpeCcsXG4gIHNhbXBsZXJVbmlmb3JtOiAndVNhbXBsZXInLFxuICB1c2VMaWdodGluZ1VuaWZvcm06ICd1VXNlTGlnaHRpbmcnLFxuICBhbWJpZW50Q29sb3JVbmlmb3JtOiAndUFtYmllbnRDb2xvcicsXG4gIGRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtOiAndURpcmVjdGlvbmFsQ29sb3InLFxuICBsaWdodGluZ0RpcmVjdGlvblVuaWZvcm06ICd1TGlnaHRpbmdEaXJlY3Rpb24nLFxuICBuTWF0cml4VW5pZm9ybTogJ3VOTWF0cml4JyxcbiAgaXNCbGVuZFVuaWZvcm06ICd1SXNCbGVuZCcsXG4gIGFscGhhVW5pZm9ybTogJ3VBbHBoYSdcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZGVyUHJvZ3JhbSB7XG4gIGNvbnN0cnVjdG9yIChzaGFkZXJPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBnbCxcbiAgICAgIHZlcnRleFNoYWRlclNvdXJjZSA9IGRlZmF1bHRWZXJ0ZXhTaGFkZXJTb3VyY2UsXG4gICAgICBmcmFnbWVudFNoYWRlclNvdXJjZSA9IGRlZmF1bHRGcmFnbWVudFNoYWRlclNvdXJjZSxcbiAgICAgIGF0dHJpYnV0ZU1hcCA9IGRlZmF1bHRBdHRyaWJ1dGVNYXAsXG4gICAgICB1bmlmb3JtTWFwID0gZGVmYXVsdFVuaWZvcm1NYXBcbiAgICB9ID0gc2hhZGVyT3B0aW9uc1xuXG4gICAgaWYgKCFnbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB3ZWJnbCBjb250ZXh0IGZvciBzaGFkZXIgcHJvZ3JhbScpXG4gICAgfVxuXG4gICAgdGhpcy5nbCA9IGdsXG4gICAgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UgPSB2ZXJ0ZXhTaGFkZXJTb3VyY2VcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyU291cmNlID0gZnJhZ21lbnRTaGFkZXJTb3VyY2VcbiAgICB0aGlzLmF0dHJpYnV0ZU1hcCA9IGF0dHJpYnV0ZU1hcFxuICAgIHRoaXMudW5pZm9ybU1hcCA9IHVuaWZvcm1NYXBcblxuICAgIHRoaXMuY3JlYXRlUHJvZ3JhbSgpXG4gICAgdGhpcy5pbml0VmFyaWFibGVNYXAoKVxuICB9XG5cbiAgY3JlYXRlU2hhZGVyIChzaGFkZXJUeXBlKSB7XG4gICAgbGV0IHNoYWRlclxuICBcbiAgICBzd2l0Y2ggKHNoYWRlclR5cGUpIHtcbiAgICAgIGNhc2UgJ3ZlcnRleCc6XG4gICAgICAgIHNoYWRlciA9IHRoaXMuZ2wuY3JlYXRlU2hhZGVyKHRoaXMuZ2wuVkVSVEVYX1NIQURFUilcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCB0aGlzLnZlcnRleFNoYWRlclNvdXJjZSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgXG4gICAgICBjYXNlICdmcmFnbWVudCc6XG4gICAgICAgIHNoYWRlciA9IHRoaXMuZ2wuY3JlYXRlU2hhZGVyKHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSKVxuICAgICAgICB0aGlzLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHRoaXMuZnJhZ21lbnRTaGFkZXJTb3VyY2UpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNoYWRlciB0eXBlIHRvIGNyZWF0ZTogJHt0eXBlfWApXG4gICAgfVxuICAgIFxuICAgIHRoaXMuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXG4gICAgXG4gICAgaWYgKCF0aGlzLmdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIHRoaXMuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAvLyBUaGUgc2hhZGVyIGlzIG5vdCBjb3JyZWN0bHkgY29tcGlsZWRcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSlcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHNoYWRlclxuICB9XG5cbiAgY3JlYXRlUHJvZ3JhbSAoKSB7XG4gICAgdGhpcy5wcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKClcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuY3JlYXRlU2hhZGVyKCd2ZXJ0ZXgnKSlcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuY3JlYXRlU2hhZGVyKCdmcmFnbWVudCcpKVxuICAgIHRoaXMuZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKVxuICAgIFxuICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIC8vIFRoZSBzaGFkZXIgcHJvZ3JhbSBpcyBub3QgY29ycmVjdGx5IGxpbmtlZFxuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcm9ncmFtKSlcbiAgICB9XG4gIH1cblxuICBpbml0VmFyaWFibGVNYXAgKCkge1xuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pXG4gIFxuICAgIC8vIFB1dCBhbGwgYXR0YWNoZWQgaW5mb3JtYXRpb24gdG8gc2hhZGVyIHByb2dyYW0gbWV0YSBpbmZvcm1hdGlvblxuICAgIHRoaXMudmFyaWFibGVNYXAgPSB7fVxuXG4gICAgZm9yIChsZXQgYXR0cmliS2V5IGluIHRoaXMuYXR0cmlidXRlTWFwKSB7XG4gICAgICBpZiAodGhpcy5hdHRyaWJ1dGVNYXAuaGFzT3duUHJvcGVydHkoYXR0cmliS2V5KSkge1xuICAgICAgICBsZXQgYXR0cmliTG9jYXRpb24gPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgdGhpcy5hdHRyaWJ1dGVNYXBbYXR0cmliS2V5XSlcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcFthdHRyaWJLZXldID0gYXR0cmliTG9jYXRpb25cbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJMb2NhdGlvbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCB1bmlmb3JtS2V5IGluIHRoaXMudW5pZm9ybU1hcCkge1xuICAgICAgaWYgKHRoaXMudW5pZm9ybU1hcC5oYXNPd25Qcm9wZXJ0eSh1bmlmb3JtS2V5KSkge1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwW3VuaWZvcm1LZXldID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCB0aGlzLnVuaWZvcm1NYXBbdW5pZm9ybUtleV0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYWRlcnMvU2hhZGVyUHJvZ3JhbS5qcyIsImV4cG9ydCBkZWZhdWx0IGBcbmF0dHJpYnV0ZSB2ZWMzIGFWZXJ0ZXhQb3NpdGlvbjtcbmF0dHJpYnV0ZSB2ZWMzIGFWZXJ0ZXhOb3JtYWw7XG5hdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1xuXG51bmlmb3JtIG1hdDQgdVByb2plY3Rpb25NYXRyaXg7XG51bmlmb3JtIG1hdDQgdU1vZGVsVmlld01hdHJpeDtcbnVuaWZvcm0gbWF0MyB1Tk1hdHJpeDtcblxudW5pZm9ybSB2ZWMzIHVBbWJpZW50Q29sb3I7XG5cbnVuaWZvcm0gdmVjMyB1TGlnaHRpbmdEaXJlY3Rpb247XG51bmlmb3JtIHZlYzMgdURpcmVjdGlvbmFsQ29sb3I7XG5cbnVuaWZvcm0gYm9vbCB1VXNlTGlnaHRpbmc7XG5cbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xudmFyeWluZyB2ZWMzIHZMaWdodFdlaWdodGluZztcblxudm9pZCBtYWluICh2b2lkKSB7XG4gIGdsX1Bvc2l0aW9uID0gdVByb2plY3Rpb25NYXRyaXggKiB1TW9kZWxWaWV3TWF0cml4ICogdmVjNChhVmVydGV4UG9zaXRpb24sIDEuMCk7XG4gIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1xuXG4gIGlmICh1VXNlTGlnaHRpbmcpIHtcbiAgICB2ZWMzIHRyYW5zZm9ybWVkTm9ybWFsID0gdU5NYXRyaXggKiBhVmVydGV4Tm9ybWFsO1xuICAgIGZsb2F0IGRpcmVjdGlvbmFsTGlnaHRXZWlnaHRpbmcgPSBtYXgoMC4wLCBkb3QodHJhbnNmb3JtZWROb3JtYWwsIHVMaWdodGluZ0RpcmVjdGlvbikpO1xuICAgIHZMaWdodFdlaWdodGluZyA9IHVBbWJpZW50Q29sb3IgKyB1RGlyZWN0aW9uYWxDb2xvciAqIGRpcmVjdGlvbmFsTGlnaHRXZWlnaHRpbmc7XG4gIH0gZWxzZSB7XG4gICAgdkxpZ2h0V2VpZ2h0aW5nID0gdmVjMygxLjAsIDEuMCwgMS4wKTtcbiAgfVxufVxuYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIiwiZXhwb3J0IGRlZmF1bHQgYFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG52YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcbnZhcnlpbmcgdmVjMyB2TGlnaHRXZWlnaHRpbmc7XG5cbnVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1xudW5pZm9ybSBib29sIHVJc0JsZW5kO1xudW5pZm9ybSBmbG9hdCB1QWxwaGE7XG5cbnZvaWQgbWFpbih2b2lkKSB7XG4gIHZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQucywgdlRleHR1cmVDb29yZC50KSk7XG4gIC8vIEFkanVzdCB0ZXh0dXJlQ29sb3IgcmdiIHZhbHVlIGJ5IGxpZ2h0IHdlaWdodFxuICBpZiAodUlzQmxlbmQpIHtcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleHR1cmVDb2xvci5yZ2IgKiB2TGlnaHRXZWlnaHRpbmcsIHRleHR1cmVDb2xvci5hICogdUFscGhhKTtcbiAgfSBlbHNlIHtcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleHR1cmVDb2xvci5yZ2IgKiB2TGlnaHRXZWlnaHRpbmcsIHRleHR1cmVDb2xvci5hKTtcbiAgfVxufVxuYFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFkZXJzL2ZyYWdtZW50U2hhZGVyLmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvLyBTb21lIGNvbnN0YW50c1xuICB4QXhpczogWzEuMCwgMC4wLCAwLjBdLFxuICB5QXhpczogWzAuMCwgMS4wLCAwLjBdLFxuICB6QXhpczogWzAuMCwgMC4wLCAxLjBdLFxuICBcbiAgZGVnVG9SYWQ6IChkZWcpID0+IHtcbiAgICByZXR1cm4gZGVnIC8gMTgwICogTWF0aC5QSVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZVV0aWwuanMiXSwic291cmNlUm9vdCI6IiJ9