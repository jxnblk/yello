
'use strict';


var Soundcloud = Vue.extend({
  template: '#sc-temp',
  data: {
    play: function() {
      console.log('soundcloud.play');
      var url = this.$data.sc.stream_url;
      if (url) global.player.play(url);
    },
    pause: function() {
      global.player.pause();
    },
    playPause: function() {
      var url = this.$data.sc.stream_url;
      global.player.playPause(url);
    }
  },
  directives: {
    'src': function(value) {
      var self = this;
      global.player.get(value, function(response) {
        self.vm.$data.sc = response;
      });
    }
  }
});

module.exports = Vue.component('soundcloud', Soundcloud);

