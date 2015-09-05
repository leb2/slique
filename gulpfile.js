var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('build', function() {
    // return gulp.src('./slique.css')
    return gulp.src('./sass/*.scss')

        /* Uncomment reddit resources, e.g. background: url(%%image%%); */
        .pipe(replace(/\/\*(?:(?:.|\n)(?:(?!\*\/)))*?(.*%%.*;)(?:.|\n)*?\*\//g,'$1'))

        /* Remove normal urls with external resources */
        .pipe(replace(/\n.*?url\([\'\"]?[^%].*/g,''))

        .pipe(sass())

        .pipe(replace('@charset "UTF-8";',''))

        .pipe(autoprefixer())

        /* Remove not allowed webkit flex prefixes from autoprefixer */
        .pipe(replace(/.*-webkit-box-(align|orient|ordinal|direction).*/g,''))

        .pipe(minifyCss())

        .pipe(rename('./SLIQUE.css'))

        .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./stylesheets/'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
});


gulp.task('default', ['build']);
