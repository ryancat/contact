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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NTNhNDI0ZGMyOTQ2MGMwYjgxNyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZVN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9TY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGVzL2N1YmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXBlcy9zaGFwZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHR1cmVzL2R1Y2sucG5nIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL1NoYWRlclByb2dyYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL2ZyYWdtZW50U2hhZGVyLmpzIl0sIm5hbWVzIjpbImdhbWVTdGF0ZSIsImN1cnJlbnRQcmVzc2VkS2V5cyIsImZwcyIsIkdhbWUiLCJnYW1lT3B0aW9ucyIsImNhbnZhcyIsImluaXQiLCJsb29wIiwidGljayIsImJpbmQiLCJkdCIsImhhbmRsZUtleXMiLCJhbmltYXRlIiwiZHJhdyIsImdsIiwiZ2V0Q29udGV4dCIsImFsZXJ0IiwiZ2xOb3RTdXBwb3J0ZWQiLCJyZXNpemVDYW52YXMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVLZXlkb3duIiwiaGFuZGxlS2V5dXAiLCJzaGFkZXJQcm9ncmFtIiwic2NlbmUiLCJnYW1lIiwiY3ViZSIsImFkZE1vZGVsIiwiZSIsImtleUNvZGUiLCJ3aWR0aCIsImhlaWdodCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJjb250ZXh0IiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwiZmlsbFRleHQiLCJjbGVhckNvbG9yIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImNiIiwibm93IiwiRGF0ZSIsImR1cmF0aW9uIiwibGFzdFJ1biIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNvbnRhY3RHYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydCIsIlNjZW5lIiwic2NlbmVPcHRpb25zIiwiRXJyb3IiLCJtb2RlbFZpZXdNYXRyaXhTdGFjayIsIm1vZGVsVmlld01hdHJpeCIsIm1hdDQiLCJjcmVhdGUiLCJwcm9qZWN0aW9uTWF0cml4IiwibW9kZWxzIiwibW9kZWwiLCJwdXNoIiwiY29weSIsImxlbmd0aCIsInBvcCIsInVuaWZvcm1NYXRyaXg0ZnYiLCJ2YXJpYWJsZU1hcCIsInByb2plY3Rpb25NYXRyaXhVbmlmb3JtIiwibW9kZWxWaWV3TWF0cml4VW5pZm9ybSIsIm5vcm1hbE1hdHJpeCIsIm1hdDMiLCJub3JtYWxGcm9tTWF0NCIsInVuaWZvcm1NYXRyaXgzZnYiLCJuTWF0cml4VW5pZm9ybSIsImZvckVhY2giLCJ2aWV3cG9ydCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJwZXJzcGVjdGl2ZSIsImlkZW50aXR5IiwiQ3ViZSIsIm9wdGlvbnMiLCJpc0JsZW5kIiwiYmxlbmRBbHBoYSIsInRleHR1cmVTcmMiLCJ1c2VMaWdodCIsImFtYmllbnRDb2xvciIsImRpcmVjdGlvbmFsQ29sb3IiLCJsaWdodGluZ0RpcmVjdGlvbiIsIngiLCJ5IiwieiIsInNwZWVkWCIsInNwZWVkWSIsInNwZWVkWiIsInJvdGF0ZVNwZWVkWCIsInJvdGF0ZVNwZWVkWSIsInJvdGF0ZVNwZWVkWiIsInJvdGF0ZVgiLCJyb3RhdGVZIiwicm90YXRlWiIsImN1YmVCdWZmZXIiLCJjdWJlVmVydGV4Tm9ybWFsQnVmZmVyIiwiY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciIsImluaXRCdWZmZXIiLCJpbml0VGV4dHVyZSIsImNyZWF0ZUFycmF5QnVmZmVyIiwiaXRlbVNpemUiLCJudW1JdGVtcyIsImN1YmVWZXJ0ZXhJbmRleEJ1ZmZlciIsInZlcnREYXRhQ29uc3RydWN0b3IiLCJVaW50MTZBcnJheSIsImJpbmRUYXJnZXQiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJjcmVhdGVUZXh0dXJlIiwic3JjIiwiY3ViZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJwaXhlbFN0b3JlaSIsIlVOUEFDS19GTElQX1lfV0VCR0wiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsImRlZ1RvUmFkIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FIiwiQkxFTkQiLCJkaXNhYmxlIiwidW5pZm9ybTFpIiwiaXNCbGVuZFVuaWZvcm0iLCJ1bmlmb3JtMWYiLCJhbHBoYVVuaWZvcm0iLCJiaW5kQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwidmVydGV4QXR0cmliUG9pbnRlciIsInZlcnRleFBvc2l0aW9uQXR0cmlidXRlIiwiaW5mbyIsIkZMT0FUIiwidGV4dHVyZUNvb3JkQXR0cmlidXRlIiwiYWN0aXZlVGV4dHVyZSIsIlRFWFRVUkUwIiwic2FtcGxlclVuaWZvcm0iLCJ2ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUiLCJ1c2VMaWdodGluZ1VuaWZvcm0iLCJ1bmlmb3JtM2YiLCJhbWJpZW50Q29sb3JVbmlmb3JtIiwiZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0iLCJhZGp1c3RlZExpZ2h0RGlyZWN0aW9uIiwidmVjMyIsIm5vcm1hbGl6ZSIsInNjYWxlIiwidW5pZm9ybTNmdiIsImxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSIsIm1vZGVsVmlld1B1c2hNYXRyaXgiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJzZXRVbmlmb3JtTWF0cml4IiwiZHJhd0VsZW1lbnRzIiwiVFJJQU5HTEVTIiwiVU5TSUdORURfU0hPUlQiLCJtb2RlbFZpZXdQb3BNYXRyaXgiLCJzaGFwZVV0aWwiLCJ2ZXJ0cyIsInZlcnRzT3B0aW9uIiwiRmxvYXQzMkFycmF5IiwiY3JlYXRlQnVmZmVyIiwiYnVmZmVyRGF0YSIsIlNUQVRJQ19EUkFXIiwiZGVnIiwiTWF0aCIsIlBJIiwiZGVmYXVsdEF0dHJpYnV0ZU1hcCIsImRlZmF1bHRVbmlmb3JtTWFwIiwiU2hhZGVyUHJvZ3JhbSIsInNoYWRlck9wdGlvbnMiLCJ2ZXJ0ZXhTaGFkZXJTb3VyY2UiLCJmcmFnbWVudFNoYWRlclNvdXJjZSIsImF0dHJpYnV0ZU1hcCIsInVuaWZvcm1NYXAiLCJjcmVhdGVQcm9ncmFtIiwiaW5pdFZhcmlhYmxlTWFwIiwic2hhZGVyVHlwZSIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJGUkFHTUVOVF9TSEFERVIiLCJ0eXBlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsInByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsImdldFByb2dyYW1JbmZvTG9nIiwidXNlUHJvZ3JhbSIsImF0dHJpYktleSIsImhhc093blByb3BlcnR5IiwiYXR0cmliTG9jYXRpb24iLCJnZXRBdHRyaWJMb2NhdGlvbiIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidW5pZm9ybUtleSIsImdldFVuaWZvcm1Mb2NhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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TSxJQUFJNUosS0FBSixDQUFVLEtBQUt4QyxFQUFMLENBQVFxTSxpQkFBUixDQUEwQixLQUFLTCxPQUEvQixDQUFWLENBQU47QUFDRDtBQUNGOzs7c0NBRWtCO0FBQ2pCLFdBQUtoTSxFQUFMLENBQVFzTSxVQUFSLENBQW1CLEtBQUtOLE9BQXhCLEVBRGlCLENBR2pCOztBQUNBLFdBQUszSSxXQUFMLEdBQW1CLEVBQW5COztBQUVBLFdBQUssSUFBSWtKLFNBQVQsSUFBc0IsS0FBS3RCLFlBQTNCLEVBQXlDO0FBQ3ZDLFlBQUksS0FBS0EsWUFBTCxDQUFrQnVCLGNBQWxCLENBQWlDRCxTQUFqQyxDQUFKLEVBQWlEO0FBQy9DLGNBQUlFLGNBQWMsR0FBRyxLQUFLek0sRUFBTCxDQUFRME0saUJBQVIsQ0FBMEIsS0FBS1YsT0FBL0IsRUFBd0MsS0FBS2YsWUFBTCxDQUFrQnNCLFNBQWxCLENBQXhDLENBQXJCO0FBQ0EsZUFBS2xKLFdBQUwsQ0FBaUJrSixTQUFqQixJQUE4QkUsY0FBOUI7QUFDQSxlQUFLek0sRUFBTCxDQUFRMk0sdUJBQVIsQ0FBZ0NGLGNBQWhDO0FBQ0Q7QUFDRjs7QUFFRCxXQUFLLElBQUlHLFVBQVQsSUFBdUIsS0FBSzFCLFVBQTVCLEVBQXdDO0FBQ3RDLFlBQUksS0FBS0EsVUFBTCxDQUFnQnNCLGNBQWhCLENBQStCSSxVQUEvQixDQUFKLEVBQWdEO0FBQzlDLGVBQUt2SixXQUFMLENBQWlCdUosVUFBakIsSUFBK0IsS0FBSzVNLEVBQUwsQ0FBUTZNLGtCQUFSLENBQTJCLEtBQUtiLE9BQWhDLEVBQXlDLEtBQUtkLFVBQUwsQ0FBZ0IwQixVQUFoQixDQUF6QyxDQUEvQjtBQUNEO0FBQ0Y7QUFDRjs7Ozs7Ozs7Ozs7OztBQ3pHWSx5NEI7Ozs7Ozs7QUNBQSw0a0IiLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQ1M2E0MjRkYzI5NDYwYzBiODE3IiwiY29uc3QgZ2FtZVN0YXRlID0ge1xuICBjdXJyZW50UHJlc3NlZEtleXM6IFtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVTdGF0ZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWVTdGF0ZS5qcyIsImltcG9ydCBTY2VuZSBmcm9tICcuL1NjZW5lJ1xuaW1wb3J0IEN1YmUgZnJvbSAnLi9zaGFwZXMvY3ViZSdcbmltcG9ydCBTaGFkZXJQcm9ncmFtIGZyb20gJy4vc2hhZGVycy9TaGFkZXJQcm9ncmFtJ1xuaW1wb3J0IGdhbWVTdGF0ZSBmcm9tICcuL2dhbWVTdGF0ZSdcblxuLy8gRW50cnkgZmlsZSBmb3IgY29udGFjdCBnYW1lXG5cbi8qKioqKiBHbG9iYWwgU3RhdGVzICoqKioqL1xuLy8gR2FtZSBmcmFtZSBwZXIgc2Vjb25kXG5jb25zdCBmcHMgPSA2MFxuXG4vKioqKiogR2FtZSBjbGFzcyAqKioqKi9cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvciAoZ2FtZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGZwcyxcbiAgICAgIGNhbnZhc1xuICAgIH0gPSBnYW1lT3B0aW9uc1xuXG4gICAgdGhpcy5mcHMgPSBmcHNcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICB9XG5cbiAgLyoqKiBHYW1lIGxvb3AgKioqL1xuICBzdGF0aWMgbG9vcCAoZ2FtZSwgY2IpIHtcbiAgICBjb25zdCBkdCA9IDEwMDAgLyBnYW1lLmZwc1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KClcbiAgICBHYW1lLmxvb3AuZHVyYXRpb24gPSAoR2FtZS5sb29wLmR1cmF0aW9uIHx8IDApICsgbm93IC0gKEdhbWUubG9vcC5sYXN0UnVuIHx8IG5vdylcbiAgICBcbiAgICB3aGlsZSAoR2FtZS5sb29wLmR1cmF0aW9uID49IGR0KSB7XG4gICAgICBjYihkdClcbiAgICAgIEdhbWUubG9vcC5kdXJhdGlvbiAtPSBkdFxuICAgIH1cbiAgICBcbiAgICBHYW1lLmxvb3AubGFzdFJ1biA9IG5vd1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gR2FtZS5sb29wKGdhbWUsIGNiKSlcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICAvLyBJbml0IHRoZSBnYW1lXG4gICAgdGhpcy5pbml0KClcblxuICAgIC8vIFN0YXJ0IGFuaW1hdGlvbiBsb29wIHRvIGRyYXcgZ2FtZSBmcmFtZXNcbiAgICBHYW1lLmxvb3AodGhpcywgdGhpcy50aWNrLmJpbmQodGhpcykpXG4gIH1cblxuICB0aWNrIChkdCkge1xuICAgIC8vIENoZWNrIHVzZXIgaW50ZXJhY3Rpb25zXG4gICAgdGhpcy5oYW5kbGVLZXlzKGR0KVxuXG4gICAgLy8gVXBkYXRlIGdhbWUgc3RhdGVzXG4gICAgdGhpcy5hbmltYXRlKGR0KVxuXG4gICAgLy8gRHJhdyBnYW1lIGZyYW1lXG4gICAgdGhpcy5kcmF3KGR0KVxuICB9XG5cbiAgLyoqKiBHYW1lIEluaXQgUGhhc2UgKioqL1xuICBpbml0ICgpIHtcbiAgICAvLyBEZXRlY3Qgd2ViZ2wgc3VwcG9ydFxuICAgIHRoaXMuZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpXG4gIFxuICAgIGlmICghdGhpcy5nbCkge1xuICAgICAgYWxlcnQoJ3dlYmdsIGlzIG5vdCBzdXBwb3J0ZWQnKVxuICAgICAgdGhpcy5nbE5vdFN1cHBvcnRlZCA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHJlc2l6ZSB0aGUgY2FudmFzXG4gICAgdGhpcy5yZXNpemVDYW52YXMoNTAwLCA1MDApXG4gICAgXG4gICAgLy8gQmluZCBrZXlib2FyZCBldmVudHNcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duLmJpbmQodGhpcykpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleXVwLmJpbmQodGhpcykpXG5cbiAgICAvLyBJbml0IHNoYWRlcnNcbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBuZXcgU2hhZGVyUHJvZ3JhbSh7XG4gICAgICBnbDogdGhpcy5nbFxuICAgIH0pXG5cbiAgICAvLyBJbml0IHNjZW5lXG4gICAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSh7XG4gICAgICBnYW1lOiB0aGlzXG4gICAgfSlcblxuICAgIC8vIFRoZSBpbml0IGxvZ2ljIGdvZXMgYmVsb3dcbiAgICBsZXQgY3ViZSA9IG5ldyBDdWJlKHtcbiAgICAgIHNoYWRlclByb2dyYW06IHRoaXMuc2hhZGVyUHJvZ3JhbSxcbiAgICAgIHNjZW5lOiB0aGlzLnNjZW5lXG4gICAgfSlcblxuICAgIHRoaXMuc2NlbmUuYWRkTW9kZWwoY3ViZSlcbiAgfVxuXG4gIGhhbmRsZUtleWRvd24gKGUpIHtcbiAgICBnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzW2Uua2V5Q29kZV0gPSB0cnVlXG4gIH1cblxuICBoYW5kbGVLZXl1cCAoZSkge1xuICAgIGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbZS5rZXlDb2RlXSA9IGZhbHNlXG4gIH1cblxuICByZXNpemVDYW52YXMgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBpZiAodGhpcy5jYW52YXMub2Zmc2V0V2lkdGggIT09IHdpZHRoIHx8IHRoaXMuY2FudmFzLm9mZnNldEhlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5vZmZzZXRXaWR0aCA9IHdpZHRoICsgJ3B4J1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUub2Zmc2V0SGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4J1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG4gIH1cblxuICAvKioqIEdhbWUgRHJhdyBQaGFzZSAqKiovXG4gIGhhbmRsZUtleXMgKGR0KSB7XG4gICAgdGhpcy5zY2VuZS5oYW5kbGVLZXlzKGR0KVxuICB9XG5cbiAgYW5pbWF0ZSAoZHQpIHtcbiAgICB0aGlzLnNjZW5lLmFuaW1hdGUoZHQpXG4gIH1cblxuICBkcmF3IChkdCkge1xuICAgIGlmICh0aGlzLmdsTm90U3VwcG9ydGVkKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJ1xuICAgICAgY29udGV4dC5maWxsVGV4dCgnV2ViR0wgaXMgbm90IHN1cHBvcnRlZCA6KCcsIHRoaXMuY2FudmFzLndpZHRoIC8gMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC8gMilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApXG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKVxuICAgIHRoaXMuc2NlbmUuZHJhdyhkdClcbiAgfVxufVxuXG4vLyBDcmVhdGUgZ2FtZSBpbnN0YW5jZVxuY29uc3QgY29udGFjdEdhbWUgPSBuZXcgR2FtZSh7XG4gIGZwczogNjAsXG4gIGNhbnZhczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlJylcbn0pXG5cbi8vIFN0YXJ0IGdhbWVcbmNvbnRhY3RHYW1lLnN0YXJ0KClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWN0LmpzIiwiLyoqKioqIFNjZW5lIGNsYXNzICoqKioqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmUge1xuICBjb25zdHJ1Y3RvciAoc2NlbmVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBnYW1lXG4gICAgfSA9IHNjZW5lT3B0aW9uc1xuXG4gICAgaWYgKCFnYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhbWUgZm9yIHRoZSBzY2VuZScpXG4gICAgfVxuICAgIFxuICAgIHRoaXMuZ2wgPSBnYW1lLmdsXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gZ2FtZS5zaGFkZXJQcm9ncmFtXG4gICAgdGhpcy5jYW52YXMgPSBnYW1lLmNhbnZhc1xuXG4gICAgLy8gRWFjaCBzY2VuZSBoYXMgaXQncyBvd24gbW9kZWwgdmlldyBtYXRyaXggYW5kIHByb2plY3QgbWF0cml4XG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjayA9IFtdXG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG4gICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKVxuXG4gICAgdGhpcy5tb2RlbHMgPSBbXVxuICB9XG5cbiAgYWRkTW9kZWwgKG1vZGVsKSB7XG4gICAgdGhpcy5tb2RlbHMucHVzaChtb2RlbClcbiAgfVxuXG4gIG1vZGVsVmlld1B1c2hNYXRyaXggKCkge1xuICAgIGxldCBjb3B5ID0gbWF0NC5jcmVhdGUoKVxuICAgIG1hdDQuY29weShjb3B5LCB0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgICB0aGlzLm1vZGVsVmlld01hdHJpeFN0YWNrLnB1c2goY29weSlcbiAgfVxuXG4gIG1vZGVsVmlld1BvcE1hdHJpeCAoKSB7XG4gICAgaWYgKHRoaXMubW9kZWxWaWV3TWF0cml4U3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VtcHR5IG1vZGVsIHZpZXcgbWF0cml4IHN0YWNrJylcbiAgICB9XG4gICAgXG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXggPSB0aGlzLm1vZGVsVmlld01hdHJpeFN0YWNrLnBvcCgpXG4gIH1cblxuICBzZXRVbmlmb3JtTWF0cml4ICgpIHtcbiAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnByb2plY3Rpb25NYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5wcm9qZWN0aW9uTWF0cml4KVxuICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAubW9kZWxWaWV3TWF0cml4VW5pZm9ybSwgZmFsc2UsIHRoaXMubW9kZWxWaWV3TWF0cml4KVxuICBcbiAgICAvLyBHZXQgdGhlIHJpZ2h0IG5vcm1hbCBtYXRyaXhcbiAgICBsZXQgbm9ybWFsTWF0cml4ID0gbWF0My5jcmVhdGUoKVxuICAgIG1hdDMubm9ybWFsRnJvbU1hdDQobm9ybWFsTWF0cml4LCB0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLm5NYXRyaXhVbmlmb3JtLCBmYWxzZSwgbm9ybWFsTWF0cml4KVxuICB9XG5cbiAgaGFuZGxlS2V5cyAoZHQpIHtcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG1vZGVsID0+IG1vZGVsLmhhbmRsZUtleXMoZHQpKVxuICB9XG5cbiAgYW5pbWF0ZSAoZHQpIHtcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG1vZGVsID0+IG1vZGVsLmFuaW1hdGUoZHQpKVxuICB9XG5cbiAgZHJhdyAoZHQpIHtcbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpXG4gICAgXG4gICAgbWF0NC5wZXJzcGVjdGl2ZSh0aGlzLnByb2plY3Rpb25NYXRyaXgsIDQ1LCB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuY2FudmFzLmhlaWdodCwgMC4xLCAxMDApXG4gICAgbWF0NC5pZGVudGl0eSh0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgICBcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG1vZGVsID0+IG1vZGVsLmRyYXcoZHQpKVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NjZW5lLmpzIiwiaW1wb3J0IHNoYXBlVXRpbCBmcm9tICcuL3NoYXBlVXRpbCdcbmltcG9ydCBkZWZhdWx0VGV4dHVyZVNyYyBmcm9tICcuLi90ZXh0dXJlcy9kdWNrLnBuZydcbmltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi4vZ2FtZVN0YXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB7XG4gICAgICBzY2VuZSxcbiAgICAgIHNoYWRlclByb2dyYW0sXG4gICAgICBpc0JsZW5kID0gZmFsc2UsXG4gICAgICBibGVuZEFscGhhID0gMC41LFxuICAgICAgdGV4dHVyZVNyYyA9IGRlZmF1bHRUZXh0dXJlU3JjLFxuICAgICAgdXNlTGlnaHQgPSB0cnVlLFxuICAgICAgYW1iaWVudENvbG9yID0gWzAuMiwgMC4yLCAwLjJdLFxuICAgICAgZGlyZWN0aW9uYWxDb2xvciA9IFswLjgsIDAuOCwgMC44XSxcbiAgICAgIGxpZ2h0aW5nRGlyZWN0aW9uID0gWzAuMCwgMC4wLCAtMS4wXSxcbiAgICAgIHggPSAwLFxuICAgICAgeSA9IDAsXG4gICAgICB6ID0gLTUsXG4gICAgICBzcGVlZFggPSAwLFxuICAgICAgc3BlZWRZID0gMCxcbiAgICAgIHNwZWVkWiA9IDAsXG4gICAgICByb3RhdGVTcGVlZFggPSAwLFxuICAgICAgcm90YXRlU3BlZWRZID0gMCxcbiAgICAgIHJvdGF0ZVNwZWVkWiA9IDAsXG4gICAgICByb3RhdGVYID0gMCxcbiAgICAgIHJvdGF0ZVkgPSAwLFxuICAgICAgcm90YXRlWiA9IDBcbiAgICB9ID0gb3B0aW9uc1xuXG4gICAgaWYgKCFzaGFkZXJQcm9ncmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNoYWRlciBwcm9ncmFtIHByb3ZpZGVkIScpXG4gICAgfVxuXG4gICAgaWYgKCFzY2VuZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzY2VuZSBmb3IgdGhpcyBzaGFwZScsIHRoaXMpXG4gICAgfVxuXG4gICAgdGhpcy5nbCA9IHNoYWRlclByb2dyYW0uZ2xcbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBzaGFkZXJQcm9ncmFtXG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lXG4gICAgdGhpcy5pc0JsZW5kID0gaXNCbGVuZFxuICAgIHRoaXMuYmxlbmRBbHBoYSA9IGJsZW5kQWxwaGFcbiAgICB0aGlzLnRleHR1cmVTcmMgPSB0ZXh0dXJlU3JjXG4gICAgdGhpcy51c2VMaWdodCA9IHVzZUxpZ2h0XG4gICAgdGhpcy5hbWJpZW50Q29sb3IgPSBhbWJpZW50Q29sb3JcbiAgICB0aGlzLmRpcmVjdGlvbmFsQ29sb3IgPSBkaXJlY3Rpb25hbENvbG9yXG4gICAgdGhpcy5saWdodGluZ0RpcmVjdGlvbiA9IGxpZ2h0aW5nRGlyZWN0aW9uXG5cbiAgICAvLyBtb3ZlIHNwZWVkc1xuICAgIHRoaXMuc3BlZWRYID0gc3BlZWRYXG4gICAgdGhpcy5zcGVlZFkgPSBzcGVlZFlcbiAgICB0aGlzLnNwZWVkWiA9IHNwZWVkWlxuXG4gICAgLy8gcG9zaXRpb25cbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMueiA9IHpcblxuICAgIC8vIHJvdGF0ZSBzcGVlZHNcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWCA9IHJvdGF0ZVNwZWVkWFxuICAgIHRoaXMucm90YXRlU3BlZWRZID0gcm90YXRlU3BlZWRZXG4gICAgdGhpcy5yb3RhdGVTcGVlZFogPSByb3RhdGVTcGVlZFpcblxuICAgIC8vIHJvdGF0ZSByYWRpdXNcbiAgICB0aGlzLnJvdGF0ZVggPSByb3RhdGVYXG4gICAgdGhpcy5yb3RhdGVZID0gcm90YXRlWVxuICAgIHRoaXMucm90YXRlWiA9IHJvdGF0ZVpcblxuICAgIC8vIHZlcnRleCBidWZmZXJcbiAgICB0aGlzLmN1YmVCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBub3JtYWwgYnVmZmVyXG4gICAgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gdGV4dHVyZSBidWZmZXJcbiAgICB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBpbml0IHRoZSBjdWJlXG4gICAgdGhpcy5pbml0QnVmZmVyKClcbiAgICB0aGlzLmluaXRUZXh0dXJlKClcbiAgfVxuXG4gIGluaXRCdWZmZXIgKCkge1xuICAgIHRoaXMuY3ViZUJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBbXG4gICAgICAvLyBmcm9udFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAtMS4wLCAxLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcbiAgICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIGJhY2tcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAgIFxuICAgICAgLy8gdG9wXG4gICAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gYm90dG9tXG4gICAgICAtMS4wLCAtMS4wLCAxLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAxLjAsXG5cbiAgICAgIC8vIHJpZ2h0XG4gICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcblxuICAgICAgLy8gbGVmdFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAxLjAsIC0xLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgMS4wXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDMsXG4gICAgICBudW1JdGVtczogMjRcbiAgICB9KVxuXG4gICAgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIFtcbiAgICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIEJhY2sgZmFjZVxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG5cbiAgICAgIC8vIFRvcCBmYWNlXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuXG4gICAgICAvLyBCb3R0b20gZmFjZVxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG5cbiAgICAgIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG5cbiAgICAgIC8vIExlZnQgZmFjZVxuICAgICAgLTEuMCwgMC4wLCAwLjAsXG4gICAgICAtMS4wLCAwLjAsIDAuMCxcbiAgICAgIC0xLjAsIDAuMCwgMC4wLFxuICAgICAgLTEuMCwgMC4wLCAwLjBcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMyxcbiAgICAgIG51bUl0ZW1zOiAyNFxuICAgIH0pXG5cbiAgICB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgW1xuICAgICAgLy8gRnJvbnQgZmFjZVxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG5cbiAgICAgIC8vIEJhY2sgZmFjZVxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG5cbiAgICAgIC8vIFRvcCBmYWNlXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcblxuICAgICAgLy8gQm90dG9tIGZhY2VcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuXG4gICAgICAvLyBSaWdodCBmYWNlXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcblxuICAgICAgLy8gTGVmdCBmYWNlXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMixcbiAgICAgIG51bUl0ZW1zOiAyNFxuICAgIH0pXG5cbiAgICB0aGlzLmN1YmVWZXJ0ZXhJbmRleEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBbXG4gICAgICAwLCAxLCAyLCAgICAgIDAsIDIsIDMsICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDQsIDUsIDYsICAgICAgNCwgNiwgNywgICAgLy8gQmFjayBmYWNlXG4gICAgICA4LCA5LCAxMCwgICAgIDgsIDEwLCAxMSwgIC8vIFRvcCBmYWNlXG4gICAgICAxMiwgMTMsIDE0LCAgIDEyLCAxNCwgMTUsIC8vIEJvdHRvbSBmYWNlXG4gICAgICAxNiwgMTcsIDE4LCAgIDE2LCAxOCwgMTksIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDIwLCAyMSwgMjIsICAgMjAsIDIyLCAyMyAgLy8gTGVmdCBmYWNlXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDEsXG4gICAgICBudW1JdGVtczogMzYsXG4gICAgICB2ZXJ0RGF0YUNvbnN0cnVjdG9yOiBVaW50MTZBcnJheSxcbiAgICAgIGJpbmRUYXJnZXQ6IHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVJcbiAgICB9KVxuICB9XG5cbiAgaW5pdFRleHR1cmUgKCkge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKClcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZVRleHR1cmUoaW1hZ2UpXG4gICAgfVxuXG4gICAgaW1hZ2Uuc3JjID0gdGhpcy50ZXh0dXJlU3JjXG4gIH1cblxuICBjcmVhdGVUZXh0dXJlIChpbWFnZSkge1xuICAgIHRoaXMuY3ViZVRleHR1cmUgPSB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKVxuICAgIHRoaXMuY3ViZVRleHR1cmUuaW1hZ2UgPSBpbWFnZVxuICAgIFxuICAgIC8vIENvbmZpZyB0ZXh0dXJlIHJlbGF0ZWQgbG9naWNcbiAgICAvLyB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZSlcbiAgICAvLyB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbiAgICAvLyB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlLmltYWdlKVxuICAgIC8vIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLkxJTkVBUilcbiAgICAvLyB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpXG4gICAgLy8gdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLmdsLlRFWFRVUkVfMkQpXG5cbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZSlcbiAgICB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbiAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlLmltYWdlKVxuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLk5FQVJFU1QpXG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTkVBUkVTVClcblxuICAgIC8vIEl0J3MgYWx3YXlzIGdvb2QgdG8gcmVzZXQgYWN0aXZlIHRleHR1cmUgZmxhZ1xuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBudWxsKVxuICB9XG5cbiAgaGFuZGxlS2V5cyAoZHQpIHtcbiAgICAvLyBDYWxjdWxhdGUgcm90YXRpb25zXG4gICAgLy8gdXBcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szOF0gJiYgdGhpcy5yb3RhdGVTcGVlZFggPiAtNTApIHtcbiAgICAgIHRoaXMucm90YXRlU3BlZWRYIC09IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBkb3duXG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNDBdICYmIHRoaXMucm90YXRlU3BlZWRYIDwgNTApIHtcbiAgICAgIHRoaXMucm90YXRlU3BlZWRYICs9IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBsZWZ0XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbMzddICYmIHRoaXMucm90YXRlU3BlZWRZID4gLTUwKSB7XG4gICAgICB0aGlzLnJvdGF0ZVNwZWVkWSAtPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gdXBcbiAgICBpZiAoZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1szOV0gJiYgdGhpcy5yb3RhdGVTcGVlZFkgPCA1MCkge1xuICAgICAgdGhpcy5yb3RhdGVTcGVlZFkgKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIHpvb20gb3V0XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNDldICYmIHRoaXMueiA+IC0zMCkge1xuICAgICAgdGhpcy56IC09IDAuMlxuICAgIH1cbiAgICBcbiAgICAvLyB6b29tIGluXG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNTBdICYmIHRoaXMueiA8IC0xKSB7XG4gICAgICB0aGlzLnogKz0gMC4yXG4gICAgfVxuICB9XG5cbiAgYW5pbWF0ZSAoZHQpIHtcbiAgICB0aGlzLnJvdGF0ZVggKz0gc2hhcGVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFgpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVZICs9IHNoYXBlVXRpbC5kZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRZKSAvIDEwMFxuICAgIHRoaXMucm90YXRlWiArPSBzaGFwZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWikgLyAxMDBcbiAgfVxuXG4gIGRyYXcgKCkge1xuICAgIC8vIENoZWNrIGlmIG5lZWQgdG8gYmxlbmRcbiAgICBpZiAodGhpcy5pc0JsZW5kKSB7XG4gICAgICAvLyBBZGQgYmxlbmRpbmcgZWZmZWN0IHRvIHNpbXVsYXRlIHRyYW5zcGFyZW5jeVxuICAgICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FKTtcbiAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgICAgdGhpcy5nbC5kaXNhYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XG4gICAgICAvLyBQYXNzIGFscGhhIHVuaWZvcm0gdG8gc2hhZGVyXG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuaXNCbGVuZFVuaWZvcm0sIHRydWUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmFscGhhVW5pZm9ybSwgdGhpcy5ibGVuZEFscGhhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpXG4gICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5CTEVORClcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5pc0JsZW5kVW5pZm9ybSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIFBhc3MgdmVydGV4IHBvc2l0aW9uIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC52ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZSwgdGhpcy5jdWJlQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIFBhc3MgdGV4dHVyZSBjb29yZGluYXRlcyBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyKVxuICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAudGV4dHVyZUNvb3JkQXR0cmlidXRlLCB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG5cbiAgICAvLyBBY3RpdmUgdGV4dHVyZSB1c2luZyB0aGUgZmlyc3QgdGV4dHVyZSB1bml0XG4gICAgdGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTApXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnNhbXBsZXJVbmlmb3JtLCAwKVxuXG4gICAgLy8gUGFzcyBub3JtYWxzIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIpXG4gICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC52ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUsIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlci5pbmZvLml0ZW1TaXplLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgICBcbiAgICAvLyBBZGQgbGlnaHRcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAudXNlTGlnaHRpbmdVbmlmb3JtLCAhIXRoaXMudXNlTGlnaHQpXG4gICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmFtYmllbnRDb2xvclVuaWZvcm0sIHRoaXMuYW1iaWVudENvbG9yWzBdLCB0aGlzLmFtYmllbnRDb2xvclsxXSwgdGhpcy5hbWJpZW50Q29sb3JbMl0pXG4gICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMF0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclsxXSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzJdKVxuXG4gICAgbGV0IGFkanVzdGVkTGlnaHREaXJlY3Rpb24gPSB2ZWMzLmNyZWF0ZSgpXG4gICAgLy8gTm9ybWFsaXplIHNvIHRoYXQgdGhlIGRvdCBwcm9kdWN0IGlzIHRoZSBzYW1lIHRvIGNvc2luZVxuICAgIHZlYzMubm9ybWFsaXplKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIHRoaXMubGlnaHRpbmdEaXJlY3Rpb24pXG4gICAgLy8gUmV2ZXJzZSB0aGUgZGlyZWN0aW9uIHRvIGRlc2NyaWJlIGxpZ2h0IHNvdXJjZVxuICAgIHZlYzMuc2NhbGUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgLTEpXG4gICAgLy8gUGFzcyBsaWdodGluZyBkaXJlY3Rpb24gdW5pZm9ybSB0byBzaGFkZXJcbiAgICB0aGlzLmdsLnVuaWZvcm0zZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbilcblxuICAgIC8vIFRyYW5zZm9ybSBtb2RlbCB2aWV3IG1hdHJpeFxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UHVzaE1hdHJpeCgpXG4gICAgbWF0NC50cmFuc2xhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCBbdGhpcy54LCB0aGlzLnksIHRoaXMuel0pXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVgsIHNoYXBlVXRpbC54QXhpcylcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWSwgc2hhcGVVdGlsLnlBeGlzKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVaLCBzaGFwZVV0aWwuekF4aXMpXG4gICAgXG4gICAgLy8gUGFzcyB0aGUgbW9kZWwgdmlldyBtYXRyaXgsIHByb2plY3Rpb24gbWF0cml4IGFuZCBub3JtYWwgbWF0cml4IGludG8gc2hhZGVyXG4gICAgdGhpcy5zY2VuZS5zZXRVbmlmb3JtTWF0cml4KClcbiAgICBcbiAgICAvLyBkcmF3IHRoZSBjdWJlXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyKVxuICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuZ2wuVFJJQU5HTEVTLCB0aGlzLmN1YmVWZXJ0ZXhJbmRleEJ1ZmZlci5pbmZvLm51bUl0ZW1zLCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKVxuICAgIHRoaXMuc2NlbmUubW9kZWxWaWV3UG9wTWF0cml4KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXBlcy9jdWJlLmpzIiwiY29uc3Qgc2hhcGVVdGlsID0ge1xuICAvLyBTb21lIGNvbnN0YW50c1xuICB4QXhpczogWzEuMCwgMC4wLCAwLjBdLFxuICB5QXhpczogWzAuMCwgMS4wLCAwLjBdLFxuICB6QXhpczogWzAuMCwgMC4wLCAxLjBdLFxuXG4gIGNyZWF0ZUFycmF5QnVmZmVyOiAoZ2wsIHZlcnRzID0gW10sIHZlcnRzT3B0aW9uID0ge30pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB2ZXJ0RGF0YUNvbnN0cnVjdG9yID0gRmxvYXQzMkFycmF5LFxuICAgICAgYmluZFRhcmdldCA9IGdsLkFSUkFZX0JVRkZFUixcbiAgICAgIGl0ZW1TaXplID0gMSxcbiAgICAgIG51bUl0ZW1zID0gdmVydHMubGVuZ3RoXG4gICAgfSA9IHZlcnRzT3B0aW9uXG4gICAgXG4gICAgY29uc3QgY3ViZUJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgZ2wuYmluZEJ1ZmZlcihiaW5kVGFyZ2V0LCBjdWJlQnVmZmVyKVxuICAgIFxuICAgIGdsLmJ1ZmZlckRhdGEoYmluZFRhcmdldCwgbmV3IHZlcnREYXRhQ29uc3RydWN0b3IodmVydHMpLCBnbC5TVEFUSUNfRFJBVylcbiAgICBjdWJlQnVmZmVyLmluZm8gPSB7XG4gICAgICBpdGVtU2l6ZSxcbiAgICAgIG51bUl0ZW1zXG4gICAgfVxuICBcbiAgICByZXR1cm4gY3ViZUJ1ZmZlclxuICB9LFxuXG4gIGRlZ1RvUmFkOiAoZGVnKSA9PiB7XG4gICAgcmV0dXJuIGRlZyAvIDE4MCAqIE1hdGguUElcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzaGFwZVV0aWxcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcGVzL3NoYXBlVXRpbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjI1OTIyNzRhNzVlNmMzNDNlNmZlMDQ0ZTYzMmM0NjNjLnBuZ1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RleHR1cmVzL2R1Y2sucG5nXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IGRlZmF1bHRWZXJ0ZXhTaGFkZXJTb3VyY2UgZnJvbSAnLi92ZXJ0ZXhTaGFkZXInXG5pbXBvcnQgZGVmYXVsdEZyYWdtZW50U2hhZGVyU291cmNlIGZyb20gJy4vZnJhZ21lbnRTaGFkZXInXG5cbmNvbnN0IGRlZmF1bHRBdHRyaWJ1dGVNYXAgPSB7XG4gIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlOiAnYVZlcnRleFBvc2l0aW9uJyxcbiAgdGV4dHVyZUNvb3JkQXR0cmlidXRlOiAnYVRleHR1cmVDb29yZCcsXG4gIHZlcnRleE5vcm1hbEF0dHJpYnV0ZTogJ2FWZXJ0ZXhOb3JtYWwnXG59XG5cbmNvbnN0IGRlZmF1bHRVbmlmb3JtTWFwID0ge1xuICBwcm9qZWN0aW9uTWF0cml4VW5pZm9ybTogJ3VQcm9qZWN0aW9uTWF0cml4JyxcbiAgbW9kZWxWaWV3TWF0cml4VW5pZm9ybTogJ3VNb2RlbFZpZXdNYXRyaXgnLFxuICBzYW1wbGVyVW5pZm9ybTogJ3VTYW1wbGVyJyxcbiAgdXNlTGlnaHRpbmdVbmlmb3JtOiAndVVzZUxpZ2h0aW5nJyxcbiAgYW1iaWVudENvbG9yVW5pZm9ybTogJ3VBbWJpZW50Q29sb3InLFxuICBkaXJlY3Rpb25hbENvbG9yVW5pZm9ybTogJ3VEaXJlY3Rpb25hbENvbG9yJyxcbiAgbGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtOiAndUxpZ2h0aW5nRGlyZWN0aW9uJyxcbiAgbk1hdHJpeFVuaWZvcm06ICd1Tk1hdHJpeCcsXG4gIGlzQmxlbmRVbmlmb3JtOiAndUlzQmxlbmQnLFxuICBhbHBoYVVuaWZvcm06ICd1QWxwaGEnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRlclByb2dyYW0ge1xuICBjb25zdHJ1Y3RvciAoc2hhZGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZ2wsXG4gICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2UgPSBkZWZhdWx0VmVydGV4U2hhZGVyU291cmNlLFxuICAgICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBkZWZhdWx0RnJhZ21lbnRTaGFkZXJTb3VyY2UsXG4gICAgICBhdHRyaWJ1dGVNYXAgPSBkZWZhdWx0QXR0cmlidXRlTWFwLFxuICAgICAgdW5pZm9ybU1hcCA9IGRlZmF1bHRVbmlmb3JtTWFwXG4gICAgfSA9IHNoYWRlck9wdGlvbnNcblxuICAgIGlmICghZ2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gd2ViZ2wgY29udGV4dCBmb3Igc2hhZGVyIHByb2dyYW0nKVxuICAgIH1cblxuICAgIHRoaXMuZ2wgPSBnbFxuICAgIHRoaXMudmVydGV4U2hhZGVyU291cmNlID0gdmVydGV4U2hhZGVyU291cmNlXG4gICAgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSA9IGZyYWdtZW50U2hhZGVyU291cmNlXG4gICAgdGhpcy5hdHRyaWJ1dGVNYXAgPSBhdHRyaWJ1dGVNYXBcbiAgICB0aGlzLnVuaWZvcm1NYXAgPSB1bmlmb3JtTWFwXG5cbiAgICB0aGlzLmNyZWF0ZVByb2dyYW0oKVxuICAgIHRoaXMuaW5pdFZhcmlhYmxlTWFwKClcbiAgfVxuXG4gIGNyZWF0ZVNoYWRlciAoc2hhZGVyVHlwZSkge1xuICAgIGxldCBzaGFkZXJcbiAgXG4gICAgc3dpdGNoIChzaGFkZXJUeXBlKSB7XG4gICAgICBjYXNlICd2ZXJ0ZXgnOlxuICAgICAgICBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIpXG4gICAgICAgIHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIFxuICAgICAgY2FzZSAnZnJhZ21lbnQnOlxuICAgICAgICBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0aGlzLmdsLkZSQUdNRU5UX1NIQURFUilcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCB0aGlzLmZyYWdtZW50U2hhZGVyU291cmNlKVxuICAgICAgICBicmVha1xuICAgICAgICBcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzaGFkZXIgdHlwZSB0byBjcmVhdGU6ICR7dHlwZX1gKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxuICAgIFxuICAgIGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgLy8gVGhlIHNoYWRlciBpcyBub3QgY29ycmVjdGx5IGNvbXBpbGVkXG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzaGFkZXJcbiAgfVxuXG4gIGNyZWF0ZVByb2dyYW0gKCkge1xuICAgIHRoaXMucHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpXG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmNyZWF0ZVNoYWRlcigndmVydGV4JykpXG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmNyZWF0ZVNoYWRlcignZnJhZ21lbnQnKSlcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSlcbiAgICBcbiAgICBpZiAoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAvLyBUaGUgc2hhZGVyIHByb2dyYW0gaXMgbm90IGNvcnJlY3RseSBsaW5rZWRcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpXG4gICAgfVxuICB9XG5cbiAgaW5pdFZhcmlhYmxlTWFwICgpIHtcbiAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKVxuICBcbiAgICAvLyBQdXQgYWxsIGF0dGFjaGVkIGluZm9ybWF0aW9uIHRvIHNoYWRlciBwcm9ncmFtIG1ldGEgaW5mb3JtYXRpb25cbiAgICB0aGlzLnZhcmlhYmxlTWFwID0ge31cblxuICAgIGZvciAobGV0IGF0dHJpYktleSBpbiB0aGlzLmF0dHJpYnV0ZU1hcCkge1xuICAgICAgaWYgKHRoaXMuYXR0cmlidXRlTWFwLmhhc093blByb3BlcnR5KGF0dHJpYktleSkpIHtcbiAgICAgICAgbGV0IGF0dHJpYkxvY2F0aW9uID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIHRoaXMuYXR0cmlidXRlTWFwW2F0dHJpYktleV0pXG4gICAgICAgIHRoaXMudmFyaWFibGVNYXBbYXR0cmliS2V5XSA9IGF0dHJpYkxvY2F0aW9uXG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmliTG9jYXRpb24pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgdW5pZm9ybUtleSBpbiB0aGlzLnVuaWZvcm1NYXApIHtcbiAgICAgIGlmICh0aGlzLnVuaWZvcm1NYXAuaGFzT3duUHJvcGVydHkodW5pZm9ybUtleSkpIHtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcFt1bmlmb3JtS2V5XSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgdGhpcy51bmlmb3JtTWFwW3VuaWZvcm1LZXldKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFkZXJzL1NoYWRlclByb2dyYW0uanMiLCJleHBvcnQgZGVmYXVsdCBgXG5hdHRyaWJ1dGUgdmVjMyBhVmVydGV4UG9zaXRpb247XG5hdHRyaWJ1dGUgdmVjMyBhVmVydGV4Tm9ybWFsO1xuYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcblxudW5pZm9ybSBtYXQ0IHVQcm9qZWN0aW9uTWF0cml4O1xudW5pZm9ybSBtYXQ0IHVNb2RlbFZpZXdNYXRyaXg7XG51bmlmb3JtIG1hdDMgdU5NYXRyaXg7XG5cbnVuaWZvcm0gdmVjMyB1QW1iaWVudENvbG9yO1xuXG51bmlmb3JtIHZlYzMgdUxpZ2h0aW5nRGlyZWN0aW9uO1xudW5pZm9ybSB2ZWMzIHVEaXJlY3Rpb25hbENvbG9yO1xuXG51bmlmb3JtIGJvb2wgdVVzZUxpZ2h0aW5nO1xuXG52YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcbnZhcnlpbmcgdmVjMyB2TGlnaHRXZWlnaHRpbmc7XG5cbnZvaWQgbWFpbiAodm9pZCkge1xuICBnbF9Qb3NpdGlvbiA9IHVQcm9qZWN0aW9uTWF0cml4ICogdU1vZGVsVmlld01hdHJpeCAqIHZlYzQoYVZlcnRleFBvc2l0aW9uLCAxLjApO1xuICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcblxuICBpZiAodVVzZUxpZ2h0aW5nKSB7XG4gICAgdmVjMyB0cmFuc2Zvcm1lZE5vcm1hbCA9IHVOTWF0cml4ICogYVZlcnRleE5vcm1hbDtcbiAgICBmbG9hdCBkaXJlY3Rpb25hbExpZ2h0V2VpZ2h0aW5nID0gbWF4KDAuMCwgZG90KHRyYW5zZm9ybWVkTm9ybWFsLCB1TGlnaHRpbmdEaXJlY3Rpb24pKTtcbiAgICB2TGlnaHRXZWlnaHRpbmcgPSB1QW1iaWVudENvbG9yICsgdURpcmVjdGlvbmFsQ29sb3IgKiBkaXJlY3Rpb25hbExpZ2h0V2VpZ2h0aW5nO1xuICB9IGVsc2Uge1xuICAgIHZMaWdodFdlaWdodGluZyA9IHZlYzMoMS4wLCAxLjAsIDEuMCk7XG4gIH1cbn1cbmBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFkZXJzL3ZlcnRleFNoYWRlci5qcyIsImV4cG9ydCBkZWZhdWx0IGBcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xudmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG52YXJ5aW5nIHZlYzMgdkxpZ2h0V2VpZ2h0aW5nO1xuXG51bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcbnVuaWZvcm0gYm9vbCB1SXNCbGVuZDtcbnVuaWZvcm0gZmxvYXQgdUFscGhhO1xuXG52b2lkIG1haW4odm9pZCkge1xuICB2ZWM0IHRleHR1cmVDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnMsIHZUZXh0dXJlQ29vcmQudCkpO1xuICAvLyBBZGp1c3QgdGV4dHVyZUNvbG9yIHJnYiB2YWx1ZSBieSBsaWdodCB3ZWlnaHRcbiAgaWYgKHVJc0JsZW5kKSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXh0dXJlQ29sb3IucmdiICogdkxpZ2h0V2VpZ2h0aW5nLCB0ZXh0dXJlQ29sb3IuYSAqIHVBbHBoYSk7XG4gIH0gZWxzZSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXh0dXJlQ29sb3IucmdiICogdkxpZ2h0V2VpZ2h0aW5nLCB0ZXh0dXJlQ29sb3IuYSk7XG4gIH1cbn1cbmBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhZGVycy9mcmFnbWVudFNoYWRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=