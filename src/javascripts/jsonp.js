
'use strict';

var callback = function() {};

var get = function(url, callback) {
  var script = document.createElement('script');
  script.src = url + '&callback=callback';
  document.body.appendChild(script);
};

module.exports = { get: get, callback: callback };

