'use strict';

var app = angular.module('configurationSelector');

var technologies = {
  lte: false,
  wcdma: false,
  gsm: false
}

var toggleTechnology = function(technology) {
  technologies[technology] = !technologies[technology];
};

app.controller('FilterController', function($scope, ConfigurationService){
  console.log(ConfigurationService.getConfigurations());
  $scope.technologies = technologies;
  $scope.toggleTechnology = toggleTechnology;

  var configurations = ConfigurationService.getConfigurations();
  var configLen = configurations.length;

  $scope.getSmMainOptions = function() {
    var smMainOptions = [];
    for (var i = 0; i < configLen; i++ ) {
      var deployments = configurations[i].smDeployment;
      for (var j = 0; j < deployments.length; j++ ) {
        smMainOptions.push("FSMF - " + deployments[j].fsmf.technology);
      }
    }
    return smMainOptions.filter(onlyUnique);
  };

  $scope.getSmExtensionOptions = function() {
    var smExpansionOptions = [];
    for (var i = 0; i < configLen; i++) {
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

  $scope.getBBCapacityValuesForLTE = function() {
    return [
      { bbVal: 0 },
      { bbVal: 1 },
      { bbVal: 2 },
      { bbVal: 3 }
    ];
  }
  $scope.getBBCapacityValuesForWCDMA = function() {
    return [
      { bbVal: 0 },
      { bbVal: 3.5 },
      { bbVal: 5.5 },
      { bbVal: 9.5 },
      { bbVal: 11.5 },
      { bbVal: 15.5 },
      { bbVal: 17.5 }
    ];
  }
  $scope.getBBCapacityValuesForGSM = function() {
    return [
      { bbVal: 0 },
      { bbVal: 24 }
    ];
  }


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
