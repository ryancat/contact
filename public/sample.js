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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2592274a75e6c343e6fe044e632c463c.png";

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textures_duck_png__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textures_duck_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__textures_duck_png__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.getElementById('stage');
var gl;
var shaderProgram;
var triangleBuffer;
var cubeBuffer;
var cubeVertexIndexBuffer;
var colorBuffer;
var cubeColorBuffer; // let cubeTexture

var cubeVertexTextureCoordBuffer;
var cubeVertexNormalBuffer;
var projectionMatrix = mat4.create();
var modelViewMatrix = mat4.create();
var rotateX = 0;
var rotateY = 0;
var rotateZ = 0;
var rotateSpeedX = 0;
var rotateSpeedY = 0;
var rotateSpeedZ = 0;
var currentPressedKeys = {};
var cubeTextures = [];
var currentCubeTextureIndex = 0;
var z = -5;
var cubes = []; ///// Utils /////

var modelViewMatrixStack = [];

function modelViewPushMatrix() {
  var copy = mat4.create();
  mat4.copy(copy, modelViewMatrix);
  modelViewMatrixStack.push(copy);
}

function modelViewPopMatrix() {
  if (modelViewMatrixStack.length === 0) {
    throw new Error('Empty model view matrix stack');
  }

  modelViewMatrix = modelViewMatrixStack.pop();
}

function degToRad(deg) {
  return deg / 180 * Math.PI;
} ///// Shader Source /////


var vertexShaderSource = "\n  attribute vec3 aVertexPosition;\n  // attribute vec4 aVertexColor;\n  attribute vec3 aVertexNormal;\n  attribute vec2 aTextureCoord;\n\n  uniform mat4 uProjectionMatrix;\n  uniform mat4 uModelViewMatrix;\n  uniform mat3 uNMatrix;\n\n  uniform vec3 uAmbientColor;\n\n  uniform vec3 uLightingDirection;\n  uniform vec3 uDirectionalColor;\n\n  uniform bool uUseLighting;\n\n  // varying vec4 vColor;\n  varying vec2 vTextureCoord;\n  varying vec3 vLightWeighting;\n\n  void main (void) {\n    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);\n    // vColor = aVertexColor;\n    vTextureCoord = aTextureCoord;\n\n    if (uUseLighting) {\n      vLightWeighting = vec3(1.0, 1.0, 1.0);\n    } else {\n      vec3 transformedNormal = uNMatrix * aVertexNormal;\n      float directionalLightWeighting = max(0.0, dot(transformedNormal, uLightingDirection));\n      vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;\n    }\n  }\n";
var fragmentShaderSource = "\n  precision mediump float;\n  // varying vec4 vColor;\n  varying vec2 vTextureCoord;\n  varying vec3 vLightWeighting;\n\n  uniform sampler2D uSampler;\n  uniform float uAlpha;\n\n  void main(void) {\n    // gl_FragColor = vColor;\n    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n    // Adjust textureColor rgb value by light weight\n    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);\n    // gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a * uAlpha);\n  }\n"; ///// Prep Phase ///// 

function handleKeydown(e) {
  currentPressedKeys[e.keyCode] = true;
  cubes.forEach(function (cube) {
    if (e.keyCode === 70) {
      cube.currentCubeTextureIndex = (cube.currentCubeTextureIndex + 1) % 3;
    }
  });
}

function handleKeyup(e) {
  currentPressedKeys[e.keyCode] = false;
}

function prep() {
  gl = canvas.getContext('webgl');

  if (!gl) {
    alert('webgl is not supported');
    return;
  }

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);
} ///// Objects /////


function createArrayBuffer() {
  var verts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var vertsOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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

var Cube =
/*#__PURE__*/
function () {
  function Cube() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cube);

    var _options$isBlend = options.isBlend,
        isBlend = _options$isBlend === void 0 ? false : _options$isBlend,
        _options$x = options.x,
        x = _options$x === void 0 ? 0 : _options$x,
        _options$y = options.y,
        y = _options$y === void 0 ? 0 : _options$y,
        _options$z = options.z,
        z = _options$z === void 0 ? 0 : _options$z;
    this.isBlend = isBlend; // position

    this.x = x;
    this.y = y;
    this.z = z; // rotate speeds

    this.rotateSpeedX = 0;
    this.rotateSpeedY = 0;
    this.rotateSpeedZ = 0; // rotate radius

    this.rotateX = 0;
    this.rotateY = 0;
    this.rotateZ = 0; // vertex buffer

    this.cubeBuffer = null; // normal buffer

    this.cubeVertexNormalBuffer = null; // texture buffer

    this.cubeVertexTextureCoordBuffer = null;
    this.cubeTextures = [];
    this.currentCubeTextureIndex = 0;
  }

  _createClass(Cube, [{
    key: "initBuffer",
    value: function initBuffer() {
      this.cubeBuffer = createArrayBuffer([// front
      -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, // back
      -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // top
      -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, // bottom
      -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, // right
      1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, // left
      -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0], {
        itemSize: 3,
        numItems: 24
      });
      this.cubeVertexNormalBuffer = createArrayBuffer([// Front face
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // Back face
      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // Bottom face
      0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // Right face
      1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // Left face
      -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0], {
        itemSize: 3,
        numItems: 24
      });
      this.cubeVertexTextureCoordBuffer = createArrayBuffer([// Front face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, // Back face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, // Bottom face
      1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // Right face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, // Left face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], {
        itemSize: 2,
        numItems: 24
      });
      this.cubeVertexIndexBuffer = createArrayBuffer([0, 1, 2, 0, 2, 3, // Front face
      4, 5, 6, 4, 6, 7, // Back face
      8, 9, 10, 8, 10, 11, // Top face
      12, 13, 14, 12, 14, 15, // Bottom face
      16, 17, 18, 16, 18, 19, // Right face
      20, 21, 22, 20, 22, 23 // Left face
      ], {
        itemSize: 1,
        numItems: 36,
        vertDataConstructor: Uint16Array,
        bindTarget: gl.ELEMENT_ARRAY_BUFFER
      });
    }
  }, {
    key: "createTexture",
    value: function createTexture(image) {
      for (var i = 0; i < 3; i++) {
        var cubeTexture = gl.createTexture();
        cubeTexture.image = image;
        this.cubeTextures.push(cubeTexture);
      }

      this.handleTextureLoaded();
    }
  }, {
    key: "handleTextureLoaded",
    value: function handleTextureLoaded() {
      // Use three different filters
      gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[0]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.cubeTextures[0].image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[1]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.cubeTextures[1].image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[2]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.cubeTextures[2].image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  }, {
    key: "animate",
    value: function animate(dt) {
      this.rotateX += degToRad(dt * this.rotateSpeedX) / 100;
      this.rotateY += degToRad(dt * this.rotateSpeedY) / 100;
      this.rotateZ += degToRad(dt * this.rotateSpeedZ) / 100;
    }
  }, {
    key: "draw",
    value: function draw() {
      // Check if need to blend
      if (this.isBlend) {
        // Add blending effect to simulate transparency
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.uniform1f(shaderProgram.info.alphaUniform, 0.5);
      } else {
        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeBuffer);
      gl.vertexAttribPointer(shaderProgram.info.vertexPositionAttribute, this.cubeBuffer.info.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgram.info.textureCoordAttribute, this.cubeVertexTextureCoordBuffer.info.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer);
      gl.vertexAttribPointer(shaderProgram.info.vertexNormalAttribute, this.cubeVertexNormalBuffer.info.itemSize, gl.FLOAT, false, 0, 0); // Active texture

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.cubeTextures[this.currentCubeTextureIndex]);
      gl.uniform1i(shaderProgram.info.samplerUniform, 0); // Add light
      // TODO: add more interaction

      gl.uniform1i(shaderProgram.info.useLightingUniform, 'checked');
      gl.uniform3f(shaderProgram.info.ambientColorUniform, 0.2, 0.2, 0.2);
      gl.uniform3f(shaderProgram.info.directionalColorUniform, 0.8, 0.8, 0.8);
      var lightingDirection = [0.0, 0.0, -1.0];
      var adjustedLightDirection = vec3.create(); // Normalize so that the dot product is the same to cosine

      vec3.normalize(adjustedLightDirection, lightingDirection); // Reverse the direction

      vec3.scale(adjustedLightDirection, adjustedLightDirection, -1);
      gl.uniform3fv(shaderProgram.info.lightingDirectionUniform, adjustedLightDirection); // Specific to this model

      modelViewPushMatrix();
      mat4.translate(modelViewMatrix, modelViewMatrix, [this.x, this.y, this.z]);
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotateX, [1.0, 0.0, 0.0]);
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotateY, [0.0, 1.0, 0.0]);
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotateZ, [0.0, 0.0, 1.0]);
      setUniformMatrix();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
      gl.drawElements(gl.TRIANGLES, this.cubeVertexIndexBuffer.info.numItems, gl.UNSIGNED_SHORT, 0);
      modelViewPopMatrix();
    }
  }]);

  return Cube;
}(); ///// Init Phase ///// 


function createShader(type) {
  var shader;

  switch (type) {
    case 'vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(shader, vertexShaderSource);
      break;

    case 'fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(shader, fragmentShaderSource);
      break;

    default:
      throw new Error("Invalid shader type to create: ".concat(type));
  }

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // The shader is not correctly compiled
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
}

function createShaderProgram() {
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, createShader('vertex'));
  gl.attachShader(shaderProgram, createShader('fragment'));
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    // The shader program is not correctly linked
    throw new Error(gl.getProgramInfoLog(shaderProgram));
  }
}

function initShaders() {
  createShaderProgram();
  gl.useProgram(shaderProgram); // Put all attached information to shader program meta information

  shaderProgram.info = {};
  shaderProgram.info.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(shaderProgram.info.vertexPositionAttribute); // shaderProgram.info.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor')
  // gl.enableVertexAttribArray(shaderProgram.info.vertexColorAttribute)

  shaderProgram.info.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
  gl.enableVertexAttribArray(shaderProgram.info.textureCoordAttribute);
  shaderProgram.info.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
  gl.enableVertexAttribArray(shaderProgram.info.vertexNormalAttribute); // will put uniform here

  shaderProgram.info.projectionMatrixUniform = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
  shaderProgram.info.modelViewMatrixUniform = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
  shaderProgram.info.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
  shaderProgram.info.useLightingUniform = gl.getUniformLocation(shaderProgram, 'uUseLighting');
  shaderProgram.info.ambientColorUniform = gl.getUniformLocation(shaderProgram, 'uAmbientColor');
  shaderProgram.info.directionalColorUniform = gl.getUniformLocation(shaderProgram, 'uDirectionalColor');
  shaderProgram.info.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, 'uLightingDirection');
  shaderProgram.info.nMatrixUniform = gl.getUniformLocation(shaderProgram, 'uNMatrix');
  shaderProgram.info.alphaUniform = gl.getUniformLocation(shaderProgram, 'uAlpha');
} // function initTriangleBuffers () {
//   triangleBuffer = gl.createBuffer()
//   gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)
//   const verts = [
//     // front
//     0.0, 2.0, 0.0,
//     -1.0, 0.0, 1.0,
//     1.0, 0.0, 1.0,
//     // left
//     0.0, 2.0, 0.0,
//     -1.0, 0.0, 1.0,
//     -1.0, 0.0, -1.0,
//     // back
//     0.0, 2.0, 0.0,
//     -1.0, 0.0, -1.0,
//     1.0, 0.0, -1.0,
//     // right
//     0.0, 2.0, 0.0,
//     1.0, 0.0, -1.0,
//     1.0, 0.0, 1.0
//   ]
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW)
//   triangleBuffer.info = {
//     itemSize: 3,
//     numItems: 12
//   }
//   colorBuffer = gl.createBuffer()
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
//   const vertColors = [
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
//     1.0, 0.0, 0.0, 1.0,
//     0.0, 1.0, 0.0, 1.0,
//     0.0, 0.0, 1.0, 1.0,
//   ]
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertColors), gl.STATIC_DRAW)
//   colorBuffer.info = {
//     itemSize: 4,
//     numItems: 12
//   }
// }
// function initCubeBuffers () {
// //   cubeBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer)
// //   const verts = [
// //     // front
// //     -1.0, 1.0, 1.0,
// //     -1.0, -1.0, 1.0,
// //     1.0, -1.0, 1.0,
// //     1.0, 1.0, 1.0,
// //     // back
// //     -1.0, 1.0, -1.0,
// //     -1.0, -1.0, -1.0,
// //     1.0, -1.0, -1.0,
// //     1.0, 1.0, -1.0,
// //     // top
// //     -1.0, 1.0, 1.0,
// //     -1.0, 1.0, -1.0,
// //     1.0, 1.0, -1.0,
// //     1.0, 1.0, 1.0,
// //     // bottom
// //     -1.0, -1.0, 1.0,
// //     -1.0, -1.0, -1.0,
// //     1.0, -1.0, -1.0,
// //     1.0, -1.0, 1.0,
// //     // right
// //     1.0, 1.0, 1.0,
// //     1.0, 1.0, -1.0,
// //     1.0, -1.0, -1.0,
// //     1.0, -1.0, 1.0,
// //     // left
// //     -1.0, 1.0, 1.0,
// //     -1.0, 1.0, -1.0,
// //     -1.0, -1.0, -1.0,
// //     -1.0, -1.0, 1.0
// //   ]
// //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW)
// //   cubeBuffer.info = {
// //     itemSize: 3,
// //     numItems: 24
// //   }
// //   cubeVertexNormalBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer)
// //   const vertNormals = [
// //     // Front face
// //     0.0, 0.0, 1.0,
// //     0.0, 0.0, 1.0,
// //     0.0, 0.0, 1.0,
// //     0.0, 0.0, 1.0,
// //     // Back face
// //     0.0, 0.0, -1.0,
// //     0.0, 0.0, -1.0,
// //     0.0, 0.0, -1.0,
// //     0.0, 0.0, -1.0,
// //     // Top face
// //     0.0, 1.0, 0.0,
// //     0.0, 1.0, 0.0,
// //     0.0, 1.0, 0.0,
// //     0.0, 1.0, 0.0,
// //     // Bottom face
// //     0.0, -1.0, 0.0,
// //     0.0, -1.0, 0.0,
// //     0.0, -1.0, 0.0,
// //     0.0, -1.0, 0.0,
// //     // Right face
// //     1.0, 0.0, 0.0,
// //     1.0, 0.0, 0.0,
// //     1.0, 0.0, 0.0,
// //     1.0, 0.0, 0.0,
// //     // Left face
// //     -1.0, 0.0, 0.0,
// //     -1.0, 0.0, 0.0,
// //     -1.0, 0.0, 0.0,
// //     -1.0, 0.0, 0.0
// //   ]
// //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertNormals), gl.STATIC_DRAW)
// //   cubeVertexNormalBuffer.info = {
// //     itemSize: 3, 
// //     numItems: 24
// //   }
// //   cubeVertexTextureCoordBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer)
// //   const vertCoords = [
// //     // Front face
// //     0.0, 0.0,
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,
// //     // Back face
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,
// //     0.0, 0.0,
// //     // Top face
// //     0.0, 1.0,
// //     0.0, 0.0,
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     // Bottom face
// //     1.0, 1.0,
// //     0.0, 1.0,
// //     0.0, 0.0,
// //     1.0, 0.0,
// //     // Right face
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,
// //     0.0, 0.0,
// //     // Left face
// //     0.0, 0.0,
// //     1.0, 0.0,
// //     1.0, 1.0,
// //     0.0, 1.0,
// //   ]
// //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertCoords), gl.STATIC_DRAW)
// //   cubeVertexTextureCoordBuffer.info = {
// //     itemSize: 2,
// //     numItems: 24
// //   }
// // //   cubeColorBuffer = gl.createBuffer()
// // //   gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer)
// // //   const vertColors = [
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0,
// // //     1.0, 0.0, 0.0, 1.0,
// // //     0.0, 1.0, 0.0, 1.0,
// // //     0.0, 0.0, 1.0, 1.0,
// // //     0.0, 0.0, 0.0, 1.0
// // //   ]
// // //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertColors), gl.STATIC_DRAW)
// // //   cubeColorBuffer.info = {
// // //     itemSize: 4,
// // //     numItems: 24
// // //   }
// //   // When drawing, we are still drawing triangles.
// //   // We are going to use an index buffer to guide webgl to draw them at the right positions
// //   cubeVertexIndexBuffer = gl.createBuffer()
// //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer)
// //   let vertIndices = [
// //     0, 1, 2,      0, 2, 3,    // Front face
// //     4, 5, 6,      4, 6, 7,    // Back face
// //     8, 9, 10,     8, 10, 11,  // Top face
// //     12, 13, 14,   12, 14, 15, // Bottom face
// //     16, 17, 18,   16, 18, 19, // Right face
// //     20, 21, 22,   20, 22, 23  // Left face
// //   ]
// //   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertIndices), gl.STATIC_DRAW)
// //   cubeVertexIndexBuffer.info = {
// //     itemSize: 1, 
// //     numItems: 36
// //   }
// }


function initBuffers() {
  // initTriangleBuffers()
  // initCubeBuffers()
  cubes.forEach(function (cube) {
    return cube.initBuffer();
  });
} // function handleTextureLoaded () {
//   // Use three different filters
//   gl.bindTexture(gl.TEXTURE_2D, cubeTextures[0])
//   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeTextures[0].image)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
//   gl.bindTexture(gl.TEXTURE_2D, cubeTextures[1])
//   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeTextures[1].image)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
//   gl.bindTexture(gl.TEXTURE_2D, cubeTextures[2])
//   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeTextures[2].image)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
//   gl.generateMipmap(gl.TEXTURE_2D)
//   gl.bindTexture(gl.TEXTURE_2D, null)
// }


function initTexture() {
  var image = new Image();

  image.onload = function () {
    cubes.forEach(function (cube) {
      return cube.createTexture(image);
    }); // handleTextureLoaded()
  }; // Need to request CORS (Cross Origin Resource Sharing)


  image.crossOrigin = ''; // Can only use power of 2 size images
  // image.src = 'https://cdn6.aptoide.com/imgs/8/5/f/85fd58c917dbf46ae064da7c7299182e_icon.png'
  // image.src = 'https://c2.staticflickr.com/4/3408/3271626596_33347fac19_o.png'
  // image.src = '../crate.gif'

  image.src = __WEBPACK_IMPORTED_MODULE_0__textures_duck_png___default.a;
}

function init() {
  for (var i = 0; i < 20; i++) {
    cubes.push(new Cube({
      isBlend: true,
      x: Math.random() * 20 - 10,
      y: Math.random() * 20 - 10,
      z: -20
    }));
  }

  initShaders();
  initBuffers();
  initTexture();
} ///// Draw Phase ///// 


function resizeCanvas(width, height) {
  canvas.width = width;
  canvas.height = height;
}

function setUniformMatrix() {
  gl.uniformMatrix4fv(shaderProgram.info.projectionMatrixUniform, false, projectionMatrix);
  gl.uniformMatrix4fv(shaderProgram.info.modelViewMatrixUniform, false, modelViewMatrix); // Get the right normal matrix

  var normalMatrix = mat3.create(); // mat3.fromMat4(normalMatrix, modelViewMatrix)
  // mat3.invert(normalMatrix, normalMatrix)
  // // mat4.toInverseMat3(modelViewMatrix, normalMatrix)
  // mat3.transpose(normalMatrix, normalMatrix)

  mat3.normalFromMat4(normalMatrix, modelViewMatrix);
  gl.uniformMatrix3fv(shaderProgram.info.nMatrixUniform, false, normalMatrix);
} // function drawTriangle (dt) {
//   gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)
//   gl.vertexAttribPointer(shaderProgram.info.vertexPositionAttribute, triangleBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
//   gl.vertexAttribPointer(shaderProgram.info.vertexColorAttribute, colorBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
//   // Specific to this model
//   modelViewPushMatrix()
//   mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.5, -5])
//   mat4.rotate(modelViewMatrix, modelViewMatrix, (rotateY += Math.PI * 0.001 * dt % (Math.PI * 2)), [0.0, 1.0, 0.0])
//   setUniformMatrix()
//   gl.drawArrays(gl.TRIANGLES, 0, triangleBuffer.info.numItems)
//   modelViewPopMatrix()
// }


function drawCube() {// gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer)
  // gl.vertexAttribPointer(shaderProgram.info.vertexPositionAttribute, cubeBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
  // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer)
  // gl.vertexAttribPointer(shaderProgram.info.textureCoordAttribute, cubeVertexTextureCoordBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
  // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer)
  // gl.vertexAttribPointer(shaderProgram.info.vertexNormalAttribute, cubeVertexNormalBuffer.info.itemSize, gl.FLOAT, false, 0, 0)
  // // Active texture
  // gl.activeTexture(gl.TEXTURE0)
  // gl.bindTexture(gl.TEXTURE_2D, cubeTextures[currentCubeTextureIndex])
  // gl.uniform1i(shaderProgram.info.samplerUniform, 0)
  // // Add light
  // // TODO: add more interaction
  // gl.uniform1i(shaderProgram.info.useLightingUniform, 'checked')
  // gl.uniform3f(shaderProgram.info.ambientColorUniform, 0.2, 0.2, 0.2)
  // gl.uniform3f(shaderProgram.info.directionalColorUniform, 0.8, 0.8, 0.8)
  // let lightingDirection = [
  //   0.0, 0.0, -1.0
  // ]
  // let adjustedLightDirection = vec3.create()
  // // Normalize so that the dot product is the same to cosine
  // vec3.normalize(adjustedLightDirection, lightingDirection)
  // // Reverse the direction
  // vec3.scale(adjustedLightDirection, adjustedLightDirection, -1)
  // gl.uniform3fv(shaderProgram.info.lightingDirectionUniform, adjustedLightDirection)
  // // Specific to this model
  // modelViewPushMatrix()
  // mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, z])
  // mat4.rotate(modelViewMatrix, modelViewMatrix, rotateX, [1.0, 0.0, 0.0])
  // mat4.rotate(modelViewMatrix, modelViewMatrix, rotateY, [0.0, 1.0, 0.0])
  // mat4.rotate(modelViewMatrix, modelViewMatrix, rotateZ, [0.0, 0.0, 1.0])
  // setUniformMatrix()
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer)
  // gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.info.numItems, gl.UNSIGNED_SHORT, 0)
  // modelViewPopMatrix()
}

function drawScene() {
  resizeCanvas(500, 500);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(projectionMatrix, 45, canvas.width / canvas.height, 0.1, 100);
  mat4.identity(modelViewMatrix); // drawTriangle(dt)

  cubes.forEach(function (cube) {
    return cube.draw();
  }); // drawCube()
}

function draw(dt) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  drawScene();
}

function animate(dt) {
  cubes.forEach(function (cube) {
    return cube.animate(dt);
  }); // rotateX += degToRad(dt * rotateSpeedX) / 100
  // rotateY += degToRad(dt * rotateSpeedY) / 100
  // rotateZ += degToRad(dt * rotateSpeedZ) / 100
}

function handleKeys(dt) {
  cubes.forEach(function (cube) {
    // Calculate rotations
    // up
    if (currentPressedKeys[38] && cube.rotateSpeedX > -50) {
      cube.rotateSpeedX -= 0.3;
    } // down


    if (currentPressedKeys[40] && cube.rotateSpeedX < 50) {
      cube.rotateSpeedX += 0.3;
    } // left


    if (currentPressedKeys[37] && cube.rotateSpeedY > -50) {
      cube.rotateSpeedY -= 0.3;
    } // up


    if (currentPressedKeys[39] && cube.rotateSpeedY < 50) {
      cube.rotateSpeedY += 0.3;
    } // zoom out


    if (currentPressedKeys[49] && cube.z > -30) {
      cube.z -= 0.2;
    } // zoom in


    if (currentPressedKeys[50] && cube.z < -1) {
      cube.z += 0.2;
    }
  });
}

function tick(dt) {
  animate(dt);
  handleKeys(dt);
  draw(dt);
} // Animation loop


var fps = 60;

function loop(cb) {
  var dt = 1000 / fps;
  var now = Date.now();
  loop.duration = (loop.duration || 0) + now - (loop.lastRun || now);

  while (loop.duration >= dt) {
    cb(dt);
    loop.duration -= dt;
  }

  loop.lastRun = now;
  window.requestAnimationFrame(function () {
    return loop(cb);
  });
}

function run() {
  prep();
  init();
  loop(tick);
}

run();

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYTE2MDY0ZTEwNWNhNWUyZjllNiIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4dHVyZXMvZHVjay5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhbXBsZS5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2wiLCJzaGFkZXJQcm9ncmFtIiwidHJpYW5nbGVCdWZmZXIiLCJjdWJlQnVmZmVyIiwiY3ViZVZlcnRleEluZGV4QnVmZmVyIiwiY29sb3JCdWZmZXIiLCJjdWJlQ29sb3JCdWZmZXIiLCJjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyIiwiY3ViZVZlcnRleE5vcm1hbEJ1ZmZlciIsInByb2plY3Rpb25NYXRyaXgiLCJtYXQ0IiwiY3JlYXRlIiwibW9kZWxWaWV3TWF0cml4Iiwicm90YXRlWCIsInJvdGF0ZVkiLCJyb3RhdGVaIiwicm90YXRlU3BlZWRYIiwicm90YXRlU3BlZWRZIiwicm90YXRlU3BlZWRaIiwiY3VycmVudFByZXNzZWRLZXlzIiwiY3ViZVRleHR1cmVzIiwiY3VycmVudEN1YmVUZXh0dXJlSW5kZXgiLCJ6IiwiY3ViZXMiLCJtb2RlbFZpZXdNYXRyaXhTdGFjayIsIm1vZGVsVmlld1B1c2hNYXRyaXgiLCJjb3B5IiwicHVzaCIsIm1vZGVsVmlld1BvcE1hdHJpeCIsImxlbmd0aCIsIkVycm9yIiwicG9wIiwiZGVnVG9SYWQiLCJkZWciLCJNYXRoIiwiUEkiLCJ2ZXJ0ZXhTaGFkZXJTb3VyY2UiLCJmcmFnbWVudFNoYWRlclNvdXJjZSIsImhhbmRsZUtleWRvd24iLCJlIiwia2V5Q29kZSIsImZvckVhY2giLCJjdWJlIiwiaGFuZGxlS2V5dXAiLCJwcmVwIiwiZ2V0Q29udGV4dCIsImFsZXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZUFycmF5QnVmZmVyIiwidmVydHMiLCJ2ZXJ0c09wdGlvbiIsInZlcnREYXRhQ29uc3RydWN0b3IiLCJGbG9hdDMyQXJyYXkiLCJiaW5kVGFyZ2V0IiwiQVJSQVlfQlVGRkVSIiwiaXRlbVNpemUiLCJudW1JdGVtcyIsImNyZWF0ZUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJidWZmZXJEYXRhIiwiU1RBVElDX0RSQVciLCJpbmZvIiwiQ3ViZSIsIm9wdGlvbnMiLCJpc0JsZW5kIiwieCIsInkiLCJVaW50MTZBcnJheSIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiaW1hZ2UiLCJpIiwiY3ViZVRleHR1cmUiLCJjcmVhdGVUZXh0dXJlIiwiaGFuZGxlVGV4dHVyZUxvYWRlZCIsImJpbmRUZXh0dXJlIiwiVEVYVFVSRV8yRCIsInBpeGVsU3RvcmVpIiwiVU5QQUNLX0ZMSVBfWV9XRUJHTCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsInRleFBhcmFtZXRlcmkiLCJURVhUVVJFX01BR19GSUxURVIiLCJORUFSRVNUIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiTElORUFSIiwiTElORUFSX01JUE1BUF9ORUFSRVNUIiwiZ2VuZXJhdGVNaXBtYXAiLCJkdCIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORSIsImVuYWJsZSIsIkJMRU5EIiwiZGlzYWJsZSIsIkRFUFRIX1RFU1QiLCJ1bmlmb3JtMWYiLCJhbHBoYVVuaWZvcm0iLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwidmVydGV4UG9zaXRpb25BdHRyaWJ1dGUiLCJGTE9BVCIsInRleHR1cmVDb29yZEF0dHJpYnV0ZSIsInZlcnRleE5vcm1hbEF0dHJpYnV0ZSIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInVuaWZvcm0xaSIsInNhbXBsZXJVbmlmb3JtIiwidXNlTGlnaHRpbmdVbmlmb3JtIiwidW5pZm9ybTNmIiwiYW1iaWVudENvbG9yVW5pZm9ybSIsImRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtIiwibGlnaHRpbmdEaXJlY3Rpb24iLCJhZGp1c3RlZExpZ2h0RGlyZWN0aW9uIiwidmVjMyIsIm5vcm1hbGl6ZSIsInNjYWxlIiwidW5pZm9ybTNmdiIsImxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsInNldFVuaWZvcm1NYXRyaXgiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsImNyZWF0ZVNoYWRlciIsInR5cGUiLCJzaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiRlJBR01FTlRfU0hBREVSIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImNyZWF0ZVNoYWRlclByb2dyYW0iLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJnZXRQcm9ncmFtSW5mb0xvZyIsImluaXRTaGFkZXJzIiwidXNlUHJvZ3JhbSIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJwcm9qZWN0aW9uTWF0cml4VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsIm1vZGVsVmlld01hdHJpeFVuaWZvcm0iLCJuTWF0cml4VW5pZm9ybSIsImluaXRCdWZmZXJzIiwiaW5pdEJ1ZmZlciIsImluaXRUZXh0dXJlIiwiSW1hZ2UiLCJvbmxvYWQiLCJjcm9zc09yaWdpbiIsInNyYyIsImluaXQiLCJyYW5kb20iLCJyZXNpemVDYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsInVuaWZvcm1NYXRyaXg0ZnYiLCJub3JtYWxNYXRyaXgiLCJtYXQzIiwibm9ybWFsRnJvbU1hdDQiLCJ1bmlmb3JtTWF0cml4M2Z2IiwiZHJhd0N1YmUiLCJkcmF3U2NlbmUiLCJ2aWV3cG9ydCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJwZXJzcGVjdGl2ZSIsImlkZW50aXR5IiwiZHJhdyIsImNsZWFyQ29sb3IiLCJhbmltYXRlIiwiaGFuZGxlS2V5cyIsInRpY2siLCJmcHMiLCJsb29wIiwiY2IiLCJub3ciLCJEYXRlIiwiZHVyYXRpb24iLCJsYXN0UnVuIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicnVuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQSxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0F4QztBQUVBLElBQU1BLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQWY7QUFDQSxJQUFJQyxFQUFKO0FBQ0EsSUFBSUMsYUFBSjtBQUNBLElBQUlDLGNBQUo7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMscUJBQUo7QUFDQSxJQUFJQyxXQUFKO0FBQ0EsSUFBSUMsZUFBSixDLENBQ0E7O0FBQ0EsSUFBSUMsNEJBQUo7QUFDQSxJQUFJQyxzQkFBSjtBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxJQUFJLENBQUNDLE1BQUwsRUFBdkI7QUFDQSxJQUFJQyxlQUFlLEdBQUdGLElBQUksQ0FBQ0MsTUFBTCxFQUF0QjtBQUNBLElBQUlFLE9BQU8sR0FBRyxDQUFkO0FBQ0EsSUFBSUMsT0FBTyxHQUFHLENBQWQ7QUFDQSxJQUFJQyxPQUFPLEdBQUcsQ0FBZDtBQUNBLElBQUlDLFlBQVksR0FBRyxDQUFuQjtBQUNBLElBQUlDLFlBQVksR0FBRyxDQUFuQjtBQUNBLElBQUlDLFlBQVksR0FBRyxDQUFuQjtBQUNBLElBQUlDLGtCQUFrQixHQUFHLEVBQXpCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEVBQW5CO0FBQ0EsSUFBSUMsdUJBQXVCLEdBQUcsQ0FBOUI7QUFDQSxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxDQUFUO0FBRUEsSUFBSUMsS0FBSyxHQUFHLEVBQVosQyxDQUVBOztBQUNBLElBQU1DLG9CQUFvQixHQUFHLEVBQTdCOztBQUNBLFNBQVNDLG1CQUFULEdBQWdDO0FBQzlCLE1BQUlDLElBQUksR0FBR2hCLElBQUksQ0FBQ0MsTUFBTCxFQUFYO0FBQ0FELE1BQUksQ0FBQ2dCLElBQUwsQ0FBVUEsSUFBVixFQUFnQmQsZUFBaEI7QUFDQVksc0JBQW9CLENBQUNHLElBQXJCLENBQTBCRCxJQUExQjtBQUNEOztBQUVELFNBQVNFLGtCQUFULEdBQStCO0FBQzdCLE1BQUlKLG9CQUFvQixDQUFDSyxNQUFyQixLQUFnQyxDQUFwQyxFQUF1QztBQUNyQyxVQUFNLElBQUlDLEtBQUosQ0FBVSwrQkFBVixDQUFOO0FBQ0Q7O0FBRURsQixpQkFBZSxHQUFHWSxvQkFBb0IsQ0FBQ08sR0FBckIsRUFBbEI7QUFDRDs7QUFFRCxTQUFTQyxRQUFULENBQW1CQyxHQUFuQixFQUF3QjtBQUN0QixTQUFPQSxHQUFHLEdBQUcsR0FBTixHQUFZQyxJQUFJLENBQUNDLEVBQXhCO0FBQ0QsQyxDQUVEOzs7QUFDQSxJQUFNQyxrQkFBa0IsNDlCQUF4QjtBQW1DQSxJQUFNQyxvQkFBb0IsdWlCQUExQixDLENBa0JBOztBQUNBLFNBQVNDLGFBQVQsQ0FBd0JDLENBQXhCLEVBQTJCO0FBQ3pCcEIsb0JBQWtCLENBQUNvQixDQUFDLENBQUNDLE9BQUgsQ0FBbEIsR0FBZ0MsSUFBaEM7QUFFQWpCLE9BQUssQ0FBQ2tCLE9BQU4sQ0FBYyxVQUFBQyxJQUFJLEVBQUk7QUFDcEIsUUFBSUgsQ0FBQyxDQUFDQyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEJFLFVBQUksQ0FBQ3JCLHVCQUFMLEdBQStCLENBQUNxQixJQUFJLENBQUNyQix1QkFBTCxHQUErQixDQUFoQyxJQUFxQyxDQUFwRTtBQUNEO0FBQ0YsR0FKRDtBQUtEOztBQUVELFNBQVNzQixXQUFULENBQXNCSixDQUF0QixFQUF5QjtBQUN2QnBCLG9CQUFrQixDQUFDb0IsQ0FBQyxDQUFDQyxPQUFILENBQWxCLEdBQWdDLEtBQWhDO0FBQ0Q7O0FBRUQsU0FBU0ksSUFBVCxHQUFpQjtBQUNmNUMsSUFBRSxHQUFHSCxNQUFNLENBQUNnRCxVQUFQLENBQWtCLE9BQWxCLENBQUw7O0FBRUEsTUFBSSxDQUFDN0MsRUFBTCxFQUFTO0FBQ1A4QyxTQUFLLENBQUMsd0JBQUQsQ0FBTDtBQUNBO0FBQ0Q7O0FBRURoRCxVQUFRLENBQUNpRCxnQkFBVCxDQUEwQixTQUExQixFQUFxQ1QsYUFBckM7QUFDQXhDLFVBQVEsQ0FBQ2lELGdCQUFULENBQTBCLE9BQTFCLEVBQW1DSixXQUFuQztBQUNELEMsQ0FFRDs7O0FBQ0EsU0FBU0ssaUJBQVQsR0FBMEQ7QUFBQSxNQUE5QkMsS0FBOEIsdUVBQXRCLEVBQXNCO0FBQUEsTUFBbEJDLFdBQWtCLHVFQUFKLEVBQUk7QUFBQSw4QkFNcERBLFdBTm9ELENBRXREQyxtQkFGc0Q7QUFBQSxNQUV0REEsbUJBRnNELHNDQUVoQ0MsWUFGZ0M7QUFBQSw4QkFNcERGLFdBTm9ELENBR3RERyxVQUhzRDtBQUFBLE1BR3REQSxVQUhzRCxzQ0FHekNyRCxFQUFFLENBQUNzRCxZQUhzQztBQUFBLDhCQU1wREosV0FOb0QsQ0FJdERLLFFBSnNEO0FBQUEsTUFJdERBLFFBSnNELHNDQUkzQyxDQUoyQztBQUFBLDhCQU1wREwsV0FOb0QsQ0FLdERNLFFBTHNEO0FBQUEsTUFLdERBLFFBTHNELHNDQUszQ1AsS0FBSyxDQUFDcEIsTUFMcUM7QUFReEQsTUFBTTFCLFVBQVUsR0FBR0gsRUFBRSxDQUFDeUQsWUFBSCxFQUFuQjtBQUNBekQsSUFBRSxDQUFDMEQsVUFBSCxDQUFjTCxVQUFkLEVBQTBCbEQsVUFBMUI7QUFFQUgsSUFBRSxDQUFDMkQsVUFBSCxDQUFjTixVQUFkLEVBQTBCLElBQUlGLG1CQUFKLENBQXdCRixLQUF4QixDQUExQixFQUEwRGpELEVBQUUsQ0FBQzRELFdBQTdEO0FBQ0F6RCxZQUFVLENBQUMwRCxJQUFYLEdBQWtCO0FBQ2hCTixZQUFRLEVBQVJBLFFBRGdCO0FBRWhCQyxZQUFRLEVBQVJBO0FBRmdCLEdBQWxCO0FBS0EsU0FBT3JELFVBQVA7QUFDRDs7SUFFSzJELEk7OztBQUNKLGtCQUEyQjtBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFBQSwyQkFNckJBLE9BTnFCLENBRXZCQyxPQUZ1QjtBQUFBLFFBRXZCQSxPQUZ1QixpQ0FFYixLQUZhO0FBQUEscUJBTXJCRCxPQU5xQixDQUd2QkUsQ0FIdUI7QUFBQSxRQUd2QkEsQ0FIdUIsMkJBR25CLENBSG1CO0FBQUEscUJBTXJCRixPQU5xQixDQUl2QkcsQ0FKdUI7QUFBQSxRQUl2QkEsQ0FKdUIsMkJBSW5CLENBSm1CO0FBQUEscUJBTXJCSCxPQU5xQixDQUt2QnpDLENBTHVCO0FBQUEsUUFLdkJBLENBTHVCLDJCQUtuQixDQUxtQjtBQVF6QixTQUFLMEMsT0FBTCxHQUFlQSxPQUFmLENBUnlCLENBVXpCOztBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUs1QyxDQUFMLEdBQVNBLENBQVQsQ0FieUIsQ0FlekI7O0FBQ0EsU0FBS04sWUFBTCxHQUFvQixDQUFwQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLENBQXBCLENBbEJ5QixDQW9CekI7O0FBQ0EsU0FBS0wsT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFmLENBdkJ5QixDQXlCekI7O0FBQ0EsU0FBS1osVUFBTCxHQUFrQixJQUFsQixDQTFCeUIsQ0E0QnpCOztBQUNBLFNBQUtLLHNCQUFMLEdBQThCLElBQTlCLENBN0J5QixDQStCekI7O0FBQ0EsU0FBS0QsNEJBQUwsR0FBb0MsSUFBcEM7QUFDQSxTQUFLYSxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsU0FBS0MsdUJBQUwsR0FBK0IsQ0FBL0I7QUFDRDs7OztpQ0FFYTtBQUNaLFdBQUtsQixVQUFMLEdBQWtCNkMsaUJBQWlCLENBQUMsQ0FDbEM7QUFDQSxPQUFDLEdBRmlDLEVBRTVCLEdBRjRCLEVBRXZCLEdBRnVCLEVBR2xDLENBQUMsR0FIaUMsRUFHNUIsQ0FBQyxHQUgyQixFQUd0QixHQUhzQixFQUlsQyxHQUprQyxFQUk3QixDQUFDLEdBSjRCLEVBSXZCLEdBSnVCLEVBS2xDLEdBTGtDLEVBSzdCLEdBTDZCLEVBS3hCLEdBTHdCLEVBT2xDO0FBQ0EsT0FBQyxHQVJpQyxFQVE1QixHQVI0QixFQVF2QixDQUFDLEdBUnNCLEVBU2xDLENBQUMsR0FUaUMsRUFTNUIsQ0FBQyxHQVQyQixFQVN0QixDQUFDLEdBVHFCLEVBVWxDLEdBVmtDLEVBVTdCLENBQUMsR0FWNEIsRUFVdkIsQ0FBQyxHQVZzQixFQVdsQyxHQVhrQyxFQVc3QixHQVg2QixFQVd4QixDQUFDLEdBWHVCLEVBYWxDO0FBQ0EsT0FBQyxHQWRpQyxFQWM1QixHQWQ0QixFQWN2QixHQWR1QixFQWVsQyxDQUFDLEdBZmlDLEVBZTVCLEdBZjRCLEVBZXZCLENBQUMsR0Fmc0IsRUFnQmxDLEdBaEJrQyxFQWdCN0IsR0FoQjZCLEVBZ0J4QixDQUFDLEdBaEJ1QixFQWlCbEMsR0FqQmtDLEVBaUI3QixHQWpCNkIsRUFpQnhCLEdBakJ3QixFQW1CbEM7QUFDQSxPQUFDLEdBcEJpQyxFQW9CNUIsQ0FBQyxHQXBCMkIsRUFvQnRCLEdBcEJzQixFQXFCbEMsQ0FBQyxHQXJCaUMsRUFxQjVCLENBQUMsR0FyQjJCLEVBcUJ0QixDQUFDLEdBckJxQixFQXNCbEMsR0F0QmtDLEVBc0I3QixDQUFDLEdBdEI0QixFQXNCdkIsQ0FBQyxHQXRCc0IsRUF1QmxDLEdBdkJrQyxFQXVCN0IsQ0FBQyxHQXZCNEIsRUF1QnZCLEdBdkJ1QixFQXlCbEM7QUFDQSxTQTFCa0MsRUEwQjdCLEdBMUI2QixFQTBCeEIsR0ExQndCLEVBMkJsQyxHQTNCa0MsRUEyQjdCLEdBM0I2QixFQTJCeEIsQ0FBQyxHQTNCdUIsRUE0QmxDLEdBNUJrQyxFQTRCN0IsQ0FBQyxHQTVCNEIsRUE0QnZCLENBQUMsR0E1QnNCLEVBNkJsQyxHQTdCa0MsRUE2QjdCLENBQUMsR0E3QjRCLEVBNkJ2QixHQTdCdUIsRUErQmxDO0FBQ0EsT0FBQyxHQWhDaUMsRUFnQzVCLEdBaEM0QixFQWdDdkIsR0FoQ3VCLEVBaUNsQyxDQUFDLEdBakNpQyxFQWlDNUIsR0FqQzRCLEVBaUN2QixDQUFDLEdBakNzQixFQWtDbEMsQ0FBQyxHQWxDaUMsRUFrQzVCLENBQUMsR0FsQzJCLEVBa0N0QixDQUFDLEdBbENxQixFQW1DbEMsQ0FBQyxHQW5DaUMsRUFtQzVCLENBQUMsR0FuQzJCLEVBbUN0QixHQW5Dc0IsQ0FBRCxFQW9DaEM7QUFDRE8sZ0JBQVEsRUFBRSxDQURUO0FBRURDLGdCQUFRLEVBQUU7QUFGVCxPQXBDZ0MsQ0FBbkM7QUF5Q0EsV0FBS2hELHNCQUFMLEdBQThCd0MsaUJBQWlCLENBQUMsQ0FDOUM7QUFDQSxTQUY4QyxFQUV6QyxHQUZ5QyxFQUVwQyxHQUZvQyxFQUc5QyxHQUg4QyxFQUd6QyxHQUh5QyxFQUdwQyxHQUhvQyxFQUk5QyxHQUo4QyxFQUl6QyxHQUp5QyxFQUlwQyxHQUpvQyxFQUs5QyxHQUw4QyxFQUt6QyxHQUx5QyxFQUtwQyxHQUxvQyxFQU85QztBQUNBLFNBUjhDLEVBUXpDLEdBUnlDLEVBUXBDLENBQUMsR0FSbUMsRUFTOUMsR0FUOEMsRUFTekMsR0FUeUMsRUFTcEMsQ0FBQyxHQVRtQyxFQVU5QyxHQVY4QyxFQVV6QyxHQVZ5QyxFQVVwQyxDQUFDLEdBVm1DLEVBVzlDLEdBWDhDLEVBV3pDLEdBWHlDLEVBV3BDLENBQUMsR0FYbUMsRUFhOUM7QUFDQSxTQWQ4QyxFQWN6QyxHQWR5QyxFQWNwQyxHQWRvQyxFQWU5QyxHQWY4QyxFQWV6QyxHQWZ5QyxFQWVwQyxHQWZvQyxFQWdCOUMsR0FoQjhDLEVBZ0J6QyxHQWhCeUMsRUFnQnBDLEdBaEJvQyxFQWlCOUMsR0FqQjhDLEVBaUJ6QyxHQWpCeUMsRUFpQnBDLEdBakJvQyxFQW1COUM7QUFDQSxTQXBCOEMsRUFvQnpDLENBQUMsR0FwQndDLEVBb0JuQyxHQXBCbUMsRUFxQjlDLEdBckI4QyxFQXFCekMsQ0FBQyxHQXJCd0MsRUFxQm5DLEdBckJtQyxFQXNCOUMsR0F0QjhDLEVBc0J6QyxDQUFDLEdBdEJ3QyxFQXNCbkMsR0F0Qm1DLEVBdUI5QyxHQXZCOEMsRUF1QnpDLENBQUMsR0F2QndDLEVBdUJuQyxHQXZCbUMsRUF5QjlDO0FBQ0EsU0ExQjhDLEVBMEJ6QyxHQTFCeUMsRUEwQnBDLEdBMUJvQyxFQTJCOUMsR0EzQjhDLEVBMkJ6QyxHQTNCeUMsRUEyQnBDLEdBM0JvQyxFQTRCOUMsR0E1QjhDLEVBNEJ6QyxHQTVCeUMsRUE0QnBDLEdBNUJvQyxFQTZCOUMsR0E3QjhDLEVBNkJ6QyxHQTdCeUMsRUE2QnBDLEdBN0JvQyxFQStCOUM7QUFDQSxPQUFDLEdBaEM2QyxFQWdDeEMsR0FoQ3dDLEVBZ0NuQyxHQWhDbUMsRUFpQzlDLENBQUMsR0FqQzZDLEVBaUN4QyxHQWpDd0MsRUFpQ25DLEdBakNtQyxFQWtDOUMsQ0FBQyxHQWxDNkMsRUFrQ3hDLEdBbEN3QyxFQWtDbkMsR0FsQ21DLEVBbUM5QyxDQUFDLEdBbkM2QyxFQW1DeEMsR0FuQ3dDLEVBbUNuQyxHQW5DbUMsQ0FBRCxFQW9DNUM7QUFDRE8sZ0JBQVEsRUFBRSxDQURUO0FBRURDLGdCQUFRLEVBQUU7QUFGVCxPQXBDNEMsQ0FBL0M7QUF5Q0EsV0FBS2pELDRCQUFMLEdBQW9DeUMsaUJBQWlCLENBQUMsQ0FDcEQ7QUFDQSxTQUZvRCxFQUUvQyxHQUYrQyxFQUdwRCxHQUhvRCxFQUcvQyxHQUgrQyxFQUlwRCxHQUpvRCxFQUkvQyxHQUorQyxFQUtwRCxHQUxvRCxFQUsvQyxHQUwrQyxFQU9wRDtBQUNBLFNBUm9ELEVBUS9DLEdBUitDLEVBU3BELEdBVG9ELEVBUy9DLEdBVCtDLEVBVXBELEdBVm9ELEVBVS9DLEdBVitDLEVBV3BELEdBWG9ELEVBVy9DLEdBWCtDLEVBYXBEO0FBQ0EsU0Fkb0QsRUFjL0MsR0FkK0MsRUFlcEQsR0Fmb0QsRUFlL0MsR0FmK0MsRUFnQnBELEdBaEJvRCxFQWdCL0MsR0FoQitDLEVBaUJwRCxHQWpCb0QsRUFpQi9DLEdBakIrQyxFQW1CcEQ7QUFDQSxTQXBCb0QsRUFvQi9DLEdBcEIrQyxFQXFCcEQsR0FyQm9ELEVBcUIvQyxHQXJCK0MsRUFzQnBELEdBdEJvRCxFQXNCL0MsR0F0QitDLEVBdUJwRCxHQXZCb0QsRUF1Qi9DLEdBdkIrQyxFQXlCcEQ7QUFDQSxTQTFCb0QsRUEwQi9DLEdBMUIrQyxFQTJCcEQsR0EzQm9ELEVBMkIvQyxHQTNCK0MsRUE0QnBELEdBNUJvRCxFQTRCL0MsR0E1QitDLEVBNkJwRCxHQTdCb0QsRUE2Qi9DLEdBN0IrQyxFQStCcEQ7QUFDQSxTQWhDb0QsRUFnQy9DLEdBaEMrQyxFQWlDcEQsR0FqQ29ELEVBaUMvQyxHQWpDK0MsRUFrQ3BELEdBbENvRCxFQWtDL0MsR0FsQytDLEVBbUNwRCxHQW5Db0QsRUFtQy9DLEdBbkMrQyxDQUFELEVBb0NsRDtBQUNETyxnQkFBUSxFQUFFLENBRFQ7QUFFREMsZ0JBQVEsRUFBRTtBQUZULE9BcENrRCxDQUFyRDtBQXlDQSxXQUFLcEQscUJBQUwsR0FBNkI0QyxpQkFBaUIsQ0FBQyxDQUM3QyxDQUQ2QyxFQUMxQyxDQUQwQyxFQUN2QyxDQUR1QyxFQUMvQixDQUQrQixFQUM1QixDQUQ0QixFQUN6QixDQUR5QixFQUNuQjtBQUMxQixPQUY2QyxFQUUxQyxDQUYwQyxFQUV2QyxDQUZ1QyxFQUUvQixDQUYrQixFQUU1QixDQUY0QixFQUV6QixDQUZ5QixFQUVuQjtBQUMxQixPQUg2QyxFQUcxQyxDQUgwQyxFQUd2QyxFQUh1QyxFQUcvQixDQUgrQixFQUc1QixFQUg0QixFQUd4QixFQUh3QixFQUduQjtBQUMxQixRQUo2QyxFQUl6QyxFQUp5QyxFQUlyQyxFQUpxQyxFQUkvQixFQUorQixFQUkzQixFQUoyQixFQUl2QixFQUp1QixFQUluQjtBQUMxQixRQUw2QyxFQUt6QyxFQUx5QyxFQUtyQyxFQUxxQyxFQUsvQixFQUwrQixFQUszQixFQUwyQixFQUt2QixFQUx1QixFQUtuQjtBQUMxQixRQU42QyxFQU16QyxFQU55QyxFQU1yQyxFQU5xQyxFQU0vQixFQU4rQixFQU0zQixFQU4yQixFQU12QixFQU51QixDQU1uQjtBQU5tQixPQUFELEVBTzNDO0FBQ0RPLGdCQUFRLEVBQUUsQ0FEVDtBQUVEQyxnQkFBUSxFQUFFLEVBRlQ7QUFHREwsMkJBQW1CLEVBQUVnQixXQUhwQjtBQUlEZCxrQkFBVSxFQUFFckQsRUFBRSxDQUFDb0U7QUFKZCxPQVAyQyxDQUE5QztBQWFEOzs7a0NBRWNDLEssRUFBTztBQUNwQixXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDMUIsWUFBTUMsV0FBVyxHQUFHdkUsRUFBRSxDQUFDd0UsYUFBSCxFQUFwQjtBQUNBRCxtQkFBVyxDQUFDRixLQUFaLEdBQW9CQSxLQUFwQjtBQUNBLGFBQUtqRCxZQUFMLENBQWtCTyxJQUFsQixDQUF1QjRDLFdBQXZCO0FBQ0Q7O0FBRUQsV0FBS0UsbUJBQUw7QUFDRDs7OzBDQUVzQjtBQUNyQjtBQUNBekUsUUFBRSxDQUFDMEUsV0FBSCxDQUFlMUUsRUFBRSxDQUFDMkUsVUFBbEIsRUFBOEIsS0FBS3ZELFlBQUwsQ0FBa0IsQ0FBbEIsQ0FBOUI7QUFDQXBCLFFBQUUsQ0FBQzRFLFdBQUgsQ0FBZTVFLEVBQUUsQ0FBQzZFLG1CQUFsQixFQUF1QyxJQUF2QztBQUNBN0UsUUFBRSxDQUFDOEUsVUFBSCxDQUFjOUUsRUFBRSxDQUFDMkUsVUFBakIsRUFBNkIsQ0FBN0IsRUFBZ0MzRSxFQUFFLENBQUMrRSxJQUFuQyxFQUF5Qy9FLEVBQUUsQ0FBQytFLElBQTVDLEVBQWtEL0UsRUFBRSxDQUFDZ0YsYUFBckQsRUFBb0UsS0FBSzVELFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJpRCxLQUF6RjtBQUNBckUsUUFBRSxDQUFDaUYsYUFBSCxDQUFpQmpGLEVBQUUsQ0FBQzJFLFVBQXBCLEVBQWdDM0UsRUFBRSxDQUFDa0Ysa0JBQW5DLEVBQXVEbEYsRUFBRSxDQUFDbUYsT0FBMUQ7QUFDQW5GLFFBQUUsQ0FBQ2lGLGFBQUgsQ0FBaUJqRixFQUFFLENBQUMyRSxVQUFwQixFQUFnQzNFLEVBQUUsQ0FBQ29GLGtCQUFuQyxFQUF1RHBGLEVBQUUsQ0FBQ21GLE9BQTFEO0FBRUFuRixRQUFFLENBQUMwRSxXQUFILENBQWUxRSxFQUFFLENBQUMyRSxVQUFsQixFQUE4QixLQUFLdkQsWUFBTCxDQUFrQixDQUFsQixDQUE5QjtBQUNBcEIsUUFBRSxDQUFDNEUsV0FBSCxDQUFlNUUsRUFBRSxDQUFDNkUsbUJBQWxCLEVBQXVDLElBQXZDO0FBQ0E3RSxRQUFFLENBQUM4RSxVQUFILENBQWM5RSxFQUFFLENBQUMyRSxVQUFqQixFQUE2QixDQUE3QixFQUFnQzNFLEVBQUUsQ0FBQytFLElBQW5DLEVBQXlDL0UsRUFBRSxDQUFDK0UsSUFBNUMsRUFBa0QvRSxFQUFFLENBQUNnRixhQUFyRCxFQUFvRSxLQUFLNUQsWUFBTCxDQUFrQixDQUFsQixFQUFxQmlELEtBQXpGO0FBQ0FyRSxRQUFFLENBQUNpRixhQUFILENBQWlCakYsRUFBRSxDQUFDMkUsVUFBcEIsRUFBZ0MzRSxFQUFFLENBQUNrRixrQkFBbkMsRUFBdURsRixFQUFFLENBQUNxRixNQUExRDtBQUNBckYsUUFBRSxDQUFDaUYsYUFBSCxDQUFpQmpGLEVBQUUsQ0FBQzJFLFVBQXBCLEVBQWdDM0UsRUFBRSxDQUFDb0Ysa0JBQW5DLEVBQXVEcEYsRUFBRSxDQUFDcUYsTUFBMUQ7QUFFQXJGLFFBQUUsQ0FBQzBFLFdBQUgsQ0FBZTFFLEVBQUUsQ0FBQzJFLFVBQWxCLEVBQThCLEtBQUt2RCxZQUFMLENBQWtCLENBQWxCLENBQTlCO0FBQ0FwQixRQUFFLENBQUM0RSxXQUFILENBQWU1RSxFQUFFLENBQUM2RSxtQkFBbEIsRUFBdUMsSUFBdkM7QUFDQTdFLFFBQUUsQ0FBQzhFLFVBQUgsQ0FBYzlFLEVBQUUsQ0FBQzJFLFVBQWpCLEVBQTZCLENBQTdCLEVBQWdDM0UsRUFBRSxDQUFDK0UsSUFBbkMsRUFBeUMvRSxFQUFFLENBQUMrRSxJQUE1QyxFQUFrRC9FLEVBQUUsQ0FBQ2dGLGFBQXJELEVBQW9FLEtBQUs1RCxZQUFMLENBQWtCLENBQWxCLEVBQXFCaUQsS0FBekY7QUFDQXJFLFFBQUUsQ0FBQ2lGLGFBQUgsQ0FBaUJqRixFQUFFLENBQUMyRSxVQUFwQixFQUFnQzNFLEVBQUUsQ0FBQ2tGLGtCQUFuQyxFQUF1RGxGLEVBQUUsQ0FBQ3FGLE1BQTFEO0FBQ0FyRixRQUFFLENBQUNpRixhQUFILENBQWlCakYsRUFBRSxDQUFDMkUsVUFBcEIsRUFBZ0MzRSxFQUFFLENBQUNvRixrQkFBbkMsRUFBdURwRixFQUFFLENBQUNzRixxQkFBMUQ7QUFDQXRGLFFBQUUsQ0FBQ3VGLGNBQUgsQ0FBa0J2RixFQUFFLENBQUMyRSxVQUFyQjtBQUVBM0UsUUFBRSxDQUFDMEUsV0FBSCxDQUFlMUUsRUFBRSxDQUFDMkUsVUFBbEIsRUFBOEIsSUFBOUI7QUFDRDs7OzRCQUVRYSxFLEVBQUk7QUFDWCxXQUFLM0UsT0FBTCxJQUFnQm1CLFFBQVEsQ0FBQ3dELEVBQUUsR0FBRyxLQUFLeEUsWUFBWCxDQUFSLEdBQW1DLEdBQW5EO0FBQ0EsV0FBS0YsT0FBTCxJQUFnQmtCLFFBQVEsQ0FBQ3dELEVBQUUsR0FBRyxLQUFLdkUsWUFBWCxDQUFSLEdBQW1DLEdBQW5EO0FBQ0EsV0FBS0YsT0FBTCxJQUFnQmlCLFFBQVEsQ0FBQ3dELEVBQUUsR0FBRyxLQUFLdEUsWUFBWCxDQUFSLEdBQW1DLEdBQW5EO0FBQ0Q7OzsyQkFFTztBQUNOO0FBQ0EsVUFBSSxLQUFLOEMsT0FBVCxFQUFrQjtBQUNoQjtBQUNBaEUsVUFBRSxDQUFDeUYsU0FBSCxDQUFhekYsRUFBRSxDQUFDMEYsU0FBaEIsRUFBMkIxRixFQUFFLENBQUMyRixHQUE5QjtBQUNBM0YsVUFBRSxDQUFDNEYsTUFBSCxDQUFVNUYsRUFBRSxDQUFDNkYsS0FBYjtBQUNBN0YsVUFBRSxDQUFDOEYsT0FBSCxDQUFXOUYsRUFBRSxDQUFDK0YsVUFBZDtBQUNBL0YsVUFBRSxDQUFDZ0csU0FBSCxDQUFhL0YsYUFBYSxDQUFDNEQsSUFBZCxDQUFtQm9DLFlBQWhDLEVBQThDLEdBQTlDO0FBQ0QsT0FORCxNQU9LO0FBQ0hqRyxVQUFFLENBQUM0RixNQUFILENBQVU1RixFQUFFLENBQUMrRixVQUFiO0FBQ0EvRixVQUFFLENBQUM4RixPQUFILENBQVc5RixFQUFFLENBQUM2RixLQUFkO0FBQ0Q7O0FBRUQ3RixRQUFFLENBQUMwRCxVQUFILENBQWMxRCxFQUFFLENBQUNzRCxZQUFqQixFQUErQixLQUFLbkQsVUFBcEM7QUFDQUgsUUFBRSxDQUFDa0csbUJBQUgsQ0FBdUJqRyxhQUFhLENBQUM0RCxJQUFkLENBQW1Cc0MsdUJBQTFDLEVBQW1FLEtBQUtoRyxVQUFMLENBQWdCMEQsSUFBaEIsQ0FBcUJOLFFBQXhGLEVBQWtHdkQsRUFBRSxDQUFDb0csS0FBckcsRUFBNEcsS0FBNUcsRUFBbUgsQ0FBbkgsRUFBc0gsQ0FBdEg7QUFFQXBHLFFBQUUsQ0FBQzBELFVBQUgsQ0FBYzFELEVBQUUsQ0FBQ3NELFlBQWpCLEVBQStCLEtBQUsvQyw0QkFBcEM7QUFDQVAsUUFBRSxDQUFDa0csbUJBQUgsQ0FBdUJqRyxhQUFhLENBQUM0RCxJQUFkLENBQW1Cd0MscUJBQTFDLEVBQWlFLEtBQUs5Riw0QkFBTCxDQUFrQ3NELElBQWxDLENBQXVDTixRQUF4RyxFQUFrSHZELEVBQUUsQ0FBQ29HLEtBQXJILEVBQTRILEtBQTVILEVBQW1JLENBQW5JLEVBQXNJLENBQXRJO0FBRUFwRyxRQUFFLENBQUMwRCxVQUFILENBQWMxRCxFQUFFLENBQUNzRCxZQUFqQixFQUErQixLQUFLOUMsc0JBQXBDO0FBQ0FSLFFBQUUsQ0FBQ2tHLG1CQUFILENBQXVCakcsYUFBYSxDQUFDNEQsSUFBZCxDQUFtQnlDLHFCQUExQyxFQUFpRSxLQUFLOUYsc0JBQUwsQ0FBNEJxRCxJQUE1QixDQUFpQ04sUUFBbEcsRUFBNEd2RCxFQUFFLENBQUNvRyxLQUEvRyxFQUFzSCxLQUF0SCxFQUE2SCxDQUE3SCxFQUFnSSxDQUFoSSxFQXJCTSxDQXVCTjs7QUFDQXBHLFFBQUUsQ0FBQ3VHLGFBQUgsQ0FBaUJ2RyxFQUFFLENBQUN3RyxRQUFwQjtBQUNBeEcsUUFBRSxDQUFDMEUsV0FBSCxDQUFlMUUsRUFBRSxDQUFDMkUsVUFBbEIsRUFBOEIsS0FBS3ZELFlBQUwsQ0FBa0IsS0FBS0MsdUJBQXZCLENBQTlCO0FBQ0FyQixRQUFFLENBQUN5RyxTQUFILENBQWF4RyxhQUFhLENBQUM0RCxJQUFkLENBQW1CNkMsY0FBaEMsRUFBZ0QsQ0FBaEQsRUExQk0sQ0E0Qk47QUFDQTs7QUFDQTFHLFFBQUUsQ0FBQ3lHLFNBQUgsQ0FBYXhHLGFBQWEsQ0FBQzRELElBQWQsQ0FBbUI4QyxrQkFBaEMsRUFBb0QsU0FBcEQ7QUFDQTNHLFFBQUUsQ0FBQzRHLFNBQUgsQ0FBYTNHLGFBQWEsQ0FBQzRELElBQWQsQ0FBbUJnRCxtQkFBaEMsRUFBcUQsR0FBckQsRUFBMEQsR0FBMUQsRUFBK0QsR0FBL0Q7QUFDQTdHLFFBQUUsQ0FBQzRHLFNBQUgsQ0FBYTNHLGFBQWEsQ0FBQzRELElBQWQsQ0FBbUJpRCx1QkFBaEMsRUFBeUQsR0FBekQsRUFBOEQsR0FBOUQsRUFBbUUsR0FBbkU7QUFFQSxVQUFJQyxpQkFBaUIsR0FBRyxDQUN0QixHQURzQixFQUNqQixHQURpQixFQUNaLENBQUMsR0FEVyxDQUF4QjtBQUdBLFVBQUlDLHNCQUFzQixHQUFHQyxJQUFJLENBQUN0RyxNQUFMLEVBQTdCLENBckNNLENBc0NOOztBQUNBc0csVUFBSSxDQUFDQyxTQUFMLENBQWVGLHNCQUFmLEVBQXVDRCxpQkFBdkMsRUF2Q00sQ0F3Q047O0FBQ0FFLFVBQUksQ0FBQ0UsS0FBTCxDQUFXSCxzQkFBWCxFQUFtQ0Esc0JBQW5DLEVBQTJELENBQUMsQ0FBNUQ7QUFDQWhILFFBQUUsQ0FBQ29ILFVBQUgsQ0FBY25ILGFBQWEsQ0FBQzRELElBQWQsQ0FBbUJ3RCx3QkFBakMsRUFBMkRMLHNCQUEzRCxFQTFDTSxDQTRDTjs7QUFDQXZGLHlCQUFtQjtBQUNuQmYsVUFBSSxDQUFDNEcsU0FBTCxDQUFlMUcsZUFBZixFQUFnQ0EsZUFBaEMsRUFBaUQsQ0FBQyxLQUFLcUQsQ0FBTixFQUFTLEtBQUtDLENBQWQsRUFBaUIsS0FBSzVDLENBQXRCLENBQWpEO0FBQ0FaLFVBQUksQ0FBQzZHLE1BQUwsQ0FBWTNHLGVBQVosRUFBNkJBLGVBQTdCLEVBQThDLEtBQUtDLE9BQW5ELEVBQTRELENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQTVEO0FBQ0FILFVBQUksQ0FBQzZHLE1BQUwsQ0FBWTNHLGVBQVosRUFBNkJBLGVBQTdCLEVBQThDLEtBQUtFLE9BQW5ELEVBQTRELENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQTVEO0FBQ0FKLFVBQUksQ0FBQzZHLE1BQUwsQ0FBWTNHLGVBQVosRUFBNkJBLGVBQTdCLEVBQThDLEtBQUtHLE9BQW5ELEVBQTRELENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQTVEO0FBRUF5RyxzQkFBZ0I7QUFFaEJ4SCxRQUFFLENBQUMwRCxVQUFILENBQWMxRCxFQUFFLENBQUNvRSxvQkFBakIsRUFBdUMsS0FBS2hFLHFCQUE1QztBQUNBSixRQUFFLENBQUN5SCxZQUFILENBQWdCekgsRUFBRSxDQUFDMEgsU0FBbkIsRUFBOEIsS0FBS3RILHFCQUFMLENBQTJCeUQsSUFBM0IsQ0FBZ0NMLFFBQTlELEVBQXdFeEQsRUFBRSxDQUFDMkgsY0FBM0UsRUFBMkYsQ0FBM0Y7QUFDQS9GLHdCQUFrQjtBQUNuQjs7OztLQUdIOzs7QUFDQSxTQUFTZ0csWUFBVCxDQUF1QkMsSUFBdkIsRUFBNkI7QUFDM0IsTUFBSUMsTUFBSjs7QUFFQSxVQUFRRCxJQUFSO0FBQ0UsU0FBSyxRQUFMO0FBQ0VDLFlBQU0sR0FBRzlILEVBQUUsQ0FBQzRILFlBQUgsQ0FBZ0I1SCxFQUFFLENBQUMrSCxhQUFuQixDQUFUO0FBQ0EvSCxRQUFFLENBQUNnSSxZQUFILENBQWdCRixNQUFoQixFQUF3QjFGLGtCQUF4QjtBQUNBOztBQUVGLFNBQUssVUFBTDtBQUNFMEYsWUFBTSxHQUFHOUgsRUFBRSxDQUFDNEgsWUFBSCxDQUFnQjVILEVBQUUsQ0FBQ2lJLGVBQW5CLENBQVQ7QUFDQWpJLFFBQUUsQ0FBQ2dJLFlBQUgsQ0FBZ0JGLE1BQWhCLEVBQXdCekYsb0JBQXhCO0FBQ0E7O0FBRUY7QUFDRSxZQUFNLElBQUlQLEtBQUosMENBQTRDK0YsSUFBNUMsRUFBTjtBQVpKOztBQWVBN0gsSUFBRSxDQUFDa0ksYUFBSCxDQUFpQkosTUFBakI7O0FBRUEsTUFBSSxDQUFDOUgsRUFBRSxDQUFDbUksa0JBQUgsQ0FBc0JMLE1BQXRCLEVBQThCOUgsRUFBRSxDQUFDb0ksY0FBakMsQ0FBTCxFQUF1RDtBQUNyRDtBQUNBLFVBQU0sSUFBSXRHLEtBQUosQ0FBVTlCLEVBQUUsQ0FBQ3FJLGdCQUFILENBQW9CUCxNQUFwQixDQUFWLENBQU47QUFDRDs7QUFFRCxTQUFPQSxNQUFQO0FBQ0Q7O0FBRUQsU0FBU1EsbUJBQVQsR0FBZ0M7QUFDOUJySSxlQUFhLEdBQUdELEVBQUUsQ0FBQ3VJLGFBQUgsRUFBaEI7QUFDQXZJLElBQUUsQ0FBQ3dJLFlBQUgsQ0FBZ0J2SSxhQUFoQixFQUErQjJILFlBQVksQ0FBQyxRQUFELENBQTNDO0FBQ0E1SCxJQUFFLENBQUN3SSxZQUFILENBQWdCdkksYUFBaEIsRUFBK0IySCxZQUFZLENBQUMsVUFBRCxDQUEzQztBQUNBNUgsSUFBRSxDQUFDeUksV0FBSCxDQUFleEksYUFBZjs7QUFFQSxNQUFJLENBQUNELEVBQUUsQ0FBQzBJLG1CQUFILENBQXVCekksYUFBdkIsRUFBc0NELEVBQUUsQ0FBQzJJLFdBQXpDLENBQUwsRUFBNEQ7QUFDMUQ7QUFDQSxVQUFNLElBQUk3RyxLQUFKLENBQVU5QixFQUFFLENBQUM0SSxpQkFBSCxDQUFxQjNJLGFBQXJCLENBQVYsQ0FBTjtBQUNEO0FBQ0Y7O0FBRUQsU0FBUzRJLFdBQVQsR0FBd0I7QUFDdEJQLHFCQUFtQjtBQUNuQnRJLElBQUUsQ0FBQzhJLFVBQUgsQ0FBYzdJLGFBQWQsRUFGc0IsQ0FJdEI7O0FBQ0FBLGVBQWEsQ0FBQzRELElBQWQsR0FBcUIsRUFBckI7QUFFQTVELGVBQWEsQ0FBQzRELElBQWQsQ0FBbUJzQyx1QkFBbkIsR0FBNkNuRyxFQUFFLENBQUMrSSxpQkFBSCxDQUFxQjlJLGFBQXJCLEVBQW9DLGlCQUFwQyxDQUE3QztBQUNBRCxJQUFFLENBQUNnSix1QkFBSCxDQUEyQi9JLGFBQWEsQ0FBQzRELElBQWQsQ0FBbUJzQyx1QkFBOUMsRUFSc0IsQ0FVdEI7QUFDQTs7QUFFQWxHLGVBQWEsQ0FBQzRELElBQWQsQ0FBbUJ3QyxxQkFBbkIsR0FBMkNyRyxFQUFFLENBQUMrSSxpQkFBSCxDQUFxQjlJLGFBQXJCLEVBQW9DLGVBQXBDLENBQTNDO0FBQ0FELElBQUUsQ0FBQ2dKLHVCQUFILENBQTJCL0ksYUFBYSxDQUFDNEQsSUFBZCxDQUFtQndDLHFCQUE5QztBQUVBcEcsZUFBYSxDQUFDNEQsSUFBZCxDQUFtQnlDLHFCQUFuQixHQUEyQ3RHLEVBQUUsQ0FBQytJLGlCQUFILENBQXFCOUksYUFBckIsRUFBb0MsZUFBcEMsQ0FBM0M7QUFDQUQsSUFBRSxDQUFDZ0osdUJBQUgsQ0FBMkIvSSxhQUFhLENBQUM0RCxJQUFkLENBQW1CeUMscUJBQTlDLEVBakJzQixDQW1CdEI7O0FBQ0FyRyxlQUFhLENBQUM0RCxJQUFkLENBQW1Cb0YsdUJBQW5CLEdBQTZDakosRUFBRSxDQUFDa0osa0JBQUgsQ0FBc0JqSixhQUF0QixFQUFxQyxtQkFBckMsQ0FBN0M7QUFDQUEsZUFBYSxDQUFDNEQsSUFBZCxDQUFtQnNGLHNCQUFuQixHQUE0Q25KLEVBQUUsQ0FBQ2tKLGtCQUFILENBQXNCakosYUFBdEIsRUFBcUMsa0JBQXJDLENBQTVDO0FBQ0FBLGVBQWEsQ0FBQzRELElBQWQsQ0FBbUI2QyxjQUFuQixHQUFvQzFHLEVBQUUsQ0FBQ2tKLGtCQUFILENBQXNCakosYUFBdEIsRUFBcUMsVUFBckMsQ0FBcEM7QUFDQUEsZUFBYSxDQUFDNEQsSUFBZCxDQUFtQjhDLGtCQUFuQixHQUF3QzNHLEVBQUUsQ0FBQ2tKLGtCQUFILENBQXNCakosYUFBdEIsRUFBcUMsY0FBckMsQ0FBeEM7QUFDQUEsZUFBYSxDQUFDNEQsSUFBZCxDQUFtQmdELG1CQUFuQixHQUF5QzdHLEVBQUUsQ0FBQ2tKLGtCQUFILENBQXNCakosYUFBdEIsRUFBcUMsZUFBckMsQ0FBekM7QUFDQUEsZUFBYSxDQUFDNEQsSUFBZCxDQUFtQmlELHVCQUFuQixHQUE2QzlHLEVBQUUsQ0FBQ2tKLGtCQUFILENBQXNCakosYUFBdEIsRUFBcUMsbUJBQXJDLENBQTdDO0FBQ0FBLGVBQWEsQ0FBQzRELElBQWQsQ0FBbUJ3RCx3QkFBbkIsR0FBOENySCxFQUFFLENBQUNrSixrQkFBSCxDQUFzQmpKLGFBQXRCLEVBQXFDLG9CQUFyQyxDQUE5QztBQUNBQSxlQUFhLENBQUM0RCxJQUFkLENBQW1CdUYsY0FBbkIsR0FBb0NwSixFQUFFLENBQUNrSixrQkFBSCxDQUFzQmpKLGFBQXRCLEVBQXFDLFVBQXJDLENBQXBDO0FBQ0FBLGVBQWEsQ0FBQzRELElBQWQsQ0FBbUJvQyxZQUFuQixHQUFrQ2pHLEVBQUUsQ0FBQ2tKLGtCQUFILENBQXNCakosYUFBdEIsRUFBcUMsUUFBckMsQ0FBbEM7QUFDRCxDLENBRUQ7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVNvSixXQUFULEdBQXdCO0FBQ3RCO0FBQ0E7QUFDQTlILE9BQUssQ0FBQ2tCLE9BQU4sQ0FBYyxVQUFDQyxJQUFEO0FBQUEsV0FBVUEsSUFBSSxDQUFDNEcsVUFBTCxFQUFWO0FBQUEsR0FBZDtBQUNELEMsQ0FFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7QUFFQSxTQUFTQyxXQUFULEdBQXdCO0FBQ3RCLE1BQUlsRixLQUFLLEdBQUcsSUFBSW1GLEtBQUosRUFBWjs7QUFDQW5GLE9BQUssQ0FBQ29GLE1BQU4sR0FBZSxZQUFZO0FBQ3pCbEksU0FBSyxDQUFDa0IsT0FBTixDQUFjLFVBQUFDLElBQUk7QUFBQSxhQUFJQSxJQUFJLENBQUM4QixhQUFMLENBQW1CSCxLQUFuQixDQUFKO0FBQUEsS0FBbEIsRUFEeUIsQ0FFekI7QUFDRCxHQUhELENBRnNCLENBT3RCOzs7QUFDQUEsT0FBSyxDQUFDcUYsV0FBTixHQUFvQixFQUFwQixDQVJzQixDQVN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFDQXJGLE9BQUssQ0FBQ3NGLEdBQU4sR0FBWSwwREFBWjtBQUNEOztBQUVELFNBQVNDLElBQVQsR0FBaUI7QUFDZixPQUFLLElBQUl0RixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzNCL0MsU0FBSyxDQUFDSSxJQUFOLENBQVcsSUFBSW1DLElBQUosQ0FBUztBQUNsQkUsYUFBTyxFQUFFLElBRFM7QUFFbEJDLE9BQUMsRUFBRS9CLElBQUksQ0FBQzJILE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsRUFGTjtBQUdsQjNGLE9BQUMsRUFBRWhDLElBQUksQ0FBQzJILE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsRUFITjtBQUlsQnZJLE9BQUMsRUFBRSxDQUFDO0FBSmMsS0FBVCxDQUFYO0FBTUQ7O0FBRUR1SCxhQUFXO0FBQ1hRLGFBQVc7QUFDWEUsYUFBVztBQUNaLEMsQ0FFRDs7O0FBQ0EsU0FBU08sWUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLE1BQTlCLEVBQXNDO0FBQ3BDbkssUUFBTSxDQUFDa0ssS0FBUCxHQUFlQSxLQUFmO0FBQ0FsSyxRQUFNLENBQUNtSyxNQUFQLEdBQWdCQSxNQUFoQjtBQUNEOztBQUVELFNBQVN4QyxnQkFBVCxHQUE2QjtBQUMzQnhILElBQUUsQ0FBQ2lLLGdCQUFILENBQW9CaEssYUFBYSxDQUFDNEQsSUFBZCxDQUFtQm9GLHVCQUF2QyxFQUFnRSxLQUFoRSxFQUF1RXhJLGdCQUF2RTtBQUNBVCxJQUFFLENBQUNpSyxnQkFBSCxDQUFvQmhLLGFBQWEsQ0FBQzRELElBQWQsQ0FBbUJzRixzQkFBdkMsRUFBK0QsS0FBL0QsRUFBc0V2SSxlQUF0RSxFQUYyQixDQUkzQjs7QUFDQSxNQUFJc0osWUFBWSxHQUFHQyxJQUFJLENBQUN4SixNQUFMLEVBQW5CLENBTDJCLENBTTNCO0FBQ0E7QUFDQTtBQUNBOztBQUNBd0osTUFBSSxDQUFDQyxjQUFMLENBQW9CRixZQUFwQixFQUFrQ3RKLGVBQWxDO0FBQ0FaLElBQUUsQ0FBQ3FLLGdCQUFILENBQW9CcEssYUFBYSxDQUFDNEQsSUFBZCxDQUFtQnVGLGNBQXZDLEVBQXVELEtBQXZELEVBQThEYyxZQUE5RDtBQUNELEMsQ0FFRDtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTs7O0FBRUEsU0FBU0ksUUFBVCxHQUFxQixDQUNuQjtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNEOztBQUVELFNBQVNDLFNBQVQsR0FBc0I7QUFDcEJULGNBQVksQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFaO0FBQ0E5SixJQUFFLENBQUN3SyxRQUFILENBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IzSyxNQUFNLENBQUNrSyxLQUF6QixFQUFnQ2xLLE1BQU0sQ0FBQ21LLE1BQXZDO0FBQ0FoSyxJQUFFLENBQUN5SyxLQUFILENBQVN6SyxFQUFFLENBQUMwSyxnQkFBSCxHQUFzQjFLLEVBQUUsQ0FBQzJLLGdCQUFsQztBQUVBakssTUFBSSxDQUFDa0ssV0FBTCxDQUFpQm5LLGdCQUFqQixFQUFtQyxFQUFuQyxFQUF1Q1osTUFBTSxDQUFDa0ssS0FBUCxHQUFlbEssTUFBTSxDQUFDbUssTUFBN0QsRUFBcUUsR0FBckUsRUFBMEUsR0FBMUU7QUFDQXRKLE1BQUksQ0FBQ21LLFFBQUwsQ0FBY2pLLGVBQWQsRUFOb0IsQ0FRcEI7O0FBQ0FXLE9BQUssQ0FBQ2tCLE9BQU4sQ0FBYyxVQUFDQyxJQUFEO0FBQUEsV0FBVUEsSUFBSSxDQUFDb0ksSUFBTCxFQUFWO0FBQUEsR0FBZCxFQVRvQixDQVVwQjtBQUNEOztBQUVELFNBQVNBLElBQVQsQ0FBZXRGLEVBQWYsRUFBbUI7QUFDakJ4RixJQUFFLENBQUMrSyxVQUFILENBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QixHQUE3QjtBQUNBL0ssSUFBRSxDQUFDNEYsTUFBSCxDQUFVNUYsRUFBRSxDQUFDK0YsVUFBYjtBQUNBd0UsV0FBUztBQUNWOztBQUVELFNBQVNTLE9BQVQsQ0FBa0J4RixFQUFsQixFQUFzQjtBQUNwQmpFLE9BQUssQ0FBQ2tCLE9BQU4sQ0FBYyxVQUFDQyxJQUFEO0FBQUEsV0FBVUEsSUFBSSxDQUFDc0ksT0FBTCxDQUFheEYsRUFBYixDQUFWO0FBQUEsR0FBZCxFQURvQixDQUVwQjtBQUNBO0FBQ0E7QUFDRDs7QUFFRCxTQUFTeUYsVUFBVCxDQUFxQnpGLEVBQXJCLEVBQXlCO0FBQ3ZCakUsT0FBSyxDQUFDa0IsT0FBTixDQUFjLFVBQUFDLElBQUksRUFBSTtBQUNwQjtBQUNBO0FBQ0EsUUFBSXZCLGtCQUFrQixDQUFDLEVBQUQsQ0FBbEIsSUFBMEJ1QixJQUFJLENBQUMxQixZQUFMLEdBQW9CLENBQUMsRUFBbkQsRUFBdUQ7QUFDckQwQixVQUFJLENBQUMxQixZQUFMLElBQXFCLEdBQXJCO0FBQ0QsS0FMbUIsQ0FPcEI7OztBQUNBLFFBQUlHLGtCQUFrQixDQUFDLEVBQUQsQ0FBbEIsSUFBMEJ1QixJQUFJLENBQUMxQixZQUFMLEdBQW9CLEVBQWxELEVBQXNEO0FBQ3BEMEIsVUFBSSxDQUFDMUIsWUFBTCxJQUFxQixHQUFyQjtBQUNELEtBVm1CLENBWXBCOzs7QUFDQSxRQUFJRyxrQkFBa0IsQ0FBQyxFQUFELENBQWxCLElBQTBCdUIsSUFBSSxDQUFDekIsWUFBTCxHQUFvQixDQUFDLEVBQW5ELEVBQXVEO0FBQ3JEeUIsVUFBSSxDQUFDekIsWUFBTCxJQUFxQixHQUFyQjtBQUNELEtBZm1CLENBaUJwQjs7O0FBQ0EsUUFBSUUsa0JBQWtCLENBQUMsRUFBRCxDQUFsQixJQUEwQnVCLElBQUksQ0FBQ3pCLFlBQUwsR0FBb0IsRUFBbEQsRUFBc0Q7QUFDcER5QixVQUFJLENBQUN6QixZQUFMLElBQXFCLEdBQXJCO0FBQ0QsS0FwQm1CLENBc0JwQjs7O0FBQ0EsUUFBSUUsa0JBQWtCLENBQUMsRUFBRCxDQUFsQixJQUEwQnVCLElBQUksQ0FBQ3BCLENBQUwsR0FBUyxDQUFDLEVBQXhDLEVBQTRDO0FBQzFDb0IsVUFBSSxDQUFDcEIsQ0FBTCxJQUFVLEdBQVY7QUFDRCxLQXpCbUIsQ0EyQnBCOzs7QUFDQSxRQUFJSCxrQkFBa0IsQ0FBQyxFQUFELENBQWxCLElBQTBCdUIsSUFBSSxDQUFDcEIsQ0FBTCxHQUFTLENBQUMsQ0FBeEMsRUFBMkM7QUFDekNvQixVQUFJLENBQUNwQixDQUFMLElBQVUsR0FBVjtBQUNEO0FBQ0YsR0EvQkQ7QUFnQ0Q7O0FBRUQsU0FBUzRKLElBQVQsQ0FBZTFGLEVBQWYsRUFBbUI7QUFDakJ3RixTQUFPLENBQUN4RixFQUFELENBQVA7QUFDQXlGLFlBQVUsQ0FBQ3pGLEVBQUQsQ0FBVjtBQUNBc0YsTUFBSSxDQUFDdEYsRUFBRCxDQUFKO0FBQ0QsQyxDQUVEOzs7QUFDQSxJQUFNMkYsR0FBRyxHQUFHLEVBQVo7O0FBQ0EsU0FBU0MsSUFBVCxDQUFlQyxFQUFmLEVBQW1CO0FBQ2pCLE1BQU03RixFQUFFLEdBQUcsT0FBTzJGLEdBQWxCO0FBQ0EsTUFBTUcsR0FBRyxHQUFHQyxJQUFJLENBQUNELEdBQUwsRUFBWjtBQUNBRixNQUFJLENBQUNJLFFBQUwsR0FBZ0IsQ0FBQ0osSUFBSSxDQUFDSSxRQUFMLElBQWlCLENBQWxCLElBQXVCRixHQUF2QixJQUE4QkYsSUFBSSxDQUFDSyxPQUFMLElBQWdCSCxHQUE5QyxDQUFoQjs7QUFFQSxTQUFPRixJQUFJLENBQUNJLFFBQUwsSUFBaUJoRyxFQUF4QixFQUE0QjtBQUMxQjZGLE1BQUUsQ0FBQzdGLEVBQUQsQ0FBRjtBQUNBNEYsUUFBSSxDQUFDSSxRQUFMLElBQWlCaEcsRUFBakI7QUFDRDs7QUFFRDRGLE1BQUksQ0FBQ0ssT0FBTCxHQUFlSCxHQUFmO0FBQ0FJLFFBQU0sQ0FBQ0MscUJBQVAsQ0FBNkI7QUFBQSxXQUFNUCxJQUFJLENBQUNDLEVBQUQsQ0FBVjtBQUFBLEdBQTdCO0FBQ0Q7O0FBRUQsU0FBU08sR0FBVCxHQUFnQjtBQUNkaEosTUFBSTtBQUNKZ0gsTUFBSTtBQUVKd0IsTUFBSSxDQUFDRixJQUFELENBQUo7QUFDRDs7QUFFRFUsR0FBRyxHIiwiZmlsZSI6InNhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJhMTYwNjRlMTA1Y2E1ZTJmOWU2IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMjU5MjI3NGE3NWU2YzM0M2U2ZmUwNDRlNjMyYzQ2M2MucG5nXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGV4dHVyZXMvZHVjay5wbmdcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgdGV4dHVyZVNyYyBmcm9tICcuL3RleHR1cmVzL2R1Y2sucG5nJ1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2UnKVxubGV0IGdsXG5sZXQgc2hhZGVyUHJvZ3JhbVxubGV0IHRyaWFuZ2xlQnVmZmVyXG5sZXQgY3ViZUJ1ZmZlclxubGV0IGN1YmVWZXJ0ZXhJbmRleEJ1ZmZlclxubGV0IGNvbG9yQnVmZmVyXG5sZXQgY3ViZUNvbG9yQnVmZmVyXG4vLyBsZXQgY3ViZVRleHR1cmVcbmxldCBjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyXG5sZXQgY3ViZVZlcnRleE5vcm1hbEJ1ZmZlclxubGV0IHByb2plY3Rpb25NYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG5sZXQgbW9kZWxWaWV3TWF0cml4ID0gbWF0NC5jcmVhdGUoKVxubGV0IHJvdGF0ZVggPSAwXG5sZXQgcm90YXRlWSA9IDBcbmxldCByb3RhdGVaID0gMFxubGV0IHJvdGF0ZVNwZWVkWCA9IDBcbmxldCByb3RhdGVTcGVlZFkgPSAwXG5sZXQgcm90YXRlU3BlZWRaID0gMFxubGV0IGN1cnJlbnRQcmVzc2VkS2V5cyA9IHt9XG5sZXQgY3ViZVRleHR1cmVzID0gW11cbmxldCBjdXJyZW50Q3ViZVRleHR1cmVJbmRleCA9IDBcbmxldCB6ID0gLTVcblxubGV0IGN1YmVzID0gW11cblxuLy8vLy8gVXRpbHMgLy8vLy9cbmNvbnN0IG1vZGVsVmlld01hdHJpeFN0YWNrID0gW11cbmZ1bmN0aW9uIG1vZGVsVmlld1B1c2hNYXRyaXggKCkge1xuICBsZXQgY29weSA9IG1hdDQuY3JlYXRlKClcbiAgbWF0NC5jb3B5KGNvcHksIG1vZGVsVmlld01hdHJpeClcbiAgbW9kZWxWaWV3TWF0cml4U3RhY2sucHVzaChjb3B5KVxufVxuXG5mdW5jdGlvbiBtb2RlbFZpZXdQb3BNYXRyaXggKCkge1xuICBpZiAobW9kZWxWaWV3TWF0cml4U3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFbXB0eSBtb2RlbCB2aWV3IG1hdHJpeCBzdGFjaycpXG4gIH1cbiAgXG4gIG1vZGVsVmlld01hdHJpeCA9IG1vZGVsVmlld01hdHJpeFN0YWNrLnBvcCgpXG59XG5cbmZ1bmN0aW9uIGRlZ1RvUmFkIChkZWcpIHtcbiAgcmV0dXJuIGRlZyAvIDE4MCAqIE1hdGguUElcbn1cblxuLy8vLy8gU2hhZGVyIFNvdXJjZSAvLy8vL1xuY29uc3QgdmVydGV4U2hhZGVyU291cmNlID0gYFxuICBhdHRyaWJ1dGUgdmVjMyBhVmVydGV4UG9zaXRpb247XG4gIC8vIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhDb2xvcjtcbiAgYXR0cmlidXRlIHZlYzMgYVZlcnRleE5vcm1hbDtcbiAgYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcblxuICB1bmlmb3JtIG1hdDQgdVByb2plY3Rpb25NYXRyaXg7XG4gIHVuaWZvcm0gbWF0NCB1TW9kZWxWaWV3TWF0cml4O1xuICB1bmlmb3JtIG1hdDMgdU5NYXRyaXg7XG5cbiAgdW5pZm9ybSB2ZWMzIHVBbWJpZW50Q29sb3I7XG5cbiAgdW5pZm9ybSB2ZWMzIHVMaWdodGluZ0RpcmVjdGlvbjtcbiAgdW5pZm9ybSB2ZWMzIHVEaXJlY3Rpb25hbENvbG9yO1xuXG4gIHVuaWZvcm0gYm9vbCB1VXNlTGlnaHRpbmc7XG5cbiAgLy8gdmFyeWluZyB2ZWM0IHZDb2xvcjtcbiAgdmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG4gIHZhcnlpbmcgdmVjMyB2TGlnaHRXZWlnaHRpbmc7XG5cbiAgdm9pZCBtYWluICh2b2lkKSB7XG4gICAgZ2xfUG9zaXRpb24gPSB1UHJvamVjdGlvbk1hdHJpeCAqIHVNb2RlbFZpZXdNYXRyaXggKiB2ZWM0KGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTtcbiAgICAvLyB2Q29sb3IgPSBhVmVydGV4Q29sb3I7XG4gICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XG5cbiAgICBpZiAodVVzZUxpZ2h0aW5nKSB7XG4gICAgICB2TGlnaHRXZWlnaHRpbmcgPSB2ZWMzKDEuMCwgMS4wLCAxLjApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2ZWMzIHRyYW5zZm9ybWVkTm9ybWFsID0gdU5NYXRyaXggKiBhVmVydGV4Tm9ybWFsO1xuICAgICAgZmxvYXQgZGlyZWN0aW9uYWxMaWdodFdlaWdodGluZyA9IG1heCgwLjAsIGRvdCh0cmFuc2Zvcm1lZE5vcm1hbCwgdUxpZ2h0aW5nRGlyZWN0aW9uKSk7XG4gICAgICB2TGlnaHRXZWlnaHRpbmcgPSB1QW1iaWVudENvbG9yICsgdURpcmVjdGlvbmFsQ29sb3IgKiBkaXJlY3Rpb25hbExpZ2h0V2VpZ2h0aW5nO1xuICAgIH1cbiAgfVxuYFxuY29uc3QgZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBgXG4gIHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuICAvLyB2YXJ5aW5nIHZlYzQgdkNvbG9yO1xuICB2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcbiAgdmFyeWluZyB2ZWMzIHZMaWdodFdlaWdodGluZztcblxuICB1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcbiAgdW5pZm9ybSBmbG9hdCB1QWxwaGE7XG5cbiAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAvLyBnbF9GcmFnQ29sb3IgPSB2Q29sb3I7XG4gICAgdmVjNCB0ZXh0dXJlQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC5zLCB2VGV4dHVyZUNvb3JkLnQpKTtcbiAgICAvLyBBZGp1c3QgdGV4dHVyZUNvbG9yIHJnYiB2YWx1ZSBieSBsaWdodCB3ZWlnaHRcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleHR1cmVDb2xvci5yZ2IgKiB2TGlnaHRXZWlnaHRpbmcsIHRleHR1cmVDb2xvci5hKTtcbiAgICAvLyBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleHR1cmVDb2xvci5yZ2IgKiB2TGlnaHRXZWlnaHRpbmcsIHRleHR1cmVDb2xvci5hICogdUFscGhhKTtcbiAgfVxuYFxuXG4vLy8vLyBQcmVwIFBoYXNlIC8vLy8vIFxuZnVuY3Rpb24gaGFuZGxlS2V5ZG93biAoZSkge1xuICBjdXJyZW50UHJlc3NlZEtleXNbZS5rZXlDb2RlXSA9IHRydWVcbiAgXG4gIGN1YmVzLmZvckVhY2goY3ViZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gNzApIHtcbiAgICAgIGN1YmUuY3VycmVudEN1YmVUZXh0dXJlSW5kZXggPSAoY3ViZS5jdXJyZW50Q3ViZVRleHR1cmVJbmRleCArIDEpICUgM1xuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5dXAgKGUpIHtcbiAgY3VycmVudFByZXNzZWRLZXlzW2Uua2V5Q29kZV0gPSBmYWxzZVxufVxuXG5mdW5jdGlvbiBwcmVwICgpIHtcbiAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKVxuICBcbiAgaWYgKCFnbCkge1xuICAgIGFsZXJ0KCd3ZWJnbCBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICByZXR1cm5cbiAgfVxuICBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleWRvd24pXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlS2V5dXApXG59XG5cbi8vLy8vIE9iamVjdHMgLy8vLy9cbmZ1bmN0aW9uIGNyZWF0ZUFycmF5QnVmZmVyICh2ZXJ0cyA9IFtdLCB2ZXJ0c09wdGlvbiA9IHt9KSB7XG4gIGNvbnN0IHtcbiAgICB2ZXJ0RGF0YUNvbnN0cnVjdG9yID0gRmxvYXQzMkFycmF5LFxuICAgIGJpbmRUYXJnZXQgPSBnbC5BUlJBWV9CVUZGRVIsXG4gICAgaXRlbVNpemUgPSAxLFxuICAgIG51bUl0ZW1zID0gdmVydHMubGVuZ3RoXG4gIH0gPSB2ZXJ0c09wdGlvblxuICBcbiAgY29uc3QgY3ViZUJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4gIGdsLmJpbmRCdWZmZXIoYmluZFRhcmdldCwgY3ViZUJ1ZmZlcilcbiAgXG4gIGdsLmJ1ZmZlckRhdGEoYmluZFRhcmdldCwgbmV3IHZlcnREYXRhQ29uc3RydWN0b3IodmVydHMpLCBnbC5TVEFUSUNfRFJBVylcbiAgY3ViZUJ1ZmZlci5pbmZvID0ge1xuICAgIGl0ZW1TaXplLFxuICAgIG51bUl0ZW1zXG4gIH1cblxuICByZXR1cm4gY3ViZUJ1ZmZlclxufVxuXG5jbGFzcyBDdWJlIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB7XG4gICAgICBpc0JsZW5kID0gZmFsc2UsXG4gICAgICB4ID0gMCxcbiAgICAgIHkgPSAwLFxuICAgICAgeiA9IDBcbiAgICB9ID0gb3B0aW9uc1xuXG4gICAgdGhpcy5pc0JsZW5kID0gaXNCbGVuZFxuXG4gICAgLy8gcG9zaXRpb25cbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMueiA9IHpcblxuICAgIC8vIHJvdGF0ZSBzcGVlZHNcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWCA9IDBcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWSA9IDBcbiAgICB0aGlzLnJvdGF0ZVNwZWVkWiA9IDBcblxuICAgIC8vIHJvdGF0ZSByYWRpdXNcbiAgICB0aGlzLnJvdGF0ZVggPSAwXG4gICAgdGhpcy5yb3RhdGVZID0gMFxuICAgIHRoaXMucm90YXRlWiA9IDBcblxuICAgIC8vIHZlcnRleCBidWZmZXJcbiAgICB0aGlzLmN1YmVCdWZmZXIgPSBudWxsXG5cbiAgICAvLyBub3JtYWwgYnVmZmVyXG4gICAgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gdGV4dHVyZSBidWZmZXJcbiAgICB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIgPSBudWxsXG4gICAgdGhpcy5jdWJlVGV4dHVyZXMgPSBbXVxuICAgIHRoaXMuY3VycmVudEN1YmVUZXh0dXJlSW5kZXggPSAwXG4gIH1cblxuICBpbml0QnVmZmVyICgpIHtcbiAgICB0aGlzLmN1YmVCdWZmZXIgPSBjcmVhdGVBcnJheUJ1ZmZlcihbXG4gICAgICAvLyBmcm9udFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAtMS4wLCAxLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcbiAgICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIGJhY2tcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAgIFxuICAgICAgLy8gdG9wXG4gICAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gYm90dG9tXG4gICAgICAtMS4wLCAtMS4wLCAxLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAxLjAsXG5cbiAgICAgIC8vIHJpZ2h0XG4gICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgICAxLjAsIC0xLjAsIDEuMCxcblxuICAgICAgLy8gbGVmdFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAxLjAsIC0xLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgMS4wXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDMsXG4gICAgICBudW1JdGVtczogMjRcbiAgICB9KVxuXG4gICAgdGhpcy5jdWJlVmVydGV4Tm9ybWFsQnVmZmVyID0gY3JlYXRlQXJyYXlCdWZmZXIoW1xuICAgICAgLy8gRnJvbnQgZmFjZVxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIFxuICAgICAgLy8gQmFjayBmYWNlXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcblxuICAgICAgLy8gVG9wIGZhY2VcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG5cbiAgICAgIC8vIEJvdHRvbSBmYWNlXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcblxuICAgICAgLy8gUmlnaHQgZmFjZVxuICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsIDAuMCxcblxuICAgICAgLy8gTGVmdCBmYWNlXG4gICAgICAtMS4wLCAwLjAsIDAuMCxcbiAgICAgIC0xLjAsIDAuMCwgMC4wLFxuICAgICAgLTEuMCwgMC4wLCAwLjAsXG4gICAgICAtMS4wLCAwLjAsIDAuMFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAzLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciA9IGNyZWF0ZUFycmF5QnVmZmVyKFtcbiAgICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuXG4gICAgICAvLyBCYWNrIGZhY2VcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuXG4gICAgICAvLyBUb3AgZmFjZVxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG5cbiAgICAgIC8vIEJvdHRvbSBmYWNlXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcblxuICAgICAgLy8gUmlnaHQgZmFjZVxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG5cbiAgICAgIC8vIExlZnQgZmFjZVxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDIsXG4gICAgICBudW1JdGVtczogMjRcbiAgICB9KVxuXG4gICAgdGhpcy5jdWJlVmVydGV4SW5kZXhCdWZmZXIgPSBjcmVhdGVBcnJheUJ1ZmZlcihbXG4gICAgICAwLCAxLCAyLCAgICAgIDAsIDIsIDMsICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDQsIDUsIDYsICAgICAgNCwgNiwgNywgICAgLy8gQmFjayBmYWNlXG4gICAgICA4LCA5LCAxMCwgICAgIDgsIDEwLCAxMSwgIC8vIFRvcCBmYWNlXG4gICAgICAxMiwgMTMsIDE0LCAgIDEyLCAxNCwgMTUsIC8vIEJvdHRvbSBmYWNlXG4gICAgICAxNiwgMTcsIDE4LCAgIDE2LCAxOCwgMTksIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDIwLCAyMSwgMjIsICAgMjAsIDIyLCAyMyAgLy8gTGVmdCBmYWNlXG4gICAgXSwge1xuICAgICAgaXRlbVNpemU6IDEsXG4gICAgICBudW1JdGVtczogMzYsXG4gICAgICB2ZXJ0RGF0YUNvbnN0cnVjdG9yOiBVaW50MTZBcnJheSxcbiAgICAgIGJpbmRUYXJnZXQ6IGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSXG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZVRleHR1cmUgKGltYWdlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1YmVUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpXG4gICAgICBjdWJlVGV4dHVyZS5pbWFnZSA9IGltYWdlXG4gICAgICB0aGlzLmN1YmVUZXh0dXJlcy5wdXNoKGN1YmVUZXh0dXJlKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmhhbmRsZVRleHR1cmVMb2FkZWQoKVxuICB9XG5cbiAgaGFuZGxlVGV4dHVyZUxvYWRlZCAoKSB7XG4gICAgLy8gVXNlIHRocmVlIGRpZmZlcmVudCBmaWx0ZXJzXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZXNbMF0pXG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmVzWzBdLmltYWdlKVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxuICAgIFxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmVzWzFdKVxuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlc1sxXS5pbWFnZSlcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpXG4gICAgXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5jdWJlVGV4dHVyZXNbMl0pXG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuY3ViZVRleHR1cmVzWzJdLmltYWdlKVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVClcbiAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKVxuXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcbiAgfVxuXG4gIGFuaW1hdGUgKGR0KSB7XG4gICAgdGhpcy5yb3RhdGVYICs9IGRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFgpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVZICs9IGRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFkpIC8gMTAwXG4gICAgdGhpcy5yb3RhdGVaICs9IGRlZ1RvUmFkKGR0ICogdGhpcy5yb3RhdGVTcGVlZFopIC8gMTAwXG4gIH1cblxuICBkcmF3ICgpIHtcbiAgICAvLyBDaGVjayBpZiBuZWVkIHRvIGJsZW5kXG4gICAgaWYgKHRoaXMuaXNCbGVuZCkge1xuICAgICAgLy8gQWRkIGJsZW5kaW5nIGVmZmVjdCB0byBzaW11bGF0ZSB0cmFuc3BhcmVuY3lcbiAgICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORSk7XG4gICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICAgIGdsLnVuaWZvcm0xZihzaGFkZXJQcm9ncmFtLmluZm8uYWxwaGFVbmlmb3JtLCAwLjUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKVxuICAgICAgZ2wuZGlzYWJsZShnbC5CTEVORClcbiAgICB9XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5jdWJlQnVmZmVyKVxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCB0aGlzLmN1YmVCdWZmZXIuaW5mby5pdGVtU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIpXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGFkZXJQcm9ncmFtLmluZm8udGV4dHVyZUNvb3JkQXR0cmlidXRlLCB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIuaW5mby5pdGVtU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlcilcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoYWRlclByb2dyYW0uaW5mby52ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUsIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlci5pbmZvLml0ZW1TaXplLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgXG4gICAgLy8gQWN0aXZlIHRleHR1cmVcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmVzW3RoaXMuY3VycmVudEN1YmVUZXh0dXJlSW5kZXhdKVxuICAgIGdsLnVuaWZvcm0xaShzaGFkZXJQcm9ncmFtLmluZm8uc2FtcGxlclVuaWZvcm0sIDApXG4gICAgXG4gICAgLy8gQWRkIGxpZ2h0XG4gICAgLy8gVE9ETzogYWRkIG1vcmUgaW50ZXJhY3Rpb25cbiAgICBnbC51bmlmb3JtMWkoc2hhZGVyUHJvZ3JhbS5pbmZvLnVzZUxpZ2h0aW5nVW5pZm9ybSwgJ2NoZWNrZWQnKVxuICAgIGdsLnVuaWZvcm0zZihzaGFkZXJQcm9ncmFtLmluZm8uYW1iaWVudENvbG9yVW5pZm9ybSwgMC4yLCAwLjIsIDAuMilcbiAgICBnbC51bmlmb3JtM2Yoc2hhZGVyUHJvZ3JhbS5pbmZvLmRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtLCAwLjgsIDAuOCwgMC44KVxuXG4gICAgbGV0IGxpZ2h0aW5nRGlyZWN0aW9uID0gW1xuICAgICAgMC4wLCAwLjAsIC0xLjBcbiAgICBdXG4gICAgbGV0IGFkanVzdGVkTGlnaHREaXJlY3Rpb24gPSB2ZWMzLmNyZWF0ZSgpXG4gICAgLy8gTm9ybWFsaXplIHNvIHRoYXQgdGhlIGRvdCBwcm9kdWN0IGlzIHRoZSBzYW1lIHRvIGNvc2luZVxuICAgIHZlYzMubm9ybWFsaXplKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIGxpZ2h0aW5nRGlyZWN0aW9uKVxuICAgIC8vIFJldmVyc2UgdGhlIGRpcmVjdGlvblxuICAgIHZlYzMuc2NhbGUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgLTEpXG4gICAgZ2wudW5pZm9ybTNmdihzaGFkZXJQcm9ncmFtLmluZm8ubGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uKVxuXG4gICAgLy8gU3BlY2lmaWMgdG8gdGhpcyBtb2RlbFxuICAgIG1vZGVsVmlld1B1c2hNYXRyaXgoKVxuICAgIG1hdDQudHJhbnNsYXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCBbdGhpcy54LCB0aGlzLnksIHRoaXMuel0pXG4gICAgbWF0NC5yb3RhdGUobW9kZWxWaWV3TWF0cml4LCBtb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWCwgWzEuMCwgMC4wLCAwLjBdKVxuICAgIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVksIFswLjAsIDEuMCwgMC4wXSlcbiAgICBtYXQ0LnJvdGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVaLCBbMC4wLCAwLjAsIDEuMF0pXG4gICAgXG4gICAgc2V0VW5pZm9ybU1hdHJpeCgpXG4gICAgXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5jdWJlVmVydGV4SW5kZXhCdWZmZXIpXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgdGhpcy5jdWJlVmVydGV4SW5kZXhCdWZmZXIuaW5mby5udW1JdGVtcywgZ2wuVU5TSUdORURfU0hPUlQsIDApXG4gICAgbW9kZWxWaWV3UG9wTWF0cml4KClcbiAgfVxufVxuXG4vLy8vLyBJbml0IFBoYXNlIC8vLy8vIFxuZnVuY3Rpb24gY3JlYXRlU2hhZGVyICh0eXBlKSB7XG4gIGxldCBzaGFkZXJcbiAgXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3ZlcnRleCc6XG4gICAgICBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUilcbiAgICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHZlcnRleFNoYWRlclNvdXJjZSlcbiAgICAgIGJyZWFrXG4gICAgICBcbiAgICBjYXNlICdmcmFnbWVudCc6XG4gICAgICBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKVxuICAgICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpXG4gICAgICBicmVha1xuICAgICAgXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzaGFkZXIgdHlwZSB0byBjcmVhdGU6ICR7dHlwZX1gKVxuICB9XG4gIFxuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcilcbiAgXG4gIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgLy8gVGhlIHNoYWRlciBpcyBub3QgY29ycmVjdGx5IGNvbXBpbGVkXG4gICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSlcbiAgfVxuICBcbiAgcmV0dXJuIHNoYWRlclxufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGFkZXJQcm9ncmFtICgpIHtcbiAgc2hhZGVyUHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKVxuICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgY3JlYXRlU2hhZGVyKCd2ZXJ0ZXgnKSlcbiAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIGNyZWF0ZVNoYWRlcignZnJhZ21lbnQnKSlcbiAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSlcbiAgXG4gIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihzaGFkZXJQcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAvLyBUaGUgc2hhZGVyIHByb2dyYW0gaXMgbm90IGNvcnJlY3RseSBsaW5rZWRcbiAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0UHJvZ3JhbUluZm9Mb2coc2hhZGVyUHJvZ3JhbSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFNoYWRlcnMgKCkge1xuICBjcmVhdGVTaGFkZXJQcm9ncmFtKClcbiAgZ2wudXNlUHJvZ3JhbShzaGFkZXJQcm9ncmFtKVxuICBcbiAgLy8gUHV0IGFsbCBhdHRhY2hlZCBpbmZvcm1hdGlvbiB0byBzaGFkZXIgcHJvZ3JhbSBtZXRhIGluZm9ybWF0aW9uXG4gIHNoYWRlclByb2dyYW0uaW5mbyA9IHt9XG4gIFxuICBzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4UG9zaXRpb25BdHRyaWJ1dGUgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleFBvc2l0aW9uJylcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlKVxuICBcbiAgLy8gc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleENvbG9yQXR0cmlidXRlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FWZXJ0ZXhDb2xvcicpXG4gIC8vIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoYWRlclByb2dyYW0uaW5mby52ZXJ0ZXhDb2xvckF0dHJpYnV0ZSlcbiAgXG4gIHNoYWRlclByb2dyYW0uaW5mby50ZXh0dXJlQ29vcmRBdHRyaWJ1dGUgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVRleHR1cmVDb29yZCcpXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoYWRlclByb2dyYW0uaW5mby50ZXh0dXJlQ29vcmRBdHRyaWJ1dGUpXG4gIFxuICBzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4Tm9ybWFsQXR0cmlidXRlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FWZXJ0ZXhOb3JtYWwnKVxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4Tm9ybWFsQXR0cmlidXRlKVxuXG4gIC8vIHdpbGwgcHV0IHVuaWZvcm0gaGVyZVxuICBzaGFkZXJQcm9ncmFtLmluZm8ucHJvamVjdGlvbk1hdHJpeFVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VQcm9qZWN0aW9uTWF0cml4JylcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLm1vZGVsVmlld01hdHJpeFVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VNb2RlbFZpZXdNYXRyaXgnKVxuICBzaGFkZXJQcm9ncmFtLmluZm8uc2FtcGxlclVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VTYW1wbGVyJylcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLnVzZUxpZ2h0aW5nVW5pZm9ybSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndVVzZUxpZ2h0aW5nJylcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLmFtYmllbnRDb2xvclVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VBbWJpZW50Q29sb3InKVxuICBzaGFkZXJQcm9ncmFtLmluZm8uZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VEaXJlY3Rpb25hbENvbG9yJylcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLmxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndUxpZ2h0aW5nRGlyZWN0aW9uJylcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLm5NYXRyaXhVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1Tk1hdHJpeCcpXG4gIHNoYWRlclByb2dyYW0uaW5mby5hbHBoYVVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VBbHBoYScpXG59XG5cbi8vIGZ1bmN0aW9uIGluaXRUcmlhbmdsZUJ1ZmZlcnMgKCkge1xuLy8gICB0cmlhbmdsZUJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4vLyAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0cmlhbmdsZUJ1ZmZlcilcbiAgXG4vLyAgIGNvbnN0IHZlcnRzID0gW1xuLy8gICAgIC8vIGZyb250XG4vLyAgICAgMC4wLCAyLjAsIDAuMCxcbi8vICAgICAtMS4wLCAwLjAsIDEuMCxcbi8vICAgICAxLjAsIDAuMCwgMS4wLFxuICAgIFxuLy8gICAgIC8vIGxlZnRcbi8vICAgICAwLjAsIDIuMCwgMC4wLFxuLy8gICAgIC0xLjAsIDAuMCwgMS4wLFxuLy8gICAgIC0xLjAsIDAuMCwgLTEuMCxcbiAgICBcbi8vICAgICAvLyBiYWNrXG4vLyAgICAgMC4wLCAyLjAsIDAuMCxcbi8vICAgICAtMS4wLCAwLjAsIC0xLjAsXG4vLyAgICAgMS4wLCAwLjAsIC0xLjAsXG4gICAgXG4vLyAgICAgLy8gcmlnaHRcbi8vICAgICAwLjAsIDIuMCwgMC4wLFxuLy8gICAgIDEuMCwgMC4wLCAtMS4wLFxuLy8gICAgIDEuMCwgMC4wLCAxLjBcbi8vICAgXVxuICBcbi8vICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydHMpLCBnbC5TVEFUSUNfRFJBVylcbi8vICAgdHJpYW5nbGVCdWZmZXIuaW5mbyA9IHtcbi8vICAgICBpdGVtU2l6ZTogMyxcbi8vICAgICBudW1JdGVtczogMTJcbi8vICAgfVxuICBcbi8vICAgY29sb3JCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuLy8gICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY29sb3JCdWZmZXIpXG4gIFxuLy8gICBjb25zdCB2ZXJ0Q29sb3JzID0gW1xuLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuICAgIFxuLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuICAgIFxuLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuICAgIFxuLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuLy8gICBdXG4vLyAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRDb2xvcnMpLCBnbC5TVEFUSUNfRFJBVylcbi8vICAgY29sb3JCdWZmZXIuaW5mbyA9IHtcbi8vICAgICBpdGVtU2l6ZTogNCxcbi8vICAgICBudW1JdGVtczogMTJcbi8vICAgfVxuLy8gfVxuXG4vLyBmdW5jdGlvbiBpbml0Q3ViZUJ1ZmZlcnMgKCkge1xuLy8gLy8gICBjdWJlQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKClcbi8vIC8vICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGN1YmVCdWZmZXIpXG4gIFxuLy8gLy8gICBjb25zdCB2ZXJ0cyA9IFtcbi8vIC8vICAgICAvLyBmcm9udFxuLy8gLy8gICAgIC0xLjAsIDEuMCwgMS4wLFxuLy8gLy8gICAgIC0xLjAsIC0xLjAsIDEuMCxcbi8vIC8vICAgICAxLjAsIC0xLjAsIDEuMCxcbi8vIC8vICAgICAxLjAsIDEuMCwgMS4wLFxuICAgIFxuLy8gLy8gICAgIC8vIGJhY2tcbi8vIC8vICAgICAtMS4wLCAxLjAsIC0xLjAsXG4vLyAvLyAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbi8vIC8vICAgICAxLjAsIC0xLjAsIC0xLjAsXG4vLyAvLyAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgXG4vLyAvLyAgICAgLy8gdG9wXG4vLyAvLyAgICAgLTEuMCwgMS4wLCAxLjAsXG4vLyAvLyAgICAgLTEuMCwgMS4wLCAtMS4wLFxuLy8gLy8gICAgIDEuMCwgMS4wLCAtMS4wLFxuLy8gLy8gICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgXG4vLyAvLyAgICAgLy8gYm90dG9tXG4vLyAvLyAgICAgLTEuMCwgLTEuMCwgMS4wLFxuLy8gLy8gICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4vLyAvLyAgICAgMS4wLCAtMS4wLCAtMS4wLFxuLy8gLy8gICAgIDEuMCwgLTEuMCwgMS4wLFxuXG4vLyAvLyAgICAgLy8gcmlnaHRcbi8vIC8vICAgICAxLjAsIDEuMCwgMS4wLFxuLy8gLy8gICAgIDEuMCwgMS4wLCAtMS4wLFxuLy8gLy8gICAgIDEuMCwgLTEuMCwgLTEuMCxcbi8vIC8vICAgICAxLjAsIC0xLjAsIDEuMCxcblxuLy8gLy8gICAgIC8vIGxlZnRcbi8vIC8vICAgICAtMS4wLCAxLjAsIDEuMCxcbi8vIC8vICAgICAtMS4wLCAxLjAsIC0xLjAsXG4vLyAvLyAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbi8vIC8vICAgICAtMS4wLCAtMS4wLCAxLjBcbi8vIC8vICAgXVxuICBcbi8vIC8vICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydHMpLCBnbC5TVEFUSUNfRFJBVylcbi8vIC8vICAgY3ViZUJ1ZmZlci5pbmZvID0ge1xuLy8gLy8gICAgIGl0ZW1TaXplOiAzLFxuLy8gLy8gICAgIG51bUl0ZW1zOiAyNFxuLy8gLy8gICB9XG5cbi8vIC8vICAgY3ViZVZlcnRleE5vcm1hbEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4vLyAvLyAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdWJlVmVydGV4Tm9ybWFsQnVmZmVyKVxuXG4vLyAvLyAgIGNvbnN0IHZlcnROb3JtYWxzID0gW1xuLy8gLy8gICAgIC8vIEZyb250IGZhY2Vcbi8vIC8vICAgICAwLjAsIDAuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAwLjAsIDEuMCxcbi8vIC8vICAgICAwLjAsIDAuMCwgMS4wLFxuICAgIFxuLy8gLy8gICAgIC8vIEJhY2sgZmFjZVxuLy8gLy8gICAgIDAuMCwgMC4wLCAtMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLCAtMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLCAtMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLCAtMS4wLFxuXG4vLyAvLyAgICAgLy8gVG9wIGZhY2Vcbi8vIC8vICAgICAwLjAsIDEuMCwgMC4wLFxuLy8gLy8gICAgIDAuMCwgMS4wLCAwLjAsXG4vLyAvLyAgICAgMC4wLCAxLjAsIDAuMCxcbi8vIC8vICAgICAwLjAsIDEuMCwgMC4wLFxuXG4vLyAvLyAgICAgLy8gQm90dG9tIGZhY2Vcbi8vIC8vICAgICAwLjAsIC0xLjAsIDAuMCxcbi8vIC8vICAgICAwLjAsIC0xLjAsIDAuMCxcbi8vIC8vICAgICAwLjAsIC0xLjAsIDAuMCxcbi8vIC8vICAgICAwLjAsIC0xLjAsIDAuMCxcblxuLy8gLy8gICAgIC8vIFJpZ2h0IGZhY2Vcbi8vIC8vICAgICAxLjAsIDAuMCwgMC4wLFxuLy8gLy8gICAgIDEuMCwgMC4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAwLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDAuMCwgMC4wLFxuXG4vLyAvLyAgICAgLy8gTGVmdCBmYWNlXG4vLyAvLyAgICAgLTEuMCwgMC4wLCAwLjAsXG4vLyAvLyAgICAgLTEuMCwgMC4wLCAwLjAsXG4vLyAvLyAgICAgLTEuMCwgMC4wLCAwLjAsXG4vLyAvLyAgICAgLTEuMCwgMC4wLCAwLjBcbi8vIC8vICAgXVxuLy8gLy8gICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0Tm9ybWFscyksIGdsLlNUQVRJQ19EUkFXKVxuLy8gLy8gICBjdWJlVmVydGV4Tm9ybWFsQnVmZmVyLmluZm8gPSB7XG4vLyAvLyAgICAgaXRlbVNpemU6IDMsIFxuLy8gLy8gICAgIG51bUl0ZW1zOiAyNFxuLy8gLy8gICB9XG4gIFxuLy8gLy8gICBjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKClcbi8vIC8vICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIpXG4gIFxuLy8gLy8gICBjb25zdCB2ZXJ0Q29vcmRzID0gW1xuLy8gLy8gICAgIC8vIEZyb250IGZhY2Vcbi8vIC8vICAgICAwLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDEuMCxcbi8vIC8vICAgICAwLjAsIDEuMCxcblxuLy8gLy8gICAgIC8vIEJhY2sgZmFjZVxuLy8gLy8gICAgIDEuMCwgMC4wLFxuLy8gLy8gICAgIDEuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLFxuXG4vLyAvLyAgICAgLy8gVG9wIGZhY2Vcbi8vIC8vICAgICAwLjAsIDEuMCxcbi8vIC8vICAgICAwLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDEuMCxcblxuLy8gLy8gICAgIC8vIEJvdHRvbSBmYWNlXG4vLyAvLyAgICAgMS4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAwLjAsXG5cbi8vIC8vICAgICAvLyBSaWdodCBmYWNlXG4vLyAvLyAgICAgMS4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAwLjAsXG5cbi8vIC8vICAgICAvLyBMZWZ0IGZhY2Vcbi8vIC8vICAgICAwLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDEuMCxcbi8vIC8vICAgICAwLjAsIDEuMCxcbi8vIC8vICAgXVxuICBcbi8vIC8vICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydENvb3JkcyksIGdsLlNUQVRJQ19EUkFXKVxuLy8gLy8gICBjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyLmluZm8gPSB7XG4vLyAvLyAgICAgaXRlbVNpemU6IDIsXG4vLyAvLyAgICAgbnVtSXRlbXM6IDI0XG4vLyAvLyAgIH1cbiAgXG4vLyAvLyAvLyAgIGN1YmVDb2xvckJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4vLyAvLyAvLyAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdWJlQ29sb3JCdWZmZXIpXG4gIFxuLy8gLy8gLy8gICBjb25zdCB2ZXJ0Q29sb3JzID0gW1xuLy8gLy8gLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAwLjAsIDEuMCxcbiAgICBcbi8vIC8vIC8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMC4wLCAxLjAsXG4gICAgXG4vLyAvLyAvLyAgICAgMS4wLCAwLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMS4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMS4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDAuMCwgMS4wLFxuICAgIFxuLy8gLy8gLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAwLjAsIDEuMCxcbiAgICBcbi8vIC8vIC8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMC4wLCAxLjAsXG4gICAgXG4vLyAvLyAvLyAgICAgMS4wLCAwLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMS4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMS4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDAuMCwgMS4wXG4vLyAvLyAvLyAgIF1cbi8vIC8vIC8vICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydENvbG9ycyksIGdsLlNUQVRJQ19EUkFXKVxuLy8gLy8gLy8gICBjdWJlQ29sb3JCdWZmZXIuaW5mbyA9IHtcbi8vIC8vIC8vICAgICBpdGVtU2l6ZTogNCxcbi8vIC8vIC8vICAgICBudW1JdGVtczogMjRcbi8vIC8vIC8vICAgfVxuICBcbi8vIC8vICAgLy8gV2hlbiBkcmF3aW5nLCB3ZSBhcmUgc3RpbGwgZHJhd2luZyB0cmlhbmdsZXMuXG4vLyAvLyAgIC8vIFdlIGFyZSBnb2luZyB0byB1c2UgYW4gaW5kZXggYnVmZmVyIHRvIGd1aWRlIHdlYmdsIHRvIGRyYXcgdGhlbSBhdCB0aGUgcmlnaHQgcG9zaXRpb25zXG4vLyAvLyAgIGN1YmVWZXJ0ZXhJbmRleEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4vLyAvLyAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGN1YmVWZXJ0ZXhJbmRleEJ1ZmZlcilcbi8vIC8vICAgbGV0IHZlcnRJbmRpY2VzID0gW1xuLy8gLy8gICAgIDAsIDEsIDIsICAgICAgMCwgMiwgMywgICAgLy8gRnJvbnQgZmFjZVxuLy8gLy8gICAgIDQsIDUsIDYsICAgICAgNCwgNiwgNywgICAgLy8gQmFjayBmYWNlXG4vLyAvLyAgICAgOCwgOSwgMTAsICAgICA4LCAxMCwgMTEsICAvLyBUb3AgZmFjZVxuLy8gLy8gICAgIDEyLCAxMywgMTQsICAgMTIsIDE0LCAxNSwgLy8gQm90dG9tIGZhY2Vcbi8vIC8vICAgICAxNiwgMTcsIDE4LCAgIDE2LCAxOCwgMTksIC8vIFJpZ2h0IGZhY2Vcbi8vIC8vICAgICAyMCwgMjEsIDIyLCAgIDIwLCAyMiwgMjMgIC8vIExlZnQgZmFjZVxuLy8gLy8gICBdXG4vLyAvLyAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh2ZXJ0SW5kaWNlcyksIGdsLlNUQVRJQ19EUkFXKVxuLy8gLy8gICBjdWJlVmVydGV4SW5kZXhCdWZmZXIuaW5mbyA9IHtcbi8vIC8vICAgICBpdGVtU2l6ZTogMSwgXG4vLyAvLyAgICAgbnVtSXRlbXM6IDM2XG4vLyAvLyAgIH1cbi8vIH1cblxuZnVuY3Rpb24gaW5pdEJ1ZmZlcnMgKCkge1xuICAvLyBpbml0VHJpYW5nbGVCdWZmZXJzKClcbiAgLy8gaW5pdEN1YmVCdWZmZXJzKClcbiAgY3ViZXMuZm9yRWFjaCgoY3ViZSkgPT4gY3ViZS5pbml0QnVmZmVyKCkpXG59XG5cbi8vIGZ1bmN0aW9uIGhhbmRsZVRleHR1cmVMb2FkZWQgKCkge1xuLy8gICAvLyBVc2UgdGhyZWUgZGlmZmVyZW50IGZpbHRlcnNcbi8vICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgY3ViZVRleHR1cmVzWzBdKVxuLy8gICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuLy8gICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGN1YmVUZXh0dXJlc1swXS5pbWFnZSlcbi8vICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpXG4vLyAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxuICBcbi8vICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgY3ViZVRleHR1cmVzWzFdKVxuLy8gICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuLy8gICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGN1YmVUZXh0dXJlc1sxXS5pbWFnZSlcbi8vICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUilcbi8vICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUilcbiAgXG4vLyAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGN1YmVUZXh0dXJlc1syXSlcbi8vICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbi8vICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBjdWJlVGV4dHVyZXNbMl0uaW1hZ2UpXG4vLyAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpXG4vLyAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpXG4vLyAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpXG5cbi8vICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcbi8vIH1cblxuZnVuY3Rpb24gaW5pdFRleHR1cmUgKCkge1xuICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY3ViZXMuZm9yRWFjaChjdWJlID0+IGN1YmUuY3JlYXRlVGV4dHVyZShpbWFnZSkpXG4gICAgLy8gaGFuZGxlVGV4dHVyZUxvYWRlZCgpXG4gIH1cbiAgXG4gIC8vIE5lZWQgdG8gcmVxdWVzdCBDT1JTIChDcm9zcyBPcmlnaW4gUmVzb3VyY2UgU2hhcmluZylcbiAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSAnJ1xuICAvLyBDYW4gb25seSB1c2UgcG93ZXIgb2YgMiBzaXplIGltYWdlc1xuICAvLyBpbWFnZS5zcmMgPSAnaHR0cHM6Ly9jZG42LmFwdG9pZGUuY29tL2ltZ3MvOC81L2YvODVmZDU4YzkxN2RiZjQ2YWUwNjRkYTdjNzI5OTE4MmVfaWNvbi5wbmcnXG4gIC8vIGltYWdlLnNyYyA9ICdodHRwczovL2MyLnN0YXRpY2ZsaWNrci5jb20vNC8zNDA4LzMyNzE2MjY1OTZfMzMzNDdmYWMxOV9vLnBuZydcbiAgLy8gaW1hZ2Uuc3JjID0gJy4uL2NyYXRlLmdpZidcbiAgaW1hZ2Uuc3JjID0gdGV4dHVyZVNyY1xufVxuXG5mdW5jdGlvbiBpbml0ICgpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgY3ViZXMucHVzaChuZXcgQ3ViZSh7XG4gICAgICBpc0JsZW5kOiB0cnVlLFxuICAgICAgeDogTWF0aC5yYW5kb20oKSAqIDIwIC0gMTAsXG4gICAgICB5OiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMCxcbiAgICAgIHo6IC0yMFxuICAgIH0pKVxuICB9XG4gIFxuICBpbml0U2hhZGVycygpXG4gIGluaXRCdWZmZXJzKClcbiAgaW5pdFRleHR1cmUoKVxufVxuXG4vLy8vLyBEcmF3IFBoYXNlIC8vLy8vIFxuZnVuY3Rpb24gcmVzaXplQ2FudmFzICh3aWR0aCwgaGVpZ2h0KSB7XG4gIGNhbnZhcy53aWR0aCA9IHdpZHRoXG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcbn1cblxuZnVuY3Rpb24gc2V0VW5pZm9ybU1hdHJpeCAoKSB7XG4gIGdsLnVuaWZvcm1NYXRyaXg0ZnYoc2hhZGVyUHJvZ3JhbS5pbmZvLnByb2plY3Rpb25NYXRyaXhVbmlmb3JtLCBmYWxzZSwgcHJvamVjdGlvbk1hdHJpeClcbiAgZ2wudW5pZm9ybU1hdHJpeDRmdihzaGFkZXJQcm9ncmFtLmluZm8ubW9kZWxWaWV3TWF0cml4VW5pZm9ybSwgZmFsc2UsIG1vZGVsVmlld01hdHJpeClcblxuICAvLyBHZXQgdGhlIHJpZ2h0IG5vcm1hbCBtYXRyaXhcbiAgbGV0IG5vcm1hbE1hdHJpeCA9IG1hdDMuY3JlYXRlKClcbiAgLy8gbWF0My5mcm9tTWF0NChub3JtYWxNYXRyaXgsIG1vZGVsVmlld01hdHJpeClcbiAgLy8gbWF0My5pbnZlcnQobm9ybWFsTWF0cml4LCBub3JtYWxNYXRyaXgpXG4gIC8vIC8vIG1hdDQudG9JbnZlcnNlTWF0Myhtb2RlbFZpZXdNYXRyaXgsIG5vcm1hbE1hdHJpeClcbiAgLy8gbWF0My50cmFuc3Bvc2Uobm9ybWFsTWF0cml4LCBub3JtYWxNYXRyaXgpXG4gIG1hdDMubm9ybWFsRnJvbU1hdDQobm9ybWFsTWF0cml4LCBtb2RlbFZpZXdNYXRyaXgpXG4gIGdsLnVuaWZvcm1NYXRyaXgzZnYoc2hhZGVyUHJvZ3JhbS5pbmZvLm5NYXRyaXhVbmlmb3JtLCBmYWxzZSwgbm9ybWFsTWF0cml4KVxufVxuXG4vLyBmdW5jdGlvbiBkcmF3VHJpYW5nbGUgKGR0KSB7XG4vLyAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0cmlhbmdsZUJ1ZmZlcilcbi8vICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4UG9zaXRpb25BdHRyaWJ1dGUsIHRyaWFuZ2xlQnVmZmVyLmluZm8uaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgXG4vLyAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjb2xvckJ1ZmZlcilcbi8vICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4Q29sb3JBdHRyaWJ1dGUsIGNvbG9yQnVmZmVyLmluZm8uaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgXG4vLyAgIC8vIFNwZWNpZmljIHRvIHRoaXMgbW9kZWxcbi8vICAgbW9kZWxWaWV3UHVzaE1hdHJpeCgpXG4vLyAgIG1hdDQudHJhbnNsYXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCBbMC4wLCAwLjUsIC01XSlcbi8vICAgbWF0NC5yb3RhdGUobW9kZWxWaWV3TWF0cml4LCBtb2RlbFZpZXdNYXRyaXgsIChyb3RhdGVZICs9IE1hdGguUEkgKiAwLjAwMSAqIGR0ICUgKE1hdGguUEkgKiAyKSksIFswLjAsIDEuMCwgMC4wXSlcbiAgXG4vLyAgIHNldFVuaWZvcm1NYXRyaXgoKVxuICBcbi8vICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIHRyaWFuZ2xlQnVmZmVyLmluZm8ubnVtSXRlbXMpXG4vLyAgIG1vZGVsVmlld1BvcE1hdHJpeCgpXG4vLyB9XG5cbmZ1bmN0aW9uIGRyYXdDdWJlICgpIHtcbiAgLy8gZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGN1YmVCdWZmZXIpXG4gIC8vIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCBjdWJlQnVmZmVyLmluZm8uaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgXG4gIC8vIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyKVxuICAvLyBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoYWRlclByb2dyYW0uaW5mby50ZXh0dXJlQ29vcmRBdHRyaWJ1dGUsIGN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIuaW5mby5pdGVtU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuXG4gIC8vIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdWJlVmVydGV4Tm9ybWFsQnVmZmVyKVxuICAvLyBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoYWRlclByb2dyYW0uaW5mby52ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGUsIGN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIuaW5mby5pdGVtU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICBcbiAgLy8gLy8gQWN0aXZlIHRleHR1cmVcbiAgLy8gZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcbiAgLy8gZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgY3ViZVRleHR1cmVzW2N1cnJlbnRDdWJlVGV4dHVyZUluZGV4XSlcbiAgLy8gZ2wudW5pZm9ybTFpKHNoYWRlclByb2dyYW0uaW5mby5zYW1wbGVyVW5pZm9ybSwgMClcbiAgXG4gIC8vIC8vIEFkZCBsaWdodFxuICAvLyAvLyBUT0RPOiBhZGQgbW9yZSBpbnRlcmFjdGlvblxuICAvLyBnbC51bmlmb3JtMWkoc2hhZGVyUHJvZ3JhbS5pbmZvLnVzZUxpZ2h0aW5nVW5pZm9ybSwgJ2NoZWNrZWQnKVxuICAvLyBnbC51bmlmb3JtM2Yoc2hhZGVyUHJvZ3JhbS5pbmZvLmFtYmllbnRDb2xvclVuaWZvcm0sIDAuMiwgMC4yLCAwLjIpXG4gIC8vIGdsLnVuaWZvcm0zZihzaGFkZXJQcm9ncmFtLmluZm8uZGlyZWN0aW9uYWxDb2xvclVuaWZvcm0sIDAuOCwgMC44LCAwLjgpXG5cbiAgLy8gbGV0IGxpZ2h0aW5nRGlyZWN0aW9uID0gW1xuICAvLyAgIDAuMCwgMC4wLCAtMS4wXG4gIC8vIF1cbiAgLy8gbGV0IGFkanVzdGVkTGlnaHREaXJlY3Rpb24gPSB2ZWMzLmNyZWF0ZSgpXG4gIC8vIC8vIE5vcm1hbGl6ZSBzbyB0aGF0IHRoZSBkb3QgcHJvZHVjdCBpcyB0aGUgc2FtZSB0byBjb3NpbmVcbiAgLy8gdmVjMy5ub3JtYWxpemUoYWRqdXN0ZWRMaWdodERpcmVjdGlvbiwgbGlnaHRpbmdEaXJlY3Rpb24pXG4gIC8vIC8vIFJldmVyc2UgdGhlIGRpcmVjdGlvblxuICAvLyB2ZWMzLnNjYWxlKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIC0xKVxuICAvLyBnbC51bmlmb3JtM2Z2KHNoYWRlclByb2dyYW0uaW5mby5saWdodGluZ0RpcmVjdGlvblVuaWZvcm0sIGFkanVzdGVkTGlnaHREaXJlY3Rpb24pXG5cbiAgLy8gLy8gU3BlY2lmaWMgdG8gdGhpcyBtb2RlbFxuICAvLyBtb2RlbFZpZXdQdXNoTWF0cml4KClcbiAgLy8gbWF0NC50cmFuc2xhdGUobW9kZWxWaWV3TWF0cml4LCBtb2RlbFZpZXdNYXRyaXgsIFswLjAsIDAuMCwgel0pXG4gIC8vIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCByb3RhdGVYLCBbMS4wLCAwLjAsIDAuMF0pXG4gIC8vIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCByb3RhdGVZLCBbMC4wLCAxLjAsIDAuMF0pXG4gIC8vIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCByb3RhdGVaLCBbMC4wLCAwLjAsIDEuMF0pXG4gIFxuICAvLyBzZXRVbmlmb3JtTWF0cml4KClcbiAgXG4gIC8vIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGN1YmVWZXJ0ZXhJbmRleEJ1ZmZlcilcbiAgLy8gZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgY3ViZVZlcnRleEluZGV4QnVmZmVyLmluZm8ubnVtSXRlbXMsIGdsLlVOU0lHTkVEX1NIT1JULCAwKVxuICAvLyBtb2RlbFZpZXdQb3BNYXRyaXgoKVxufVxuXG5mdW5jdGlvbiBkcmF3U2NlbmUgKCkge1xuICByZXNpemVDYW52YXMoNTAwLCA1MDApXG4gIGdsLnZpZXdwb3J0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpXG4gIFxuICBtYXQ0LnBlcnNwZWN0aXZlKHByb2plY3Rpb25NYXRyaXgsIDQ1LCBjYW52YXMud2lkdGggLyBjYW52YXMuaGVpZ2h0LCAwLjEsIDEwMClcbiAgbWF0NC5pZGVudGl0eShtb2RlbFZpZXdNYXRyaXgpXG4gIFxuICAvLyBkcmF3VHJpYW5nbGUoZHQpXG4gIGN1YmVzLmZvckVhY2goKGN1YmUpID0+IGN1YmUuZHJhdygpKVxuICAvLyBkcmF3Q3ViZSgpXG59XG5cbmZ1bmN0aW9uIGRyYXcgKGR0KSB7XG4gIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKVxuICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVClcbiAgZHJhd1NjZW5lKClcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSAoZHQpIHtcbiAgY3ViZXMuZm9yRWFjaCgoY3ViZSkgPT4gY3ViZS5hbmltYXRlKGR0KSlcbiAgLy8gcm90YXRlWCArPSBkZWdUb1JhZChkdCAqIHJvdGF0ZVNwZWVkWCkgLyAxMDBcbiAgLy8gcm90YXRlWSArPSBkZWdUb1JhZChkdCAqIHJvdGF0ZVNwZWVkWSkgLyAxMDBcbiAgLy8gcm90YXRlWiArPSBkZWdUb1JhZChkdCAqIHJvdGF0ZVNwZWVkWikgLyAxMDBcbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5cyAoZHQpIHtcbiAgY3ViZXMuZm9yRWFjaChjdWJlID0+IHtcbiAgICAvLyBDYWxjdWxhdGUgcm90YXRpb25zXG4gICAgLy8gdXBcbiAgICBpZiAoY3VycmVudFByZXNzZWRLZXlzWzM4XSAmJiBjdWJlLnJvdGF0ZVNwZWVkWCA+IC01MCkge1xuICAgICAgY3ViZS5yb3RhdGVTcGVlZFggLT0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIGRvd25cbiAgICBpZiAoY3VycmVudFByZXNzZWRLZXlzWzQwXSAmJiBjdWJlLnJvdGF0ZVNwZWVkWCA8IDUwKSB7XG4gICAgICBjdWJlLnJvdGF0ZVNwZWVkWCArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gbGVmdFxuICAgIGlmIChjdXJyZW50UHJlc3NlZEtleXNbMzddICYmIGN1YmUucm90YXRlU3BlZWRZID4gLTUwKSB7XG4gICAgICBjdWJlLnJvdGF0ZVNwZWVkWSAtPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gdXBcbiAgICBpZiAoY3VycmVudFByZXNzZWRLZXlzWzM5XSAmJiBjdWJlLnJvdGF0ZVNwZWVkWSA8IDUwKSB7XG4gICAgICBjdWJlLnJvdGF0ZVNwZWVkWSArPSAwLjNcbiAgICB9XG4gICAgXG4gICAgLy8gem9vbSBvdXRcbiAgICBpZiAoY3VycmVudFByZXNzZWRLZXlzWzQ5XSAmJiBjdWJlLnogPiAtMzApIHtcbiAgICAgIGN1YmUueiAtPSAwLjJcbiAgICB9XG4gICAgXG4gICAgLy8gem9vbSBpblxuICAgIGlmIChjdXJyZW50UHJlc3NlZEtleXNbNTBdICYmIGN1YmUueiA8IC0xKSB7XG4gICAgICBjdWJlLnogKz0gMC4yXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiB0aWNrIChkdCkge1xuICBhbmltYXRlKGR0KVxuICBoYW5kbGVLZXlzKGR0KVxuICBkcmF3KGR0KVxufVxuXG4vLyBBbmltYXRpb24gbG9vcFxuY29uc3QgZnBzID0gNjBcbmZ1bmN0aW9uIGxvb3AgKGNiKSB7XG4gIGNvbnN0IGR0ID0gMTAwMCAvIGZwc1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gIGxvb3AuZHVyYXRpb24gPSAobG9vcC5kdXJhdGlvbiB8fCAwKSArIG5vdyAtIChsb29wLmxhc3RSdW4gfHwgbm93KVxuICBcbiAgd2hpbGUgKGxvb3AuZHVyYXRpb24gPj0gZHQpIHtcbiAgICBjYihkdClcbiAgICBsb29wLmR1cmF0aW9uIC09IGR0XG4gIH1cbiAgXG4gIGxvb3AubGFzdFJ1biA9IG5vd1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGxvb3AoY2IpKVxufVxuXG5mdW5jdGlvbiBydW4gKCkge1xuICBwcmVwKClcbiAgaW5pdCgpXG4gIFxuICBsb29wKHRpY2spXG59XG5cbnJ1bigpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NhbXBsZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=