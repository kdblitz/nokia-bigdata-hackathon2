var app = angular.module('configurationSelector');

app.directive('uploadedConfigurationsPanel', function($modal) {
  return {
    templateUrl: 'uploadPanel.html',
    restrict:'E',
    controller: function($scope, $alert, fileUpload) {
      var uploadConfigModal = $modal({
        scope:$scope,
        template: 'uploadModal.html',
        show:false
      });

      $scope.showUploadModal = function() {
        uploadConfigModal.$promise.then(uploadConfigModal.show);
      };

      $scope.uploadFile = function(){
        var file = uploadConfigModal.$scope.myFile;
        var uploadUrl = '/api/upload';
        fileUpload.uploadFileToUrl(file, uploadUrl);
        uploadConfigModal.hide();
      };
    }
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

app.service('fileUpload', function ($http, $alert) {
  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    fd.append('file', file);
    console.log(fd);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(json){
      $alert(
        {title:'Upload complete :)',
        content:json.message,
        placement:'top-right',
        type: (json.status === 'success')? json.status:'warning',
        show:true
      });
    }).error(function(){
      $alert(
        {title:'Upload failed :(',
        content:'Something is went wrong during the upload process.',
        placement:'top-right',
        type: 'danger',
        show:true
      });
    });
  };
});
