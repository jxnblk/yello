// Jekyll Vue

'use strict';

var app = {};
var view;

require('./turbolinks');
global.player = require('./player');
require('./soundcloud');

app.bootstrap = function() {
  console.log('bootstrap');
  view = new Vue({
    el: '#view',
    data: { }
  });
};

document.addEventListener('DOMContentLoaded', function() {
  app.bootstrap();
});

document.addEventListener('page:load', function () {
  app.bootstrap();
});



