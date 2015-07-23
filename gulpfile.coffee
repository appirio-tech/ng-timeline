configs =
  coffeeFiles     : 'app/**/*.coffee'
  jadeFiles       : 'app/**/*.jade'
  scssFiles       : 'app/**/*.scss'
  scssIncludePaths: require('appirio-work-styles').includePaths
  tempFolder      : '.tmp'
  appFolder       : 'app'
  distFolder      : 'dist'

configs.buildFiles =
  concat:
    'main.js': [
      '.tmp/scripts/timeline.module.js'
      '.tmp/scripts/templates.js'
      '.tmp/scripts/timeline.controller.js'
      '.tmp/scripts/timeline.service.js'
      '.tmp/scripts/timeline-api.service.js'
      '.tmp/scripts/user-api.service.js'
    ]
    'main.css': [
      '.tmp/styles/timeline.css'
      '.tmp/styles/checkpoint.css'
      '.tmp/styles/messages.css'
      '.tmp/styles/submissions.css'
    ]
    'main.landscape.css': [
      '.tmp/styles/timeline.landscape.css'
      '.tmp/styles/submissions.landscape.css'
      '.tmp/styles/messages.landscape.css'
    ]
    'main.desktop.css': [
      '.tmp/styles/timeline.desktop.css'
    ]

configs.templateCache =
  files : [
    '.tmp/views/timeline.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-timeline'

configs.karma =
  coverage    : 'app/**/*.coffee'
  # Dont include coverage files
  coffeeFiles : [
    'tests/specs/**/*.coffee'
  ]
  files: [
    'bower_components/sinon/index.js'
    'bower_components/angular/angular.js'
    'bower_components/angular-scroll/angular-scroll.js'
    'bower_components/angular-mocks/angular-mocks.js'
    'bower_components/angular-resource/angular-resource.js'
    'bower_components/angular-ui-router/release/angular-ui-router.js'
    'bower_components/auto-config-fake-server/dist/auto-config-fake-server.js'
    'bower_components/appirio-tech-ng-messaging/dist/main.js'
    'tests/specs/helper.coffee'
    '.tmp/scripts/constants.js'
    '.tmp/scripts/json-fixtures.js'
    'app/scripts/**/*.module.coffee'
    'app/**/*.coffee'
    'tests/specs/**/*.coffee'
  ]

configs.fixtureFiles = [
  'bower_components/appirio-tech-api-schemas/swagger/v3-events.json'
  'bower_components/appirio-tech-api-schemas/swagger/v2.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-messages.json'
]

configs.constants =
  API_URL       : 'https://api.topcoder-dev.com/v3'
  API_URL_V2    : 'https://api.topcoder-dev.com/v2'
  AVATAR_URL    : 'http://www.topcoder.com'
  SUBMISSION_URL: 'https://studio.topcoder.com'

configs.coverageReporter =
  type: 'lcov'
  dir: 'coverage'

##
## Normally, you wouldnt need to edit below this line ##
##

gulpTaskPath             = './node_modules/appirio-gulp-tasks'
configs.karma.configFile = __dirname + '/' + gulpTaskPath + '/karma.conf.coffee'
configs.karma.basePath   = __dirname
pluginsPath              = gulpTaskPath + '/node_modules/gulp-load-plugins'
browserSyncPath          = gulpTaskPath + '/node_modules/browser-sync'
karmaPath                = gulpTaskPath + '/node_modules/karma'

gulpLoadPluginsOptions =
  config: __dirname + '/' + gulpTaskPath + '/package.json'

gulp          = require 'gulp'
plugins       = require pluginsPath
$             = plugins gulpLoadPluginsOptions
$.browserSync = require browserSyncPath
$.karma       = require(karmaPath).server

tasks = [
  'coffee'
  'jade'
  'scss'
  'clean'
  'serve'
  'build'
  'test'
  'ng-constant'
  'coveralls'
  'fixtures'
  'template-cache'
]

for task in tasks
  module = require(gulpTaskPath + '/tasks/' + task)
  module gulp, $, configs

gulp.task 'default', ['clean'], ->
  gulp.start 'build'

