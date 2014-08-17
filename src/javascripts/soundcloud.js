
'use strict';

var player = require('./player');
//var xhr = require('./xhr');
var jsonp = require('./jsonp');

var Soundcloud = Vue.extend({
  data: {
    play: function(i) {
      var url = this.$data.value;
      var track = app.data[url]; // Also sends full playlist for player to handle
      var tracks;
      if (track.tracks) tracks = track.tracks;
      else tracks = track;
      player.play(tracks, i);
    },
    pause: function() {
      player.pause();
    },
    playPause: function(i) {
      var url = this.$data.value;
      var track = app.data[url];
      var tracks;
      if (track.tracks) tracks = track.tracks;
      else tracks = track;
      player.playPause(tracks, i);
    }
  },
  directives: {
    'src': function(value) {
      var self = this;
      self.vm.$data.value = value;
      var preloadPlayer = function(track) {
        if (player.tracks.length > 0) return false;
        player.tracks = track.tracks || new Array(track);
        player.i = 0;
        player.currentTrack = player.tracks[player.i];
      };
      var elements = document.querySelectorAll('[v-src]');
      for (var i = 0; i < elements.length; i++) {
        if (this.el == elements[i]) {
          self.vm.$data.index = i;
        }
      }
      var apiUrl = app.api + '?url=' + value + '&client_id=' + app.clientID;
      if (app.data[value]) {
        for (var key in app.data[value]) {
          self.vm.$data[key] = app.data[value][key];
        }
        preloadPlayer(app.data[value]);
      } else {
        callback = function(response) {
          app.data[value] = response;
          for (var key in response) {
            self.vm.$data[key] = response[key];
          }
          preloadPlayer(app.data[value]);
        };
        jsonp.get(apiUrl, callback);

        // XHR does not work with Soundcloud resolve redirect
        //xhr.get(apiUrl, function(response) {
        //  app.data[value] = response;
        //  for (var key in response) {
        //    self.vm.$data[key] = response[key];
        //  }
        //  preloadPlayer(app.data[value]);
        //});
      }
    }
  }
});

module.exports = Vue.component('soundcloud', Soundcloud);

