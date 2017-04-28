var gulp        = require('gulp');
var pug         = require('gulp-pug');
var serve       = require('gulp-serve');
var locals      = require('./locals.js');
var browserSync = require('browser-sync').create();
var rename      = require('gulp-rename');
var insert      = require('gulp-insert');
var replace     = require('gulp-replace');
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

/*
  This magical function takes .src files and injects the local js vars into it.
*/
gulp.task('injectLocals',function(){
  // inject my locals into src files
  var toInject = 'var locals = '+JSON.stringify(locals) + ';\r\n\r\n';
  return gulp.src('./*.src')
    .pipe(insert.prepend(toInject))
    .pipe(rename(function(path){
      // remove the .src
      path.extname = path.extname.replace(/\.src/i,'')
    }))
    .pipe(gulp.dest("./"));
});

/*
  This magical function takes ebook html files and
  injects the reader javascript
*/
gulp.task('addEbookScripts',function(){
  var replacer = '<body><script src="/reader.js"></script>';
  var re = /<body>/i;
  return gulp.src('./books/html/*.addreader')
    .pipe(replace(re,replacer))
    .pipe(rename(function(path){
      // remove the .addreader
      path.extname = path.extname.replace(/\.addreader/i,'')
    }))
    .pipe(gulp.dest("./books/html/"));
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

gulp.task('default',['addEbookScripts','injectLocals','pug','watch-static','serve-static']);
gulp.task('dev',['addEbookScripts','injectLocals','watch-bs','pug','serve-bs','reload'])

// note that adding the "reader" script is not done here, but manually.
