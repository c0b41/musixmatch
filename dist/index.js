'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _queryParse = require('query-parse');

var _queryParse2 = _interopRequireDefault(_queryParse);

var _methods = require('./methods.js');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* @Name musixmatch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           *  @Version 0.3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           *  @author c0b41
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */

/**
 * new musixmatch
 * @param {obj} object
 */
function musixmatch(obj) {
	if (!(this instanceof musixmatch)) return new musixmatch(obj);
	var obj = obj ? obj : {};
	this._datas = {};
	this._datas.apikey = obj.apikey ? obj.apikey : "";
	this._datas.format = obj.format ? obj.format : "json";
	this.uri = "http://api.musixmatch.com/ws/1.1/";
}

_methods2.default.forEach(function (entry) {
	musixmatch.prototype[entry.method] = (() => {
		var _ref = _asyncToGenerator(function* (params) {
			const xparams = Object.assign({}, this._datas, params);
			const uri = `${this.uri}${entry.name}?${_queryParse2.default.toString(xparams)}`;
			const response = yield (0, _got2.default)(uri);
			if (this._datas.format == "json") {
				return JSON.parse(response.body);
			} else {
				return response.body;
			}
		});

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	})();
});

exports.default = musixmatch;
module.exports = exports['default'];