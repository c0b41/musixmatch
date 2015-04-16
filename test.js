var music =require('./libs/index.js')();
var expect = require('expect.js');

describe('Musixmatch Test!!!...', function(){

		it('Artist search ', function(){

		return music.trackSearch({q:"Tove lo",page:1,page_size:10}).then(function(data){
				expect(data).to.be.an('object'); 
				expect(data.message.body.artist_list[0].artist.artist_id).to.eql(24612190);	
				expect(data.message.body.artist_list[0].artist.artist_name).to.eql('Tove Lo'); 
				expect(data.message.body.artist_list[0].artist.artist_country).to.eql('SE'); 
				expect(data.message.body.artist_list[0].artist.artist_vanity_id).to.eql('Tove-Lo'); 
				expect(data.message.body.artist_list[0].artist.updated_time).to.eql('2014-03-28T19:32:22Z');
				
			});

		});

		it('Track search ', function(){

			return music.track({q_track_artist:"Habits",page:1,page_size:30}).then(function(data){
				
				expect(data).to.be.an('object'); 
				expect(data.message.body.track_list[0].track.track_id).to.eql(34024679);	
				expect(data.message.body.track_list[0].track.track_name).to.eql('Habits (Stay High)'); 
				
			});

		});


		
});


