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
