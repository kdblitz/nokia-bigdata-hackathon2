<<<<<<< HEAD
(function(){
  var app = angular.module('configurationSelector', []);

  app.controller('FilterController', ['$scope', function($scope){
    $scope.test = 'test';
  }]);

  app.directive('technologies', function(){
    return {
      restrict: 'E',
      templateUrl: 'technologies.html'
    };
  });

  app.directive('systemModule', function(){
    return {
      restrict: 'E',
      templateUrl: 'systemModule.html'
    };
  });

  app.directive('configurations', function(){
    return {
      restrict: 'E',
      templateUrl: 'configurations.html'
    };
  });
})();
=======
var app = angular.module('configurationSelector');

app.controller('FilterController', function($scope, ConfigurationService){
  console.log(ConfigurationService.getConfigurations())
  $scope.test = 'test';
});

app.directive('technologies', function(){
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
>>>>>>> 3c76f17282184b9c8f2336391f88ca7ba5e9a40e
