/*!
 * ffmpegjs plugin for videojs-record
 * @version 3.9.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2020 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("videojs"));
	else if(typeof define === 'function' && define.amd)
		define("ffmpegjs", ["videojs"], factory);
	else if(typeof exports === 'object')
		exports["ffmpegjs"] = factory(require("videojs"));
	else
		root["VideojsRecord"] = root["VideojsRecord"] || {}, root["VideojsRecord"]["ffmpegjs"] = factory(root["videojs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_video_js__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/plugins/ffmpegjs-plugin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/ffmpegjs-plugin.js":
/*!*******************************************!*\
  !*** ./src/js/plugins/ffmpegjs-plugin.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ \"video.js\");\n/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ConvertEngine = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('ConvertEngine');\n\nclass FFmpegjsEngine extends ConvertEngine {\n  constructor(player, options) {\n    super(player, options);\n    this.debug = false;\n    this.convertWorkerURL = 'ffmpeg-worker-mp4.js';\n    this.outputType = null;\n    this.pluginLibraryOptions = {};\n  }\n\n  setup(mediaType, debug) {\n    this.mediaType = mediaType;\n    this.debug = debug;\n    this.stdout = this.stderr = '';\n\n    if (this.pluginLibraryOptions.outputType === undefined) {\n      throw new Error('no outputType specified!');\n    }\n\n    this.outputType = this.pluginLibraryOptions.outputType;\n    this.engine = new Worker(this.convertWorkerURL);\n    this.engine.onmessage = this.onWorkerMessage.bind(this);\n  }\n\n  convert(data) {\n    this.timestamp = new Date();\n    this.timestamp.setTime(data.lastModified);\n    this.loadBlob(data).then(buffer => {\n      let opts = ['-i', data.name];\n      opts = opts.concat(this.convertOptions);\n      opts.push('output_' + this.timestamp.getTime());\n      this.engine.postMessage({\n        type: 'run',\n        MEMFS: [{\n          name: data.name,\n          data: buffer\n        }],\n        arguments: opts\n      });\n    });\n  }\n\n  onWorkerMessage(event) {\n    let msg = event.data;\n\n    switch (msg.type) {\n      case 'ready':\n        break;\n\n      case 'run':\n        this.player().trigger('startConvert');\n        break;\n\n      case 'done':\n        let buf;\n\n        try {\n          buf = msg.data.MEMFS[0].data;\n        } catch (e) {\n          this.player().trigger('error', this.stderr);\n        }\n\n        let result = new Blob(buf, {\n          type: this.outputType\n        });\n        this.addFileInfo(result, this.timestamp);\n        this.player().convertedData = result;\n        this.player().trigger('finishConvert');\n        break;\n\n      case 'stdout':\n        this.stdout += msg.data + '\\n';\n        break;\n\n      case 'stderr':\n        this.stderr += msg.data + \"\\n\";\n        break;\n\n      case 'exit':\n        break;\n\n      case 'error':\n        this.player().trigger('error', msg.data);\n        break;\n    }\n  }\n\n}\n\nvideo_js__WEBPACK_IMPORTED_MODULE_0___default.a.FFmpegjsEngine = FFmpegjsEngine;\n/* harmony default export */ __webpack_exports__[\"default\"] = (FFmpegjsEngine);\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./src/js/plugins/ffmpegjs-plugin.js?");

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