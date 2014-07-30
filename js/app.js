/*
 * Jekyll Vue
 *
 */


// Init global variables
var app = {};
var view;
app.audio = app.audio || document.createElement('audio');
app.player = {};
app.player.tracks = [];
app.player.i = 0;
app.player.playing = false;
app.player.currentTime = 0;

app.api = 'http://api.soundcloud.com/resolve.json';
app.clientID = '0d33361983f16d2527b01fbf6408b7d7';
app.soundcloudData = {};

app.get = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onload = function () {
    if (!xhr.response) console.error('Could not load');
    callback(xhr.response);
  };
};


Vue.directive('soundcloud', {
  bind: function(value) {
    console.log('soundcloud directive');
    var url = app.api + '?url=' + value + '&client_id=' + app.clientID;
    if (!app.soundcloudData[value]) {
      app.get(url, function(data) {
        app.soundcloudData[value] = JSON.parse(data);
        console.log(app.soundcloudData);
        view.$data = { soundcloud: app.soundcloudData };
      });
    };
  }
});

Vue.component('test-comp', {
  template: '{{ soundcloud }}'
});


app.bootstrap = function() {
  view = new Vue({ el: '#view', data: { soundcloud: app.soundcloudData } });
};

document.addEventListener('DOMContentLoaded', function() {
  app.bootstrap();
});

document.addEventListener('page:load', function () {
  app.bootstrap();
});

