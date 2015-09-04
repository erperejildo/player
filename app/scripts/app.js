'use strict';

/**
 * @ngdoc overview
 * @name playerApp
 * @description
 * # playerApp
 *
 * Main module of the application.
 */
angular
	.module('playerApp', [])
	// when load element
	.directive('audioplayer', function() {
		return {
			scope: {
				updateTime: '&playing'
			},
			link: function(scope, element, attrs) {
				element.bind('timeupdate', function(evt) {
					scope.updateTime();
				});
			}
		};
	})
	// get duration when song loaded
	.directive('elemReady', function($parse) {
		return {
			restrict: 'A',
			link: function($scope, elem, attrs) {
				elem.ready(function() {
					$scope.$apply(function() {
						var func = $parse(attrs.elemReady);
						func($scope);
					})
				})
			}
		}
	});