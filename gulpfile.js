var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('hello', function() {
  console.log('Hello $USER$');
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app' //NOT THE ACTUAL FOLDER SINCE THERE IS NONE
    },
  })
})
