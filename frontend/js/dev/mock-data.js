var mockOneData=[{
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
  }
];

var mockData=[
{
  configId: 'SM_LWG6',
  smMode: {
    gsm: {enabled:true,bbCapacity:{trx:24}},
    lte: {enabled:true,bbCapacity: {rcs:0,bcs:1,ecs:1}},
    wcdma: {enabled:true,bbCapacity: {su:15.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBA'}
      ]
    },
    {
      fsmf:{technology:'LTE',},
      extension:[
        {technology:'LTE',fbbx:'FBBC'},
        {technology:'LTE',fbbx:'FBBC'}
      ]
    }
  ]
},
{
  configId: 'SM_G1',
  smMode: {
    gsm: {enabled:true,bbCapacity:{trx:24}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:false,bbCapacity: {su:0,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'GSM',},
      extension:[]
    }
  ]
},
{
  configId: 'SM_G2',
  smMode: {
    gsm: {enabled:true,bbCapacity:{trx:24}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:false,bbCapacity: {su:0,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'GSM',},
      extension:[
        {technology:'GSM',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_L1',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:true,bbCapacity: {rcs:0,bcs:3,ecs:0}},
    wcdma: {enabled:false,bbCapacity: {su:0,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'LTE',},
      extension:[
        {technology:'LTE',fbbx:'FBBC'},
        {technology:'LTE',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBA'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBC'},
        {technology:'WCDMA',fbbx:'FBBA'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBC'},
        {technology:'WCDMA',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_LW3',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:true,bbCapacity: {rcs:0,bcs:1,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBA'},
      ]
    },
    {
      fsmf:{technology:'LTE',},
      extension:[]
    }
  ]
},
// repeated data
{
  configId: 'SM_LWG6',
  smMode: {
    gsm: {enabled:true,bbCapacity:{trx:24}},
    lte: {enabled:true,bbCapacity: {rcs:0,bcs:1,ecs:1}},
    wcdma: {enabled:true,bbCapacity: {su:15.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBA'}
      ]
    },
    {
      fsmf:{technology:'LTE',},
      extension:[
        {technology:'LTE',fbbx:'FBBC'},
        {technology:'LTE',fbbx:'FBBC'}
      ]
    }
  ]
},
{
  configId: 'SM_G1',
  smMode: {
    gsm: {enabled:true,bbCapacity:{trx:24}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:false,bbCapacity: {su:0,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'GSM',},
      extension:[]
    }
  ]
},
{
  configId: 'SM_G2',
  smMode: {
    gsm: {enabled:true,bbCapacity:{trx:24}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:false,bbCapacity: {su:0,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'GSM',},
      extension:[
        {technology:'GSM',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_L1',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:true,bbCapacity: {rcs:0,bcs:3,ecs:0}},
    wcdma: {enabled:false,bbCapacity: {su:0,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'LTE',},
      extension:[
        {technology:'LTE',fbbx:'FBBC'},
        {technology:'LTE',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBA'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBC'},
        {technology:'WCDMA',fbbx:'FBBA'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_W',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:false,bbCapacity: {rcs:0,bcs:0,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBC'},
        {technology:'WCDMA',fbbx:'FBBC'},
      ]
    }
  ]
},
{
  configId: 'SM_LW3',
  smMode: {
    gsm: {enabled:false,bbCapacity:{trx:0}},
    lte: {enabled:true,bbCapacity: {rcs:0,bcs:1,ecs:0}},
    wcdma: {enabled:true,bbCapacity: {su:17.5,}}
  },
  smDeployment: [
    {
      fsmf:{technology:'WCDMA',},
      extension:[
        {technology:'WCDMA',fbbx:'FBBA'},
        {technology:'WCDMA',fbbx:'FBBA'},
      ]
    },
    {
      fsmf:{technology:'LTE',},
      extension:[]
    }
  ]
},
];
