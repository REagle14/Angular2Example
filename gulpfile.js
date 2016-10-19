'use strict';

var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

// default task used to deploy the application locally. It calls the clean task, the sass task, then runs the default tasks in the callback.
gulp.task('default', ['clean', 'sass'], function () {
  
    var srcItems = {
      'css': 'app/css/**/*',
      'html': 'app/html/**/*',
      'images': 'app/images/**/*',
      'js': 'app/js/**/*'
    }

    for (var item in srcItems) {
      gulp.src(srcItems[item]).pipe(gulp.dest('./dist/' + item));
    }

    gulp.src('app/*.html').pipe(gulp.dest('./dist/'));

    // Angular 2
    gulp.src('node_modules/core-js/client/shim.min.js')
      .pipe(gulp.dest('./dist/js/libs/core-js/'));
    gulp.src('node_modules/zone.js/dist/zone.js')
      .pipe(gulp.dest('./dist/js/libs/zone.js/'));
    gulp.src('node_modules/reflect-metadata/Reflect.js')
      .pipe(gulp.dest('./dist/js/libs/reflect-metadata/'));
    gulp.src('node_modules/rxjs/bundles/Rx.js')
      .pipe(gulp.dest('./dist/js/libs/rxjs/'));
    gulp.src('node_modules/@angular/core/bundles/core.umd.js')
      .pipe(gulp.dest('./dist/js/libs/@angular/'));
    gulp.src('node_modules/@angular/common/bundles/common.umd.js')
      .pipe(gulp.dest('./dist/js/libs/@angular/'));
    gulp.src('node_modules/@angular/compiler/bundles/compiler.umd.js')
      .pipe(gulp.dest('./dist/js/libs/@angular/'));
    gulp.src('node_modules/@angular/platform-browser/bundles/platform-browser.umd.js')
      .pipe(gulp.dest('./dist/js/libs/@angular/'));
    gulp.src('node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js')
      .pipe(gulp.dest('./dist/js/libs/@angular/'));
});

// compile sass into css into the dist folder
gulp.task('sass', ['clean'], function () {
  return gulp.src(['./app/sass/styles.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
  gulp.watch([
      './app/sass/**/*.scss',
      './app/images/**/*',
      './app/js/**/*.js',
      './app/html/**/*.html',
      './app/*.html'
  ], ['default'])
});

// deletes all items in the ./dist folder  
gulp.task('clean', function () {
  return del('./dist/*');
});