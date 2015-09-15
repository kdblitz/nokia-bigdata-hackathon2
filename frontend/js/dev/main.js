'use strict';

var app = angular.module('configurationSelector');

var filterObject = {
  configId: '',
  smMode: {
    gsm: {
      enabled: false,
      bbCapacity: {
        trx: ''
      }
    },
    lte: {
      enabled: false,
      bbCapacity: {
        rcs: '',
        bcs: '',
        ecs: ''
      }
    },
    wcdma: {
      enabled: false,
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

var toggleTechnology = function(technology) {
  var tech = filterObject.smMode[technology];
  if (tech.enabled) {
    console.log('here');
    angular.forEach(tech.bbCapacity, function(value, key) {
      tech.bbCapacity[key] = '';
    }
  )}
  tech.enabled = !tech.enabled;
};

app.controller('FilterController', function($scope, ConfigurationService){
  $scope.toggleTechnology = toggleTechnology;
  $scope.filterObject = filterObject;

  $scope.getConfigurations = ConfigurationService.getConfigurations();

  $scope.displaySMMode = function(smMode){
    return displaySMMode(smMode);
  }

  $scope.displaySMDeployment = function(smDeployment,index){
    return displaySMDeployment(smDeployment,index);
  }

  $scope.displayResult = {
    enabled:false,
    displayObject:null,
  };

  $scope.handleOutputEvent = function(result){
    $scope.displayResult.enabled = true;
    $scope.displayResult.displayObject = displayObject(result);
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
    if (card === allCards) {
      card = '';
    }
    $scope.filterObject.smDeployment[deployment].extension[extension].fbbx = card;
  };
  $scope.getSelectedExtension = function(deployment, extension) {
    var selectedCard = $scope.filterObject.smDeployment[deployment].extension[extension].fbbx;
    if (selectedCard === '') {
      selectedCard = allCards;
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
    scope: {
      deployment: "="
    },
    templateUrl: 'systemModule.html',
    link: function(scope) {
      scope.getSelectedExtension = scope.$parent.getSelectedExtension;
      scope.setSelectedExtension = scope.$parent.setSelectedExtension;
      scope.extensionOptions = scope.$parent.extensionOptions;
    }
  };
});

app.directive('mainOutput', function() {
  return {
    restrict: 'E',
    templateUrl: 'mainOutput.html'
  };
});

app.directive('configurations', function() {
  return {
    restrict: 'E',
    templateUrl: 'configurations.html'
  };
});

app.filter('config', function() {
  return function(input) {
    var filteredList = [];
    angular.forEach(input, function(value, key) {
      if(filterObject.smMode.lte.enabled == value.smMode.lte.enabled &&
         filterObject.smMode.wcdma.enabled == value.smMode.wcdma.enabled &&
         filterObject.smMode.gsm.enabled == value.smMode.gsm.enabled &&
         bbCapacityFilter('lte','rcs',value.smMode.lte.bbCapacity.rcs) &&
         bbCapacityFilter('lte','bcs',value.smMode.lte.bbCapacity.bcs) &&
         bbCapacityFilter('lte','ecs',value.smMode.lte.bbCapacity.ecs) &&
         bbCapacityFilter('wcdma','su',value.smMode.wcdma.bbCapacity.su) &&
         bbCapacityFilter('gsm','trx',value.smMode.gsm.bbCapacity.trx)) {
			  filteredList.push(value);
      }
    });
    return filteredList;
  };
});

var bbCapacityFilter = function(technology, baseband, value) {
  if( filterObject.smMode[technology].bbCapacity[baseband] != '') {
    return (filterObject.smMode[technology].bbCapacity[baseband] == value)
  }
  return true;
}

function parseSMD(smDeployment){
  var str = "";
  str += "FSMF:"+smDeployment.fsmf.technology;

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

function displaySMMode(smMode){
  var str = "";
  if(smMode.lte.enabled){
    str += "L";
  }
  if(smMode.wcdma.enabled){
    str += "W";
  }
  if(smMode.gsm.enabled){
    str += "G";
  }
  return str;
}

function displayObject(result) {
  var displayObject = {
    sm1:{
      enabled:false,
      fsmf:{enabled:false,strval:""},
      fbbx1:{enabled:false,strval:""},
      fbbx2:{enabled:false,strval:""},
    },
    sm2:{
      enabled:false,
      fsmf:{enabled:false,strval:""},
      fbbx1:{enabled:false,strval:""},
      fbbx2:{enabled:false,strval:""},
    }
  }
  constructDisplayObjectSM(displayObject.sm1, result.smDeployment[0]);
  constructDisplayObjectSM(displayObject.sm2, result.smDeployment[1]);

  console.log(displayObject);
  return displayObject;
}

function constructDisplayObjectSM(displayObjectSM, resultSM){
  if(resultSM!=null){
    displayObjectSM.enabled=true;
    displayObjectSM.fsmf.enabled=true;
    displayObjectSM.fsmf.strval="FSMF:"+resultSM.fsmf.technology;
    if(resultSM.extension!=null && resultSM.extension[0]!=null){
      displayObjectSM.fbbx1.enabled=true;
      displayObjectSM.fbbx1.strval=resultSM.extension[0].fbbx+":"+resultSM.extension[0].technology;
      if(resultSM.extension[1]!=null){
        displayObjectSM.fbbx2.enabled=true;
        displayObjectSM.fbbx2.strval=resultSM.extension[1].fbbx+":"+resultSM.extension[1].technology;
      }
    }
  }
  return;
}
