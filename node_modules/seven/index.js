
/* @Name Seven
*  @Version 0.0.2
*  @author Cobaimelan
*/

// required packages..
var request = require('request');
var fs = require('fs');
var Regex = require('yi-regex');
var strip=require('./lib/strip');
var pattern=require('./lib/pattern');
var tagfinder=require('tagfinder');
var htmlparser=require('htmlparser');
var debug = require('debug')('Seven')

/**
 * Create new seven
 * @param {Object} headers
 */
function seven(headers) {
	if(headers){ // check arguments
	this.headers=headers; // If there is assigned
	}else{
	this.headers={ "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3", "accept-language" : "en-US,en;q=0.8",  "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",  "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"}	
	}// default headers assigned
	this.pattern =pattern; // regex pattern assigned
	return  this;
}

/**
 * Seven http request
 * @param {String} url
 * @param {Function} fn
 * @return {Error} err
 * @return {String} data
 * @return {Object} res
 */
seven.prototype.play = function(url,fn) {
	if(typeof url === 'string' && typeof fn === 'function'){ //Check arguments
		options = { url: url,  headers: this.headers }; // default http options assigned
		request(options, function callback(error, response, body) {// http request send
			debug('Request was sent to url'); // Debug message
		    if (error) {
		    	debug('Request some errors'); // Debug message
		    	fn(error,null);
		    }else{
		    	var resp ={headers:response.headers,
		    				status:response.statusCode}
		    	debug('Request complete return data'); // Debug message
		    	fn(null,body.replace(/[\n\t\r]/g,""),resp);
		    }
		});

	}else{
		console.error(new Error('Check arguments! [url][callback]'));
	}
	
};

/**
 * Seven match
 * @param {String} data
 * @param {String} start
 * @param {String} end
 * @return {Array} | {Null} 
 */
seven.prototype.matchall=function(data,start,end){
	if(typeof data === 'string' && typeof start === 'string' && typeof end === 'string'){ //Check arguments
	  try {
	   debug('Start and end tags matching..');
	   return data.match(new RegExp(start+"(.*?)"+end,"g")); // matching tags return arrays..
	  } catch (e) {
	  	debug('Catching some error');	// matching some eror return null
	   return null;
	  }
	}else{
		console.error(new Error('Check arguments! [data][start][end]'));
	}
}

/**
 * Seven out print
 * @param {Object} obj
 */
seven.prototype.out=function(obj){
	if(typeof obj =="object"){ // check arguments
			if(obj.clear){  // check clear object
				fs.writeFile(obj.dir, obj.chunk, function(err) {
				   if(obj.chunk){
				    	if(err) {
				    		debug('Catching some error');
					       console.error(err);
					    } else {
					    	debug('File saved');
					       console.log("The file was saved!");
					    }
				    }
				}); 

			}else{
				fs.writeFile(obj.dir, obj.chunk, function(err) {
				    if(obj.chunk){
				    	if(err) {
				    		debug('Catching some error');
					       console.error(err);
					    } else {
					    	debug('File saved');
					        console.log("The file was saved!");
					    }
				    }
				}); 
			}
	}
}

/**
 * Seven attr pattern api
 * @param {Object} x
 */
seven.prototype.attrkey=function(x){
	if(typeof x =="object"){ // check arguments
		debug('Attr pattern key added');
 		 var b =Object.keys(x);
		  var y ={};
		      y[b]=x[b];
		  this.pattern.push(y); // attr pattern added
		  
		  return this;
 	}else{
 		console.error(new Error('Check arguments! [object]'));
 	}
}

/**
 * Seven attr matching
 * @param {String} data
 * @param {String} attr
 * @return {Array} result
 */
seven.prototype.attr=function(data,attr){
	if(typeof data =="string" && typeof attr =="string" ){ // check arguments
		var result;
		debug('Matching attr key'); 
	    for (var i = this.pattern.length - 1; i >= 0; i--) {
   		 var b =Object.keys(this.pattern[i]);
	    if(b == attr){
	      result = Regex.matchAll(this.pattern[i][b], data); // matching key return result assigned  
	      break;
	    }else{
	    	result=null; // No matches return result assigned  
	    }
  	}
  	return result;
	}else{
	  console.error(new Error('Check arguments! [data][attr]'));
	}
}

/**
 * Seven tagfinder 
 * @param {String} data
 * @return {Array}
 */
seven.prototype.tags = function(data) {
	if(typeof data =="string"){ // check arguments
		debug('Searching tags'); 
		return tagfinder.decomposeHtml(data).tags;
	}else{
	  console.error(new Error('Check arguments! [data]'));
	}
};

/**
 * Seven Dom 
 * @param {String} data
 * @return {Object}
 */
seven.prototype.dom = function(data) {
	if(typeof data =="string"){ // check arguments
		debug('Dom tags'); 
		var handler = new htmlparser.DefaultHandler();
		var parser = new htmlparser.Parser(handler);
		parser.parseComplete(data);
		return JSON.stringify(handler.dom, null, 2);
	}else{
		 console.error(new Error('Check arguments! [data]'));
	}
};


/**
 * Seven clear tags 
 * @param {String} this
 * @param {String} allowed ['a|b|div']
 * @return {String} this
 */
String.prototype.clear=function(allowed){
	debug('Tags cleaneds.. '); 
	if(allowed){
		if(typeof allowed =="string"){ // check arguments
	 	 return strip(this,allowed);
	 	}else{
	    console.error(new Error('Check arguments! [tags]'));
	 	}
	}else{
	  return strip(this);
	}

};

/**
 * Seven created 
 * @param {Object} headers
 * @return {Object} this
 */

module.exports =function(headers){
	debug('Created seven.. '); 
	if(headers){
		if(typeof allowed =="object"){ // check arguments
	 	return new seven(headers);
	 	}else{
	 	 console.error(new Error('Check arguments! [headers]'));
	 	}
	}else{
		return new seven();
	}
	 

};