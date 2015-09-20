'use strict';

var app = angular.module('configurationSelector');

var anyCard = 'Any';
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
      extension:[
        {
          fbbx: anyCard
        },
        {
          fbbx: anyCard
        }
      ]
    }
]};

var toggleTechnology = function(technology) {
  var tech = filterObject.smMode[technology];
  if (tech.enabled) {
    angular.forEach(tech.bbCapacity, function(value, key) {
      tech.bbCapacity[key] = '';
    }
  )}
  tech.enabled = !tech.enabled;
};

app.controller('FilterController', function($scope, $animate, ConfigurationService){
  $scope.toggleTechnology = toggleTechnology;
  $scope.filterObject = filterObject;

  ConfigurationService.getConfigurations().then(function(response) {
    $scope.getConfigurations = response.data;
  }, function(err) {
    console.err(err);
  });

  var bbCapacityValues = {
    lte: {rcs:[],bcs:[],ecs:[]},
    wcdma: [],
    gsm: []
  };

  ConfigurationService.getBbCapacityValues('wcdma').then(function(response) {
    _.each(response.data,function(value) {
      bbCapacityValues.wcdma.push(value);
    });
  }, function(err) {
    console.err(err);
  });

  ConfigurationService.getBbCapacityValues('gsm').then(function(response) {
    _.each(response.data,function(value) {
      bbCapacityValues.gsm.push(value);
    });
  }, function(err) {
    console.err(err);
  });

  ConfigurationService.getBbCapacityValues('lte-rcs').then(function(response) {
    _.each(response.data,function(value) {
      bbCapacityValues.lte.rcs.push(value);
    });
  }, function(err) {
    console.err(err);
  });

  ConfigurationService.getBbCapacityValues('lte-bcs').then(function(response) {
    _.each(response.data,function(value) {
      bbCapacityValues.lte.bcs.push(value);
    });
  }, function(err) {
    console.err(err);
  });

  ConfigurationService.getBbCapacityValues('lte-ecs').then(function(response) {
    _.each(response.data,function(value) {
      bbCapacityValues.lte.ecs.push(value);
    });
  }, function(err) {
    console.err(err);
  });

  $scope.displaySMDeployment = function(smDeployment,index){
    return displaySMDeployment(smDeployment,index);
  }

  $scope.displayResult = {
    enabled:false,
    displayObject:null,
  };

  $scope.handleOutputEvent = function(result, rowIndex){
    $scope.displayResult.enabled = true;
    $scope.displayResult.displayObject = displayObject(result);
    $scope.selectedRow = rowIndex;
  }

  $scope.clearDisplayData = function(){
    console.log("clearing...");
    $scope.selectedRow = -1;
    $scope.displayResult = {
      enabled:false,
      displayObject:null,
    };
    console.log("cleared!");
  }

  $scope.extensionOptions = [anyCard, 'FBBA', 'FBBC'];
  $scope.setSelectedExtension = function(deployment, extension, card) {
    $scope.filterObject.smDeployment[deployment].extension[extension].fbbx = card;
  };
  $scope.getSelectedExtension = function(deployment, extension) {
    return $scope.filterObject.smDeployment[deployment].extension[extension].fbbx;
  };
  $scope.addDeployment = function() {
    $scope.filterObject.smDeployment.push(
      {
        extension:[
          {
            fbbx: anyCard
          },
          {
            fbbx: anyCard
          }
        ]
      }
    );
  }
  $scope.removeDeployment = function() {
    $scope.filterObject.smDeployment.pop();
  }

  $scope.getBBCapacityValuesForRcsLTE = function() {
    return bbCapacityValues.lte.rcs;
  };
  $scope.getBBCapacityValuesForBcsLTE = function() {
    return bbCapacityValues.lte.bcs;
  };
  $scope.getBBCapacityValuesForEcsLTE = function() {
    return bbCapacityValues.lte.ecs;
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
      scope.filterObject = scope.$parent.filterObject;
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
         bbCapacityFilter(filterMode, 'wcdma', 'su', dataMode.wcdma.bbCapacity) &&
         bbCapacityFilter(filterMode, 'gsm', 'trx', dataMode.gsm.bbCapacity);
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
    if (filterExtension.fbbx != anyCard) {
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
