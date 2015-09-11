'use strict';

var app = angular.module('configurationSelector');

app.controller('FilterController', function($scope, ConfigurationService){
  console.log(ConfigurationService.getConfigurations());
  $scope.test = 'test';

  $scope.getSmMainOptions = function() {
    var configurations = ConfigurationService.getConfigurations();
    var smMainOptions = [];
    for( var i = 0; i < configurations.length; i++ )
    {
      for( var j = 0; j < configurations[i].smDeployment.length; j++ )
      {
        smMainOptions.push( configurations[i].smDeployment[j].fsmf.technology );
      }
    }
    console.log(smMainOptions);
    return smMainOptions;
  };
});

app.directive('technologies', function() {
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

app.directive('configurations', function() {
  return {
    restrict: 'E',
    templateUrl: 'configurations.html'
  }
});
