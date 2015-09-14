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

  var bbCapacityValues = {
    lte: [0, 1, 2, 3],
    wcdma: [0, 3.5, 5.5, 9.5, 11.5, 15.5, 17.5],
    gsm: [0, 24]
  };

  var allFsmf = 'FSMF - All technologies';
  var noExtension = 'No extension';
  var allExtensions = 'FBBX - All technologies';
  var smOptions = {
    fsmf: [allFsmf, 'FSMF - LTE', 'FSMF - WCDMA', 'FSMF - LTE & GSM', 'FSMF - WCDMA & GSM'],
    extensions: [noExtension, allExtensions, 'FFBA - LTE', 'FFBA - WCDMA', 'FFBA - GSM', 'FFBC - LTE', 'FBBC - WCDMA', 'FBBC - GSM']
  };

  $scope.selectedFsmf = allFsmf;
  $scope.selectedExtension1 = noExtension;
  $scope.selectedExtension2 = noExtension;

  $scope.setSelectedFsmf = function(fsmf) {
    $scope.selectedFsmf = fsmf;
  }
  $scope.setSelectedExtension1 = function(extension) {
    $scope.selectedExtension1 = extension;
  }
  $scope.setSelectedExtension2 = function(extension) {
    $scope.selectedExtension2 = extension;
  }

  $scope.getSmFsmfOptions = function() {
    return smOptions.fsmf;
  };
  $scope.getSmExtensionOptions = function() {
    return smOptions.extensions;
  };
  $scope.getBBCapacityValuesForLTE = function() {
    return bbCapacityValues.lte;
  }
  $scope.getBBCapacityValuesForWCDMA = function() {
    return bbCapacityValues.wcdma;
  }
  $scope.getBBCapacityValuesForGSM = function() {
    return bbCapacityValues.gsm;
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
