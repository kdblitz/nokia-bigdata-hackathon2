var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');

var CreateConfigurationSchema = function() {
  var Schema = mongoose.Schema;
  var technologySchema = {type: String, enum: ['','GSM','LTE','WCDMA']};
  var ExtensionCardSchema = new Schema({
    technology:technologySchema,
    fbbx:String
  })
  var SmDeploymentSchema = new Schema({
    fsmf: {
      technology:[technologySchema],
    },
    extension:[ExtensionCardSchema]
  })
  var ConfigurationSchema = new Schema({
    configId: {type:String,default:''},
    smMode: {
      gsm:{
        enabled:{type:Boolean,default:false},
        bbCapacity:{type:Number,default:0}
      },
      lte:{
        enabled:{type:Boolean,default:false},
        bbCapacity:{
          rcs:{type:Number,default:0},
          bcs:{type:Number,default:0},
          ecs:{type:Number,default:0}
        }
      },
      wcdma:{
        enabled:{type:Boolean,default:false},
        bbCapacity:{type:Number,default:0}
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
  getAllConfigurations: function(callback){
    return Configuration.find(callback);
  }
}
