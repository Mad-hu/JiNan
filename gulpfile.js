//"gulp-concat": "^2.6.0",   js合并
//    "gulp-minify-css": "^1.2.4",   css压缩
//    "gulp-uglify": "^1.5.3" js压缩

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    rev = require('gulp-rev'),
    compass = require('gulp-compass');

///compass 任务。完成对sass文件的编译 对css文件的压缩 合并
gulp.task('compass', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(compass({
            css: './src/css',
            sass: './src/sass',
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./src/css/minincss'))
        .pipe(concat('style.min.css'))                            //- 合并后的文件名
        //.pipe(gulp.dest('E:/workspace/eclipse/newFinance/newFinanceWeb/src/main/webapp/styles/common'));
        .pipe(gulp.dest('./dest/styles/common/'));                               //- 输出文件本地       .pipe(rev()) //- 文件名加MD5后缀
});
//E:/workspace/eclipse/newFinance/newFinanceWeb/src/main/webapp/styles/common

///压缩第二首页的css
gulp.task('cssyshb',function(){
    gulp.src('./dest/styles/common/index2.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./dest/styles/common/index2-min-css'))
        .pipe(concat('style2.min.css'))
        .pipe(gulp.dest('./dest/styles/common/index2-min-css'));
});


//语法检查 任务1先检查语法
gulp.task('jshint', function() {
    return gulp.src('src/javascripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//压缩 js  这里有问题 任务1 2 完成开始压缩js压缩后修改文件名
gulp.task('minifyjs',['miniconcat'], function() {
    return gulp.src('dest/javascripts/main.js')      //需要操作的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dest/javascripts'))       //输出到文件夹
});


//合并 js 这里有问题 任务完成1 2 完成后合并所有js
gulp.task('miniconcat', function() {
    return gulp.src('src/js/*.js')      //需要操作的文件
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dest/javascripts'));  //输出
});

// 保证js语法检测完成，sass编译完成
gulp.task('default',['jshint','compass'],function() {
    gulp.start('miniconcat','minifyjs','cssyshb');
    // 监听sass文件变化
    gulp.watch('./src/sass/**/*.scss', function(){
        gulp.start('compass');
    });
});