'use strict';
angular.module('configurationSelector',['ui.bootstrap','ngAnimate'])
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
