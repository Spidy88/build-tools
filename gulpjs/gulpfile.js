const gulp = require('gulp');
const clean = require('gulp-clean');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const extend = require('gulp-extend');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js')
const rev = require('gulp-rev');
const revUpdate = require('gulp-rev-update');

gulp.task('clean', () => {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('cleanup', () => {
    return gulp.src('build', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('build:js', () => {
    return gulp.src('src/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest('js-manifest.json'))
        .pipe(gulp.dest('build'));
});

gulp.task('build:css', () => {
    return gulp.src('src/**/*.css')
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('style.min.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest('css-manifest.json'))
        .pipe(gulp.dest('build'));
});

gulp.task('build:manifest', () => {
    return gulp.src('build/*-manifest.json')
        .pipe(extend('rev-manifest.json'))
        .pipe(gulp.dest('build'));
});

gulp.task('build:html', () => {
    return gulp.src('src/index.html')
        .pipe(revUpdate({ manifestFile: './build/rev-manifest.json' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(
    gulp.parallel('build:js', 'build:css'),
    'build:manifest',
    'build:html',
    'cleanup'
));

gulp.task('default', gulp.series('clean', 'build'));
