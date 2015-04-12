[![Travis Build Status](http://img.shields.io/travis/ayhankuru/musixmatch.svg?style=flat-square)](https://travis-ci.org/ayhankuru/musixmatch) [![Circle Build Status](https://img.shields.io/circleci/project/ayhankuru/musixmatch.svg?style=flat-square)](https://circleci.com/gh/ayhankuru/musixmatch) [![Appveyor Build Status](https://img.shields.io/appveyor/ci/ayhankuru/musixmatch.svg?style=flat-square)](https://ci.appveyor.com/project/ayhankuru/musixmatch) [![Build Status](https://img.shields.io/david/ayhankuru/musixmatch.svg?style=flat-square)](https://david-dm.org/ayhankuru/musixmatch) [![io.js supported](https://img.shields.io/badge/io.js-supported-green.svg?style=flat-square)](https://iojs.org)

## todo test
 
NodeJS musixmatch community api

### Install

```bash
$ npm install musicmatch
```


#### Usage

```js

music = require('musicmatch')({usertoken:"",method:"",appid:""});

// or

music =  require('musicmatch')();

```


#### Methods
| Name  | Method  |
|---|---|
|chart.artists.get| **[chartArtists](#chartartists)**|
|chart.tracks.get| **[chartTracks](#charttracks)**|
|track.search| **[trackSearch](#tracksearch)**|
|track.get| **track**|
|track.subtitle.get| **trackSubtitle**|
|track.lyrics.get| **trackLyrics**|
|track.snippet.get| **trackSnippet**|
|track.lyrics.post| **trackLyricsAdd**|
|track.lyrics.feedback.post| **trackLyricsFeedback**|
|matcher.lyrics.get| **matcherLyrics**|
|matcher.track.get| **matcherTrack**|
|matcher.subtitle.get| **matcherSubtitle**|
|artist.get| **artist**|
|artist.search.get| **artistSearch**|
|artist.albums.get| **artistAlbums**|
|artist.related.get| **artistRelated**|
|album.get| **album**|
|album.tracks.get| **albumTracks**|


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