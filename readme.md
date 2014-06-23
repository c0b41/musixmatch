NodeJS musixmatch community api

### Install

```bash
$ npm install musicmatch
```


#### Artist Search

```js

music = require('musicmatch')({usertoken:"",method:"",appid:""});

// or

music =  require('musicmatch')();

```


#### Artist Search

```js

musicmatch = require('musicmatch')

music =musicmatch();

music.artist({q:"Tove lo",page:1,page_size:10}).exec(function(error, result){

    

});

```

#### Track Search


```js

music.track({q_track_artist:"Habits",page:1,page_size:30}).exec(function(error, result){

    

});
```


