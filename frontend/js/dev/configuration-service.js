'use strict';

// angular.module('configurationSelector',[])
//   .service('ConfigurationService', function ConfigurationService($http) {
//     this.getConfigurations = function() {
//       //var url = 'http://localhost:8080/api/getConfigs';
//       $http({
//         method: 'GET',
//         url: 'http://localhost:8080/api/getConfigs',
//       })
//       .success(function(data){
//         //callback(data);
//         console.log(data);
//         return data;
//       }).error(function(){
//         alert("error");
//         return mockData;
//       });
//     };
//   });

  angular.module('configurationSelector',[])
    .service('ConfigurationService', function($http) {
      return {
        getConfigurations: function() {
          //var url = 'http://localhost:8080/api/getConfigs';
          return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/getConfigs',
          });
        },
      };
    });
