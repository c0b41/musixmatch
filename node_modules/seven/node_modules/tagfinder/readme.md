# Tagfinder

Tagfinder parses html5 markup for opening tags and their attributes.

It can be used to parse html5 when other parsers or jQuery might be too slow, for example in a Web server. Tagfinder is the inner workings of the Webfiller module that facilitates dual-side rendering with Express or any node.js environment.

* [Tagfinder](https://github.com/haraldrudell/tagfinder) is on github
* [Webfiller](https://github.com/haraldrudell/webfiller) is on github

# Usage Example

Example of JavaScript executed in node:

```js
console.log(require('tagfinder').decomposeHtml(
  '<!doctype html><title class="c1 c2" id=p>x</title>'))

```

This will print:

```
{ pieces: 
   [ '<!doctype html>',
     '<title class="c1 c2" id=p>',
     'x',
     '</title>' ],
  tags: [ { t: 'title', i: 1, a: [Object], c: [Object] } ] }
```

* .tags: an array of each opening element in the html

  * .t the tagname text, like 'div' or 'html'
  * .i the index in the contents array for this tag
  * .v optional boolean: evaluates to true if this is a self-terminated void tag, eg. <br/>
  * .a object: key: attribute name, value: string attribute value, classes are not present here
  * .c classes array: the class attribute value split into an array of words

* pieces array: the html markup split into many shorter strings

The document is split into an array of:

  * One initial piece containing markup before any opening tag
  * For each found opening tag, 3 elements:

     * The tag itself eg. `<a href=#>`
     * Element contents up to the first opening tag, closing tag,or cdata segment
     * The rest of the element contents, eg. `<child/>text</a>`

# Html5

   Tagfinder is designed for html5. Carefully crafted html5 renders in most browsers. Tagfinder is not designed for older markup or xml. This means your markup needs to be html5, and as such it can target most browsers.

   Tagfinder is designed for node.js, but could easily run in any JavaScript environment.


# Notes

© [Harald Rudell](http://www.haraldrudell.com) wrote this module in August, 2012

No warranty expressed or implied. Use at your own risk.

Please suggest better ways, new features and possible difficulties on [github](https://github.com/haraldrudell/tagfinder)