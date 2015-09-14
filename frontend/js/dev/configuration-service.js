'use strict';

angular.module('configurationSelector',[])
  .service('ConfigurationService', function ConfigurationService() {
    this.getConfigurations = function() {
      return mockData;
    };
  });
