const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const friendlyFormatter = require('eslint-friendly-formatter');
function lintOne(files) {
  return gulp.src(files)
    .pipe(eslint({configFile:'./.eslintrc.js'}))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.results(function (results) {
      console.log(`~Total Results: ${results.length}`);
      console.log(`~Totabl Wainings: ${results.warningCount}`);
      console.log(`~Total Errors: ${results.errorCount}`);
    }))
}
gulp.task('t-eslint', function () {
  return lintOne(['src/**/*.js', '!node_modules/**']);
});
gulp.task('t-eslint-nodemon',['t-eslint'], function () {
  var stream = nodemon({
    script: 'build/dev-server.js',
    execMap: {
      js: 'node'
    },
    tasks: function (changeFiles) {
      lintOne(changeFiles);
      return []
    },
    verbose: true,
    ignore: ['build/*.js', 'dist/*.js', '.git', 'node_modules/**/node_modules', 'gulp.js'],
    env: {
      NODE_ENV: 'development'
    },
    ext: 'js json'
  });
  return stream.on('restart', function () {
    console.log('Application has restart');
  }).on('crash', function () {
    console.log('Application has crash');
  });
});
gulp.task('t-nodemon',['t-eslint'], function () {
  var stream = nodemon({
    script: 'build/dev-server.js',
    execMap: {
      js: 'node'
    },
    verbose: true,
    ignore: ['build/*.js', 'dist/*.js', '.git', 'node_modules/**/node_modules', 'gulp.js'],
    env: {
      NODE_ENV: 'development'
    },
    ext: 'js json'
  });
  return stream.on('restart', function () {
    console.log('Application has restart');
  }).on('crash', function () {
    console.log('Application has crash');
  });
});
gulp.task('default', ['t-eslint','t-eslint-nodemon'], function () {
  console.log('gulp task finished');
});
