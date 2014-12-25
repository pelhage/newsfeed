'use strict';

/**
 * @ngdoc function
 * @name newsfeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsfeedApp
 */
angular.module('newsfeedApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
