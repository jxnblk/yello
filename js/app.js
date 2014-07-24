console.log('app');

var app = angular.module('app', ['plangular']);

app.controller('ApplicationCtrl', ['$scope', function($scope) {
  console.log('ApplicationCtrl');
  $scope.herro = 'application';
}]);

app.controller('HomeCtrl', ['$scope', function($scope) {
  console.log('HomeCtrl');
  $scope.test = 'herro';
}]);
 
angular.element(document).on('ready', function() {
  console.log('ready');
  angular.bootstrap(document, ['app']);
  //angular.bootstrap(document.body, ['app']);
});

angular.element(document).on('page:load', function(){
  console.log('page load');
  angular.bootstrap(document.body, ['app']);
});

