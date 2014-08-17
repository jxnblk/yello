// XHR requests

'use strict';


var get = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (!xhr.response) console.error('Could not load');
      if(callback) callback(xhr.response);
    };
    xhr.send();
};

module.exports = { get: get };

