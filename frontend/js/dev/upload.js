var app = angular.module('configurationSelector');

app.directive('uploadedConfigurationsPanel', function() {
  return {
    templateUrl: 'uploadPanel.html',
    restrict:'E',
    controller: function($scope, $modal) {
      $scope.showUploadModal = function() {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'uploadModal.html',
          controller: 'UploadConfigCtrl',
        });
      };
    }
  };
});

app.controller('UploadConfigCtrl', function($scope, $modalInstance, fileUpload) {
  $scope.uploadFile = function() {
    var file = $scope.myFile
    var uploadUrl = '/api/upload';
    $('#uploadButton').prop('disabled', true);
    fileUpload.uploadFileToUrl(file, uploadUrl).then(
      function(json) {
        $modalInstance.close();
        // $alert(
        //   {title:'Upload complete :)',
        //   content:json.message,
        //   placement:'top-right',
        //   type: (json.status === 'success')? json.status:'warning',
        //   show:true
        // });
      }, function(json) {
      //   $alert(
      //     {title:'Upload failed :(',
      //     content:'Something is went wrong during the upload process.',
      //     placement:'top-right',
      //     type: 'danger',
      //     show:true
      //   });
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancelled');
  }

  $(document).on('change', '.btn-file :file', function() {
    var uploadButton = $(this),
      chosenFile = uploadButton.val(),
      label = uploadButton.parents('.input-group').find(':text');
    label.val(chosenFile);

    $('#uploadButton').prop('disabled', false);
  });

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
    return $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    });
  };
});
