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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var gameState = {
  currentPressedKeys: []
};
/* harmony default export */ __webpack_exports__["a"] = (gameState);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scene__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shapes_cube__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shapes_sphere__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shaders_ShaderProgram__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameState__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





 // Entry file for contact game

/***** Global States *****/
// Game frame per second

var fps = 60;
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

      this.scene.addModel(new __WEBPACK_IMPORTED_MODULE_2__shapes_sphere__["a" /* default */]({
        shaderProgram: this.shaderProgram,
        scene: this.scene
      }));
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
  fps: 60,
  canvas: document.getElementById('stage')
}); // Start game

contactGame.start();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scene; });
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
    this.models = [];
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
      this.models.forEach(function (model) {
        return model.handleKeys(dt);
      });
    }
  }, {
    key: "animate",
    value: function animate(dt) {
      this.models.forEach(function (model) {
        return model.animate(dt);
      });
    }
  }, {
    key: "draw",
    value: function draw(dt) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      mat4.perspective(this.projectionMatrix, 120, this.canvas.width / this.canvas.height, 0.1, 500);
      mat4.identity(this.modelViewMatrix);
      this.models.forEach(function (model) {
        return model.draw(dt);
      });
    }
  }]);

  return Scene;
}();



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapeUtil__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__textures_duck_png__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__textures_duck_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__textures_duck_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameState__ = __webpack_require__(0);
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
        textureSrc = _options$textureSrc === void 0 ? __WEBPACK_IMPORTED_MODULE_1__textures_duck_png___default.a : _options$textureSrc,
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
      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[38] && this.rotateSpeedX > -50) {
        this.rotateSpeedX -= 0.3;
      } // down


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[40] && this.rotateSpeedX < 50) {
        this.rotateSpeedX += 0.3;
      } // left


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[37] && this.rotateSpeedY > -50) {
        this.rotateSpeedY -= 0.3;
      } // up


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[39] && this.rotateSpeedY < 50) {
        this.rotateSpeedY += 0.3;
      } // zoom out


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[49] && this.z > -30) {
        this.z -= 0.2;
      } // zoom in


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[50] && this.z < -1) {
        this.z += 0.2;
      }
    }
  }, {
    key: "animate",
    value: function animate(dt) {
      this.rotateX += __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].degToRad(dt * this.rotateSpeedX) / 100;
      this.rotateY += __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].degToRad(dt * this.rotateSpeedY) / 100;
      this.rotateZ += __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].degToRad(dt * this.rotateSpeedZ) / 100;
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
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateX, __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].xAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateY, __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].yAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateZ, __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].zAxis); // Pass the model view matrix, projection matrix and normal matrix into shader

      this.scene.setUniformMatrix(); // draw the cube

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
      this.gl.drawElements(this.gl.TRIANGLES, this.cubeVertexIndexBuffer.info.numItems, this.gl.UNSIGNED_SHORT, 0);
      this.scene.modelViewPopMatrix();
    }
  }]);

  return Cube;
}();



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var shapeUtil = {
  // Some constants
  xAxis: [1.0, 0.0, 0.0],
  yAxis: [0.0, 1.0, 0.0],
  zAxis: [0.0, 0.0, 1.0],
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
  },
  degToRad: function degToRad(deg) {
    return deg / 180 * Math.PI;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (shapeUtil);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2592274a75e6c343e6fe044e632c463c.png";

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShaderProgram; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vertexShader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fragmentShader__ = __webpack_require__(8);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uProjectionMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat3 uNMatrix;\n\nuniform vec3 uAmbientColor;\n\nuniform vec3 uLightingDirection;\nuniform vec3 uDirectionalColor;\n\nuniform bool uUseLighting;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vLightWeighting;\n\nvoid main (void) {\n  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);\n  vTextureCoord = aTextureCoord;\n\n  if (uUseLighting) {\n    vec3 transformedNormal = uNMatrix * aVertexNormal;\n    float directionalLightWeighting = max(0.0, dot(transformedNormal, uLightingDirection));\n    vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;\n  } else {\n    vLightWeighting = vec3(1.0, 1.0, 1.0);\n  }\n}\n");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("\nprecision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec3 vLightWeighting;\n\nuniform sampler2D uSampler;\nuniform bool uIsBlend;\nuniform float uAlpha;\n\nvoid main(void) {\n  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n  // Adjust textureColor rgb value by light weight\n  if (uIsBlend) {\n    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a * uAlpha);\n  } else {\n    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);\n  }\n}\n");

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sphere; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapeUtil__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__textures_duck_png__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__textures_duck_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__textures_duck_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameState__ = __webpack_require__(0);
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
        textureSrc = _options$textureSrc === void 0 ? __WEBPACK_IMPORTED_MODULE_1__textures_duck_png___default.a : _options$textureSrc,
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
      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[38] && this.rotateSpeedX > -50) {
        this.z += 0.3;
      } // backward


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[40] && this.rotateSpeedX < 50) {
        this.z -= 0.3;
      } // move left


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[37] && this.rotateSpeedY > -50) {
        this.x += 0.3;
      } // move right


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[39] && this.rotateSpeedY < 50) {
        this.x -= 0.3;
      } // move top


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[87] && this.rotateSpeedY < 50) {
        this.y -= 0.3;
      } // move down


      if (__WEBPACK_IMPORTED_MODULE_2__gameState__["a" /* default */].currentPressedKeys[83] && this.rotateSpeedY < 50) {
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
      this.rotateX += __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].degToRad(dt * this.rotateSpeedX) / 100;
      this.rotateY += __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].degToRad(dt * this.rotateSpeedY) / 100;
      this.rotateZ += __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].degToRad(dt * this.rotateSpeedZ) / 100;
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
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateX, __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].xAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateY, __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].yAxis);
      mat4.rotate(this.scene.modelViewMatrix, this.scene.modelViewMatrix, this.rotateZ, __WEBPACK_IMPORTED_MODULE_0__shapeUtil__["a" /* default */].zAxis); // Pass the model view matrix, projection matrix and normal matrix into shader

      this.scene.setUniformMatrix(); // draw the cube

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
      this.gl.drawElements(this.gl.TRIANGLES, this.vertexIndexBuffer.info.numItems, this.gl.UNSIGNED_SHORT, 0);
      this.scene.modelViewPopMatrix();
    }
  }]);

  return Sphere;
}();



/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YTQ2YmViYTVhMzZiOTgwZWZkOCIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZVN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9TY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGVzL2N1YmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXBlcy9zaGFwZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHR1cmVzL2R1Y2sucG5nIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL1NoYWRlclByb2dyYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL2ZyYWdtZW50U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFwZXMvc3BoZXJlLmpzIl0sIm5hbWVzIjpbImdhbWVTdGF0ZSIsImN1cnJlbnRQcmVzc2VkS2V5cyIsImZwcyIsIkdhbWUiLCJnYW1lT3B0aW9ucyIsImNhbnZhcyIsImluaXQiLCJsb29wIiwidGljayIsImJpbmQiLCJkdCIsImhhbmRsZUtleXMiLCJhbmltYXRlIiwiZHJhdyIsImdsIiwiZ2V0Q29udGV4dCIsImFsZXJ0IiwiZ2xOb3RTdXBwb3J0ZWQiLCJyZXNpemVDYW52YXMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVLZXlkb3duIiwiaGFuZGxlS2V5dXAiLCJzaGFkZXJQcm9ncmFtIiwic2NlbmUiLCJnYW1lIiwiYWRkTW9kZWwiLCJlIiwia2V5Q29kZSIsIndpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJzdHlsZSIsImNvbnRleHQiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsVGV4dCIsImNsZWFyQ29sb3IiLCJlbmFibGUiLCJERVBUSF9URVNUIiwiY2IiLCJub3ciLCJEYXRlIiwiZHVyYXRpb24iLCJsYXN0UnVuIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY29udGFjdEdhbWUiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0IiwiU2NlbmUiLCJzY2VuZU9wdGlvbnMiLCJFcnJvciIsIm1vZGVsVmlld01hdHJpeFN0YWNrIiwibW9kZWxWaWV3TWF0cml4IiwibWF0NCIsImNyZWF0ZSIsInByb2plY3Rpb25NYXRyaXgiLCJtb2RlbHMiLCJtb2RlbCIsInB1c2giLCJjb3B5IiwibGVuZ3RoIiwicG9wIiwidW5pZm9ybU1hdHJpeDRmdiIsInZhcmlhYmxlTWFwIiwicHJvamVjdGlvbk1hdHJpeFVuaWZvcm0iLCJtb2RlbFZpZXdNYXRyaXhVbmlmb3JtIiwibm9ybWFsTWF0cml4IiwibWF0MyIsIm5vcm1hbEZyb21NYXQ0IiwidW5pZm9ybU1hdHJpeDNmdiIsIm5NYXRyaXhVbmlmb3JtIiwiZm9yRWFjaCIsInZpZXdwb3J0IiwiY2xlYXIiLCJDT0xPUl9CVUZGRVJfQklUIiwiREVQVEhfQlVGRkVSX0JJVCIsInBlcnNwZWN0aXZlIiwiaWRlbnRpdHkiLCJDdWJlIiwib3B0aW9ucyIsImlzQmxlbmQiLCJibGVuZEFscGhhIiwidGV4dHVyZVNyYyIsInVzZUxpZ2h0IiwiYW1iaWVudENvbG9yIiwiZGlyZWN0aW9uYWxDb2xvciIsImxpZ2h0aW5nRGlyZWN0aW9uIiwieCIsInkiLCJ6Iiwic3BlZWRYIiwic3BlZWRZIiwic3BlZWRaIiwicm90YXRlU3BlZWRYIiwicm90YXRlU3BlZWRZIiwicm90YXRlU3BlZWRaIiwicm90YXRlWCIsInJvdGF0ZVkiLCJyb3RhdGVaIiwiY3ViZUJ1ZmZlciIsImN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIiLCJjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyIiwiaW5pdEJ1ZmZlciIsImluaXRUZXh0dXJlIiwiY3JlYXRlQXJyYXlCdWZmZXIiLCJpdGVtU2l6ZSIsIm51bUl0ZW1zIiwiY3ViZVZlcnRleEluZGV4QnVmZmVyIiwidmVydERhdGFDb25zdHJ1Y3RvciIsIlVpbnQxNkFycmF5IiwiYmluZFRhcmdldCIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsImNyZWF0ZVRleHR1cmUiLCJzcmMiLCJjdWJlVGV4dHVyZSIsImJpbmRUZXh0dXJlIiwiVEVYVFVSRV8yRCIsInBpeGVsU3RvcmVpIiwiVU5QQUNLX0ZMSVBfWV9XRUJHTCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsInRleFBhcmFtZXRlcmkiLCJURVhUVVJFX01BR19GSUxURVIiLCJORUFSRVNUIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiZGVnVG9SYWQiLCJibGVuZEZ1bmMiLCJTUkNfQUxQSEEiLCJPTkUiLCJCTEVORCIsImRpc2FibGUiLCJ1bmlmb3JtMWkiLCJpc0JsZW5kVW5pZm9ybSIsInVuaWZvcm0xZiIsImFscGhhVW5pZm9ybSIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwidmVydGV4UG9zaXRpb25BdHRyaWJ1dGUiLCJpbmZvIiwiRkxPQVQiLCJ0ZXh0dXJlQ29vcmRBdHRyaWJ1dGUiLCJhY3RpdmVUZXh0dXJlIiwiVEVYVFVSRTAiLCJzYW1wbGVyVW5pZm9ybSIsInZlcnRleE5vcm1hbEF0dHJpYnV0ZSIsInVzZUxpZ2h0aW5nVW5pZm9ybSIsInVuaWZvcm0zZiIsImFtYmllbnRDb2xvclVuaWZvcm0iLCJkaXJlY3Rpb25hbENvbG9yVW5pZm9ybSIsImFkanVzdGVkTGlnaHREaXJlY3Rpb24iLCJ2ZWMzIiwibm9ybWFsaXplIiwic2NhbGUiLCJ1bmlmb3JtM2Z2IiwibGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtIiwibW9kZWxWaWV3UHVzaE1hdHJpeCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsInhBeGlzIiwieUF4aXMiLCJ6QXhpcyIsInNldFVuaWZvcm1NYXRyaXgiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsIm1vZGVsVmlld1BvcE1hdHJpeCIsInNoYXBlVXRpbCIsInZlcnRzIiwidmVydHNPcHRpb24iLCJGbG9hdDMyQXJyYXkiLCJjcmVhdGVCdWZmZXIiLCJidWZmZXJEYXRhIiwiU1RBVElDX0RSQVciLCJkZWciLCJNYXRoIiwiUEkiLCJkZWZhdWx0QXR0cmlidXRlTWFwIiwiZGVmYXVsdFVuaWZvcm1NYXAiLCJTaGFkZXJQcm9ncmFtIiwic2hhZGVyT3B0aW9ucyIsInZlcnRleFNoYWRlclNvdXJjZSIsImZyYWdtZW50U2hhZGVyU291cmNlIiwiYXR0cmlidXRlTWFwIiwidW5pZm9ybU1hcCIsImNyZWF0ZVByb2dyYW0iLCJpbml0VmFyaWFibGVNYXAiLCJzaGFkZXJUeXBlIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsIkZSQUdNRU5UX1NIQURFUiIsInR5cGUiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwicHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiYXR0cmliS2V5IiwiaGFzT3duUHJvcGVydHkiLCJhdHRyaWJMb2NhdGlvbiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ1bmlmb3JtS2V5IiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwiU3BoZXJlIiwicmFuZG9tIiwicmFkaXVzIiwibGF0aXR1ZGVCYW5kcyIsImZsb29yIiwibG9uZ2l0dWRlQmFuZHMiLCJwb3NpdGlvbkJ1ZmZlciIsIm5vcm1hbEJ1ZmZlciIsInRleHR1cmVDb29yZEJ1ZmZlciIsInZlcnRleEluZGV4QnVmZmVyIiwidmVydGV4UG9zaXRpb25EYXRhIiwibm9ybWFsRGF0YSIsInRleHR1cmVDb29yZERhdGEiLCJsYXROdW1iZXIiLCJ0aGV0YSIsInNpblRoZXRhIiwic2luIiwiY29zVGhldGEiLCJjb3MiLCJsb25nTnVtYmVyIiwicGhpIiwic2luUGhpIiwiY29zUGhpIiwidSIsInYiLCJpbmRleERhdGEiLCJmaXJzdCIsInNlY29uZCIsIkxJTkVBUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQSxJQUFNQSxTQUFTLEdBQUc7QUFDaEJDLG9CQUFrQixFQUFFO0FBREosQ0FBbEI7QUFJZSx5REFBQUQsU0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Q0FHQTs7QUFFQTtBQUNBOztBQUNBLElBQU1FLEdBQUcsR0FBRyxFQUFaO0FBRUE7O0lBQ01DLEk7OztBQUNKLGtCQUErQjtBQUFBLFFBQWxCQyxXQUFrQix1RUFBSixFQUFJOztBQUFBOztBQUFBLFFBRTNCRixHQUYyQixHQUl6QkUsV0FKeUIsQ0FFM0JGLEdBRjJCO0FBQUEsUUFHM0JH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ckMsUUFBcEUsRUFBOEUsS0FBSy9GLEVBQUwsQ0FBUThKLGNBQXRGLEVBQXNHLENBQXRHO0FBQ0EsV0FBS3BKLEtBQUwsQ0FBV3FKLGtCQUFYO0FBQ0QiLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVhNDZiZWJhNWEzNmI5ODBlZmQ4IiwiY29uc3QgZ2FtZVN0YXRlID0ge1xuICBjdXJyZW50UHJlc3NlZEtleXM6IFtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVTdGF0ZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWVTdGF0ZS5qcyIsImltcG9ydCBTY2VuZSBmcm9tICcuL1NjZW5lJ1xuaW1wb3J0IEN1YmUgZnJvbSAnLi9zaGFwZXMvY3ViZSdcbmltcG9ydCBTcGhlcmUgZnJvbSAnLi9zaGFwZXMvc3BoZXJlJ1xuaW1wb3J0IFNoYWRlclByb2dyYW0gZnJvbSAnLi9zaGFkZXJzL1NoYWRlclByb2dyYW0nXG5pbXBvcnQgZ2FtZVN0YXRlIGZyb20gJy4vZ2FtZVN0YXRlJ1xuXG4vLyBFbnRyeSBmaWxlIGZvciBjb250YWN0IGdhbWVcblxuLyoqKioqIEdsb2JhbCBTdGF0ZXMgKioqKiovXG4vLyBHYW1lIGZyYW1lIHBlciBzZWNvbmRcbmNvbnN0IGZwcyA9IDYwXG5cbi8qKioqKiBHYW1lIGNsYXNzICoqKioqL1xuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yIChnYW1lT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZnBzLFxuICAgICAgY2FudmFzXG4gICAgfSA9IGdhbWVPcHRpb25zXG5cbiAgICB0aGlzLmZwcyA9IGZwc1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXG4gIH1cblxuICAvKioqIEdhbWUgbG9vcCAqKiovXG4gIHN0YXRpYyBsb29wIChnYW1lLCBjYikge1xuICAgIGNvbnN0IGR0ID0gMTAwMCAvIGdhbWUuZnBzXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICAgIEdhbWUubG9vcC5kdXJhdGlvbiA9IChHYW1lLmxvb3AuZHVyYXRpb24gfHwgMCkgKyBub3cgLSAoR2FtZS5sb29wLmxhc3RSdW4gfHwgbm93KVxuICAgIFxuICAgIHdoaWxlIChHYW1lLmxvb3AuZHVyYXRpb24gPj0gZHQpIHtcbiAgICAgIGNiKGR0KVxuICAgICAgR2FtZS5sb29wLmR1cmF0aW9uIC09IGR0XG4gICAgfVxuICAgIFxuICAgIEdhbWUubG9vcC5sYXN0UnVuID0gbm93XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBHYW1lLmxvb3AoZ2FtZSwgY2IpKVxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIC8vIEluaXQgdGhlIGdhbWVcbiAgICB0aGlzLmluaXQoKVxuXG4gICAgLy8gU3RhcnQgYW5pbWF0aW9uIGxvb3AgdG8gZHJhdyBnYW1lIGZyYW1lc1xuICAgIEdhbWUubG9vcCh0aGlzLCB0aGlzLnRpY2suYmluZCh0aGlzKSlcbiAgfVxuXG4gIHRpY2sgKGR0KSB7XG4gICAgLy8gQ2hlY2sgdXNlciBpbnRlcmFjdGlvbnNcbiAgICB0aGlzLmhhbmRsZUtleXMoZHQpXG5cbiAgICAvLyBVcGRhdGUgZ2FtZSBzdGF0ZXNcbiAgICB0aGlzLmFuaW1hdGUoZHQpXG5cbiAgICAvLyBEcmF3IGdhbWUgZnJhbWVcbiAgICB0aGlzLmRyYXcoZHQpXG4gIH1cblxuICAvKioqIEdhbWUgSW5pdCBQaGFzZSAqKiovXG4gIGluaXQgKCkge1xuICAgIC8vIERldGVjdCB3ZWJnbCBzdXBwb3J0XG4gICAgdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJylcbiAgXG4gICAgaWYgKCF0aGlzLmdsKSB7XG4gICAgICBhbGVydCgnd2ViZ2wgaXMgbm90IHN1cHBvcnRlZCcpXG4gICAgICB0aGlzLmdsTm90U3VwcG9ydGVkID0gdHJ1ZVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gcmVzaXplIHRoZSBjYW52YXNcbiAgICB0aGlzLnJlc2l6ZUNhbnZhcyg1MDAsIDUwMClcbiAgICBcbiAgICAvLyBCaW5kIGtleWJvYXJkIGV2ZW50c1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWRvd24uYmluZCh0aGlzKSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5dXAuYmluZCh0aGlzKSlcblxuICAgIC8vIEluaXQgc2hhZGVyc1xuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IG5ldyBTaGFkZXJQcm9ncmFtKHtcbiAgICAgIGdsOiB0aGlzLmdsXG4gICAgfSlcblxuICAgIC8vIEluaXQgc2NlbmVcbiAgICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKHtcbiAgICAgIGdhbWU6IHRoaXNcbiAgICB9KVxuXG4gICAgLy8gVGhlIGluaXQgbG9naWMgZ29lcyBiZWxvd1xuICAgIC8vIGxldCBjdWJlID0gbmV3IEN1YmUoe1xuICAgIC8vICAgc2hhZGVyUHJvZ3JhbTogdGhpcy5zaGFkZXJQcm9ncmFtLFxuICAgIC8vICAgc2NlbmU6IHRoaXMuc2NlbmVcbiAgICAvLyB9KVxuXG4gICAgLy8gdGhpcy5zY2VuZS5hZGRNb2RlbChjdWJlKVxuXG4gICAgdGhpcy5zY2VuZS5hZGRNb2RlbChuZXcgU3BoZXJlKHtcbiAgICAgIHNoYWRlclByb2dyYW06IHRoaXMuc2hhZGVyUHJvZ3JhbSxcbiAgICAgIHNjZW5lOiB0aGlzLnNjZW5lXG4gICAgfSkpXG4gIH1cblxuICBoYW5kbGVLZXlkb3duIChlKSB7XG4gICAgZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1tlLmtleUNvZGVdID0gdHJ1ZVxuICB9XG5cbiAgaGFuZGxlS2V5dXAgKGUpIHtcbiAgICBnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzW2Uua2V5Q29kZV0gPSBmYWxzZVxuICB9XG5cbiAgcmVzaXplQ2FudmFzICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKHRoaXMuY2FudmFzLm9mZnNldFdpZHRoICE9PSB3aWR0aCB8fCB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUub2Zmc2V0V2lkdGggPSB3aWR0aCArICdweCdcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLm9mZnNldEhlaWdodCA9IGhlaWdodCArICdweCdcbiAgICB9XG4gICAgXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodFxuICB9XG5cbiAgLyoqKiBHYW1lIERyYXcgUGhhc2UgKioqL1xuICBoYW5kbGVLZXlzIChkdCkge1xuICAgIHRoaXMuc2NlbmUuaGFuZGxlS2V5cyhkdClcbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgdGhpcy5zY2VuZS5hbmltYXRlKGR0KVxuICB9XG5cbiAgZHJhdyAoZHQpIHtcbiAgICBpZiAodGhpcy5nbE5vdFN1cHBvcnRlZCkge1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgIGNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSdcbiAgICAgIGNvbnRleHQuZmlsbFRleHQoJ1dlYkdMIGlzIG5vdCBzdXBwb3J0ZWQgOignLCB0aGlzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuY2FudmFzLmhlaWdodCAvIDIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKVxuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVClcbiAgICB0aGlzLnNjZW5lLmRyYXcoZHQpXG4gIH1cbn1cblxuLy8gQ3JlYXRlIGdhbWUgaW5zdGFuY2VcbmNvbnN0IGNvbnRhY3RHYW1lID0gbmV3IEdhbWUoe1xuICBmcHM6IDYwLFxuICBjYW52YXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFnZScpXG59KVxuXG4vLyBTdGFydCBnYW1lXG5jb250YWN0R2FtZS5zdGFydCgpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFjdC5qcyIsIi8qKioqKiBTY2VuZSBjbGFzcyAqKioqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lIHtcbiAgY29uc3RydWN0b3IgKHNjZW5lT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZ2FtZVxuICAgIH0gPSBzY2VuZU9wdGlvbnNcblxuICAgIGlmICghZ2FtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBnYW1lIGZvciB0aGUgc2NlbmUnKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmdsID0gZ2FtZS5nbFxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IGdhbWUuc2hhZGVyUHJvZ3JhbVxuICAgIHRoaXMuY2FudmFzID0gZ2FtZS5jYW52YXNcblxuICAgIC8vIEVhY2ggc2NlbmUgaGFzIGl0J3Mgb3duIG1vZGVsIHZpZXcgbWF0cml4IGFuZCBwcm9qZWN0IG1hdHJpeFxuICAgIHRoaXMubW9kZWxWaWV3TWF0cml4U3RhY2sgPSBbXVxuICAgIHRoaXMubW9kZWxWaWV3TWF0cml4ID0gbWF0NC5jcmVhdGUoKVxuICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IG1hdDQuY3JlYXRlKClcblxuICAgIHRoaXMubW9kZWxzID0gW11cbiAgfVxuXG4gIGFkZE1vZGVsIChtb2RlbCkge1xuICAgIHRoaXMubW9kZWxzLnB1c2gobW9kZWwpXG4gIH1cblxuICBtb2RlbFZpZXdQdXNoTWF0cml4ICgpIHtcbiAgICBsZXQgY29weSA9IG1hdDQuY3JlYXRlKClcbiAgICBtYXQ0LmNvcHkoY29weSwgdGhpcy5tb2RlbFZpZXdNYXRyaXgpXG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjay5wdXNoKGNvcHkpXG4gIH1cblxuICBtb2RlbFZpZXdQb3BNYXRyaXggKCkge1xuICAgIGlmICh0aGlzLm1vZGVsVmlld01hdHJpeFN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbXB0eSBtb2RlbCB2aWV3IG1hdHJpeCBzdGFjaycpXG4gICAgfVxuICAgIFxuICAgIHRoaXMubW9kZWxWaWV3TWF0cml4ID0gdGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjay5wb3AoKVxuICB9XG5cbiAgc2V0VW5pZm9ybU1hdHJpeCAoKSB7XG4gICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5wcm9qZWN0aW9uTWF0cml4VW5pZm9ybSwgZmFsc2UsIHRoaXMucHJvamVjdGlvbk1hdHJpeClcbiAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLm1vZGVsVmlld01hdHJpeFVuaWZvcm0sIGZhbHNlLCB0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgXG4gICAgLy8gR2V0IHRoZSByaWdodCBub3JtYWwgbWF0cml4XG4gICAgbGV0IG5vcm1hbE1hdHJpeCA9IG1hdDMuY3JlYXRlKClcbiAgICBtYXQzLm5vcm1hbEZyb21NYXQ0KG5vcm1hbE1hdHJpeCwgdGhpcy5tb2RlbFZpZXdNYXRyaXgpXG4gICAgdGhpcy5nbC51bmlmb3JtTWF0cml4M2Z2KHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5uTWF0cml4VW5pZm9ybSwgZmFsc2UsIG5vcm1hbE1hdHJpeClcbiAgfVxuXG4gIGhhbmRsZUtleXMgKGR0KSB7XG4gICAgdGhpcy5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiBtb2RlbC5oYW5kbGVLZXlzKGR0KSlcbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgdGhpcy5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiBtb2RlbC5hbmltYXRlKGR0KSlcbiAgfVxuXG4gIGRyYXcgKGR0KSB7XG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KVxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKVxuICAgIFxuICAgIG1hdDQucGVyc3BlY3RpdmUodGhpcy5wcm9qZWN0aW9uTWF0cml4LCAxMjAsIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5jYW52YXMuaGVpZ2h0LCAwLjEsIDUwMClcbiAgICBtYXQ0LmlkZW50aXR5KHRoaXMubW9kZWxWaWV3TWF0cml4KVxuICAgIFxuICAgIHRoaXMubW9kZWxzLmZvckVhY2gobW9kZWwgPT4gbW9kZWwuZHJhdyhkdCkpXG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2NlbmUuanMiLCJpbXBvcnQgc2hhcGVVdGlsIGZyb20gJy4vc2hhcGVVdGlsJ1xuaW1wb3J0IGRlZmF1bHRUZXh0dXJlU3JjIGZyb20gJy4uL3RleHR1cmVzL2R1Y2sucG5nJ1xuaW1wb3J0IGdhbWVTdGF0ZSBmcm9tICcuLi9nYW1lU3RhdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIHNjZW5lLFxuICAgICAgc2hhZGVyUHJvZ3JhbSxcbiAgICAgIGlzQmxlbmQgPSBmYWxzZSxcbiAgICAgIGJsZW5kQWxwaGEgPSAwLjUsXG4gICAgICB0ZXh0dXJlU3JjID0gZGVmYXVsdFRleHR1cmVTcmMsXG4gICAgICB1c2VMaWdodCA9IHRydWUsXG4gICAgICBhbWJpZW50Q29sb3IgPSBbMC4yLCAwLjIsIDAuMl0sXG4gICAgICBkaXJlY3Rpb25hbENvbG9yID0gWzAuOCwgMC44LCAwLjhdLFxuICAgICAgbGlnaHRpbmdEaXJlY3Rpb24gPSBbMC4wLCAwLjAsIC0xLjBdLFxuICAgICAgeCA9IDAsXG4gICAgICB5ID0gMCxcbiAgICAgIHogPSAtNSxcbiAgICAgIHNwZWVkWCA9IDAsXG4gICAgICBzcGVlZFkgPSAwLFxuICAgICAgc3BlZWRaID0gMCxcbiAgICAgIHJvdGF0ZVNwZWVkWCA9IDAsXG4gICAgICByb3RhdGVTcGVlZFkgPSAwLFxuICAgICAgcm90YXRlU3BlZWRaID0gMCxcbiAgICAgIHJvdGF0ZVggPSAwLFxuICAgICAgcm90YXRlWSA9IDAsXG4gICAgICByb3RhdGVaID0gMFxuICAgIH0gPSBvcHRpb25zXG5cbiAgICBpZiAoIXNoYWRlclByb2dyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2hhZGVyIHByb2dyYW0gcHJvdmlkZWQhJylcbiAgICB9XG5cbiAgICBpZiAoIXNjZW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNjZW5lIGZvciB0aGlzIHNoYXBlJywgdGhpcylcbiAgICB9XG5cbiAgICB0aGlzLmdsID0gc2hhZGVyUHJvZ3JhbS5nbFxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHNoYWRlclByb2dyYW1cbiAgICB0aGlzLnNjZW5lID0gc2NlbmVcbiAgICB0aGlzLmlzQmxlbmQgPSBpc0JsZW5kXG4gICAgdGhpcy5ibGVuZEFscGhhID0gYmxlbmRBbHBoYVxuICAgIHRoaXMudGV4dHVyZVNyYyA9IHRleHR1cmVTcmNcbiAgICB0aGlzLnVzZUxpZ2h0ID0gdXNlTGlnaHRcbiAgICB0aGlzLmFtYmllbnRDb2xvciA9IGFtYmllbnRDb2xvclxuICAgIHRoaXMuZGlyZWN0aW9uYWxDb2xvciA9IGRpcmVjdGlvbmFsQ29sb3JcbiAgICB0aGlzLmxpZ2h0aW5nRGlyZWN0aW9uID0gbGlnaHRpbmdEaXJlY3Rpb25cblxuICAgIC8vIG1vdmUgc3BlZWRzXG4gICAgdGhpcy5zcGVlZFggPSBzcGVlZFhcbiAgICB0aGlzLnNwZWVkWSA9IHNwZWVkWVxuICAgIHRoaXMuc3BlZWRaID0gc3BlZWRaXG5cbiAgICAvLyBwb3NpdGlvblxuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy56ID0gelxuXG4gICAgLy8gcm90YXRlIHNwZWVkc1xuICAgIHRoaXMucm90YXRlU3BlZWRYID0gcm90YXRlU3BlZWRYXG4gICAgdGhpcy5yb3RhdGVTcGVlZFkgPSByb3RhdGVTcGVlZFlcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWiA9IHJvdGF0ZVNwZWVkWlxuXG4gICAgLy8gcm90YXRlIHJhZGl1c1xuICAgIHRoaXMucm90YXRlWCA9IHJvdGF0ZVhcbiAgICB0aGlzLnJvdGF0ZVkgPSByb3RhdGVZXG4gICAgdGhpcy5yb3RhdGVaID0gcm90YXRlWlxuXG4gICAgLy8gdmVydGV4IGJ1ZmZlclxuICAgIHRoaXMuY3ViZUJ1ZmZlciA9IG51bGxcblxuICAgIC8vIG5vcm1hbCBidWZmZXJcbiAgICB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIgPSBudWxsXG5cbiAgICAvLyB0ZXh0dXJlIGJ1ZmZlclxuICAgIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciA9IG51bGxcblxuICAgIC8vIGluaXQgdGhlIGN1YmVcbiAgICB0aGlzLmluaXRCdWZmZXIoKVxuICAgIHRoaXMuaW5pdFRleHR1cmUoKVxuICB9XG5cbiAgaW5pdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5jdWJlQnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIFtcbiAgICAgIC8vIGZyb250XG4gICAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIDEuMCxcbiAgICAgIDEuMCwgLTEuMCwgMS4wLFxuICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gYmFja1xuICAgICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgICAgXG4gICAgICAvLyB0b3BcbiAgICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgXG4gICAgICAvLyBib3R0b21cbiAgICAgIC0xLjAsIC0xLjAsIDEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcblxuICAgICAgLy8gcmlnaHRcbiAgICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgMS4wLFxuXG4gICAgICAvLyBsZWZ0XG4gICAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAtMS4wLCAtMS4wLCAxLjBcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMyxcbiAgICAgIG51bUl0ZW1zOiAyNFxuICAgIH0pXG5cbiAgICB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgW1xuICAgICAgLy8gRnJvbnQgZmFjZVxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gQmFjayBmYWNlXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcblxuICAgICAgLy8gVG9wIGZhY2VcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG5cbiAgICAgIC8vIEJvdHRvbSBmYWNlXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcblxuICAgICAgLy8gUmlnaHQgZmFjZVxuICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsIDAuMCxcblxuICAgICAgLy8gTGVmdCBmYWNlXG4gICAgICAtMS4wLCAwLjAsIDAuMCxcbiAgICAgIC0xLjAsIDAuMCwgMC4wLFxuICAgICAgLTEuMCwgMC4wLCAwLjAsXG4gICAgICAtMS4wLCAwLjAsIDAuMFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAzLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBbXG4gICAgICAvLyBGcm9udCBmYWNlXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcblxuICAgICAgLy8gQmFjayBmYWNlXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcblxuICAgICAgLy8gVG9wIGZhY2VcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuXG4gICAgICAvLyBCb3R0b20gZmFjZVxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG5cbiAgICAgIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuXG4gICAgICAvLyBMZWZ0IGZhY2VcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAyLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIFtcbiAgICAgIDAsIDEsIDIsICAgICAgMCwgMiwgMywgICAgLy8gRnJvbnQgZmFjZVxuICAgICAgNCwgNSwgNiwgICAgICA0LCA2LCA3LCAgICAvLyBCYWNrIGZhY2VcbiAgICAgIDgsIDksIDEwLCAgICAgOCwgMTAsIDExLCAgLy8gVG9wIGZhY2VcbiAgICAgIDEyLCAxMywgMTQsICAgMTIsIDE0LCAxNSwgLy8gQm90dG9tIGZhY2VcbiAgICAgIDE2LCAxNywgMTgsICAgMTYsIDE4LCAxOSwgLy8gUmlnaHQgZmFjZVxuICAgICAgMjAsIDIxLCAyMiwgICAyMCwgMjIsIDIzICAvLyBMZWZ0IGZhY2VcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMSxcbiAgICAgIG51bUl0ZW1zOiAzNixcbiAgICAgIHZlcnREYXRhQ29uc3RydWN0b3I6IFVpbnQxNkFycmF5LFxuICAgICAgYmluZFRhcmdldDogdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUlxuICAgIH0pXG4gIH1cblxuICBpbml0VGV4dHVyZSAoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlVGV4dHVyZShpbWFnZSlcbiAgICB9XG5cbiAgICBpbWFnZS5zcmMgPSB0aGlzLnRleHR1cmVTcmNcbiAgfVxuXG4gIGNyZWF0ZVRleHR1cmUgKGltYWdlKSB7XG4gICAgdGhpcy5jdWJlVGV4dHVyZSA9IHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpXG4gICAgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSA9IGltYWdlXG4gICAgXG4gICAgLy8gQ29uZmlnIHRleHR1cmUgcmVsYXRlZCBsb2dpY1xuICAgIC8vIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIC8vIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuICAgIC8vIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UpXG4gICAgLy8gdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKVxuICAgIC8vIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVClcbiAgICAvLyB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRClcblxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UpXG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTkVBUkVTVClcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5ORUFSRVNUKVxuXG4gICAgLy8gSXQncyBhbHdheXMgZ29vZCB0byByZXNldCBhY3RpdmUgdGV4dHVyZSBmbGFnXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIG51bGwpXG4gIH1cblxuICBoYW5kbGVLZXlzIChkdCkge1xuICAgIC8vIENhbGN1bGF0ZSByb3RhdGlvbnNcbiAgICAvLyB1cFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM4XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWCA+IC01MCkge1xuICAgICAgdGhpcy5yb3RhdGVTcGVlZFggLT0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIGRvd25cbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s0MF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPCA1MCkge1xuICAgICAgdGhpcy5yb3RhdGVTcGVlZFggKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIGxlZnRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szN10gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPiAtNTApIHtcbiAgICAgIHRoaXMucm90YXRlU3BlZWRZIC09IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyB1cFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM5XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICB0aGlzLnJvdGF0ZVNwZWVkWSArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gem9vbSBvdXRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s0OV0gJiYgdGhpcy56ID4gLTMwKSB7XG4gICAgICB0aGlzLnogLT0gMC4yXG4gICAgfVxuICAgIFxuICAgIC8vIHpvb20gaW5cbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s1MF0gJiYgdGhpcy56IDwgLTEpIHtcbiAgICAgIHRoaXMueiArPSAwLjJcbiAgICB9XG4gIH1cblxuICBhbmltYXRlIChkdCkge1xuICAgIHRoaXMucm90YXRlWCArPSBzaGFwZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWCkgLyAxMDBcbiAgICB0aGlzLnJvdGF0ZVkgKz0gc2hhcGVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFkpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVaICs9IHNoYXBlVXRpbC5kZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRaKSAvIDEwMFxuICB9XG5cbiAgZHJhdyAoKSB7XG4gICAgLy8gQ2hlY2sgaWYgbmVlZCB0byBibGVuZFxuICAgIGlmICh0aGlzLmlzQmxlbmQpIHtcbiAgICAgIC8vIEFkZCBibGVuZGluZyBlZmZlY3QgdG8gc2ltdWxhdGUgdHJhbnNwYXJlbmN5XG4gICAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkUpO1xuICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcbiAgICAgIC8vIFBhc3MgYWxwaGEgdW5pZm9ybSB0byBzaGFkZXJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5pc0JsZW5kVW5pZm9ybSwgdHJ1ZSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuYWxwaGFVbmlmb3JtLCB0aGlzLmJsZW5kQWxwaGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVClcbiAgICAgIHRoaXMuZ2wuZGlzYWJsZSh0aGlzLmdsLkJMRU5EKVxuICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmlzQmxlbmRVbmlmb3JtLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gUGFzcyB2ZXJ0ZXggcG9zaXRpb24gaW50byBzaGFkZXJcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZUJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCB0aGlzLmN1YmVCdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgXG4gICAgLy8gUGFzcyB0ZXh0dXJlIGNvb3JkaW5hdGVzIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC50ZXh0dXJlQ29vcmRBdHRyaWJ1dGUsIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlci5pbmZvLml0ZW1TaXplLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMClcblxuICAgIC8vIEFjdGl2ZSB0ZXh0dXJlIHVzaW5nIHRoZSBmaXJzdCB0ZXh0dXJlIHVuaXRcbiAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMClcbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZSlcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuc2FtcGxlclVuaWZvcm0sIDApXG5cbiAgICAvLyBQYXNzIG5vcm1hbHMgaW50byBzaGFkZXJcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnZlcnRleE5vcm1hbEF0dHJpYnV0ZSwgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIEFkZCBsaWdodFxuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC51c2VMaWdodGluZ1VuaWZvcm0sICEhdGhpcy51c2VMaWdodClcbiAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuYW1iaWVudENvbG9yVW5pZm9ybSwgdGhpcy5hbWJpZW50Q29sb3JbMF0sIHRoaXMuYW1iaWVudENvbG9yWzFdLCB0aGlzLmFtYmllbnRDb2xvclsyXSlcbiAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclswXSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzFdLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMl0pXG5cbiAgICBsZXQgYWRqdXN0ZWRMaWdodERpcmVjdGlvbiA9IHZlYzMuY3JlYXRlKClcbiAgICAvLyBOb3JtYWxpemUgc28gdGhhdCB0aGUgZG90IHByb2R1Y3QgaXMgdGhlIHNhbWUgdG8gY29zaW5lXG4gICAgdmVjMy5ub3JtYWxpemUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgdGhpcy5saWdodGluZ0RpcmVjdGlvbilcbiAgICAvLyBSZXZlcnNlIHRoZSBkaXJlY3Rpb24gdG8gZGVzY3JpYmUgbGlnaHQgc291cmNlXG4gICAgdmVjMy5zY2FsZShhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCAtMSlcbiAgICAvLyBQYXNzIGxpZ2h0aW5nIGRpcmVjdGlvbiB1bmlmb3JtIHRvIHNoYWRlclxuICAgIHRoaXMuZ2wudW5pZm9ybTNmdih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAubGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uKVxuXG4gICAgLy8gVHJhbnNmb3JtIG1vZGVsIHZpZXcgbWF0cml4XG4gICAgdGhpcy5zY2VuZS5tb2RlbFZpZXdQdXNoTWF0cml4KClcbiAgICBtYXQ0LnRyYW5zbGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XSlcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWCwgc2hhcGVVdGlsLnhBeGlzKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVZLCBzaGFwZVV0aWwueUF4aXMpXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVosIHNoYXBlVXRpbC56QXhpcylcbiAgICBcbiAgICAvLyBQYXNzIHRoZSBtb2RlbCB2aWV3IG1hdHJpeCwgcHJvamVjdGlvbiBtYXRyaXggYW5kIG5vcm1hbCBtYXRyaXggaW50byBzaGFkZXJcbiAgICB0aGlzLnNjZW5lLnNldFVuaWZvcm1NYXRyaXgoKVxuICAgIFxuICAgIC8vIGRyYXcgdGhlIGN1YmVcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5jdWJlVmVydGV4SW5kZXhCdWZmZXIpXG4gICAgdGhpcy5nbC5kcmF3RWxlbWVudHModGhpcy5nbC5UUklBTkdMRVMsIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyLmluZm8ubnVtSXRlbXMsIHRoaXMuZ2wuVU5TSUdORURfU0hPUlQsIDApXG4gICAgdGhpcy5zY2VuZS5tb2RlbFZpZXdQb3BNYXRyaXgoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcGVzL2N1YmUuanMiLCJjb25zdCBzaGFwZVV0aWwgPSB7XG4gIC8vIFNvbWUgY29uc3RhbnRzXG4gIHhBeGlzOiBbMS4wLCAwLjAsIDAuMF0sXG4gIHlBeGlzOiBbMC4wLCAxLjAsIDAuMF0sXG4gIHpBeGlzOiBbMC4wLCAwLjAsIDEuMF0sXG5cbiAgY3JlYXRlQXJyYXlCdWZmZXI6IChnbCwgdmVydHMgPSBbXSwgdmVydHNPcHRpb24gPSB7fSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHZlcnREYXRhQ29uc3RydWN0b3IgPSBGbG9hdDMyQXJyYXksXG4gICAgICBiaW5kVGFyZ2V0ID0gZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgaXRlbVNpemUgPSAxLFxuICAgICAgbnVtSXRlbXMgPSB2ZXJ0cy5sZW5ndGhcbiAgICB9ID0gdmVydHNPcHRpb25cbiAgICBcbiAgICBjb25zdCBjdWJlQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKClcbiAgICBnbC5iaW5kQnVmZmVyKGJpbmRUYXJnZXQsIGN1YmVCdWZmZXIpXG4gICAgXG4gICAgZ2wuYnVmZmVyRGF0YShiaW5kVGFyZ2V0LCBuZXcgdmVydERhdGFDb25zdHJ1Y3Rvcih2ZXJ0cyksIGdsLlNUQVRJQ19EUkFXKVxuICAgIGN1YmVCdWZmZXIuaW5mbyA9IHtcbiAgICAgIGl0ZW1TaXplLFxuICAgICAgbnVtSXRlbXNcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdWJlQnVmZmVyXG4gIH0sXG5cbiAgZGVnVG9SYWQ6IChkZWcpID0+IHtcbiAgICByZXR1cm4gZGVnIC8gMTgwICogTWF0aC5QSVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNoYXBlVXRpbFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFwZXMvc2hhcGVVdGlsLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMjU5MjI3NGE3NWU2YzM0M2U2ZmUwNDRlNjMyYzQ2M2MucG5nXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGV4dHVyZXMvZHVjay5wbmdcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgZGVmYXVsdFZlcnRleFNoYWRlclNvdXJjZSBmcm9tICcuL3ZlcnRleFNoYWRlcidcbmltcG9ydCBkZWZhdWx0RnJhZ21lbnRTaGFkZXJTb3VyY2UgZnJvbSAnLi9mcmFnbWVudFNoYWRlcidcblxuY29uc3QgZGVmYXVsdEF0dHJpYnV0ZU1hcCA9IHtcbiAgdmVydGV4UG9zaXRpb25BdHRyaWJ1dGU6ICdhVmVydGV4UG9zaXRpb24nLFxuICB0ZXh0dXJlQ29vcmRBdHRyaWJ1dGU6ICdhVGV4dHVyZUNvb3JkJyxcbiAgdmVydGV4Tm9ybWFsQXR0cmlidXRlOiAnYVZlcnRleE5vcm1hbCdcbn1cblxuY29uc3QgZGVmYXVsdFVuaWZvcm1NYXAgPSB7XG4gIHByb2plY3Rpb25NYXRyaXhVbmlmb3JtOiAndVByb2plY3Rpb25NYXRyaXgnLFxuICBtb2RlbFZpZXdNYXRyaXhVbmlmb3JtOiAndU1vZGVsVmlld01hdHJpeCcsXG4gIHNhbXBsZXJVbmlmb3JtOiAndVNhbXBsZXInLFxuICB1c2VMaWdodGluZ1VuaWZvcm06ICd1VXNlTGlnaHRpbmcnLFxuICBhbWJpZW50Q29sb3JVbmlmb3JtOiAndUFtYmllbnRDb2xvcicsXG4gIGRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtOiAndURpcmVjdGlvbmFsQ29sb3InLFxuICBsaWdodGluZ0RpcmVjdGlvblVuaWZvcm06ICd1TGlnaHRpbmdEaXJlY3Rpb24nLFxuICBuTWF0cml4VW5pZm9ybTogJ3VOTWF0cml4JyxcbiAgaXNCbGVuZFVuaWZvcm06ICd1SXNCbGVuZCcsXG4gIGFscGhhVW5pZm9ybTogJ3VBbHBoYSdcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZGVyUHJvZ3JhbSB7XG4gIGNvbnN0cnVjdG9yIChzaGFkZXJPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBnbCxcbiAgICAgIHZlcnRleFNoYWRlclNvdXJjZSA9IGRlZmF1bHRWZXJ0ZXhTaGFkZXJTb3VyY2UsXG4gICAgICBmcmFnbWVudFNoYWRlclNvdXJjZSA9IGRlZmF1bHRGcmFnbWVudFNoYWRlclNvdXJjZSxcbiAgICAgIGF0dHJpYnV0ZU1hcCA9IGRlZmF1bHRBdHRyaWJ1dGVNYXAsXG4gICAgICB1bmlmb3JtTWFwID0gZGVmYXVsdFVuaWZvcm1NYXBcbiAgICB9ID0gc2hhZGVyT3B0aW9uc1xuXG4gICAgaWYgKCFnbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB3ZWJnbCBjb250ZXh0IGZvciBzaGFkZXIgcHJvZ3JhbScpXG4gICAgfVxuXG4gICAgdGhpcy5nbCA9IGdsXG4gICAgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UgPSB2ZXJ0ZXhTaGFkZXJTb3VyY2VcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyU291cmNlID0gZnJhZ21lbnRTaGFkZXJTb3VyY2VcbiAgICB0aGlzLmF0dHJpYnV0ZU1hcCA9IGF0dHJpYnV0ZU1hcFxuICAgIHRoaXMudW5pZm9ybU1hcCA9IHVuaWZvcm1NYXBcblxuICAgIHRoaXMuY3JlYXRlUHJvZ3JhbSgpXG4gICAgdGhpcy5pbml0VmFyaWFibGVNYXAoKVxuICB9XG5cbiAgY3JlYXRlU2hhZGVyIChzaGFkZXJUeXBlKSB7XG4gICAgbGV0IHNoYWRlclxuICBcbiAgICBzd2l0Y2ggKHNoYWRlclR5cGUpIHtcbiAgICAgIGNhc2UgJ3ZlcnRleCc6XG4gICAgICAgIHNoYWRlciA9IHRoaXMuZ2wuY3JlYXRlU2hhZGVyKHRoaXMuZ2wuVkVSVEVYX1NIQURFUilcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCB0aGlzLnZlcnRleFNoYWRlclNvdXJjZSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgXG4gICAgICBjYXNlICdmcmFnbWVudCc6XG4gICAgICAgIHNoYWRlciA9IHRoaXMuZ2wuY3JlYXRlU2hhZGVyKHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSKVxuICAgICAgICB0aGlzLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHRoaXMuZnJhZ21lbnRTaGFkZXJTb3VyY2UpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNoYWRlciB0eXBlIHRvIGNyZWF0ZTogJHt0eXBlfWApXG4gICAgfVxuICAgIFxuICAgIHRoaXMuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXG4gICAgXG4gICAgaWYgKCF0aGlzLmdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIHRoaXMuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAvLyBUaGUgc2hhZGVyIGlzIG5vdCBjb3JyZWN0bHkgY29tcGlsZWRcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSlcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHNoYWRlclxuICB9XG5cbiAgY3JlYXRlUHJvZ3JhbSAoKSB7XG4gICAgdGhpcy5wcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKClcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuY3JlYXRlU2hhZGVyKCd2ZXJ0ZXgnKSlcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuY3JlYXRlU2hhZGVyKCdmcmFnbWVudCcpKVxuICAgIHRoaXMuZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKVxuICAgIFxuICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIC8vIFRoZSBzaGFkZXIgcHJvZ3JhbSBpcyBub3QgY29ycmVjdGx5IGxpbmtlZFxuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcm9ncmFtKSlcbiAgICB9XG4gIH1cblxuICBpbml0VmFyaWFibGVNYXAgKCkge1xuICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pXG4gIFxuICAgIC8vIFB1dCBhbGwgYXR0YWNoZWQgaW5mb3JtYXRpb24gdG8gc2hhZGVyIHByb2dyYW0gbWV0YSBpbmZvcm1hdGlvblxuICAgIHRoaXMudmFyaWFibGVNYXAgPSB7fVxuXG4gICAgZm9yIChsZXQgYXR0cmliS2V5IGluIHRoaXMuYXR0cmlidXRlTWFwKSB7XG4gICAgICBpZiAodGhpcy5hdHRyaWJ1dGVNYXAuaGFzT3duUHJvcGVydHkoYXR0cmliS2V5KSkge1xuICAgICAgICBsZXQgYXR0cmliTG9jYXRpb24gPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgdGhpcy5hdHRyaWJ1dGVNYXBbYXR0cmliS2V5XSlcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcFthdHRyaWJLZXldID0gYXR0cmliTG9jYXRpb25cbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJMb2NhdGlvbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCB1bmlmb3JtS2V5IGluIHRoaXMudW5pZm9ybU1hcCkge1xuICAgICAgaWYgKHRoaXMudW5pZm9ybU1hcC5oYXNPd25Qcm9wZXJ0eSh1bmlmb3JtS2V5KSkge1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwW3VuaWZvcm1LZXldID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCB0aGlzLnVuaWZvcm1NYXBbdW5pZm9ybUtleV0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYWRlcnMvU2hhZGVyUHJvZ3JhbS5qcyIsImV4cG9ydCBkZWZhdWx0IGBcbmF0dHJpYnV0ZSB2ZWMzIGFWZXJ0ZXhQb3NpdGlvbjtcbmF0dHJpYnV0ZSB2ZWMzIGFWZXJ0ZXhOb3JtYWw7XG5hdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1xuXG51bmlmb3JtIG1hdDQgdVByb2plY3Rpb25NYXRyaXg7XG51bmlmb3JtIG1hdDQgdU1vZGVsVmlld01hdHJpeDtcbnVuaWZvcm0gbWF0MyB1Tk1hdHJpeDtcblxudW5pZm9ybSB2ZWMzIHVBbWJpZW50Q29sb3I7XG5cbnVuaWZvcm0gdmVjMyB1TGlnaHRpbmdEaXJlY3Rpb247XG51bmlmb3JtIHZlYzMgdURpcmVjdGlvbmFsQ29sb3I7XG5cbnVuaWZvcm0gYm9vbCB1VXNlTGlnaHRpbmc7XG5cbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xudmFyeWluZyB2ZWMzIHZMaWdodFdlaWdodGluZztcblxudm9pZCBtYWluICh2b2lkKSB7XG4gIGdsX1Bvc2l0aW9uID0gdVByb2plY3Rpb25NYXRyaXggKiB1TW9kZWxWaWV3TWF0cml4ICogdmVjNChhVmVydGV4UG9zaXRpb24sIDEuMCk7XG4gIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1xuXG4gIGlmICh1VXNlTGlnaHRpbmcpIHtcbiAgICB2ZWMzIHRyYW5zZm9ybWVkTm9ybWFsID0gdU5NYXRyaXggKiBhVmVydGV4Tm9ybWFsO1xuICAgIGZsb2F0IGRpcmVjdGlvbmFsTGlnaHRXZWlnaHRpbmcgPSBtYXgoMC4wLCBkb3QodHJhbnNmb3JtZWROb3JtYWwsIHVMaWdodGluZ0RpcmVjdGlvbikpO1xuICAgIHZMaWdodFdlaWdodGluZyA9IHVBbWJpZW50Q29sb3IgKyB1RGlyZWN0aW9uYWxDb2xvciAqIGRpcmVjdGlvbmFsTGlnaHRXZWlnaHRpbmc7XG4gIH0gZWxzZSB7XG4gICAgdkxpZ2h0V2VpZ2h0aW5nID0gdmVjMygxLjAsIDEuMCwgMS4wKTtcbiAgfVxufVxuYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIiwiZXhwb3J0IGRlZmF1bHQgYFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG52YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcbnZhcnlpbmcgdmVjMyB2TGlnaHRXZWlnaHRpbmc7XG5cbnVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1xudW5pZm9ybSBib29sIHVJc0JsZW5kO1xudW5pZm9ybSBmbG9hdCB1QWxwaGE7XG5cbnZvaWQgbWFpbih2b2lkKSB7XG4gIHZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQucywgdlRleHR1cmVDb29yZC50KSk7XG4gIC8vIEFkanVzdCB0ZXh0dXJlQ29sb3IgcmdiIHZhbHVlIGJ5IGxpZ2h0IHdlaWdodFxuICBpZiAodUlzQmxlbmQpIHtcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleHR1cmVDb2xvci5yZ2IgKiB2TGlnaHRXZWlnaHRpbmcsIHRleHR1cmVDb2xvci5hICogdUFscGhhKTtcbiAgfSBlbHNlIHtcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleHR1cmVDb2xvci5yZ2IgKiB2TGlnaHRXZWlnaHRpbmcsIHRleHR1cmVDb2xvci5hKTtcbiAgfVxufVxuYFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFkZXJzL2ZyYWdtZW50U2hhZGVyLmpzIiwiaW1wb3J0IHNoYXBlVXRpbCBmcm9tICcuL3NoYXBlVXRpbCdcbmltcG9ydCBkZWZhdWx0VGV4dHVyZVNyYyBmcm9tICcuLi90ZXh0dXJlcy9kdWNrLnBuZydcbmltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi4vZ2FtZVN0YXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGhlcmUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIHNjZW5lLFxuICAgICAgc2hhZGVyUHJvZ3JhbSxcbiAgICAgIGlzQmxlbmQgPSBmYWxzZSxcbiAgICAgIGJsZW5kQWxwaGEgPSAwLjUsXG4gICAgICB0ZXh0dXJlU3JjID0gZGVmYXVsdFRleHR1cmVTcmMsXG4gICAgICB1c2VMaWdodCA9IHRydWUsXG4gICAgICBhbWJpZW50Q29sb3IgPSBbMC4yLCAwLjIsIDAuMl0sXG4gICAgICBkaXJlY3Rpb25hbENvbG9yID0gWzAuOCwgMC44LCAwLjhdLFxuICAgICAgbGlnaHRpbmdEaXJlY3Rpb24gPSBbMC4wLCAwLjAsIC0xLjBdLFxuICAgICAgeCA9IDAsXG4gICAgICB5ID0gMCxcbiAgICAgIHogPSAtMTAsXG4gICAgICBzcGVlZFggPSAwLFxuICAgICAgc3BlZWRZID0gMCxcbiAgICAgIHNwZWVkWiA9IDAsXG4gICAgICByb3RhdGVTcGVlZFggPSBNYXRoLnJhbmRvbSgpICogMTUsXG4gICAgICByb3RhdGVTcGVlZFkgPSBNYXRoLnJhbmRvbSgpICogMTUsXG4gICAgICByb3RhdGVTcGVlZFogPSBNYXRoLnJhbmRvbSgpICogMTUsXG4gICAgICByb3RhdGVYID0gMCxcbiAgICAgIHJvdGF0ZVkgPSAwLFxuICAgICAgcm90YXRlWiA9IDAsXG5cbiAgICAgIHJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiAyMCxcbiAgICAgIGxhdGl0dWRlQmFuZHMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyA1LFxuICAgICAgbG9uZ2l0dWRlQmFuZHMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyA1XG4gICAgfSA9IG9wdGlvbnNcblxuICAgIGlmICghc2hhZGVyUHJvZ3JhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzaGFkZXIgcHJvZ3JhbSBwcm92aWRlZCEnKVxuICAgIH1cblxuICAgIGlmICghc2NlbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2NlbmUgZm9yIHRoaXMgc2hhcGUnLCB0aGlzKVxuICAgIH1cblxuICAgIHRoaXMuZ2wgPSBzaGFkZXJQcm9ncmFtLmdsXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gc2hhZGVyUHJvZ3JhbVxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxuICAgIHRoaXMuaXNCbGVuZCA9IGlzQmxlbmRcbiAgICB0aGlzLmJsZW5kQWxwaGEgPSBibGVuZEFscGhhXG4gICAgdGhpcy50ZXh0dXJlU3JjID0gdGV4dHVyZVNyY1xuICAgIHRoaXMudXNlTGlnaHQgPSB1c2VMaWdodFxuICAgIHRoaXMuYW1iaWVudENvbG9yID0gYW1iaWVudENvbG9yXG4gICAgdGhpcy5kaXJlY3Rpb25hbENvbG9yID0gZGlyZWN0aW9uYWxDb2xvclxuICAgIHRoaXMubGlnaHRpbmdEaXJlY3Rpb24gPSBsaWdodGluZ0RpcmVjdGlvblxuXG4gICAgLy8gbW92ZSBzcGVlZHNcbiAgICB0aGlzLnNwZWVkWCA9IHNwZWVkWFxuICAgIHRoaXMuc3BlZWRZID0gc3BlZWRZXG4gICAgdGhpcy5zcGVlZFogPSBzcGVlZFpcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnogPSB6XG5cbiAgICAvLyByb3RhdGUgc3BlZWRzXG4gICAgdGhpcy5yb3RhdGVTcGVlZFggPSByb3RhdGVTcGVlZFhcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWSA9IHJvdGF0ZVNwZWVkWVxuICAgIHRoaXMucm90YXRlU3BlZWRaID0gcm90YXRlU3BlZWRaXG5cbiAgICAvLyByb3RhdGUgcmFkaXVzXG4gICAgdGhpcy5yb3RhdGVYID0gcm90YXRlWFxuICAgIHRoaXMucm90YXRlWSA9IHJvdGF0ZVlcbiAgICB0aGlzLnJvdGF0ZVogPSByb3RhdGVaXG5cbiAgICAvLyB2ZXJ0ZXggYnVmZmVyXG4gICAgdGhpcy5wb3NpdGlvbkJ1ZmZlciA9IG51bGxcblxuICAgIC8vIG5vcm1hbCBidWZmZXJcbiAgICB0aGlzLm5vcm1hbEJ1ZmZlciA9IG51bGxcblxuICAgIC8vIHRleHR1cmUgYnVmZmVyXG4gICAgdGhpcy50ZXh0dXJlQ29vcmRCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBpbmRleCBidWZmZXJcbiAgICB0aGlzLnZlcnRleEluZGV4QnVmZmVyID0gbnVsbFxuXG4gICAgLy8gU3BoZXJlIHRoaW5nc1xuICAgIHRoaXMubGF0aXR1ZGVCYW5kcyA9IGxhdGl0dWRlQmFuZHNcbiAgICB0aGlzLmxvbmdpdHVkZUJhbmRzID0gbG9uZ2l0dWRlQmFuZHNcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1c1xuXG4gICAgLy8gaW5pdCB0aGUgY3ViZVxuICAgIHRoaXMuaW5pdEJ1ZmZlcigpXG4gICAgdGhpcy5pbml0VGV4dHVyZSgpXG4gIH1cblxuICBpbml0QnVmZmVyICgpIHtcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGFycmF5IGRhdGFcbiAgICBjb25zdCB2ZXJ0ZXhQb3NpdGlvbkRhdGEgPSBbXVxuICAgIGNvbnN0IG5vcm1hbERhdGEgPSBbXVxuICAgIGNvbnN0IHRleHR1cmVDb29yZERhdGEgPSBbXVxuICAgIFxuICAgIGZvciAobGV0IGxhdE51bWJlciA9IDA7IGxhdE51bWJlciA8PSB0aGlzLmxhdGl0dWRlQmFuZHM7IGxhdE51bWJlcisrKSB7XG4gICAgICBsZXQgdGhldGEgPSBsYXROdW1iZXIgKiBNYXRoLlBJIC8gdGhpcy5sYXRpdHVkZUJhbmRzXG4gICAgICBsZXQgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSlcbiAgICAgIGxldCBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKVxuXG4gICAgICBmb3IgKGxldCBsb25nTnVtYmVyID0gMDsgbG9uZ051bWJlciA8PSB0aGlzLmxvbmdpdHVkZUJhbmRzOyBsb25nTnVtYmVyKyspIHtcbiAgICAgICAgbGV0IHBoaSA9IGxvbmdOdW1iZXIgKiAyICogTWF0aC5QSSAvIHRoaXMubG9uZ2l0dWRlQmFuZHNcbiAgICAgICAgbGV0IHNpblBoaSA9IE1hdGguc2luKHBoaSlcbiAgICAgICAgbGV0IGNvc1BoaSA9IE1hdGguY29zKHBoaSlcblxuICAgICAgICAvLyBDb252ZXJ0IHJhZGl1cyBjb29yZGluYXRlIGludG8gY2FydGVzaWFuIGNvb3JkaW5hdGUgKGFzc3VtZSByYWRpdXMgaXMgdW5pdCkuXG4gICAgICAgIGxldCB4ID0gc2luVGhldGEgKiBjb3NQaGlcbiAgICAgICAgbGV0IHkgPSBjb3NUaGV0YVxuICAgICAgICBsZXQgeiA9IHNpblRoZXRhICogc2luUGhpXG5cbiAgICAgICAgLy8gVGhlIHRleHR1cmUgY29vcmRpbmF0ZSBpcyBjb21wdXRlZCBieSAnTWVyY2F0b3IgcHJvamVjdGlvbidcbiAgICAgICAgbGV0IHUgPSAxIC0gKGxvbmdOdW1iZXIgLyB0aGlzLmxvbmdpdHVkZUJhbmRzKVxuICAgICAgICBsZXQgdiA9IDEgLSAobGF0TnVtYmVyIC8gdGhpcy5sYXRpdHVkZUJhbmRzKVxuXG4gICAgICAgIC8vIFBhc3MgYWxsIHRoZXNlIHZhbHVlcyBpbnRvIHRoZSBkYXRhIGFycmF5XG4gICAgICAgIHZlcnRleFBvc2l0aW9uRGF0YS5wdXNoKHRoaXMucmFkaXVzICogeClcbiAgICAgICAgdmVydGV4UG9zaXRpb25EYXRhLnB1c2godGhpcy5yYWRpdXMgKiB5KVxuICAgICAgICB2ZXJ0ZXhQb3NpdGlvbkRhdGEucHVzaCh0aGlzLnJhZGl1cyAqIHopXG5cbiAgICAgICAgbm9ybWFsRGF0YS5wdXNoKHgpXG4gICAgICAgIG5vcm1hbERhdGEucHVzaCh5KVxuICAgICAgICBub3JtYWxEYXRhLnB1c2goeilcblxuICAgICAgICB0ZXh0dXJlQ29vcmREYXRhLnB1c2godSlcbiAgICAgICAgdGV4dHVyZUNvb3JkRGF0YS5wdXNoKHYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wb3NpdGlvbkJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCB2ZXJ0ZXhQb3NpdGlvbkRhdGEsIHtcbiAgICAgIGl0ZW1TaXplOiAzLFxuICAgICAgbnVtSXRlbXM6ICh0aGlzLmxhdGl0dWRlQmFuZHMgKyAxKSAqICh0aGlzLmxvbmdpdHVkZUJhbmRzICsgMSlcbiAgICB9KVxuXG4gICAgdGhpcy5ub3JtYWxCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgbm9ybWFsRGF0YSwge1xuICAgICAgaXRlbVNpemU6IDMsXG4gICAgICBudW1JdGVtczogKHRoaXMubGF0aXR1ZGVCYW5kcyArIDEpICogKHRoaXMubG9uZ2l0dWRlQmFuZHMgKyAxKVxuICAgIH0pXG5cbiAgICB0aGlzLnRleHR1cmVDb29yZEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCB0ZXh0dXJlQ29vcmREYXRhLCB7XG4gICAgICBpdGVtU2l6ZTogMixcbiAgICAgIG51bUl0ZW1zOiAodGhpcy5sYXRpdHVkZUJhbmRzICsgMSkgKiAodGhpcy5sb25naXR1ZGVCYW5kcyArIDEpXG4gICAgfSlcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgc3BoZXJlIGluZGV4IGJ1ZmZlclxuICAgIGNvbnN0IGluZGV4RGF0YSA9IFtdXG5cbiAgICBmb3IgKGxldCBsYXROdW1iZXIgPSAwOyBsYXROdW1iZXIgPCB0aGlzLmxhdGl0dWRlQmFuZHM7IGxhdE51bWJlcisrKSB7XG4gICAgICBmb3IgKGxldCBsb25nTnVtYmVyID0gMDsgbG9uZ051bWJlciA8IHRoaXMubG9uZ2l0dWRlQmFuZHM7IGxvbmdOdW1iZXIrKykge1xuICAgICAgICBsZXQgZmlyc3QgPSBsb25nTnVtYmVyICsgKGxhdE51bWJlciAqICh0aGlzLmxvbmdpdHVkZUJhbmRzICsgMSkpXG4gICAgICAgIGxldCBzZWNvbmQgPSBmaXJzdCArIHRoaXMubG9uZ2l0dWRlQmFuZHMgKyAxXG5cbiAgICAgICAgaW5kZXhEYXRhLnB1c2goZmlyc3QpXG4gICAgICAgIGluZGV4RGF0YS5wdXNoKHNlY29uZClcbiAgICAgICAgaW5kZXhEYXRhLnB1c2goZmlyc3QgKyAxKVxuXG4gICAgICAgIGluZGV4RGF0YS5wdXNoKHNlY29uZClcbiAgICAgICAgaW5kZXhEYXRhLnB1c2goc2Vjb25kICsgMSlcbiAgICAgICAgaW5kZXhEYXRhLnB1c2goZmlyc3QgKyAxKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudmVydGV4SW5kZXhCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgaW5kZXhEYXRhLCB7XG4gICAgICBpdGVtU2l6ZTogMSxcbiAgICAgIG51bUl0ZW1zOiB0aGlzLmxhdGl0dWRlQmFuZHMgKiB0aGlzLmxvbmdpdHVkZUJhbmRzICogNixcbiAgICAgIHZlcnREYXRhQ29uc3RydWN0b3I6IFVpbnQxNkFycmF5LFxuICAgICAgYmluZFRhcmdldDogdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUlxuICAgIH0pXG4gIH1cblxuICBpbml0VGV4dHVyZSAoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlVGV4dHVyZShpbWFnZSlcbiAgICB9XG5cbiAgICBpbWFnZS5zcmMgPSB0aGlzLnRleHR1cmVTcmNcbiAgfVxuXG4gIGNyZWF0ZVRleHR1cmUgKGltYWdlKSB7XG4gICAgdGhpcy5jdWJlVGV4dHVyZSA9IHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpXG4gICAgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSA9IGltYWdlXG4gICAgXG4gICAgLy8gQ29uZmlnIHRleHR1cmUgcmVsYXRlZCBsb2dpY1xuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UpXG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKVxuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVClcbiAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRClcblxuICAgIC8vIFRPRE86IHVzZSBuZWFyZXN0IGZpbHRlciBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgLy8gdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgLy8gdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgLy8gdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSlcbiAgICAvLyB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5ORUFSRVNUKVxuICAgIC8vIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLk5FQVJFU1QpXG5cbiAgICAvLyBJdCdzIGFsd2F5cyBnb29kIHRvIHJlc2V0IGFjdGl2ZSB0ZXh0dXJlIGZsYWdcbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgbnVsbClcbiAgfVxuXG4gIGhhbmRsZUtleXMgKGR0KSB7XG4gICAgLy8gQ2FsY3VsYXRlIHJvdGF0aW9uc1xuICAgIC8vIGZvcndhcmRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szOF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPiAtNTApIHtcbiAgICAgIHRoaXMueiArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gYmFja3dhcmRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s0MF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPCA1MCkge1xuICAgICAgdGhpcy56IC09IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBtb3ZlIGxlZnRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szN10gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPiAtNTApIHtcbiAgICAgIHRoaXMueCArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gbW92ZSByaWdodFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM5XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICB0aGlzLnggLT0gMC4zXG4gICAgfVxuXG4gICAgLy8gbW92ZSB0b3BcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s4N10gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPCA1MCkge1xuICAgICAgdGhpcy55IC09IDAuM1xuICAgIH1cblxuICAgIC8vIG1vdmUgZG93blxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzgzXSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICB0aGlzLnkgKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIC8vIHR1cm4gbGVmdFxuICAgIC8vIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzQ5XSAmJiB0aGlzLnogPiAtMzApIHtcbiAgICAvLyAgIHRoaXMueiArPSAwLjJcbiAgICAvLyB9XG4gICAgXG4gICAgLy8gLy8gdHVybiByaWdodFxuICAgIC8vIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzUwXSAmJiB0aGlzLnogPCAtMSkge1xuICAgIC8vICAgdGhpcy56IC09IDAuMlxuICAgIC8vIH1cbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgdGhpcy5yb3RhdGVYICs9IHNoYXBlVXRpbC5kZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRYKSAvIDEwMFxuICAgIHRoaXMucm90YXRlWSArPSBzaGFwZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWSkgLyAxMDBcbiAgICB0aGlzLnJvdGF0ZVogKz0gc2hhcGVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFopIC8gMTAwXG4gIH1cblxuICBkcmF3ICgpIHtcbiAgICAvLyBDaGVjayBpZiBuZWVkIHRvIGJsZW5kXG4gICAgaWYgKHRoaXMuaXNCbGVuZCkge1xuICAgICAgLy8gQWRkIGJsZW5kaW5nIGVmZmVjdCB0byBzaW11bGF0ZSB0cmFuc3BhcmVuY3lcbiAgICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORSk7XG4gICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICAgIHRoaXMuZ2wuZGlzYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuICAgICAgLy8gUGFzcyBhbHBoYSB1bmlmb3JtIHRvIHNoYWRlclxuICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmlzQmxlbmRVbmlmb3JtLCB0cnVlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5hbHBoYVVuaWZvcm0sIHRoaXMuYmxlbmRBbHBoYSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKVxuICAgICAgdGhpcy5nbC5kaXNhYmxlKHRoaXMuZ2wuQkxFTkQpXG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuaXNCbGVuZFVuaWZvcm0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBQYXNzIHZlcnRleCBwb3NpdGlvbiBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5wb3NpdGlvbkJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCB0aGlzLnBvc2l0aW9uQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIFBhc3MgdGV4dHVyZSBjb29yZGluYXRlcyBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy50ZXh0dXJlQ29vcmRCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC50ZXh0dXJlQ29vcmRBdHRyaWJ1dGUsIHRoaXMudGV4dHVyZUNvb3JkQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuXG4gICAgLy8gQWN0aXZlIHRleHR1cmUgdXNpbmcgdGhlIGZpcnN0IHRleHR1cmUgdW5pdFxuICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkUwKVxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5zYW1wbGVyVW5pZm9ybSwgMClcblxuICAgIC8vIFBhc3Mgbm9ybWFscyBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5ub3JtYWxCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC52ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUsIHRoaXMubm9ybWFsQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIEFkZCBsaWdodFxuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC51c2VMaWdodGluZ1VuaWZvcm0sICEhdGhpcy51c2VMaWdodClcbiAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuYW1iaWVudENvbG9yVW5pZm9ybSwgdGhpcy5hbWJpZW50Q29sb3JbMF0sIHRoaXMuYW1iaWVudENvbG9yWzFdLCB0aGlzLmFtYmllbnRDb2xvclsyXSlcbiAgICB0aGlzLmdsLnVuaWZvcm0zZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclswXSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzFdLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMl0pXG5cbiAgICBsZXQgYWRqdXN0ZWRMaWdodERpcmVjdGlvbiA9IHZlYzMuY3JlYXRlKClcbiAgICAvLyBOb3JtYWxpemUgc28gdGhhdCB0aGUgZG90IHByb2R1Y3QgaXMgdGhlIHNhbWUgdG8gY29zaW5lXG4gICAgdmVjMy5ub3JtYWxpemUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgdGhpcy5saWdodGluZ0RpcmVjdGlvbilcbiAgICAvLyBSZXZlcnNlIHRoZSBkaXJlY3Rpb24gdG8gZGVzY3JpYmUgbGlnaHQgc291cmNlXG4gICAgdmVjMy5zY2FsZShhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCAtMSlcbiAgICAvLyBQYXNzIGxpZ2h0aW5nIGRpcmVjdGlvbiB1bmlmb3JtIHRvIHNoYWRlclxuICAgIHRoaXMuZ2wudW5pZm9ybTNmdih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAubGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uKVxuXG4gICAgLy8gVHJhbnNmb3JtIG1vZGVsIHZpZXcgbWF0cml4XG4gICAgdGhpcy5zY2VuZS5tb2RlbFZpZXdQdXNoTWF0cml4KClcbiAgICBtYXQ0LnRyYW5zbGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XSlcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWCwgc2hhcGVVdGlsLnhBeGlzKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVZLCBzaGFwZVV0aWwueUF4aXMpXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVosIHNoYXBlVXRpbC56QXhpcylcbiAgICBcbiAgICAvLyBQYXNzIHRoZSBtb2RlbCB2aWV3IG1hdHJpeCwgcHJvamVjdGlvbiBtYXRyaXggYW5kIG5vcm1hbCBtYXRyaXggaW50byBzaGFkZXJcbiAgICB0aGlzLnNjZW5lLnNldFVuaWZvcm1NYXRyaXgoKVxuICAgIFxuICAgIC8vIGRyYXcgdGhlIGN1YmVcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhJbmRleEJ1ZmZlcilcbiAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgdGhpcy52ZXJ0ZXhJbmRleEJ1ZmZlci5pbmZvLm51bUl0ZW1zLCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKVxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UG9wTWF0cml4KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXBlcy9zcGhlcmUuanMiXSwic291cmNlUm9vdCI6IiJ9