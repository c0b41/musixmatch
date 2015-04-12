var music =require('./libs/index.js')();
 
music.chartTracks({page:1,page_size:3,country:"tr",f_has_lyrics:1}).then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})