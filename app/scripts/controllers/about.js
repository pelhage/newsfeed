'use strict';

/**
 * @ngdoc function
 * @name newsfeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the newsfeedApp
 */
angular.module('newsfeedApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
