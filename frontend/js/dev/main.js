'use strict';

var app = angular.module('configurationSelector');

var filterObject = {
  configId: null,
  smMode: {
    gsm: {
      enabled: null,
      bbCapacity: {
        trx: null
      }
    },
    lte: {
      enabled: null,
      bbCapacity: {
        rcs: null,
        bcs: null,
        ecs: null
      }
    },
    wcdma: {
      enabled: null,
      bbCapacity: {
        su: null,
      }
    }
  },
  smDeployment: [
    {
      fsmf:{
        technology: null,
      },
      extension:[
        {
          technology: null,
          fbbx: null
        },
        {
          technology: null,
          fbbx: null
        }
      ]
    },
    {
      fsmf:{
        technology: null,
      },
      extension:[
        {
          technology: null,
          fbbx: null
        },
        {
          technology: null,
          fbbx: null
        }
      ]
    }
  ]
};

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
  $scope.filterObject = filterObject;

  $scope.getConfigurations = ConfigurationService.getConfigurations();

  $scope.displaySMDeployment = function(smDeployment,index){
    return displaySMDeployment(smDeployment,index);
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

  console.log(smDeployment.extension.length);
  for(var i=0; i<smDeployment.extension.length; i++){
    str += " + "+smDeployment.extension[i].fbbx+":"+smDeployment.extension[i].technology;
  }
  
  return str;
}

function displaySMDeployment(smDeployment,index){
  var str = "";
  if(smDeployment[index]!=null){
    str += "SM"+index+" [ "+parseSMD(smDeployment[index])+" ]";
  }
  return str;
}
