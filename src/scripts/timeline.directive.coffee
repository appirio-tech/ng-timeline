'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'TimelineController as vm'
  templateUrl : 'views/timeline.directive.html'
  scope       :
    workId    : '@workId'
    permissions: '='

angular.module('appirio-tech-ng-timeline').directive 'timeline', directive
