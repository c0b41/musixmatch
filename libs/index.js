/* @Name musixmatch
*  @Version 0.0.0
*  @author Cobaimelan
*/

// required packages..
var seven =require('seven')();
var qp = require('query-parse');

/**
 * new musixmatch
 * @param {str} object
 */
function musixmatch(obj){
	if (!(this instanceof musixmatch)) return new musixmatch(obj);
  	this.usertoken = obj.usertoken || '1385437af7222f2b5ec105bf0b456fed7bdf84066ad62b25';
  	this.app_id =obj.app_id || 'community-app-v1.0';
  	this.method = obj.method || 'json'; 
}

/**
 * search artist
 * @param {str} object
 */
musixmatch.prototype.artist = function(str){
	if( typeof str =="object" ){
		this.url ="https://community.musixmatch.com/ws/1.1/artist.search?app_id="+this.app_id+"&usertoken="+this.usertoken+"&format="+this.method+"&"+qp.toString(str);
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
		this.url ="https://community.musixmatch.com/ws/1.1/track.search?app_id="+this.app_id+"&usertoken="+this.usertoken+"&format="+this.method+"&"+qp.toString(str);
	}else{
		this.url=null;
	}
	return this;
	
}

/**
 *  exec request
 * @param {fn}  function
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