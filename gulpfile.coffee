configs =
  __dirname : __dirname

configs.templateCache = []
configs.templateCache.push
  files : [
    '.tmp/views/timeline.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-timeline'

configs.templateCache.push
  fileName: 'example-templates.js'
  files : [
    '.tmp/views/submissions.html'
    '.tmp/views/submission-detail.html'
    '.tmp/views/submission-slides.html'
  ]
  root  : 'views/'
  module: 'example'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
