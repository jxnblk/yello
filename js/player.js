'use strict';

// Init global variables
app.audio = app.audio || document.createElement('audio');
app.player = {};
app.player.tracks = [];
app.player.i = 0;
app.player.playing = false;
app.player.paused = false;
app.player.currentTime = 0;

app.service('player', function($rootScope, $http) {

  var player = app.player;

  player.clientID = '0d33361983f16d2527b01fbf6408b7d7';
  player.params = '?client_id=' + player.clientID;

  player.play = function(index) {
    player.i = index || 0;
    var track = player.tracks[player.i];
    console.log(player.tracks);
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
    if (player.i < player.tracks.length - 1) {
      player.i++;
      player.play(player.i);
    } else {
      player.pause();
    };
  };

  player.previous = function() {
    if (player.i > 0 ) {
      player.i--;
      player.play(player.i);
    }
  };

  app.audio.addEventListener('timeupdate', function() {
    var currentTime = (app.audio.currentTime * 1000).toFixed();
    app.player.currentTime = currentTime;
    $rootScope.$broadcast('timeUpdate', currentTime);
  });

  return player;

});


app.soundcloudData = {};

// Soundcloud resolve directive
app.directive('soundcloudPlayer', function($http, player) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attributes) {

      var src = attributes.src;
      var params = { url: src, client_id: player.clientID, callback: 'JSON_CALLBACK' };

      scope.player = player;
      scope.audio = app.audio;

      scope.play = function(i) {
        player.tracks = scope.tracks;
        player.play(i);
      };

      scope.pause = function() {
        player.pause();
      };

      if(app.soundcloudData[src]) {
        console.log('already have data');
        scope.tracks = app.soundcloudData[src];
        if (scope.tracks.length == 1) {
          scope.track = scope.tracks[0];
        }
        return false;
      };

      $http.jsonp('//api.soundcloud.com/resolve.json', { params: params }).success(function(response) {
        if (response.tracks) {
          scope.tracks = response;
        } else {
          scope.tracks = [response];
          scope.track = scope.tracks[0];
        }
        app.soundcloudData[src] = scope.tracks;
      });

    }
  }
});


app.filter('playTime', function() {
  return function(ms) {
    var hours = Math.floor(ms / 36e5),
        mins = '0' + Math.floor((ms % 36e5) / 6e4),
        secs = '0' + Math.floor((ms % 6e4) / 1000);
        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);
    if(!isNaN(secs)){
      if (hours){
        return hours+':'+mins+':'+secs;  
      } else {
        return mins+':'+secs;  
      };
    } else {
      return '00:00';
    };
  };
});

