'use strict';

/**
 * @ngdoc function
 * @name playerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playerApp
 */
angular.module('playerApp')
	.controller('MainCtrl', function($scope, $http) {

		$scope.playing = false;
		$scope.imgLoaded = false;
		$scope.seconds = '0:00';
		$scope.muted = false;
		$scope.url = 'https://rawgit.com/erperejildo/server/master/songs/';

		$http.get('https://raw.githubusercontent.com/erperejildo/server/master/songs/songs.json').
		then(function(response) {
			$scope.songs = response.data;
			$scope.current = 0;
			$scope.activeSong = document.getElementById('song');
			$scope.activeSong.src = $scope.url + $scope.songs[$scope.current].url;
		}, function(error) {});

		$scope.showImg = function() {
			$scope.imgLoaded = true;
		};

		$scope.addFavourite = function() {
			$scope.favourite = true;
		};

		$scope.playPause = function() {
			if ($scope.activeSong.paused) {
				$scope.playing = true;
				$scope.activeSong.play();
			} else {
				$scope.playing = false;
				$scope.activeSong.pause();
			}
		}

		$scope.mute = function() {
			if ($scope.muted) {
				$scope.muted = false;
				$scope.activeSong.volume = $scope.volume_;
			} else {
				$scope.muted = true;
				$scope.volume_ = $scope.activeSong.volume;
				$scope.activeSong.volume = 0;
			}
		};

		$scope.updateTime = function(prueba) {
			var currentSeconds = (Math.floor($scope.activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor($scope.activeSong.currentTime % 60);
			var currentMinutes = Math.floor($scope.activeSong.currentTime / 60);

			$scope.$apply(function(){
				$scope.seconds = currentMinutes + ":" + currentSeconds;
			});

			var percentageOfSong = ($scope.activeSong.currentTime / $scope.activeSong.duration);
			var percentageOfSlider = document.getElementById('progress').offsetWidth * percentageOfSong;

			$scope.barWidth = {
				'width': Math.round(percentageOfSlider) + 'px'
			};
			console.log($scope.barWidth);
		}

		$scope.changeVolume = function (number, direction) {
			$scope.muted = false;
			$scope.activeSong.volume = $scope.volume_;
			if ($scope.activeSong.volume > 0 && direction == 'less') {
				$scope.activeSong.volume = ($scope.activeSong.volume - (number / 100)).toFixed(2);
			}
			if ($scope.activeSong.volume < 1 && direction == 'more') {
				$scope.activeSong.volume = ($scope.activeSong.volume + (number / 100)).toFixed(2);
			}
		}

		$scope.songPosition = function(e) {
			var barWidth = document.getElementById('progress').offsetWidth;
			var clickPosition = e.offsetX

			var percentage = (e.offsetX / barWidth);

			$scope.activeSong.currentTime = $scope.activeSong.duration * percentage;
		};

		$scope.changeSong = function(val) {
			$scope.activeSong.pause();
			$scope.playing = false;
			if (val == 'prev') {
				if ($scope.current == 0) {
					$scope.current = $scope.songs.length - 1;
				} else {
					$scope.current --;
				}
			} else {
				if ($scope.current + 1 == $scope.songs.length) {
					$scope.current = 0;
				} else {
					$scope.current ++;
				}
			}
			$scope.activeSong.src = $scope.url + $scope.songs[$scope.current].url;
			$scope.barWidth = {
				'width': '0px'
			};
			$scope.seconds = '0:00';
		};

	});