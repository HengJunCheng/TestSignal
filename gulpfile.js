var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var cleanCss = require('gulp-clean-css');

//js处理
gulp.task('js', function(){
    gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
//sass处理
gulp.task('sass', function(){
    sass('sass/*.scss', {
            style: 'expanded'
        })
        .on('error', sass.logError)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default', ['js', 'sass']);
gulp.watch('sass/*.scss', ['sass'])
    .on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });