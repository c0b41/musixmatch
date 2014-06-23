var seven = require('../index.js');
var expect = require('expect.js');



describe('Crop oluşturulur', function () {  
	  var go = seven();
	  it('İstek gönderilir..', function () {
		  go.play('https://news.ycombinator.com/',function(err,data,res){
			expect(err).to.not.exist;
			expect(data).to.be.an('string');		
			var post = go.matchall(data,'<td class="title">','</td>');
			expect(post).to.be.an('array');
			expect(post.length).to.equal(1);
				it('Çıktı alınır', function () {
				go.out("data.txt",data,function(err,succes){
				expect(err).to.not.exist;
					expect(succes).to.be('The file was saved!');
					done();
				});
				});
			
		});
	});

});


