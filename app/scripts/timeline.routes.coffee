'use strict'

config = ($stateProvider) ->
  states = {}

  states['timeline'] =
    url         : '/timeline/:workId'
    title       : 'Timeline'
    controller  : 'TimelineController'
    controllerAs: 'vm'
    templateUrl : 'views/timeline.html'

  states['messaging'] =
    url         : '/messaging/:id'
    title       : 'Messaging'
    templateUrl : 'views/messaging.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('appirio-tech-timeline').config(config).run()


