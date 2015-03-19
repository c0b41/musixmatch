/* @Name musixmatch
*  @Version 0.1.0
*  @author Ayhan Kuru
*/

// required packages..
var Promise = require("bluebird");
var  rp = require('request-promise');
var qp = require('query-parse');
var url ="https://www.musixmatch.com";

/**
 * new musixmatch
 * @param {obj} object
 */
function musixmatch(obj){
	if (!(this instanceof musixmatch)) return new musixmatch(obj);
	var obj =obj ? obj : {};
  	this.usertoken =obj.usertoken ? obj.usertoken :"1385437af7222f2b5ec105bf0b456fed7bdf84066ad62b25";
  	this.app_id = obj.app_id ? obj.app_id : "community-app-v1.0";
  	this.method = obj.method ? obj.method : "json"; 

  	return this;
}

/**
 * search artist
 * @param {params} object
 */
musixmatch.prototype.artist = function(params){
	var uri =url+"/ws/1.1/artist.search?app_id="+this.app_id+"&usertoken="+this.usertoken+"&format="+this.method+"&part=artist_image&s_artist_ranking=desc&didyoumean=1&"+qp.toString(params);
	var _self =this;
	return new Promise(function (resolve, reject) {
		
		rp(uri).then(function(data){
			
			if(_self.method=="json") resolve(JSON.parse(data));
			else resolve(data);

		}).catch(function(err){
			reject(err);
		});

	});
}


/**
 *  track info
 * @param {params}  object
 */

musixmatch.prototype.track = function(params){
	var uri =url+"/ws/1.1/track.search?app_id="+this.app_id+"&f_stop_words=1&s_track_rating=desc&g_common_track=1&usertoken="+this.usertoken+"&format="+this.method+"&"+qp.toString(params);
	var _self =this;
	return new Promise(function (resolve, reject) {
		
		rp(uri).then(function(data){
			
			if(_self.method=="json") resolve(JSON.parse(data));
			else resolve(data);

		}).catch(function(err){
			reject(err);
		});

	});
}

/**
 *  track get
 * @param {params}  object
 */

musixmatch.prototype.lyrics = function(params){
	var uri =url+"/ws/1.1/track.lyrics.get?app_id=community-app-v1.0&usertoken="+this.usertoken+"&format="+this.method+"&"+qp.toString(params);
	var _self =this;
	return new Promise(function (resolve, reject) {
		
		rp(uri).then(function(data){
			
			if(_self.method=="json") resolve(JSON.parse(data));
			else resolve(data);

		}).catch(function(err){
			reject(err);
		});

	});
	
}

module.exports=exports=musixmatch;
