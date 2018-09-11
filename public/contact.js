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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0MGQ2OTJkZWYzOTgxMTRjNjRjNCIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZVN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9TY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGVzL2N1YmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXBlcy9zaGFwZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHR1cmVzL2R1Y2sucG5nIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL1NoYWRlclByb2dyYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL2ZyYWdtZW50U2hhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFwZXMvc3BoZXJlLmpzIl0sIm5hbWVzIjpbImdhbWVTdGF0ZSIsImZwcyIsInVuaXZlcnNlQmxvY2tTaXplIiwidW5pdmVyc2VYQ291bnQiLCJ1bml2ZXJzZVlDb3VudCIsInVuaXZlcnNlWkNvdW50IiwibnVtT2ZTdGFycyIsInN0YXJMb2NhdGlvbk1hcCIsImN1cnJlbnRQcmVzc2VkS2V5cyIsIkdhbWUiLCJnYW1lT3B0aW9ucyIsImNhbnZhcyIsImluaXQiLCJsb29wIiwidGljayIsImJpbmQiLCJkdCIsImhhbmRsZUtleXMiLCJhbmltYXRlIiwiZHJhdyIsImdsIiwiZ2V0Q29udGV4dCIsImFsZXJ0IiwiZ2xOb3RTdXBwb3J0ZWQiLCJyZXNpemVDYW52YXMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVLZXlkb3duIiwiaGFuZGxlS2V5dXAiLCJzaGFkZXJQcm9ncmFtIiwic2NlbmUiLCJnYW1lIiwieGkiLCJ5aSIsInppIiwicmFkaXVzIiwiTWF0aCIsInJhbmRvbSIsIngwIiwieDEiLCJ4IiwieTAiLCJ5MSIsInkiLCJ6MCIsInoxIiwieiIsImFkZE1vZGVsIiwiZSIsImtleUNvZGUiLCJ3aWR0aCIsImhlaWdodCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJjb250ZXh0IiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwiZmlsbFRleHQiLCJjbGVhckNvbG9yIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImNiIiwibm93IiwiRGF0ZSIsImR1cmF0aW9uIiwibGFzdFJ1biIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNvbnRhY3RHYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydCIsIlNjZW5lIiwic2NlbmVPcHRpb25zIiwiRXJyb3IiLCJtb2RlbFZpZXdNYXRyaXhTdGFjayIsIm1vZGVsVmlld01hdHJpeCIsIm1hdDQiLCJjcmVhdGUiLCJwcm9qZWN0aW9uTWF0cml4IiwibW9kZWxzIiwibW9kZWwiLCJwdXNoIiwiY29weSIsImxlbmd0aCIsInBvcCIsInVuaWZvcm1NYXRyaXg0ZnYiLCJ2YXJpYWJsZU1hcCIsInByb2plY3Rpb25NYXRyaXhVbmlmb3JtIiwibW9kZWxWaWV3TWF0cml4VW5pZm9ybSIsIm5vcm1hbE1hdHJpeCIsIm1hdDMiLCJub3JtYWxGcm9tTWF0NCIsInVuaWZvcm1NYXRyaXgzZnYiLCJuTWF0cml4VW5pZm9ybSIsImZvckVhY2giLCJ2aWV3cG9ydCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJwZXJzcGVjdGl2ZSIsImlkZW50aXR5IiwiQ3ViZSIsIm9wdGlvbnMiLCJpc0JsZW5kIiwiYmxlbmRBbHBoYSIsInRleHR1cmVTcmMiLCJ1c2VMaWdodCIsImFtYmllbnRDb2xvciIsImRpcmVjdGlvbmFsQ29sb3IiLCJsaWdodGluZ0RpcmVjdGlvbiIsInNwZWVkWCIsInNwZWVkWSIsInNwZWVkWiIsInJvdGF0ZVNwZWVkWCIsInJvdGF0ZVNwZWVkWSIsInJvdGF0ZVNwZWVkWiIsInJvdGF0ZVgiLCJyb3RhdGVZIiwicm90YXRlWiIsImN1YmVCdWZmZXIiLCJjdWJlVmVydGV4Tm9ybWFsQnVmZmVyIiwiY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciIsImluaXRCdWZmZXIiLCJpbml0VGV4dHVyZSIsImNyZWF0ZUFycmF5QnVmZmVyIiwiaXRlbVNpemUiLCJudW1JdGVtcyIsImN1YmVWZXJ0ZXhJbmRleEJ1ZmZlciIsInZlcnREYXRhQ29uc3RydWN0b3IiLCJVaW50MTZBcnJheSIsImJpbmRUYXJnZXQiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJjcmVhdGVUZXh0dXJlIiwic3JjIiwiY3ViZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJwaXhlbFN0b3JlaSIsIlVOUEFDS19GTElQX1lfV0VCR0wiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsImRlZ1RvUmFkIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FIiwiQkxFTkQiLCJkaXNhYmxlIiwidW5pZm9ybTFpIiwiaXNCbGVuZFVuaWZvcm0iLCJ1bmlmb3JtMWYiLCJhbHBoYVVuaWZvcm0iLCJiaW5kQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwidmVydGV4QXR0cmliUG9pbnRlciIsInZlcnRleFBvc2l0aW9uQXR0cmlidXRlIiwiaW5mbyIsIkZMT0FUIiwidGV4dHVyZUNvb3JkQXR0cmlidXRlIiwiYWN0aXZlVGV4dHVyZSIsIlRFWFRVUkUwIiwic2FtcGxlclVuaWZvcm0iLCJ2ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUiLCJ1c2VMaWdodGluZ1VuaWZvcm0iLCJ1bmlmb3JtM2YiLCJhbWJpZW50Q29sb3JVbmlmb3JtIiwiZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0iLCJhZGp1c3RlZExpZ2h0RGlyZWN0aW9uIiwidmVjMyIsIm5vcm1hbGl6ZSIsInNjYWxlIiwidW5pZm9ybTNmdiIsImxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSIsIm1vZGVsVmlld1B1c2hNYXRyaXgiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJzZXRVbmlmb3JtTWF0cml4IiwiZHJhd0VsZW1lbnRzIiwiVFJJQU5HTEVTIiwiVU5TSUdORURfU0hPUlQiLCJtb2RlbFZpZXdQb3BNYXRyaXgiLCJzaGFwZVV0aWwiLCJ2ZXJ0cyIsInZlcnRzT3B0aW9uIiwiRmxvYXQzMkFycmF5IiwiY3JlYXRlQnVmZmVyIiwiYnVmZmVyRGF0YSIsIlNUQVRJQ19EUkFXIiwiZGVnIiwiUEkiLCJkZWZhdWx0QXR0cmlidXRlTWFwIiwiZGVmYXVsdFVuaWZvcm1NYXAiLCJTaGFkZXJQcm9ncmFtIiwic2hhZGVyT3B0aW9ucyIsInZlcnRleFNoYWRlclNvdXJjZSIsImZyYWdtZW50U2hhZGVyU291cmNlIiwiYXR0cmlidXRlTWFwIiwidW5pZm9ybU1hcCIsImNyZWF0ZVByb2dyYW0iLCJpbml0VmFyaWFibGVNYXAiLCJzaGFkZXJUeXBlIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsIkZSQUdNRU5UX1NIQURFUiIsInR5cGUiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwicHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiYXR0cmliS2V5IiwiaGFzT3duUHJvcGVydHkiLCJhdHRyaWJMb2NhdGlvbiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ1bmlmb3JtS2V5IiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwiU3BoZXJlIiwibGF0aXR1ZGVCYW5kcyIsImZsb29yIiwibG9uZ2l0dWRlQmFuZHMiLCJwb3NpdGlvbkJ1ZmZlciIsIm5vcm1hbEJ1ZmZlciIsInRleHR1cmVDb29yZEJ1ZmZlciIsInZlcnRleEluZGV4QnVmZmVyIiwidmVydGV4UG9zaXRpb25EYXRhIiwibm9ybWFsRGF0YSIsInRleHR1cmVDb29yZERhdGEiLCJsYXROdW1iZXIiLCJ0aGV0YSIsInNpblRoZXRhIiwic2luIiwiY29zVGhldGEiLCJjb3MiLCJsb25nTnVtYmVyIiwicGhpIiwic2luUGhpIiwiY29zUGhpIiwidSIsInYiLCJpbmRleERhdGEiLCJmaXJzdCIsInNlY29uZCIsIkxJTkVBUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQSxJQUFNQSxTQUFTLEdBQUc7QUFDaEI7QUFDQUMsS0FBRyxFQUFFLEVBRlc7QUFHaEJDLG1CQUFpQixFQUFFLEVBSEg7QUFJaEJDLGdCQUFjLEVBQUUsQ0FKQTtBQUtoQkMsZ0JBQWMsRUFBRSxDQUxBO0FBTWhC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c0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDBkNjkyZGVmMzk4MTE0YzY0YzQiLCJjb25zdCBnYW1lU3RhdGUgPSB7XG4gIC8vIEdhbWUgZnJhbWUgcGVyIHNlY29uZFxuICBmcHM6IDYwLFxuICB1bml2ZXJzZUJsb2NrU2l6ZTogMjAsXG4gIHVuaXZlcnNlWENvdW50OiAzLFxuICB1bml2ZXJzZVlDb3VudDogMyxcbiAgdW5pdmVyc2VaQ291bnQ6IDMsXG4gIG51bU9mU3RhcnM6IDksXG4gIHN0YXJMb2NhdGlvbk1hcDogW10sXG4gIGN1cnJlbnRQcmVzc2VkS2V5czogW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVN0YXRlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZVN0YXRlLmpzIiwiaW1wb3J0IFNjZW5lIGZyb20gJy4vU2NlbmUnXG5pbXBvcnQgQ3ViZSBmcm9tICcuL3NoYXBlcy9jdWJlJ1xuaW1wb3J0IFNwaGVyZSBmcm9tICcuL3NoYXBlcy9zcGhlcmUnXG5pbXBvcnQgU2hhZGVyUHJvZ3JhbSBmcm9tICcuL3NoYWRlcnMvU2hhZGVyUHJvZ3JhbSdcbmltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi9nYW1lU3RhdGUnXG5cbi8vIEVudHJ5IGZpbGUgZm9yIGNvbnRhY3QgZ2FtZVxuLyoqKioqIEdhbWUgY2xhc3MgKioqKiovXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IgKGdhbWVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBmcHMsXG4gICAgICBjYW52YXNcbiAgICB9ID0gZ2FtZU9wdGlvbnNcblxuICAgIHRoaXMuZnBzID0gZnBzXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgfVxuXG4gIC8qKiogR2FtZSBsb29wICoqKi9cbiAgc3RhdGljIGxvb3AgKGdhbWUsIGNiKSB7XG4gICAgY29uc3QgZHQgPSAxMDAwIC8gZ2FtZS5mcHNcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gICAgR2FtZS5sb29wLmR1cmF0aW9uID0gKEdhbWUubG9vcC5kdXJhdGlvbiB8fCAwKSArIG5vdyAtIChHYW1lLmxvb3AubGFzdFJ1biB8fCBub3cpXG4gICAgXG4gICAgd2hpbGUgKEdhbWUubG9vcC5kdXJhdGlvbiA+PSBkdCkge1xuICAgICAgY2IoZHQpXG4gICAgICBHYW1lLmxvb3AuZHVyYXRpb24gLT0gZHRcbiAgICB9XG4gICAgXG4gICAgR2FtZS5sb29wLmxhc3RSdW4gPSBub3dcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IEdhbWUubG9vcChnYW1lLCBjYikpXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgLy8gSW5pdCB0aGUgZ2FtZVxuICAgIHRoaXMuaW5pdCgpXG5cbiAgICAvLyBTdGFydCBhbmltYXRpb24gbG9vcCB0byBkcmF3IGdhbWUgZnJhbWVzXG4gICAgR2FtZS5sb29wKHRoaXMsIHRoaXMudGljay5iaW5kKHRoaXMpKVxuICB9XG5cbiAgdGljayAoZHQpIHtcbiAgICAvLyBDaGVjayB1c2VyIGludGVyYWN0aW9uc1xuICAgIHRoaXMuaGFuZGxlS2V5cyhkdClcblxuICAgIC8vIFVwZGF0ZSBnYW1lIHN0YXRlc1xuICAgIHRoaXMuYW5pbWF0ZShkdClcblxuICAgIC8vIERyYXcgZ2FtZSBmcmFtZVxuICAgIHRoaXMuZHJhdyhkdClcbiAgfVxuXG4gIC8qKiogR2FtZSBJbml0IFBoYXNlICoqKi9cbiAgaW5pdCAoKSB7XG4gICAgLy8gRGV0ZWN0IHdlYmdsIHN1cHBvcnRcbiAgICB0aGlzLmdsID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKVxuICBcbiAgICBpZiAoIXRoaXMuZ2wpIHtcbiAgICAgIGFsZXJ0KCd3ZWJnbCBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICAgIHRoaXMuZ2xOb3RTdXBwb3J0ZWQgPSB0cnVlXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyByZXNpemUgdGhlIGNhbnZhc1xuICAgIHRoaXMucmVzaXplQ2FudmFzKDUwMCwgNTAwKVxuICAgIFxuICAgIC8vIEJpbmQga2V5Ym9hcmQgZXZlbnRzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXl1cC5iaW5kKHRoaXMpKVxuXG4gICAgLy8gSW5pdCBzaGFkZXJzXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gbmV3IFNoYWRlclByb2dyYW0oe1xuICAgICAgZ2w6IHRoaXMuZ2xcbiAgICB9KVxuXG4gICAgLy8gSW5pdCBzY2VuZVxuICAgIHRoaXMuc2NlbmUgPSBuZXcgU2NlbmUoe1xuICAgICAgZ2FtZTogdGhpc1xuICAgIH0pXG5cbiAgICAvLyBUaGUgaW5pdCBsb2dpYyBnb2VzIGJlbG93XG4gICAgLy8gbGV0IGN1YmUgPSBuZXcgQ3ViZSh7XG4gICAgLy8gICBzaGFkZXJQcm9ncmFtOiB0aGlzLnNoYWRlclByb2dyYW0sXG4gICAgLy8gICBzY2VuZTogdGhpcy5zY2VuZVxuICAgIC8vIH0pXG5cbiAgICAvLyB0aGlzLnNjZW5lLmFkZE1vZGVsKGN1YmUpXG5cbiAgICBmb3IgKGxldCB4aSA9IDA7IHhpIDwgZ2FtZVN0YXRlLnVuaXZlcnNlWENvdW50OyB4aSsrKSB7XG4gICAgICBmb3IgKGxldCB5aSA9IDA7IHlpIDwgZ2FtZVN0YXRlLnVuaXZlcnNlWUNvdW50OyB5aSsrKSB7XG4gICAgICAgIGZvciAobGV0IHppID0gMDsgemkgPCBnYW1lU3RhdGUudW5pdmVyc2VaQ291bnQ7IHppKyspIHtcblxuICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiBnYW1lU3RhdGUudW5pdmVyc2VCbG9ja1NpemUgLyAyXG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgeDAgPSAoeGkgLSBnYW1lU3RhdGUudW5pdmVyc2VYQ291bnQgLyAyKSAqIGdhbWVTdGF0ZS51bml2ZXJzZUJsb2NrU2l6ZSArIHJhZGl1c1xuICAgICAgICAgIGNvbnN0IHgxID0gKHhpICsgMSAtIGdhbWVTdGF0ZS51bml2ZXJzZVhDb3VudCAvIDIpICogZ2FtZVN0YXRlLnVuaXZlcnNlQmxvY2tTaXplIC0gcmFkaXVzXG4gICAgICAgICAgY29uc3QgeCA9IHgwICsgKHgxIC0geDApICogTWF0aC5yYW5kb20oKVxuXG4gICAgICAgICAgY29uc3QgeTAgPSAoeWkgLSBnYW1lU3RhdGUudW5pdmVyc2VZQ291bnQgLyAyKSAqIGdhbWVTdGF0ZS51bml2ZXJzZUJsb2NrU2l6ZSArIHJhZGl1c1xuICAgICAgICAgIGNvbnN0IHkxID0gKHlpICsgMSAtIGdhbWVTdGF0ZS51bml2ZXJzZVlDb3VudCAvIDIpICogZ2FtZVN0YXRlLnVuaXZlcnNlQmxvY2tTaXplIC0gcmFkaXVzXG4gICAgICAgICAgY29uc3QgeSA9IHkwICsgKHkxIC0geTApICogTWF0aC5yYW5kb20oKVxuXG4gICAgICAgICAgY29uc3QgejAgPSAoemkgLSBnYW1lU3RhdGUudW5pdmVyc2VaQ291bnQgLyAyKSAqIGdhbWVTdGF0ZS51bml2ZXJzZUJsb2NrU2l6ZSArIHJhZGl1c1xuICAgICAgICAgIGNvbnN0IHoxID0gKHppICsgMSAtIGdhbWVTdGF0ZS51bml2ZXJzZVpDb3VudCAvIDIpICogZ2FtZVN0YXRlLnVuaXZlcnNlQmxvY2tTaXplIC0gcmFkaXVzXG4gICAgICAgICAgY29uc3QgeiA9IHowICsgKHoxIC0geDApICogTWF0aC5yYW5kb20oKVxuXG4gICAgICAgICAgdGhpcy5zY2VuZS5hZGRNb2RlbChuZXcgU3BoZXJlKHtcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW06IHRoaXMuc2hhZGVyUHJvZ3JhbSxcbiAgICAgICAgICAgIHNjZW5lOiB0aGlzLnNjZW5lLFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICB6LFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICAgfSkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVLZXlkb3duIChlKSB7XG4gICAgZ2FtZVN0YXRlLmN1cnJlbnRQcmVzc2VkS2V5c1tlLmtleUNvZGVdID0gdHJ1ZVxuICB9XG5cbiAgaGFuZGxlS2V5dXAgKGUpIHtcbiAgICBnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzW2Uua2V5Q29kZV0gPSBmYWxzZVxuICB9XG5cbiAgcmVzaXplQ2FudmFzICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKHRoaXMuY2FudmFzLm9mZnNldFdpZHRoICE9PSB3aWR0aCB8fCB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUub2Zmc2V0V2lkdGggPSB3aWR0aCArICdweCdcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLm9mZnNldEhlaWdodCA9IGhlaWdodCArICdweCdcbiAgICB9XG4gICAgXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodFxuICB9XG5cbiAgLyoqKiBHYW1lIERyYXcgUGhhc2UgKioqL1xuICBoYW5kbGVLZXlzIChkdCkge1xuICAgIHRoaXMuc2NlbmUuaGFuZGxlS2V5cyhkdClcbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgdGhpcy5zY2VuZS5hbmltYXRlKGR0KVxuICB9XG5cbiAgZHJhdyAoZHQpIHtcbiAgICBpZiAodGhpcy5nbE5vdFN1cHBvcnRlZCkge1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgIGNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSdcbiAgICAgIGNvbnRleHQuZmlsbFRleHQoJ1dlYkdMIGlzIG5vdCBzdXBwb3J0ZWQgOignLCB0aGlzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuY2FudmFzLmhlaWdodCAvIDIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKVxuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVClcbiAgICB0aGlzLnNjZW5lLmRyYXcoZHQpXG4gIH1cbn1cblxuLy8gQ3JlYXRlIGdhbWUgaW5zdGFuY2VcbmNvbnN0IGNvbnRhY3RHYW1lID0gbmV3IEdhbWUoe1xuICBmcHM6IGdhbWVTdGF0ZS5mcHMsXG4gIGNhbnZhczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlJylcbn0pXG5cbi8vIFN0YXJ0IGdhbWVcbmNvbnRhY3RHYW1lLnN0YXJ0KClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWN0LmpzIiwiLyoqKioqIFNjZW5lIGNsYXNzICoqKioqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmUge1xuICBjb25zdHJ1Y3RvciAoc2NlbmVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBnYW1lXG4gICAgfSA9IHNjZW5lT3B0aW9uc1xuXG4gICAgaWYgKCFnYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhbWUgZm9yIHRoZSBzY2VuZScpXG4gICAgfVxuICAgIFxuICAgIHRoaXMuZ2wgPSBnYW1lLmdsXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gZ2FtZS5zaGFkZXJQcm9ncmFtXG4gICAgdGhpcy5jYW52YXMgPSBnYW1lLmNhbnZhc1xuXG4gICAgLy8gRWFjaCBzY2VuZSBoYXMgaXQncyBvd24gbW9kZWwgdmlldyBtYXRyaXggYW5kIHByb2plY3QgbWF0cml4XG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXhTdGFjayA9IFtdXG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG4gICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKVxuXG4gICAgdGhpcy5tb2RlbHMgPSBbXVxuICB9XG5cbiAgYWRkTW9kZWwgKG1vZGVsKSB7XG4gICAgdGhpcy5tb2RlbHMucHVzaChtb2RlbClcbiAgfVxuXG4gIG1vZGVsVmlld1B1c2hNYXRyaXggKCkge1xuICAgIGxldCBjb3B5ID0gbWF0NC5jcmVhdGUoKVxuICAgIG1hdDQuY29weShjb3B5LCB0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgICB0aGlzLm1vZGVsVmlld01hdHJpeFN0YWNrLnB1c2goY29weSlcbiAgfVxuXG4gIG1vZGVsVmlld1BvcE1hdHJpeCAoKSB7XG4gICAgaWYgKHRoaXMubW9kZWxWaWV3TWF0cml4U3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VtcHR5IG1vZGVsIHZpZXcgbWF0cml4IHN0YWNrJylcbiAgICB9XG4gICAgXG4gICAgdGhpcy5tb2RlbFZpZXdNYXRyaXggPSB0aGlzLm1vZGVsVmlld01hdHJpeFN0YWNrLnBvcCgpXG4gIH1cblxuICBzZXRVbmlmb3JtTWF0cml4ICgpIHtcbiAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnByb2plY3Rpb25NYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5wcm9qZWN0aW9uTWF0cml4KVxuICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAubW9kZWxWaWV3TWF0cml4VW5pZm9ybSwgZmFsc2UsIHRoaXMubW9kZWxWaWV3TWF0cml4KVxuICBcbiAgICAvLyBHZXQgdGhlIHJpZ2h0IG5vcm1hbCBtYXRyaXhcbiAgICBsZXQgbm9ybWFsTWF0cml4ID0gbWF0My5jcmVhdGUoKVxuICAgIG1hdDMubm9ybWFsRnJvbU1hdDQobm9ybWFsTWF0cml4LCB0aGlzLm1vZGVsVmlld01hdHJpeClcbiAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLm5NYXRyaXhVbmlmb3JtLCBmYWxzZSwgbm9ybWFsTWF0cml4KVxuICB9XG5cbiAgaGFuZGxlS2V5cyAoZHQpIHtcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG1vZGVsID0+IG1vZGVsLmhhbmRsZUtleXMoZHQpKVxuICB9XG5cbiAgYW5pbWF0ZSAoZHQpIHtcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG1vZGVsID0+IG1vZGVsLmFuaW1hdGUoZHQpKVxuICB9XG5cbiAgZHJhdyAoZHQpIHtcbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpXG4gICAgXG4gICAgbWF0NC5wZXJzcGVjdGl2ZSh0aGlzLnByb2plY3Rpb25NYXRyaXgsIDEyMCwgdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLmNhbnZhcy5oZWlnaHQsIDAuMSwgNTAwKVxuICAgIG1hdDQuaWRlbnRpdHkodGhpcy5tb2RlbFZpZXdNYXRyaXgpXG4gICAgXG4gICAgdGhpcy5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiBtb2RlbC5kcmF3KGR0KSlcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsImltcG9ydCBzaGFwZVV0aWwgZnJvbSAnLi9zaGFwZVV0aWwnXG5pbXBvcnQgZGVmYXVsdFRleHR1cmVTcmMgZnJvbSAnLi4vdGV4dHVyZXMvZHVjay5wbmcnXG5pbXBvcnQgZ2FtZVN0YXRlIGZyb20gJy4uL2dhbWVTdGF0ZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViZSB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgc2NlbmUsXG4gICAgICBzaGFkZXJQcm9ncmFtLFxuICAgICAgaXNCbGVuZCA9IGZhbHNlLFxuICAgICAgYmxlbmRBbHBoYSA9IDAuNSxcbiAgICAgIHRleHR1cmVTcmMgPSBkZWZhdWx0VGV4dHVyZVNyYyxcbiAgICAgIHVzZUxpZ2h0ID0gdHJ1ZSxcbiAgICAgIGFtYmllbnRDb2xvciA9IFswLjIsIDAuMiwgMC4yXSxcbiAgICAgIGRpcmVjdGlvbmFsQ29sb3IgPSBbMC44LCAwLjgsIDAuOF0sXG4gICAgICBsaWdodGluZ0RpcmVjdGlvbiA9IFswLjAsIDAuMCwgLTEuMF0sXG4gICAgICB4ID0gMCxcbiAgICAgIHkgPSAwLFxuICAgICAgeiA9IC01LFxuICAgICAgc3BlZWRYID0gMCxcbiAgICAgIHNwZWVkWSA9IDAsXG4gICAgICBzcGVlZFogPSAwLFxuICAgICAgcm90YXRlU3BlZWRYID0gMCxcbiAgICAgIHJvdGF0ZVNwZWVkWSA9IDAsXG4gICAgICByb3RhdGVTcGVlZFogPSAwLFxuICAgICAgcm90YXRlWCA9IDAsXG4gICAgICByb3RhdGVZID0gMCxcbiAgICAgIHJvdGF0ZVogPSAwXG4gICAgfSA9IG9wdGlvbnNcblxuICAgIGlmICghc2hhZGVyUHJvZ3JhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzaGFkZXIgcHJvZ3JhbSBwcm92aWRlZCEnKVxuICAgIH1cblxuICAgIGlmICghc2NlbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2NlbmUgZm9yIHRoaXMgc2hhcGUnLCB0aGlzKVxuICAgIH1cblxuICAgIHRoaXMuZ2wgPSBzaGFkZXJQcm9ncmFtLmdsXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gc2hhZGVyUHJvZ3JhbVxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxuICAgIHRoaXMuaXNCbGVuZCA9IGlzQmxlbmRcbiAgICB0aGlzLmJsZW5kQWxwaGEgPSBibGVuZEFscGhhXG4gICAgdGhpcy50ZXh0dXJlU3JjID0gdGV4dHVyZVNyY1xuICAgIHRoaXMudXNlTGlnaHQgPSB1c2VMaWdodFxuICAgIHRoaXMuYW1iaWVudENvbG9yID0gYW1iaWVudENvbG9yXG4gICAgdGhpcy5kaXJlY3Rpb25hbENvbG9yID0gZGlyZWN0aW9uYWxDb2xvclxuICAgIHRoaXMubGlnaHRpbmdEaXJlY3Rpb24gPSBsaWdodGluZ0RpcmVjdGlvblxuXG4gICAgLy8gbW92ZSBzcGVlZHNcbiAgICB0aGlzLnNwZWVkWCA9IHNwZWVkWFxuICAgIHRoaXMuc3BlZWRZID0gc3BlZWRZXG4gICAgdGhpcy5zcGVlZFogPSBzcGVlZFpcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnogPSB6XG5cbiAgICAvLyByb3RhdGUgc3BlZWRzXG4gICAgdGhpcy5yb3RhdGVTcGVlZFggPSByb3RhdGVTcGVlZFhcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWSA9IHJvdGF0ZVNwZWVkWVxuICAgIHRoaXMucm90YXRlU3BlZWRaID0gcm90YXRlU3BlZWRaXG5cbiAgICAvLyByb3RhdGUgcmFkaXVzXG4gICAgdGhpcy5yb3RhdGVYID0gcm90YXRlWFxuICAgIHRoaXMucm90YXRlWSA9IHJvdGF0ZVlcbiAgICB0aGlzLnJvdGF0ZVogPSByb3RhdGVaXG5cbiAgICAvLyB2ZXJ0ZXggYnVmZmVyXG4gICAgdGhpcy5jdWJlQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gbm9ybWFsIGJ1ZmZlclxuICAgIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlciA9IG51bGxcblxuICAgIC8vIHRleHR1cmUgYnVmZmVyXG4gICAgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gaW5pdCB0aGUgY3ViZVxuICAgIHRoaXMuaW5pdEJ1ZmZlcigpXG4gICAgdGhpcy5pbml0VGV4dHVyZSgpXG4gIH1cblxuICBpbml0QnVmZmVyICgpIHtcbiAgICB0aGlzLmN1YmVCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgW1xuICAgICAgLy8gZnJvbnRcbiAgICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgMS4wLFxuICAgICAgMS4wLCAtMS4wLCAxLjAsXG4gICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgXG4gICAgICAvLyBiYWNrXG4gICAgICAtMS4wLCAxLjAsIC0xLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgICBcbiAgICAgIC8vIHRvcFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAxLjAsIC0xLjAsXG4gICAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIGJvdHRvbVxuICAgICAgLTEuMCwgLTEuMCwgMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgMS4wLFxuXG4gICAgICAvLyByaWdodFxuICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAxLjAsXG5cbiAgICAgIC8vIGxlZnRcbiAgICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIDEuMFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAzLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBbXG4gICAgICAvLyBGcm9udCBmYWNlXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgXG4gICAgICAvLyBCYWNrIGZhY2VcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuXG4gICAgICAvLyBUb3AgZmFjZVxuICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgMC4wLCAxLjAsIDAuMCxcblxuICAgICAgLy8gQm90dG9tIGZhY2VcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuXG4gICAgICAvLyBSaWdodCBmYWNlXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuXG4gICAgICAvLyBMZWZ0IGZhY2VcbiAgICAgIC0xLjAsIDAuMCwgMC4wLFxuICAgICAgLTEuMCwgMC4wLCAwLjAsXG4gICAgICAtMS4wLCAwLjAsIDAuMCxcbiAgICAgIC0xLjAsIDAuMCwgMC4wXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDMsXG4gICAgICBudW1JdGVtczogMjRcbiAgICB9KVxuXG4gICAgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIFtcbiAgICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuXG4gICAgICAvLyBCYWNrIGZhY2VcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuXG4gICAgICAvLyBUb3AgZmFjZVxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG5cbiAgICAgIC8vIEJvdHRvbSBmYWNlXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcblxuICAgICAgLy8gUmlnaHQgZmFjZVxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG5cbiAgICAgIC8vIExlZnQgZmFjZVxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDIsXG4gICAgICBudW1JdGVtczogMjRcbiAgICB9KVxuXG4gICAgdGhpcy5jdWJlVmVydGV4SW5kZXhCdWZmZXIgPSBzaGFwZVV0aWwuY3JlYXRlQXJyYXlCdWZmZXIodGhpcy5nbCwgW1xuICAgICAgMCwgMSwgMiwgICAgICAwLCAyLCAzLCAgICAvLyBGcm9udCBmYWNlXG4gICAgICA0LCA1LCA2LCAgICAgIDQsIDYsIDcsICAgIC8vIEJhY2sgZmFjZVxuICAgICAgOCwgOSwgMTAsICAgICA4LCAxMCwgMTEsICAvLyBUb3AgZmFjZVxuICAgICAgMTIsIDEzLCAxNCwgICAxMiwgMTQsIDE1LCAvLyBCb3R0b20gZmFjZVxuICAgICAgMTYsIDE3LCAxOCwgICAxNiwgMTgsIDE5LCAvLyBSaWdodCBmYWNlXG4gICAgICAyMCwgMjEsIDIyLCAgIDIwLCAyMiwgMjMgIC8vIExlZnQgZmFjZVxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAxLFxuICAgICAgbnVtSXRlbXM6IDM2LFxuICAgICAgdmVydERhdGFDb25zdHJ1Y3RvcjogVWludDE2QXJyYXksXG4gICAgICBiaW5kVGFyZ2V0OiB0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSXG4gICAgfSlcbiAgfVxuXG4gIGluaXRUZXh0dXJlICgpIHtcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVUZXh0dXJlKGltYWdlKVxuICAgIH1cblxuICAgIGltYWdlLnNyYyA9IHRoaXMudGV4dHVyZVNyY1xuICB9XG5cbiAgY3JlYXRlVGV4dHVyZSAoaW1hZ2UpIHtcbiAgICB0aGlzLmN1YmVUZXh0dXJlID0gdGhpcy5nbC5jcmVhdGVUZXh0dXJlKClcbiAgICB0aGlzLmN1YmVUZXh0dXJlLmltYWdlID0gaW1hZ2VcbiAgICBcbiAgICAvLyBDb25maWcgdGV4dHVyZSByZWxhdGVkIGxvZ2ljXG4gICAgLy8gdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgLy8gdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgLy8gdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSlcbiAgICAvLyB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVIpXG4gICAgLy8gdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKVxuICAgIC8vIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKVxuXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSlcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5ORUFSRVNUKVxuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLk5FQVJFU1QpXG5cbiAgICAvLyBJdCdzIGFsd2F5cyBnb29kIHRvIHJlc2V0IGFjdGl2ZSB0ZXh0dXJlIGZsYWdcbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgbnVsbClcbiAgfVxuXG4gIGhhbmRsZUtleXMgKGR0KSB7XG4gICAgLy8gQ2FsY3VsYXRlIHJvdGF0aW9uc1xuICAgIC8vIHVwXG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbMzhdICYmIHRoaXMucm90YXRlU3BlZWRYID4gLTUwKSB7XG4gICAgICB0aGlzLnJvdGF0ZVNwZWVkWCAtPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gZG93blxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzQwXSAmJiB0aGlzLnJvdGF0ZVNwZWVkWCA8IDUwKSB7XG4gICAgICB0aGlzLnJvdGF0ZVNwZWVkWCArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gbGVmdFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM3XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA+IC01MCkge1xuICAgICAgdGhpcy5yb3RhdGVTcGVlZFkgLT0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIHVwXG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbMzldICYmIHRoaXMucm90YXRlU3BlZWRZIDwgNTApIHtcbiAgICAgIHRoaXMucm90YXRlU3BlZWRZICs9IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyB6b29tIG91dFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzQ5XSAmJiB0aGlzLnogPiAtMzApIHtcbiAgICAgIHRoaXMueiAtPSAwLjJcbiAgICB9XG4gICAgXG4gICAgLy8gem9vbSBpblxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzUwXSAmJiB0aGlzLnogPCAtMSkge1xuICAgICAgdGhpcy56ICs9IDAuMlxuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgdGhpcy5yb3RhdGVYICs9IHNoYXBlVXRpbC5kZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRYKSAvIDEwMFxuICAgIHRoaXMucm90YXRlWSArPSBzaGFwZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWSkgLyAxMDBcbiAgICB0aGlzLnJvdGF0ZVogKz0gc2hhcGVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFopIC8gMTAwXG4gIH1cblxuICBkcmF3ICgpIHtcbiAgICAvLyBDaGVjayBpZiBuZWVkIHRvIGJsZW5kXG4gICAgaWYgKHRoaXMuaXNCbGVuZCkge1xuICAgICAgLy8gQWRkIGJsZW5kaW5nIGVmZmVjdCB0byBzaW11bGF0ZSB0cmFuc3BhcmVuY3lcbiAgICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORSk7XG4gICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICAgIHRoaXMuZ2wuZGlzYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuICAgICAgLy8gUGFzcyBhbHBoYSB1bmlmb3JtIHRvIHNoYWRlclxuICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmlzQmxlbmRVbmlmb3JtLCB0cnVlKTtcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5hbHBoYVVuaWZvcm0sIHRoaXMuYmxlbmRBbHBoYSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKVxuICAgICAgdGhpcy5nbC5kaXNhYmxlKHRoaXMuZ2wuQkxFTkQpXG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuaXNCbGVuZFVuaWZvcm0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBQYXNzIHZlcnRleCBwb3NpdGlvbiBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5jdWJlQnVmZmVyKVxuICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAudmVydGV4UG9zaXRpb25BdHRyaWJ1dGUsIHRoaXMuY3ViZUJ1ZmZlci5pbmZvLml0ZW1TaXplLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgICBcbiAgICAvLyBQYXNzIHRleHR1cmUgY29vcmRpbmF0ZXMgaW50byBzaGFkZXJcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnRleHR1cmVDb29yZEF0dHJpYnV0ZSwgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyLmluZm8uaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuXG4gICAgLy8gQWN0aXZlIHRleHR1cmUgdXNpbmcgdGhlIGZpcnN0IHRleHR1cmUgdW5pdFxuICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkUwKVxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlKVxuICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5zYW1wbGVyVW5pZm9ybSwgMClcblxuICAgIC8vIFBhc3Mgbm9ybWFscyBpbnRvIHNoYWRlclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyKVxuICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAudmVydGV4Tm9ybWFsQXR0cmlidXRlLCB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgXG4gICAgLy8gQWRkIGxpZ2h0XG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnVzZUxpZ2h0aW5nVW5pZm9ybSwgISF0aGlzLnVzZUxpZ2h0KVxuICAgIHRoaXMuZ2wudW5pZm9ybTNmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5hbWJpZW50Q29sb3JVbmlmb3JtLCB0aGlzLmFtYmllbnRDb2xvclswXSwgdGhpcy5hbWJpZW50Q29sb3JbMV0sIHRoaXMuYW1iaWVudENvbG9yWzJdKVxuICAgIHRoaXMuZ2wudW5pZm9ybTNmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5kaXJlY3Rpb25hbENvbG9yVW5pZm9ybSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzBdLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMV0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclsyXSlcblxuICAgIGxldCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uID0gdmVjMy5jcmVhdGUoKVxuICAgIC8vIE5vcm1hbGl6ZSBzbyB0aGF0IHRoZSBkb3QgcHJvZHVjdCBpcyB0aGUgc2FtZSB0byBjb3NpbmVcbiAgICB2ZWMzLm5vcm1hbGl6ZShhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCB0aGlzLmxpZ2h0aW5nRGlyZWN0aW9uKVxuICAgIC8vIFJldmVyc2UgdGhlIGRpcmVjdGlvbiB0byBkZXNjcmliZSBsaWdodCBzb3VyY2VcbiAgICB2ZWMzLnNjYWxlKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIC0xKVxuICAgIC8vIFBhc3MgbGlnaHRpbmcgZGlyZWN0aW9uIHVuaWZvcm0gdG8gc2hhZGVyXG4gICAgdGhpcy5nbC51bmlmb3JtM2Z2KHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5saWdodGluZ0RpcmVjdGlvblVuaWZvcm0sIGFkanVzdGVkTGlnaHREaXJlY3Rpb24pXG5cbiAgICAvLyBUcmFuc2Zvcm0gbW9kZWwgdmlldyBtYXRyaXhcbiAgICB0aGlzLnNjZW5lLm1vZGVsVmlld1B1c2hNYXRyaXgoKVxuICAgIG1hdDQudHJhbnNsYXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgW3RoaXMueCwgdGhpcy55LCB0aGlzLnpdKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVYLCBzaGFwZVV0aWwueEF4aXMpXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVksIHNoYXBlVXRpbC55QXhpcylcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWiwgc2hhcGVVdGlsLnpBeGlzKVxuICAgIFxuICAgIC8vIFBhc3MgdGhlIG1vZGVsIHZpZXcgbWF0cml4LCBwcm9qZWN0aW9uIG1hdHJpeCBhbmQgbm9ybWFsIG1hdHJpeCBpbnRvIHNoYWRlclxuICAgIHRoaXMuc2NlbmUuc2V0VW5pZm9ybU1hdHJpeCgpXG4gICAgXG4gICAgLy8gZHJhdyB0aGUgY3ViZVxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVWZXJ0ZXhJbmRleEJ1ZmZlcilcbiAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgdGhpcy5jdWJlVmVydGV4SW5kZXhCdWZmZXIuaW5mby5udW1JdGVtcywgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMClcbiAgICB0aGlzLnNjZW5lLm1vZGVsVmlld1BvcE1hdHJpeCgpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFwZXMvY3ViZS5qcyIsImNvbnN0IHNoYXBlVXRpbCA9IHtcbiAgLy8gU29tZSBjb25zdGFudHNcbiAgeEF4aXM6IFsxLjAsIDAuMCwgMC4wXSxcbiAgeUF4aXM6IFswLjAsIDEuMCwgMC4wXSxcbiAgekF4aXM6IFswLjAsIDAuMCwgMS4wXSxcblxuICBjcmVhdGVBcnJheUJ1ZmZlcjogKGdsLCB2ZXJ0cyA9IFtdLCB2ZXJ0c09wdGlvbiA9IHt9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgdmVydERhdGFDb25zdHJ1Y3RvciA9IEZsb2F0MzJBcnJheSxcbiAgICAgIGJpbmRUYXJnZXQgPSBnbC5BUlJBWV9CVUZGRVIsXG4gICAgICBpdGVtU2l6ZSA9IDEsXG4gICAgICBudW1JdGVtcyA9IHZlcnRzLmxlbmd0aFxuICAgIH0gPSB2ZXJ0c09wdGlvblxuICAgIFxuICAgIGNvbnN0IGN1YmVCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuICAgIGdsLmJpbmRCdWZmZXIoYmluZFRhcmdldCwgY3ViZUJ1ZmZlcilcbiAgICBcbiAgICBnbC5idWZmZXJEYXRhKGJpbmRUYXJnZXQsIG5ldyB2ZXJ0RGF0YUNvbnN0cnVjdG9yKHZlcnRzKSwgZ2wuU1RBVElDX0RSQVcpXG4gICAgY3ViZUJ1ZmZlci5pbmZvID0ge1xuICAgICAgaXRlbVNpemUsXG4gICAgICBudW1JdGVtc1xuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1YmVCdWZmZXJcbiAgfSxcblxuICBkZWdUb1JhZDogKGRlZykgPT4ge1xuICAgIHJldHVybiBkZWcgLyAxODAgKiBNYXRoLlBJXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hhcGVVdGlsXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXBlcy9zaGFwZVV0aWwuanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIyNTkyMjc0YTc1ZTZjMzQzZTZmZTA0NGU2MzJjNDYzYy5wbmdcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZXh0dXJlcy9kdWNrLnBuZ1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCBkZWZhdWx0VmVydGV4U2hhZGVyU291cmNlIGZyb20gJy4vdmVydGV4U2hhZGVyJ1xuaW1wb3J0IGRlZmF1bHRGcmFnbWVudFNoYWRlclNvdXJjZSBmcm9tICcuL2ZyYWdtZW50U2hhZGVyJ1xuXG5jb25zdCBkZWZhdWx0QXR0cmlidXRlTWFwID0ge1xuICB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZTogJ2FWZXJ0ZXhQb3NpdGlvbicsXG4gIHRleHR1cmVDb29yZEF0dHJpYnV0ZTogJ2FUZXh0dXJlQ29vcmQnLFxuICB2ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGU6ICdhVmVydGV4Tm9ybWFsJ1xufVxuXG5jb25zdCBkZWZhdWx0VW5pZm9ybU1hcCA9IHtcbiAgcHJvamVjdGlvbk1hdHJpeFVuaWZvcm06ICd1UHJvamVjdGlvbk1hdHJpeCcsXG4gIG1vZGVsVmlld01hdHJpeFVuaWZvcm06ICd1TW9kZWxWaWV3TWF0cml4JyxcbiAgc2FtcGxlclVuaWZvcm06ICd1U2FtcGxlcicsXG4gIHVzZUxpZ2h0aW5nVW5pZm9ybTogJ3VVc2VMaWdodGluZycsXG4gIGFtYmllbnRDb2xvclVuaWZvcm06ICd1QW1iaWVudENvbG9yJyxcbiAgZGlyZWN0aW9uYWxDb2xvclVuaWZvcm06ICd1RGlyZWN0aW9uYWxDb2xvcicsXG4gIGxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybTogJ3VMaWdodGluZ0RpcmVjdGlvbicsXG4gIG5NYXRyaXhVbmlmb3JtOiAndU5NYXRyaXgnLFxuICBpc0JsZW5kVW5pZm9ybTogJ3VJc0JsZW5kJyxcbiAgYWxwaGFVbmlmb3JtOiAndUFscGhhJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkZXJQcm9ncmFtIHtcbiAgY29uc3RydWN0b3IgKHNoYWRlck9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGdsLFxuICAgICAgdmVydGV4U2hhZGVyU291cmNlID0gZGVmYXVsdFZlcnRleFNoYWRlclNvdXJjZSxcbiAgICAgIGZyYWdtZW50U2hhZGVyU291cmNlID0gZGVmYXVsdEZyYWdtZW50U2hhZGVyU291cmNlLFxuICAgICAgYXR0cmlidXRlTWFwID0gZGVmYXVsdEF0dHJpYnV0ZU1hcCxcbiAgICAgIHVuaWZvcm1NYXAgPSBkZWZhdWx0VW5pZm9ybU1hcFxuICAgIH0gPSBzaGFkZXJPcHRpb25zXG5cbiAgICBpZiAoIWdsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHdlYmdsIGNvbnRleHQgZm9yIHNoYWRlciBwcm9ncmFtJylcbiAgICB9XG5cbiAgICB0aGlzLmdsID0gZ2xcbiAgICB0aGlzLnZlcnRleFNoYWRlclNvdXJjZSA9IHZlcnRleFNoYWRlclNvdXJjZVxuICAgIHRoaXMuZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBmcmFnbWVudFNoYWRlclNvdXJjZVxuICAgIHRoaXMuYXR0cmlidXRlTWFwID0gYXR0cmlidXRlTWFwXG4gICAgdGhpcy51bmlmb3JtTWFwID0gdW5pZm9ybU1hcFxuXG4gICAgdGhpcy5jcmVhdGVQcm9ncmFtKClcbiAgICB0aGlzLmluaXRWYXJpYWJsZU1hcCgpXG4gIH1cblxuICBjcmVhdGVTaGFkZXIgKHNoYWRlclR5cGUpIHtcbiAgICBsZXQgc2hhZGVyXG4gIFxuICAgIHN3aXRjaCAoc2hhZGVyVHlwZSkge1xuICAgICAgY2FzZSAndmVydGV4JzpcbiAgICAgICAgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIodGhpcy5nbC5WRVJURVhfU0hBREVSKVxuICAgICAgICB0aGlzLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHRoaXMudmVydGV4U2hhZGVyU291cmNlKVxuICAgICAgICBicmVha1xuICAgICAgICBcbiAgICAgIGNhc2UgJ2ZyYWdtZW50JzpcbiAgICAgICAgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIodGhpcy5nbC5GUkFHTUVOVF9TSEFERVIpXG4gICAgICAgIHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc2hhZGVyIHR5cGUgdG8gY3JlYXRlOiAke3R5cGV9YClcbiAgICB9XG4gICAgXG4gICAgdGhpcy5nbC5jb21waWxlU2hhZGVyKHNoYWRlcilcbiAgICBcbiAgICBpZiAoIXRoaXMuZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgdGhpcy5nbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIC8vIFRoZSBzaGFkZXIgaXMgbm90IGNvcnJlY3RseSBjb21waWxlZFxuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc2hhZGVyXG4gIH1cblxuICBjcmVhdGVQcm9ncmFtICgpIHtcbiAgICB0aGlzLnByb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKVxuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5jcmVhdGVTaGFkZXIoJ3ZlcnRleCcpKVxuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5jcmVhdGVTaGFkZXIoJ2ZyYWdtZW50JykpXG4gICAgdGhpcy5nbC5saW5rUHJvZ3JhbSh0aGlzLnByb2dyYW0pXG4gICAgXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgLy8gVGhlIHNoYWRlciBwcm9ncmFtIGlzIG5vdCBjb3JyZWN0bHkgbGlua2VkXG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5nbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByb2dyYW0pKVxuICAgIH1cbiAgfVxuXG4gIGluaXRWYXJpYWJsZU1hcCAoKSB7XG4gICAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSlcbiAgXG4gICAgLy8gUHV0IGFsbCBhdHRhY2hlZCBpbmZvcm1hdGlvbiB0byBzaGFkZXIgcHJvZ3JhbSBtZXRhIGluZm9ybWF0aW9uXG4gICAgdGhpcy52YXJpYWJsZU1hcCA9IHt9XG5cbiAgICBmb3IgKGxldCBhdHRyaWJLZXkgaW4gdGhpcy5hdHRyaWJ1dGVNYXApIHtcbiAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZU1hcC5oYXNPd25Qcm9wZXJ0eShhdHRyaWJLZXkpKSB7XG4gICAgICAgIGxldCBhdHRyaWJMb2NhdGlvbiA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCB0aGlzLmF0dHJpYnV0ZU1hcFthdHRyaWJLZXldKVxuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwW2F0dHJpYktleV0gPSBhdHRyaWJMb2NhdGlvblxuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYkxvY2F0aW9uKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IHVuaWZvcm1LZXkgaW4gdGhpcy51bmlmb3JtTWFwKSB7XG4gICAgICBpZiAodGhpcy51bmlmb3JtTWFwLmhhc093blByb3BlcnR5KHVuaWZvcm1LZXkpKSB7XG4gICAgICAgIHRoaXMudmFyaWFibGVNYXBbdW5pZm9ybUtleV0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIHRoaXMudW5pZm9ybU1hcFt1bmlmb3JtS2V5XSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhZGVycy9TaGFkZXJQcm9ncmFtLmpzIiwiZXhwb3J0IGRlZmF1bHQgYFxuYXR0cmlidXRlIHZlYzMgYVZlcnRleFBvc2l0aW9uO1xuYXR0cmlidXRlIHZlYzMgYVZlcnRleE5vcm1hbDtcbmF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XG5cbnVuaWZvcm0gbWF0NCB1UHJvamVjdGlvbk1hdHJpeDtcbnVuaWZvcm0gbWF0NCB1TW9kZWxWaWV3TWF0cml4O1xudW5pZm9ybSBtYXQzIHVOTWF0cml4O1xuXG51bmlmb3JtIHZlYzMgdUFtYmllbnRDb2xvcjtcblxudW5pZm9ybSB2ZWMzIHVMaWdodGluZ0RpcmVjdGlvbjtcbnVuaWZvcm0gdmVjMyB1RGlyZWN0aW9uYWxDb2xvcjtcblxudW5pZm9ybSBib29sIHVVc2VMaWdodGluZztcblxudmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG52YXJ5aW5nIHZlYzMgdkxpZ2h0V2VpZ2h0aW5nO1xuXG52b2lkIG1haW4gKHZvaWQpIHtcbiAgZ2xfUG9zaXRpb24gPSB1UHJvamVjdGlvbk1hdHJpeCAqIHVNb2RlbFZpZXdNYXRyaXggKiB2ZWM0KGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcbiAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XG5cbiAgaWYgKHVVc2VMaWdodGluZykge1xuICAgIHZlYzMgdHJhbnNmb3JtZWROb3JtYWwgPSB1Tk1hdHJpeCAqIGFWZXJ0ZXhOb3JtYWw7XG4gICAgZmxvYXQgZGlyZWN0aW9uYWxMaWdodFdlaWdodGluZyA9IG1heCgwLjAsIGRvdCh0cmFuc2Zvcm1lZE5vcm1hbCwgdUxpZ2h0aW5nRGlyZWN0aW9uKSk7XG4gICAgdkxpZ2h0V2VpZ2h0aW5nID0gdUFtYmllbnRDb2xvciArIHVEaXJlY3Rpb25hbENvbG9yICogZGlyZWN0aW9uYWxMaWdodFdlaWdodGluZztcbiAgfSBlbHNlIHtcbiAgICB2TGlnaHRXZWlnaHRpbmcgPSB2ZWMzKDEuMCwgMS4wLCAxLjApO1xuICB9XG59XG5gXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhZGVycy92ZXJ0ZXhTaGFkZXIuanMiLCJleHBvcnQgZGVmYXVsdCBgXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xudmFyeWluZyB2ZWMzIHZMaWdodFdlaWdodGluZztcblxudW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG51bmlmb3JtIGJvb2wgdUlzQmxlbmQ7XG51bmlmb3JtIGZsb2F0IHVBbHBoYTtcblxudm9pZCBtYWluKHZvaWQpIHtcbiAgdmVjNCB0ZXh0dXJlQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC5zLCB2VGV4dHVyZUNvb3JkLnQpKTtcbiAgLy8gQWRqdXN0IHRleHR1cmVDb2xvciByZ2IgdmFsdWUgYnkgbGlnaHQgd2VpZ2h0XG4gIGlmICh1SXNCbGVuZCkge1xuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQodGV4dHVyZUNvbG9yLnJnYiAqIHZMaWdodFdlaWdodGluZywgdGV4dHVyZUNvbG9yLmEgKiB1QWxwaGEpO1xuICB9IGVsc2Uge1xuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQodGV4dHVyZUNvbG9yLnJnYiAqIHZMaWdodFdlaWdodGluZywgdGV4dHVyZUNvbG9yLmEpO1xuICB9XG59XG5gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYWRlcnMvZnJhZ21lbnRTaGFkZXIuanMiLCJpbXBvcnQgc2hhcGVVdGlsIGZyb20gJy4vc2hhcGVVdGlsJ1xuaW1wb3J0IGRlZmF1bHRUZXh0dXJlU3JjIGZyb20gJy4uL3RleHR1cmVzL2R1Y2sucG5nJ1xuaW1wb3J0IGdhbWVTdGF0ZSBmcm9tICcuLi9nYW1lU3RhdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaGVyZSB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgc2NlbmUsXG4gICAgICBzaGFkZXJQcm9ncmFtLFxuICAgICAgaXNCbGVuZCA9IGZhbHNlLFxuICAgICAgYmxlbmRBbHBoYSA9IDAuNSxcbiAgICAgIHRleHR1cmVTcmMgPSBkZWZhdWx0VGV4dHVyZVNyYyxcbiAgICAgIHVzZUxpZ2h0ID0gdHJ1ZSxcbiAgICAgIGFtYmllbnRDb2xvciA9IFswLjIsIDAuMiwgMC4yXSxcbiAgICAgIGRpcmVjdGlvbmFsQ29sb3IgPSBbMC44LCAwLjgsIDAuOF0sXG4gICAgICBsaWdodGluZ0RpcmVjdGlvbiA9IFswLjAsIDAuMCwgLTEuMF0sXG4gICAgICB4ID0gMCxcbiAgICAgIHkgPSAwLFxuICAgICAgeiA9IC0xMCxcbiAgICAgIHNwZWVkWCA9IDAsXG4gICAgICBzcGVlZFkgPSAwLFxuICAgICAgc3BlZWRaID0gMCxcbiAgICAgIHJvdGF0ZVNwZWVkWCA9IE1hdGgucmFuZG9tKCkgKiAxNSxcbiAgICAgIHJvdGF0ZVNwZWVkWSA9IE1hdGgucmFuZG9tKCkgKiAxNSxcbiAgICAgIHJvdGF0ZVNwZWVkWiA9IE1hdGgucmFuZG9tKCkgKiAxNSxcbiAgICAgIHJvdGF0ZVggPSAwLFxuICAgICAgcm90YXRlWSA9IDAsXG4gICAgICByb3RhdGVaID0gMCxcblxuICAgICAgcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIDIwLFxuICAgICAgbGF0aXR1ZGVCYW5kcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDUsXG4gICAgICBsb25naXR1ZGVCYW5kcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDVcbiAgICB9ID0gb3B0aW9uc1xuXG4gICAgaWYgKCFzaGFkZXJQcm9ncmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNoYWRlciBwcm9ncmFtIHByb3ZpZGVkIScpXG4gICAgfVxuXG4gICAgaWYgKCFzY2VuZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzY2VuZSBmb3IgdGhpcyBzaGFwZScsIHRoaXMpXG4gICAgfVxuXG4gICAgdGhpcy5nbCA9IHNoYWRlclByb2dyYW0uZ2xcbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBzaGFkZXJQcm9ncmFtXG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lXG4gICAgdGhpcy5pc0JsZW5kID0gaXNCbGVuZFxuICAgIHRoaXMuYmxlbmRBbHBoYSA9IGJsZW5kQWxwaGFcbiAgICB0aGlzLnRleHR1cmVTcmMgPSB0ZXh0dXJlU3JjXG4gICAgdGhpcy51c2VMaWdodCA9IHVzZUxpZ2h0XG4gICAgdGhpcy5hbWJpZW50Q29sb3IgPSBhbWJpZW50Q29sb3JcbiAgICB0aGlzLmRpcmVjdGlvbmFsQ29sb3IgPSBkaXJlY3Rpb25hbENvbG9yXG4gICAgdGhpcy5saWdodGluZ0RpcmVjdGlvbiA9IGxpZ2h0aW5nRGlyZWN0aW9uXG5cbiAgICAvLyBtb3ZlIHNwZWVkc1xuICAgIHRoaXMuc3BlZWRYID0gc3BlZWRYXG4gICAgdGhpcy5zcGVlZFkgPSBzcGVlZFlcbiAgICB0aGlzLnNwZWVkWiA9IHNwZWVkWlxuXG4gICAgLy8gcG9zaXRpb25cbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMueiA9IHpcblxuICAgIC8vIHJvdGF0ZSBzcGVlZHNcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWCA9IHJvdGF0ZVNwZWVkWFxuICAgIHRoaXMucm90YXRlU3BlZWRZID0gcm90YXRlU3BlZWRZXG4gICAgdGhpcy5yb3RhdGVTcGVlZFogPSByb3RhdGVTcGVlZFpcblxuICAgIC8vIHJvdGF0ZSByYWRpdXNcbiAgICB0aGlzLnJvdGF0ZVggPSByb3RhdGVYXG4gICAgdGhpcy5yb3RhdGVZID0gcm90YXRlWVxuICAgIHRoaXMucm90YXRlWiA9IHJvdGF0ZVpcblxuICAgIC8vIHZlcnRleCBidWZmZXJcbiAgICB0aGlzLnBvc2l0aW9uQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gbm9ybWFsIGJ1ZmZlclxuICAgIHRoaXMubm9ybWFsQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gdGV4dHVyZSBidWZmZXJcbiAgICB0aGlzLnRleHR1cmVDb29yZEJ1ZmZlciA9IG51bGxcblxuICAgIC8vIGluZGV4IGJ1ZmZlclxuICAgIHRoaXMudmVydGV4SW5kZXhCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBTcGhlcmUgdGhpbmdzXG4gICAgdGhpcy5sYXRpdHVkZUJhbmRzID0gbGF0aXR1ZGVCYW5kc1xuICAgIHRoaXMubG9uZ2l0dWRlQmFuZHMgPSBsb25naXR1ZGVCYW5kc1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzXG5cbiAgICAvLyBpbml0IHRoZSBjdWJlXG4gICAgdGhpcy5pbml0QnVmZmVyKClcbiAgICB0aGlzLmluaXRUZXh0dXJlKClcbiAgfVxuXG4gIGluaXRCdWZmZXIgKCkge1xuICAgIC8vIENhbGN1bGF0ZSB0aGUgYXJyYXkgZGF0YVxuICAgIGNvbnN0IHZlcnRleFBvc2l0aW9uRGF0YSA9IFtdXG4gICAgY29uc3Qgbm9ybWFsRGF0YSA9IFtdXG4gICAgY29uc3QgdGV4dHVyZUNvb3JkRGF0YSA9IFtdXG4gICAgXG4gICAgZm9yIChsZXQgbGF0TnVtYmVyID0gMDsgbGF0TnVtYmVyIDw9IHRoaXMubGF0aXR1ZGVCYW5kczsgbGF0TnVtYmVyKyspIHtcbiAgICAgIGxldCB0aGV0YSA9IGxhdE51bWJlciAqIE1hdGguUEkgLyB0aGlzLmxhdGl0dWRlQmFuZHNcbiAgICAgIGxldCBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKVxuICAgICAgbGV0IGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpXG5cbiAgICAgIGZvciAobGV0IGxvbmdOdW1iZXIgPSAwOyBsb25nTnVtYmVyIDw9IHRoaXMubG9uZ2l0dWRlQmFuZHM7IGxvbmdOdW1iZXIrKykge1xuICAgICAgICBsZXQgcGhpID0gbG9uZ051bWJlciAqIDIgKiBNYXRoLlBJIC8gdGhpcy5sb25naXR1ZGVCYW5kc1xuICAgICAgICBsZXQgc2luUGhpID0gTWF0aC5zaW4ocGhpKVxuICAgICAgICBsZXQgY29zUGhpID0gTWF0aC5jb3MocGhpKVxuXG4gICAgICAgIC8vIENvbnZlcnQgcmFkaXVzIGNvb3JkaW5hdGUgaW50byBjYXJ0ZXNpYW4gY29vcmRpbmF0ZSAoYXNzdW1lIHJhZGl1cyBpcyB1bml0KS5cbiAgICAgICAgbGV0IHggPSBzaW5UaGV0YSAqIGNvc1BoaVxuICAgICAgICBsZXQgeSA9IGNvc1RoZXRhXG4gICAgICAgIGxldCB6ID0gc2luVGhldGEgKiBzaW5QaGlcblxuICAgICAgICAvLyBUaGUgdGV4dHVyZSBjb29yZGluYXRlIGlzIGNvbXB1dGVkIGJ5ICdNZXJjYXRvciBwcm9qZWN0aW9uJ1xuICAgICAgICBsZXQgdSA9IDEgLSAobG9uZ051bWJlciAvIHRoaXMubG9uZ2l0dWRlQmFuZHMpXG4gICAgICAgIGxldCB2ID0gMSAtIChsYXROdW1iZXIgLyB0aGlzLmxhdGl0dWRlQmFuZHMpXG5cbiAgICAgICAgLy8gUGFzcyBhbGwgdGhlc2UgdmFsdWVzIGludG8gdGhlIGRhdGEgYXJyYXlcbiAgICAgICAgdmVydGV4UG9zaXRpb25EYXRhLnB1c2godGhpcy5yYWRpdXMgKiB4KVxuICAgICAgICB2ZXJ0ZXhQb3NpdGlvbkRhdGEucHVzaCh0aGlzLnJhZGl1cyAqIHkpXG4gICAgICAgIHZlcnRleFBvc2l0aW9uRGF0YS5wdXNoKHRoaXMucmFkaXVzICogeilcblxuICAgICAgICBub3JtYWxEYXRhLnB1c2goeClcbiAgICAgICAgbm9ybWFsRGF0YS5wdXNoKHkpXG4gICAgICAgIG5vcm1hbERhdGEucHVzaCh6KVxuXG4gICAgICAgIHRleHR1cmVDb29yZERhdGEucHVzaCh1KVxuICAgICAgICB0ZXh0dXJlQ29vcmREYXRhLnB1c2godilcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uQnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIHZlcnRleFBvc2l0aW9uRGF0YSwge1xuICAgICAgaXRlbVNpemU6IDMsXG4gICAgICBudW1JdGVtczogKHRoaXMubGF0aXR1ZGVCYW5kcyArIDEpICogKHRoaXMubG9uZ2l0dWRlQmFuZHMgKyAxKVxuICAgIH0pXG5cbiAgICB0aGlzLm5vcm1hbEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBub3JtYWxEYXRhLCB7XG4gICAgICBpdGVtU2l6ZTogMyxcbiAgICAgIG51bUl0ZW1zOiAodGhpcy5sYXRpdHVkZUJhbmRzICsgMSkgKiAodGhpcy5sb25naXR1ZGVCYW5kcyArIDEpXG4gICAgfSlcblxuICAgIHRoaXMudGV4dHVyZUNvb3JkQnVmZmVyID0gc2hhcGVVdGlsLmNyZWF0ZUFycmF5QnVmZmVyKHRoaXMuZ2wsIHRleHR1cmVDb29yZERhdGEsIHtcbiAgICAgIGl0ZW1TaXplOiAyLFxuICAgICAgbnVtSXRlbXM6ICh0aGlzLmxhdGl0dWRlQmFuZHMgKyAxKSAqICh0aGlzLmxvbmdpdHVkZUJhbmRzICsgMSlcbiAgICB9KVxuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBzcGhlcmUgaW5kZXggYnVmZmVyXG4gICAgY29uc3QgaW5kZXhEYXRhID0gW11cblxuICAgIGZvciAobGV0IGxhdE51bWJlciA9IDA7IGxhdE51bWJlciA8IHRoaXMubGF0aXR1ZGVCYW5kczsgbGF0TnVtYmVyKyspIHtcbiAgICAgIGZvciAobGV0IGxvbmdOdW1iZXIgPSAwOyBsb25nTnVtYmVyIDwgdGhpcy5sb25naXR1ZGVCYW5kczsgbG9uZ051bWJlcisrKSB7XG4gICAgICAgIGxldCBmaXJzdCA9IGxvbmdOdW1iZXIgKyAobGF0TnVtYmVyICogKHRoaXMubG9uZ2l0dWRlQmFuZHMgKyAxKSlcbiAgICAgICAgbGV0IHNlY29uZCA9IGZpcnN0ICsgdGhpcy5sb25naXR1ZGVCYW5kcyArIDFcblxuICAgICAgICBpbmRleERhdGEucHVzaChmaXJzdClcbiAgICAgICAgaW5kZXhEYXRhLnB1c2goc2Vjb25kKVxuICAgICAgICBpbmRleERhdGEucHVzaChmaXJzdCArIDEpXG5cbiAgICAgICAgaW5kZXhEYXRhLnB1c2goc2Vjb25kKVxuICAgICAgICBpbmRleERhdGEucHVzaChzZWNvbmQgKyAxKVxuICAgICAgICBpbmRleERhdGEucHVzaChmaXJzdCArIDEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy52ZXJ0ZXhJbmRleEJ1ZmZlciA9IHNoYXBlVXRpbC5jcmVhdGVBcnJheUJ1ZmZlcih0aGlzLmdsLCBpbmRleERhdGEsIHtcbiAgICAgIGl0ZW1TaXplOiAxLFxuICAgICAgbnVtSXRlbXM6IHRoaXMubGF0aXR1ZGVCYW5kcyAqIHRoaXMubG9uZ2l0dWRlQmFuZHMgKiA2LFxuICAgICAgdmVydERhdGFDb25zdHJ1Y3RvcjogVWludDE2QXJyYXksXG4gICAgICBiaW5kVGFyZ2V0OiB0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSXG4gICAgfSlcbiAgfVxuXG4gIGluaXRUZXh0dXJlICgpIHtcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVUZXh0dXJlKGltYWdlKVxuICAgIH1cblxuICAgIGltYWdlLnNyYyA9IHRoaXMudGV4dHVyZVNyY1xuICB9XG5cbiAgY3JlYXRlVGV4dHVyZSAoaW1hZ2UpIHtcbiAgICB0aGlzLmN1YmVUZXh0dXJlID0gdGhpcy5nbC5jcmVhdGVUZXh0dXJlKClcbiAgICB0aGlzLmN1YmVUZXh0dXJlLmltYWdlID0gaW1hZ2VcbiAgICBcbiAgICAvLyBDb25maWcgdGV4dHVyZSByZWxhdGVkIGxvZ2ljXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgdGhpcy5jdWJlVGV4dHVyZS5pbWFnZSlcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVIpXG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKVxuICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKVxuXG4gICAgLy8gVE9ETzogdXNlIG5lYXJlc3QgZmlsdGVyIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAvLyB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZSlcbiAgICAvLyB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbiAgICAvLyB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlLmltYWdlKVxuICAgIC8vIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLk5FQVJFU1QpXG4gICAgLy8gdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTkVBUkVTVClcblxuICAgIC8vIEl0J3MgYWx3YXlzIGdvb2QgdG8gcmVzZXQgYWN0aXZlIHRleHR1cmUgZmxhZ1xuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBudWxsKVxuICB9XG5cbiAgaGFuZGxlS2V5cyAoZHQpIHtcbiAgICAvLyBDYWxjdWxhdGUgcm90YXRpb25zXG4gICAgLy8gZm9yd2FyZFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM4XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWCA+IC01MCkge1xuICAgICAgdGhpcy56ICs9IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBiYWNrd2FyZFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzQwXSAmJiB0aGlzLnJvdGF0ZVNwZWVkWCA8IDUwKSB7XG4gICAgICB0aGlzLnogLT0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIG1vdmUgbGVmdFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzM3XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA+IC01MCkge1xuICAgICAgdGhpcy54ICs9IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBtb3ZlIHJpZ2h0XG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbMzldICYmIHRoaXMucm90YXRlU3BlZWRZIDwgNTApIHtcbiAgICAgIHRoaXMueCAtPSAwLjNcbiAgICB9XG5cbiAgICAvLyBtb3ZlIHRvcFxuICAgIGlmIChnYW1lU3RhdGUuY3VycmVudFByZXNzZWRLZXlzWzg3XSAmJiB0aGlzLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICB0aGlzLnkgLT0gMC4zXG4gICAgfVxuXG4gICAgLy8gbW92ZSBkb3duXG4gICAgaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbODNdICYmIHRoaXMucm90YXRlU3BlZWRZIDwgNTApIHtcbiAgICAgIHRoaXMueSArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gLy8gdHVybiBsZWZ0XG4gICAgLy8gaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNDldICYmIHRoaXMueiA+IC0zMCkge1xuICAgIC8vICAgdGhpcy56ICs9IDAuMlxuICAgIC8vIH1cbiAgICBcbiAgICAvLyAvLyB0dXJuIHJpZ2h0XG4gICAgLy8gaWYgKGdhbWVTdGF0ZS5jdXJyZW50UHJlc3NlZEtleXNbNTBdICYmIHRoaXMueiA8IC0xKSB7XG4gICAgLy8gICB0aGlzLnogLT0gMC4yXG4gICAgLy8gfVxuICB9XG5cbiAgYW5pbWF0ZSAoZHQpIHtcbiAgICB0aGlzLnJvdGF0ZVggKz0gc2hhcGVVdGlsLmRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFgpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVZICs9IHNoYXBlVXRpbC5kZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRZKSAvIDEwMFxuICAgIHRoaXMucm90YXRlWiArPSBzaGFwZVV0aWwuZGVnVG9SYWQoZHQgKiB0aGlzLnJvdGF0ZVNwZWVkWikgLyAxMDBcbiAgfVxuXG4gIGRyYXcgKCkge1xuICAgIC8vIENoZWNrIGlmIG5lZWQgdG8gYmxlbmRcbiAgICBpZiAodGhpcy5pc0JsZW5kKSB7XG4gICAgICAvLyBBZGQgYmxlbmRpbmcgZWZmZWN0IHRvIHNpbXVsYXRlIHRyYW5zcGFyZW5jeVxuICAgICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FKTtcbiAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgICAgdGhpcy5nbC5kaXNhYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XG4gICAgICAvLyBQYXNzIGFscGhhIHVuaWZvcm0gdG8gc2hhZGVyXG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAuaXNCbGVuZFVuaWZvcm0sIHRydWUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLmFscGhhVW5pZm9ybSwgdGhpcy5ibGVuZEFscGhhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpXG4gICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5CTEVORClcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5pc0JsZW5kVW5pZm9ybSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIFBhc3MgdmVydGV4IHBvc2l0aW9uIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnBvc2l0aW9uQnVmZmVyKVxuICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlclByb2dyYW0udmFyaWFibGVNYXAudmVydGV4UG9zaXRpb25BdHRyaWJ1dGUsIHRoaXMucG9zaXRpb25CdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgXG4gICAgLy8gUGFzcyB0ZXh0dXJlIGNvb3JkaW5hdGVzIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnRleHR1cmVDb29yZEJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnRleHR1cmVDb29yZEF0dHJpYnV0ZSwgdGhpcy50ZXh0dXJlQ29vcmRCdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG5cbiAgICAvLyBBY3RpdmUgdGV4dHVyZSB1c2luZyB0aGUgZmlyc3QgdGV4dHVyZSB1bml0XG4gICAgdGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTApXG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmUpXG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnNhbXBsZXJVbmlmb3JtLCAwKVxuXG4gICAgLy8gUGFzcyBub3JtYWxzIGludG8gc2hhZGVyXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm5vcm1hbEJ1ZmZlcilcbiAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnZlcnRleE5vcm1hbEF0dHJpYnV0ZSwgdGhpcy5ub3JtYWxCdWZmZXIuaW5mby5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgXG4gICAgLy8gQWRkIGxpZ2h0XG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zaGFkZXJQcm9ncmFtLnZhcmlhYmxlTWFwLnVzZUxpZ2h0aW5nVW5pZm9ybSwgISF0aGlzLnVzZUxpZ2h0KVxuICAgIHRoaXMuZ2wudW5pZm9ybTNmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5hbWJpZW50Q29sb3JVbmlmb3JtLCB0aGlzLmFtYmllbnRDb2xvclswXSwgdGhpcy5hbWJpZW50Q29sb3JbMV0sIHRoaXMuYW1iaWVudENvbG9yWzJdKVxuICAgIHRoaXMuZ2wudW5pZm9ybTNmKHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5kaXJlY3Rpb25hbENvbG9yVW5pZm9ybSwgdGhpcy5kaXJlY3Rpb25hbENvbG9yWzBdLCB0aGlzLmRpcmVjdGlvbmFsQ29sb3JbMV0sIHRoaXMuZGlyZWN0aW9uYWxDb2xvclsyXSlcblxuICAgIGxldCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uID0gdmVjMy5jcmVhdGUoKVxuICAgIC8vIE5vcm1hbGl6ZSBzbyB0aGF0IHRoZSBkb3QgcHJvZHVjdCBpcyB0aGUgc2FtZSB0byBjb3NpbmVcbiAgICB2ZWMzLm5vcm1hbGl6ZShhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCB0aGlzLmxpZ2h0aW5nRGlyZWN0aW9uKVxuICAgIC8vIFJldmVyc2UgdGhlIGRpcmVjdGlvbiB0byBkZXNjcmliZSBsaWdodCBzb3VyY2VcbiAgICB2ZWMzLnNjYWxlKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIC0xKVxuICAgIC8vIFBhc3MgbGlnaHRpbmcgZGlyZWN0aW9uIHVuaWZvcm0gdG8gc2hhZGVyXG4gICAgdGhpcy5nbC51bmlmb3JtM2Z2KHRoaXMuc2hhZGVyUHJvZ3JhbS52YXJpYWJsZU1hcC5saWdodGluZ0RpcmVjdGlvblVuaWZvcm0sIGFkanVzdGVkTGlnaHREaXJlY3Rpb24pXG5cbiAgICAvLyBUcmFuc2Zvcm0gbW9kZWwgdmlldyBtYXRyaXhcbiAgICB0aGlzLnNjZW5lLm1vZGVsVmlld1B1c2hNYXRyaXgoKVxuICAgIG1hdDQudHJhbnNsYXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgW3RoaXMueCwgdGhpcy55LCB0aGlzLnpdKVxuICAgIG1hdDQucm90YXRlKHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVYLCBzaGFwZVV0aWwueEF4aXMpXG4gICAgbWF0NC5yb3RhdGUodGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMuc2NlbmUubW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVksIHNoYXBlVXRpbC55QXhpcylcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLnNjZW5lLm1vZGVsVmlld01hdHJpeCwgdGhpcy5zY2VuZS5tb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWiwgc2hhcGVVdGlsLnpBeGlzKVxuICAgIFxuICAgIC8vIFBhc3MgdGhlIG1vZGVsIHZpZXcgbWF0cml4LCBwcm9qZWN0aW9uIG1hdHJpeCBhbmQgbm9ybWFsIG1hdHJpeCBpbnRvIHNoYWRlclxuICAgIHRoaXMuc2NlbmUuc2V0VW5pZm9ybU1hdHJpeCgpXG4gICAgXG4gICAgLy8gZHJhdyB0aGUgY3ViZVxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEluZGV4QnVmZmVyKVxuICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuZ2wuVFJJQU5HTEVTLCB0aGlzLnZlcnRleEluZGV4QnVmZmVyLmluZm8ubnVtSXRlbXMsIHRoaXMuZ2wuVU5TSUdORURfU0hPUlQsIDApXG4gICAgdGhpcy5zY2VuZS5tb2RlbFZpZXdQb3BNYXRyaXgoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcGVzL3NwaGVyZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=