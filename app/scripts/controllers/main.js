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
			$scope.currentSong = document.getElementById('song');
			$scope.currentSong.src = $scope.url + $scope.songs[$scope.current].url;
		}, function(error) {});

		$scope.showImg = function() {
			$scope.imgLoaded = true;
		};

		$scope.favourite = [];
		$scope.addFavourite = function() {
			// if I would have a backend API I would make a post with the rate +0.5 or -0.5
			// but I only can save "favourite songs" in this example
			if ($scope.favourite[$scope.current]) {
				$scope.favourite[$scope.current] = false;
			} else {
				$scope.favourite[$scope.current] = true;
			}
		};

		$scope.playPause = function() {
			if ($scope.currentSong.paused) {
				$scope.playing = true;
				$scope.currentSong.play();
			} else {
				$scope.playing = false;
				$scope.currentSong.pause();
			}
		}

		$scope.stop = function() {
			$scope.currentSong.pause();
			$scope.playing = false;
			$scope.barWidth = {
				'width': '0px'
			};
			$scope.seconds = '0:00';
			$scope.currentSong.currentTime = 0;
		};

		$scope.mute = function() {
			if ($scope.muted) {
				$scope.muted = false;
				$scope.currentSong.volume = $scope.volume_;
			} else {
				$scope.muted = true;
				$scope.volume_ = $scope.currentSong.volume;
				$scope.currentSong.volume = 0;
			}
		};

		$scope.updateTime = function(prueba) {
			var currentSeconds = (Math.floor($scope.currentSong.currentTime % 60) < 10 ? '0' : '') + Math.floor($scope.currentSong.currentTime % 60);
			var currentMinutes = Math.floor($scope.currentSong.currentTime / 60);

			$scope.$apply(function(){
				$scope.seconds = currentMinutes + ":" + currentSeconds;
			});

			var percentageOfSong = ($scope.currentSong.currentTime / $scope.currentSong.duration);
			var percentageOfSlider = document.getElementById('progress').offsetWidth * percentageOfSong;

			$scope.barWidth = {
				'width': Math.round(percentageOfSlider) + 'px'
			};

			// song finished
			if ($scope.seconds == $scope.songs[$scope.current].duration) {
				$scope.stop();
			}
		}

		$scope.changeVolume = function (number, direction) {
			if (typeof($scope.volume_) != 'undefined') {
				$scope.muted = false;
				$scope.currentSong.volume = $scope.volume_;
			}
			if ($scope.currentSong.volume > 0 && direction == 'less') {
				$scope.currentSong.volume = ($scope.currentSong.volume - (number / 100)).toFixed(2);
			}
			if ($scope.currentSong.volume < 1 && direction == 'more') {
				$scope.currentSong.volume = ($scope.currentSong.volume + (number / 100)).toFixed(2);
			}
		}

		$scope.songPosition = function(e) {
			var barWidth = document.getElementById('progress').offsetWidth;
			var clickPosition = e.offsetX

			var percentage = (e.offsetX / barWidth);

			$scope.currentSong.currentTime = $scope.currentSong.duration * percentage;
		};

		$scope.changeSong = function(val) {
			$scope.stop();
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
			$scope.currentSong.src = $scope.url + $scope.songs[$scope.current].url;
		};

	});