/* @Name musixmatch
*  @Version 0.0.0
*  @author Cobaimelan
*/

// required packages..
var seven =require('seven')();
var qp = require('query-parse');

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
 * @param {str} object
 */
musixmatch.prototype.artist = function(str){
	if( typeof str =="object" ){
		this.url ="https://community.musixmatch.com/ws/1.1/artist.search?app_id="+this.app_id+"&usertoken="+this.usertoken+"&format="+this.method+"&part=artist_image&s_artist_ranking=desc&didyoumean=1&"+qp.toString(str);
	}else{
		this.url=null;
	}
	return this;
	
}

/**
 *  track info
 * @param {str}  object
 */

musixmatch.prototype.track = function(str){
	if( typeof str =="object" ){
		this.url ="https://community.musixmatch.com/ws/1.1/track.search?app_id="+this.app_id+"&f_stop_words=1&s_track_rating=desc&g_common_track=1&usertoken="+this.usertoken+"&format="+this.method+"&"+qp.toString(str);
	}else{
		this.url=null;
	}
	return this;
	
}

/**
 *  exec request
 * @param {next}  function
 */
musixmatch.prototype.exec = function(next){

	if(this.url !== null){
		seven.play(this.url,function(err,data){
		if(err){
			next(err,null);
		}else{
			next(null,data);
		}

	});

	}else{
		console.error('function params error!');
	}
}



module.exports=exports=musixmatch;

