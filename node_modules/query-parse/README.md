# query-parse

Parse query strings to objects and objects to strings. USEFUL: Removes null or empty values.

## Install

[![NPM](https://nodei.co/npm/query-parse.png)](https://nodei.co/npm/query-parse/)

## Usage

```javascript
var qp = require('query-parse');

var paramStr = qp.toString({
  param1: 'foo',
  param2: 'bar';
});

// Outputs: "param1=foo&param2=bar";

var paramObj = qp.toObject('param1=foo&param2=bar&param3=');

// Outputs: 
//  {
//    param1: 'foo',
//    param2: 'bar'
//  }
//
// Ignores blank parameters for both toString and toObject

```

## Test

```
npm test
```
