module.exports = (gulp, $, configs) ->
  gulp.task 'build', ['jade', 'scss', 'coffee'], ->
    options =
      title: 'build'
      gzip: true

    size = $.size options
    gulp.src(configs.distFolder + '/**/*').pipe size