// XHR requests

'use strict';


var get = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = function () {
      if (!xhr.response) console.error('Could not load');
      if(callback) callback(xhr.response);
    };
};

module.exports = { get: get };

