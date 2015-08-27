var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

gulp.task('build', function() {
    return gulp.src('./slique.css')

        /* Uncomment reddit resources, e.g. background: url(%%image%%); */
        .pipe(replace(/\/\*(?:(?:.|\n)(?:(?!\*\/)))*?(.*%%.*;)(?:.|\n)*?\*\//g,'$1'))

        /* Remove normal urls with external resources */
        .pipe(replace(/\n.*?url\([\'\"]?[^%].*/g,''))

        .pipe(autoprefixer())

        /* Remove not allowed webkit flex prefixes from autoprefixer */
        .pipe(replace(/.*-webkit-box-(align|orient|ordinal|direction).*/g,''))

        .pipe(minifyCss())

        .pipe(rename(function(path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);
