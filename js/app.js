// Jekyll Vue


// Init global variables
var app = {};
var view;

var Player = function() {

  var audio = document.createElement('audio');
  var api = 'http://api.soundcloud.com/resolve.json';
  var clientID = '0d33361983f16d2527b01fbf6408b7d7';

  player = {};
  player.tracks = [];
  player.i = 0;
  player.playing = false;
  player.currentTime = 0;
  player.data = {};

  player.get = function(url, callback) {
    var self = this;
    if (self.data[url]) {
      if (callback) callback(self.data[url]);
      return self.data[url];
    }
    var apiUrl = api + '?client_id=' + clientID + '&url=' + url;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', apiUrl, true);
    xhr.send();
    xhr.onload = function () {
      if (!xhr.response) console.error('Could not load');
      self.data[url] = xhr.response;
      if(callback) callback(xhr.response);
    };
  };

  return player;

};

app.player = new Player();

var Soundcloud = Vue.extend({
  template: '#sc-temp',
  directives: {
    'src': function(value) {
      var self = this;
      player.get(value, function(response) {
        self.vm.$data = { sc: response };
      });
    }
  }
});
Vue.component('soundcloud', Soundcloud);



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


