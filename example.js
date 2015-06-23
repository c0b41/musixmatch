var music =require('./libs/index.js')();
 
music.trackSearch({q:"Tove lo",page:1,page_size:10}).then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err.stack);
});