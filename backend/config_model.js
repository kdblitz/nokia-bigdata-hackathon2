{
  config_id: '',
  sm_mode: {
    gsm: {
      enabled:[true|false],
      bb_capacity:{
        trx:[0|24]
      }
    },
    lte: {
      enabled:[true|false],
      bb_capacity: {
        rcs:0|1|2|3,
        bcs:0|1|2|3,
        ecs:0|1|2|3
      }
    },
    wcdma: {
      enabled:[true|false],
      bb_capacity: {
        su:[5.5|15.5|...],
      }
    }
  },
  sm_deployment: [
    {
      fsmf:{
        technology:['GSM'|'LTE'|'WCDMA'],
      },
      extension:[
        {
          technology:['GSM'|'LTE'|'WCDMA'],
          fbbx:['FBBA'|'FBBC']
        },...(up to 2)
      ]
    },...(up to 2)
  ]
}
