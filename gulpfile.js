
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var watch = require('gulp-watch');

gulp.task('compilejs', function() {
  gulp.src('./src/javascripts/app.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./assets/javascripts'));
});

gulp.task('sass', function() {
  gulp.src('./src/stylesheets/app.scss')
    .pipe(sass({ options: { outputStyle: 'compressed' } }))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./assets/stylesheets'));
});

gulp.task('jekyll', function() {
  require('child_process').spawn('jekyll', ['build']);
});

gulp.task('server', function() {
  connect.server({ root: '_site' });
});

gulp.task('dev', ['compilejs', 'sass', 'jekyll', 'server'], function() {
  gulp.watch(['./**/*.html', '!./_site/**/*', './src/**/*'], ['compilejs', 'sass', 'jekyll']);
});

