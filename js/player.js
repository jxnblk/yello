'use strict';

// Init global variables
app.audio = app.audio || document.createElement('audio');
app.player = {};
app.player.tracks = [];
app.player.i = 0;
app.player.playing = false;
app.player.paused = false;

app.service('player', function($http) {
  console.log('player service');
  var player = app.player;

  player.clientID = '0d33361983f16d2527b01fbf6408b7d7';
  player.params = '?client_id=' + player.clientID;

  player.play = function() {
    var track = player.tracks[player.i];
    if (player.paused != track) {
      app.audio.src = track.stream_url + player.params;
    }
    app.audio.play();
    player.playing = track;
    player.paused = false;
  };

  player.pause = function() {
    app.audio.pause();
    if(player.playing) {
      player.paused = player.playing;
      player.playing = false;
    }
  };

  player.playPause = function() {
  };

  player.next = function() {
  };

  player.previous = function() {
  };

  // Temporary loading for testing
  player.load = function(url, callback) {
    var params = { url: url, client_id: player.clientID, callback: 'JSON_CALLBACK' };
    $http.jsonp('//api.soundcloud.com/resolve.json', { params: params }).success(function(response) {
      console.log(response);
      if (response.kind == 'track') {
        player.tracks = [ response ];
      }
      if (callback) return callback(response); 
    });
  };

  return player;

});
