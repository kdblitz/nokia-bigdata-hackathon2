'use strict';

var app = angular.module('configurationSelector');

var filterObject = {
  configId: '',
  smMode: {
    gsm: {
      enabled: '',
      bbCapacity: {
        trx: ''
      }
    },
    lte: {
      enabled: '',
      bbCapacity: {
        rcs: '',
        bcs: '',
        ecs: ''
      }
    },
    wcdma: {
      enabled: '',
      bbCapacity: {
        su: '',
      }
    }
  },
  smDeployment: [
    {
      fsmf:{
        technology: '',
      },
      extension:[
        {
          technology: '',
          fbbx: ''
        },
        {
          technology: '',
          fbbx: ''
        }
      ]
    },
    {
      fsmf:{
        technology: '',
      },
      extension:[
        {
          technology: '',
          fbbx: ''
        },
        {
          technology: '',
          fbbx: ''
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

  var noCard = 'No card';
  var allCards = "All cards";
  $scope.extensionOptions = [noCard, allCards, 'FBBA', 'FBBC'];
  $scope.setSelectedExtension = function(deployment, extension, card) {
    $scope.filterObject.smDeployment[deployment].extension[extension].fbbx = card;
  };
  $scope.getSelectedExtension = function(deployment, extension) {
    var selectedCard = $scope.filterObject.smDeployment[deployment].extension[extension].fbbx;
    if (selectedCard === '') {
      selectedCard = allCards;
    }
    else if (selectedCard === null) {
      selectedCard = noCard;
    }
    return selectedCard;
  };

  $scope.getBBCapacityValuesForLTE = function() {
    return bbCapacityValues.lte;
  };
  $scope.getBBCapacityValuesForWCDMA = function() {
    return bbCapacityValues.wcdma;
  };
  $scope.getBBCapacityValuesForGSM = function() {
    return bbCapacityValues.gsm;
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
