// Audio player

'use strict';


var audio = require('./audio');
var xhr = require('./xhr');


var Player = function() {

  var player = {};
  player.i = 0;
  player.playing = false;
  player.currentTime = 0;

  player.play = function(track, i) {
    if (track.tracks) {
      var track = track.tracks[i];
      //var src = track.tracks[i].stream_url + '?client_id=' + app.clientID;
      this.i = i;
    } else {
      var track = track;
    }
    var src = track.stream_url + '?client_id=' + app.clientID;
    if (src != audio.src) audio.src = src;
    audio.play();
    this.playing = track;
  };

  player.pause = function() {
    audio.pause();
    this.playing = false;
  };

  player.playPause = function(track, i) {
    if (!track) return false;
    if (track.tracks && this.playing != track.tracks[i]) {
      this.play(track, i);
    } else if (!track.tracks && this.playing != track) {
      this.play(track, i);
    } else {
      this.pause();
    }
  };

  player.next = function() {
  };

  player.previous = function() {
  };

  player.seek = function(time) {
  };

  audio.addEventListener('timeupdate', function() {
    player.currentTime = audio.currentTime;
  });

  return player;

};

//var player = global.player || new Player();
var player = player || new Player();

module.exports = player;

