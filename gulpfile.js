'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var gsi = require('gulp-scripts-index');
// var gsti = require('./custom_modules/gulp-styles-index');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var addsrc = require('gulp-add-src');
var connect = require('gulp-connect');
// var history = require('connect-history-api-fallback');


gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('scss', function () {
    return gulp.src('src/scss/global.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions', 'ie 8', 'ie 9'],
        //     cascade: false
        // }))
        .on('error', sass.logError)
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch.scss', function () {
    gulp.watch(['src/scss/*.scss'], ['scss']);
});

gulp.task('minify.images', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});


gulp.task('minify.js', function () {
    gulp.src(['src/index.html'])
        .pipe(gsi())
        .pipe(addsrc.append('src/js/popupImage.js'))
        .pipe(uglify({mangle: false}))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'));

    // return gulp.src(['src/**/*.map'])
    //     .pipe(rename({dirname: ''}))
    //     .pipe(gulp.dest('build/js'));
});

gulp.task('minify.css', ['scss'], function() {
    return gulp.src(['src/bower_components/bootstrap/dist/css/bootstrap.min.css', 'src/css/*.css' ])
        .pipe(cleanCSS())    // {compatibility: 'ie8'}
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions', 'ie 8', 'ie 9'],
        //     cascade: false
        // }))
        .pipe(concat('all.css'))
        .pipe(replace(/(..\/)+images/g, '../images'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('copy.html', function() {
    return gulp.src(['src/*.html', '!src/index.html'])
        .pipe(gulp.dest('build/'))
});

gulp.task('copy.pdf', function() {
    return gulp.src('src/contentfiles/*.pdf')
        .pipe(gulp.dest('build/contentfiles/'))
});

gulp.task('change.index', ['minify.images', 'minify.js', 'minify.css', 'copy.pdf'], function() {
    return gulp.src('src/*.html')
        .pipe(htmlreplace({
            js: 'js/all.js',
            css: 'css/all.css'
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('devServer', ['scss', 'watch.scss'], function() {
    // var middleware = history({});
    connect.server({
        root: 'src',
        livereload: true,
        port: 8000
        // middleware: function (connect, opt) {
        //     return [middleware];
        // }
    });
});

gulp.task('prodServer', ['change.index'],
    function() {
        connect.server({
            root: 'build',
            livereload: true,
            port: 9000
        });
    }
);


gulp.task('build', ['clean'], function () {
    gulp.run('prodServer')
});

gulp.task('default', ['devServer']);
