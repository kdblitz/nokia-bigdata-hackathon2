var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var FRONTEND_PATH = '../frontend'

var configurations;
var importFileToMongoDb;

gulp.task('mongoDbApi', function() {
  configurations = require('./app/models/configuration');
  var fileReader = require('./app/models/fileReader');
  var csvConverter = require('./app/models/csvConverter');
  var path = require('path');

  importFileToMongoDb = function (req, res) {
    var insertCount = 0;
    var errorLines = [];
    var responseFunction = function() {
      if (errorLines.length === 0) {
        res.status(200).send({
          'status':'success',
          'message':"Successfully added "+insertCount+" configuration(s)!"
        });
      } else {
        res.status(200).send({
          'status':'failed',
          'message':"Successfully added "+insertCount+" configuration(s), but encountered "+errorLines.length+" error(s).",
          'errors':JSON.stringify(errorLines)
        });
      }
    }

    fileReader.read(req.body.file.path, function(line) {
      var configJson = csvConverter(line);
      if (configJson !== null) {
        configurations.insert(configJson,function(err) {
          if (err) {
            console.log("insert failed: " + line + " due to" + err + ".")
            errorLines.push(line);
          }
          else {
            console.log((++insertCount) + ":" + line + " inserted.")
          }
        });
      }
    },responseFunction);
  }
});

gulp.task('connect',['mongoDbApi'], function() {
  var express    = require('express');        // call express
  var app        = express();                 // define our app using express
  var bodyParser = require('body-parser');
  var formidable = require('express-formidable');

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(formidable.parse());

  var port = process.env.PORT || 8080;        // set our port

  // ROUTES FOR OUR API
  var router = express.Router();              // get an instance of the express Router

  router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });
  });

  router.post('/upload', importFileToMongoDb);

  router.get('/getBbCapacities/:technology', function(req, res){
    configurations.getBbCapacities(req.params.technology, function(err,bbCapacities) {
      if (err)
        res.send(err);
      res.json(bbCapacities);
    })
  });

  router.get('/getConfigs',function(req,res){
    configurations.getAllConfigurations(function(err,configurations){
      if (err)
        res.send(err);
      res.json(configurations);
    })
  });

  // REGISTER OUR ROUTES -------------------------------
  app.use('/api', router);
  app.use(require('connect-livereload')())
  app.use(express.static(FRONTEND_PATH));

  // START THE SERVER
  // =============================================================================
  app.listen(port);
  console.log('Server running on port ' + port);
});

gulp.task('watch', function() {
  $.livereload.listen();

  // Watch for changes and notify LR server
  gulp.watch([
    FRONTEND_PATH + '/**/*.html',
    FRONTEND_PATH + '/**/*.css',
    FRONTEND_PATH + '/**/*.js'
  ]).on('change', function (file) {
    $.livereload.changed(file.path);
  });

  gulp.watch(FRONTEND_PATH+'/**/*.js',['jshint']);
});

gulp.task('jshint', function() {
  return gulp.src(FRONTEND_PATH+'/js/dev/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
});

gulp.task('default', ['connect','watch'], function() {
  require('opn')('http://localhost:8080');
});
