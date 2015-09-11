'use strict';

angular.module('configurationSelector',[])
  .service('ConfigurationService', function ConfigurationService() {
    this.getConfigurations = function() {
      return {
        configId: 'SM_LWG6',
        smMode: {
          gsm: {
            enabled:true,
            bbCapacity:{
              trx:24
            }
          },
          lte: {
            enabled:true,
            bbCapacity: {
              rcs:0,
              bcs:1,
              ecs:1
            }
          },
          wcdma: {
            enabled:true,
            bbCapacity: {
              su:15.5,
            }
          }
        },
        smDeployment: [
          {
            fsmf:{
              technology:'WCDMA',
            },
            extension:[
              {
                technology:'WCDMA',
                fbbx:'FBBA'
              },
              {
                technology:'WCDMA',
                fbbx:'FBBA'
              }
            ]
          },
          {
            fsmf:{
              technology:'LTE',
            },
            extension:[
              {
                technology:'LTE',
                fbbx:'FBBC'
              },
              {
                technology:'LTE',
                fbbx:'FBBC'
              }
            ]
          }
        ]
      };
    };
  });
