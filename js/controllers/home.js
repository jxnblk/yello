app.controller('home', ['$scope', 'player', function($scope, player) {

  $scope.track = app.player.tracks[0] || null;

  $scope.player = player;

  if (!$scope.track) {
    console.log('api call');
    player.load('http://soundcloud.com/jxnblk/let-go', function(track) {
      $scope.track = track;
    });
  }


}]);
