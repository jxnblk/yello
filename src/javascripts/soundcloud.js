
'use strict';


var Soundcloud = Vue.extend({
  data: {
    play: function(i) {
      console.log('index', i);
      var url = this.$data.value;
      global.player.play(url, i);
    },
    pause: function() {
      global.player.pause();
    },
    playPause: function(i) {
      console.log(i);
      var url = this.$data.value;
      global.player.playPause(url, i);
    }
  },
  directives: {
    'src': function(value) {
      var self = this;
      self.vm.$data.value = value;
      global.player.get(value, function(response) {
        for (var key in response) {
          self.vm.$data[key] = response[key];
        }
      });
    }
  }
});

module.exports = Vue.component('soundcloud', Soundcloud);

