var gulp = require('gulp'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),//以及error捕获
    plumber = require('gulp-plumber')//防止编译错误终止task,
path = require('path'),
    autoprefixer = require('gulp-autoprefixer')


gulp.task('dealJs',function () {
    gulp.src(path.join('./app/script/*.js'))
        .pipe(plumber({errorHandler:notify.onError('Error:<%= error.message%>')}))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.join('./app/dist')))
})