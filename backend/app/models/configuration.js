var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');

var CreateConfigurationSchema = function() {
  var Schema = mongoose.Schema;
  var technologySchema = {type: String, enum: ['GSM','LTE','WCDMA']};
  var ExtensionCardSchema = new Schema({
    technology:technologySchema,
    fbbx:String
  })
  var SmDeploymentSchema = new Schema({
    fsmf: {
      technology:technologySchema,
    },
    extension:[ExtensionCardSchema]
  })
  var ConfigurationSchema = new Schema({
    configId: {type:String,default:''},
    smMode: {
      gsm:{
        enabled:{type:Boolean,default:false},
        bbCapacity:{type:Number,default:null}
      },
      lte:{
        enabled:{type:Boolean,default:false},
        bbCapacity:{
          rcs:{type:Number,default:null},
          bcs:{type:Number,default:null},
          ecs:{type:Number,default:null}
        }
      },
      wcdma:{
        enabled:{type:Boolean,default:false},
        bbCapacity:{type:Number,default:null}
      }
    },
    smDeployment:[SmDeploymentSchema]
  })
  return ConfigurationSchema;
}

var Configuration = mongoose.model('Configuration',CreateConfigurationSchema(),'configurations')

module.exports = {
  model: Configuration,
  insert: function(configurationJson, callback) {
    Configuration.create(configurationJson, callback)
  },
  getBbCapacities: function(technology,callback) {
    return Configuration.distinct('smMode.'+technology+'.bbCapacity', callback);
  },
}
