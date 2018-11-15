require('source-map-support/register')
module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controllers/api.js":
/*!********************************!*\
  !*** ./src/controllers/api.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheerio */ "cheerio");
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var convert_units__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! convert-units */ "convert-units");
/* harmony import */ var convert_units__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(convert_units__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! puppeteer */ "puppeteer");
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(puppeteer__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_6__);







/*
* [X] Cities and countries
* [X] Current temps per city/country
* [X] Historical temps for city/country
* */

const Api = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
const scrape_url = `https://www.wunderground.com/weather/`;

const number_rounder = num => isNaN(Number(num)) ? 'Not available :(' : parseFloat(num).toFixed(1);

Api.get('/countries-cities', async (req, res) => {
  const countries = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_6___default.a.readFileSync('countries-cities.json', 'utf8'));
  res.json(countries);
});
Api.get('/current/:country/:city', async (req, res) => {
  const {
    country,
    city
  } = req.params;

  if (!country || !city) {
    return res.sendStatus(422);
  }

  const uri = `${scrape_url}${encodeURI(country)}/${encodeURI(city)}`;
  const html = (await axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(uri)).data;
  const $ = cheerio__WEBPACK_IMPORTED_MODULE_1___default.a.load(html);
  const avgTemperature = number_rounder(convert_units__WEBPACK_IMPORTED_MODULE_3___default()($('div.current-temp .wu-value.wu-value-to').text()).from('F').to('C'));
  const minTemperature = number_rounder($('div.condition-data .hi-lo .lo').text().slice(0, -1));
  const maxTemperature = number_rounder($('div.condition-data .hi-lo .hi').text().slice(0, -1));
  const responseObject = {
    avgTemperature,
    minTemperature: minTemperature > -300 ? number_rounder(convert_units__WEBPACK_IMPORTED_MODULE_3___default()(minTemperature).from('F').to('C')) : minTemperature,
    maxTemperature: maxTemperature > -300 ? number_rounder(convert_units__WEBPACK_IMPORTED_MODULE_3___default()(maxTemperature).from('F').to('C')) : maxTemperature
  };
  res.json(responseObject);
});
Api.get('/history/:country/:city/:year/:month', async (req, res) => {
  const {
    country,
    city,
    year,
    month
  } = req.params;

  if (!country || !city || !year || !month) {
    return res.sendStatus(422);
  } // We have to use a browser since the data is retrieved via an xhr request


  const browser = await puppeteer__WEBPACK_IMPORTED_MODULE_5___default.a.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.wunderground.com/history/monthly/${country}/${city}/EHAM/date/${year}-${month}`, {
    waitUntil: 'networkidle2'
  });
  const result = await page.evaluate(() => {
    const avgMax = document.querySelector('#inner-content > div.city-body > div.row.city-history-summary > div > div:nth-child(1) > div > div > city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)');
    const avgAvg = document.querySelector('#inner-content > div.city-body > div.row.city-history-summary > div > div:nth-child(1) > div > div > city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)');
    const avgMin = document.querySelector('#inner-content > div.city-body > div.row.city-history-summary > div > div:nth-child(1) > div > div > city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(4)');
    return {
      max: !!avgMax ? avgMax.innerHTML : '--',
      min: !!avgMin ? avgMin.innerHTML : '--',
      avg: !!avgAvg ? avgMin.innerHTML : '--'
    };
  });
  browser.close();

  for (const key in result) {
    result[key] = number_rounder(convert_units__WEBPACK_IMPORTED_MODULE_3___default()(result[key]).from('F').to('C'));
  }

  res.json(result);
});
/* harmony default export */ __webpack_exports__["default"] = (Api);

/***/ }),

/***/ "./src/controllers/home.js":
/*!*********************************!*\
  !*** ./src/controllers/home.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);

const Home = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
Home.get('/', (req, res) => {
  res.send('hi from home');
});
/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ip */ "ip");
/* harmony import */ var ip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_log__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/log */ "./src/services/log.js");
/* harmony import */ var _controllers_home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controllers/home */ "./src/controllers/home.js");
/* harmony import */ var _controllers_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controllers/api */ "./src/controllers/api.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











__webpack_require__(/*! dotenv */ "dotenv").config();
/*
*
*
* */


class Server {
  constructor() {
    _defineProperty(this, "app", void 0);

    _defineProperty(this, "port", void 0);

    _defineProperty(this, "onListen", err => {
      if (err) {
        Object(_services_log__WEBPACK_IMPORTED_MODULE_6__["error"])(`Unable to start server on port ${this.port}`, err);
        return;
      }

      if (process.env.__DEV__) {
        Object(_services_log__WEBPACK_IMPORTED_MODULE_6__["warn"])('We\'re in development mode.');
      }

      Object(_services_log__WEBPACK_IMPORTED_MODULE_6__["info"])(`We're live.\r\n`);
      Object(_services_log__WEBPACK_IMPORTED_MODULE_6__["info"])(chalk__WEBPACK_IMPORTED_MODULE_1___default.a`{bold On your network:}     {underline http://${ip__WEBPACK_IMPORTED_MODULE_5___default.a.address('public')}:{bold ${this.port.toString()}}/}`);
      Object(_services_log__WEBPACK_IMPORTED_MODULE_6__["info"])(chalk__WEBPACK_IMPORTED_MODULE_1___default.a`Local:               {underline http://${ip__WEBPACK_IMPORTED_MODULE_5___default.a.address('private')}:{bold ${this.port.toString()}}/}`);
    });

    _defineProperty(this, "start", async () => {
      this.app.use(body_parser__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({
        extended: true
      }));
      this.app.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());
      this.app.use(express__WEBPACK_IMPORTED_MODULE_3___default.a.static('public'));
      this.setRoutes();
      const http = new http__WEBPACK_IMPORTED_MODULE_4__["Server"](this.app);
      http.listen(this.port, this.onListen);
    });

    _defineProperty(this, "setRoutes", () => {
      // this.app.use('/', Home);
      this.app.use('/api/v1', _controllers_api__WEBPACK_IMPORTED_MODULE_8__["default"]);
    });

    this.app = express__WEBPACK_IMPORTED_MODULE_3___default()();
    this.port = process.env.PORT || 3000;
    this.start();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new Server());

/***/ }),

/***/ "./src/services/log.js":
/*!*****************************!*\
  !*** ./src/services/log.js ***!
  \*****************************/
/*! exports provided: info, error, warn, debug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "info", function() { return info; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var stack_trace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stack-trace */ "stack-trace");
/* harmony import */ var stack_trace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stack_trace__WEBPACK_IMPORTED_MODULE_1__);



const log = (type = 'log', message, ...misc) => {
  if (type === 'debug' && process.env.DEBUG !== 'true') {
    return;
  }

  let content = [];

  switch (type) {
    case 'log':
      content = [chalk__WEBPACK_IMPORTED_MODULE_0___default.a`{bold.cyan INFO}`];
      break;

    case 'error':
      content = [chalk__WEBPACK_IMPORTED_MODULE_0___default.a`{bold.red ERR!}`];
      break;

    case 'warn':
      content = [chalk__WEBPACK_IMPORTED_MODULE_0___default.a`{bold.yellow WARN}`];
      break;

    case 'debug':
      {
        const trace = Object(stack_trace__WEBPACK_IMPORTED_MODULE_1__["get"])();
        const funcName = trace[2].getFunctionName();
        content = [chalk__WEBPACK_IMPORTED_MODULE_0___default.a`{bold.magenta VERB} ${funcName ? chalk__WEBPACK_IMPORTED_MODULE_0___default.a`{bgBlack.white  ${funcName.substr(0, 15)} }` : ''}`];
        break;
      }

    default:
      throw new Error(`Invalid log type: ${type}`);
  }

  content = [...content, message, ...misc];
  console[type === 'debug' ? 'log' : type](...content);
};

const info = (message, ...rest) => log('log', message, ...rest);
const error = (message, ...rest) => log('error', message, ...rest);
const warn = (message, ...rest) => log('warn', message, ...rest);
const debug = (message, ...rest) => log('debug', message, ...rest);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/thomas/gitrepos/windesheim-periode2-node-weatherapp/src/index.js */"./src/index.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),

/***/ "convert-units":
/*!********************************!*\
  !*** external "convert-units" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("convert-units");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "ip":
/*!*********************!*\
  !*** external "ip" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ip");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),

/***/ "stack-trace":
/*!******************************!*\
  !*** external "stack-trace" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stack-trace");

/***/ })

/******/ });
//# sourceMappingURL=main.map