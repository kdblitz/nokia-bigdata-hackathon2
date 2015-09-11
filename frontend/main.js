'use strict';

var app = angular.module('configurationSelector');

app.controller('FilterController', function($scope, ConfigurationService){
  console.log(ConfigurationService.getConfigurations());
  $scope.test = 'test';
});

app.directive('technologies', function(){
  return {
    restrict: 'E',
    templateUrl: 'technologies.html'
  };
});

app.directive('systemModule', function() {
  return {
    restrict: 'E',
    templateUrl: 'systemModule.html'
  };
});
