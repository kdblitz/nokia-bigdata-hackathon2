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
