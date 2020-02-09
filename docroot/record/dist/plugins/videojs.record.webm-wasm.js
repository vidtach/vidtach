/*!
 * webm-wasm plugin for videojs-record
 * @version 3.9.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2020 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("RecordRTC"), require("videojs"));
	else if(typeof define === 'function' && define.amd)
		define("webm-wasm", ["RecordRTC", "videojs"], factory);
	else if(typeof exports === 'object')
		exports["webm-wasm"] = factory(require("RecordRTC"), require("videojs"));
	else
		root["VideojsRecord"] = root["VideojsRecord"] || {}, root["VideojsRecord"]["webm-wasm"] = factory(root["RecordRTC"], root["videojs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_recordrtc__, __WEBPACK_EXTERNAL_MODULE_video_js__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/plugins/webm-wasm-plugin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/webm-wasm-plugin.js":
/*!********************************************!*\
  !*** ./src/js/plugins/webm-wasm-plugin.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ \"video.js\");\n/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recordrtc */ \"recordrtc\");\n/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recordrtc__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst RecordRTCEngine = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('RecordRTCEngine');\n\nclass WebmWasmEngine extends RecordRTCEngine {\n  constructor(player, options) {\n    super(player, options);\n    this.debug = false;\n    this.videoBitRate = 1200;\n    this.videoFrameRate = 30;\n    this.videoWorkerURL = 'webm-worker.js';\n    this.videoWebAssemblyURL = 'webm-wasm.wasm';\n  }\n\n  setup(stream, mediaType, debug) {\n    this.recorderType = recordrtc__WEBPACK_IMPORTED_MODULE_1___default.a.WebAssemblyRecorder;\n    this.workerPath = this.videoWorkerURL;\n    this.bitRate = this.videoBitRate;\n    this.frameRate = this.videoFrameRate;\n    super.setup(stream, mediaType, debug);\n  }\n\n}\n\nvideo_js__WEBPACK_IMPORTED_MODULE_0___default.a.WebmWasmEngine = WebmWasmEngine;\n/* harmony default export */ __webpack_exports__[\"default\"] = (WebmWasmEngine);\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./src/js/plugins/webm-wasm-plugin.js?");

/***/ }),

/***/ "recordrtc":
/*!****************************!*\
  !*** external "RecordRTC" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_recordrtc__;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/external_%22RecordRTC%22?");

/***/ }),

/***/ "video.js":
/*!**************************!*\
  !*** external "videojs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_video_js__;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/external_%22videojs%22?");

/***/ })

/******/ });
});