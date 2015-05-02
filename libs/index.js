/* @Name musixmatch
*  @Version 0.1.0
*  @author Ayhan Kuru
*/

// required packages..
var got = require('got-promise');
var qp = require('query-parse');
var extend =require('extend');
var methods = require('./methods.js');


/**
 * new musixmatch
 * @param {obj} object
 */
function musixmatch(obj){
	if (!(this instanceof musixmatch)) return new musixmatch(obj);
	var obj =obj ? obj : {};
	this._datas={};
  	this._datas.usertoken =obj.usertoken ? obj.usertoken :"17ba9885eca2ba89bc743c4d80c08de76dc2ab78a98ac80a";
  	this._datas.app_id = obj.app_id ? obj.app_id : "community-app-v1.0";
  	this._datas.format = obj.format ? obj.format : "json"; 
  	this.uri="https://www.musixmatch.com/ws/1.1/";

}


methods.forEach(function(entry) {
    musixmatch.prototype[entry.method] = function query(params){
		var params = extend(this._datas,params);
		var uri = this.uri+entry.name+'?'+qp.toString(params);
		var that = this;		
		return got("https://musixmatch-proxy-cobaimelan-1.c9.io/json?url="+encodeURIComponent(uri)).then(function (res) {
		     if(that._datas.format == "json") return JSON.parse(res.body);
		     else return res.body;
		});
	}
});


module.exports=exports=musixmatch;
