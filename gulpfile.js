var gulp = require('gulp'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    wiredep = require('wiredep').stream,
    es = require('event-stream'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace'),
    ngAnnotate = require('gulp-ng-annotate'),

    paths = {
      index: 'app/src/index.html',
      jsFiles: 'app/src/**/*.js',
      cssFiles: 'app/src/sass/**/*.scss',
      htmlFiles: 'app/src/**/*.html',
      bowerFiles: [
    		'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/angular-loading-bar/build/loading-bar.min.js',
    		'bower_components/angular-resource/angular-resource.min.js',
    		'bower_components/angular-touch/angular-touch.min.js',
    		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-input-masks/angular-input-masks-standalone.js',
      	'bower_components/angular-prompt/dist/angular-prompt.js'
    	]
    },

    options = {
      devDependencies: true,
      exclude: [ /jquery/, 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'],
    };

gulp.task('jshint', function() {
  return gulp.src(paths.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
  return gulp.src(paths.cssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('app/src/css'));
});

gulp.task('wiredep', function() {
  return gulp.src(paths.index)
    .pipe(wiredep(options))
    .pipe(gulp.dest('app/src'));
});

gulp.task('inject', ['sass', 'wiredep'], function () {
  return gulp.src(paths.index)
    .pipe(inject(gulp.src([paths.jsFiles, 'app/src/css/styles.css'], {read: false}), {relative: true}))
    .pipe(gulp.dest('app/src'));
});

gulp.task('clean', function() {
  return gulp.src('app/dist/')
    .pipe(clean());
});

gulp.task('uglify', function() {
  return es.merge([
    gulp.src(paths.bowerFiles),
    gulp.src(paths.jsFiles).pipe(concat('scripts.js')).pipe(ngAnnotate()).pipe(uglify())
  ])
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest('app/dist/js'));
});

gulp.task('htmlmin', function() {
  return gulp.src('app/src/modules/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('app/dist/modules'));
});

gulp.task('cssmin', function() {
  return gulp.src('app/src/css/styles.css')
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('app/dist/css'));
});

gulp.task('copy', function() {
  return gulp.src('app/src/index.html')
    .pipe(htmlreplace({
        'css': 'css/styles.min.css',
        'js': 'js/scripts.min.js'
    }))
    .pipe(gulp.dest('app/dist/'));
});

gulp.task('default', ['inject'], function () {
  gulp.watch(paths.cssFiles, ['sass']);
  gulp.watch(paths.jsFiles, ['jshint']);
});

gulp.task('dist', function (cb) {
  return runSequence('clean', ['jshint', 'uglify', 'htmlmin', 'cssmin', 'copy'], cb)
});