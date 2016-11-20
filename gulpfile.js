const
  babel = require('gulp-babel'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass');

const vendorScripts = [
  'node_modules/jquery/dist/jquery.min.js'
];

gulp.task('sass', () =>
  gulp.src('src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
);


gulp.task('scripts', () =>
  gulp.src('src/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
);

gulp.task('vendorScripts', () =>
  gulp.src(vendorScripts)
    .pipe(concat('vendor.js'))
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
    open: false
  });
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['scripts', 'bs-reload']);
  gulp.watch('src/sass/**/*.scss', ['sass', 'bs-reload']);
});

gulp.task('default', ['sass', 'scripts', 'vendorScripts', 'bs', 'watch']);
