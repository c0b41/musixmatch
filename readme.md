[![Travis Build Status](http://img.shields.io/travis/ayhankuru/musixmatch.svg?style=flat-square)](https://travis-ci.org/ayhankuru/musixmatch) [![Circle Build Status](https://img.shields.io/circleci/project/ayhankuru/musixmatch.svg?style=flat-square)](https://circleci.com/gh/ayhankuru/musixmatch) [![Appveyor Build Status](https://img.shields.io/appveyor/ci/ayhankuru/musixmatch.svg?style=flat-square)](https://ci.appveyor.com/project/ayhankuru/musixmatch) [![Build Status](https://img.shields.io/david/ayhankuru/musixmatch.svg?style=flat-square)](https://david-dm.org/ayhankuru/musixmatch) [![io.js supported](https://img.shields.io/badge/io.js-supported-green.svg?style=flat-square)](https://iojs.org)


 
NodeJS musixmatch community api

### Install

```bash
$ npm install musicmatch
```


#### Usage

```js

music = require('musicmatch')({usertoken:"",format:"",appid:""});

// or

music =  require('musicmatch')();

```


#### Methods
| Name  | Method  |
|---|---|
|chart.artists.get| **[chartArtists](#chartartists)**|
|chart.tracks.get| **[chartTracks](#charttracks)**|
|track.search| **[trackSearch](#tracksearch)**|
|track.get| **[track](#track)**|
|track.subtitle.get| **[trackSubtitle](#tracksubtitle)**|
|track.lyrics.get| **[trackLyrics](#tracklyrics)**|
|track.snippet.get| **[trackSnippet](#tracksnippet)**|
|track.lyrics.post| **[trackLyricsAdd](#trackLyricsAdd)**|
|track.lyrics.feedback.post| **[trackLyricsFeedback](#tracklyricsfeedback)**|
|matcher.lyrics.get| **[matcherLyrics](#matcherlyrics)**|
|matcher.track.get| **[matcherTrack](#matchertrack)**|
|matcher.subtitle.get| **[matcherSubtitle](#matchersubtitle)**|
|artist.get| **[artist](#artist)**|
|artist.search.get| **[artistSearch](#artistsearch)**|
|artist.albums.get| **[artistAlbums](#artistalbums)**|
|artist.related.get| **[artistRelated](#artistrelated)**|
|album.get| **[album](#album)**|
|album.tracks.get| **[albumTracks](#albumtracks)**|


### chartArtists
| Params  | Desc  |
|---|---|
| country  |  A valid country code (default US) |
| page | Define the page number for paginated results |
| page_size | Define the page size for paginated results. Range is 1 to 100. |

**Example**

```js

music.chartArtists({page:1,page_size:3,country:"tr"})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### chartTracks
| Params  | Desc  |
|---|---|
| country  |  A valid country code (default US) |
| page | Define the page number for paginated results |
| page_size | Define the page size for paginated results. Range is 1 to 100. |
| f_has_lyrics | When set, filter only contents with lyrics |

**Example**

```js

music.chartTracks({page:1,page_size:3,country:"tr",f_has_lyrics:1})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```


### trackSearch
| Params  | Desc  |
|---|---|
| q  |  Search within track titles,artists,lyrics |
| q_lyrics |Any word in the lyrics |
| page | Define the page number for paginated results |
| page_size | Define the page size for paginated results. Range is 1 to 100. |
| f_has_lyrics | When set, filter only contents with lyrics |
| f_artist_id | When set, filter by this artist id | 
| f_music_genre_id | When set, filter by this music category id |
| f_artist_mbid | When set, filter by this artist musicbrainz id |
| f_lyrics_language | Filter by the lyrics language (en,it,..) | 
| s_track_rating | Sort by our popularity index for tracks (asc-desc)  | 
| s_artist_rating | Sort by our popularity index for artists (asc-desc)  |  
| quorum_factor  |  Search only a part of the given query string.Allowed range is (0.1 – 0.9), default is 1 (100%) |

**Example**

```js

music.trackSearch({q:"Chet Faker - Gold "page:1,page_size:3})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### track

| Params  | Desc  |
|---|---|
| track_id  |  The musiXmatch track id |
| track_mbid |The musicbrainz recording id |


**Example**

```js

music.track({track_id:15445219})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```


### trackSubtitle

| Params  | Desc  |
|---|---|
| track_id  |  The musiXmatch track id |
| track_mbid |The musicbrainz recording id |
|subtitle_format |	The format of the subtitle (lrc,dfxp,stledu). Default to lrc |
|f_subtitle_length |	The desired length of the subtitle (seconds) | 
|f_subtitle_length_max_deviation|	The maximum deviation allowed from the f_subtitle_length (seconds) |

**Example**

```js

music.trackSubtitle({track_id:15445219})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```



### trackLyrics

| Params  | Desc  |
|---|---|
| track_id  |  The musiXmatch track id |
| track_mbid |The musicbrainz recording id |

**Example**

```js

music.trackLyrics({track_id:15445219})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### trackSnippet

| Params  | Desc  |
|---|---|
| track_id  |  The musiXmatch track id |

**Example**

```js

music.trackSnippet({track_id:15445219})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### trackLyricsAdd

| Params  | Desc  |
|---|---|
| track_id  |  The musiXmatch track id |
| lyrics_body |	The lyrics
**Example**

```js

music.trackLyricsAdd({track_id:15445219,lyrics_body:"example lyrics"})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```


### trackLyricsFeedback

| Params  | Desc  |
|---|---|
|lyrics_id |	The musiXmatch lyrics id |
|track_id |	The musiXmatch track id |
|feedback |	The feedback to be reported, possible values are: wrong_lyrics, wrong_attribution, bad_characters, lines_too_long, wrong_verses, wrong_formatting |
**Example**

```js

music.trackLyricsFeedback({track_id:15445219,lyrics_id:4193713,feedback:"wrong_verses"})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### matcherLyrics

| Params  | Desc  |
|---|---|
| q_track |	The song title |
| q_artist | The song artist |
**Example**

```js

music.matcherLyrics({q_track:"sexy and i know it",q_artist:"lmfao"})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### matcherTrack

| Params  | Desc  |
|---|---|
| q_track | The song title |
| q_artist |	The song artist |
| q_album |	The song album |
| f_has_lyrics |	When set, filter only contents with lyrics |
| f_has_subtitle | |

**Example**

```js

music.matcherTrack({q_artist:"eminem"q_track:"lose yourself"})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### matcherSubtitle

| Params  | Desc  |
|---|---|
| q_track | The song title |
| q_artist | The song artist |
| f_subtitle_length	| Filter by subtitle length in seconds |
| f_subtitle_length_max_deviation |	Max deviation for a subtitle length in seconds |

**Example**

```js

music.matcherSubtitle({q_track:"sexy and i know it",q_artist:"lmfao",f_subtitle_length:200})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### artist

| Params  | Desc  |
|---|---|
| artist_id | The musiXmatch artist id |
| artist_mbid |	The musicbrainz artist id |

**Example**

```js

music.artist({artist_id:118})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```


### artistSearch

| Params  | Desc  |
|---|---|
| q_artist |	The song artist |
| f_artist_id |	When set, filter by this artist id |
| f_artist_mbid |	When set, filter by this artist musicbrainz id |
| page |	Define the page number for paginated results |
| page_size |	Define the page size for paginated results. Range is 1 to 100. |

**Example**

```js

music.artistSearch({q_artist:"prodigy",page_size:5})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```



### artistAlbums

| Params  | Desc  |
|---|---|
| artist_id	 | The musiXmatch artist id |
| artist_mbid |	The musicbrainz artist id |
| g_album_name |	Group by Album Name |
| s_release_date |	Sort by release date (asc-desc) |
| page |	Define the page number for paginated results |
| page_size |	Define the page size for paginated results. Range is 1 to 100. |

**Example**

```js

music.artistAlbums({artist_id:1039,s_release_date:"desc",g_album_name:1})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### artistRelated

| Params  | Desc  |
|---|---|
| artist_id	| The musiXmatch artist id |
| artist_mbid |	The musicbrainz artist id |
| page |	Define the page number for paginated results |
| page_size |	Define the page size for paginated results. Range is 1 to 100. |

**Example**

```js

music.artistRelated({artist_id:56,page_size:2,page:1})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### album

| Params  | Desc  |
|---|---|
| album_id |	The musiXmatch album id |

**Example**

```js

music.album({album_id:14250417})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```

### albumTracks

| Params  | Desc  |
|---|---|
| album_id | The musiXmatch album id |
| album_mbid | The musicbrainz album id |
| format | 	Decide the output type (json or xml) |
| f_has_lyrics |	When set, filter only contents with lyrics |
| page |	Define the page number for paginated results |
| page_size |	Define the page size for paginated results. Range is 1 to 100. |

**Example**

```js

music.albumTracks({album_id:13750844,page:1,page_size:2})
.then(function(data){
		console.log(data);
}).catch(function(err){
		console.log(err);
})

```



