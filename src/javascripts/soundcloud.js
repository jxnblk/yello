
'use strict';

var player = require('./player');
var xhr = require('./xhr');

var Soundcloud = Vue.extend({
  data: {
    play: function(i) {
      var url = this.$data.value;
      var track = app.data[url]; // Also sends full playlist for player to handle
      player.play(track, i);
    },
    pause: function() {
      player.pause();
    },
    playPause: function(i) {
      var url = this.$data.value;
      var track = app.data[url];
      player.playPause(track, i);
    }
  },
  directives: {
    'src': function(value) {
      var self = this;
      self.vm.$data.value = value;
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
      } else {
        xhr.get(apiUrl, function(response) {
          app.data[value] = response;
          for (var key in response) {
            self.vm.$data[key] = response[key];
          }
        });
      }
    }
  }
});

module.exports = Vue.component('soundcloud', Soundcloud);

