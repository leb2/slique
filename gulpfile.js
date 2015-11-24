var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');

var sassDir = './sass/**/*.scss';

gulp.task('sprites', function() {
    var spriteData = gulp.src('images/Icons/*.png').pipe(spritesmith({
        imgName: 'spritesheet.png',
        cssName: '_sprites.scss',
        algorithm: 'binary-tree',
        cssVarMap: function (sprite) {
            sprite.name = 'icon-' + sprite.name;
        }
    }));

    spriteData.img.pipe(gulp.dest('./images/')); // output path for the sprite
    spriteData.css
        .pipe(replace('spritesheet.png', '%%spritesheet%%'))
        .pipe(gulp.dest('./sass/')); // output path for the CSS
});

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
        .pipe(replace(/.*-webkit-box.*;/g,''))


        .pipe(minifyCss())

        // .pipe(rename('./slique.css'))

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
