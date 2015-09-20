var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var sassDir = './sass/**/*.scss';

gulp.task('build', function() {
    // return gulp.src('./slique.css')
    return gulp.src(sassDir)

        .pipe(sass().on('error', sass.logError))

        /* Uncomment reddit resources, e.g. background: url(%%image%%); */
        .pipe(replace(/\/\*(?:(?:.|\n)(?:(?!\*\/)))*?(.*%%.*;)(?:.|\n)*?\*\//g,'$1'))

        /* Remove normal urls with external resources */
        .pipe(replace(/\n.*?url\([\'\"]?[^%].*/g,''))

        .pipe(replace('@charset "UTF-8";',''))

        .pipe(autoprefixer())

        /* Remove not allowed webkit flex prefixes from autoprefixer */
        // .pipe(replace(/.*-webkit-box(-(align|orient|ordinal|direction))?.*/g,''))
        .pipe(replace(/.*-webkit-box.*/g,''))


        .pipe(minifyCss())

        .pipe(rename('./slique.css'))

        .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
    return gulp.src(sassDir)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./stylesheets/'));
});

gulp.task('watch', function() {
    gulp.watch(sassDir, ['sass']);
});
    gulp.task('watch-build', function() {
    gulp.watch(sassDir, ['sass', 'build']);
});


gulp.task('default', ['build']);
