'use strict';

/**
 * @ngdoc function
 * @name playerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playerApp
 */
angular.module('playerApp')
  .controller('MainCtrl', function ($scope, $http) {

  	/*$http.jsonp('https://githubusercontent.com/erperejildo/server/master/songs/songs.json', {
	    params: {
	      'callback': 'JSON_CALLBACK'
	    }
	}).success(function(response) {
	    $scope.error = false;
	    console.log('bien');
	}).error(function(response) {
	    $scope.error = true;
	    console.log('error');
	});*/

	  $http.get('https://raw.githubusercontent.com/erperejildo/server/master/songs/songs.json').
	  	then(function(response) {
	  		$scope.songs = response.data;
	  		$scope.current = 0;
	  }, function(error) {
	  });

	  $scope.addFavourite = function() {
	  	$scope.favourite = true;
	  };

  });
