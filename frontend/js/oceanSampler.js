angular.module('ui.bootstrap.demo', ['ui.bootstrap', 'oceanBootstrap']);

angular.module('ui.bootstrap.demo').controller('PlunkerCtrl', function(){});

angular.module("ui.bootstrap.demo").controller("obAlertCtrl", function($scope, $document, alertFactory){
  $scope.title = "Test title";
  $scope.msg = "This is sample message."
  $scope.timeout = 3000;
  $scope.details = "Lorem ipsum dolor sit amet";

  var callAlert = function (aType){
    alertFactory.showAlert({
      type:aType,
      msg:$scope.msg,
      title:$scope.title,
      details:$scope.details,
      minAlerts: 3,
      timeout:$scope.timeout,
    });
  }
  $scope.successAlert = function(){    
    callAlert("success");
  }

  $scope.warningAlert = function(){
    callAlert("warning");
  }
  $scope.dangerAlert = function(){
    callAlert("danger");
  }
  $scope.infoAlert = function(){
    callAlert("info");
  }
}).controller("obLazyCtrl", function($scope){
  function randStr(){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }
  $scope.objs = [];
  $scope.lmt = 0;
  for(var i=0; i<8000; i++)
    $scope.objs.push({value: i, text: randStr()});
});