/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SoundManager.ts":
/*!*****************************!*\
  !*** ./src/SoundManager.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DLCs_1 = __webpack_require__(/*! ./game/DLCs */ \"./src/game/DLCs.ts\");\nvar SOUND;\n(function (SOUND) {\n    SOUND[\"COCAMACHINE\"] = \"cocamachine\";\n    SOUND[\"KEYBOARD\"] = \"keyboard\";\n    SOUND[\"PEE\"] = \"pee\";\n    SOUND[\"WALK\"] = \"walk\";\n    SOUND[\"WATER\"] = \"water\";\n})(SOUND = exports.SOUND || (exports.SOUND = {}));\nclass Sound {\n    constructor(game, type, id) {\n        this.originalVolume = 1;\n        this.type = type;\n        this.id = id;\n        this.audio = game.add.audio(type + '');\n        this.audio.allowMultiple = false;\n    }\n    play(volume = 1) {\n        if (!DLCs_1.isAcheted(DLCs_1.DLC_SOUND)) {\n            return;\n        }\n        this.originalVolume = volume;\n        if (this.audio.isPlaying) {\n            // this.audio.restart(this.audio.currentMarker, 0);\n        }\n        else {\n            this.audio.play();\n        }\n    }\n    stop() {\n        this.audio.stop();\n    }\n    setMuted(muted) {\n        this.audio.volume = muted ? 0 : this.originalVolume;\n    }\n}\nclass SoundManager {\n    static create(game) {\n        this.sounds = [];\n        this.sounds.push(new Sound(game, SOUND.COCAMACHINE, 1));\n        this.sounds.push(new Sound(game, SOUND.KEYBOARD, 2));\n        this.sounds.push(new Sound(game, SOUND.PEE, 3));\n        this.sounds.push(new Sound(game, SOUND.WALK, 4));\n        this.sounds.push(new Sound(game, SOUND.WATER, 5));\n    }\n    static play(type, volume = 1) {\n        const ss = this.sounds.filter((sound) => {\n            return sound.type === type;\n        });\n        const sound = ss[Math.floor(Math.random() * ss.length)];\n        sound.play(volume);\n    }\n    static stop(type) {\n        const ss = this.sounds.filter((sound) => {\n            return sound.type === type;\n        });\n        ss.forEach((s) => {\n            s.stop();\n        });\n    }\n    static playMusic(game) {\n        this.music = game.add.audio('backgroundsound');\n        this.music.allowMultiple = true;\n        this.music.loop = true;\n        this.music.play();\n        this.music.volume = 0;\n    }\n    static pumpUpTheBass() {\n        this.music.volume = 0.1;\n    }\n}\nexports.SoundManager = SoundManager;\n\n\n//# sourceURL=webpack:///./src/SoundManager.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/// <reference path=\"../dist/lib/phaser.d.ts\"/>\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Boot_1 = __webpack_require__(/*! ./game/game_state/Boot */ \"./src/game/game_state/Boot.ts\");\nconst Preload_1 = __webpack_require__(/*! ./game/game_state/Preload */ \"./src/game/game_state/Preload.ts\");\nconst Credits_1 = __webpack_require__(/*! ./game/game_state/Credits */ \"./src/game/game_state/Credits.ts\");\nconst Logo_1 = __webpack_require__(/*! ./game/game_state/Logo */ \"./src/game/game_state/Logo.ts\");\nconst DungeonLevel1_1 = __webpack_require__(/*! ./game/game_state/DungeonLevel1 */ \"./src/game/game_state/DungeonLevel1.ts\");\nconst PlayerRoom_1 = __webpack_require__(/*! ./game/game_state/PlayerRoom */ \"./src/game/game_state/PlayerRoom.ts\");\nconst DungeonLevel2_1 = __webpack_require__(/*! ./game/game_state/DungeonLevel2 */ \"./src/game/game_state/DungeonLevel2.ts\");\nconst DungenLevel3_1 = __webpack_require__(/*! ./game/game_state/DungenLevel3 */ \"./src/game/game_state/DungenLevel3.ts\");\nconst DungeonLevel4_1 = __webpack_require__(/*! ./game/game_state/DungeonLevel4 */ \"./src/game/game_state/DungeonLevel4.ts\");\nexports.DEBUG = false;\nexports.SCALE = 4;\nexports.GAME_WIDTH = 1200;\nexports.GAME_HEIGHT = 800;\nexports.TILE_SIZE = 16;\nclass SimpleGame extends Phaser.Game {\n    constructor() {\n        super({\n            width: exports.GAME_WIDTH / exports.SCALE,\n            height: exports.GAME_HEIGHT / exports.SCALE,\n            renderer: Phaser.CANVAS,\n            parent: null,\n            state: 'content',\n            transparent: false,\n            antialias: false,\n            physicsConfig: false\n        });\n        this.antialias = false;\n        this.state.add('Boot', Boot_1.default);\n        this.state.add('Preload', Preload_1.default);\n        this.state.add('DungeonLevel1', DungeonLevel1_1.default);\n        this.state.add('DungeonLevel2', DungeonLevel2_1.default);\n        this.state.add('DungeonLevel3', DungenLevel3_1.default);\n        this.state.add('DungeonLevel4', DungeonLevel4_1.default);\n        this.state.add('PlayerRoom', PlayerRoom_1.default);\n        this.state.add('Credits', Credits_1.Credits);\n        this.state.add('Logo', Logo_1.Logo);\n        this.state.start('Boot');\n    }\n}\nwindow.onload = () => {\n    new SimpleGame();\n};\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/assets/tilemaps/map1.json":
/*!***************************************!*\
  !*** ./src/assets/tilemaps/map1.json ***!
  \***************************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"height\\\":8,\\\"infinite\\\":false,\\\"layers\\\":[{\\\"data\\\":[46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,48,48,48,48,52,46,46,46,46,50,48,48,48,48,48,48,48,48,47,47,47,47,51,46,46,46,46,49,47,47,47,47,47,47,47,47,47,47,47,47,51,46,46,46,46,49,47,47,47,47,47,47,47,47,47,47,47,47,51,46,46,46,46,49,47,47,47,47,47,47,47,47],\\\"height\\\":8,\\\"id\\\":1,\\\"name\\\":\\\"floor\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[56,56,56,56,56,56,56,56,57,58,59,56,56,56,56,56,56,56,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\\\"height\\\":8,\\\"id\\\":2,\\\"name\\\":\\\"walls\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,53,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,45,45,0,0,0,0,0,45,45,0,0,0,0,0,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0],\\\"height\\\":8,\\\"id\\\":3,\\\"name\\\":\\\"items\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0}],\\\"nextlayerid\\\":4,\\\"nextobjectid\\\":1,\\\"orientation\\\":\\\"orthogonal\\\",\\\"renderorder\\\":\\\"right-down\\\",\\\"tiledversion\\\":\\\"1.2.4\\\",\\\"tileheight\\\":16,\\\"tilesets\\\":[{\\\"columns\\\":24,\\\"firstgid\\\":1,\\\"image\\\":\\\"../tilesets/interior.png\\\",\\\"imageheight\\\":48,\\\"imagewidth\\\":384,\\\"margin\\\":0,\\\"name\\\":\\\"main\\\",\\\"spacing\\\":0,\\\"tilecount\\\":72,\\\"tileheight\\\":16,\\\"tiles\\\":[{\\\"id\\\":9,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"freedoor\\\"}]},{\\\"id\\\":22,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"secretary\\\"}]},{\\\"id\\\":28,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"digicode\\\"}]},{\\\"id\\\":36,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"water\\\"}]},{\\\"id\\\":37,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"coca\\\"}]},{\\\"id\\\":52,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"door\\\"}]},{\\\"id\\\":59,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"computer\\\"}]},{\\\"id\\\":60,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"iench\\\"}]},{\\\"id\\\":61,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"vigil\\\"}]}],\\\"tilewidth\\\":16}],\\\"tilewidth\\\":16,\\\"type\\\":\\\"map\\\",\\\"version\\\":1.2,\\\"width\\\":18}\");\n\n//# sourceURL=webpack:///./src/assets/tilemaps/map1.json?");

/***/ }),

/***/ "./src/assets/tilemaps/map2.json":
/*!***************************************!*\
  !*** ./src/assets/tilemaps/map2.json ***!
  \***************************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"height\\\":8,\\\"infinite\\\":false,\\\"layers\\\":[{\\\"data\\\":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],\\\"height\\\":8,\\\"id\\\":1,\\\"name\\\":\\\"floor\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,10,7,2,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,35,0,0,0,0,0,41,4,4,4,4,4,4,4,4,4,5,2,35,0,0,0,0,31,39,8,8,8,8,8,8,8,8,8,7,2,35,0,0,0,0,0,0,0,0,0,0,35,22,0,0,0,6,2,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5],\\\"height\\\":8,\\\"id\\\":4,\\\"name\\\":\\\"walls\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[0,0,0,0,0,0,34,0,0,0,0,34,0,0,0,0,29,0,0,0,0,37,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,34,0,0,23,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\\\"height\\\":8,\\\"id\\\":5,\\\"name\\\":\\\"items\\\",\\\"opacity\\\":1,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"digicodabledoor\\\"}],\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0}],\\\"nextlayerid\\\":6,\\\"nextobjectid\\\":1,\\\"orientation\\\":\\\"orthogonal\\\",\\\"renderorder\\\":\\\"right-down\\\",\\\"tiledversion\\\":\\\"1.2.4\\\",\\\"tileheight\\\":16,\\\"tilesets\\\":[{\\\"columns\\\":24,\\\"firstgid\\\":1,\\\"image\\\":\\\"../tilesets/interior.png\\\",\\\"imageheight\\\":48,\\\"imagewidth\\\":384,\\\"margin\\\":0,\\\"name\\\":\\\"main\\\",\\\"spacing\\\":0,\\\"tilecount\\\":72,\\\"tileheight\\\":16,\\\"tiles\\\":[{\\\"id\\\":9,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"freedoor\\\"}]},{\\\"id\\\":22,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"secretary\\\"}]},{\\\"id\\\":28,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"digicode\\\"}]},{\\\"id\\\":36,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"water\\\"}]},{\\\"id\\\":37,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"coca\\\"}]},{\\\"id\\\":52,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"door\\\"}]},{\\\"id\\\":59,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"computer\\\"}]}],\\\"tilewidth\\\":16}],\\\"tilewidth\\\":16,\\\"type\\\":\\\"map\\\",\\\"version\\\":1.2,\\\"width\\\":18}\");\n\n//# sourceURL=webpack:///./src/assets/tilemaps/map2.json?");

/***/ }),

/***/ "./src/assets/tilemaps/map3.json":
/*!***************************************!*\
  !*** ./src/assets/tilemaps/map3.json ***!
  \***************************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"height\\\":8,\\\"infinite\\\":false,\\\"layers\\\":[{\\\"data\\\":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],\\\"height\\\":8,\\\"id\\\":1,\\\"name\\\":\\\"floor\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,44,43,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,27,0,0,0,0,0,0,14,0,0,0,0,0,0,0,27,44,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0],\\\"height\\\":8,\\\"id\\\":8,\\\"name\\\":\\\"subwall\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[9,8,8,0,8,8,8,8,8,8,8,8,8,8,8,8,8,7,2,0,0,0,0,0,0,31,0,0,0,0,0,0,0,0,0,6,2,0,0,26,27,28,0,0,0,26,27,27,27,27,27,27,28,6,2,26,27,27,27,27,27,28,0,0,0,0,0,0,0,0,36,6,2,0,0,0,0,0,0,0,0,0,0,26,27,27,28,0,36,6,2,26,27,27,27,27,28,0,0,0,26,27,27,27,27,27,28,6,2,35,0,0,0,0,0,0,0,0,0,0,0,0,0,35,32,6,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5],\\\"height\\\":8,\\\"id\\\":2,\\\"name\\\":\\\"walls\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[0,0,29,0,0,0,0,33,0,0,34,0,0,0,0,29,30,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\\\"height\\\":8,\\\"id\\\":4,\\\"name\\\":\\\"teub\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\\\"height\\\":8,\\\"id\\\":3,\\\"name\\\":\\\"items\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0}],\\\"nextlayerid\\\":9,\\\"nextobjectid\\\":1,\\\"orientation\\\":\\\"orthogonal\\\",\\\"renderorder\\\":\\\"right-down\\\",\\\"tiledversion\\\":\\\"1.2.4\\\",\\\"tileheight\\\":16,\\\"tilesets\\\":[{\\\"columns\\\":24,\\\"firstgid\\\":1,\\\"image\\\":\\\"../tilesets/interior.png\\\",\\\"imageheight\\\":48,\\\"imagewidth\\\":384,\\\"margin\\\":0,\\\"name\\\":\\\"main\\\",\\\"spacing\\\":0,\\\"tilecount\\\":72,\\\"tileheight\\\":16,\\\"tilewidth\\\":16}],\\\"tilewidth\\\":16,\\\"type\\\":\\\"map\\\",\\\"version\\\":1.2,\\\"width\\\":18}\");\n\n//# sourceURL=webpack:///./src/assets/tilemaps/map3.json?");

/***/ }),

/***/ "./src/assets/tilemaps/map4.json":
/*!***************************************!*\
  !*** ./src/assets/tilemaps/map4.json ***!
  \***************************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"height\\\":8,\\\"infinite\\\":false,\\\"layers\\\":[{\\\"data\\\":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],\\\"height\\\":8,\\\"id\\\":1,\\\"name\\\":\\\"floor\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,2,31,25,25,1,1,1,25,25,0,0,0,0,0,0,0,0,6,2,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,6,2,0,0,0,0,0,0,0,0,0,41,4,4,4,4,4,4,5,2,0,0,0,0,0,0,0,0,0,6,17,8,8,8,8,8,7,2,0,0,0,0,0,0,0,0,0,39,40,0,0,35,0,0,6,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5],\\\"height\\\":8,\\\"id\\\":4,\\\"name\\\":\\\"walls\\\",\\\"opacity\\\":1,\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0},{\\\"data\\\":[0,0,0,0,0,0,0,0,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,61,0,0,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\\\"height\\\":8,\\\"id\\\":5,\\\"name\\\":\\\"items\\\",\\\"opacity\\\":1,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"digicodabledoor\\\"}],\\\"type\\\":\\\"tilelayer\\\",\\\"visible\\\":true,\\\"width\\\":18,\\\"x\\\":0,\\\"y\\\":0}],\\\"nextlayerid\\\":6,\\\"nextobjectid\\\":1,\\\"orientation\\\":\\\"orthogonal\\\",\\\"renderorder\\\":\\\"right-down\\\",\\\"tiledversion\\\":\\\"1.2.4\\\",\\\"tileheight\\\":16,\\\"tilesets\\\":[{\\\"columns\\\":24,\\\"firstgid\\\":1,\\\"image\\\":\\\"../tilesets/interior.png\\\",\\\"imageheight\\\":48,\\\"imagewidth\\\":384,\\\"margin\\\":0,\\\"name\\\":\\\"main\\\",\\\"spacing\\\":0,\\\"tilecount\\\":72,\\\"tileheight\\\":16,\\\"tiles\\\":[{\\\"id\\\":9,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"freedoor\\\"}]},{\\\"id\\\":22,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"secretary\\\"}]},{\\\"id\\\":28,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"digicode\\\"}]},{\\\"id\\\":36,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"water\\\"}]},{\\\"id\\\":37,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"coca\\\"}]},{\\\"id\\\":52,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"door\\\"}]},{\\\"id\\\":59,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"computer\\\"}]},{\\\"id\\\":60,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"iench\\\"}]},{\\\"id\\\":61,\\\"properties\\\":[{\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"value\\\":\\\"vigil\\\"}]}],\\\"tilewidth\\\":16}],\\\"tilewidth\\\":16,\\\"type\\\":\\\"map\\\",\\\"version\\\":1.2,\\\"width\\\":18}\");\n\n//# sourceURL=webpack:///./src/assets/tilemaps/map4.json?");

/***/ }),

/***/ "./src/game/CocaMachine.ts":
/*!*********************************!*\
  !*** ./src/game/CocaMachine.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/game/Point.ts\");\nconst app_1 = __webpack_require__(/*! ../app */ \"./src/app.ts\");\nconst SoundManager_1 = __webpack_require__(/*! ../SoundManager */ \"./src/SoundManager.ts\");\nclass CocaMachine {\n    constructor(level, point) {\n        this.level = level;\n        this.position = point;\n    }\n    getPosition() {\n        return this.position;\n    }\n    doAction(game) {\n        SoundManager_1.SoundManager.play(SoundManager_1.SOUND.COCAMACHINE);\n        this.level.addPie(game, new Point_1.default(this.position.x * app_1.TILE_SIZE + 2, this.position.y * app_1.TILE_SIZE + 2), app_1.DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 3, () => {\n            let message = 'Aaaaah, I was thirsty, and now even more!\\n\\nBurp.';\n            if (game.state.getCurrentState().player.hasToPee()) {\n                message = 'Please stop, I will pee on myself!';\n            }\n            this.level.addMessageBox(game, message, () => { });\n            game.state.getCurrentState().player.drink();\n        });\n    }\n}\nexports.CocaMachine = CocaMachine;\n\n\n//# sourceURL=webpack:///./src/game/CocaMachine.ts?");

/***/ }),

/***/ "./src/game/Computer.ts":
/*!******************************!*\
  !*** ./src/game/Computer.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/game/Point.ts\");\nconst app_1 = __webpack_require__(/*! ../app */ \"./src/app.ts\");\nconst SoundManager_1 = __webpack_require__(/*! ../SoundManager */ \"./src/SoundManager.ts\");\nclass Computer {\n    constructor(level, point) {\n        this.level = level;\n        this.position = point;\n    }\n    getPosition() {\n        return this.position;\n    }\n    doAction(game) {\n        let level4 = game.state.states['DungeonLevel4'];\n        let player = level4.player;\n        if (this.level.hasAchetedDlc('hacker')) {\n            if (player.hasPassword) {\n                SoundManager_1.SoundManager.play(SoundManager_1.SOUND.KEYBOARD);\n                this.level.addMessageBox(game, `You: Let's recompile the wifi firmware\\n\\nand rebind the printer \\n\\non the VGA keyboard!`, () => {\n                    level4.explose();\n                    this.level.addPie(game, new Point_1.default(this.position.x * app_1.TILE_SIZE + 2, this.position.y * app_1.TILE_SIZE + 2), app_1.DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 8, () => {\n                        this.level.goToNextLevel(game);\n                    });\n                });\n                return;\n            }\n        }\n        if (this.level.hasAchetedDlc('businessman')) {\n            if (this.level.hasAchetedDlc('vessie') && player.hasToPee()) {\n                SoundManager_1.SoundManager.play(SoundManager_1.SOUND.PEE);\n                this.level.addMessageBox(game, `You: HAHA Take This! -- *unzips pants*`, () => {\n                    level4.explose();\n                    this.level.addPie(game, new Point_1.default(this.position.x * app_1.TILE_SIZE + 2, this.position.y * app_1.TILE_SIZE + 2), app_1.DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 8, () => {\n                        this.level.goToNextLevel(game);\n                    });\n                });\n                return;\n            }\n            if (player.hasPassword) {\n                this.level.addMessageBox(game, `Ok, so... a-d-m-i-n...1-2-3      \\n\\nI'm in!...       \\n\\nBut I have no idea what to do...`, () => { });\n                return;\n            }\n        }\n        this.level.addMessageBox(game, `There must be a way to destroy it\\n\\nusing something in this room!`, () => { });\n    }\n}\nexports.Computer = Computer;\n\n\n//# sourceURL=webpack:///./src/game/Computer.ts?");

/***/ }),

/***/ "./src/game/DLCactivator.ts":
/*!**********************************!*\
  !*** ./src/game/DLCactivator.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DLCs_1 = __webpack_require__(/*! ./DLCs */ \"./src/game/DLCs.ts\");\nclass DLCactivator {\n    onActivation(game, dlc) {\n        switch (dlc.name) {\n            case 'Lock Picking Capabilities':\n                console.log('ACTIVATED = ', dlc);\n                break;\n            case 'Business Man Skin Pack (Cosmetic)':\n                console.log('ACTIVATED = ', dlc);\n                break;\n            case 'Hacker DLC Pack Premium':\n                console.log('ACTIVATED = ', dlc);\n                break;\n            case DLCs_1.DLC_MULTIPLAYER:\n                console.log('ACTIVATED = ', dlc);\n                break;\n            case 'Transhumanism, become an augmented human!':\n                console.log('ACTIVATED = ', dlc);\n                break;\n        }\n    }\n}\nexports.default = DLCactivator;\n\n\n//# sourceURL=webpack:///./src/game/DLCactivator.ts?");

/***/ }),

/***/ "./src/game/DLCs.ts":
/*!**************************!*\
  !*** ./src/game/DLCs.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst SoundManager_1 = __webpack_require__(/*! ../SoundManager */ \"./src/SoundManager.ts\");\nexports.DLC_BUSINESSPACK = 'Business Man Skin Pack (Cosmetic)';\nexports.DLC_TRANSHUMANISM = 'Transhumanism, become an augmented human!';\nexports.DLC_FLASHLIGHT = 'NEW! Flashlight Item - Light Pack Platinium';\nexports.DLC_ANIMALS = 'Linguistic Pack: Animals (Limited Edition)';\nexports.DLC_MULTIPLAYER = 'Multi-player Mode (Special offer: 50% discount)';\nexports.DLC_FAST = 'Speed run: so fast, so furious!';\nexports.DLC_LIFEBAR = 'HUD Enhanced Edition - Lifebar';\nexports.DLC_MUSIC = 'Music OST - Orchestral Edition Binaural';\nexports.DLC_SOUND = 'Audio Sound FX PACK (SFX Edition)';\nconst dlcs = [\n    {\n        name: 'Lock Picking Capabilities',\n        code: 'lockpick',\n        description: `With this new DLC, your hero would be able to lock pick any classic door in the game!\n      Buy now to add this incredible feature.`.split(\"\\n\"),\n        image: 'dlc-lockpicking.jpeg',\n        price: 15.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Lock Picking Capabilities',\n    },\n    {\n        name: \"Urban Vehicles - and more!\",\n        code: 'vehicles',\n        description: `Cars, Bikes, Bus... Get them all! This Pack adds up to 50+ new Vehicles that will\n      be available in the city. And if you prefer to walk, we also added Skateboards, Yeay!`.split(\"\\n\"),\n        image: 'dlc-vehicles.png',\n        price: 7.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Urban Vehicles PACK',\n    },\n    {\n        name: exports.DLC_FLASHLIGHT,\n        code: 'flashlight',\n        description: `Unlock up to one brand new item...\n      The flashlight! Useful for everything, especially to bring some light somewhere.\n      This new content will be available in-game once bought!`.split(\"\\n\"),\n        image: 'dlc-flashlight.jpg',\n        price: 19.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Flashlight Item - Light Pack Platinium'\n    },\n    {\n        name: exports.DLC_ANIMALS,\n        code: 'animals',\n        description: `You'll never be able to speak to animals...\n      Except with this new pack! By installing this linguistic pack your character will be able to speak to animals. Cows, cats, birds... make some new friends!`.split(\"\\n\"),\n        image: 'dlc-animals.jpg',\n        price: 25.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Linguistic Pack: Animals',\n    },\n    {\n        name: \"Linguistic Pack: Russian (Limited Edition)\",\n        code: 'lang_russian',\n        description: `Yet another Linguistic Pack!\n      You character will be able to speak to Russian people.. unlock new situation, get native instantly and deal with the mafia in-game!`.split(\"\\n\"),\n        image: 'dlc-russian.png',\n        price: 9.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Linguistic Pack: Russian',\n    },\n    {\n        name: exports.DLC_BUSINESSPACK,\n        code: 'businessman',\n        description: `Unlock a new skin of Business man by buying this content! \n    Your ennemies won't be able to recognize you! BUY NOW.`.split(\"\\n\"),\n        image: 'dlc-business.jpg',\n        price: 29.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Business Man Skin Pack',\n    },\n    {\n        name: 'Hacker DLC Pack Premium',\n        code: 'hacker',\n        description: `You always dreamed to be a Hacker?\n      With this new DLC, unlock new skills such as... Hacker stuff! \n      Become a professional of IT stuff and.. HACKER!`.split(\"\\n\"),\n        image: 'dlc-hacker.jpg',\n        price: 39.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Hacker DLC Pack Premium'\n    },\n    {\n        name: exports.DLC_MULTIPLAYER,\n        code: 'multiplayer',\n        description: `Want to compete against your friends?\n      With this new DLC, unlock the multi-player mode.\n      Play with your friends or compete to get the highest score!`.split(\"\\n\"),\n        image: 'dlc-multiplayer.jpeg',\n        price: 2.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Multi-player Mode',\n    },\n    {\n        name: \"HUD Enhanced Edition - Lifebar\",\n        code: 'lifebar',\n        description: `Our developers worked very hard on improving the HUD of our game...\n      Welcome to the Lifebar displayer HUD Element, never die again!`.split(\"\\n\"),\n        image: 'dlc-lifebar.png',\n        price: 12.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'HUD Enhanced Edition - Lifebar',\n    },\n    {\n        name: exports.DLC_SOUND,\n        code: 'sound',\n        description: `We reworked (actually added) all the sounds in the game, with a team of Sound Designers.\n      Get this pack to immerse yourself with real recorded sounds and SFX with more than 48Go of new content!`.split(\"\\n\"),\n        image: 'dlc-sound.png',\n        price: 5.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Audio Sound FX PACK',\n    },\n    {\n        name: exports.DLC_TRANSHUMANISM,\n        code: 'vessie',\n        description: `Want to better know your physical functions to perform in any condition?\n      With this new DLC, monitor your body and get access to new capabilities.`.split(\"\\n\"),\n        image: 'dlc-vessie.jpg',\n        price: 19.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Transhumanism',\n    },\n    {\n        name: exports.DLC_FAST,\n        code: 'fast',\n        description: `Want to beat speed run record?\n      With this new DLC, move faster, surround your enemies, be fast, be furious.`.split(\"\\n\"),\n        image: 'dlc-speed.jpg',\n        price: 4.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Speed run',\n    },\n    {\n        name: exports.DLC_MUSIC,\n        code: 'music',\n        description: `Unlock hours of music in this music OST pack.\n      Composed by Michael Musik, this Orchestral Edition Binaural soundtrack will fulfill your game and bring a new unseen atmosphere to it!`.split(\"\\n\"),\n        image: 'dlc-music.png',\n        price: 8.99,\n        isAcheted: false,\n        isSelected: false,\n        splitName: 'Music OST',\n    }\n];\nexports.achete = (name) => {\n    const dlc = dlcs.find(dlc => dlc.name === name);\n    dlc.isAcheted = true;\n    if (dlc.name === exports.DLC_MUSIC) {\n        SoundManager_1.SoundManager.pumpUpTheBass();\n    }\n};\nexports.isAcheted = (name) => {\n    return dlcs.find(dlc => dlc.name === name || dlc.code === name).isAcheted;\n};\nexports.default = dlcs;\n\n\n//# sourceURL=webpack:///./src/game/DLCs.ts?");

/***/ }),

/***/ "./src/game/DigicodableDoor.ts":
/*!*************************************!*\
  !*** ./src/game/DigicodableDoor.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass DigicodableDoor {\n    constructor(level, point) {\n        this.level = level;\n        this.position = point;\n    }\n    create(game) {\n    }\n    getPosition() {\n        return this.position;\n    }\n    update(game) {\n    }\n    doAction(game) {\n        if (this.level.hasAchetedDlc('Hacker DLC Pack Premium')) {\n            this.level.goToNextLevel(game);\n            return;\n        }\n        this.level.addMessageBox(game, `You: 'Ah.. this door needs a digicode... \\\n\\n\\nI have no idea nor the skills to open it.'`, () => {\n        });\n    }\n}\nexports.DigicodableDoor = DigicodableDoor;\n\n\n//# sourceURL=webpack:///./src/game/DigicodableDoor.ts?");

/***/ }),

/***/ "./src/game/Direction.ts":
/*!*******************************!*\
  !*** ./src/game/Direction.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar DIRECTION;\n(function (DIRECTION) {\n    DIRECTION[\"UP\"] = \"UP\";\n    DIRECTION[\"DOWN\"] = \"DOWN\";\n    DIRECTION[\"RIGHT\"] = \"RIGHT\";\n    DIRECTION[\"LEFT\"] = \"LEFT\";\n})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));\n\n\n//# sourceURL=webpack:///./src/game/Direction.ts?");

/***/ }),

/***/ "./src/game/Door.ts":
/*!**************************!*\
  !*** ./src/game/Door.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/game/Point.ts\");\nconst app_1 = __webpack_require__(/*! ../app */ \"./src/app.ts\");\nconst MenuDLC_1 = __webpack_require__(/*! ./MenuDLC */ \"./src/game/MenuDLC.ts\");\nclass Door {\n    constructor(level, point) {\n        this.level = level;\n        this.position = point;\n        this.crochetage = 0;\n    }\n    create(game) {\n        this.openSprite = game.add.sprite(this.position.x * app_1.TILE_SIZE, this.position.y * app_1.TILE_SIZE, \"main_spritesheet\", 53);\n        this.openSprite.visible = false;\n    }\n    getPosition() {\n        return this.position;\n    }\n    doAction(game) {\n        if (this.crochetage >= 100) {\n            this.level.goToNextLevel(game);\n            return;\n        }\n        if (this.level.hasAchetedDlc(MenuDLC_1.DLC_CROCHETAGE)) {\n            this.crochetage = 100;\n        }\n        else {\n            this.crochetage += 1;\n        }\n        this.level.addPie(game, new Point_1.default(this.position.x * app_1.TILE_SIZE + 2, this.position.y * app_1.TILE_SIZE + 2), app_1.DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 3, () => {\n            let message = 'Door unlocked at ' + this.crochetage + '%! Let\\'s try again!';\n            if (this.crochetage > 2) {\n                message += \"\\n\\nFEEL FREE TO BUY SOME NEW DLCs!!!\";\n            }\n            if (this.crochetage >= 100) {\n                message = 'Door is now opened!';\n                this.openSprite.visible = true;\n            }\n            this.level.addMessageBox(game, message, () => {\n                if (this.crochetage > 1) {\n                    this.level.displayDLCButton();\n                }\n            });\n        });\n    }\n}\nexports.Door = Door;\n\n\n//# sourceURL=webpack:///./src/game/Door.ts?");

/***/ }),

/***/ "./src/game/DungeonPlayer.ts":
/*!***********************************!*\
  !*** ./src/game/DungeonPlayer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/game/Point.ts\");\nconst app_1 = __webpack_require__(/*! ../app */ \"./src/app.ts\");\nconst DLCs_1 = __webpack_require__(/*! ../game/DLCs */ \"./src/game/DLCs.ts\");\nconst PersistentPlayerInfos_1 = __webpack_require__(/*! ./PersistentPlayerInfos */ \"./src/game/PersistentPlayerInfos.ts\");\nconst SoundManager_1 = __webpack_require__(/*! ../SoundManager */ \"./src/SoundManager.ts\");\nexports.MOVE_TIME = Phaser.Timer.SECOND * 0.3;\nclass DungeonPlayer {\n    constructor(point) {\n        this.hasPassword = false;\n        this.position = point;\n        this.isForbidMove = false;\n    }\n    forbidMove(b) {\n        this.isForbidMove = b;\n    }\n    create(game, tilemap) {\n        const spriteName = this.isBusinessMan(game) ? 'player_business_front' : 'player_front';\n        this.sprite = game.add.sprite(DungeonPlayer.getRealPosition(this.position).x, DungeonPlayer.getRealPosition(this.position).y, spriteName);\n        this.tilemap = tilemap;\n        this.sprite.anchor.setTo(.5, .5);\n        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);\n        this.sprite.body.collideWorldBounds = true;\n        this.sprite.body.setCircle(3, 5, 12);\n        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);\n        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);\n        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);\n        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);\n        this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);\n    }\n    update(game) {\n        if (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {\n            SoundManager_1.SoundManager.play(SoundManager_1.SOUND.WALK);\n        }\n        if (this.isForbidMove) {\n            this.stopPlayer();\n            return;\n        }\n        let velocityDeFrite = window['velocityDeFrite'] || 50;\n        if (this.isSpeedRun(game)) {\n            velocityDeFrite = 150;\n        }\n        if (this.leftKey.isDown) {\n            this.sprite.body.velocity.x = -velocityDeFrite;\n            this.sprite.body.velocity.y = 0;\n        }\n        else if (this.rightKey.isDown) {\n            this.sprite.body.velocity.x = +velocityDeFrite;\n            this.sprite.body.velocity.y = 0;\n        }\n        else if (this.upKey.isDown) {\n            if (this.isBusinessMan(game)) {\n                this.sprite.loadTexture('player_business_back');\n            }\n            else {\n                this.sprite.loadTexture('player_back');\n            }\n            this.sprite.body.velocity.y = -velocityDeFrite;\n            this.sprite.body.velocity.x = 0;\n        }\n        else if (this.downKey.isDown) {\n            if (this.isBusinessMan(game)) {\n                this.sprite.loadTexture('player_business_front');\n            }\n            else {\n                this.sprite.loadTexture('player_front');\n            }\n            this.sprite.body.velocity.y = +velocityDeFrite;\n            this.sprite.body.velocity.x = 0;\n        }\n        else if (this.actionKey.isDown) {\n            this.doAction(game);\n        }\n        else {\n            this.stopPlayer();\n        }\n        this.setFakePosition();\n    }\n    isBusinessMan(game) {\n        return game.state.getCurrentState().hasAchetedDlc('Business Man Skin Pack (Cosmetic)');\n    }\n    isSpeedRun(game) {\n        return game.state.getCurrentState().hasAchetedDlc(DLCs_1.DLC_FAST);\n    }\n    stopPlayer() {\n        this.sprite.body.velocity.y = 0;\n        this.sprite.body.velocity.x = 0;\n        this.setFakePosition();\n        SoundManager_1.SoundManager.stop(SoundManager_1.SOUND.WALK);\n    }\n    switchToBusinessSuits() {\n        this.sprite.loadTexture('player_business_front');\n    }\n    doAction(game) {\n        if (this.tilemap.isThereSomethingActivableNearTheCurrentPositionOfThePlayerPlease(this.position)) {\n            this.tilemap.doAction(this.position, game);\n        }\n    }\n    setFakePosition() {\n        this.position = new Point_1.default(Math.floor(this.sprite.x / app_1.TILE_SIZE), Math.floor(this.sprite.y / app_1.TILE_SIZE));\n    }\n    static getRealPosition(point) {\n        return new Point_1.default(point.x * app_1.TILE_SIZE, point.y * app_1.TILE_SIZE);\n    }\n    getPosition() {\n        return this.position;\n    }\n    drink() {\n        if (PersistentPlayerInfos_1.default.vessie < 4) {\n            PersistentPlayerInfos_1.default.vessie = PersistentPlayerInfos_1.default.vessie + 1;\n        }\n    }\n    hasToPee() {\n        return PersistentPlayerInfos_1.default.vessie == 4;\n    }\n    obtainPassword() {\n        this.hasPassword = true;\n    }\n}\nexports.DungeonPlayer = DungeonPlayer;\n\n\n//# sourceURL=webpack:///./src/game/DungeonPlayer.ts?");

/***/ }),

/***/ "./src/game/FreeDoor.ts":
/*!******************************!*\
  !*** ./src/game/FreeDoor.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/game/Point.ts\");\nconst app_1 = __webpack_require__(/*! ../app */ \"./src/app.ts\");\nconst MenuDLC_1 = __webpack_require__(/*! ./MenuDLC */ \"./src/game/MenuDLC.ts\");\nclass FreeDoor {\n    constructor(level, point) {\n        this.level = level;\n        this.position = point;\n        this.crochetage = 100;\n    }\n    getPosition() {\n        return this.position;\n    }\n    doAction(game) {\n        if (this.crochetage >= 100) {\n            this.level.goToNextLevel(game);\n            return;\n        }\n        if (this.level.hasAchetedDlc(MenuDLC_1.DLC_CROCHETAGE)) {\n            this.crochetage = 100;\n        }\n        else {\n            this.crochetage += 1;\n        }\n        this.level.addPie(game, new Point_1.default(this.position.x * app_1.TILE_SIZE + 2, this.position.y * app_1.TILE_SIZE + 2), app_1.DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 3, () => {\n            let message = 'Congrats, tu as deverouillay ' + this.crochetage + '% de la porte!';\n            if (this.crochetage > 1) {\n                message += \"\\n\\nUn petit DLCay ? ;)\";\n            }\n            if (this.crochetage >= 100) {\n                message = 'You opened the door!';\n            }\n            this.level.addMessageBox(game, message, () => {\n                if (this.crochetage > 1) {\n                    this.level.displayDLCButton();\n                }\n            });\n        });\n    }\n}\nexports.FreeDoor = FreeDoor;\n\n\n//# sourceURL=webpack:///./src/game/FreeDoor.ts?");

/***/ }),

/***/ "./src/game/Iench.ts":
/*!***************************!*\
  !*** ./src/game/Iench.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DLCs_1 = __webpack_require__(/*! ./DLCs */ \"./src/game/DLCs.ts\");\nclass Iench {\n    constructor(level, point) {\n        this.level = level;\n        this.position = point;\n    }\n    create(game) {\n    }\n    getPosition() {\n        return this.position;\n    }\n    doAction(game) {\n        if (this.level.hasAchetedDlc(DLCs_1.DLC_ANIMALS)) {\n            this.level.addMessageBox(game, \"Dog: 'Hello human! I often see people\\n\\nhere taping on this machine. They always\\n\\nstart by 'admin123', weird!'\", () => { });\n            game.state.getCurrentState().player.obtainPassword();\n        }\n        else {\n            this.level.addMessageBox(game, \"Dog: 'WAF WAF WAF! WAF!'\", () => { });\n        }\n    }\n}\nexports.Iench = Iench;\n\n\n//# sourceURL=webpack:///./src/game/Iench.ts?");

/***/ }),

/***/ "./src/game/MenuDLC.ts":
/*!*****************************!*\
  !*** ./src/game/MenuDLC.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DLCs_1 = __webpack_require__(/*! ./DLCs */ \"./src/game/DLCs.ts\");\nexports.DLC_CROCHETAGE = 'Lock Picking Capabilities';\n/**\n * MenuDLC AKA Herve45 est la dialog box pour afficher les dlcs et le menu\n */\nclass MenuDLC {\n    constructor() {\n        this.create = (game, showButton, onBuy, wallet) => {\n            this.onBuy = onBuy;\n            this.wallet = wallet;\n            const displayButton = () => {\n                const hudGroup = game.add.group(null, 'HUD');\n                game.add.existing(hudGroup);\n                game.add.button(game.width - 49, game.height - 16, 'dlcbuy', () => {\n                    window.openDLCMenu(DLCs_1.default, (dlc) => this.onBuy(dlc), this.wallet.total());\n                }, 2, 1, 0);\n            };\n            if (showButton) {\n                displayButton();\n            }\n            this.displayButton = () => displayButton();\n        };\n        this.open = () => {\n            window.openDLCMenu(DLCs_1.default, (dlc) => this.onBuy(dlc), this.wallet.total());\n        };\n        this.close = () => {\n            window.closeDLCMenu();\n        };\n    }\n}\nexports.default = MenuDLC;\n\n\n//# sourceURL=webpack:///./src/game/MenuDLC.ts?");

/***/ }),

/***/ "./src/game/MessageBox.ts":
/*!********************************!*\
  !*** ./src/game/MessageBox.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass MessageBox {\n    constructor(str, callback) {\n        this.message = str;\n        this.callback = callback;\n        this.spaceBarDown = false;\n    }\n    create(game) {\n        this.graphics = game.add.image(20, 200, 'messagebox');\n        this.bitmapText = game.add.bitmapText(28, 208, 'Carrier Command', '', 5);\n        game.add.tween(this.graphics).to({ y: 150 }, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);\n        game.add.tween(this.bitmapText).to({ y: 158 }, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);\n        this.shouldRenderText = true;\n        this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);\n    }\n    update(game) {\n        if (this.shouldRenderText) {\n            this.shouldRenderText = false;\n            game.time.events.add(0.03 * Phaser.Timer.SECOND, () => {\n                const length = this.bitmapText.text.length;\n                this.bitmapText.text = this.message.substr(0, length + 1);\n                this.shouldRenderText = true;\n            });\n        }\n        if (this.spacebar.isDown) {\n            if (this.spaceBarDown) {\n                return false;\n            }\n            this.spaceBarDown = true;\n            return this.actSpaceBar(game);\n        }\n        else if (this.spacebar.isUp) {\n            this.spaceBarDown = false;\n        }\n        return false;\n    }\n    actSpaceBar(game) {\n        if (!this.textIsFullyDisplayed()) {\n            this.displayFullText();\n            return false;\n        }\n        else {\n            this.removeBox(game);\n            this.callback();\n            return true;\n        }\n    }\n    textIsFullyDisplayed() {\n        return this.bitmapText.text === this.message;\n    }\n    displayFullText() {\n        this.bitmapText.text = this.message;\n    }\n    removeBox(game) {\n        game.add.tween(this.graphics).to({ y: 200 }, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);\n        game.add.tween(this.bitmapText).to({ y: 208 }, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);\n        game.time.events.add(0.2 * Phaser.Timer.SECOND, () => {\n            this.bitmapText.destroy(true);\n            this.graphics.destroy(true);\n        });\n    }\n}\nexports.MessageBox = MessageBox;\n\n\n//# sourceURL=webpack:///./src/game/MessageBox.ts?");

/***/ }),

/***/ "./src/game/PersistentPlayerInfos.ts":
/*!*******************************************!*\
  !*** ./src/game/PersistentPlayerInfos.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst PersistentPlayerInfos = {\n    vessie: 0\n};\nexports.default = PersistentPlayerInfos;\n\n\n//# sourceURL=webpack:///./src/game/PersistentPlayerInfos.ts?");

/***/ }),

/***/ "./src/game/Pie.ts":
/*!*************************!*\
  !*** ./src/game/Pie.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar PhaserPoint = Phaser.Point;\nconst CIRCLE_SIZE = 10;\nclass Pie {\n    constructor(position, duration, callback) {\n        this.position = position;\n        this.duration = duration;\n        this.percentage = 0;\n        this.callback = callback;\n    }\n    create(game) {\n        this.graphics = game.add.graphics(this.position.x, this.position.y);\n        game.add.tween(this).to({\n            percentage: Math.PI * 2\n        }, this.duration, Phaser.Easing.Default, true);\n    }\n    update(game) {\n        this.graphics.clear();\n        this.graphics.lineStyle(0);\n        this.graphics.beginFill(0x000000);\n        this.graphics.drawCircle(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2, CIRCLE_SIZE);\n        this.graphics.endFill();\n        this.graphics.beginFill(0x00FF00);\n        let path = [new PhaserPoint(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2)];\n        for (let i = 0; i < this.percentage; i += 0.1) {\n            path.push(new Phaser.Point(CIRCLE_SIZE / 2 + Math.cos(i) * CIRCLE_SIZE / 2, CIRCLE_SIZE / 2 + Math.sin(i) * CIRCLE_SIZE / 2));\n        }\n        path.push(new PhaserPoint(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2));\n        this.graphics.drawPolygon(path);\n        this.graphics.endFill();\n        this.graphics.lineStyle(1, 0xFFFFFF);\n        this.graphics.drawCircle(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2, CIRCLE_SIZE);\n        if (this.percentage >= Math.PI * 2) {\n            this.graphics.destroy(true);\n            this.callback();\n            return true;\n        }\n        return false;\n    }\n}\nexports.Pie = Pie;\n\n\n//# sourceURL=webpack:///./src/game/Pie.ts?");

/***/ }),

/***/ "./src/game/PlayerMessageBox.ts":
/*!**************************************!*\
  !*** ./src/game/PlayerMessageBox.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass PlayerMessageBox {\n    constructor() {\n    }\n    create(game) {\n        this.image = game.add.image(250, 300, 'playerdialogmessage');\n        this.image.scale.set(0.7, 0.7);\n        this.image.alpha = 0;\n        this.text = game.add.text(280, 330, '', { font: \"35px Gloria Hallelujah\", fill: \"#333333\" });\n        this.text.alpha = 0;\n    }\n    addMessageBox(game, text) {\n        this.text.text = text;\n        game.add.tween(this.image).to({ alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);\n        game.add.tween(this.text).to({ alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);\n        game.time.events.add(Phaser.Timer.SECOND * text.length * 0.06, () => {\n            game.add.tween(this.image).to({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);\n            game.add.tween(this.text).to({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);\n        });\n    }\n}\nexports.default = PlayerMessageBox;\n\n\n//# sourceURL=webpack:///./src/game/PlayerMessageBox.ts?");

/***/ }),

/***/ "./src/game/Point.ts":
/*!***************************!*\
  !*** ./src/game/Point.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Direction_1 = __webpack_require__(/*! ./Direction */ \"./src/game/Direction.ts\");\nclass Point extends PIXI.Point {\n    constructor() {\n        super(...arguments);\n        this.divideScalar = (s) => {\n            if (s === 0) {\n                this.x = 0;\n                this.y = 0;\n            }\n            else {\n                var invScalar = 1 / s;\n                this.x *= invScalar;\n                this.y *= invScalar;\n            }\n            return this;\n        };\n        this.length = () => Math.sqrt(this.x * this.x + this.y * this.y);\n        this.normalize = () => this.divideScalar(this.length());\n    }\n    equals(point) {\n        return this.x === point.x && this.y === point.y;\n    }\n    add(point) {\n        return new Point(this.x + point.x, this.y + point.y);\n    }\n    remove(point) {\n        return new Point(this.x - point.x, this.y - point.y);\n    }\n    left() {\n        return this.add(new Point(-1, 0));\n    }\n    right() {\n        return this.add(new Point(1, 0));\n    }\n    up() {\n        return this.add(new Point(0, -1));\n    }\n    down() {\n        return this.add(new Point(0, 1));\n    }\n    addDirection(direction) {\n        switch (direction) {\n            case Direction_1.DIRECTION.LEFT: return this.left();\n            case Direction_1.DIRECTION.RIGHT: return this.right();\n            case Direction_1.DIRECTION.UP: return this.up();\n            case Direction_1.DIRECTION.DOWN: return this.down();\n        }\n        throw \"direction is null!\";\n    }\n    addReverseSens(direction) {\n        switch (direction) {\n            case Direction_1.DIRECTION.LEFT: return this.right();\n            case Direction_1.DIRECTION.RIGHT: return this.left();\n            case Direction_1.DIRECTION.UP: return this.down();\n            case Direction_1.DIRECTION.DOWN: return this.up();\n        }\n        throw \"direction is null!\";\n    }\n}\nexports.default = Point;\n\n\n//# sourceURL=webpack:///./src/game/Point.ts?");

/***/ }),

/***/ "./src/game/Secretary.ts":
/*!*******************************!*\
  !*** ./src/game/Secretary.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Secretary {\n    constructor(level, point) {\n        this.letPass = false;\n        this.level = level;\n        this.position = point;\n    }\n    create(game) {\n    }\n    getPosition() {\n        return this.position;\n    }\n    update(game) {\n    }\n    doAction(game) {\n        this.letPass = this.level.hasAchetedDlc('Business Man Skin Pack (Cosmetic)');\n        console.log(this.letPass);\n    }\n}\nexports.Secretary = Secretary;\n\n\n//# sourceURL=webpack:///./src/game/Secretary.ts?");

/***/ }),

/***/ "./src/game/TilemapLevel.ts":
/*!**********************************!*\
  !*** ./src/game/TilemapLevel.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/game/Point.ts\");\nconst Door_1 = __webpack_require__(/*! ./Door */ \"./src/game/Door.ts\");\nconst FreeDoor_1 = __webpack_require__(/*! ./FreeDoor */ \"./src/game/FreeDoor.ts\");\nconst DigicodableDoor_1 = __webpack_require__(/*! ./DigicodableDoor */ \"./src/game/DigicodableDoor.ts\");\nconst Secretary_1 = __webpack_require__(/*! ./Secretary */ \"./src/game/Secretary.ts\");\nconst Computer_1 = __webpack_require__(/*! ./Computer */ \"./src/game/Computer.ts\");\nconst Water_1 = __webpack_require__(/*! ./Water */ \"./src/game/Water.ts\");\nconst CocaMachine_1 = __webpack_require__(/*! ./CocaMachine */ \"./src/game/CocaMachine.ts\");\nconst Iench_1 = __webpack_require__(/*! ./Iench */ \"./src/game/Iench.ts\");\nclass TilemapLevel {\n    constructor(level, tilemapProperties) {\n        this.level = level;\n        this.tilemapProperties = tilemapProperties;\n    }\n    create(game, name) {\n        this.activableObjects = [];\n        this.map = game.add.tilemap(name, 16, 16);\n        this.map.addTilesetImage('main', 'main');\n        // this.map.enableDebug = true;\n        this.floor = this.map.createLayer(\"floor\");\n        this.walls = this.map.createLayer(\"walls\");\n        this.items = this.map.createLayer(\"items\");\n        this.map.setCollisionBetween(1, 1000, true, this.walls);\n        this.map.setCollision([\n            10,\n            37,\n            38,\n            60,\n            181, 182, 183 // la caisse,\n        ], true, this.items);\n        // this.items.debug = true;\n        // this.walls.debug = true;\n        this.walls.resizeWorld();\n        this.items.resizeWorld();\n        this.floor.resizeWorld();\n        this.populateActivables(game);\n    }\n    canGoTo(position) {\n        // const floorTile = this.map.getTile(position.x, position.y, \"floor\");\n        // if (floorTile) {\n        //   console.log(this.getTileProperties(floorTile))\n        // }\n        // const itemTile = this.map.getTile(position.x, position.y, \"items\");\n        // if (itemTile) {\n        //   console.log(this.getTileProperties(itemTile))\n        // }\n        return true;\n    }\n    isThereSomethingActivableNearTheCurrentPositionOfThePlayerPlease(position) {\n        return this.getActivable(position) !== null;\n    }\n    doAction(position, game) {\n        this.getActivable(position).doAction(game);\n    }\n    getActivable(position) {\n        const corners = [\n            position.left(),\n            position.right(),\n            position.down(),\n            position.up()\n        ];\n        for (let i = 0; i < this.activableObjects.length; i++) {\n            const activable = this.activableObjects[i];\n            for (let j = 0; j < corners.length; j++) {\n                const corner = corners[j];\n                if (activable.getPosition().equals(corner)) {\n                    return activable;\n                }\n            }\n        }\n        return null;\n    }\n    populateActivables(game) {\n        for (let x = 0; x < this.map.width; x++) {\n            for (let y = 0; y < this.map.height; y++) {\n                const tile = this.map.getTile(x, y, \"items\");\n                if (!tile) {\n                    continue;\n                }\n                const properties = this.tilemapProperties.getTileProperties(tile);\n                if (properties === undefined || properties.name === undefined) {\n                    continue;\n                }\n                console.log(properties);\n                switch (properties.name) {\n                    case \"door\": {\n                        const door = new Door_1.Door(this.level, new Point_1.default(tile.x, tile.y));\n                        door.create(game);\n                        this.activableObjects.push(door);\n                        break;\n                    }\n                    case \"iench\": {\n                        const iench = new Iench_1.Iench(this.level, new Point_1.default(tile.x, tile.y));\n                        iench.create(game);\n                        this.activableObjects.push(iench);\n                        break;\n                    }\n                    case \"freedoor\": {\n                        this.activableObjects.push(new FreeDoor_1.FreeDoor(this.level, new Point_1.default(tile.x, tile.y)));\n                        break;\n                    }\n                    case \"secretary\": {\n                        this.activableObjects.push(new Secretary_1.Secretary(this.level, new Point_1.default(tile.x, tile.y)));\n                        break;\n                    }\n                    case \"digicode\": {\n                        this.activableObjects.push(new DigicodableDoor_1.DigicodableDoor(this.level, new Point_1.default(tile.x, tile.y)));\n                        break;\n                    }\n                    case \"computer\": {\n                        this.activableObjects.push(new Computer_1.Computer(this.level, new Point_1.default(tile.x, tile.y)));\n                        break;\n                    }\n                    case \"water\": {\n                        this.activableObjects.push(new Water_1.Water(this.level, new Point_1.default(tile.x, tile.y)));\n                        break;\n                    }\n                    case \"coca\": {\n                        this.activableObjects.push(new CocaMachine_1.CocaMachine(this.level, new Point_1.default(tile.x, tile.y)));\n                        break;\n                    }\n                }\n            }\n        }\n    }\n}\nexports.default = TilemapLevel;\n\n\n//# sourceURL=webpack:///./src/game/TilemapLevel.ts?");

/***/ }),

/***/ "./src/game/TilemapsProperties.ts":
/*!****************************************!*\
  !*** ./src/game/TilemapsProperties.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst level1 = __webpack_require__(/*! ../assets/tilemaps/map1.json */ \"./src/assets/tilemaps/map1.json\");\nconst level2 = __webpack_require__(/*! ../assets/tilemaps/map2.json */ \"./src/assets/tilemaps/map2.json\");\nconst level3 = __webpack_require__(/*! ../assets/tilemaps/map3.json */ \"./src/assets/tilemaps/map3.json\");\nconst level4 = __webpack_require__(/*! ../assets/tilemaps/map4.json */ \"./src/assets/tilemaps/map4.json\");\nclass TilemapsProperties {\n    constructor() {\n        this.properties = {};\n        this.maps = [\n            level1,\n            level2,\n            level3,\n            level4,\n        ];\n        this.load();\n    }\n    load() {\n        this.maps.forEach((jsonMap) => {\n            const tileset = jsonMap.tilesets[0];\n            if ('tiles' in tileset) {\n                for (let i = 0; i < tileset.tiles.length; i++) {\n                    const tile = tileset.tiles[i];\n                    const properties = {};\n                    for (let j = 0; j < tile.properties.length; j++) {\n                        properties[tile.properties[j].name] = tile.properties[j].value;\n                    }\n                    this.properties[tile.id] = properties;\n                }\n            }\n        });\n    }\n    getTileProperties(tile) {\n        return this.properties[tile.index - 1];\n    }\n}\nexports.default = TilemapsProperties;\n\n\n//# sourceURL=webpack:///./src/game/TilemapsProperties.ts?");

/***/ }),

/***/ "./src/game/Water.ts":
/*!***************************!*\
  !*** ./src/game/Water.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/game/Point.ts\");\nconst app_1 = __webpack_require__(/*! ../app */ \"./src/app.ts\");\nclass Water {\n    constructor(level, point) {\n        this.level = level;\n        this.position = point;\n        this.sound = level.game.add.audio('water');\n        this.sound.allowMultiple = false;\n    }\n    getPosition() {\n        return this.position;\n    }\n    doAction(game) {\n        console.log('fontaine a eau');\n        if (!this.sound.isPlaying) {\n            this.sound.play();\n        }\n        this.level.addPie(game, new Point_1.default(this.position.x * app_1.TILE_SIZE + 2, this.position.y * app_1.TILE_SIZE + 2), app_1.DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 3, () => {\n            let message = 'Aaaaah, I was thirsty!';\n            if (game.state.getCurrentState().player.hasToPee()) {\n                message = 'Please stop, I will pee on myself!';\n            }\n            this.level.addMessageBox(game, message, () => { });\n            game.state.getCurrentState().player.drink();\n        });\n    }\n}\nexports.Water = Water;\n\n\n//# sourceURL=webpack:///./src/game/Water.ts?");

/***/ }),

/***/ "./src/game/game_state/AbstractDungeonLevel.ts":
/*!*****************************************************!*\
  !*** ./src/game/game_state/AbstractDungeonLevel.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DungeonPlayer_1 = __webpack_require__(/*! ../DungeonPlayer */ \"./src/game/DungeonPlayer.ts\");\nconst MessageBox_1 = __webpack_require__(/*! ../MessageBox */ \"./src/game/MessageBox.ts\");\nconst TilemapsProperties_1 = __webpack_require__(/*! ../TilemapsProperties */ \"./src/game/TilemapsProperties.ts\");\nconst MenuDLC_1 = __webpack_require__(/*! ../MenuDLC */ \"./src/game/MenuDLC.ts\");\nconst Pie_1 = __webpack_require__(/*! ../Pie */ \"./src/game/Pie.ts\");\nconst app_1 = __webpack_require__(/*! ../../app */ \"./src/app.ts\");\nconst DLCs_1 = __webpack_require__(/*! ../DLCs */ \"./src/game/DLCs.ts\");\nconst DLCs_2 = __webpack_require__(/*! ../DLCs */ \"./src/game/DLCs.ts\");\nconst DLCactivator_1 = __webpack_require__(/*! ../DLCactivator */ \"./src/game/DLCactivator.ts\");\nconst PersistentPlayerInfos_1 = __webpack_require__(/*! ../PersistentPlayerInfos */ \"./src/game/PersistentPlayerInfos.ts\");\nconst SoundManager_1 = __webpack_require__(/*! ../../SoundManager */ \"./src/SoundManager.ts\");\nexports.SECONDSBLIND = 1.5;\nclass AbstractDungeonLevel extends Phaser.State {\n    constructor() {\n        super();\n        this.LEVEL_NUMBER = null;\n        this.player = new DungeonPlayer_1.DungeonPlayer(this.getStartPosition());\n        this.tilemapProperties = new TilemapsProperties_1.default();\n        this.messageBox = null;\n        this.pie = null;\n        this.menuDLC = new MenuDLC_1.default();\n        this.dlcActivator = new DLCactivator_1.default();\n        this.dlc = null;\n    }\n    setDlcBuy(dlcItem) {\n        this.dlc = dlcItem;\n    }\n    create(game) {\n        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;\n        this.game.scale.setUserScale(app_1.SCALE, app_1.SCALE);\n        this.game.renderer.renderSession.roundPixels = true;\n        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);\n        this.tilemap.create(game, this.getLevelName());\n        this.exclamationPoint = this.game.add.image(-100, -100, 'pointdesclamasion');\n        this.player.create(game, this.tilemap);\n        this.menuDLC.create(game, this.showDLCButton, (dlc) => {\n            this.getDlcCallback(game, dlc);\n            this.dlcActivator.onActivation(game, dlc);\n        }, game.state.states['PlayerRoom'].getWallet());\n        this.blackScreen = this.game.add.graphics(0, 0);\n        this.blackScreen.beginFill(0x000000);\n        this.blackScreen.drawRect(0, 0, 2000, 2000);\n        this.blackScreen.alpha = 0;\n        this.blackScreen.visible = false;\n        game.add.sprite(0, game.height - 18, 'hud-background');\n        if (this.hasAchetedDlc(DLCs_1.DLC_MULTIPLAYER)) {\n            game.add.sprite(60, game.height - 16, 'multiplayer-btn');\n        }\n        if (this.hasAchetedDlc(DLCs_1.DLC_LIFEBAR)) {\n            game.add.sprite(140, game.height - 16, 'lifebar-btn');\n        }\n        if (this.hasAchetedDlc('Business Man Skin Pack (Cosmetic)')) {\n            this.player.switchToBusinessSuits();\n        }\n        if (app_1.DEBUG) {\n            this.displayDLCButton();\n        }\n    }\n    update(game) {\n        if (this.dlc) {\n            this.addMessageBox(game, \"Thanks for your purchase!\\n\\n\" + this.dlc.splitName, () => { });\n            this.dlc = null;\n        }\n        const activable = this.tilemap.getActivable(this.player.getPosition());\n        if (null !== activable) {\n            this.exclamationPoint.position.x = activable.getPosition().x * app_1.TILE_SIZE;\n            this.exclamationPoint.position.y = activable.getPosition().y * app_1.TILE_SIZE;\n        }\n        else {\n            this.exclamationPoint.position.x = -100;\n            this.exclamationPoint.position.y = -100;\n        }\n        if (null !== this.messageBox) {\n            if (this.messageBox.update(game)) {\n                this.messageBox = null;\n            }\n            return false;\n        }\n        if (null !== this.pie) {\n            if (this.pie.update(game)) {\n                this.pie = null;\n            }\n            return false;\n        }\n        this.game.physics.arcade.collide(this.player.sprite, this.tilemap.walls);\n        this.game.physics.arcade.collide(this.player.sprite, this.tilemap.items);\n        this.player.update(game);\n        if (this.hasAchetedDlc(DLCs_2.DLC_TRANSHUMANISM)) {\n            game.add.sprite(20, game.height - 16, 'bladder-indicator', PersistentPlayerInfos_1.default.vessie); // change the level of liquid\n        }\n        return true;\n    }\n    addMessageBox(game, message, callback) {\n        this.player.forbidMove(true);\n        const newCollback = () => {\n            callback();\n            this.player.forbidMove(false);\n        };\n        this.messageBox = new MessageBox_1.MessageBox(message, newCollback);\n        this.messageBox.create(game);\n    }\n    addPie(game, position, duration, callback) {\n        this.pie = new Pie_1.Pie(position, duration, callback);\n        this.pie.create(game);\n    }\n    displayDLCButton() {\n        this.menuDLC.displayButton();\n        this.showDLCButton = true;\n    }\n    hasAchetedDlc(name) {\n        return DLCs_1.isAcheted(name);\n    }\n    render() {\n        // this.game.debug.body(this.player.sprite);\n    }\n    goToNextLevel(game) {\n        const timingBlind = exports.SECONDSBLIND * Phaser.Timer.SECOND;\n        this.blackScreen.visible = true;\n        game.add.tween(this.blackScreen).to({ alpha: 1 }, timingBlind, Phaser.Easing.Default, true);\n        game.time.events.add(timingBlind, () => {\n            if (this.LEVEL_NUMBER === 4) {\n                this.endGame(game);\n            }\n            else {\n                game.state.start(`DungeonLevel${this.LEVEL_NUMBER + 1}`);\n                this.blackScreen.visible = false;\n                this.blackScreen.alpha = 0;\n            }\n        });\n    }\n    defaultDlcCallback(game, dlc) {\n        const wallet = game.state.states['PlayerRoom'].getWallet();\n        if (wallet.total() >= dlc.price) {\n            DLCs_1.achete(dlc.name);\n            if (dlc.name === DLCs_1.DLC_MUSIC) {\n                SoundManager_1.SoundManager.pumpUpTheBass();\n            }\n            wallet.remove(dlc.price);\n            this.menuDLC.close();\n            this.dlc = dlc;\n            this.create(game);\n        }\n        else {\n            game.state.start('PlayerRoom');\n            const playerRoom = game.state.states['PlayerRoom'];\n            playerRoom.setdlcItem(dlc);\n            playerRoom.setCurrentLevelName(this.getLevelName());\n        }\n    }\n    endGame(game) {\n        game.time.events.add(2 * Phaser.Timer.SECOND, () => {\n            this.addMessageBox(game, 'An error occured.', () => {\n                game.time.events.add(Phaser.Timer.SECOND, () => {\n                    this.addMessageBox(game, 'Impossible to join DLC server', () => {\n                        game.time.events.add(Phaser.Timer.SECOND, () => {\n                            this.addMessageBox(game, 'This game can not be run.', () => {\n                                game.time.events.add(Phaser.Timer.SECOND, () => {\n                                    this.addMessageBox(game, \"Closing in 3...                   \\n\\n2...                   \\n\\n1...             \", () => {\n                                        game.state.start('PlayerRoom');\n                                        const playerRoom = game.state.states['PlayerRoom'];\n                                        playerRoom.endGame();\n                                    });\n                                });\n                            });\n                        });\n                    });\n                });\n            });\n        });\n    }\n}\nexports.AbstractDungeonLevel = AbstractDungeonLevel;\n\n\n//# sourceURL=webpack:///./src/game/game_state/AbstractDungeonLevel.ts?");

/***/ }),

/***/ "./src/game/game_state/Boot.ts":
/*!*************************************!*\
  !*** ./src/game/game_state/Boot.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst app_1 = __webpack_require__(/*! ../../app */ \"./src/app.ts\");\nclass Boot extends Phaser.State {\n    create() {\n        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;\n        this.game.scale.setUserScale(app_1.SCALE, app_1.SCALE);\n        this.game.renderer.renderSession.roundPixels = true;\n        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);\n        this.game.state.start('Preload');\n    }\n}\nexports.default = Boot;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Boot.ts?");

/***/ }),

/***/ "./src/game/game_state/Credits.ts":
/*!****************************************!*\
  !*** ./src/game/game_state/Credits.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar State = Phaser.State;\nconst app_1 = __webpack_require__(/*! ../../app */ \"./src/app.ts\");\nclass Credits extends State {\n    constructor() {\n        super();\n        this.texts = [];\n        this.texts.push('\"Just One More\"');\n        this.texts.push('');\n        this.texts.push('This game was created in honor of:');\n        this.texts.push('Total War');\n        this.texts.push('The Sims');\n        this.texts.push('Train Simulator');\n        this.texts.push('Crusader Kings II');\n        this.texts.push('');\n        this.texts.push('');\n        this.texts.push('');\n        this.texts.push('');\n        this.texts.push('A game designed for the Ludum Dare 45, by');\n        this.texts.push('docteurklein + grena + nidup + pierallard + ');\n        this.texts.push('pagury + titi + toxinu + lemenski');\n    }\n    create(game) {\n        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;\n        this.game.renderer.renderSession.roundPixels = false;\n        this.game.width = app_1.GAME_WIDTH;\n        this.game.height = app_1.GAME_HEIGHT;\n        this.game.renderer.resize(app_1.GAME_WIDTH, app_1.GAME_HEIGHT);\n        this.camera.unfollow();\n        this.camera.setPosition(0, 0);\n        const image = game.add.image(0, 0, 'backgroundplayerroom');\n        image.scale.set(1.3);\n        image.alpha = 0.2;\n        this.phaserTexts = [];\n        this.texts.forEach((text, i) => {\n            const t = game.add.bitmapText(0, i * 40 + 10, \"Carrier Command\", text, i === 0 ? 40 : 20);\n            t.x = this.game.width / 2 - (t.width / 2);\n            this.phaserTexts.push(t);\n        });\n    }\n}\nexports.Credits = Credits;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Credits.ts?");

/***/ }),

/***/ "./src/game/game_state/DungenLevel3.ts":
/*!*********************************************!*\
  !*** ./src/game/game_state/DungenLevel3.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst AbstractDungeonLevel_1 = __webpack_require__(/*! ./AbstractDungeonLevel */ \"./src/game/game_state/AbstractDungeonLevel.ts\");\nconst DLCs_1 = __webpack_require__(/*! ../DLCs */ \"./src/game/DLCs.ts\");\nconst Point_1 = __webpack_require__(/*! ../Point */ \"./src/game/Point.ts\");\nconst TilemapLevel_1 = __webpack_require__(/*! ../TilemapLevel */ \"./src/game/TilemapLevel.ts\");\nconst app_1 = __webpack_require__(/*! ../../app */ \"./src/app.ts\");\nclass DungeonLevel3 extends AbstractDungeonLevel_1.AbstractDungeonLevel {\n    constructor() {\n        super();\n        this.LEVEL_NUMBER = 3;\n        this.tilemap = new TilemapLevel_1.default(this, this.tilemapProperties);\n        this.showBeginningMessage = true;\n    }\n    create(game) {\n        super.create(game);\n        this.displayDLCButton();\n        this.lampScreen = game.add.image(this.player.sprite.x, this.player.sprite.y, 'backgroundlamp');\n        this.lampScreen.anchor.set(0.5, 0.5);\n        this.noLampScreen = game.add.graphics(0, 0);\n        this.noLampScreen.beginFill(0x000000);\n        this.noLampScreen.drawRect(0, 0, 300, 120);\n        this.noLampScreen.alpha = app_1.DEBUG ? 0.9 : 1;\n        this.updateNoLampScreen();\n        if (this.showBeginningMessage) {\n            this.showBeginningMessage = false;\n            if (!this.hasAchetedDlc(DLCs_1.DLC_FLASHLIGHT)) {\n                this.addMessageBox(game, \"YOU: 'I can't see anything!\\n\\nWhere am I?\\n\\nWhat's this sound?'\", () => {\n                    this.player.stopPlayer();\n                });\n            }\n        }\n    }\n    update(game) {\n        this.lampScreen.x = this.player.sprite.x;\n        this.lampScreen.y = this.player.sprite.y;\n        this.updateNoLampScreen();\n        return super.update(game);\n    }\n    getDlcCallback(game, dlc) {\n        this.defaultDlcCallback(game, dlc);\n    }\n    getLevelName() {\n        return 'level3';\n    }\n    getStartPosition() {\n        return new Point_1.default(7, 6);\n    }\n    updateNoLampScreen() {\n        if (this.hasAchetedDlc(DLCs_1.DLC_FLASHLIGHT)) {\n            this.noLampScreen.visible = false;\n            this.lampScreen.visible = true;\n        }\n        else {\n            this.noLampScreen.visible = true;\n            this.lampScreen.visible = false;\n        }\n    }\n}\nexports.default = DungeonLevel3;\n\n\n//# sourceURL=webpack:///./src/game/game_state/DungenLevel3.ts?");

/***/ }),

/***/ "./src/game/game_state/DungeonLevel1.ts":
/*!**********************************************!*\
  !*** ./src/game/game_state/DungeonLevel1.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Door_1 = __webpack_require__(/*! ../Door */ \"./src/game/Door.ts\");\nconst Point_1 = __webpack_require__(/*! ../Point */ \"./src/game/Point.ts\");\nconst TilemapLevel_1 = __webpack_require__(/*! ../TilemapLevel */ \"./src/game/TilemapLevel.ts\");\nconst AbstractDungeonLevel_1 = __webpack_require__(/*! ./AbstractDungeonLevel */ \"./src/game/game_state/AbstractDungeonLevel.ts\");\nclass DungeonLevel1 extends AbstractDungeonLevel_1.AbstractDungeonLevel {\n    constructor() {\n        super();\n        this.LEVEL_NUMBER = 1;\n        this.tilemap = new TilemapLevel_1.default(this, this.tilemapProperties);\n        this.showDoorMessage = true;\n        this.showBeginningMessage = true;\n        this.paypalAlreadyMontred = false;\n        this.showDLCButton = true;\n    }\n    getLevelName() {\n        return 'level1';\n    }\n    getStartPosition() {\n        return new Point_1.default(1, 2);\n    }\n    create(game) {\n        super.create(game);\n        if (this.showBeginningMessage) {\n            this.showBeginningMessage = false;\n            this.addMessageBox(game, \"YOU: 'Ahhh.. Lubrisoft. I must enter and \\n\\ndestroy their DLC generator!\\n\\n*Use arrow keys to move, space to skip*'\", () => {\n                this.player.stopPlayer();\n            });\n        }\n        if (this.paypalAlreadyMontred) {\n            this.displayDLCButton();\n        }\n    }\n    getDlcCallback(game, dlc) {\n        if (!this.paypalAlreadyMontred) {\n            this.paypalAlreadyMontred = true;\n            // game.time.events.add(2 * Phaser.Timer.SECOND, () => {\n            this.defaultDlcCallback(game, dlc);\n            // });\n        }\n        else {\n            this.defaultDlcCallback(game, dlc);\n        }\n    }\n    update(game) {\n        if (super.update(game)) {\n            if (this.showDoorMessage && this.tilemap.getActivable(this.player.getPosition()) instanceof Door_1.Door) {\n                this.player.stopPlayer();\n                this.showDoorMessage = false;\n                this.addMessageBox(game, \"*Use ENTER key to interact with objects*\", () => {\n                });\n            }\n        }\n        return true;\n    }\n}\nexports.default = DungeonLevel1;\n\n\n//# sourceURL=webpack:///./src/game/game_state/DungeonLevel1.ts?");

/***/ }),

/***/ "./src/game/game_state/DungeonLevel2.ts":
/*!**********************************************!*\
  !*** ./src/game/game_state/DungeonLevel2.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst AbstractDungeonLevel_1 = __webpack_require__(/*! ./AbstractDungeonLevel */ \"./src/game/game_state/AbstractDungeonLevel.ts\");\nconst DLCs_1 = __webpack_require__(/*! ../DLCs */ \"./src/game/DLCs.ts\");\nconst Point_1 = __webpack_require__(/*! ../Point */ \"./src/game/Point.ts\");\nconst TilemapLevel_1 = __webpack_require__(/*! ../TilemapLevel */ \"./src/game/TilemapLevel.ts\");\nclass DungeonLevel2 extends AbstractDungeonLevel_1.AbstractDungeonLevel {\n    constructor() {\n        super();\n        this.LEVEL_NUMBER = 2;\n        this.tilemap = new TilemapLevel_1.default(this, this.tilemapProperties);\n        this.showBeginningMessage = true;\n        this.helloDisplayed = false;\n    }\n    create(game) {\n        super.create(game);\n        this.displayDLCButton();\n        if (this.showBeginningMessage) {\n            this.showBeginningMessage = false;\n            this.addMessageBox(game, \"YOU: 'Hehehe... The DLC generator machine \\n\\nshould be in this building.'\", () => {\n                this.player.stopPlayer();\n            });\n        }\n    }\n    update(game) {\n        if (this.player.sprite.position.x > 216 && this.player.sprite.position.y > 50) {\n            if (this.hasAchetedDlc(DLCs_1.DLC_BUSINESSPACK)) {\n                if (!this.helloDisplayed) {\n                    this.player.stopPlayer();\n                    this.addMessageBox(game, \"Secretary: 'Oh, welcome comrade!'\", () => {\n                    });\n                }\n                this.helloDisplayed = true;\n            }\n            else {\n                this.player.stopPlayer();\n                this.player.sprite.position.x = 215;\n                const messages = [\n                    \"Secretary: 'Sir you do not belong to\\n\\nthis company SIR'\",\n                    \"Secretary: 'Get out or I call\\n\\nthe security'\",\n                    \"Secretary: 'Who are you?'\",\n                    \"Secretary: 'This part of the building\\n\\nis for company members only!'\",\n                    \"Secretary: 'Maaaaaaayyyy I help you?'\"\n                ];\n                this.addMessageBox(game, messages[Math.floor(Math.random() * messages.length)], () => { });\n            }\n        }\n        return super.update(game);\n    }\n    getDlcCallback(game, dlc) {\n        this.defaultDlcCallback(game, dlc);\n    }\n    getLevelName() {\n        return 'level2';\n    }\n    getStartPosition() {\n        return new Point_1.default(7, 6);\n    }\n}\nexports.default = DungeonLevel2;\n\n\n//# sourceURL=webpack:///./src/game/game_state/DungeonLevel2.ts?");

/***/ }),

/***/ "./src/game/game_state/DungeonLevel4.ts":
/*!**********************************************!*\
  !*** ./src/game/game_state/DungeonLevel4.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst AbstractDungeonLevel_1 = __webpack_require__(/*! ./AbstractDungeonLevel */ \"./src/game/game_state/AbstractDungeonLevel.ts\");\nconst DLCs_1 = __webpack_require__(/*! ../DLCs */ \"./src/game/DLCs.ts\");\nconst Point_1 = __webpack_require__(/*! ../Point */ \"./src/game/Point.ts\");\nconst TilemapLevel_1 = __webpack_require__(/*! ../TilemapLevel */ \"./src/game/TilemapLevel.ts\");\nconst app_1 = __webpack_require__(/*! ../../app */ \"./src/app.ts\");\nclass DungeonLevel4 extends AbstractDungeonLevel_1.AbstractDungeonLevel {\n    constructor() {\n        super();\n        this.LEVEL_NUMBER = 4;\n        this.tilemap = new TilemapLevel_1.default(this, this.tilemapProperties);\n        this.showBeginningMessage = true;\n    }\n    create(game) {\n        super.create(game);\n        this.displayDLCButton();\n        this.server = game.add.sprite(4 * 16, 16, 'server');\n        this.server.animations.add('NORMAL', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);\n        this.server.animations.add('EXPLOSE', [0, 1]);\n        this.server.animations.play('NORMAL', 10, true);\n        if (this.showBeginningMessage) {\n            this.showBeginningMessage = false;\n            this.addMessageBox(game, \"YOU: 'I finally reached my\\n\\ndestination! I have to switch off this\\n\\nevil DLC machine!'\", () => {\n                this.player.stopPlayer();\n            });\n        }\n    }\n    update(game) {\n        const xpos = 14 * app_1.TILE_SIZE;\n        if (this.player.sprite.position.x > xpos && this.player.sprite.position.y > 4 * app_1.TILE_SIZE) {\n            if (!this.hasAchetedDlc(DLCs_1.DLC_BUSINESSPACK)) {\n                this.player.stopPlayer();\n                this.player.sprite.position.x = xpos - 1;\n                this.addMessageBox(game, \"Guard: 'This water fountain is for\\n\\nemployees only sir.'\", () => { });\n            }\n        }\n        return super.update(game);\n    }\n    goToNextLevel(game) {\n        const timingBlind = AbstractDungeonLevel_1.SECONDSBLIND * Phaser.Timer.SECOND;\n        game.add.tween(this.server).to({ alpha: 0 }, timingBlind, Phaser.Easing.Default, true);\n        super.goToNextLevel(game);\n    }\n    getDlcCallback(game, dlc) {\n        this.defaultDlcCallback(game, dlc);\n    }\n    explose() {\n        this.server.animations.play('EXPLOSE', 10, true);\n    }\n    getLevelName() {\n        return 'level4';\n    }\n    getStartPosition() {\n        return new Point_1.default(7, 6);\n    }\n}\nexports.default = DungeonLevel4;\n\n\n//# sourceURL=webpack:///./src/game/game_state/DungeonLevel4.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Basket.ts":
/*!*********************************************!*\
  !*** ./src/game/game_state/Items/Basket.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Basket extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'basket 80\\'s';\n        this.price = 15;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'basket');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Basket;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Basket.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Bed.ts":
/*!******************************************!*\
  !*** ./src/game/game_state/Items/Bed.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Bed extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'Scandinavian bed';\n        this.price = 300;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'bed');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Bed;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Bed.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/BritneyPoster.ts":
/*!****************************************************!*\
  !*** ./src/game/game_state/Items/BritneyPoster.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass BritneyPoster extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'Britney Baby One More Time Poster';\n        this.price = 5;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'britney_poster');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = BritneyPoster;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/BritneyPoster.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Chair.ts":
/*!********************************************!*\
  !*** ./src/game/game_state/Items/Chair.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Chair extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'racing car chair';\n        this.price = 20;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'chair');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Chair;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Chair.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/GameBoy.ts":
/*!**********************************************!*\
  !*** ./src/game/game_state/Items/GameBoy.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass GameBoy extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'Game boy';\n        this.price = 25;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'game_boy');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = GameBoy;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/GameBoy.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/ItemToSell.ts":
/*!*************************************************!*\
  !*** ./src/game/game_state/Items/ItemToSell.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass ItemToSell {\n    constructor(wallet, playerRoom, x, y) {\n        this.wallet = wallet;\n        this.playerRoom = playerRoom;\n        this.sold = false;\n        this.x = x;\n        this.y = y;\n    }\n    sell(e) {\n        if (this.playerRoom.blackScren.visible) {\n            return;\n        }\n        let itemsAccepted = [];\n        // Pas vendus\n        itemsAccepted = this.playerRoom.itemsToSell.items.filter((item) => !item.sold);\n        // Pas le lit si y a d'autres trucs\n        if (itemsAccepted.length > 1) {\n            itemsAccepted = itemsAccepted.filter((item) => item.name != \"Scandinavian bed\");\n        }\n        const priceDlc = this.playerRoom.dlc.price;\n        let itemsAboveDlcPrice = [];\n        itemsAccepted.forEach((item) => {\n            if (item.price > priceDlc)\n                itemsAboveDlcPrice.push(item);\n        });\n        itemsAboveDlcPrice = itemsAboveDlcPrice.sort((a, b) => a.price - b.price);\n        itemsAboveDlcPrice.shift();\n        itemsAccepted = itemsAccepted.filter((item) => {\n            return !itemsAboveDlcPrice.includes(item);\n        });\n        console.log(\"ACCEPTED = \", itemsAccepted);\n        if (!itemsAccepted.includes(this)) {\n            this.playerRoom.playerMessageBox.addMessageBox(e.game, \"Ahah, I'm not crazy, I don't need\\nto sell this expansive thing\\njust for a DLC!\");\n            return;\n        }\n        this.wallet.add(this.price);\n        this.sold = true;\n        this.sprite.destroy();\n        if (this.playerRoom.dlc && this.wallet.total() >= this.playerRoom.dlc.price) {\n            this.playerRoom.backToTheGame();\n        }\n    }\n    create(game) {\n        const x = this.x + this.sprite.width / 2;\n        const y = this.y + this.sprite.height / 2;\n        this.priceImage = game.add.image(x, y, 'price');\n        this.priceImage.scale.set(0.25, 0.25);\n        this.priceImage.alpha = 0;\n        this.priceImage.anchor.set(0.5, 0.5);\n        this.priceImage.rotation = Math.PI / 4;\n        this.priceText = game.add.text(x - 25, y - 10, this.price + '$', { font: \"15px Gloria Hallelujah\", fill: \"#ffffff\" });\n        this.priceText.alpha = 0;\n    }\n    update(game) {\n        if (this.playerRoom.blackScren.visible) {\n            this.priceImage.alpha = 0;\n            this.priceText.alpha = 0;\n            return;\n        }\n        if (this.sold) {\n            this.priceImage.alpha = 0;\n            this.priceText.alpha = 0;\n            return;\n        }\n        if (game.input.mousePointer.x >= this.x &&\n            game.input.mousePointer.y >= this.y &&\n            game.input.mousePointer.x <= this.x + this.sprite.width &&\n            game.input.mousePointer.y <= this.y + this.sprite.height) {\n            this.priceImage.alpha = 1;\n            this.priceText.alpha = 1;\n        }\n        else {\n            this.priceImage.alpha = 0;\n            this.priceText.alpha = 0;\n        }\n    }\n}\nexports.ItemToSell = ItemToSell;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/ItemToSell.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/ItemsToSell.ts":
/*!**************************************************!*\
  !*** ./src/game/game_state/Items/ItemsToSell.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass ItemsToSell {\n    constructor() {\n        this.items = [];\n    }\n    add(item) {\n        this.items.push(item);\n    }\n}\nexports.default = ItemsToSell;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/ItemsToSell.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Lamp.ts":
/*!*******************************************!*\
  !*** ./src/game/game_state/Items/Lamp.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Lamp extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'Lamp Lava DRF';\n        this.price = 10;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'lamp-lava');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Lamp;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Lamp.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Playboy.ts":
/*!**********************************************!*\
  !*** ./src/game/game_state/Items/Playboy.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Playboy extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'Playboy magazine Nabila <3';\n        this.price = 3;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'playboy_magazine');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Playboy;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Playboy.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/PokemonCard.ts":
/*!**************************************************!*\
  !*** ./src/game/game_state/Items/PokemonCard.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass PokemonCard extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'very rare pokemon card';\n        this.price = 6;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'pokemon_card');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = PokemonCard;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/PokemonCard.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Sock.ts":
/*!*******************************************!*\
  !*** ./src/game/game_state/Items/Sock.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Sock extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'sock';\n        this.price = 1;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'sock');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Sock;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Sock.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Tshirt.ts":
/*!*********************************************!*\
  !*** ./src/game/game_state/Items/Tshirt.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Tshirt extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'South park tshirt';\n        this.price = 12;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'tshirt');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Tshirt;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Tshirt.ts?");

/***/ }),

/***/ "./src/game/game_state/Items/Underpants.ts":
/*!*************************************************!*\
  !*** ./src/game/game_state/Items/Underpants.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ItemToSell_1 = __webpack_require__(/*! ./ItemToSell */ \"./src/game/game_state/Items/ItemToSell.ts\");\nclass Underpants extends ItemToSell_1.ItemToSell {\n    create(game) {\n        this.name = 'Dirty boxer shorts';\n        this.price = 3;\n        if (!this.sold) {\n            this.sprite = game.add.sprite(this.x, this.y, 'underpants');\n            this.sprite.inputEnabled = true;\n            this.sprite.events.onInputDown.add(this.sell, this);\n        }\n        super.create(game);\n    }\n}\nexports.default = Underpants;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Items/Underpants.ts?");

/***/ }),

/***/ "./src/game/game_state/Kapitalism/Wallet.ts":
/*!**************************************************!*\
  !*** ./src/game/game_state/Kapitalism/Wallet.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Wallet {\n    constructor() {\n        this.amount = 0;\n    }\n    add(thune) {\n        this.amount += thune;\n    }\n    remove(thune) {\n        this.amount -= thune;\n    }\n    total() {\n        return this.amount;\n    }\n}\nexports.default = Wallet;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Kapitalism/Wallet.ts?");

/***/ }),

/***/ "./src/game/game_state/Kapitalism/WalletGUI.ts":
/*!*****************************************************!*\
  !*** ./src/game/game_state/Kapitalism/WalletGUI.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass WalletGUI {\n    constructor(wallet) {\n        this.wallet = wallet;\n    }\n    create(game) {\n        this.text = game.add.text(850, 10, 'Wallet: ' + this.wallet.total().toPrecision(3) + \" USD\", { font: \"35px Gloria Hallelujah\", fill: \"#333333\" });\n        this.dlcText = game.add.text(850, 50, 'DLC price: ' + 0 + \" USD\", { font: \"35px Gloria Hallelujah\", fill: \"#333333\" });\n    }\n    update(game) {\n        this.text.text = 'Wallet: ' + this.wallet.total().toPrecision(3) + \" USD\";\n        if (this.dlc) {\n            this.dlcText.text = 'DLC price: ' + this.dlc.price + \" USD\";\n        }\n    }\n    setDLC(dlc) {\n        this.dlc = dlc;\n    }\n}\nexports.default = WalletGUI;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Kapitalism/WalletGUI.ts?");

/***/ }),

/***/ "./src/game/game_state/Logo.ts":
/*!*************************************!*\
  !*** ./src/game/game_state/Logo.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst SoundManager_1 = __webpack_require__(/*! ../../SoundManager */ \"./src/SoundManager.ts\");\nclass Logo extends Phaser.State {\n    create(game) {\n        game.add.image(30, 15, 'logo');\n        game.add.bitmapText(80, 90, 'Carrier Command', \"Use arrow keys to move\", 5);\n        game.add.bitmapText(85, 100, 'Carrier Command', \"Press enter to begin!\", 5);\n        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);\n        SoundManager_1.SoundManager.create(game);\n        SoundManager_1.SoundManager.playMusic(game);\n    }\n    update(game) {\n        if (this.enter.justDown) {\n            game.state.start('DungeonLevel1');\n            // game.state.start('DungeonLevel4');\n            // game.state.start('PlayerRoom');\n            // game.state.start('Credits');\n        }\n    }\n}\nexports.Logo = Logo;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Logo.ts?");

/***/ }),

/***/ "./src/game/game_state/PlayerRoom.ts":
/*!*******************************************!*\
  !*** ./src/game/game_state/PlayerRoom.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Tshirt_1 = __webpack_require__(/*! ./Items/Tshirt */ \"./src/game/game_state/Items/Tshirt.ts\");\nconst Lamp_1 = __webpack_require__(/*! ./Items/Lamp */ \"./src/game/game_state/Items/Lamp.ts\");\nconst Chair_1 = __webpack_require__(/*! ./Items/Chair */ \"./src/game/game_state/Items/Chair.ts\");\nconst Basket_1 = __webpack_require__(/*! ./Items/Basket */ \"./src/game/game_state/Items/Basket.ts\");\nconst Wallet_1 = __webpack_require__(/*! ./Kapitalism/Wallet */ \"./src/game/game_state/Kapitalism/Wallet.ts\");\nconst WalletGUI_1 = __webpack_require__(/*! ./Kapitalism/WalletGUI */ \"./src/game/game_state/Kapitalism/WalletGUI.ts\");\nconst Playboy_1 = __webpack_require__(/*! ./Items/Playboy */ \"./src/game/game_state/Items/Playboy.ts\");\nconst ItemsToSell_1 = __webpack_require__(/*! ./Items/ItemsToSell */ \"./src/game/game_state/Items/ItemsToSell.ts\");\nconst BritneyPoster_1 = __webpack_require__(/*! ./Items/BritneyPoster */ \"./src/game/game_state/Items/BritneyPoster.ts\");\nconst Bed_1 = __webpack_require__(/*! ./Items/Bed */ \"./src/game/game_state/Items/Bed.ts\");\nconst DLCs_1 = __webpack_require__(/*! ../DLCs */ \"./src/game/DLCs.ts\");\nconst GameBoy_1 = __webpack_require__(/*! ./Items/GameBoy */ \"./src/game/game_state/Items/GameBoy.ts\");\nconst PokemonCard_1 = __webpack_require__(/*! ./Items/PokemonCard */ \"./src/game/game_state/Items/PokemonCard.ts\");\nconst app_1 = __webpack_require__(/*! ../../app */ \"./src/app.ts\");\nconst Sock_1 = __webpack_require__(/*! ./Items/Sock */ \"./src/game/game_state/Items/Sock.ts\");\nconst Underpants_1 = __webpack_require__(/*! ./Items/Underpants */ \"./src/game/game_state/Items/Underpants.ts\");\nconst PlayerMessageBox_1 = __webpack_require__(/*! ../PlayerMessageBox */ \"./src/game/PlayerMessageBox.ts\");\nclass PlayerRoom extends Phaser.State {\n    constructor() {\n        super();\n        this.itemsToSell = new ItemsToSell_1.default();\n        this.wallet = new Wallet_1.default();\n        this.walletGUI = new WalletGUI_1.default(this.wallet);\n        this.initSellableItems();\n        this.playerMessageBox = new PlayerMessageBox_1.default();\n        this.haveDisplayedFirstMessage = false;\n        this.gameEnded = false;\n    }\n    create(game) {\n        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;\n        this.game.renderer.renderSession.roundPixels = false;\n        this.game.width = app_1.GAME_WIDTH;\n        this.game.height = app_1.GAME_HEIGHT;\n        this.game.renderer.resize(app_1.GAME_WIDTH, app_1.GAME_HEIGHT);\n        this.background = game.add.image(0, 0, 'backgroundplayerroom');\n        this.drawItems(game);\n        this.walletGUI.create(game);\n        game.add.image(1060, 196, 'laptop');\n        this.playerMessageBox.create(game);\n        if (!this.haveDisplayedFirstMessage) {\n            this.playerMessageBox.addMessageBox(game, \"Oh, I don't have money to buy\\nthis DLC...\\nI have to sell one of my stuff...\");\n            this.haveDisplayedFirstMessage = true;\n        }\n        this.blackScren = this.game.add.graphics(0, 0);\n        this.blackScren.beginFill(0x000000);\n        this.blackScren.drawRect(0, 0, app_1.GAME_WIDTH, app_1.GAME_HEIGHT);\n        let timing = Phaser.Timer.SECOND * 2;\n        if (this.gameEnded) {\n            timing = Phaser.Timer.SECOND * 5;\n        }\n        game.add.tween(this.blackScren).to({ alpha: 0 }, timing, Phaser.Easing.Default, true);\n        game.time.events.add(timing, () => {\n            if (!this.gameEnded) {\n                this.blackScren.visible = false;\n            }\n            else {\n                this.playerMessageBox.addMessageBox(game, \"This game was cool! I started it\\nwith nothing... and now...\\nI end up with nothing!\");\n                game.time.events.add(timing, () => {\n                    game.add.tween(this.blackScren).to({ alpha: 1 }, timing, Phaser.Easing.Default, true);\n                    game.time.events.add(timing, () => {\n                        this.goCredits(game);\n                    });\n                });\n            }\n        });\n    }\n    goCredits(game) {\n        game.state.start('Credits');\n    }\n    initSellableItems() {\n        const tshirt = new Tshirt_1.default(this.wallet, this, 144, 340);\n        this.itemsToSell.add(tshirt);\n        const britneyPoster = new BritneyPoster_1.default(this.wallet, this, 140, 15);\n        this.itemsToSell.add(britneyPoster);\n        const playboy = new Playboy_1.default(this.wallet, this, 109, 601);\n        this.itemsToSell.add(playboy);\n        const basket = new Basket_1.default(this.wallet, this, 780, 624);\n        this.itemsToSell.add(basket);\n        const lampLava = new Lamp_1.default(this.wallet, this, 701, 139);\n        this.itemsToSell.add(lampLava);\n        const chair = new Chair_1.default(this.wallet, this, 820, 188);\n        this.itemsToSell.add(chair);\n        const bed = new Bed_1.default(this.wallet, this, 363, 169);\n        this.itemsToSell.add(bed);\n        const gameBoy = new GameBoy_1.default(this.wallet, this, 15, 457);\n        this.itemsToSell.add(gameBoy);\n        const pokemonCard = new PokemonCard_1.default(this.wallet, this, 5, 125);\n        this.itemsToSell.add(pokemonCard);\n        const sock = new Sock_1.default(this.wallet, this, 700, 488);\n        this.itemsToSell.add(sock);\n        const underpants = new Underpants_1.default(this.wallet, this, 720, 330);\n        this.itemsToSell.add(underpants);\n    }\n    drawItems(game) {\n        this.itemsToSell.items.forEach((item) => {\n            //console.log(item);\n            item.create(game);\n        });\n    }\n    update(game) {\n        if (this.gameEnded) {\n            return;\n        }\n        this.walletGUI.update(game);\n        this.itemsToSell.items.forEach((itemToSell) => {\n            itemToSell.update(game);\n        });\n    }\n    setdlcItem(dlc) {\n        this.dlc = dlc;\n        this.walletGUI.setDLC(dlc);\n    }\n    setCurrentLevelName(str) {\n        this.levelName = str;\n        console.log('Set current level name to ' + str);\n    }\n    backToTheGame() {\n        this.blackScren.visible = true;\n        this.game.add.tween(this.blackScren).to({ alpha: 1 }, Phaser.Timer.SECOND * 2, Phaser.Easing.Default, true);\n        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {\n            this.wallet.remove(this.dlc.price);\n            const name = 'DungeonL' + this.levelName.substr(1);\n            DLCs_1.achete(this.dlc.name);\n            this.game.state.start(name);\n            const dungeon = this.game.state.states[name];\n            dungeon.setDlcBuy(this.dlc);\n        });\n    }\n    getWallet() {\n        return this.wallet;\n    }\n    endGame() {\n        this.gameEnded = true;\n    }\n}\nexports.default = PlayerRoom;\n\n\n//# sourceURL=webpack:///./src/game/game_state/PlayerRoom.ts?");

/***/ }),

/***/ "./src/game/game_state/Preload.ts":
/*!****************************************!*\
  !*** ./src/game/game_state/Preload.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Preload extends Phaser.State {\n    preload() {\n        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 10, '0%', { fill: 'white', fontSize: 11, font: '11px Courier New' });\n        this.progress.anchor.setTo(.5, .5);\n        this.graphics = this.game.add.graphics();\n        this.graphics.lineStyle(1, 0x99e550);\n        this.graphics.drawRect(this.game.world.centerX - 75.5, this.game.world.centerY + 0.5, 150, 10);\n        this.game.load.onFileComplete.add(this.fileComplete, this);\n        this.loadAudio();\n        this.loadImages();\n        this.loadFonts();\n    }\n    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {\n        this.progress.text = progress + \"%\";\n        this.graphics.beginFill(0x6abe30);\n        this.graphics.drawRect(this.game.world.centerX - 74.5, this.game.world.centerY + 1.5, 148 * (progress / 100), 8);\n        if (progress >= 100) {\n            this.game.state.start('Logo');\n        }\n    }\n    ;\n    loadAudio() {\n        this.game.load.audio('walk', 'src/assets/musics/walk.mp3');\n        this.game.load.audio('pee', 'src/assets/musics/pee.mp3');\n        this.game.load.audio('cocamachine', 'src/assets/musics/cocamachine.mp3');\n        this.game.load.audio('keyboard', 'src/assets/musics/keyboard.mp3');\n        this.game.load.audio('water', 'src/assets/musics/water.mp3');\n        this.game.load.audio('backgroundsound', 'src/assets/musics/backgroundsound.mp3');\n    }\n    loadImages() {\n        this.game.load.image('menu_dlc_background', 'src/assets/images/menu_dlc_background.png');\n        this.game.load.image('dlc_item', 'src/assets/images/dlc_item.png');\n        this.game.load.image('dlc_item_selected', 'src/assets/images/dlc_item_selected.png');\n        this.game.load.image('dlc_item_preview', 'src/assets/images/dlc_item_preview.png');\n        this.game.load.image('dlc_item_acheted', 'src/assets/images/dlc_item_acheted.png');\n        this.game.load.image('buy_dlc_button', 'src/assets/images/buy_dlc_button.png');\n        this.game.load.image('paypal', 'src/assets/images/paypal.png');\n        this.game.load.image('menu_dlc_arrow_down', 'src/assets/images/menu_dlc_arrow_down.png');\n        this.game.load.image('menu_dlc_arrow_up', 'src/assets/images/menu_dlc_arrow_up.png');\n        this.game.load.image('menu_dlc_slider_handle', 'src/assets/images/menu_dlc_slider_handle.png');\n        this.game.load.image('menu_dlc_background', 'src/assets/images/menu_dlc_background.png');\n        this.game.load.image('menu_dlc_header', 'src/assets/images/menu_dlc_header.png');\n        this.game.load.image('dlcbuy', 'src/assets/images/dlcbuy.png');\n        this.game.load.image('messagebox', 'src/assets/messagebox.png');\n        this.game.load.image('backgroundplayerroom', 'src/assets/images/backgroundplayerroom.png');\n        this.game.load.image('pointdesclamasion', 'src/assets/images/pointdesclamasion.png');\n        this.game.load.image('backgroundlamp', 'src/assets/images/backgroundlamp.png');\n        this.game.load.image('playerdialogmessage', 'src/assets/images/dialogplayer.png');\n        this.game.load.image('price', 'src/assets/images/price.png');\n        this.game.load.spritesheet('server', 'src/assets/images/computer.png', 48, 32);\n        this.game.load.image('dlc_thumb_1', 'src/assets/images/dlc_thumb_1.png');\n        this.game.load.image('playerroombackground', 'src/assets/images/playerroombackground.png');\n        this.game.load.image('player_front', 'src/assets/images/player_front.png');\n        this.game.load.image('player_back', 'src/assets/images/player_back.png');\n        this.game.load.image('player_business_front', 'src/assets/images/player_business_front.png');\n        this.game.load.image('player_business_back', 'src/assets/images/player_business_back.png');\n        this.game.load.image('iench', 'src/assets/images/iench.png');\n        this.game.load.image('vigil', 'src/assets/images/vigil_front.png');\n        this.game.load.image('main', 'src/assets/tilesets/interior.png');\n        this.game.load.spritesheet('main_spritesheet', 'src/assets/tilesets/interior.png', 16, 16);\n        this.game.load.tilemap('level1', 'src/assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);\n        this.game.load.tilemap('level2', 'src/assets/tilemaps/map2.json', null, Phaser.Tilemap.TILED_JSON);\n        this.game.load.tilemap('level3', 'src/assets/tilemaps/map3.json', null, Phaser.Tilemap.TILED_JSON);\n        this.game.load.tilemap('level4', 'src/assets/tilemaps/map4.json', null, Phaser.Tilemap.TILED_JSON);\n        this.game.load.spritesheet('chips', 'src/assets/images/chips.png', 12, 12);\n        this.game.load.image('shadow', 'src/assets/images/shadow.png');\n        this.game.load.image('logo', 'src/assets/images/logo2.png');\n        this.game.load.spritesheet('tshirt', 'src/assets/images/tshirt.png', 181, 181);\n        this.game.load.spritesheet('lamp-lava', 'src/assets/images/lamp.png', 48, 121);\n        this.game.load.spritesheet('chair', 'src/assets/images/chair.png', 202, 343);\n        this.game.load.spritesheet('basket', 'src/assets/images/basket.png', 145, 103);\n        this.game.load.spritesheet('playboy_magazine', 'src/assets/images/playboy.png', 179, 180);\n        this.game.load.spritesheet('britney_poster', 'src/assets/images/poster.png', 108, 155);\n        this.game.load.spritesheet('bed', 'src/assets/images/bed.png', 325, 490);\n        this.game.load.spritesheet('game_boy', 'src/assets/images/gameboy.png', 69, 74);\n        this.game.load.spritesheet('pokemon_card', 'src/assets/images/cards.png', 69, 70);\n        this.game.load.spritesheet('sock', 'src/assets/images/sock.png', 86, 62);\n        this.game.load.spritesheet('underpants', 'src/assets/images/underpants.png', 112, 108);\n        this.game.load.spritesheet('laptop', 'src/assets/images/laptop.png', 106, 117);\n        this.game.load.spritesheet('multiplayer-btn', 'src/assets/images/multiplayer-btn.png', 74, 13);\n        this.game.load.spritesheet('lifebar-btn', 'src/assets/images/lifebar-btn.png', 74, 13);\n        this.game.load.spritesheet('hud-background', 'src/assets/images/hud-background.png', 300, 18);\n        this.game.load.spritesheet('bladder-indicator', 'src/assets/images/bladder.png', 34, 13);\n    }\n    loadFonts() {\n        this.game.load.bitmapFont('Carrier Command', 'src/assets/fonts/carrier_command.png', 'src/assets/fonts/carrier_command.xml');\n        this.game.load.bitmapFont('Carrier Command Red', 'src/assets/fonts/carrier_command_red.png', 'src/assets/fonts/carrier_command_red.xml');\n    }\n}\nexports.default = Preload;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Preload.ts?");

/***/ })

/******/ });