console.log('app');

var app = angular.module('app', ['plangular']);

app.controller('HomeCtrl', ['$scope', function($scope) {
  console.log('HomeCtrl');
  $scope.test = 'herro';
}]);
 
//angular.element(document).on('ready', function() {

//angular.element(document).ready(function() {
//  angular.bootstrap(document, ['app']);
//});

angular.element(document).on('page:load', function(){
  console.log('page load');
});

