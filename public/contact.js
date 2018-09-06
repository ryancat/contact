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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shaders_ShaderProgram__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameState__ = __webpack_require__(0);
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

      this.shaderProgram = new __WEBPACK_IMPORTED_MODULE_2__shaders_ShaderProgram__["a" /* default */]({
        gl: this.gl
      }); // Init scene

      this.scene = new __WEBPACK_IMPORTED_MODULE_0__Scene__["a" /* default */]({
        game: this
      }); // The init logic goes below

      var cube = new __WEBPACK_IMPORTED_MODULE_1__shapes_cube__["a" /* default */]({
        shaderProgram: this.shaderProgram,
        scene: this.scene
      });
      this.scene.addModel(cube);
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(e) {
      __WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[e.keyCode] = true;
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup(e) {
      __WEBPACK_IMPORTED_MODULE_3__gameState__["a" /* default */].currentPressedKeys[e.keyCode] = false;
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
      mat4.perspective(this.projectionMatrix, 45, this.canvas.width / this.canvas.height, 0.1, 100);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cube; });
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

        this.gl.uniform1f(this.shaderProgram.variableMap.isBlendUniform, true);
        this.gl.uniform1f(this.shaderProgram.variableMap.alphaUniform, this.blendAlpha);
      } else {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.disable(this.gl.BLEND);
        this.gl.uniform1f(this.shaderProgram.variableMap.isBlendUniform, false);
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

      this.gl.uniform1i(this.shaderProgram.variableMap.useLightingUniform, this.useLight);
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
  isBlendUniform: 'uisBlend',
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
/* harmony default export */ __webpack_exports__["a"] = ("\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uProjectionMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat3 uNMatrix;\n\nuniform vec3 uAmbientColor;\n\nuniform vec3 uLightingDirection;\nuniform vec3 uDirectionalColor;\n\nuniform bool uUseLighting;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vLightWeighting;\n\nvoid main (void) {\n  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);\n  vTextureCoord = aTextureCoord;\n\n  if (uUseLighting) {\n    vLightWeighting = vec3(1.0, 1.0, 1.0);\n  } else {\n    vec3 transformedNormal = uNMatrix * aVertexNormal;\n    float directionalLightWeighting = max(0.0, dot(transformedNormal, uLightingDirection));\n    vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;\n  }\n}\n");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("\nprecision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec3 vLightWeighting;\n\nuniform sampler2D uSampler;\nuniform bool uisBlend;\nuniform float uAlpha;\n\nvoid main(void) {\n  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n  // Adjust textureColor rgb value by light weight\n  if (uisBlend) {\n    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a * uAlpha);\n  } else {\n    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);\n  }\n}\n");

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyODA5ZTliMzFkNDE4OGRhZDVlNiIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZVN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9TY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGVzL2N1YmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXBlcy9zaGFwZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHR1cmVzL2R1Y2sucG5nIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL1NoYWRlclByb2dyYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL2ZyYWdtZW50U2hhZGVyLmpzIl0sIm5hbWVzIjpbImdhbWVTdGF0ZSIsImN1cnJlbnRQcmVzc2VkS2V5cyIsImZwcyIsIkdhbWUiLCJnYW1lT3B0aW9ucyIsImNhbnZhcyIsImluaXQiLCJsb29wIiwidGljayIsImJpbmQiLCJkdCIsImhhbmRsZUtleXMiLCJhbmltYXRlIiwiZHJhdyIsImdsIiwiZ2V0Q29udGV4dCIsImFsZXJ0IiwiZ2xOb3RTdXBwb3J0ZWQiLCJyZXNpemVDYW52YXMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVLZXlkb3duIiwiaGFuZGxlS2V5dXAiLCJzaGFkZXJQcm9ncmFtIiwic2NlbmUiLCJnYW1lIiwiY3ViZSIsImFkZE1vZGVsIiwiZSIsImtleUNvZGUiLCJ3aWR0aCIsImhlaWdodCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJjb250ZXh0IiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwiZmlsbFRleHQiLCJjbGVhckNvbG9yIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImNiIiwibm93IiwiRGF0ZSIsImR1cmF0aW9uIiwibGFzdFJ1biIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNvbnRhY3RHYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydCIsIlNjZW5lIiwic2NlbmVPcHRpb25zIiwiRXJyb3IiLCJtb2RlbFZpZXdNYXRyaXhTdGFjayIsIm1vZGVsVmlld01hdHJpeCIsIm1hdDQiLCJjcmVhdGUiLCJwcm9qZWN0aW9uTWF0cml4IiwibW9kZWxzIiwibW9kZWwiLCJwdXNoIiwiY29weSIsImxlbmd0aCIsInBvcCIsInVuaWZvcm1NYXRyaXg0ZnYiLCJ2YXJpYWJsZU1hcCIsInByb2plY3Rpb25NYXRyaXhVbmlmb3JtIiwibW9kZWxWaWV3TWF0cml4VW5pZm9ybSIsIm5vcm1hbE1hdHJpeCIsIm1hdDMiLCJub3JtYWxGcm9tTWF0NCIsInVuaWZvcm1NYXRyaXgzZnYiLCJuTWF0cml4VW5pZm9ybSIsImZvckVhY2giLCJ2aWV3cG9ydCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJwZXJzcGVjdGl2ZSIsImlkZW50aXR5IiwiQ3ViZSIsIm9wdGlvbnMiLCJpc0JsZW5kIiwiYmxlbmRBbHBoYSIsInRleHR1cmVTcmMiLCJ1c2VMaWdodCIsImFtYmllbnRDb2xvciIsImRpcmVjdGlvbmFsQ29sb3IiLCJsaWdodGluZ0RpcmVjdGlvbiIsIngiLCJ5IiwieiIsInNwZWVkWCIsInNwZWVkWSIsInNwZWVkWiIsInJvdGF0ZVNwZWVkWCIsInJvdGF0ZVNwZWVkWSIsInJvdGF0ZVNwZWVkWiIsInJvdGF0ZVgiLCJyb3RhdGVZIiwicm90YXRlWiIsImN1YmVCdWZmZXIiLCJjdWJlVmVydGV4Tm9ybWFsQnVmZmVyIiwiY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciIsImluaXRCdWZmZXIiLCJpbml0VGV4dHVyZSIsImNyZWF0ZUFycmF5QnVmZmVyIiwiaXRlbVNpemUiLCJudW1JdGVtcyIsImN1YmVWZXJ0ZXhJbmRleEJ1ZmZlciIsInZlcnREYXRhQ29uc3RydWN0b3IiLCJVaW50MTZBcnJheSIsImJpbmRUYXJnZXQiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJjcmVhdGVUZXh0dXJlIiwic3JjIiwiY3ViZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJwaXhlbFN0b3JlaSIsIlVOUEFDS19GTElQX1lfV0VCR0wiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsImRlZ1RvUmFkIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FIiwiQkxFTkQiLCJkaXNhYmxlIiwidW5pZm9ybTFmIiwiaXNCbGVuZFVuaWZvcm0iLCJhbHBoYVVuaWZvcm0iLCJiaW5kQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwidmVydGV4QXR0cmliUG9pbnRlciIsInZlcnRleFBvc2l0aW9uQXR0cmlidXRlIiwiaW5mbyIsIkZMT0FUIiwidGV4dHVyZUNvb3JkQXR0cmlidXRlIiwiYWN0aXZlVGV4dHVyZSIsIlRFWFRVUkUwIiwidW5pZm9ybTFpIiwic2FtcGxlclVuaWZvcm0iLCJ2ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUiLCJ1c2VMaWdodGluZ1VuaWZvcm0iLCJ1bmlmb3JtM2YiLCJhbWJpZW50Q29sb3JVbmlmb3JtIiwiZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0iLCJhZGp1c3RlZExpZ2h0RGlyZWN0aW9uIiwidmVjMyIsIm5vcm1hbGl6ZSIsInNjYWxlIiwidW5pZm9ybTNmdiIsImxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSIsIm1vZGVsVmlld1B1c2hNYXRyaXgiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJzZXRVbmlmb3JtTWF0cml4IiwiZHJhd0VsZW1lbnRzIiwiVFJJQU5HTEVTIiwiVU5TSUdORURfU0hPUlQiLCJtb2RlbFZpZXdQb3BNYXRyaXgiLCJzaGFwZVV0aWwiLCJ2ZXJ0cyIsInZlcnRzT3B0aW9uIiwiRmxvYXQzMkFycmF5IiwiY3JlYXRlQnVmZmVyIiwiYnVmZmVyRGF0YSIsIlNUQVRJQ19EUkFXIiwiZGVnIiwiTWF0aCIsIlBJIiwiZGVmYXVsdEF0dHJpYnV0ZU1hcCIsImRlZmF1bHRVbmlmb3JtTWFwIiwiU2hhZGVyUHJvZ3JhbSIsInNoYWRlck9wdGlvbnMiLCJ2ZXJ0ZXhTaGFkZXJTb3VyY2UiLCJmcmFnbWVudFNoYWRlclNvdXJjZSIsImF0dHJpYnV0ZU1hcCIsInVuaWZvcm1NYXAiLCJjcmVhdGVQcm9ncmFtIiwiaW5pdFZhcmlhYmxlTWFwIiwic2hhZGVyVHlwZSIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJGUkFHTUVOVF9TSEFERVIiLCJ0eXBlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsInByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsImdldFByb2dyYW1JbmZvTG9nIiwidXNlUHJvZ3JhbSIsImF0dHJpYktleSIsImhhc093blByb3BlcnR5IiwiYXR0cmliTG9jYXRpb24iLCJnZXRBdHRyaWJMb2NhdGlvbiIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidW5pZm9ybUtleSIsImdldFVuaWZvcm1Mb2NhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QUFKLENBQVUsS0FBS3hDLEVBQUwsQ0FBUXFNLGlCQUFSLENBQTBCLEtBQUtMLE9BQS9CLENBQVYsQ0FBTjtBQUNEO0FBQ0Y7OztzQ0FFa0I7QUFDakIsV0FBS2hNLEVBQUwsQ0FBUXNNLFVBQVIsQ0FBbUIsS0FBS04sT0FBeEIsRUFEaUIsQ0FHakI7O0FBQ0EsV0FBSzNJLFdBQUwsR0FBbUIsRUFBbkI7O0FBRUEsV0FBSyxJQUFJa0osU0FBVCxJQUFzQixLQUFLdEIsWUFBM0IsRUFBeUM7QUFDdkMsWUFBSSxLQUFLQSxZQUFMLENBQWtCdUIsY0FBbEIsQ0FBaUNELFNBQWpDLENBQUosRUFBaUQ7QUFDL0MsY0FBSUUsY0FBYyxHQUFHLEtBQUt6TSxFQUFMLENBQVEwTSxpQkFBUixDQUEwQixLQUFLVixPQUEvQixFQUF3QyxLQUFLZixZQUFMLENBQWtCc0IsU0FBbEIsQ0FBeEMsQ0FBckI7QUFDQSxlQUFLbEosV0FBTCxDQUFpQmtKLFNBQWpCLElBQThCRSxjQUE5QjtBQUNBLGVBQUt6TSxFQUFMLENBQVEyTSx1QkFBUixDQUFnQ0YsY0FBaEM7QUFDRDtBQUNGOztBQUVELFdBQUssSUFBSUcsVUFBVCxJQUF1QixLQUFLMUIsVUFBNUIsRUFBd0M7QUFDdEMsWUFBSSxLQUFLQSxVQUFMLENBQWdCc0IsY0FBaEIsQ0FBK0JJLFVBQS9CLENBQUosRUFBZ0Q7QUFDOUMsZUFBS3ZKLFdBQUwsQ0FBaUJ1SixVQUFqQixJQUErQixLQUFLNU0sRUFBTCxDQUFRNk0sa0JBQVIsQ0FBMkIsS0FBS2IsT0FBaEMsRUFBeUMsS0FBS2QsVUFBTCxDQUFnQjBCLFVBQWhCLENBQXpDLENBQS9CO0FBQ0Q7QUFDRjtBQUNGOzs7Ozs7Ozs7Ozs7O0FDekdZLHk0Qjs7Ozs7OztBQ0FBLDRrQiIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjgwOWU5YjMxZDQxODhkYWQ1ZTYiLCJjb25zdCBnYW1lU3RhdGUgPSB7XG4gIGN1cnJlbnRQcmVzc2VkS2V5czogW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVN0YXRlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZVN0YXRlLmpzIiwiaW1wb3J0IFNjZW5lIGZyb20gJy4vU2NlbmUnXG5pbXBvcnQgQ3ViZSBmcm9tICcuL3NoYXBlcy9jdWJlJ1xuaW1wb3J0IFNoYWRlclByb2dyYW0gZnJvbSAnLi9zaGFkZXJzL1NoYWRlclByb2dyYW0nXG5pbXBvcnQgZ2FtZVN0YXRlIGZyb20gJy4vZ2FtZVN0YXRlJ1xuXG4vLyBFbnRyeSBmaWxlIGZvciBjb250YWN0IGdhbWVcblxuLyoqKioqIEdsb2JhbCBTdGF0ZXMgKioqKiovXG4vLyBHYW1lIGZyYW1lIHBlciBzZWNvbmRcbmNvbnN0IGZwcyA9IDYwXG5cbi8qKioqKiBHYW1lIGNsYXNzICoqKioqL1xuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yIChnYW1lT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZnBzLFxuICAgICAgY2FudmFzXG4gICAgfSA9IGdhbWVPcHRpb25zXG5cbiAgICB0aGlzLmZwcyA9IGZwc1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXG4gIH1cblxuICAvKioqIEdhbWUgbG9vcCAqKiovXG4gIHN0YXRpYyBsb29wIChnYW1lLCBjYikge1xuICAgIGNvbnN0IGR0ID0gMTAwMCAvIGdhbWUuZnBzXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICAgIEdhbWUubG9vcC5kdXJhdGlvbiA9IChHYW1lLmxvb3AuZHVyYXRpb24gfHwgMCkgKyBub3cgLSAoR2FtZS5sb29wLmxhc3RSdW4gfHwgbm93KVxuICAgIFxuICAgIHdoaWxlIChHYW1lLmxvb3AuZHVyYXRpb24gPj0gZHQpIHtcbiAgICAgIGNiKGR0KVxuICAgICAgR2FtZS5sb29wLmR1cmF0aW9uIC09IGR0XG4gICAgfVxuICAgIFxuICAgIEdhbWUubG9vcC5sYXN0UnVuID0gbm93XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBHYW1lLmxvb3AoZ2FtZSwgY2IpKVxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIC8vIEluaXQgdGhlIGdhbWVcbiAgICB0aGlzLmluaXQoKVxuXG4gICAgLy8gU3RhcnQgYW5pbWF0aW9uIGxvb3AgdG8gZHJhdyBnYW1lIGZyYW1lc1xuICAgIEdhbWUubG9vcCh0aGlzLCB0aGlzLnRpY2suYmluZCh0aGlzKSlcbiAgfVxuXG4gIHRpY2sgKGR0KSB7XG4gICAgLy8gQ2hlY2sgdXNlciBpbnRlcmFjdGlvbnNcbiAgICB0aGlzLmhhbmRsZUtleXMoZHQpXG5cbiAgICAvLyBVcGRhdGUgZ2FtZSBzdGF0ZXNcbiAgICB0aGlzLmFuaW1hdGUoZHQpXG5cbiAgICAvLyBEcmF3IGdhbWUgZnJhbWVcbiAgICB0aGlzLmRyYXcoZHQpXG4gIH1cblxuICAvKioqIEdhbWUgSW5pdCBQaGFzZSAqKiovXG4gIGluaXQgKCkge1xuICAgIC8vIERldGVjdCB3ZWJnbCBzdXBwb3J0XG4gICAgdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJylcbiAgXG4gICAgaWYgKCF0aGlzLmdsKSB7XG4gICAgICBhbGVydCgnd2ViZ2wgaXMgbm90IHN1cHBvcnRlZCcpXG4gICAgICB0aGlzLmdsTm90U3VwcG9ydGVkID0gdHJ1ZVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gcmVzaXplIHRoZSBjYW52YXNcbiAgICB0aGlzLnJlc2l6ZUNhbnZhcyg1MDAsIDUwMClcbiAgICBcbiAgICAvLyBCaW5kIGtleWJvYXJkIGV2ZW50c1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWRvd24uYmluZCh0aGlzKSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5dXAuYmluZCh0aGlzKSlcblxuICAgIC8vIEluaXQgc2hhZGVyc1xuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IG5ldyBTaGFkZXJQcm9ncmFtKHtcbiAgICAgIGdsOiB0aGlzLmdsXG4gICAgfSlcblxuICAgIC8vIEluaXQgc2NlbmVcbiAgICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKHtcbiAgICAgIGdhbWU6IHRoaXNcbiAgICB9KVxuXG4gICAgLy8gVGhlIGluaXQgbG9naWMgZ29lcyBiZWxvd1xuICAgIGxldCBjdWJlID0gbmV3IEN1YmUoe1xuICAgICAgc2hhZGVyUHJvZ3JhbTogdGhpcy5zaGFkZXJQcm9ncmFtLFxuICAgICAgc2NlbmU6IHRoaXMuc2NlbmVcbiAgICB9KVxuXG4gICAgdGhpcy5zY2VuZS5hZGRNb2RlbChjdWJlKVxuICB9XG5cbiAgaGFuZGxlS2V5ZG93biAoZSkge1xuICAgIGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbZS5rZXlDb2RlXSA9IHRydWVcbiAgfVxuXG4gIGhhbmRsZUtleXVwIChlKSB7XG4gICAgZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1tlLmtleUNvZGVdID0gZmFsc2VcbiAgfVxuXG4gIHJlc2l6ZUNhbnZhcyAod2lkdGgsIGhlaWdodCkge1xuICAgIGlmICh0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCAhPT0gd2lkdGggfHwgdGhpcy5jYW52YXMub2Zmc2V0SGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLm9mZnNldFdpZHRoID0gd2lkdGggKyAncHgnXG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5vZmZzZXRIZWlnaHQgPSBoZWlnaHQgKyAncHgnXG4gICAgfVxuICAgIFxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcbiAgfVxuXG4gIC8qKiogR2FtZSBEcmF3IFBoYXNlICoqKi9cbiAgaGFuZGxlS2V5cyAoZHQpIHtcbiAgICB0aGlzLnNjZW5lLmhhbmRsZUtleXMoZHQpXG4gIH1cblxuICBhbmltYXRlIChkdCkge1xuICAgIHRoaXMuc2NlbmUuYW5pbWF0ZShkdClcbiAgfVxuXG4gIGRyYXcgKGR0KSB7XG4gICAgaWYgKHRoaXMuZ2xOb3RTdXBwb3J0ZWQpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICBjb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnXG4gICAgICBjb250ZXh0LmZpbGxUZXh0KCdXZWJHTCBpcyBub3Qgc3VwcG9ydGVkIDooJywgdGhpcy5jYW52YXMud2lkdGggLyAyLCB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMClcbiAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpXG4gICAgdGhpcy5zY2VuZS5kcmF3KGR0KVxuICB9XG59XG5cbi8vIENyZWF0ZSBnYW1lIGluc3RhbmNlXG5jb25zdCBjb250YWN0R2FtZSA9IG5ldyBHYW1lKHtcbiAgZnBzOiA2MCxcbiAgY2FudmFzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2UnKVxufSlcblxuLy8gU3RhcnQgZ2FtZVxuY29udGFjdEdhbWUuc3RhcnQoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRhY3QuanMiLCIvKioqKiogU2NlbmUgY2xhc3MgKioqKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZSB7XG4gIGNvbnN0cnVjdG9yIChzY2VuZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGdhbWVcbiAgICB9ID0gc2NlbmVPcHRpb25zXG5cbiAgICBpZiAoIWdhbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZ2FtZSBmb3IgdGhlIHNjZW5lJylcbiAgICB9XG4gICAgXG4gICAgdGhpcy5nbCA9IGdhbWUuZ2xcbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBnYW1lLnNoYWRlclByb2dyYW1cbiAgICB0aGlzLmNhbnZhcyA9IGdhbWUuY2FudmFzXG5cbiAgICAvLyBFYWNoIHNjZW5lIGhhcyBpdCdzIG93biBtb2RlbCB2aWV3IG1hdHJpeCBhbmQgcHJvamVjdCBtYXRyaXhcbiAgICB0aGlzLm1vZGVsVmlld01hdHJpeFN0YWNrID0gW11cbiAgICB0aGlzLm1vZGVsVmlld01hdHJpeCA9IG1hdDQuY3JlYXRlKClcbiAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG5cbiAgICB0aGlzLm1vZGVscyA9IFtdXG4gIH1cblxuICBhZGRNb2RlbCAobW9kZWwpIHtcbiAgICB0aGlzLm1vZGVscy5wdXNoKG1vZGVsKVxuICB9XG5cbiAgbW9kZWxWaWV3UHVzaE1hdHJpeCAoKSB7XG4gICAgbGV0IGNvcHkgPSBtYXQ0LmNyZWF0ZSgpXG4gICAgbWF0NC5jb3B5KGNvcHksIHRoaXMubW9kZWxWaWV3TWF0cml4KVxuICAgIHRoaXMubW9kZWxWaWV3TWF0cml4U3RhY2sucHVzaChjb3B5KVxuICB9XG5cbiAgbW9kZWxWaWV3UG9wTWF0cml4ICgpIHtcbiAgICBpZiAodGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRW1wdHkgbW9kZWwgdmlldyBtYXRyaXggc3RhY2snKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLm1vZGVsVmlld01hdHJpeCA9IHRoaXMubW9kZWxWaWV3TWF0cml4U3RhY2sucG9wKClcbiAgfVxuXG4gIHNldFVuaWZvcm1NYXRyaXggKCkge1xuICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAucHJvamVjdGlvbk1hdHJpeFVuaWZvcm0sIGZhbHNlLCB0aGlzLnByb2plY3Rpb25NYXRyaXgpXG4gICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5tb2RlbFZpZXdNYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5tb2RlbFZpZXdNYXRyaXgpXG4gIFxuICAgIC8vIEdldCB0aGUgcmlnaHQgbm9ybWFsIG1hdHJpeFxuICAgIGxldCBub3JtYWxNYXRyaXggPSBtYXQzLmNyZWF0ZSgpXG4gICAgbWF0My5ub3JtYWxGcm9tTWF0NChub3JtYWxNYXRyaXgsIHRoaXMubW9kZWxWaWV3TWF0cml4KVxuICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAubk1hdHJpeFVuaWZvcm0sIGZhbHNlLCBub3JtYWxNYXRyaXgpXG4gIH1cblxuICBoYW5kbGVLZXlzIChkdCkge1xuICAgIHRoaXMubW9kZWxzLmZvckVhY2gobW9kZWwgPT4gbW9kZWwuaGFuZGxlS2V5cyhkdCkpXG4gIH1cblxuICBhbmltYXRlIChkdCkge1xuICAgIHRoaXMubW9kZWxzLmZvckVhY2gobW9kZWwgPT4gbW9kZWwuYW5pbWF0ZShkdCkpXG4gIH1cblxuICBkcmF3IChkdCkge1xuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcbiAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVClcbiAgICBcbiAgICBtYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdGlvbk1hdHJpeCwgNDUsIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5jYW52YXMuaGVpZ2h0LCAwLjEsIDEwMClcbiAgICBtYXQ0LmlkZW50aXR5KHRoaXMubW9kZWxWaWV3TWF0cml4KVxuICAgIFxuICAgIHRoaXMubW9kZWxzLmZvckVhY2gobW9kZWwgPT4gbW9kZWwuZHJhdyhkdCkpXG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2NlbmUuanMiLCJpbXBvcnQgc2hhcGVVdGlsIGZyb20gJy4vc2hhcGVVdGlsJ1xuaW1wb3J0IGRlZmF1bHRUZXh0dXJlU3JjIGZyb20gJy4uL3RleHR1cmVzL2R1Y2sucG5nJ1xuaW1wb3J0IGdhbWVTdGF0ZSBmcm9tICcuLi9nYW1lU3RhdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIHNjZW5lLFxuICAgICAgc2hhZGVyUHJvZ3JhbSxcbiAgICAgIGlzQmxlbmQgPSBmYWxzZSxcbiAgICAgIGJsZW5kQWxwaGEgPSAwLjUsXG4gICAgICB0ZXh0dXJlU3JjID0gZGVmYXVsdFRleHR1cmVTcmMsXG4gICAgICB1c2VMaWdodCA9IHRydWUsXG4gICAgICBhbWJpZW50Q29sb3IgPSBbMC4yLCAwLjIsIDAuMl0sXG4gICAgICBkaXJlY3Rpb25hbENvbG9yID0gWzAuOCwgMC44LCAwLjhdLFxuICAgICAgbGlnaHRpbmdEaXJlY3Rpb24gPSBbMC4wLCAwLjAsIC0xLjBdLFxuICAgICAgeCA9IDAsXG4gICAgICB5ID0gMCxcbiAgICAgIHogPSAtNSxcbiAgICAgIHNwZWVkWCA9IDAsXG4gICAgICBzcGVlZFkgPSAwLFxuICAgICAgc3BlZWRaID0gMCxcbiAgICAgIHJvdGF0ZVNwZWVkWCA9IDAsXG4gICAgICByb3RhdGVTcGVlZFkgPSAwLFxuICAgICAgcm90YXRlU3BlZWRaID0gMCxcbiAgICAgIHJvdGF0ZVggPSAwLFxuICAgICAgcm90YXRlWSA9IDAsXG4gICAgICByb3RhdGVaID0gMFxuICAgIH0gPSBvcHRpb25zXG5cbiAgICBpZiAoIXNoYWRlclByb2dyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2hhZGVyIHByb2dyYW0gcHJvdmlkZWQhJylcbiAgICB9XG5cbiAgICBpZiAoIXNjZW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNjZW5lIGZvciB0aGlzIHNoYXBlJywgdGhpcylcbiAgICB9XG5cbiAgICB0aGlzLmdsID0gc2hhZGVyUHJvZ3JhbS5nbFxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHNoYWRlclByb2dyYW1cbiAgICB0aGlzLnNjZW5lID0gc2NlbmVcbiAgICB0aGlzLmlzQmxlbmQgPSBpc0JsZW5kXG4gICAgdGhpcy5ibGVuZEFscGhhID0gYmxlbmRBbHBoYVxuICAgIHRoaXMudGV4dHVyZVNyYyA9IHRleHR1cmVTcmNcbiAgICB0aGlzLnVzZUxpZ2h0ID0gdXNlTGlnaHRcbiAgICB0aGlzLmFtYmllbnRDb2xvciA9IGFtYmllbnRDb2xvclxuICAgIHRoaXMuZGlyZWN0aW9uYWxDb2xvciA9IGRpcmVjdGlvbmFsQ29sb3JcbiAgICB0aGlzLmxpZ2h0aW5nRGlyZWN0aW9uID0gbGlnaHRpbmdEaXJlY3Rpb25cblxuICAgIC8vIG1vdmUgc3BlZWRzXG4gICAgdGhpcy5zcGVlZFggPSBzcGVlZFhcbiAgICB0aGlzLnNwZWVkWSA9IHNwZWVkWVxuICAgIHRoaXMuc3BlZWRaID0gc3BlZWRaXG5cbiAgICAvLyBwb3NpdGlvblxuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy56ID0gelxuXG4gICAgLy8gcm90YXRlIHNwZWVkc1xuICAgIHRoaXMucm90YXRlU3BlZWRYID0gcm90YXRlU3BlZWRYXG4gICAgdGhpcy5yb3RhdGVTcGVlZFkgPSByb3RhdGVTcGVlZFlcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWiA9IHJvdGF0ZVNwZWVkWlxuXG4gICAgLy8gcm90YXRlIHJhZGl1c1xuICAgIHRoaXMucm90YXRlWCA9IHJvdGF0ZVhcbiAgICB0aGlzLnJvdGF0ZVkgPSByb3RhdGVZXG4gICAgdGhpcy5yb3RhdGVaID0gcm90YXRlWlxuXG4gICAgLy8gdmVydGV4IGJ1ZmZlclxuICAgIHRoaXMuY3ViZUJ1ZmZlciA9IG51bGxcblxuICAgIC8vIG5vcm1hbCBidWZmZXJcbiAgICB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIgPSBudWxsXG5cbiAgICAvLyB0ZXh0dXJlIGJ1ZmZlclxuICAgIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciA9IG51bGxcblxuICAgIC8vIGluaXQgdGhlIGN1YmVcbiAgICB0aGlzLmluaXRCdWZmZXIoKVxuICAgIHRoaXMuaW5pdFRleHR1cmUoKVxuICB9XG5cbiAgaW5pdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5jdWJlQnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIFtcbiAgICAgIC8vIGZyb250XG4gICAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIDEuMCxcbiAgICAgIDEuMCwgLTEuMCwgMS4wLFxuICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gYmFja1xuICAgICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgICAgXG4gICAgICAvLyB0b3BcbiAgICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgXG4gICAgICAvLyBib3R0b21cbiAgICAgIC0xLjAsIC0xLjAsIDEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcblxuICAgICAgLy8gcmlnaHRcbiAgICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgMS4wLFxuXG4gICAgICAvLyBsZWZ0XG4gICAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAtMS4wLCAtMS4wLCAxLjBcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMyxcbiAgICAgIG51bUl0ZW1zOiAyNFxuICAgIH0pXG5cbiAgICB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgW1xuICAgICAgLy8gRnJvbnQgZmFjZVxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gQmFjayBmYWNlXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcblxuICAgICAgLy8gVG9wIGZhY2VcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG5cbiAgICAgIC8vIEJvdHRvbSBmYWNlXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcblxuICAgICAgLy8gUmlnaHQgZmFjZVxuICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsIDAuMCxcblxuICAgICAgLy8gTGVmdCBmYWNlXG4gICAgICAtMS4wLCAwLjAsIDAuMCxcbiAgICAgIC0xLjAsIDAuMCwgMC4wLFxuICAgICAgLTEuMCwgMC4wLCAwLjAsXG4gICAgICAtMS4wLCAwLjAsIDAuMFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAzLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBbXG4gICAgICAvLyBGcm9udCBmYWNlXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcblxuICAgICAgLy8gQmFjayBmYWNlXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcblxuICAgICAgLy8gVG9wIGZhY2VcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuXG4gICAgICAvLyBCb3R0b20gZmFjZVxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG5cbiAgICAgIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuXG4gICAgICAvLyBMZWZ0IGZhY2VcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAyLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIFtcbiAgICAgIDAsIDEsIDIsICAgICAgMCwgMiwgMywgICAgLy8gRnJvbnQgZmFjZVxuICAgICAgNCwgNSwgNiwgICAgICA0LCA2LCA3LCAgICAvLyBCYWNrIGZhY2VcbiAgICAgIDgsIDksIDEwLCAgICAgOCwgMTAsIDExLCAgLy8gVG9wIGZhY2VcbiAgICAgIDEyLCAxMywgMTQsICAgMTIsIDE0LCAxNSwgLy8gQm90dG9tIGZhY2VcbiAgICAgIDE2LCAxNywgMTgsICAgMTYsIDE4LCAxOSwgLy8gUmlnaHQgZmFjZVxuICAgICAgMjAsIDIxLCAyMiwgICAyMCwgMjIsIDIzICAvLyBMZWZ0IGZhY2VcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMSxcbiAgICAgIG51bUl0ZW1zOiAzNixcbiAgICAgIHZlcnREYXRhQ29uc3RydWN0b3I6IFVpbnQxNkFycmF5LFxuICAgICAgYmluZFRhcmdldDogdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUlxuICAgIH0pXG4gIH1cblxuICBpbml0VGV4dHVyZSAoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlVGV4dHVyZShpbWFnZSlcbiAgICB9XG5cbiAgICBpbWFnZS5zcmMgPSB0aGlzLnRleHR1cmVTcmNcbiAgfVxuXG4gIGNyZWF0ZVRleHR1cmUgKGltYWdlKSB7XG4gICAgdGhpcy5jdWJlVGV4dHVyZSA9IHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpXG4gICAgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSA9IGltYWdlXG4gICAgXG4gICAgLy8gQ29uZmlnIHRleHR1cmUgcmVsYXRlZCBsb2dpY1xuICAgIC8vIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIC8vIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuICAgIC8vIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UpXG4gICAgLy8gdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKVxuICAgIC8vIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVClcbiAgICAvLyB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRClcblxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UpXG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTkVBUkVTVClcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5ORUFSRVNUKVxuXG4gICAgLy8gSXQncyBhbHdheXMgZ29vZCB0byByZXNldCBhY3RpdmUgdGV4dHVyZSBmbGFnXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIG51bGwpXG4gIH1cblxuICBoYW5kbGVLZXlzIChkdCkge1xuICAgIC8vIENhbGN1bGF0ZSByb3RhdGlvbnNcbiAgICAvLyB1cFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM4XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWCA+IC01MCkge1xuICAgICAgdGhpcy5yb3RhdGVTcGVlZFggLT0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIGRvd25cbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s0MF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPCA1MCkge1xuICAgICAgdGhpcy5yb3RhdGVTcGVlZFggKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIGxlZnRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szN10gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPiAtNTApIHtcbiAgICAgIHRoaXMucm90YXRlU3BlZWRZIC09IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyB1cFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM5XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICB0aGlzLnJvdGF0ZVNwZWVkWSArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gem9vbSBvdXRcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s0OV0gJiYgdGhpcy56ID4gLTMwKSB7XG4gICAgICB0aGlzLnogLT0gMC4yXG4gICAgfVxuICAgIFxuICAgIC8vIHpvb20gaW5cbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1s1MF0gJiYgdGhpcy56IDwgLTEpIHtcbiAgICAgIHRoaXMueiArPSAwLjJcbiAgICB9XG4gIH1cblxuICBhbmltYXRlIChkdCkge1xuICAgIHRoaXMucm90YXRlWCArPSBzaGFwZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWCkgLyAxMDBcbiAgICB0aGlzLnJvdGF0ZVkgKz0gc2hhcGVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFkpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVaICs9IHNoYXBlVXRpbC5kZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRaKSAvIDEwMFxuICB9XG5cbiAgZHJhdyAoKSB7XG4gICAgLy8gQ2hlY2sgaWYgbmVlZCB0byBibGVuZFxuICAgIGlmICh0aGlzLmlzQmxlbmQpIHtcbiAgICAgIC8vIEFkZCBibGVuZGluZyBlZmZlY3QgdG8gc2ltdWxhdGUgdHJhbnNwYXJlbmN5XG4gICAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkUpO1xuICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcbiAgICAgIC8vIFBhc3MgYWxwaGEgdW5pZm9ybSB0byBzaGFkZXJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5pc0JsZW5kVW5pZm9ybSwgdHJ1ZSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuYWxwaGFVbmlmb3JtLCB0aGlzLmJsZW5kQWxwaGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVClcbiAgICAgIHRoaXMuZ2wuZGlzYWJsZSh0aGlzLmdsLkJMRU5EKVxuICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmlzQmxlbmRVbmlmb3JtLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gUGFzcyB2ZXJ0ZXggcG9zaXRpb24gaW50byBzaGFkZXJcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZUJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCB0aGlzLmN1YmVCdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgXG4gICAgLy8gUGFzcyB0ZXh0dXJlIGNvb3JkaW5hdGVzIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC50ZXh0dXJlQ29vcmRBdHRyaWJ1dGUsIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlci5pbmZvLml0ZW1TaXplLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMClcblxuICAgIC8vIEFjdGl2ZSB0ZXh0dXJlIHVzaW5nIHRoZSBmaXJzdCB0ZXh0dXJlIHVuaXRcbiAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMClcbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZSlcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuc2FtcGxlclVuaWZvcm0sIDApXG5cbiAgICAvLyBQYXNzIG5vcm1hbHMgaW50byBzaGFkZXJcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnZlcnRleE5vcm1hbEF0dHJpYnV0ZSwgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIEFkZCBsaWdodFxuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC51c2VMaWdodGluZ1VuaWZvcm0sIHRoaXMudXNlTGlnaHQpXG4gICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmFtYmllbnRDb2xvclVuaWZvcm0sIHRoaXMuYW1iaWVudENvbG9yWzBdLCB0aGlzLmFtYmllbnRDb2xvclsxXSwgdGhpcy5hbWJpZW50Q29sb3JbMl0pXG4gICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMF0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclsxXSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzJdKVxuXG4gICAgbGV0IGFkanVzdGVkTGlnaHREaXJlY3Rpb24gPSB2ZWMzLmNyZWF0ZSgpXG4gICAgLy8gTm9ybWFsaXplIHNvIHRoYXQgdGhlIGRvdCBwcm9kdWN0IGlzIHRoZSBzYW1lIHRvIGNvc2luZVxuICAgIHZlYzMubm9ybWFsaXplKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIHRoaXMubGlnaHRpbmdEaXJlY3Rpb24pXG4gICAgLy8gUmV2ZXJzZSB0aGUgZGlyZWN0aW9uIHRvIGRlc2NyaWJlIGxpZ2h0IHNvdXJjZVxuICAgIHZlYzMuc2NhbGUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgLTEpXG4gICAgLy8gUGFzcyBsaWdodGluZyBkaXJlY3Rpb24gdW5pZm9ybSB0byBzaGFkZXJcbiAgICB0aGlzLmdsLnVuaWZvcm0zZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbilcblxuICAgIC8vIFRyYW5zZm9ybSBtb2RlbCB2aWV3IG1hdHJpeFxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UHVzaE1hdHJpeCgpXG4gICAgbWF0NC50cmFuc2xhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCBbdGhpcy54LCB0aGlzLnksIHRoaXMuel0pXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVgsIHNoYXBlVXRpbC54QXhpcylcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWSwgc2hhcGVVdGlsLnlBeGlzKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVaLCBzaGFwZVV0aWwuekF4aXMpXG4gICAgXG4gICAgLy8gUGFzcyB0aGUgbW9kZWwgdmlldyBtYXRyaXgsIHByb2plY3Rpb24gbWF0cml4IGFuZCBub3JtYWwgbWF0cml4IGludG8gc2hhZGVyXG4gICAgdGhpcy5zY2VuZS5zZXRVbmlmb3JtTWF0cml4KClcbiAgICBcbiAgICAvLyBkcmF3IHRoZSBjdWJlXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyKVxuICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuZ2wuVFJJQU5HTEVTLCB0aGlzLmN1YmVWZXJ0ZXhJbmRleEJ1ZmZlci5pbmZvLm51bUl0ZW1zLCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKVxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UG9wTWF0cml4KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXBlcy9jdWJlLmpzIiwiY29uc3Qgc2hhcGVVdGlsID0ge1xuICAvLyBTb21lIGNvbnN0YW50c1xuICB4QXhpczogWzEuMCwgMC4wLCAwLjBdLFxuICB5QXhpczogWzAuMCwgMS4wLCAwLjBdLFxuICB6QXhpczogWzAuMCwgMC4wLCAxLjBdLFxuXG4gIGNyZWF0ZUFycmF5QnVmZmVyOiAoZ2wsIHZlcnRzID0gW10sIHZlcnRzT3B0aW9uID0ge30pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB2ZXJ0RGF0YUNvbnN0cnVjdG9yID0gRmxvYXQzMkFycmF5LFxuICAgICAgYmluZFRhcmdldCA9IGdsLkFSUkFZX0JVRkZFUixcbiAgICAgIGl0ZW1TaXplID0gMSxcbiAgICAgIG51bUl0ZW1zID0gdmVydHMubGVuZ3RoXG4gICAgfSA9IHZlcnRzT3B0aW9uXG4gICAgXG4gICAgY29uc3QgY3ViZUJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgZ2wuYmluZEJ1ZmZlcihiaW5kVGFyZ2V0LCBjdWJlQnVmZmVyKVxuICAgIFxuICAgIGdsLmJ1ZmZlckRhdGEoYmluZFRhcmdldCwgbmV3IHZlcnREYXRhQ29uc3RydWN0b3IodmVydHMpLCBnbC5TVEFUSUNfRFJBVylcbiAgICBjdWJlQnVmZmVyLmluZm8gPSB7XG4gICAgICBpdGVtU2l6ZSxcbiAgICAgIG51bUl0ZW1zXG4gICAgfVxuICBcbiAgICByZXR1cm4gY3ViZUJ1ZmZlclxuICB9LFxuXG4gIGRlZ1RvUmFkOiAoZGVnKSA9PiB7XG4gICAgcmV0dXJuIGRlZyAvIDE4MCAqIE1hdGguUElcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzaGFwZVV0aWxcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcGVzL3NoYXBlVXRpbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjI1OTIyNzRhNzVlNmMzNDNlNmZlMDQ0ZTYzMmM0NjNjLnBuZ1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RleHR1cmVzL2R1Y2sucG5nXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IGRlZmF1bHRWZXJ0ZXhTaGFkZXJTb3VyY2UgZnJvbSAnLi92ZXJ0ZXhTaGFkZXInXG5pbXBvcnQgZGVmYXVsdEZyYWdtZW50U2hhZGVyU291cmNlIGZyb20gJy4vZnJhZ21lbnRTaGFkZXInXG5cbmNvbnN0IGRlZmF1bHRBdHRyaWJ1dGVNYXAgPSB7XG4gIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlOiAnYVZlcnRleFBvc2l0aW9uJyxcbiAgdGV4dHVyZUNvb3JkQXR0cmlidXRlOiAnYVRleHR1cmVDb29yZCcsXG4gIHZlcnRleE5vcm1hbEF0dHJpYnV0ZTogJ2FWZXJ0ZXhOb3JtYWwnXG59XG5cbmNvbnN0IGRlZmF1bHRVbmlmb3JtTWFwID0ge1xuICBwcm9qZWN0aW9uTWF0cml4VW5pZm9ybTogJ3VQcm9qZWN0aW9uTWF0cml4JyxcbiAgbW9kZWxWaWV3TWF0cml4VW5pZm9ybTogJ3VNb2RlbFZpZXdNYXRyaXgnLFxuICBzYW1wbGVyVW5pZm9ybTogJ3VTYW1wbGVyJyxcbiAgdXNlTGlnaHRpbmdVbmlmb3JtOiAndVVzZUxpZ2h0aW5nJyxcbiAgYW1iaWVudENvbG9yVW5pZm9ybTogJ3VBbWJpZW50Q29sb3InLFxuICBkaXJlY3Rpb25hbENvbG9yVW5pZm9ybTogJ3VEaXJlY3Rpb25hbENvbG9yJyxcbiAgbGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtOiAndUxpZ2h0aW5nRGlyZWN0aW9uJyxcbiAgbk1hdHJpeFVuaWZvcm06ICd1Tk1hdHJpeCcsXG4gIGlzQmxlbmRVbmlmb3JtOiAndWlzQmxlbmQnLFxuICBhbHBoYVVuaWZvcm06ICd1QWxwaGEnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRlclByb2dyYW0ge1xuICBjb25zdHJ1Y3RvciAoc2hhZGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZ2wsXG4gICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2UgPSBkZWZhdWx0VmVydGV4U2hhZGVyU291cmNlLFxuICAgICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBkZWZhdWx0RnJhZ21lbnRTaGFkZXJTb3VyY2UsXG4gICAgICBhdHRyaWJ1dGVNYXAgPSBkZWZhdWx0QXR0cmlidXRlTWFwLFxuICAgICAgdW5pZm9ybU1hcCA9IGRlZmF1bHRVbmlmb3JtTWFwXG4gICAgfSA9IHNoYWRlck9wdGlvbnNcblxuICAgIGlmICghZ2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gd2ViZ2wgY29udGV4dCBmb3Igc2hhZGVyIHByb2dyYW0nKVxuICAgIH1cblxuICAgIHRoaXMuZ2wgPSBnbFxuICAgIHRoaXMudmVydGV4U2hhZGVyU291cmNlID0gdmVydGV4U2hhZGVyU291cmNlXG4gICAgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSA9IGZyYWdtZW50U2hhZGVyU291cmNlXG4gICAgdGhpcy5hdHRyaWJ1dGVNYXAgPSBhdHRyaWJ1dGVNYXBcbiAgICB0aGlzLnVuaWZvcm1NYXAgPSB1bmlmb3JtTWFwXG5cbiAgICB0aGlzLmNyZWF0ZVByb2dyYW0oKVxuICAgIHRoaXMuaW5pdFZhcmlhYmxlTWFwKClcbiAgfVxuXG4gIGNyZWF0ZVNoYWRlciAoc2hhZGVyVHlwZSkge1xuICAgIGxldCBzaGFkZXJcbiAgXG4gICAgc3dpdGNoIChzaGFkZXJUeXBlKSB7XG4gICAgICBjYXNlICd2ZXJ0ZXgnOlxuICAgICAgICBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIpXG4gICAgICAgIHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIFxuICAgICAgY2FzZSAnZnJhZ21lbnQnOlxuICAgICAgICBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0aGlzLmdsLkZSQUdNRU5UX1NIQURFUilcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCB0aGlzLmZyYWdtZW50U2hhZGVyU291cmNlKVxuICAgICAgICBicmVha1xuICAgICAgICBcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzaGFkZXIgdHlwZSB0byBjcmVhdGU6ICR7dHlwZX1gKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxuICAgIFxuICAgIGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgLy8gVGhlIHNoYWRlciBpcyBub3QgY29ycmVjdGx5IGNvbXBpbGVkXG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzaGFkZXJcbiAgfVxuXG4gIGNyZWF0ZVByb2dyYW0gKCkge1xuICAgIHRoaXMucHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpXG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmNyZWF0ZVNoYWRlcigndmVydGV4JykpXG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmNyZWF0ZVNoYWRlcignZnJhZ21lbnQnKSlcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSlcbiAgICBcbiAgICBpZiAoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAvLyBUaGUgc2hhZGVyIHByb2dyYW0gaXMgbm90IGNvcnJlY3RseSBsaW5rZWRcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpXG4gICAgfVxuICB9XG5cbiAgaW5pdFZhcmlhYmxlTWFwICgpIHtcbiAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKVxuICBcbiAgICAvLyBQdXQgYWxsIGF0dGFjaGVkIGluZm9ybWF0aW9uIHRvIHNoYWRlciBwcm9ncmFtIG1ldGEgaW5mb3JtYXRpb25cbiAgICB0aGlzLnZhcmlhYmxlTWFwID0ge31cblxuICAgIGZvciAobGV0IGF0dHJpYktleSBpbiB0aGlzLmF0dHJpYnV0ZU1hcCkge1xuICAgICAgaWYgKHRoaXMuYXR0cmlidXRlTWFwLmhhc093blByb3BlcnR5KGF0dHJpYktleSkpIHtcbiAgICAgICAgbGV0IGF0dHJpYkxvY2F0aW9uID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIHRoaXMuYXR0cmlidXRlTWFwW2F0dHJpYktleV0pXG4gICAgICAgIHRoaXMudmFyaWFibGVNYXBbYXR0cmliS2V5XSA9IGF0dHJpYkxvY2F0aW9uXG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmliTG9jYXRpb24pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgdW5pZm9ybUtleSBpbiB0aGlzLnVuaWZvcm1NYXApIHtcbiAgICAgIGlmICh0aGlzLnVuaWZvcm1NYXAuaGFzT3duUHJvcGVydHkodW5pZm9ybUtleSkpIHtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcFt1bmlmb3JtS2V5XSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgdGhpcy51bmlmb3JtTWFwW3VuaWZvcm1LZXldKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFkZXJzL1NoYWRlclByb2dyYW0uanMiLCJleHBvcnQgZGVmYXVsdCBgXG5hdHRyaWJ1dGUgdmVjMyBhVmVydGV4UG9zaXRpb247XG5hdHRyaWJ1dGUgdmVjMyBhVmVydGV4Tm9ybWFsO1xuYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcblxudW5pZm9ybSBtYXQ0IHVQcm9qZWN0aW9uTWF0cml4O1xudW5pZm9ybSBtYXQ0IHVNb2RlbFZpZXdNYXRyaXg7XG51bmlmb3JtIG1hdDMgdU5NYXRyaXg7XG5cbnVuaWZvcm0gdmVjMyB1QW1iaWVudENvbG9yO1xuXG51bmlmb3JtIHZlYzMgdUxpZ2h0aW5nRGlyZWN0aW9uO1xudW5pZm9ybSB2ZWMzIHVEaXJlY3Rpb25hbENvbG9yO1xuXG51bmlmb3JtIGJvb2wgdVVzZUxpZ2h0aW5nO1xuXG52YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcbnZhcnlpbmcgdmVjMyB2TGlnaHRXZWlnaHRpbmc7XG5cbnZvaWQgbWFpbiAodm9pZCkge1xuICBnbF9Qb3NpdGlvbiA9IHVQcm9qZWN0aW9uTWF0cml4ICogdU1vZGVsVmlld01hdHJpeCAqIHZlYzQoYVZlcnRleFBvc2l0aW9uLCAxLjApO1xuICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcblxuICBpZiAodVVzZUxpZ2h0aW5nKSB7XG4gICAgdkxpZ2h0V2VpZ2h0aW5nID0gdmVjMygxLjAsIDEuMCwgMS4wKTtcbiAgfSBlbHNlIHtcbiAgICB2ZWMzIHRyYW5zZm9ybWVkTm9ybWFsID0gdU5NYXRyaXggKiBhVmVydGV4Tm9ybWFsO1xuICAgIGZsb2F0IGRpcmVjdGlvbmFsTGlnaHRXZWlnaHRpbmcgPSBtYXgoMC4wLCBkb3QodHJhbnNmb3JtZWROb3JtYWwsIHVMaWdodGluZ0RpcmVjdGlvbikpO1xuICAgIHZMaWdodFdlaWdodGluZyA9IHVBbWJpZW50Q29sb3IgKyB1RGlyZWN0aW9uYWxDb2xvciAqIGRpcmVjdGlvbmFsTGlnaHRXZWlnaHRpbmc7XG4gIH1cbn1cbmBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFkZXJzL3ZlcnRleFNoYWRlci5qcyIsImV4cG9ydCBkZWZhdWx0IGBcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xudmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG52YXJ5aW5nIHZlYzMgdkxpZ2h0V2VpZ2h0aW5nO1xuXG51bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcbnVuaWZvcm0gYm9vbCB1aXNCbGVuZDtcbnVuaWZvcm0gZmxvYXQgdUFscGhhO1xuXG52b2lkIG1haW4odm9pZCkge1xuICB2ZWM0IHRleHR1cmVDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnMsIHZUZXh0dXJlQ29vcmQudCkpO1xuICAvLyBBZGp1c3QgdGV4dHVyZUNvbG9yIHJnYiB2YWx1ZSBieSBsaWdodCB3ZWlnaHRcbiAgaWYgKHVpc0JsZW5kKSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXh0dXJlQ29sb3IucmdiICogdkxpZ2h0V2VpZ2h0aW5nLCB0ZXh0dXJlQ29sb3IuYSAqIHVBbHBoYSk7XG4gIH0gZWxzZSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXh0dXJlQ29sb3IucmdiICogdkxpZ2h0V2VpZ2h0aW5nLCB0ZXh0dXJlQ29sb3IuYSk7XG4gIH1cbn1cbmBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhZGVycy9mcmFnbWVudFNoYWRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=