// Audio player

'use strict';


var audio = require('./audio');

var Player = function() {

  var api = 'http://api.soundcloud.com/resolve.json';
  var clientID = '0d33361983f16d2527b01fbf6408b7d7';

  var player = {};
  player.data = {};
  player.i = 0;
  player.playing = false;
  player.currentTime = 0;

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


  player.play = function(url, i) {
    if (this.data[url] && this.data[url].tracks && i) {
      var src = this.data[url].tracks[i].stream_url + '?client_id=' + clientID;
    } else {
      var src = this.data[url].stream_url + '?client_id=' + clientID;
    }
    if (src != audio.src) audio.src = src;
    audio.play();
    this.playing = this.data[url];
  };

  player.pause = function() {
    audio.pause();
    this.playing = false;
  };

  player.playPause = function(url, i) {
    if (!url) return false;
    if (this.playing != this.data[url]) {
      this.play(url, i);
    } else {
      this.pause();
    }
  };

  audio.addEventListener('timeupdate', function() {
    player.currentTime = audio.currentTime;
  });

  return player;

};

var player = global.player || new Player();

module.exports = player;

