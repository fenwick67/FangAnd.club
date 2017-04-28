var gulp        = require('gulp');
var pug         = require('gulp-pug');
var serve       = require('gulp-serve');
var locals      = require('./locals.js');
var browserSync = require('browser-sync').create();


// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve-bs',['pug'], function () {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

});

gulp.task('serve-static',serve('./'))
gulp.task('watch-static',function(){
  gulp.watch('*.pug', ['pug']);
});

gulp.task('srcInject',function(){
  // inject my locals into src files
  var toInject = 'var locals = '+JSON.stringify(locals) + ';\r\n\r\n';
  return gulp.src('*.src')
  .pipe(function(){
    
  })
  .pipe(gulp.dest("./"));

});

gulp.task('pug', function buildHTML() {

  return gulp.src('*.pug')
  .pipe(pug({
    // Your options in here.
    locals:locals
  }))
  .pipe(gulp.dest("./"));
});

gulp.task('reload',['pug'],function(){
  browserSync.reload();
});

// Rerun the task when a file changes
gulp.task('watch-bs', function() {
  gulp.watch('*.pug', ['pug','reload']);
});

gulp.task('default',['pug','watch-static','serve-static']);
gulp.task('dev',['watch-bs','pug','serve-bs','reload'])

// note that adding the "reader" script is not done here, but manually.
