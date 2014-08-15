// Jekyll Vue

'use strict';

global.app = {};
app.api = 'http://api.soundcloud.com/resolve.json';
app.clientID = '0d33361983f16d2527b01fbf6408b7d7';
app.data = {};

require('./turbolinks');
require('./soundcloud');
//global.player = require('./player');

app.data.player = require('./player');

app.bootstrap = function() {
  console.log('bootstrap');
  app.view = new Vue({
    el: '#view',
    data: app.data
  });
};

document.addEventListener('DOMContentLoaded', function() {
  app.bootstrap();
});

document.addEventListener('page:load', function () {
  app.bootstrap();
});


