var querystring = require('querystring');

var qp = {
  toString: function (params) {
    var str = '';
    Object.keys(params).forEach(function (key) {
      if (params[key] !== undefined) {
        if (str !== '') {
          str += '&';
        }
        
        str += key + '=' + encodeURIComponent(params[key]);
      }
    });
    
    return str;
  },
  
  toObject: function (str) {
    return querystring.parse(str);
  }
};

//
module.exports = qp;