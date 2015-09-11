'use strict';

var app = angular.module('configurationSelector');

app.controller('FilterController', function($scope, ConfigurationService){
  console.log(ConfigurationService.getConfigurations());
  $scope.test = 'test';

  $scope.getSmMainOptions = function() {
    var configurations = ConfigurationService.getConfigurations();
    var smMainOptions = [];
    for (var i = 0; i < configurations.length; i++ ) {
      var deployments = configurations[i].smDeployment;
      for (var j = 0; j < deployments.length; j++ ) {
        smMainOptions.push("FSMF - " + deployments[j].fsmf.technology);
      }
    }
    return smMainOptions.filter(onlyUnique);
  };

  $scope.getSmExtensionOptions = function() {
    var configurations = ConfigurationService.getConfigurations();
    var smExpansionOptions = [];
    for (var i = 0; i < configurations.length; i++) {
      var deployments = configurations[i].smDeployment;
      for (var j = 0; j < deployments.length; j++) {
        var extensionConfigurations = deployments[j].extension;
        for (var k = 0; k < deployments[j].extension.length; k++) {
          var technology = extensionConfigurations[k].technology;
          var card = extensionConfigurations[k].fbbx;
          smExpansionOptions.push(card + " - " + technology);
        }
      }
    }
    return smExpansionOptions.filter(onlyUnique);
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
  };
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
