var FantasyLayers =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************!*\
  !*** ./src/layerCreatorMap.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.matchCreator = exports.registerCreator = exports.creatorMap = undefined;

var _LayerType = __webpack_require__(/*! ./LayerType */ 1);

var _LayerType2 = _interopRequireDefault(_LayerType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var creatorMap = new Map();
function registerCreator(creator) {
    var type = creator.type;
    if (!(type instanceof _LayerType2.default)) {
        throw new Error('registerCreator need a LayerType type argument!');
    }
    if (!creatorMap.has(type.platform)) {
        creatorMap.set(type.platform, new Map());
    }
    var platformCreatorMap = creatorMap.get(type.platform);
    if (!platformCreatorMap.has(type.layerType)) {
        platformCreatorMap.set(type.layerType, []);
    }
    var typeSet = platformCreatorMap.get(type.layerType);
    if (typeSet.includes(creator)) {
        throw new Error('Layer creator multiple defined!');
    } else {
        typeSet.push(creator);
    }
}
function matchCreator(type) {
    var layerType = type;
    if (!(layerType instanceof _LayerType2.default)) {
        layerType = new _LayerType2.default(layerType);
    }
    var creator = void 0;
    if (creatorMap.has(layerType.platform) && creatorMap.get(layerType.platform).has(layerType.layerType)) {
        var typeSet = creatorMap.get(layerType.platform).get(layerType.layerType);
        creator = typeSet.find(function (c) {
            return c.match(layerType);
        });
    }
    return creator || null;
}
exports.creatorMap = creatorMap;
exports.registerCreator = registerCreator;
exports.matchCreator = matchCreator;

/***/ }),
/* 1 */
/*!**************************!*\
  !*** ./src/LayerType.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayerType = function () {
    function LayerType(type) {
        _classCallCheck(this, LayerType);

        this.platform = type.platform;
        this.layerType = type.layerType;
        this.version = type.version;
    }

    _createClass(LayerType, [{
        key: "match",
        value: function match(type) {
            return this.platform === type.platform && this.layerType === type.layerType && this.version === type.version;
        }
    }, {
        key: "getKey",
        value: function getKey() {
            return this.platform + "-" + this.layerType + "-" + this.version;
        }
    }]);

    return LayerType;
}();

exports.default = LayerType;

/***/ }),
/* 2 */
/*!**************************!*\
  !*** ./src/layerRepo.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var layerMap = new Map();
function registerLayer(key, options) {
    if (layerMap.has(key)) {
        throw new Error("Layer " + key + " multiple defined!");
    } else {
        layerMap.set(key, options);
    }
}
function getLayerOption(key) {
    if (!layerMap.has(key)) {
        throw new Error("Layer " + key + " undefined!");
    } else {
        return layerMap.get(key);
    }
}
exports.layerMap = layerMap;
exports.registerLayer = registerLayer;
exports.getLayerOption = getLayerOption;

/***/ }),
/* 3 */
/*!********************!*\
  !*** ./src/env.js ***!
  \********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var env = {
    platform: {
        type: 'unknown',
        version: 'unknown'
    }
};
exports.default = env;

/***/ }),
/* 4 */
/*!**************************!*\
  !*** multi ./src/umd.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/umd.js */5);


/***/ }),
/* 5 */
/*!********************!*\
  !*** ./src/umd.js ***!
  \********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = __webpack_require__(/*! ./index */ 6);

var fantasyMap = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = _extends({}, fantasyMap);

/***/ }),
/* 6 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCreator = exports.getLayer = undefined;

var _LayerFactory = __webpack_require__(/*! ./LayerFactory */ 7);

Object.defineProperty(exports, 'getLayer', {
  enumerable: true,
  get: function get() {
    return _LayerFactory.getLayer;
  }
});

var _layerCreatorMap = __webpack_require__(/*! ./layerCreatorMap */ 0);

Object.defineProperty(exports, 'registerCreator', {
  enumerable: true,
  get: function get() {
    return _layerCreatorMap.registerCreator;
  }
});

__webpack_require__(/*! ./lib/platformDetect */ 10);

__webpack_require__(/*! ./creator/arcgis */ 11);

/***/ }),
/* 7 */
/*!*****************************!*\
  !*** ./src/LayerFactory.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layerCreatorMap = __webpack_require__(/*! ./layerCreatorMap */ 0);

var _layerRepo = __webpack_require__(/*! ./layerRepo */ 2);

__webpack_require__(/*! ./repos */ 8);

var _env = __webpack_require__(/*! ./env */ 3);

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayerFactory = function () {
    function LayerFactory() {
        _classCallCheck(this, LayerFactory);
    }

    _createClass(LayerFactory, [{
        key: 'create',
        value: function create(options, callback) {
            var opts = options;
            if (_.isString(opts)) {
                opts = (0, _layerRepo.getLayerOption)(opts);
            }
            if (!opts.platform) {
                opts.platform = _env2.default.platform.type;
            }
            if (!opts.version) {
                opts.version = _env2.default.platform.version;
            }
            var creator = (0, _layerCreatorMap.matchCreator)(opts);
            if (creator) {
                creator.create(opts, callback);
            } else {
                throw new Error('无法匹配到对应的图层类型');
            }
        }
    }]);

    return LayerFactory;
}();

var layerFactory = new LayerFactory();
function getLayer(opts, callback) {
    layerFactory.create(opts, callback);
}

exports.getLayer = getLayer;

/***/ }),
/* 8 */
/*!****************************!*\
  !*** ./src/repos/index.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./tianditu */ 9);

/***/ }),
/* 9 */
/*!*******************************!*\
  !*** ./src/repos/tianditu.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _layerRepo = __webpack_require__(/*! ../layerRepo */ 2);

var tianditu4490Config = {
    fullExtent: {
        xmin: -180.0,
        ymin: -90.0,
        xmax: 180.0,
        ymax: 90.0,
        spatialReference: { wkid: 4490 }
    },
    spatialReference: { wkid: 4490 },
    tileInfo: {
        size: 256,
        dpi: 90.71428571428571,
        format: 'png32',
        origin: {
            x: -180,
            y: 90
        },
        spatialReference: { wkid: 4490 },
        lods: [{
            level: 1,
            resolution: 0.703125,
            scale: 295497593.05875003
        }, {
            level: 2,
            resolution: 0.3515625,
            scale: 147748796.52937502
        }, {
            level: 3,
            resolution: 0.17578125,
            scale: 73874398.264687508
        }, {
            level: 4,
            resolution: 0.087890625,
            scale: 36937199.132343754
        }, {
            level: 5,
            resolution: 0.0439453125,
            scale: 18468599.566171877
        }, {
            level: 6,
            resolution: 0.02197265625,
            scale: 9234299.7830859385
        }, {
            level: 7,
            resolution: 0.010986328125,
            scale: 4617149.8915429693
        }, {
            level: 8,
            resolution: 0.0054931640625,
            scale: 2308574.9457714846
        }, {
            level: 9,
            resolution: 0.00274658203125,
            scale: 1154287.4728857423
        }, {
            level: 10,
            resolution: 0.001373291015625,
            scale: 577143.73644287116
        }, {
            level: 11,
            resolution: 0.0006866455078125,
            scale: 288571.86822143558
        }, {
            level: 12,
            resolution: 0.00034332275390625,
            scale: 144285.93411071779
        }, {
            level: 13,
            resolution: 0.000171661376953125,
            scale: 72142.967055358895
        }, {
            level: 14,
            resolution: 8.58306884765625e-005,
            scale: 36071.483527679447
        }, {
            level: 15,
            resolution: 4.291534423828125e-005,
            scale: 18035.741763839724
        }, {
            level: 16,
            resolution: 2.1457672119140625e-005,
            scale: 9017.8708819198619
        }, {
            level: 17,
            resolution: 1.0728836059570313e-005,
            scale: 4508.9354409599309
        }, {
            level: 18,
            resolution: 5.3644180297851563e-006,
            scale: 2254.4677204799655
        }, {
            level: 19,
            resolution: 0.000002682209014892578,
            scale: 1127.2338602399827
        }, {
            level: 20,
            resolution: 0.000001341104507446289,
            scale: 563.6169301199914
        }]
    }
};
var tianditu4326Config = _.cloneDeep(tianditu4490Config);
tianditu4326Config.fullExtent.spatialReference.wkid = 4326;
tianditu4326Config.spatialReference.wkid = 4326;
tianditu4326Config.tileInfo.spatialReference.wkid = 4326;
var tianditu102100Config = {
    fullExtent: {
        xmin: -20037508.3427892,
        ymin: -20037508.3427892,
        xmax: 20037508.3427892,
        ymax: 20037508.3427892,
        spatialReference: { wkid: 102100 }
    },
    spatialReference: { wkid: 102100 },
    tileInfo: {
        size: 256,
        dpi: 90.71428571428571,
        format: 'png32',
        origin: {
            x: -20037508.3427892,
            y: 20037508.342787
        },
        spatialReference: { wkid: 102100 },
        lods: [{
            level: 1,
            resolution: 78271.51696402048,
            scale: 2.958293554545656E8
        }, {
            level: 2,
            resolution: 39135.75848201024,
            scale: 1.479146777272828E8
        }, {
            level: 3,
            resolution: 19567.87924100512,
            scale: 7.39573388636414E7
        }, {
            level: 4,
            resolution: 9783.93962050256,
            scale: 3.69786694318207E7
        }, {
            level: 5,
            resolution: 4891.96981025128,
            scale: 1.848933471591035E7
        }, {
            level: 6,
            resolution: 2445.98490512564,
            scale: 9244667.357955175
        }, {
            level: 7,
            resolution: 1222.99245256282,
            scale: 4622333.678977588
        }, {
            level: 8,
            resolution: 611.49622628141,
            scale: 2311166.839488794
        }, {
            level: 9,
            resolution: 305.748113140705,
            scale: 1155583.419744397
        }, {
            level: 10,
            resolution: 152.8740565703525,
            scale: 577791.7098721985
        }, {
            level: 11,
            resolution: 76.43702828517625,
            scale: 288895.85493609926
        }, {
            level: 12,
            resolution: 38.21851414258813,
            scale: 144447.92746804963
        }, {
            level: 13,
            resolution: 19.109257071294063,
            scale: 72223.96373402482
        }, {
            level: 14,
            resolution: 9.554628535647032,
            scale: 36111.98186701241
        }, {
            level: 15,
            resolution: 4.777314267823516,
            scale: 18055.990933506204
        }, {
            level: 16,
            resolution: 2.388657133911758,
            scale: 9027.995466753102
        }, {
            level: 17,
            resolution: 1.194328566955879,
            scale: 4513.997733376551
        }, {
            level: 18,
            resolution: 0.5971642834779395,
            scale: 2256.998866688275
        }, {
            level: 19,
            resolution: 0.298582738909933,
            scale: 1128.49943336487
        }, {
            level: 20,
            resolution: 0.1492913694549665,
            scale: 564.249716682435
        }]
    }
};
var repo = {
    'tianditu-dlg-4490': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/vec_c/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' + '&STYLE=default&LAYER=vec&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu4490Config),
    'tianditu-dlg-anno-4490': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cva_c/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' + '&STYLE=default&LAYER=cva&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu4490Config),
    'tianditu-drg-4490': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/img_c/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' + '&STYLE=default&LAYER=img&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu4490Config),
    'tianditu-dlg-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/vec_c/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' + '&STYLE=default&LAYER=vec&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu4326Config),
    'tianditu-dlg-anno-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cva_c/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' + '&STYLE=default&LAYER=cva&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu4326Config),
    'tianditu-drg-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/img_c/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' + '&STYLE=default&LAYER=img&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu4326Config),
    'tianditu-drg-anno-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cia_c/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' + '&STYLE=default&LAYER=cia&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu4326Config),
    'tianditu-dlg-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/vec_w/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' + '&STYLE=default&LAYER=vec&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu102100Config),
    'tianditu-dlg-anno-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cva_w/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' + '&STYLE=default&LAYER=cva&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu102100Config),
    'tianditu-drg-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/img_w/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' + '&STYLE=default&LAYER=img&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu102100Config),
    'tianditu-drg-anno-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cia_w/wmts' + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' + '&STYLE=default&LAYER=cia&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }, tianditu102100Config)
};

_.each(repo, function (opts, key) {
    (0, _layerRepo.registerLayer)(key, opts);
});

/***/ }),
/* 10 */
/*!***********************************!*\
  !*** ./src/lib/platformDetect.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _env = __webpack_require__(/*! ../env */ 3);

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (window.require) {
    window.require(['esri/kernel'], function (esriNS) {
        _env2.default.platform.type = 'arcgis';
        _env2.default.platform.version = esriNS.version;
    });
}

/***/ }),
/* 11 */
/*!*************************************!*\
  !*** ./src/creator/arcgis/index.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ArcgisWebTile4Creator = __webpack_require__(/*! ./webTile/ArcgisWebTile4Creator */ 12);

Object.defineProperty(exports, 'ArcgisWebTile4Creator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ArcgisWebTile4Creator).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/*!*************************************************************!*\
  !*** ./src/creator/arcgis/webTile/ArcgisWebTile4Creator.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layerCreatorMap = __webpack_require__(/*! ../../../layerCreatorMap */ 0);

var _LayerType = __webpack_require__(/*! ../../../LayerType */ 1);

var _LayerType2 = _interopRequireDefault(_LayerType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArcgisWebTile4Creator = function () {
    function ArcgisWebTile4Creator() {
        _classCallCheck(this, ArcgisWebTile4Creator);

        this.type = new _LayerType2.default({
            platform: 'arcgis',
            layerType: 'WebTile',
            version: '4'
        });
    }

    _createClass(ArcgisWebTile4Creator, [{
        key: 'create',
        value: function create(options, callback) {
            window.require(['esri/layers/WebTileLayer', 'esri/layers/support/TileInfo', 'esri/geometry/Extent', 'esri/layers/support/Lod', 'esri/geometry/SpatialReference'], function (WebTileLayer, TileInfo, Extent, Lod, SpatialReference) {
                var opts = _.cloneDeep(options);
                if (opts.tileInfo && !(opts.tileInfo instanceof TileInfo)) {
                    // if (opts.fullExtent) {
                    //     opts.fullExtent =
                    //         new Extent(opts.tileInfo.fullExtent)
                    // }
                    if (opts.spatialReference) {
                        opts.spatialReference = new SpatialReference(opts.spatialReference);
                    }
                    if (_.isArray(opts.tileInfo.lods)) {
                        opts.tileInfo.lods = _.map(opts.tileInfo.lods, function (l) {
                            return new Lod(l);
                        });
                    }
                }
                callback(null, new WebTileLayer(options));
            });
        }
    }, {
        key: 'match',
        value: function match(type) {
            return type.platform === this.type.platform && type.layerType === this.type.layerType && type.version[0] && type.version[0] === this.type.version;
        }
    }]);

    return ArcgisWebTile4Creator;
}();

(0, _layerCreatorMap.registerCreator)(new ArcgisWebTile4Creator());
exports.default = ArcgisWebTile4Creator;

/***/ })
/******/ ]);
//# sourceMappingURL=fantasy-layers.js.map