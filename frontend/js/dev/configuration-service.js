'use strict';

angular.module('configurationSelector',['mgcrea.ngStrap'])
  .service('ConfigurationService', function ConfigurationService() {
    this.getConfigurations = function() {
      return mockData;
    };
  });
