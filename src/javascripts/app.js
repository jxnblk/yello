// Jekyll Vue

'use strict';

var app = {};
require('./turbolinks');
global.player = require('./player');
require('./soundcloud');

app.bootstrap = function() {
  global.player.playlist = [];
  app.view = new Vue({
    el: '#view',
    data: global.player
  });
};

document.addEventListener('DOMContentLoaded', function() {
  app.bootstrap();
});

document.addEventListener('page:load', function () {
  app.bootstrap();
});


