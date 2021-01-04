/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/styles.css */ \"./styles/styles.css\");\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.html */ \"./index.html\");\n\r\n\r\n\r\nconst apiKey = \"886705b4c1182eb1c69f28eb8c520e20\";\r\n\r\nwindow.addEventListener(\"load\", () => {\r\n  let lon;\r\n  let lat;\r\n  let temperatureDescription = document.querySelector(\".js-temperature-description\");\r\n  let temperatureDegree = document.querySelector(\".js-temperature-degree\");\r\n  let locationIcon = document.querySelector(\".js-weather-icon\");\r\n  let locationCity = document.querySelector(\".js-location-city\");\r\n  let wind = document.querySelector(\".js-wind\");\r\n  let jsHumidity = document.querySelector(\".js-humidity\");\r\n\r\n// API\r\n\r\n  const json = (response) => response.json();\r\n  const currentDataByLocation = (data) => {\r\n    const { temp } = data.main;\r\n    temperatureDegree.textContent = Math.round(temp);\r\n    const { description } = data.weather[0];\r\n    temperatureDescription.textContent = description;\r\n    locationCity.innerText = `${data.name} ${data.sys.country}`;\r\n    const { icon } = data.weather[0];\r\n    locationIcon.innerHTML = `<img src=\"./icons/${icon}.png\">`;\r\n    const { speed } = data.wind;\r\n    wind.textContent = speed;\r\n\r\n    const { humidity } = data.main;\r\n    jsHumidity.textContent = humidity;\r\n\r\n    \r\n// fahrenheit conversion\r\n\r\n    const fahrenheit = temp * 1.8 + 32;\r\n    const degree = document.querySelector('.js-temperature-degree');\r\n    const degreeSpan = document.querySelector('.js-degree-section span:nth-child(3)')\r\n  \r\n    degree.addEventListener('click', ()=> {\r\n      \r\n      if (degreeSpan.textContent === \"C\") {\r\n        degreeSpan.textContent = \"F\";\r\n        degree.textContent = Math.round(fahrenheit);\r\n      } else {\r\n        degreeSpan.textContent = \"C\";\r\n        degree.textContent = Math.round(temp);\r\n      }\r\n    })\r\n  };\r\n\r\n  const errorhandle = (error) => {\r\n    console.error(\"Error: \", Error);\r\n  };\r\n\r\n  //get weather by geolocation\r\n\r\n  const forecastDataByLocation = (data)=> {\r\n    \r\n    for(let i=1; i<6; i++){\r\n      let date = new Date(data.daily[i].dt * 1000);\r\n      let days = ['Sunday', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];\r\n      let name = days[date.getDay()];\r\n\r\n      let dailyIcon = data.daily[i].weather[0].icon;\r\n      \r\n      let dailyTemperature = Math.floor(data.daily[i].temp.day);\r\n      let dailyDescription = data.daily[i].weather[0].description;\r\n      let newElement = document.createElement('div');\r\n\r\n     newElement.innerHTML = `\r\n      <div class=\"forecast-day\">\r\n        <div class=\"day\">${name}</div>\r\n            <div class=\"forecast-icon\"><img src=\"./icons/${dailyIcon}.png\"></div>\r\n            <div class=\"forecast-temperature js-forecast-temperature\">${dailyTemperature}</div>\r\n            <div class=\"forecast-description\">${dailyDescription}</div>\r\n          </div>\r\n      `;\r\n      document.querySelector(\".forecast-container\").appendChild(newElement);\r\n  }\r\n  }\r\n\r\n  const currentWeatherByPosition = ()=> {\r\n    fetch(\r\n    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`\r\n  )\r\n    .then(json)\r\n    .then(currentDataByLocation)\r\n    .catch(errorhandle);\r\n  }\r\n  const forecastByPosition = () => {\r\n    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`)\r\n    .then(json)\r\n    .then(forecastDataByLocation)\r\n    .catch(errorhandle);\r\n  }\r\n\r\n  if (navigator.geolocation) {\r\n    navigator.geolocation.getCurrentPosition((position) => {\r\n      lon = position.coords.longitude;\r\n      lat = position.coords.latitude;\r\n\r\n      currentWeatherByPosition();\r\n      forecastByPosition();\r\n\r\n    });\r\n\r\n    }\r\n\r\n  //get weather by city searching\r\n  \r\n  const searchbox = document.querySelector(\".js-search-box\");\r\n  searchbox.addEventListener(\"keypress\", query);\r\n\r\n  function query(e) {\r\n    if (e.keyCode === 13) {\r\n      getResults(searchbox.value);\r\n      getForecastByCityId(searchbox.value);\r\n      e.preventDefault();\r\n      searchbox.value = \"\";\r\n    }\r\n  }\r\n  function getResults(query) {\r\n    fetch(\r\n      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`\r\n    )\r\n      .then(json)\r\n      .then(currentDataByLocation)\r\n      .catch(errorhandle);\r\n  }\r\n\r\nconst dataForecastByCity = (data) => {\r\n  console.log(data);\r\n  for(let i=1; i<6; i++){\r\n    let date = new Date(data.list[i].dt * 1000);\r\n    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];\r\n    let name = days[date.getDay()];\r\n\r\n    let dailyIcon = data.list[i].weather[0].icon;\r\n    \r\n    let dailyTemperature = Math.floor(data.list[i].temp.day);\r\n    let dailyDescription = data.list[i].weather[0].description;\r\n    let newElement = document.createElement('div');\r\n\r\n   newElement.innerHTML = `\r\n    <div class=\"forecast-day\">\r\n      <div class=\"day\">${name}</div>\r\n          <div class=\"forecast-icon\"><img src=\"./icons/${dailyIcon}.png\"></div>\r\n          <div class=\"forecast-temperature js-forecast-temperature\">${dailyTemperature}</div>\r\n          <div class=\"forecast-description\">${dailyDescription}</div>\r\n        </div>\r\n    `;\r\n    \r\n    document.querySelector(\".forecast-container\").appendChild(newElement);\r\n    \r\n}\r\n}\r\n\r\n  function getForecastByCityId(query) {\r\n    document.querySelector(\".forecast-container\").innerHTML = '';\r\n    fetch(\r\n     `https://api.openweathermap.org/data/2.5/forecast/daily?q=${query}&units=metric&cnt=7&appid=${apiKey}`\r\n    )\r\n      .then(json)\r\n      .then(dataForecastByCity)\r\n      .catch(errorhandle);\r\n  }\r\n\r\n});\r\n\n\n//# sourceURL=webpack://weather-app/./js/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./styles/styles.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./styles/styles.css ***!
  \*****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=PT+Sans+Caption&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"*{\\r\\n  font-size: 13px;\\r\\n\\r\\n}\\r\\nbody {\\r\\n  height: 100vh;\\r\\n  font-family: \\\"PT Sans Caption\\\", sans-serif;\\r\\n  color: white;\\r\\n  \\r\\n  background-color: #3AAFA9;\\r\\n   /* background: rgba(57,204,204,1);\\r\\n    background: -webkit-linear-gradient(top, rgba(57,204,204,1) 0%, rgba(34,122,122,1) 100%);\\r\\n    background: linear-gradient(to bottom, rgba(57,204,204,1) 0%, rgba(34,122,122,1) 100%);\\r\\n  \\r\\n /* background: -webkit-linear-gradient(\\r\\n    to right,\\r\\n    #3498db,\\r\\n    #2c3e50\\r\\n  ); \\r\\n  background: linear-gradient(\\r\\n    to right,\\r\\n    #3498db,\\r\\n    #2c3e50\\r\\n  );*/\\r\\n}\\r\\n.degree-section {\\r\\n  \\r\\n  text-shadow: 2px 5px 10px rgba(0, 0, 0, 0.5);\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n}\\r\\n.form-city {\\r\\n  margin-bottom: 5rem;\\r\\n}\\r\\n.search-box {\\r\\n  text-align: center;\\r\\n  width: 100%;\\r\\n  border: none;\\r\\n  outline: none;\\r\\n  border-radius: 16px;\\r\\n  font-size: 1rem;\\r\\n  background-color: rgba(255, 255, 255, 0.3);\\r\\n}\\r\\n.search-box:focus {\\r\\n  background-color: rgba(255, 255, 255, 0.6);\\r\\n}\\r\\n.search-box::placeholder {\\r\\n  color: black;\\r\\n  font-family: \\\"Yeon Sung\\\", cursive;\\r\\n}\\r\\n.temperature-degree {\\r\\n  font-size: 5rem;\\r\\n  cursor: pointer;\\r\\n  margin: 1rem;\\r\\n}\\r\\n.degree-section span {\\r\\n  font-size: 3.5rem;\\r\\n}\\r\\n.temperature-description {\\r\\n  font-size: 1rem;\\r\\n}\\r\\n.location {\\r\\n  margin-top: 3rem;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n}\\r\\n.location-city {\\r\\n  text-transform: uppercase;\\r\\n}\\r\\n.footer-description {\\r\\n  display: flex;\\r\\n  justify-content: space-evenly;\\r\\n  margin: 1rem;\\r\\n}\\r\\n\\r\\n.forecast-row {\\r\\n  display: flex;\\r\\n}\\r\\n.forecast-container {\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n}\\r\\n.forecast-day {\\r\\n  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;\\r\\n  border-radius: 25px;\\r\\n  margin: 1rem;\\r\\n  padding: 2rem;\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n  align-self: center;\\r\\n  flex-direction: column;\\r\\n \\r\\n}\\r\\n.day {\\r\\n  font-size: 2rem;\\r\\n  margin-bottom: 1rem;\\r\\n}\\r\\n.forecast-icon {\\r\\n  font-size: 1.5rem;\\r\\n}\\r\\n.forecast-temperature {\\r\\n  font-size: 3rem;\\r\\n}\\r\\n.wind-section {\\r\\n  display: flex;\\r\\n}\\r\\n.wind {\\r\\n  margin: 0 0.5rem;\\r\\n}\\r\\n.humidity-section {\\r\\n  display: flex;\\r\\n}\\r\\n.humidity {\\r\\n  margin: 0 0.5rem;\\r\\n}\\r\\n\\r\\n@media only screen and (min-width: 395px) {\\r\\n  \\r\\n  .location-city {\\r\\n    margin-right: 2rem;\\r\\n  }\\r\\n  .search-box {\\r\\n    width: 350px;\\r\\n  }\\r\\n  .forecast-container {\\r\\n    flex-direction: row;\\r\\n    flex-wrap: wrap;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media only screen and (min-width: 768px) {\\r\\n  .forecast-day {\\r\\n    \\r\\n    margin: 1rem;\\r\\n    padding: 2rem;\\r\\n  }\\r\\n  .location {\\r\\n    flex-direction: row;\\r\\n  }\\r\\n  .location-city {\\r\\n    font-size: 3rem;\\r\\n  }\\r\\n  .temperature-degree {\\r\\n    font-size: 7rem;\\r\\n  }\\r\\n  .temperature-description {\\r\\n    font-size: 2rem;\\r\\n  }\\r\\n  .search-box {\\r\\n    width: 450px;\\r\\n  }\\r\\n  .temperature-degree span {\\r\\n    font-size: 4.5rem;\\r\\n  }\\r\\n  .forecast-day {\\r\\n    margin: 2rem;\\r\\n    padding: 3rem;\\r\\n  }\\r\\n}\\r\\n\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://weather-app/./styles/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"index.html\");\n\n//# sourceURL=webpack://weather-app/./index.html?");

/***/ }),

/***/ "./styles/styles.css":
/*!***************************!*\
  !*** ./styles/styles.css ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./styles/styles.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://weather-app/./styles/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 230:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;