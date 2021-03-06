var path = require('path');

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');

var browserSync = require('browser-sync').create();

var webpackConfig = {
  output:{
    filename: 'script.js'
  },
  devtool: 'inline-source-map',
  module:{
    loaders:[
      {test: /\.jsx$/, loader: 'jsx-loader'}
    ]
  },
  resolve:{
    extensions:['','.js','.jsx']
  }
}

gulp.task('default', function(){
  browserSync.init({
    server:{
      baseDir:'./www/'
    },
    open: false
  })
  gulp.watch('./script/**/*.jsx', ['script']);
  gulp.watch('./style/*.css', ['style']);
})

gulp.task('style', function(){
  gulp.src('./style/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./www/dest/'))
    .pipe(browserSync.stream());
})

gulp.task('script', function(){
  gulp.src('./script/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./www/dest/'))
    .pipe(browserSync.stream());
})
