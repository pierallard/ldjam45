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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/dlc/dlcApp.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dlc/dlcApp.ts":
/*!***************************!*\
  !*** ./src/dlc/dlcApp.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getId = (id) => document.querySelector('#' + id);\nconst dlcTemplate = getId('dlcItemTemplate');\nconst createDlcItemTemplate = (i) => {\n    const dlcItemContainer = document.createElement('div');\n    dlcItemContainer.className = 'dlcItemContainer';\n    const dlcItemBackground = document.createElement('div');\n    dlcItemBackground.className = 'dlcItemBackground';\n    const dlcItem = document.createElement('div');\n    dlcItem.innerHTML = dlcTemplate.innerHTML;\n    dlcItem.className = 'dlcItem';\n    setTimeout(() => {\n        dlcItem.className = 'dlcItem dlcItemEntering';\n    }, 50 * (i + 1));\n    dlcItemContainer.appendChild(dlcItemBackground);\n    dlcItemContainer.appendChild(dlcItem);\n    return dlcItemContainer;\n};\nconst getClass = (clas, element = document) => element.querySelector('.' + clas);\nconst createDLCItem = (dlc, index, onBuy) => {\n    const dlcItem = createDlcItemTemplate(index);\n    const title = getClass('dlcTitle', dlcItem);\n    title.textContent = dlc.name;\n    title.onclick = () => onBuy(dlc);\n    const image = getClass('dlcImage', dlcItem);\n    if (dlc.image == null) {\n        image.src = 'https://via.placeholder.com/250x150';\n    }\n    else {\n        image.src = '/dist/assets/images/' + dlc.image;\n    }\n    if (dlc.isAcheted) {\n        const price = getClass('dlcPrice', dlcItem);\n        price.innerText = `Installed`;\n        const buy = getClass('dlcBuyButton', dlcItem);\n        buy.remove();\n    }\n    else {\n        const price = getClass('dlcPrice', dlcItem);\n        price.innerText = `$ ${dlc.price} USD`;\n        const buy = getClass('dlcBuyButton', dlcItem);\n        buy.onclick = () => {\n            closeDLCMenu();\n            onBuy(dlc);\n        };\n    }\n    const description = getClass('dlcDescription', dlcItem);\n    description.innerText = dlc.description.join('\\n');\n    return dlcItem;\n};\nconst openDLCMenu = (dlcs, onBuy, currentWallet) => {\n    getId('DLCMenu').style.display = 'block';\n    const dlcsList = getId('dlcList');\n    const currentWalletDom = getId('dlcCurrentWallet');\n    dlcs.forEach((dlc, i) => dlcsList.appendChild(createDLCItem(dlc, i, onBuy)));\n    currentWalletDom.innerText = 'Your wallet: ' + currentWallet.toPrecision(3) + ' $';\n};\nconst closeDLCMenu = () => {\n    getId('DLCMenu').style.display = 'none';\n    getId('dlcList').innerHTML = '';\n};\nconst close = getId('dlcClose');\nclose.onclick = () => {\n    closeDLCMenu();\n};\nwindow['openDLCMenu'] = openDLCMenu;\nwindow['closeDLCMenu'] = closeDLCMenu;\n\n\n//# sourceURL=webpack:///./src/dlc/dlcApp.ts?");

/***/ })

/******/ });