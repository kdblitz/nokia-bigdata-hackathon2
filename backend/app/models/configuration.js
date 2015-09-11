var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');
var Schema = mongoose.Schema;

var ConfigurationSchema = new Schema({  
});

module.exports = mongoose.model('Configuration',ConfigurationSchema,'configurations')
