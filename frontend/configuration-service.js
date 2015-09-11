'use strict';

angular.module('configurationSelector',[])
  .service('ConfigurationService', function ConfigurationService() {
    this.getConfigurations = function() {
      return {
        config_id: 'SM_LWG6',
        sm_mode: {
          gsm: {
            enabled:true,
            bb_capacity:{
              trx:24
            }
          },
          lte: {
            enabled:true,
            bb_capacity: {
              rcs:0,
              bcs:1,
              ecs:1
            }
          },
          wcdma: {
            enabled:true,
            bb_capacity: {
              su:15.5,
            }
          }
        },
        sm_deployment: [
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
    }
  });
