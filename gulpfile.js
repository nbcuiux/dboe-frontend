// generated on 2017-02-02 using generator-webapp 2.3.2
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const concat = require('gulp-concat');

const $ = gulpLoadPlugins();

gulp.task('styles', () => {
  return gulp.src('src/assets/styles/*.scss')
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe(concat('src/App.css'))
    .pipe(gulp.dest(''));
});

gulp.task('watch', () => {
  gulp.watch('src/assets/styles/*.scss', ['styles']);
});

gulp.task('default', ['watch']);
