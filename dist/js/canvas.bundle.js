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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Event Listeners


addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Objects
function Star(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
        // x: 3,
        x: _utils2.default.randomIntFromRange(-30, 30),
        y: 30
    };
    this.gravity = 1;
    this.friction = 0.4;
}

Star.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

Star.prototype.update = function () {
    this.draw();

    if (this.x + this.radius + this.velocity.x > canvas.width || this.x + this.radius + this.velocity.x < this.radius + 20) {
        this.velocity.x = -this.velocity.x * this.friction;
        this.shatter();
    } else {
        this.x += this.velocity.x * 0.92;
    }

    if (this.y + this.radius + this.velocity.y > canvas.height - floorHeight / 2) {
        this.velocity.y = -this.velocity.y * this.friction;
        this.shatter();
    } else {
        this.velocity.y += this.gravity;
    }

    this.y += this.velocity.y;
};

Star.prototype.shatter = function () {
    this.radius -= 2;
    for (var i = 0; i < 8; i++) {
        miniStars.push(new MiniStar(this.x, this.y, 2));
    }
};

function MiniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color);
    this.velocity = {
        x: _utils2.default.randomIntFromRange(-5, 5),
        y: _utils2.default.randomIntFromRange(-15, 15)
    };
    this.friction = 0.8;
    this.gravity = 0.1;
    this.ttl = 50;
    this.opacity = 1;
}

MiniStar.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'rgba(255, 255, 255, ' + this.opacity;
    c.fill();
    c.closePath();
};

MiniStar.prototype.update = function () {
    this.draw();

    if (this.y + this.radius + this.velocity.y > canvas.height - floorHeight / 2) {
        this.velocity.y = -this.velocity.y * this.friction;
    } else {
        this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
};

function drawMountain(count, height, color) {
    for (var i = 0; i < count; i++) {
        var mWidth = canvas.width / count;
        c.beginPath();
        c.moveTo(i * mWidth, canvas.height);
        c.lineTo(i * mWidth + mWidth + 325, canvas.height);
        c.lineTo(i * mWidth + mWidth / 2, canvas.height - height);
        c.lineTo(i * mWidth - 325, canvas.height);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}

// Implementation
var stars = void 0;
var miniStars = void 0;
var backgroundStars = void 0;
var floorHeight = 100;

function init() {
    stars = [];
    miniStars = [];
    backgroundStars = [];

    for (var i = 0; i < _utils2.default.randomIntFromRange(1, 3); i++) {
        setInterval(function () {
            stars.push(new Star(innerWidth / 2 + _utils2.default.randomIntFromRange(-innerWidth / 2, innerWidth / 2), 10, 6, '#e3eaef'));
        }, _utils2.default.randomIntFromRange(1500, 3000));
    }

    for (var _i = 0; _i < 150; _i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var r = Math.random() * 3;
        backgroundStars.push(new Star(x, y, r, 'white'));
    }
}

function createGradient(y1, y2, colorStop1, colorStop2) {
    var bgGradient = c.createLinearGradient(0, y1, 0, y2);
    bgGradient.addColorStop(0, colorStop1);
    bgGradient.addColorStop(1, colorStop2);
    return bgGradient;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = createGradient(0, canvas.height, '#171e26', '#3d586b');
    c.fillRect(0, 0, canvas.width, canvas.height);

    backgroundStars.forEach(function (backgroundStars) {
        backgroundStars.draw();
    });

    drawMountain(1, canvas.height - 50, createGradient(-50, 150, '#c9c9c9', '#262728'));
    drawMountain(2, canvas.height - 100, createGradient(0, 230, '#c9c9c9', '#262728'));
    drawMountain(3, canvas.height - 200, createGradient(100, 300, '#c9c9c9', '#2b2d2c'));

    c.fillStyle = '#393939';
    c.fillRect(0, canvas.height - floorHeight, canvas.width, floorHeight / 2);

    stars.forEach(function (star, index) {
        star.update();
        if (star.radius === 0) {
            stars.splice(index, 1);
        }
    });

    miniStars.forEach(function (miniStar, index) {
        miniStar.update();
        if (miniStar.ttl === 0) {
            miniStars.splice(index, 1);
        }
    });
    c.fillStyle = '#393939';
    c.fillRect(0, canvas.height - floorHeight / 2, canvas.width, floorHeight / 2);
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map