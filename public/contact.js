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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

    var fps = gameOptions.fps;
    this.fps = fps;
  }

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
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "handleKeys",
    value: function handleKeys(dt) {}
  }, {
    key: "animate",
    value: function animate(dt) {}
  }, {
    key: "draw",
    value: function draw(dt) {}
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
  fps: 60
}); // Start game

contactGame.start();

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlMDZiYTg0OTgxMWQwZjY2OGQ3OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFjdC5qcyJdLCJuYW1lcyI6WyJmcHMiLCJHYW1lIiwiZ2FtZU9wdGlvbnMiLCJpbml0IiwibG9vcCIsInRpY2siLCJiaW5kIiwiZHQiLCJoYW5kbGVLZXlzIiwiYW5pbWF0ZSIsImRyYXciLCJnYW1lIiwiY2IiLCJub3ciLCJEYXRlIiwiZHVyYXRpb24iLCJsYXN0UnVuIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY29udGFjdEdhbWUiLCJzdGFydCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBO0FBQ0EsSUFBTUEsR0FBRyxHQUFHLEVBQVo7QUFFQTs7SUFDTUMsSTs7O0FBQ0osa0JBQStCO0FBQUEsUUFBbEJDLFdBQWtCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsUUFFM0JGLEdBRjJCLEdBR3pCRSxXQUh5QixDQUUzQkYsR0FGMkI7QUFLN0IsU0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0Q7Ozs7NEJBZ0JRO0FBQ1A7QUFDQSxXQUFLRyxJQUFMLEdBRk8sQ0FJUDs7QUFDQUYsVUFBSSxDQUFDRyxJQUFMLENBQVUsSUFBVixFQUFnQixLQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxJQUFmLENBQWhCO0FBQ0Q7Ozt5QkFFS0MsRSxFQUFJO0FBQ1I7QUFDQSxXQUFLQyxVQUFMLENBQWdCRCxFQUFoQixFQUZRLENBSVI7O0FBQ0EsV0FBS0UsT0FBTCxDQUFhRixFQUFiLEVBTFEsQ0FPUjs7QUFDQSxXQUFLRyxJQUFMLENBQVVILEVBQVY7QUFDRDs7OzJCQUVPLENBRVA7OzsrQkFFV0EsRSxFQUFJLENBRWY7Ozs0QkFFUUEsRSxFQUFJLENBRVo7Ozt5QkFFS0EsRSxFQUFJLENBRVQ7Ozt5QkEvQ1lJLEksRUFBTUMsRSxFQUFJO0FBQ3JCLFVBQU1MLEVBQUUsR0FBRyxPQUFPSSxJQUFJLENBQUNYLEdBQXZCO0FBQ0EsVUFBTWEsR0FBRyxHQUFHQyxJQUFJLENBQUNELEdBQUwsRUFBWjtBQUNBWixVQUFJLENBQUNHLElBQUwsQ0FBVVcsUUFBVixHQUFxQixDQUFDZCxJQUFJLENBQUNHLElBQUwsQ0FBVVcsUUFBVixJQUFzQixDQUF2QixJQUE0QkYsR0FBNUIsSUFBbUNaLElBQUksQ0FBQ0csSUFBTCxDQUFVWSxPQUFWLElBQXFCSCxHQUF4RCxDQUFyQjs7QUFFQSxhQUFPWixJQUFJLENBQUNHLElBQUwsQ0FBVVcsUUFBVixJQUFzQlIsRUFBN0IsRUFBaUM7QUFDL0JLLFVBQUUsQ0FBQ0wsRUFBRCxDQUFGO0FBQ0FOLFlBQUksQ0FBQ0csSUFBTCxDQUFVVyxRQUFWLElBQXNCUixFQUF0QjtBQUNEOztBQUVETixVQUFJLENBQUNHLElBQUwsQ0FBVVksT0FBVixHQUFvQkgsR0FBcEI7QUFDQUksWUFBTSxDQUFDQyxxQkFBUCxDQUE2QjtBQUFBLGVBQU1qQixJQUFJLENBQUNHLElBQUwsQ0FBVU8sSUFBVixFQUFnQkMsRUFBaEIsQ0FBTjtBQUFBLE9BQTdCO0FBQ0Q7Ozs7S0FzQ0g7OztBQUNBLElBQU1PLFdBQVcsR0FBRyxJQUFJbEIsSUFBSixDQUFTO0FBQzNCRCxLQUFHLEVBQUU7QUFEc0IsQ0FBVCxDQUFwQixDLENBSUE7O0FBQ0FtQixXQUFXLENBQUNDLEtBQVosRyIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTA2YmE4NDk4MTFkMGY2NjhkNzgiLCIvLyBFbnRyeSBmaWxlIGZvciBjb250YWN0IGdhbWVcblxuLyoqKioqIEdsb2JhbCBTdGF0ZXMgKioqKiovXG4vLyBHYW1lIGZyYW1lIHBlciBzZWNvbmRcbmNvbnN0IGZwcyA9IDYwXG5cbi8qKioqKiBHYW1lIGNsYXNzICoqKioqL1xuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yIChnYW1lT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZnBzXG4gICAgfSA9IGdhbWVPcHRpb25zXG5cbiAgICB0aGlzLmZwcyA9IGZwc1xuICB9XG5cbiAgc3RhdGljIGxvb3AgKGdhbWUsIGNiKSB7XG4gICAgY29uc3QgZHQgPSAxMDAwIC8gZ2FtZS5mcHNcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gICAgR2FtZS5sb29wLmR1cmF0aW9uID0gKEdhbWUubG9vcC5kdXJhdGlvbiB8fCAwKSArIG5vdyAtIChHYW1lLmxvb3AubGFzdFJ1biB8fCBub3cpXG4gICAgXG4gICAgd2hpbGUgKEdhbWUubG9vcC5kdXJhdGlvbiA+PSBkdCkge1xuICAgICAgY2IoZHQpXG4gICAgICBHYW1lLmxvb3AuZHVyYXRpb24gLT0gZHRcbiAgICB9XG4gICAgXG4gICAgR2FtZS5sb29wLmxhc3RSdW4gPSBub3dcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IEdhbWUubG9vcChnYW1lLCBjYikpXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgLy8gSW5pdCB0aGUgZ2FtZVxuICAgIHRoaXMuaW5pdCgpXG5cbiAgICAvLyBTdGFydCBhbmltYXRpb24gbG9vcCB0byBkcmF3IGdhbWUgZnJhbWVzXG4gICAgR2FtZS5sb29wKHRoaXMsIHRoaXMudGljay5iaW5kKHRoaXMpKVxuICB9XG5cbiAgdGljayAoZHQpIHtcbiAgICAvLyBDaGVjayB1c2VyIGludGVyYWN0aW9uc1xuICAgIHRoaXMuaGFuZGxlS2V5cyhkdClcblxuICAgIC8vIFVwZGF0ZSBnYW1lIHN0YXRlc1xuICAgIHRoaXMuYW5pbWF0ZShkdClcblxuICAgIC8vIERyYXcgZ2FtZSBmcmFtZVxuICAgIHRoaXMuZHJhdyhkdClcbiAgfVxuXG4gIGluaXQgKCkge1xuXG4gIH1cblxuICBoYW5kbGVLZXlzIChkdCkge1xuXG4gIH1cblxuICBhbmltYXRlIChkdCkge1xuXG4gIH1cblxuICBkcmF3IChkdCkge1xuXG4gIH1cbn1cblxuLy8gQ3JlYXRlIGdhbWUgaW5zdGFuY2VcbmNvbnN0IGNvbnRhY3RHYW1lID0gbmV3IEdhbWUoe1xuICBmcHM6IDYwXG59KVxuXG4vLyBTdGFydCBnYW1lXG5jb250YWN0R2FtZS5zdGFydCgpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFjdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=