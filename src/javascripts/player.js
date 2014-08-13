// Audio player

'use strict';

/*
Array.prototype.contains = function(key) {
  for (var i in this) {
    if (this[i] == key) return true;
  }
  return false;
}
*/

var audio = require('./audio');

var Player = function() {

  var api = 'http://api.soundcloud.com/resolve.json';
  var clientID = '0d33361983f16d2527b01fbf6408b7d7';

  var player = {};
  player.tracks = [];
  player.i = 0;
  player.playing = false;
  player.currentTime = 0;
  player.data = [];

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
        //var track = {};
        //track[url] = xhr.response;
        //self.data.push(track);
      if(callback) callback(xhr.response);
    };
  };

  player.play = function(src) {
    this.isPlaying = src;
    var src = src + '?client_id=' + clientID;
    if (src != audio.src) audio.src = src;
    audio.play();
  };

  player.pause = function() {
    audio.pause();
    this.isPlaying = false;
  };

  player.playPause = function(src) {
    if (this.isPlaying != src) {
      this.play(src);
    } else {
      this.pause();
    }
  };

  //audio.addEventListener('timeupdate', function() {
  //  console.log(audio.currentTime);
  //});

  return player;

};

var player = global.player || new Player();

module.exports = player;

