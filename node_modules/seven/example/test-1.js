var seven = require('../index.js');
var log =console.log;
var test = seven();
test.play('https://news.ycombinator.com/',function(err,data){
		var post = test.matchall(data,'<td class="title">','</td>');
		var title =post[0].clear();
		var url =test.attr(post[0],'href');
		var clas =test.attr(post[0],'class');
		var tags =test.tags(post[0]);
		log(title +"  -  "+url);
		log();
		log(clas)
		log(tags)		test.out({dir:"body.txt",chunk:data,clear:true});
		test.out({dir:"post.txt",chunk:post});

		
});