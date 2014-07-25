app.controller('player', ['$scope', 'player', function($scope, player) {

  $scope.player = player;


  $scope.$on('timeUpdate', function(event, response) {
    $scope.$apply(function() {
      $scope.currentTime = response;
      $scope.duration = (app.audio.duration * 1000).toFixed();
    });
  });

}]);
