/*
 * Jengular
 *
 * Customized AngularJS implementation for use with Turbolinks and Jekyll
 *
 */

'use strict';

//var app = angular.module('app', ['plangular']);
var app = angular.module('app', []);

// Store global properties in app
app.state = 'initialized';

// See player.js
//app.player = {};
// app.player.tracks = []; // Use this to prevent multiple api calls to SoundCloud

// This runs everytime a page is loaded
//app.run(function() {
//  //console.log('app run');
//});

// Bootstrap the app when document is ready
angular.element(document).ready(function() {
  angular.bootstrap(document.body, ['app']);
});

// Bootstrap the app when turbolinks page loads
angular.element(document).on('page:load', function($rootScope) {
  angular.bootstrap(document.body, ['app']);
});


