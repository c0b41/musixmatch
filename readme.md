[![Travis Build Status](http://img.shields.io/travis/ayhankuru/musixmatch.svg?style=flat-square)](https://travis-ci.org/ayhankuru/musixmatch) [![Circle Build Status](https://img.shields.io/circleci/project/ayhankuru/musixmatch.svg?style=flat-square)](https://circleci.com/gh/ayhankuru/musixmatch) [![Appveyor Build Status](https://img.shields.io/appveyor/ci/ayhankuru/musixmatch.svg?style=flat-square)](https://ci.appveyor.com/project/ayhankuru/musixmatch) [![Build Status](https://img.shields.io/david/ayhankuru/musixmatch.svg?style=flat-square)](https://david-dm.org/ayhankuru/musixmatch) [![io.js supported](https://img.shields.io/badge/io.js-supported-green.svg?style=flat-square)](https://iojs.org)


 
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


#### Artist Search

```js
music.artist({q:"Tove lo",page:1,page_size:10}).then(function(data){

    

}).catch(function(err){
	

});

```

#### Track Search


```js

music.track({q_track_artist:"Habits",page:1,page_size:30}).then(function(data){

    

}).catch(function(err){
	
	
});
```

#### Get Lyrics


```js

music.lyrics({commontrack_vanity_id:"Tove-Lo/Habits",page:1,page_size:30}).then(function(data){

    

}).catch(function(err){
	
	
});
```



##### params list soon ..
