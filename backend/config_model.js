{
  configId: '',
  smMode: {
    gsm: {
      enabled:[true|false],
      bbCapacity:{
        trx:[0|24]
      }
    },
    lte: {
      enabled:[true|false],
      bbCapacity: {
        rcs:0|1|2|3,
        bcs:0|1|2|3,
        ecs:0|1|2|3
      }
    },
    wcdma: {
      enabled:[true|false],
      bbCapacity: {
        su:[5.5|15.5|...],
      }
    }
  },
  smDeployment: [
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
