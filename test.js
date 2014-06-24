var music =require('./libs/index.js')();
var expect = require('expect.js');

	describe('Musixmatch Test!!!...', function(){

		it('track search ', function(done){

			music.track({q:"Tove lo",page:1,page_size:10}).exec(function(err, data){
				expect(err).to.exist;
				expect(data).to.be.an('object'); 
				expect(data.message.body.track_list[0].track.track_isrc).to.eql('SE3NM1300101');	
				expect(data.message.body.track_list[0].track.album_name).to.eql('Habits (Stay High)');
				expect(data.message.body.track_list[0].track.artist_mbid).to.eql('56756959-1e78-429c-b897-e1d056cb0225');
				expect(data.message.body.track_list[0].track.album_coverart_100x100).to.eql('http://static.musixmatch.com/images/albums/1/8/4/5/3/7/26735481.jpg');
				done();
			});

		});

		it('artist search ', function(done){

			music.artist({q:"Tove lo",page:1,page_size:10}).exec(function(err, data){
				expect(err).to.exist;
				expect(data).to.be.an('object'); 
				expect(data.message.body.artist_list[0].artist.artist_id).to.eql(24612190);	
				expect(data.message.body.artist_list[0].artist.artist_name).to.eql('Tove Lo');
				expect(data.message.body.artist_list[0].artist.artist_edit_url).to.eql('https://community.musixmatch.com/artist/Tove-Lo?utm_source=application&utm_campaign=api&utm_medium=musixmatch-community');
				expect(data.message.body.artist_list[0].artist.updated_time).to.eql('2014-03-28T19:32:22Z');
				done();
			});

		});

		
	});


