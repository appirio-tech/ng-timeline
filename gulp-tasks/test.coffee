karma = require('karma').server

module.exports = (gulp, $, configs) ->
  runTest = (singleRun = true) ->
    preprocessors                      = {}
    preprocessors[configs.coffeeFiles] = 'coffee'
    preprocessors[configs.specFiles]   = 'coffee'
    preprocessors['**/*.json']         = 'json_fixtures'

    options =
      configFile   : configs.karmaConfig
      singleRun    : singleRun
      preprocessors: preprocessors
      files        : configs.karmaFiles

    karma.start options

  gulp.task 'test', ['constants'], ->
    runTest()

  gulp.task 'test-server', ['constants'], ->
    runTest false