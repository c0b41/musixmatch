var music =require('./libs/index.js')();
var expect = require('expect.js');

	describe('Musixmatch Test!!!...', function(){

		it('Artist search ', function(done){

			music.artist({q:"Tove lo",page:1,page_size:10}).exec(function(err, data){
				expect(err).to.exist;
				expect(data).to.be.an('object'); 
				expect(data.message.body.artist_list[0].artist.artist_id).to.eql(24612190);	
				expect(data.message.body.artist_list[0].artist.artist_name).to.eql('Tove Lo'); 
				expect(data.message.body.artist_list[0].artist.artist_country).to.eql('SE'); 
				expect(data.message.body.artist_list[0].artist.artist_vanity_id).to.eql('Tove-Lo'); 
				expect(data.message.body.artist_list[0].artist.updated_time).to.eql('2014-03-28T19:32:22Z');
				done();
			});

		});

		it('Track search ', function(done){

			music.track({q_track_artist:"Habits",page:1,page_size:30}).exec(function(err, data){
				expect(err).to.exist;
				expect(data).to.be.an('object'); 
				expect(data.message.body.track_list[0].track.track_id).to.eql(34024679);	
				expect(data.message.body.track_list[0].track.track_name).to.eql('Habits (Stay High)'); 
				done();
			});

		});

		it('Get lyrics ', function(done){

			music.lyrics({commontrack_vanity_id:"Tove-Lo/Habits",page:1,page_size:30}).exec(function(err, data){
				expect(err).to.exist;
				expect(data).to.be.an('object'); 
				expect(data.message.body.lyrics.lyrics_id).to.eql(9479786);	
				expect(data.message.body.lyrics.lyrics_language).to.eql('en');
				expect(data.message.body.lyrics.writer_list[0].writer.writer_id).to.eql(41291);
				done();
			});

		});

		
	});


