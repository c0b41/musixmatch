var seven = require('../index.js');

var go = seven();

go.play('https://news.ycombinator.com/',function(err,data,res){
	console.log(go.attr(data,'all'));
})