
Making small simple APIs from other web sites in a small module that collects information


## Install

NPM is available for download via a simple

```
npm install seven
```

## Usage

Seven different ways you can incorporate into your application ..
You can define your own HTTP headers or you can use the default headers

```js
var seven = require('seven');

```

* * *

```js
var seven = require('seven')();
//or
var crop = new seven();
//or
var crop = new seven({ "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3"});

```
## Methods
* `play` - **url**, **callback** 
* `matchall` - **body**, **start**, **end** 
* `out` - **opt**
* `attrkey` - **opt**
* `attr` -  **body**, **attr**
* `tags` -  **body**
* `clear` -  **tags**
* `dom` -  **body**





## Play

* `url` - **string**
* `callback` -  **err**, **body** ,**res**

```js
seven.play('https://news.ycombinator.com/',function(err,body,res){
        if(err) throw err;
        else console.log(body)
              console.log(res);
});

```





## Matchall

* `body` - **string**
* `start` -  **string**
* `end` -  **string**

```js
seven.play('https://news.ycombinator.com/',function(err,body,res){
        if(err){
        throw err;
        }else{
        var post = seven.matchall(body,'<td class="title">','</td>');
        }
});

```



## Out

* `out` - **object**
* `@params` **dir**, **chunk**, **clear**

```js
seven.play('https://news.ycombinator.com/',function(err,body,res){
        if(err){
        throw err;
        }else{
        var post = seven.matchall(body,'<td class="title">','</td>');
        seven.out({dir:'data.txt', chunk:body,clear:true}); // exa1
        seven.out({dir:'data.txt', chunk:post}); // exa1
        }
});

```


## Attr

* `body` - **string**
* `attr` - **string**
* `default` - **all**, **id**, **class**, **src**, **href** ,**title**

```js
seven.play('https://news.ycombinator.com/',function(err,body,res){
        if(err){
        throw err;
        }else{
        var post = seven.matchall(body,'<td class="title">','</td>');
        var attr =seven.matchall(post[0],'all');
        }
});

```



## Attrkey

* `attr` - **object**

```js
seven.play('https://news.ycombinator.com/',function(err,body,res){
        if(err){
        throw err;
        }else{
        var post = seven.matchall(body,'<td class="title">','</td>');
        seven.attrkey({"ycover":/data-thumb=["'](.*?)["']/g});
        }
});

```
 * * *

## Clear

* `body` - **string**

```js
seven.play('https://news.ycombinator.com/',function(err,body,res){
        if(err){
        throw err;
        }else{
        var post = seven.matchall(body,'<td class="title">','</td>');
        console.log(post[0].clear());
         console.log(post[0].clear('a')); //except tag 
        }
});

```



## Dom

* `body` - **string**

```js
seven.play('https://news.ycombinator.com/',function(err,body,res){
        if(err){
        throw err;
        }else{
        var doms = seven.dom(body);
         console.log(doms); //except tag 
        }
});

```
