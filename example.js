var music = require('./dist/index.js')({apikey:'e7a3543c609d7dc2b4499437567b4d33'});
 
music.chartArtists({country:"TR",page:1, page_size:10}).then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err.stack);
});