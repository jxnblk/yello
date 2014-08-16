// Jekyll Vue

'use strict';

global.app = {};
app.api = 'http://api.soundcloud.com/resolve.json';
app.clientID = '0d33361983f16d2527b01fbf6408b7d7';
app.data = {};

require('./turbolinks');
require('./soundcloud');
require('./icons');
require('./time-filter');

app.data.player = require('./player');
//app.data.audio = require('./audio');

app.data.keydown = function(e) {
  // console.log(e.which);
  // Handle form fields
  var player = app.data.player;
  if (e.which == 32) {
    // Spacebar
    e.preventDefault();
    player.playPause(player.tracks, player.i);
  }
  if (e.which == 74 || e.which == 40) {
    // J Down
    e.preventDefault();
    player.next();
  }
  if (e.which == 75 || e.which == 38) {
    // K Up
    e.preventDefault();
    player.previous();
  }
};

app.bootstrap = function() {
  console.log('bootstrap');
  app.data.bodyBg = document.body.bodyBg;
  app.view = new Vue({
    el: '#view',
    data: app.data
  });
};

document.addEventListener('DOMContentLoaded', app.bootstrap);
//document.addEventListener('page:load', app.bootstrap);
document.addEventListener('page:change', app.bootstrap);


