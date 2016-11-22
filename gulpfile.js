const babel = require('gulp-babel'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  cleanCss = require('gulp-clean-css'),
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  plumber = require('gulp-plumber'),
  runSeq = require('run-sequence'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify');

const vendorScripts = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/whatwg-fetch/fetch.js'
];

gulp.task('sass', () =>
  gulp.src('src/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css/'))
);

gulp.task('scripts', () =>
  gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
);

gulp.task('vendorScripts', () =>
  gulp.src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
);

gulp.task('images', () =>
  gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('dist/img/'))
);

gulp.task('bs', () => {
  browserSync.init({
    server: {
      baseDir: ''
    },
    port: 3000,
    open: true
  });
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['scripts', 'bs-reload']);
  gulp.watch('src/sass/**/*.scss', ['sass', 'bs-reload']);
  gulp.watch('src/img/**/*.{svg,jpg,png}', ['images']);
  gulp.watch('index.html', ['bs-reload']);
});

gulp.task('default', cb => {
  runSeq(['sass', 'scripts', 'vendorScripts', 'images'], 'bs', 'watch', cb);
});
