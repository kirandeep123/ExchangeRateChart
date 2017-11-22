var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    gulp.src([
        'public/**/*.scss',
        'src/modules/**/*.scss'
    ])
        .pipe(concat('style.js'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('build'));
});

gulp.task('compress-dev', function() {
    gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-animate/angular-animate.js',
        'app.js',
        'src/**/*.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('compress-prod', function() {
    gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-animate/angular-animate.js',
        'app.js',
        'src/**/*.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('public/styles/*.scss', ['sass']);
    gulp.watch('src/modules/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['compress-dev']);
    gulp.watch('app.js', ['compress-dev']);
});

gulp.task('dev',  ['sass', 'compress-dev' , 'watch']);
gulp.task('build', ['sass', 'compress-prod']);