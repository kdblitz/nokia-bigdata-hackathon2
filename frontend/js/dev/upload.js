var app = angular.module('configurationSelector');

app.directive('uploadedConfigurationsPanel', function() {
  return {
    templateUrl: 'uploadPanel.html',
    restrict:'E',
    /*link:function($scope) {
      /*var uploadConfigModal = $modal({
        scope:$scope,
        template: '',
        show:false
      });

      $scope.showUploadModal = function() {
        uploadConfigModal.$promise.then(uploadConfigModal.show);
      };
    }*/
  };
});

app.directive('fileModel', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
});

app.service('fileUpload', function ($http) {
  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    fd.append('file', file);
    console.log(fd);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(){
    })
    .error(function(){
    });
  };
});

app.controller('uploadCtrl', function($scope, fileUpload){
  $scope.uploadFile = function(){
    var file = $scope.myFile;
    console.log('file is ' );
    console.dir(file);
    var uploadUrl = '/api/upload';
    fileUpload.uploadFileToUrl(file, uploadUrl);
  };
});
