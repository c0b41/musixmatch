/* @Name musixmatch
*  @Version 0.2.4
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
  	this._datas.guid =obj.guid ? obj.guid :"728cbca6-600f-4b40-970d-064763544f28";
  	this._datas.app_id = obj.app_id ? obj.app_id : "community-app-v1.0";
  	this._datas.format = obj.format ? obj.format : "json"; 
  	this.uri="https://www.musixmatch.com/ws/1.1/";

}


methods.forEach(function(entry) {
    musixmatch.prototype[entry.method] = function query(params){
		var params = extend(this._datas,params);
		var uri = this.uri+entry.name+'?'+qp.toString(params);
		var that = this;	
		return got(uri).then(function (res) {
		    if(that._datas.format == "json") return JSON.parse(res.body);
		     else return res.body;
		});
	}
});


module.exports=exports=musixmatch;
