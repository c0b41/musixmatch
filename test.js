var musixmatch =require('./libs/index.js')({usertoken:"1385437af7222f2b5ec105bf0b456fed7bdf84066ad62b25",app_id:"community-app-v1.0",method:"json"});
var expect = require('expect.js');

	describe('artist search Test!!!...', function(){

		it('Test :1 ', function(done){

			musixmatch.artist({q:"user",c:10,p:0,min:1,max:48}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.searchresults.icons).to.have.length(10);
				expect(data.searchresults.searchTerms).to.eql('user');	
				expect(data.searchresults.icons[0].id).to.eql(172625);	
				expect(data.searchresults.icons[0].image).to.eql('https://cdn2.musixmatch.com/data/icons/ios-7-icons/50/user_male-48.png');
				expect(data.searchresults.icons[0].tags).to.be.an('object');
				done();
			});

		});


		it('Test :2 ', function(done){

			musixmatch.track({q:"home",c:20,p:0,min:1,max:48}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.searchresults.icons).to.have.length(20);
				expect(data.searchresults.searchTerms).to.eql('home');	
				expect(data.searchresults.icons[0].id).to.eql(126572);	
				expect(data.searchresults.icons[0].image).to.eql('https://cdn4.musixmatch.com/data/icons/pictype-free-vector-icons/16/home-48.png');
				expect(data.searchresults.icons[0].tags).to.be.an('object');
				done();
			});

		});

		it('Test :3 ', function(done){

			musixmatch.search({q:"play",c:5,p:0}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.searchresults.icons).to.have.length(5);
				expect(data.searchresults.searchTerms).to.eql('play');	
				expect(data.searchresults.icons[1].id).to.eql(199499);	
				expect(data.searchresults.icons[1].image).to.eql('https://cdn3.musixmatch.com/data/icons/social-circle/512/social_4-512.png');
				expect(data.searchresults.icons[1].tags).to.be.an('object');
				done();
			});

		});

		it('Test :4 ', function(done){

			musixmatch.search({q:"trash"}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.searchresults.icons).to.have.length(16);
				expect(data.searchresults.searchTerms).to.eql('trash');	
				expect(data.searchresults.icons[15].id).to.eql(171207);	
				expect(data.searchresults.icons[15].image).to.eql('https://cdn2.musixmatch.com/data/icons/large-svg-icons-part-3/512/recycling_recycle_recyclin-512.png');
				expect(data.searchresults.icons[15].tags).to.be.an('object');
				done();
			});

		});

	});

	describe('İnfo Test!!!...', function(){
		it('Test :1 ', function(done){
			musixmatch.info({id:172625}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.icon.author).to.eql('Visual Pharm');
				expect(data.icon.iconset).to.eql('iOS 7 icons');
				expect(data.icon.authorwebsite).to.eql('http://icons8.com/');
				done();
			});

		});

		it('Test :2 ', function(done){
			musixmatch.info({id:126572}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.icon.author).to.eql('Timothy Miller');
				expect(data.icon.iconset).to.eql('Pictype Free Vector Icons');
				expect(data.icon.authorwebsite).to.eql(null);
				done();
			});

		});

		it('Test :3 ', function(done){
			musixmatch.info({id:199499}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.icon.author).to.eql('Vectorgraphit .');
				expect(data.icon.iconset).to.eql('Social circle');
				expect(data.icon.authorwebsite).to.eql(null);
				done();
			});

		});

		it('Test :4 ', function(done){
			musixmatch.info({id:171207}).exec(function(err,data){
				expect(err).to.exist;
				expect(data).to.be.an('object');
				expect(data.icon.author).to.eql('Victor Ivlichev');
				expect(data.icon.iconset).to.eql('Large SVG Icons Part 3');
				expect(data.icon.authorwebsite).to.eql(null);
				done();
			});

		});

	});


