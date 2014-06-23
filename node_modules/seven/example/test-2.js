var seven = require('../index.js');
var log =console.log;
var Yougo = seven();
Yougo.play('http://www.youtube.com/watch?v=wFrth4NFogc',function(err,data){
		var videos = Yougo.matchall(data,'<li class="video-list-item related-list-item">','</li>');
		Yougo.attrkey({"ycover":/data-thumb=["'](.*?)["']/g});

		videos.splice(0, 1);
		var posts = videos.map(function (post) {			
	      return {
	        title: Yougo.attr(post,'title')[2],
	        url: 'http://www.youtube.com/' + Yougo.attr(post,'href'),
	        cover: 'http:' + Yougo.attr(post,'ycover')
	      };
	    });

		Yougo.out({dir:"videos.json",chunk:JSON.stringify(posts) });
});