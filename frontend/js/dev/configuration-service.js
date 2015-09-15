'use strict';
angular.module('configurationSelector',[])
  .service('ConfigurationService', function($http) {
    return {
      getConfigurations: function() {
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/api/getConfigs',
        });
      },
    };
  });

angular.module('configurationSelector',['mgcrea.ngStrap'])
  .service('ConfigurationService', function ConfigurationService() {
    this.getConfigurations = function() {
      return mockData;
    };
  });
