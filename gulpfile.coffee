gulp          = require 'gulp'
$             = require('gulp-load-plugins')()
$.browserSync = require 'browser-sync'
$.karma       = require('karma').server

karmaFiles = [
  'bower_components/angular/angular.js'
  'bower_components/angular-mocks/angular-mocks.js'
  'bower_components/angular-resource/angular-resource.js'
  'bower_components/angular-ui-router/release/angular-ui-router.js'
  'bower_components/auto-config-fake-server/dist/auto-config-fake-server.js'
  'tests/specs/spec-helper.coffee'
  '.tmp/scripts/constants.js'
  '.tmp/scripts/json-fixtures.js'
  'app/scripts/**/*.module.coffee'
  'app/scripts/**/*.coffee'
  'tests/specs/**/*.coffee'
]

fixtureFiles = [
  'bower_components/work-api-schema/work-api-schema.json'
]

configs =
  coffeeFiles   : 'app/**/*.coffee'
  jadeFiles     : 'app/**/*.jade'
  scssFiles     : 'app/**/*.scss'
  specFiles     : 'tests/specs/**/*.coffee'
  tempFolder    : '.tmp'
  appFolder     : 'app'
  distFolder    : 'dist'
  karmaFiles    : karmaFiles
  fixtureFiles  : fixtureFiles
  karmaConfig   : __dirname + '/karma.conf.coffee'
  constants     :
    apiUrl: 'https://api.topcoder-dev.com/v3/'
  coverageReporter:
    type: 'lcov'
    dir: 'coverage'

tasks = [
  'coffee'
  'jade'
  'scss'
  'clean'
  'serve'
  'build'
  'test'
  'constants'
  'coveralls'
  'fixtures'
]

for task in tasks
  module = require('./gulp-tasks/' + task)
  module gulp, $, configs

gulp.task 'default', ['clean'], ->
  gulp.start 'build'

