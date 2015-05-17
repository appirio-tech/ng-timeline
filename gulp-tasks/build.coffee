module.exports = (gulp, $, configs) ->
  gulp.task 'build', ['constant', 'jade', 'scss', 'coffee'], ->
    src  = gulp.src configs.tempFolder + '/**/*.*'
    dest = gulp.dest configs.distFolder

    src.pipe dest
