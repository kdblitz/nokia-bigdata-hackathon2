'use strict';

var app = angular.module('configurationSelector');

var defaultDeployment = {
  extension:[
    {
      fbbx: 'Any Card'
    },
    {
      fbbx: 'Any Card'
    }
  ]
};

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
  smDeployment: [defaultDeployment]
};

var toggleTechnology = function(technology) {
  var tech = filterObject.smMode[technology];
  if (tech.enabled) {
    angular.forEach(tech.bbCapacity, function(value, key) {
      tech.bbCapacity[key] = '';
    }
  )}
  tech.enabled = !tech.enabled;
};

app.controller('FilterController', function($scope, ConfigurationService){
  $scope.getConfigurations = ConfigurationService.getConfigurations();
  $scope.toggleTechnology = toggleTechnology;
  $scope.filterObject = filterObject;

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

  var anyCard = 'Any Card';
  $scope.extensionOptions = [anyCard, 'FBBA', 'FBBC'];
  $scope.deployments = 1;
  $scope.setSelectedExtension = function(deployment, extension, card) {
    $scope.filterObject.smDeployment[deployment].extension[extension].fbbx = card;
  };
  $scope.getSelectedExtension = function(deployment, extension) {
    return $scope.filterObject.smDeployment[deployment].extension[extension].fbbx;
  };
  $scope.addDeployment = function() {
    $scope.deployments++;
    $scope.filterObject.smDeployment.push(defaultDeployment);
  }
  $scope.removeDeployment = function() {
    $scope.deployments--;
    $scope.filterObject.smDeployment.pop();
  }

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
    angular.forEach(input, function(configurations, key) {
      if (isMatchingTechnologyMode(filterObject.smMode,configurations.smMode) && isMatchingDeployment(filterObject.smDeployment,configurations.smDeployment)) {
			  filteredList.push(configurations);
      }
    });
    return filteredList;
  };
});

function isMatchingTechnologyMode(filterMode,dataMode) {
  return filterMode.lte.enabled == dataMode.lte.enabled &&
         filterMode.wcdma.enabled == dataMode.wcdma.enabled &&
         filterMode.gsm.enabled == dataMode.gsm.enabled &&
         bbCapacityFilter(filterMode, 'lte', 'rcs', dataMode.lte.bbCapacity.rcs) &&
         bbCapacityFilter(filterMode, 'lte', 'bcs', dataMode.lte.bbCapacity.bcs) &&
         bbCapacityFilter(filterMode, 'lte', 'ecs', dataMode.lte.bbCapacity.ecs) &&
         bbCapacityFilter(filterMode, 'wcdma', 'su', dataMode.wcdma.bbCapacity.su) &&
         bbCapacityFilter(filterMode, 'gsm', 'trx', dataMode.gsm.bbCapacity.trx);
}

function bbCapacityFilter(filterMode, technology, baseband, value) {
  if (filterMode[technology].bbCapacity[baseband] != '') {
    return (filterObject.smMode[technology].bbCapacity[baseband] == value)
  }
  return true;
}


function isMatchingDeployment(filterDeployments,dataDeployments) {
  for (var i = 0; i < filterDeployments.length; i++) {
    var filterDeployment = filterDeployments[i];
    var dataDeployment = dataDeployments[i];
    if (dataDeployment == undefined) {
      return false;
    }
    else if (!isMatchingExtensions(filterDeployment.extension,dataDeployment.extension)) {
      return false;
    }
  }
  if (dataDeployments.length > filterDeployments.length) {
    return false;
  }
  return true;
}

function isMatchingExtensions(filterExtensions,dataExtensions) {
  for (var j = 0; j < filterExtensions.length; j++) {
    var filterExtension = filterExtensions[j];
    var dataExtension = dataExtensions[j];
    if (filterExtension.fbbx != 'Any Card') {
      if (dataExtension == undefined) {
        return false;
      }
      else if (filterExtension.fbbx != dataExtension.fbbx) {
        return false;
      }
    }
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
