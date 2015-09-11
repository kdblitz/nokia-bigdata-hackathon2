var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var FRONTEND_PATH = '../frontend'

gulp.task('connect', function() {
  var express    = require('express');        // call express
  var app        = express();                 // define our app using express
  var bodyParser = require('body-parser');
  var mongoose   = require('mongoose');

  //  mongoose.connect('mongodb://localhost/local');

  //  var Point     = require('./app/models/point');

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var port = process.env.PORT || 8080;        // set our port

  // ROUTES FOR OUR API
  var router = express.Router();              // get an instance of the express Router

  router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });
  });

  // router.route('/points')
  //     .get(function(req, res){
  //       getAllPoints(req, res);
  //     });


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
    FRONTEND_PATH + '/*.html',
    FRONTEND_PATH + '/*.css',
    FRONTEND_PATH + '/*.js'
  ]).on('change', function (file) {
    $.livereload.changed(file.path);
  });

  gulp.watch(FRONTEND_PATH+'/*.js',['jshint']);
});

gulp.task('jshint', function() {
  return gulp.src(FRONTEND_PATH+'/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
});

gulp.task('default', ['connect','watch'], function() {
  require('opn')('http://localhost:8080');
});
