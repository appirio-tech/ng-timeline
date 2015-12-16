configs =
  __dirname : __dirname

configs.templateCache = []
configs.templateCache.push
  files : [
    '.tmp/views/timeline.directive.html'
    '.tmp/views/image-slideshow-modal.directive.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-ng-timeline'

configs.templateCache.push
  fileName: 'example-templates.js'
  files : [
    '.tmp/views/timeline.html'
  ]
  root  : 'views/'
  module: 'example'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
