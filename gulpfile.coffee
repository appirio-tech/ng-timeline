gulp          = require 'gulp'
$             = require('gulp-load-plugins')()
$.browserSync = require 'browser-sync'

configs =
  coffeeFiles : 'app/**/*.coffee'
  jadeFiles   : 'app/**/*.jade'
  scssFiles   : 'app/**/*.scss'
  tempFolder  : '.tmp'
  appFolder   : 'app'
  distFolder  : 'dist'

tasks = ['coffee', 'jade', 'scss', 'clean', 'serve', 'build']

for task in tasks
  module = require('./gulp-tasks/' + task)
  module gulp, $, configs

gulp.task 'default', ['clean'], ->
  gulp.start 'build'

