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

  $scope.getConfigurations = ConfigurationService.getConfigurations();

  $scope.displaySMDeployment = function(smDeployment){
    return parseSMD(smDeployment);
  }

  var configurations = ConfigurationService.getConfigurations();
  var configLen = configurations.length;

  var bbCapacityValues = {
    lte: [0, 1, 2, 3],
    wcdma: [0, 3.5, 5.5, 9.5, 11.5, 15.5, 17.5],
    gsm: [0, 24]
  };

  var noExtensionCard = 'No extension';
  var allExtensionCards = "All cards";
  var allTechnologies = "All technologies";
  var extensionCards = [allExtensionCards, 'FBBA', 'FBBC'];
  var extensionTechnologies = [allTechnologies, 'LTE', 'WCDMA', 'GSM'];
  $scope.fsmOptions = [allTechnologies, 'LTE', 'WCDMA', 'GSM', 'LTE & GSM', 'WCDMA & GSM'];
  $scope.extensionOptions = [noExtensionCard].concat( getPermutations(extensionCards, extensionTechnologies) );

  $scope.selectedFsmf_d1 = {
    technology: allTechnologies
  };
  $scope.selectedExtension1_d1 = {
    card: noExtensionCard,
    technology: null,
  };
  $scope.selectedExtension2_d1 = {
    card: noExtensionCard,
    technology: null,
  };

  $scope.getFsmfFilter_d1 = function() {
    if ($scope.selectedFsmf_d1.technology === allTechnologies) {
      return '';
    }
    else {
      return $scope.selectedFsmf_d1.technology;
    }
  };

  $scope.setSelectedFsmf_d1 = function(technology) {
    $scope.selectedFsmf_d1.technology = technology;
  }
  $scope.setSelectedExtension1_d1 = function(card,technology) {
    $scope.selectedExtension1_d1.card = card;
    $scope.selectedExtension1_d1.technology = technology;
  }
  $scope.setSelectedExtension2_d1 = function(card,technology) {
    $scope.selectedExtension2_d1.card = card;
    $scope.selectedExtension2_d1.technology = technology;
  }

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

function getPermutations(array1, array2) {
  var permutations = [];
  for (var i = 0; i < array1.length; i++) {
    for (var j = 0; j < array2.length; j++) {
      permutations.push( array1[i] + ' - ' + array2[j] );
    }
  }
  return permutations;
}

function parseSMD(smDeployment){
  var str = "";
  console.log(smDeployment);
  str += "FSMF:"+smDeployment.fsmf.technology;
  str += " + "+smDeployment.extension[0].fbbx+":"+smDeployment.extension[0].technology;
  str += " + "+smDeployment.extension[1].fbbx+":"+smDeployment.extension[1].technology;
  return str;
}
