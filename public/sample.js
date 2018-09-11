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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2592274a75e6c343e6fe044e632c463c.png";

/***/ }),

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textures_duck_png__ = __webpack_require__(0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlMWJkNGEwOTIyNDAwNWNjYzNmNiIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4dHVyZXMvZHVjay5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhbXBsZS5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2wiLCJzaGFkZXJQcm9ncmFtIiwidHJpYW5nbGVCdWZmZXIiLCJjdWJlQnVmZmVyIiwiY3ViZVZlcnRleEluZGV4QnVmZmVyIiwiY29sb3JCdWZmZXIiLCJjdWJlQ29sb3JCdWZmZXIiLCJjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyIiwiY3ViZVZlcnRleE5vcm1hbEJ1ZmZlciIsInByb2plY3Rpb25NYXRyaXgiLCJtYXQ0IiwiY3JlYXRlIiwibW9kZWxWaWV3TWF0cml4Iiwicm90YXRlWCIsInJvdGF0ZVkiLCJyb3RhdGVaIiwicm90YXRlU3BlZWRYIiwicm90YXRlU3BlZWRZIiwicm90YXRlU3BlZWRaIiwiY3VycmVudFByZXNzZWRLZXlzIiwiY3ViZVRleHR1cmVzIiwiY3VycmVudEN1YmVUZXh0dXJlSW5kZXgiLCJ6IiwiY3ViZXMiLCJtb2RlbFZpZXdNYXRyaXhTdGFjayIsIm1vZGVsVmlld1B1c2hNYXRyaXgiLCJjb3B5IiwicHVzaCIsIm1vZGVsVmlld1BvcE1hdHJpeCIsImxlbmd0aCIsIkVycm9yIiwicG9wIiwiZGVnVG9SYWQiLCJkZWciLCJNYXRoIiwiUEkiLCJ2ZXJ0ZXhTaGFkZXJTb3VyY2UiLCJmcmFnbWVudFNoYWRlclNvdXJjZSIsImhhbmRsZUtleWRvd24iLCJlIiwia2V5Q29kZSIsImZvckVhY2giLCJjdWJlIiwiaGFuZGxlS2V5dXAiLCJwcmVwIiwiZ2V0Q29udGV4dCIsImFsZXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZUFycmF5QnVmZmVyIiwidmVydHMiLCJ2ZXJ0c09wdGlvbiIsInZlcnREYXRhQ29uc3RydWN0b3IiLCJGbG9hdDMyQXJyYXkiLCJiaW5kVGFyZ2V0IiwiQVJSQVlfQlVGRkVSIiwiaXRlbVNpemUiLCJudW1JdGVtcyIsImNyZWF0ZUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJidWZmZXJEYXRhIiwiU1RBVElDX0RSQVciLCJpbmZvIiwiQ3ViZSIsIm9wdGlvbnMiLCJpc0JsZW5kIiwieCIsInkiLCJVaW50MTZBcnJheSIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiaW1hZ2UiLCJpIiwiY3ViZVRleHR1cmUiLCJjcmVhdGVUZXh0dXJlIiwiaGFuZGxlVGV4dHVyZUxvYWRlZCIsImJpbmRUZXh0dXJlIiwiVEVYVFVSRV8yRCIsInBpeGVsU3RvcmVpIiwiVU5QQUNLX0ZMSVBfWV9XRUJHTCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsInRleFBhcmFtZXRlcmkiLCJURVhUVVJFX01BR19GSUxURVIiLCJORUFSRVNUIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiTElORUFSIiwiTElORUFSX01JUE1BUF9ORUFSRVNUIiwiZ2VuZXJhdGVNaXBtYXAiLCJkdCIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORSIsImVuYWJsZSIsIkJMRU5EIiwiZGlzYWJsZSIsIkRFUFRIX1RFU1QiLCJ1bmlmb3JtMWYiLCJhbHBoYVVuaWZvcm0iLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwidmVydGV4UG9zaXRpb25BdHRyaWJ1dGUiLCJGTE9BVCIsInRleHR1cmVDb29yZEF0dHJpYnV0ZSIsInZlcnRleE5vcm1hbEF0dHJpYnV0ZSIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInVuaWZvcm0xaSIsInNhbXBsZXJVbmlmb3JtIiwidXNlTGlnaHRpbmdVbmlmb3JtIiwidW5pZm9ybTNmIiwiYW1iaWVudENvbG9yVW5pZm9ybSIsImRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtIiwibGlnaHRpbmdEaXJlY3Rpb24iLCJhZGp1c3RlZExpZ2h0RGlyZWN0aW9uIiwidmVjMyIsIm5vcm1hbGl6ZSIsInNjYWxlIiwidW5pZm9ybTNmdiIsImxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsInNldFVuaWZvcm1NYXRyaXgiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsImNyZWF0ZVNoYWRlciIsInR5cGUiLCJzaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiRlJBR01FTlRfU0hBREVSIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImNyZWF0ZVNoYWRlclByb2dyYW0iLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJnZXRQcm9ncmFtSW5mb0xvZyIsImluaXRTaGFkZXJzIiwidXNlUHJvZ3JhbSIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJwcm9qZWN0aW9uTWF0cml4VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsIm1vZGVsVmlld01hdHJpeFVuaWZvcm0iLCJuTWF0cml4VW5pZm9ybSIsImluaXRCdWZmZXJzIiwiaW5pdEJ1ZmZlciIsImluaXRUZXh0dXJlIiwiSW1hZ2UiLCJvbmxvYWQiLCJjcm9zc09yaWdpbiIsInNyYyIsImluaXQiLCJyYW5kb20iLCJyZXNpemVDYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsInVuaWZvcm1NYXRyaXg0ZnYiLCJub3JtYWxNYXRyaXgiLCJtYXQzIiwibm9ybWFsRnJvbU1hdDQiLCJ1bmlmb3JtTWF0cml4M2Z2IiwiZHJhd0N1YmUiLCJkcmF3U2NlbmUiLCJ2aWV3cG9ydCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJwZXJzcGVjdGl2ZSIsImlkZW50aXR5IiwiZHJhdyIsImNsZWFyQ29sb3IiLCJhbmltYXRlIiwiaGFuZGxlS2V5cyIsInRpY2siLCJmcHMiLCJsb29wIiwiY2IiLCJub3ciLCJEYXRlIiwiZHVyYXRpb24iLCJsYXN0UnVuIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicnVuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQSxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0F4QztBQUVBLElBQU1BLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQWY7QUFDQSxJQUFJQyxFQUFKO0FBQ0EsSUFBSUMsYUFBSjtBQUNBLElBQUlDLGNBQUo7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMscUJBQUo7QUFDQSxJQUFJQyxXQUFKO0FBQ0EsSUFBSUMsZUFBSixDLENBQ0E7O0FBQ0EsSUFBSUMsNEJBQUo7QUFDQSxJQUFJQyxzQkFBSjtBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxJQUFJLENBQUNDLE1BQUwsRUFBdkI7QUFDQSxJQUFJQyxlQUFlLEdBQUdGLElBQUksQ0FBQ0MsTUFBTCxFQUF0QjtBQUNBLElB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Q0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RixTQUFPLENBQUN4RixFQUFELENBQVA7QUFDQXlGLFlBQVUsQ0FBQ3pGLEVBQUQsQ0FBVjtBQUNBc0YsTUFBSSxDQUFDdEYsRUFBRCxDQUFKO0FBQ0QsQyxDQUVEOzs7QUFDQSxJQUFNMkYsR0FBRyxHQUFHLEVBQVo7O0FBQ0EsU0FBU0MsSUFBVCxDQUFlQyxFQUFmLEVBQW1CO0FBQ2pCLE1BQU03RixFQUFFLEdBQUcsT0FBTzJGLEdBQWxCO0FBQ0EsTUFBTUcsR0FBRyxHQUFHQyxJQUFJLENBQUNELEdBQUwsRUFBWjtBQUNBRixNQUFJLENBQUNJLFFBQUwsR0FBZ0IsQ0FBQ0osSUFBSSxDQUFDSSxRQUFMLElBQWlCLENBQWxCLElBQXVCRixHQUF2QixJQUE4QkYsSUFBSSxDQUFDSyxPQUFMLElBQWdCSCxHQUE5QyxDQUFoQjs7QUFFQSxTQUFPRixJQUFJLENBQUNJLFFBQUwsSUFBaUJoRyxFQUF4QixFQUE0QjtBQUMxQjZGLE1BQUUsQ0FBQzdGLEVBQUQsQ0FBRjtBQUNBNEYsUUFBSSxDQUFDSSxRQUFMLElBQWlCaEcsRUFBakI7QUFDRDs7QUFFRDRGLE1BQUksQ0FBQ0ssT0FBTCxHQUFlSCxHQUFmO0FBQ0FJLFFBQU0sQ0FBQ0MscUJBQVAsQ0FBNkI7QUFBQSxXQUFNUCxJQUFJLENBQUNDLEVBQUQsQ0FBVjtBQUFBLEdBQTdCO0FBQ0Q7O0FBRUQsU0FBU08sR0FBVCxHQUFnQjtBQUNkaEosTUFBSTtBQUNKZ0gsTUFBSTtBQUVKd0IsTUFBSSxDQUFDRixJQUFELENBQUo7QUFDRDs7QUFFRFUsR0FBRyxHIiwiZmlsZSI6InNhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMWJkNGEwOTIyNDAwNWNjYzNmNiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjI1OTIyNzRhNzVlNmMzNDNlNmZlMDQ0ZTYzMmM0NjNjLnBuZ1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RleHR1cmVzL2R1Y2sucG5nXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHRleHR1cmVTcmMgZnJvbSAnLi90ZXh0dXJlcy9kdWNrLnBuZydcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlJylcbmxldCBnbFxubGV0IHNoYWRlclByb2dyYW1cbmxldCB0cmlhbmdsZUJ1ZmZlclxubGV0IGN1YmVCdWZmZXJcbmxldCBjdWJlVmVydGV4SW5kZXhCdWZmZXJcbmxldCBjb2xvckJ1ZmZlclxubGV0IGN1YmVDb2xvckJ1ZmZlclxuLy8gbGV0IGN1YmVUZXh0dXJlXG5sZXQgY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlclxubGV0IGN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXJcbmxldCBwcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKVxubGV0IG1vZGVsVmlld01hdHJpeCA9IG1hdDQuY3JlYXRlKClcbmxldCByb3RhdGVYID0gMFxubGV0IHJvdGF0ZVkgPSAwXG5sZXQgcm90YXRlWiA9IDBcbmxldCByb3RhdGVTcGVlZFggPSAwXG5sZXQgcm90YXRlU3BlZWRZID0gMFxubGV0IHJvdGF0ZVNwZWVkWiA9IDBcbmxldCBjdXJyZW50UHJlc3NlZEtleXMgPSB7fVxubGV0IGN1YmVUZXh0dXJlcyA9IFtdXG5sZXQgY3VycmVudEN1YmVUZXh0dXJlSW5kZXggPSAwXG5sZXQgeiA9IC01XG5cbmxldCBjdWJlcyA9IFtdXG5cbi8vLy8vIFV0aWxzIC8vLy8vXG5jb25zdCBtb2RlbFZpZXdNYXRyaXhTdGFjayA9IFtdXG5mdW5jdGlvbiBtb2RlbFZpZXdQdXNoTWF0cml4ICgpIHtcbiAgbGV0IGNvcHkgPSBtYXQ0LmNyZWF0ZSgpXG4gIG1hdDQuY29weShjb3B5LCBtb2RlbFZpZXdNYXRyaXgpXG4gIG1vZGVsVmlld01hdHJpeFN0YWNrLnB1c2goY29weSlcbn1cblxuZnVuY3Rpb24gbW9kZWxWaWV3UG9wTWF0cml4ICgpIHtcbiAgaWYgKG1vZGVsVmlld01hdHJpeFN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRW1wdHkgbW9kZWwgdmlldyBtYXRyaXggc3RhY2snKVxuICB9XG4gIFxuICBtb2RlbFZpZXdNYXRyaXggPSBtb2RlbFZpZXdNYXRyaXhTdGFjay5wb3AoKVxufVxuXG5mdW5jdGlvbiBkZWdUb1JhZCAoZGVnKSB7XG4gIHJldHVybiBkZWcgLyAxODAgKiBNYXRoLlBJXG59XG5cbi8vLy8vIFNoYWRlciBTb3VyY2UgLy8vLy9cbmNvbnN0IHZlcnRleFNoYWRlclNvdXJjZSA9IGBcbiAgYXR0cmlidXRlIHZlYzMgYVZlcnRleFBvc2l0aW9uO1xuICAvLyBhdHRyaWJ1dGUgdmVjNCBhVmVydGV4Q29sb3I7XG4gIGF0dHJpYnV0ZSB2ZWMzIGFWZXJ0ZXhOb3JtYWw7XG4gIGF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XG5cbiAgdW5pZm9ybSBtYXQ0IHVQcm9qZWN0aW9uTWF0cml4O1xuICB1bmlmb3JtIG1hdDQgdU1vZGVsVmlld01hdHJpeDtcbiAgdW5pZm9ybSBtYXQzIHVOTWF0cml4O1xuXG4gIHVuaWZvcm0gdmVjMyB1QW1iaWVudENvbG9yO1xuXG4gIHVuaWZvcm0gdmVjMyB1TGlnaHRpbmdEaXJlY3Rpb247XG4gIHVuaWZvcm0gdmVjMyB1RGlyZWN0aW9uYWxDb2xvcjtcblxuICB1bmlmb3JtIGJvb2wgdVVzZUxpZ2h0aW5nO1xuXG4gIC8vIHZhcnlpbmcgdmVjNCB2Q29sb3I7XG4gIHZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xuICB2YXJ5aW5nIHZlYzMgdkxpZ2h0V2VpZ2h0aW5nO1xuXG4gIHZvaWQgbWFpbiAodm9pZCkge1xuICAgIGdsX1Bvc2l0aW9uID0gdVByb2plY3Rpb25NYXRyaXggKiB1TW9kZWxWaWV3TWF0cml4ICogdmVjNChhVmVydGV4UG9zaXRpb24sIDEuMCk7XG4gICAgLy8gdkNvbG9yID0gYVZlcnRleENvbG9yO1xuICAgIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1xuXG4gICAgaWYgKHVVc2VMaWdodGluZykge1xuICAgICAgdkxpZ2h0V2VpZ2h0aW5nID0gdmVjMygxLjAsIDEuMCwgMS4wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmVjMyB0cmFuc2Zvcm1lZE5vcm1hbCA9IHVOTWF0cml4ICogYVZlcnRleE5vcm1hbDtcbiAgICAgIGZsb2F0IGRpcmVjdGlvbmFsTGlnaHRXZWlnaHRpbmcgPSBtYXgoMC4wLCBkb3QodHJhbnNmb3JtZWROb3JtYWwsIHVMaWdodGluZ0RpcmVjdGlvbikpO1xuICAgICAgdkxpZ2h0V2VpZ2h0aW5nID0gdUFtYmllbnRDb2xvciArIHVEaXJlY3Rpb25hbENvbG9yICogZGlyZWN0aW9uYWxMaWdodFdlaWdodGluZztcbiAgICB9XG4gIH1cbmBcbmNvbnN0IGZyYWdtZW50U2hhZGVyU291cmNlID0gYFxuICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiAgLy8gdmFyeWluZyB2ZWM0IHZDb2xvcjtcbiAgdmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG4gIHZhcnlpbmcgdmVjMyB2TGlnaHRXZWlnaHRpbmc7XG5cbiAgdW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG4gIHVuaWZvcm0gZmxvYXQgdUFscGhhO1xuXG4gIHZvaWQgbWFpbih2b2lkKSB7XG4gICAgLy8gZ2xfRnJhZ0NvbG9yID0gdkNvbG9yO1xuICAgIHZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQucywgdlRleHR1cmVDb29yZC50KSk7XG4gICAgLy8gQWRqdXN0IHRleHR1cmVDb2xvciByZ2IgdmFsdWUgYnkgbGlnaHQgd2VpZ2h0XG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXh0dXJlQ29sb3IucmdiICogdkxpZ2h0V2VpZ2h0aW5nLCB0ZXh0dXJlQ29sb3IuYSk7XG4gICAgLy8gZ2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXh0dXJlQ29sb3IucmdiICogdkxpZ2h0V2VpZ2h0aW5nLCB0ZXh0dXJlQ29sb3IuYSAqIHVBbHBoYSk7XG4gIH1cbmBcblxuLy8vLy8gUHJlcCBQaGFzZSAvLy8vLyBcbmZ1bmN0aW9uIGhhbmRsZUtleWRvd24gKGUpIHtcbiAgY3VycmVudFByZXNzZWRLZXlzW2Uua2V5Q29kZV0gPSB0cnVlXG4gIFxuICBjdWJlcy5mb3JFYWNoKGN1YmUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDcwKSB7XG4gICAgICBjdWJlLmN1cnJlbnRDdWJlVGV4dHVyZUluZGV4ID0gKGN1YmUuY3VycmVudEN1YmVUZXh0dXJlSW5kZXggKyAxKSAlIDNcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGhhbmRsZUtleXVwIChlKSB7XG4gIGN1cnJlbnRQcmVzc2VkS2V5c1tlLmtleUNvZGVdID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gcHJlcCAoKSB7XG4gIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJylcbiAgXG4gIGlmICghZ2wpIHtcbiAgICBhbGVydCgnd2ViZ2wgaXMgbm90IHN1cHBvcnRlZCcpXG4gICAgcmV0dXJuXG4gIH1cbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlkb3duKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZUtleXVwKVxufVxuXG4vLy8vLyBPYmplY3RzIC8vLy8vXG5mdW5jdGlvbiBjcmVhdGVBcnJheUJ1ZmZlciAodmVydHMgPSBbXSwgdmVydHNPcHRpb24gPSB7fSkge1xuICBjb25zdCB7XG4gICAgdmVydERhdGFDb25zdHJ1Y3RvciA9IEZsb2F0MzJBcnJheSxcbiAgICBiaW5kVGFyZ2V0ID0gZ2wuQVJSQVlfQlVGRkVSLFxuICAgIGl0ZW1TaXplID0gMSxcbiAgICBudW1JdGVtcyA9IHZlcnRzLmxlbmd0aFxuICB9ID0gdmVydHNPcHRpb25cbiAgXG4gIGNvbnN0IGN1YmVCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuICBnbC5iaW5kQnVmZmVyKGJpbmRUYXJnZXQsIGN1YmVCdWZmZXIpXG4gIFxuICBnbC5idWZmZXJEYXRhKGJpbmRUYXJnZXQsIG5ldyB2ZXJ0RGF0YUNvbnN0cnVjdG9yKHZlcnRzKSwgZ2wuU1RBVElDX0RSQVcpXG4gIGN1YmVCdWZmZXIuaW5mbyA9IHtcbiAgICBpdGVtU2l6ZSxcbiAgICBudW1JdGVtc1xuICB9XG5cbiAgcmV0dXJuIGN1YmVCdWZmZXJcbn1cblxuY2xhc3MgQ3ViZSB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgaXNCbGVuZCA9IGZhbHNlLFxuICAgICAgeCA9IDAsXG4gICAgICB5ID0gMCxcbiAgICAgIHogPSAwXG4gICAgfSA9IG9wdGlvbnNcblxuICAgIHRoaXMuaXNCbGVuZCA9IGlzQmxlbmRcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnogPSB6XG5cbiAgICAvLyByb3RhdGUgc3BlZWRzXG4gICAgdGhpcy5yb3RhdGVTcGVlZFggPSAwXG4gICAgdGhpcy5yb3RhdGVTcGVlZFkgPSAwXG4gICAgdGhpcy5yb3RhdGVTcGVlZFogPSAwXG5cbiAgICAvLyByb3RhdGUgcmFkaXVzXG4gICAgdGhpcy5yb3RhdGVYID0gMFxuICAgIHRoaXMucm90YXRlWSA9IDBcbiAgICB0aGlzLnJvdGF0ZVogPSAwXG5cbiAgICAvLyB2ZXJ0ZXggYnVmZmVyXG4gICAgdGhpcy5jdWJlQnVmZmVyID0gbnVsbFxuXG4gICAgLy8gbm9ybWFsIGJ1ZmZlclxuICAgIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlciA9IG51bGxcblxuICAgIC8vIHRleHR1cmUgYnVmZmVyXG4gICAgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyID0gbnVsbFxuICAgIHRoaXMuY3ViZVRleHR1cmVzID0gW11cbiAgICB0aGlzLmN1cnJlbnRDdWJlVGV4dHVyZUluZGV4ID0gMFxuICB9XG5cbiAgaW5pdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5jdWJlQnVmZmVyID0gY3JlYXRlQXJyYXlCdWZmZXIoW1xuICAgICAgLy8gZnJvbnRcbiAgICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgMS4wLFxuICAgICAgMS4wLCAtMS4wLCAxLjAsXG4gICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgXG4gICAgICAvLyBiYWNrXG4gICAgICAtMS4wLCAxLjAsIC0xLjAsXG4gICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAxLjAsIC0xLjAsXG4gICAgICBcbiAgICAgIC8vIHRvcFxuICAgICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgICAtMS4wLCAxLjAsIC0xLjAsXG4gICAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAgIDEuMCwgMS4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIGJvdHRvbVxuICAgICAgLTEuMCwgLTEuMCwgMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIDEuMCwgLTEuMCwgMS4wLFxuXG4gICAgICAvLyByaWdodFxuICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgMS4wLCAtMS4wLCAxLjAsXG5cbiAgICAgIC8vIGxlZnRcbiAgICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbiAgICAgIC0xLjAsIC0xLjAsIDEuMFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAzLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleE5vcm1hbEJ1ZmZlciA9IGNyZWF0ZUFycmF5QnVmZmVyKFtcbiAgICAgIC8vIEZyb250IGZhY2VcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLCAxLjAsXG4gICAgICBcbiAgICAgIC8vIEJhY2sgZmFjZVxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTEuMCxcbiAgICAgIDAuMCwgMC4wLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0xLjAsXG5cbiAgICAgIC8vIFRvcCBmYWNlXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgIDAuMCwgMS4wLCAwLjAsXG4gICAgICAwLjAsIDEuMCwgMC4wLFxuXG4gICAgICAvLyBCb3R0b20gZmFjZVxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG4gICAgICAwLjAsIC0xLjAsIDAuMCxcbiAgICAgIDAuMCwgLTEuMCwgMC4wLFxuICAgICAgMC4wLCAtMS4wLCAwLjAsXG5cbiAgICAgIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLCAwLjAsXG5cbiAgICAgIC8vIExlZnQgZmFjZVxuICAgICAgLTEuMCwgMC4wLCAwLjAsXG4gICAgICAtMS4wLCAwLjAsIDAuMCxcbiAgICAgIC0xLjAsIDAuMCwgMC4wLFxuICAgICAgLTEuMCwgMC4wLCAwLjBcbiAgICBdLCB7XG4gICAgICBpdGVtU2l6ZTogMyxcbiAgICAgIG51bUl0ZW1zOiAyNFxuICAgIH0pXG5cbiAgICB0aGlzLmN1YmVWZXJ0ZXhUZXh0dXJlQ29vcmRCdWZmZXIgPSBjcmVhdGVBcnJheUJ1ZmZlcihbXG4gICAgICAvLyBGcm9udCBmYWNlXG4gICAgICAwLjAsIDAuMCxcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcblxuICAgICAgLy8gQmFjayBmYWNlXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuICAgICAgMC4wLCAxLjAsXG4gICAgICAwLjAsIDAuMCxcblxuICAgICAgLy8gVG9wIGZhY2VcbiAgICAgIDAuMCwgMS4wLFxuICAgICAgMC4wLCAwLjAsXG4gICAgICAxLjAsIDAuMCxcbiAgICAgIDEuMCwgMS4wLFxuXG4gICAgICAvLyBCb3R0b20gZmFjZVxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG5cbiAgICAgIC8vIFJpZ2h0IGZhY2VcbiAgICAgIDEuMCwgMC4wLFxuICAgICAgMS4wLCAxLjAsXG4gICAgICAwLjAsIDEuMCxcbiAgICAgIDAuMCwgMC4wLFxuXG4gICAgICAvLyBMZWZ0IGZhY2VcbiAgICAgIDAuMCwgMC4wLFxuICAgICAgMS4wLCAwLjAsXG4gICAgICAxLjAsIDEuMCxcbiAgICAgIDAuMCwgMS4wLFxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAyLFxuICAgICAgbnVtSXRlbXM6IDI0XG4gICAgfSlcblxuICAgIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyID0gY3JlYXRlQXJyYXlCdWZmZXIoW1xuICAgICAgMCwgMSwgMiwgICAgICAwLCAyLCAzLCAgICAvLyBGcm9udCBmYWNlXG4gICAgICA0LCA1LCA2LCAgICAgIDQsIDYsIDcsICAgIC8vIEJhY2sgZmFjZVxuICAgICAgOCwgOSwgMTAsICAgICA4LCAxMCwgMTEsICAvLyBUb3AgZmFjZVxuICAgICAgMTIsIDEzLCAxNCwgICAxMiwgMTQsIDE1LCAvLyBCb3R0b20gZmFjZVxuICAgICAgMTYsIDE3LCAxOCwgICAxNiwgMTgsIDE5LCAvLyBSaWdodCBmYWNlXG4gICAgICAyMCwgMjEsIDIyLCAgIDIwLCAyMiwgMjMgIC8vIExlZnQgZmFjZVxuICAgIF0sIHtcbiAgICAgIGl0ZW1TaXplOiAxLFxuICAgICAgbnVtSXRlbXM6IDM2LFxuICAgICAgdmVydERhdGFDb25zdHJ1Y3RvcjogVWludDE2QXJyYXksXG4gICAgICBiaW5kVGFyZ2V0OiBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUlxuICAgIH0pXG4gIH1cblxuICBjcmVhdGVUZXh0dXJlIChpbWFnZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBjb25zdCBjdWJlVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKVxuICAgICAgY3ViZVRleHR1cmUuaW1hZ2UgPSBpbWFnZVxuICAgICAgdGhpcy5jdWJlVGV4dHVyZXMucHVzaChjdWJlVGV4dHVyZSlcbiAgICB9XG4gICAgXG4gICAgdGhpcy5oYW5kbGVUZXh0dXJlTG9hZGVkKClcbiAgfVxuXG4gIGhhbmRsZVRleHR1cmVMb2FkZWQgKCkge1xuICAgIC8vIFVzZSB0aHJlZSBkaWZmZXJlbnQgZmlsdGVyc1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmVzWzBdKVxuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlc1swXS5pbWFnZSlcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgICBcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlc1sxXSlcbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKVxuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgdGhpcy5jdWJlVGV4dHVyZXNbMV0uaW1hZ2UpXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUilcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKVxuICAgIFxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuY3ViZVRleHR1cmVzWzJdKVxuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLmN1YmVUZXh0dXJlc1syXS5pbWFnZSlcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpXG4gICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRClcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpXG4gIH1cblxuICBhbmltYXRlIChkdCkge1xuICAgIHRoaXMucm90YXRlWCArPSBkZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRYKSAvIDEwMFxuICAgIHRoaXMucm90YXRlWSArPSBkZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRZKSAvIDEwMFxuICAgIHRoaXMucm90YXRlWiArPSBkZWdUb1JhZChkdCAqIHRoaXMucm90YXRlU3BlZWRaKSAvIDEwMFxuICB9XG5cbiAgZHJhdyAoKSB7XG4gICAgLy8gQ2hlY2sgaWYgbmVlZCB0byBibGVuZFxuICAgIGlmICh0aGlzLmlzQmxlbmQpIHtcbiAgICAgIC8vIEFkZCBibGVuZGluZyBlZmZlY3QgdG8gc2ltdWxhdGUgdHJhbnNwYXJlbmN5XG4gICAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkUpO1xuICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICBnbC51bmlmb3JtMWYoc2hhZGVyUHJvZ3JhbS5pbmZvLmFscGhhVW5pZm9ybSwgMC41KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVClcbiAgICAgIGdsLmRpc2FibGUoZ2wuQkxFTkQpXG4gICAgfVxuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZUJ1ZmZlcilcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoYWRlclByb2dyYW0uaW5mby52ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZSwgdGhpcy5jdWJlQnVmZmVyLmluZm8uaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgICBcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyKVxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hhZGVyUHJvZ3JhbS5pbmZvLnRleHR1cmVDb29yZEF0dHJpYnV0ZSwgdGhpcy5jdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyLmluZm8uaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIpXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4Tm9ybWFsQXR0cmlidXRlLCB0aGlzLmN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIuaW5mby5pdGVtU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIFxuICAgIC8vIEFjdGl2ZSB0ZXh0dXJlXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLmN1YmVUZXh0dXJlc1t0aGlzLmN1cnJlbnRDdWJlVGV4dHVyZUluZGV4XSlcbiAgICBnbC51bmlmb3JtMWkoc2hhZGVyUHJvZ3JhbS5pbmZvLnNhbXBsZXJVbmlmb3JtLCAwKVxuICAgIFxuICAgIC8vIEFkZCBsaWdodFxuICAgIC8vIFRPRE86IGFkZCBtb3JlIGludGVyYWN0aW9uXG4gICAgZ2wudW5pZm9ybTFpKHNoYWRlclByb2dyYW0uaW5mby51c2VMaWdodGluZ1VuaWZvcm0sICdjaGVja2VkJylcbiAgICBnbC51bmlmb3JtM2Yoc2hhZGVyUHJvZ3JhbS5pbmZvLmFtYmllbnRDb2xvclVuaWZvcm0sIDAuMiwgMC4yLCAwLjIpXG4gICAgZ2wudW5pZm9ybTNmKHNoYWRlclByb2dyYW0uaW5mby5kaXJlY3Rpb25hbENvbG9yVW5pZm9ybSwgMC44LCAwLjgsIDAuOClcblxuICAgIGxldCBsaWdodGluZ0RpcmVjdGlvbiA9IFtcbiAgICAgIDAuMCwgMC4wLCAtMS4wXG4gICAgXVxuICAgIGxldCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uID0gdmVjMy5jcmVhdGUoKVxuICAgIC8vIE5vcm1hbGl6ZSBzbyB0aGF0IHRoZSBkb3QgcHJvZHVjdCBpcyB0aGUgc2FtZSB0byBjb3NpbmVcbiAgICB2ZWMzLm5vcm1hbGl6ZShhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCBsaWdodGluZ0RpcmVjdGlvbilcbiAgICAvLyBSZXZlcnNlIHRoZSBkaXJlY3Rpb25cbiAgICB2ZWMzLnNjYWxlKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIC0xKVxuICAgIGdsLnVuaWZvcm0zZnYoc2hhZGVyUHJvZ3JhbS5pbmZvLmxpZ2h0aW5nRGlyZWN0aW9uVW5pZm9ybSwgYWRqdXN0ZWRMaWdodERpcmVjdGlvbilcblxuICAgIC8vIFNwZWNpZmljIHRvIHRoaXMgbW9kZWxcbiAgICBtb2RlbFZpZXdQdXNoTWF0cml4KClcbiAgICBtYXQ0LnRyYW5zbGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgW3RoaXMueCwgdGhpcy55LCB0aGlzLnpdKVxuICAgIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCB0aGlzLnJvdGF0ZVgsIFsxLjAsIDAuMCwgMC4wXSlcbiAgICBtYXQ0LnJvdGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgdGhpcy5yb3RhdGVZLCBbMC4wLCAxLjAsIDAuMF0pXG4gICAgbWF0NC5yb3RhdGUobW9kZWxWaWV3TWF0cml4LCBtb2RlbFZpZXdNYXRyaXgsIHRoaXMucm90YXRlWiwgWzAuMCwgMC4wLCAxLjBdKVxuICAgIFxuICAgIHNldFVuaWZvcm1NYXRyaXgoKVxuICAgIFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyKVxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIHRoaXMuY3ViZVZlcnRleEluZGV4QnVmZmVyLmluZm8ubnVtSXRlbXMsIGdsLlVOU0lHTkVEX1NIT1JULCAwKVxuICAgIG1vZGVsVmlld1BvcE1hdHJpeCgpXG4gIH1cbn1cblxuLy8vLy8gSW5pdCBQaGFzZSAvLy8vLyBcbmZ1bmN0aW9uIGNyZWF0ZVNoYWRlciAodHlwZSkge1xuICBsZXQgc2hhZGVyXG4gIFxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd2ZXJ0ZXgnOlxuICAgICAgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpXG4gICAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpXG4gICAgICBicmVha1xuICAgICAgXG4gICAgY2FzZSAnZnJhZ21lbnQnOlxuICAgICAgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUilcbiAgICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIGZyYWdtZW50U2hhZGVyU291cmNlKVxuICAgICAgYnJlYWtcbiAgICAgIFxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc2hhZGVyIHR5cGUgdG8gY3JlYXRlOiAke3R5cGV9YClcbiAgfVxuICBcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXG4gIFxuICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgIC8vIFRoZSBzaGFkZXIgaXMgbm90IGNvcnJlY3RseSBjb21waWxlZFxuICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpXG4gIH1cbiAgXG4gIHJldHVybiBzaGFkZXJcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hhZGVyUHJvZ3JhbSAoKSB7XG4gIHNoYWRlclByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKClcbiAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIGNyZWF0ZVNoYWRlcigndmVydGV4JykpXG4gIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCBjcmVhdGVTaGFkZXIoJ2ZyYWdtZW50JykpXG4gIGdsLmxpbmtQcm9ncmFtKHNoYWRlclByb2dyYW0pXG4gIFxuICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIoc2hhZGVyUHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgLy8gVGhlIHNoYWRlciBwcm9ncmFtIGlzIG5vdCBjb3JyZWN0bHkgbGlua2VkXG4gICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHNoYWRlclByb2dyYW0pKVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRTaGFkZXJzICgpIHtcbiAgY3JlYXRlU2hhZGVyUHJvZ3JhbSgpXG4gIGdsLnVzZVByb2dyYW0oc2hhZGVyUHJvZ3JhbSlcbiAgXG4gIC8vIFB1dCBhbGwgYXR0YWNoZWQgaW5mb3JtYXRpb24gdG8gc2hhZGVyIHByb2dyYW0gbWV0YSBpbmZvcm1hdGlvblxuICBzaGFkZXJQcm9ncmFtLmluZm8gPSB7fVxuICBcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FWZXJ0ZXhQb3NpdGlvbicpXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoYWRlclByb2dyYW0uaW5mby52ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZSlcbiAgXG4gIC8vIHNoYWRlclByb2dyYW0uaW5mby52ZXJ0ZXhDb2xvckF0dHJpYnV0ZSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVmVydGV4Q29sb3InKVxuICAvLyBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4Q29sb3JBdHRyaWJ1dGUpXG4gIFxuICBzaGFkZXJQcm9ncmFtLmluZm8udGV4dHVyZUNvb3JkQXR0cmlidXRlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FUZXh0dXJlQ29vcmQnKVxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGFkZXJQcm9ncmFtLmluZm8udGV4dHVyZUNvb3JkQXR0cmlidXRlKVxuICBcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleE5vcm1hbEF0dHJpYnV0ZSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVmVydGV4Tm9ybWFsJylcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleE5vcm1hbEF0dHJpYnV0ZSlcblxuICAvLyB3aWxsIHB1dCB1bmlmb3JtIGhlcmVcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLnByb2plY3Rpb25NYXRyaXhVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1UHJvamVjdGlvbk1hdHJpeCcpXG4gIHNoYWRlclByb2dyYW0uaW5mby5tb2RlbFZpZXdNYXRyaXhVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1TW9kZWxWaWV3TWF0cml4JylcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLnNhbXBsZXJVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1U2FtcGxlcicpXG4gIHNoYWRlclByb2dyYW0uaW5mby51c2VMaWdodGluZ1VuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VVc2VMaWdodGluZycpXG4gIHNoYWRlclByb2dyYW0uaW5mby5hbWJpZW50Q29sb3JVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1QW1iaWVudENvbG9yJylcbiAgc2hhZGVyUHJvZ3JhbS5pbmZvLmRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1RGlyZWN0aW9uYWxDb2xvcicpXG4gIHNoYWRlclByb2dyYW0uaW5mby5saWdodGluZ0RpcmVjdGlvblVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VMaWdodGluZ0RpcmVjdGlvbicpXG4gIHNoYWRlclByb2dyYW0uaW5mby5uTWF0cml4VW5pZm9ybSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndU5NYXRyaXgnKVxuICBzaGFkZXJQcm9ncmFtLmluZm8uYWxwaGFVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1QWxwaGEnKVxufVxuXG4vLyBmdW5jdGlvbiBpbml0VHJpYW5nbGVCdWZmZXJzICgpIHtcbi8vICAgdHJpYW5nbGVCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuLy8gICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdHJpYW5nbGVCdWZmZXIpXG4gIFxuLy8gICBjb25zdCB2ZXJ0cyA9IFtcbi8vICAgICAvLyBmcm9udFxuLy8gICAgIDAuMCwgMi4wLCAwLjAsXG4vLyAgICAgLTEuMCwgMC4wLCAxLjAsXG4vLyAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICBcbi8vICAgICAvLyBsZWZ0XG4vLyAgICAgMC4wLCAyLjAsIDAuMCxcbi8vICAgICAtMS4wLCAwLjAsIDEuMCxcbi8vICAgICAtMS4wLCAwLjAsIC0xLjAsXG4gICAgXG4vLyAgICAgLy8gYmFja1xuLy8gICAgIDAuMCwgMi4wLCAwLjAsXG4vLyAgICAgLTEuMCwgMC4wLCAtMS4wLFxuLy8gICAgIDEuMCwgMC4wLCAtMS4wLFxuICAgIFxuLy8gICAgIC8vIHJpZ2h0XG4vLyAgICAgMC4wLCAyLjAsIDAuMCxcbi8vICAgICAxLjAsIDAuMCwgLTEuMCxcbi8vICAgICAxLjAsIDAuMCwgMS4wXG4vLyAgIF1cbiAgXG4vLyAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRzKSwgZ2wuU1RBVElDX0RSQVcpXG4vLyAgIHRyaWFuZ2xlQnVmZmVyLmluZm8gPSB7XG4vLyAgICAgaXRlbVNpemU6IDMsXG4vLyAgICAgbnVtSXRlbXM6IDEyXG4vLyAgIH1cbiAgXG4vLyAgIGNvbG9yQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKClcbi8vICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGNvbG9yQnVmZmVyKVxuICBcbi8vICAgY29uc3QgdmVydENvbG9ycyA9IFtcbi8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbiAgICBcbi8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbiAgICBcbi8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbiAgICBcbi8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbi8vICAgXVxuLy8gICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0Q29sb3JzKSwgZ2wuU1RBVElDX0RSQVcpXG4vLyAgIGNvbG9yQnVmZmVyLmluZm8gPSB7XG4vLyAgICAgaXRlbVNpemU6IDQsXG4vLyAgICAgbnVtSXRlbXM6IDEyXG4vLyAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gaW5pdEN1YmVCdWZmZXJzICgpIHtcbi8vIC8vICAgY3ViZUJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4vLyAvLyAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdWJlQnVmZmVyKVxuICBcbi8vIC8vICAgY29uc3QgdmVydHMgPSBbXG4vLyAvLyAgICAgLy8gZnJvbnRcbi8vIC8vICAgICAtMS4wLCAxLjAsIDEuMCxcbi8vIC8vICAgICAtMS4wLCAtMS4wLCAxLjAsXG4vLyAvLyAgICAgMS4wLCAtMS4wLCAxLjAsXG4vLyAvLyAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICBcbi8vIC8vICAgICAvLyBiYWNrXG4vLyAvLyAgICAgLTEuMCwgMS4wLCAtMS4wLFxuLy8gLy8gICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4vLyAvLyAgICAgMS4wLCAtMS4wLCAtMS4wLFxuLy8gLy8gICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgIFxuLy8gLy8gICAgIC8vIHRvcFxuLy8gLy8gICAgIC0xLjAsIDEuMCwgMS4wLFxuLy8gLy8gICAgIC0xLjAsIDEuMCwgLTEuMCxcbi8vIC8vICAgICAxLjAsIDEuMCwgLTEuMCxcbi8vIC8vICAgICAxLjAsIDEuMCwgMS4wLFxuICAgIFxuLy8gLy8gICAgIC8vIGJvdHRvbVxuLy8gLy8gICAgIC0xLjAsIC0xLjAsIDEuMCxcbi8vIC8vICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuLy8gLy8gICAgIDEuMCwgLTEuMCwgLTEuMCxcbi8vIC8vICAgICAxLjAsIC0xLjAsIDEuMCxcblxuLy8gLy8gICAgIC8vIHJpZ2h0XG4vLyAvLyAgICAgMS4wLCAxLjAsIDEuMCxcbi8vIC8vICAgICAxLjAsIDEuMCwgLTEuMCxcbi8vIC8vICAgICAxLjAsIC0xLjAsIC0xLjAsXG4vLyAvLyAgICAgMS4wLCAtMS4wLCAxLjAsXG5cbi8vIC8vICAgICAvLyBsZWZ0XG4vLyAvLyAgICAgLTEuMCwgMS4wLCAxLjAsXG4vLyAvLyAgICAgLTEuMCwgMS4wLCAtMS4wLFxuLy8gLy8gICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4vLyAvLyAgICAgLTEuMCwgLTEuMCwgMS4wXG4vLyAvLyAgIF1cbiAgXG4vLyAvLyAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRzKSwgZ2wuU1RBVElDX0RSQVcpXG4vLyAvLyAgIGN1YmVCdWZmZXIuaW5mbyA9IHtcbi8vIC8vICAgICBpdGVtU2l6ZTogMyxcbi8vIC8vICAgICBudW1JdGVtczogMjRcbi8vIC8vICAgfVxuXG4vLyAvLyAgIGN1YmVWZXJ0ZXhOb3JtYWxCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuLy8gLy8gICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3ViZVZlcnRleE5vcm1hbEJ1ZmZlcilcblxuLy8gLy8gICBjb25zdCB2ZXJ0Tm9ybWFscyA9IFtcbi8vIC8vICAgICAvLyBGcm9udCBmYWNlXG4vLyAvLyAgICAgMC4wLCAwLjAsIDEuMCxcbi8vIC8vICAgICAwLjAsIDAuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICBcbi8vIC8vICAgICAvLyBCYWNrIGZhY2Vcbi8vIC8vICAgICAwLjAsIDAuMCwgLTEuMCxcbi8vIC8vICAgICAwLjAsIDAuMCwgLTEuMCxcbi8vIC8vICAgICAwLjAsIDAuMCwgLTEuMCxcbi8vIC8vICAgICAwLjAsIDAuMCwgLTEuMCxcblxuLy8gLy8gICAgIC8vIFRvcCBmYWNlXG4vLyAvLyAgICAgMC4wLCAxLjAsIDAuMCxcbi8vIC8vICAgICAwLjAsIDEuMCwgMC4wLFxuLy8gLy8gICAgIDAuMCwgMS4wLCAwLjAsXG4vLyAvLyAgICAgMC4wLCAxLjAsIDAuMCxcblxuLy8gLy8gICAgIC8vIEJvdHRvbSBmYWNlXG4vLyAvLyAgICAgMC4wLCAtMS4wLCAwLjAsXG4vLyAvLyAgICAgMC4wLCAtMS4wLCAwLjAsXG4vLyAvLyAgICAgMC4wLCAtMS4wLCAwLjAsXG4vLyAvLyAgICAgMC4wLCAtMS4wLCAwLjAsXG5cbi8vIC8vICAgICAvLyBSaWdodCBmYWNlXG4vLyAvLyAgICAgMS4wLCAwLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDAuMCwgMC4wLFxuLy8gLy8gICAgIDEuMCwgMC4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAwLjAsIDAuMCxcblxuLy8gLy8gICAgIC8vIExlZnQgZmFjZVxuLy8gLy8gICAgIC0xLjAsIDAuMCwgMC4wLFxuLy8gLy8gICAgIC0xLjAsIDAuMCwgMC4wLFxuLy8gLy8gICAgIC0xLjAsIDAuMCwgMC4wLFxuLy8gLy8gICAgIC0xLjAsIDAuMCwgMC4wXG4vLyAvLyAgIF1cbi8vIC8vICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydE5vcm1hbHMpLCBnbC5TVEFUSUNfRFJBVylcbi8vIC8vICAgY3ViZVZlcnRleE5vcm1hbEJ1ZmZlci5pbmZvID0ge1xuLy8gLy8gICAgIGl0ZW1TaXplOiAzLCBcbi8vIC8vICAgICBudW1JdGVtczogMjRcbi8vIC8vICAgfVxuICBcbi8vIC8vICAgY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4vLyAvLyAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyKVxuICBcbi8vIC8vICAgY29uc3QgdmVydENvb3JkcyA9IFtcbi8vIC8vICAgICAvLyBGcm9udCBmYWNlXG4vLyAvLyAgICAgMC4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAxLjAsXG5cbi8vIC8vICAgICAvLyBCYWNrIGZhY2Vcbi8vIC8vICAgICAxLjAsIDAuMCxcbi8vIC8vICAgICAxLjAsIDEuMCxcbi8vIC8vICAgICAwLjAsIDEuMCxcbi8vIC8vICAgICAwLjAsIDAuMCxcblxuLy8gLy8gICAgIC8vIFRvcCBmYWNlXG4vLyAvLyAgICAgMC4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAxLjAsXG5cbi8vIC8vICAgICAvLyBCb3R0b20gZmFjZVxuLy8gLy8gICAgIDEuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLFxuLy8gLy8gICAgIDEuMCwgMC4wLFxuXG4vLyAvLyAgICAgLy8gUmlnaHQgZmFjZVxuLy8gLy8gICAgIDEuMCwgMC4wLFxuLy8gLy8gICAgIDEuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMS4wLFxuLy8gLy8gICAgIDAuMCwgMC4wLFxuXG4vLyAvLyAgICAgLy8gTGVmdCBmYWNlXG4vLyAvLyAgICAgMC4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAwLjAsXG4vLyAvLyAgICAgMS4wLCAxLjAsXG4vLyAvLyAgICAgMC4wLCAxLjAsXG4vLyAvLyAgIF1cbiAgXG4vLyAvLyAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRDb29yZHMpLCBnbC5TVEFUSUNfRFJBVylcbi8vIC8vICAgY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlci5pbmZvID0ge1xuLy8gLy8gICAgIGl0ZW1TaXplOiAyLFxuLy8gLy8gICAgIG51bUl0ZW1zOiAyNFxuLy8gLy8gICB9XG4gIFxuLy8gLy8gLy8gICBjdWJlQ29sb3JCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuLy8gLy8gLy8gICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3ViZUNvbG9yQnVmZmVyKVxuICBcbi8vIC8vIC8vICAgY29uc3QgdmVydENvbG9ycyA9IFtcbi8vIC8vIC8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMC4wLCAxLjAsXG4gICAgXG4vLyAvLyAvLyAgICAgMS4wLCAwLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMS4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMS4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDAuMCwgMS4wLFxuICAgIFxuLy8gLy8gLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAwLjAsIDEuMCxcbiAgICBcbi8vIC8vIC8vICAgICAxLjAsIDAuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAxLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAxLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMC4wLCAxLjAsXG4gICAgXG4vLyAvLyAvLyAgICAgMS4wLCAwLjAsIDAuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMS4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDAuMCwgMS4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDAuMCwgMS4wLFxuICAgIFxuLy8gLy8gLy8gICAgIDEuMCwgMC4wLCAwLjAsIDEuMCxcbi8vIC8vIC8vICAgICAwLjAsIDEuMCwgMC4wLCAxLjAsXG4vLyAvLyAvLyAgICAgMC4wLCAwLjAsIDEuMCwgMS4wLFxuLy8gLy8gLy8gICAgIDAuMCwgMC4wLCAwLjAsIDEuMFxuLy8gLy8gLy8gICBdXG4vLyAvLyAvLyAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRDb2xvcnMpLCBnbC5TVEFUSUNfRFJBVylcbi8vIC8vIC8vICAgY3ViZUNvbG9yQnVmZmVyLmluZm8gPSB7XG4vLyAvLyAvLyAgICAgaXRlbVNpemU6IDQsXG4vLyAvLyAvLyAgICAgbnVtSXRlbXM6IDI0XG4vLyAvLyAvLyAgIH1cbiAgXG4vLyAvLyAgIC8vIFdoZW4gZHJhd2luZywgd2UgYXJlIHN0aWxsIGRyYXdpbmcgdHJpYW5nbGVzLlxuLy8gLy8gICAvLyBXZSBhcmUgZ29pbmcgdG8gdXNlIGFuIGluZGV4IGJ1ZmZlciB0byBndWlkZSB3ZWJnbCB0byBkcmF3IHRoZW0gYXQgdGhlIHJpZ2h0IHBvc2l0aW9uc1xuLy8gLy8gICBjdWJlVmVydGV4SW5kZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuLy8gLy8gICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBjdWJlVmVydGV4SW5kZXhCdWZmZXIpXG4vLyAvLyAgIGxldCB2ZXJ0SW5kaWNlcyA9IFtcbi8vIC8vICAgICAwLCAxLCAyLCAgICAgIDAsIDIsIDMsICAgIC8vIEZyb250IGZhY2Vcbi8vIC8vICAgICA0LCA1LCA2LCAgICAgIDQsIDYsIDcsICAgIC8vIEJhY2sgZmFjZVxuLy8gLy8gICAgIDgsIDksIDEwLCAgICAgOCwgMTAsIDExLCAgLy8gVG9wIGZhY2Vcbi8vIC8vICAgICAxMiwgMTMsIDE0LCAgIDEyLCAxNCwgMTUsIC8vIEJvdHRvbSBmYWNlXG4vLyAvLyAgICAgMTYsIDE3LCAxOCwgICAxNiwgMTgsIDE5LCAvLyBSaWdodCBmYWNlXG4vLyAvLyAgICAgMjAsIDIxLCAyMiwgICAyMCwgMjIsIDIzICAvLyBMZWZ0IGZhY2Vcbi8vIC8vICAgXVxuLy8gLy8gICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodmVydEluZGljZXMpLCBnbC5TVEFUSUNfRFJBVylcbi8vIC8vICAgY3ViZVZlcnRleEluZGV4QnVmZmVyLmluZm8gPSB7XG4vLyAvLyAgICAgaXRlbVNpemU6IDEsIFxuLy8gLy8gICAgIG51bUl0ZW1zOiAzNlxuLy8gLy8gICB9XG4vLyB9XG5cbmZ1bmN0aW9uIGluaXRCdWZmZXJzICgpIHtcbiAgLy8gaW5pdFRyaWFuZ2xlQnVmZmVycygpXG4gIC8vIGluaXRDdWJlQnVmZmVycygpXG4gIGN1YmVzLmZvckVhY2goKGN1YmUpID0+IGN1YmUuaW5pdEJ1ZmZlcigpKVxufVxuXG4vLyBmdW5jdGlvbiBoYW5kbGVUZXh0dXJlTG9hZGVkICgpIHtcbi8vICAgLy8gVXNlIHRocmVlIGRpZmZlcmVudCBmaWx0ZXJzXG4vLyAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGN1YmVUZXh0dXJlc1swXSlcbi8vICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbi8vICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBjdWJlVGV4dHVyZXNbMF0uaW1hZ2UpXG4vLyAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxuLy8gICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgXG4vLyAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGN1YmVUZXh0dXJlc1sxXSlcbi8vICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcbi8vICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBjdWJlVGV4dHVyZXNbMV0uaW1hZ2UpXG4vLyAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpXG4vLyAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpXG4gIFxuLy8gICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBjdWJlVGV4dHVyZXNbMl0pXG4vLyAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXG4vLyAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgY3ViZVRleHR1cmVzWzJdLmltYWdlKVxuLy8gICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKVxuLy8gICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKVxuLy8gICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKVxuXG4vLyAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpXG4vLyB9XG5cbmZ1bmN0aW9uIGluaXRUZXh0dXJlICgpIHtcbiAgbGV0IGltYWdlID0gbmV3IEltYWdlKClcbiAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGN1YmVzLmZvckVhY2goY3ViZSA9PiBjdWJlLmNyZWF0ZVRleHR1cmUoaW1hZ2UpKVxuICAgIC8vIGhhbmRsZVRleHR1cmVMb2FkZWQoKVxuICB9XG4gIFxuICAvLyBOZWVkIHRvIHJlcXVlc3QgQ09SUyAoQ3Jvc3MgT3JpZ2luIFJlc291cmNlIFNoYXJpbmcpXG4gIGltYWdlLmNyb3NzT3JpZ2luID0gJydcbiAgLy8gQ2FuIG9ubHkgdXNlIHBvd2VyIG9mIDIgc2l6ZSBpbWFnZXNcbiAgLy8gaW1hZ2Uuc3JjID0gJ2h0dHBzOi8vY2RuNi5hcHRvaWRlLmNvbS9pbWdzLzgvNS9mLzg1ZmQ1OGM5MTdkYmY0NmFlMDY0ZGE3YzcyOTkxODJlX2ljb24ucG5nJ1xuICAvLyBpbWFnZS5zcmMgPSAnaHR0cHM6Ly9jMi5zdGF0aWNmbGlja3IuY29tLzQvMzQwOC8zMjcxNjI2NTk2XzMzMzQ3ZmFjMTlfby5wbmcnXG4gIC8vIGltYWdlLnNyYyA9ICcuLi9jcmF0ZS5naWYnXG4gIGltYWdlLnNyYyA9IHRleHR1cmVTcmNcbn1cblxuZnVuY3Rpb24gaW5pdCAoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgIGN1YmVzLnB1c2gobmV3IEN1YmUoe1xuICAgICAgaXNCbGVuZDogdHJ1ZSxcbiAgICAgIHg6IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwLFxuICAgICAgeTogTWF0aC5yYW5kb20oKSAqIDIwIC0gMTAsXG4gICAgICB6OiAtMjBcbiAgICB9KSlcbiAgfVxuICBcbiAgaW5pdFNoYWRlcnMoKVxuICBpbml0QnVmZmVycygpXG4gIGluaXRUZXh0dXJlKClcbn1cblxuLy8vLy8gRHJhdyBQaGFzZSAvLy8vLyBcbmZ1bmN0aW9uIHJlc2l6ZUNhbnZhcyAod2lkdGgsIGhlaWdodCkge1xuICBjYW52YXMud2lkdGggPSB3aWR0aFxuICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG59XG5cbmZ1bmN0aW9uIHNldFVuaWZvcm1NYXRyaXggKCkge1xuICBnbC51bmlmb3JtTWF0cml4NGZ2KHNoYWRlclByb2dyYW0uaW5mby5wcm9qZWN0aW9uTWF0cml4VW5pZm9ybSwgZmFsc2UsIHByb2plY3Rpb25NYXRyaXgpXG4gIGdsLnVuaWZvcm1NYXRyaXg0ZnYoc2hhZGVyUHJvZ3JhbS5pbmZvLm1vZGVsVmlld01hdHJpeFVuaWZvcm0sIGZhbHNlLCBtb2RlbFZpZXdNYXRyaXgpXG5cbiAgLy8gR2V0IHRoZSByaWdodCBub3JtYWwgbWF0cml4XG4gIGxldCBub3JtYWxNYXRyaXggPSBtYXQzLmNyZWF0ZSgpXG4gIC8vIG1hdDMuZnJvbU1hdDQobm9ybWFsTWF0cml4LCBtb2RlbFZpZXdNYXRyaXgpXG4gIC8vIG1hdDMuaW52ZXJ0KG5vcm1hbE1hdHJpeCwgbm9ybWFsTWF0cml4KVxuICAvLyAvLyBtYXQ0LnRvSW52ZXJzZU1hdDMobW9kZWxWaWV3TWF0cml4LCBub3JtYWxNYXRyaXgpXG4gIC8vIG1hdDMudHJhbnNwb3NlKG5vcm1hbE1hdHJpeCwgbm9ybWFsTWF0cml4KVxuICBtYXQzLm5vcm1hbEZyb21NYXQ0KG5vcm1hbE1hdHJpeCwgbW9kZWxWaWV3TWF0cml4KVxuICBnbC51bmlmb3JtTWF0cml4M2Z2KHNoYWRlclByb2dyYW0uaW5mby5uTWF0cml4VW5pZm9ybSwgZmFsc2UsIG5vcm1hbE1hdHJpeClcbn1cblxuLy8gZnVuY3Rpb24gZHJhd1RyaWFuZ2xlIChkdCkge1xuLy8gICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdHJpYW5nbGVCdWZmZXIpXG4vLyAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCB0cmlhbmdsZUJ1ZmZlci5pbmZvLml0ZW1TaXplLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gIFxuLy8gICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY29sb3JCdWZmZXIpXG4vLyAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hhZGVyUHJvZ3JhbS5pbmZvLnZlcnRleENvbG9yQXR0cmlidXRlLCBjb2xvckJ1ZmZlci5pbmZvLml0ZW1TaXplLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gIFxuLy8gICAvLyBTcGVjaWZpYyB0byB0aGlzIG1vZGVsXG4vLyAgIG1vZGVsVmlld1B1c2hNYXRyaXgoKVxuLy8gICBtYXQ0LnRyYW5zbGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgWzAuMCwgMC41LCAtNV0pXG4vLyAgIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCAocm90YXRlWSArPSBNYXRoLlBJICogMC4wMDEgKiBkdCAlIChNYXRoLlBJICogMikpLCBbMC4wLCAxLjAsIDAuMF0pXG4gIFxuLy8gICBzZXRVbmlmb3JtTWF0cml4KClcbiAgXG4vLyAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCB0cmlhbmdsZUJ1ZmZlci5pbmZvLm51bUl0ZW1zKVxuLy8gICBtb2RlbFZpZXdQb3BNYXRyaXgoKVxuLy8gfVxuXG5mdW5jdGlvbiBkcmF3Q3ViZSAoKSB7XG4gIC8vIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdWJlQnVmZmVyKVxuICAvLyBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoYWRlclByb2dyYW0uaW5mby52ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZSwgY3ViZUJ1ZmZlci5pbmZvLml0ZW1TaXplLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gIFxuICAvLyBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3ViZVZlcnRleFRleHR1cmVDb29yZEJ1ZmZlcilcbiAgLy8gZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGFkZXJQcm9ncmFtLmluZm8udGV4dHVyZUNvb3JkQXR0cmlidXRlLCBjdWJlVmVydGV4VGV4dHVyZUNvb3JkQnVmZmVyLmluZm8uaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcblxuICAvLyBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3ViZVZlcnRleE5vcm1hbEJ1ZmZlcilcbiAgLy8gZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGFkZXJQcm9ncmFtLmluZm8udmVydGV4Tm9ybWFsQXR0cmlidXRlLCBjdWJlVmVydGV4Tm9ybWFsQnVmZmVyLmluZm8uaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgXG4gIC8vIC8vIEFjdGl2ZSB0ZXh0dXJlXG4gIC8vIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApXG4gIC8vIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGN1YmVUZXh0dXJlc1tjdXJyZW50Q3ViZVRleHR1cmVJbmRleF0pXG4gIC8vIGdsLnVuaWZvcm0xaShzaGFkZXJQcm9ncmFtLmluZm8uc2FtcGxlclVuaWZvcm0sIDApXG4gIFxuICAvLyAvLyBBZGQgbGlnaHRcbiAgLy8gLy8gVE9ETzogYWRkIG1vcmUgaW50ZXJhY3Rpb25cbiAgLy8gZ2wudW5pZm9ybTFpKHNoYWRlclByb2dyYW0uaW5mby51c2VMaWdodGluZ1VuaWZvcm0sICdjaGVja2VkJylcbiAgLy8gZ2wudW5pZm9ybTNmKHNoYWRlclByb2dyYW0uaW5mby5hbWJpZW50Q29sb3JVbmlmb3JtLCAwLjIsIDAuMiwgMC4yKVxuICAvLyBnbC51bmlmb3JtM2Yoc2hhZGVyUHJvZ3JhbS5pbmZvLmRpcmVjdGlvbmFsQ29sb3JVbmlmb3JtLCAwLjgsIDAuOCwgMC44KVxuXG4gIC8vIGxldCBsaWdodGluZ0RpcmVjdGlvbiA9IFtcbiAgLy8gICAwLjAsIDAuMCwgLTEuMFxuICAvLyBdXG4gIC8vIGxldCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uID0gdmVjMy5jcmVhdGUoKVxuICAvLyAvLyBOb3JtYWxpemUgc28gdGhhdCB0aGUgZG90IHByb2R1Y3QgaXMgdGhlIHNhbWUgdG8gY29zaW5lXG4gIC8vIHZlYzMubm9ybWFsaXplKGFkanVzdGVkTGlnaHREaXJlY3Rpb24sIGxpZ2h0aW5nRGlyZWN0aW9uKVxuICAvLyAvLyBSZXZlcnNlIHRoZSBkaXJlY3Rpb25cbiAgLy8gdmVjMy5zY2FsZShhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uLCAtMSlcbiAgLy8gZ2wudW5pZm9ybTNmdihzaGFkZXJQcm9ncmFtLmluZm8ubGlnaHRpbmdEaXJlY3Rpb25Vbmlmb3JtLCBhZGp1c3RlZExpZ2h0RGlyZWN0aW9uKVxuXG4gIC8vIC8vIFNwZWNpZmljIHRvIHRoaXMgbW9kZWxcbiAgLy8gbW9kZWxWaWV3UHVzaE1hdHJpeCgpXG4gIC8vIG1hdDQudHJhbnNsYXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCBbMC4wLCAwLjAsIHpdKVxuICAvLyBtYXQ0LnJvdGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgcm90YXRlWCwgWzEuMCwgMC4wLCAwLjBdKVxuICAvLyBtYXQ0LnJvdGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgcm90YXRlWSwgWzAuMCwgMS4wLCAwLjBdKVxuICAvLyBtYXQ0LnJvdGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgcm90YXRlWiwgWzAuMCwgMC4wLCAxLjBdKVxuICBcbiAgLy8gc2V0VW5pZm9ybU1hdHJpeCgpXG4gIFxuICAvLyBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBjdWJlVmVydGV4SW5kZXhCdWZmZXIpXG4gIC8vIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIGN1YmVWZXJ0ZXhJbmRleEJ1ZmZlci5pbmZvLm51bUl0ZW1zLCBnbC5VTlNJR05FRF9TSE9SVCwgMClcbiAgLy8gbW9kZWxWaWV3UG9wTWF0cml4KClcbn1cblxuZnVuY3Rpb24gZHJhd1NjZW5lICgpIHtcbiAgcmVzaXplQ2FudmFzKDUwMCwgNTAwKVxuICBnbC52aWV3cG9ydCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKVxuICBcbiAgbWF0NC5wZXJzcGVjdGl2ZShwcm9qZWN0aW9uTWF0cml4LCA0NSwgY2FudmFzLndpZHRoIC8gY2FudmFzLmhlaWdodCwgMC4xLCAxMDApXG4gIG1hdDQuaWRlbnRpdHkobW9kZWxWaWV3TWF0cml4KVxuICBcbiAgLy8gZHJhd1RyaWFuZ2xlKGR0KVxuICBjdWJlcy5mb3JFYWNoKChjdWJlKSA9PiBjdWJlLmRyYXcoKSlcbiAgLy8gZHJhd0N1YmUoKVxufVxuXG5mdW5jdGlvbiBkcmF3IChkdCkge1xuICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMClcbiAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpXG4gIGRyYXdTY2VuZSgpXG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUgKGR0KSB7XG4gIGN1YmVzLmZvckVhY2goKGN1YmUpID0+IGN1YmUuYW5pbWF0ZShkdCkpXG4gIC8vIHJvdGF0ZVggKz0gZGVnVG9SYWQoZHQgKiByb3RhdGVTcGVlZFgpIC8gMTAwXG4gIC8vIHJvdGF0ZVkgKz0gZGVnVG9SYWQoZHQgKiByb3RhdGVTcGVlZFkpIC8gMTAwXG4gIC8vIHJvdGF0ZVogKz0gZGVnVG9SYWQoZHQgKiByb3RhdGVTcGVlZFopIC8gMTAwXG59XG5cbmZ1bmN0aW9uIGhhbmRsZUtleXMgKGR0KSB7XG4gIGN1YmVzLmZvckVhY2goY3ViZSA9PiB7XG4gICAgLy8gQ2FsY3VsYXRlIHJvdGF0aW9uc1xuICAgIC8vIHVwXG4gICAgaWYgKGN1cnJlbnRQcmVzc2VkS2V5c1szOF0gJiYgY3ViZS5yb3RhdGVTcGVlZFggPiAtNTApIHtcbiAgICAgIGN1YmUucm90YXRlU3BlZWRYIC09IDAuM1xuICAgIH1cbiAgICBcbiAgICAvLyBkb3duXG4gICAgaWYgKGN1cnJlbnRQcmVzc2VkS2V5c1s0MF0gJiYgY3ViZS5yb3RhdGVTcGVlZFggPCA1MCkge1xuICAgICAgY3ViZS5yb3RhdGVTcGVlZFggKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIGxlZnRcbiAgICBpZiAoY3VycmVudFByZXNzZWRLZXlzWzM3XSAmJiBjdWJlLnJvdGF0ZVNwZWVkWSA+IC01MCkge1xuICAgICAgY3ViZS5yb3RhdGVTcGVlZFkgLT0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIHVwXG4gICAgaWYgKGN1cnJlbnRQcmVzc2VkS2V5c1szOV0gJiYgY3ViZS5yb3RhdGVTcGVlZFkgPCA1MCkge1xuICAgICAgY3ViZS5yb3RhdGVTcGVlZFkgKz0gMC4zXG4gICAgfVxuICAgIFxuICAgIC8vIHpvb20gb3V0XG4gICAgaWYgKGN1cnJlbnRQcmVzc2VkS2V5c1s0OV0gJiYgY3ViZS56ID4gLTMwKSB7XG4gICAgICBjdWJlLnogLT0gMC4yXG4gICAgfVxuICAgIFxuICAgIC8vIHpvb20gaW5cbiAgICBpZiAoY3VycmVudFByZXNzZWRLZXlzWzUwXSAmJiBjdWJlLnogPCAtMSkge1xuICAgICAgY3ViZS56ICs9IDAuMlxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gdGljayAoZHQpIHtcbiAgYW5pbWF0ZShkdClcbiAgaGFuZGxlS2V5cyhkdClcbiAgZHJhdyhkdClcbn1cblxuLy8gQW5pbWF0aW9uIGxvb3BcbmNvbnN0IGZwcyA9IDYwXG5mdW5jdGlvbiBsb29wIChjYikge1xuICBjb25zdCBkdCA9IDEwMDAgLyBmcHNcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICBsb29wLmR1cmF0aW9uID0gKGxvb3AuZHVyYXRpb24gfHwgMCkgKyBub3cgLSAobG9vcC5sYXN0UnVuIHx8IG5vdylcbiAgXG4gIHdoaWxlIChsb29wLmR1cmF0aW9uID49IGR0KSB7XG4gICAgY2IoZHQpXG4gICAgbG9vcC5kdXJhdGlvbiAtPSBkdFxuICB9XG4gIFxuICBsb29wLmxhc3RSdW4gPSBub3dcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBsb29wKGNiKSlcbn1cblxuZnVuY3Rpb24gcnVuICgpIHtcbiAgcHJlcCgpXG4gIGluaXQoKVxuICBcbiAgbG9vcCh0aWNrKVxufVxuXG5ydW4oKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zYW1wbGUuanMiXSwic291cmNlUm9vdCI6IiJ9