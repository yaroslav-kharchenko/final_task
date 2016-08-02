var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache')
    autoprefixer = require('gulp-autoprefixer');

//All app tasks
//HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

//CSS
gulp.task('css-libs', function(){
  return gulp.src([
    'app/libs/normalize-css/normalize.css'
    ])
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'))
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
    .pipe(autoprefixer(['last 10 versions', '>1%', 'ie 8', 'ie 7'], {cascade: true}))
    // .pipe(cssnano())
    // .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

//JS
gulp.task('js-libs',function(){
  return gulp.src([
      'app/libs/jquery/dist/jquery.min.js'
    ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js/common/'))
});

gulp.task('js', function(){
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
})

//IMG
gulp.task('img', function(){
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

//All production tasks
gulp.task('connect', function() {
  connect.server({
    root: './app',
    livereload: true
  });
});

//BUILD
gulp.task('build', ['clean', 'css-libs', 'sass', 'js-libs', 'img'],function(){

  var buildCss = gulp.src([
      'app/css/**/*.css'
      ])
      .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));

  var buildJS = gulp.src('app/js/**/*')
      .pipe(gulp.dest('dist/js'));

  var buildHTML = gulp.src('app/*.html')
      .pipe(gulp.dest('dist'));

});

gulp.task('clean', function(){
  return del.sync('dist');
});

gulp.task('clear',function(){
  return cache.clearAll();
})

gulp.task('watch',['connect'], function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/scss/**/*.scss'], ['sass'])
  gulp.watch(['app/js/*.js'], ['js']);
});

gulp.task('default', ['html', 'css-libs', 'sass', 'js-libs', 'img', 'watch']);
