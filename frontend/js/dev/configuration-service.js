'use strict';
angular.module('configurationSelector',['mgcrea.ngStrap','ngAnimate'])
  .service('ConfigurationService', function($http) {
    return {
      getConfigurations: function() {
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/api/getConfigs',
        });
      },
      getBbCapacityValues: function(query) {
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/api/getBbCapacities/'+query,
        });
      }
    };
  });
