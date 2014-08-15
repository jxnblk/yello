
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var uglify = require('gulp-uglifyjs');
var watch = require('gulp-watch');

gulp.task('compile', function() {
  gulp.src('./src/javascripts/app.js')
    .pipe(browserify())
    //.pipe(uglify('app.min.js', { outSourceMap: true }))
    //.pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./assets/javascripts'));
});

gulp.task('jekyll', function() {
  require('child_process').spawn('jekyll', ['build']);
});

gulp.task('server', function() {
  connect.server({ root: '_site' });
  //require('child_process').spawn('jekyll', ['serve']);
});

gulp.task('dev', ['compile', 'jekyll', 'server'], function() {
  gulp.watch(['./**/*.html', '!./_site/**/*', './src/**/*'], ['compile', 'jekyll']);
});

