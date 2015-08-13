'use strict'

config = ($stateProvider) ->
  states = {}

  states['timeline'] =
    url         : '/'
    title       : 'Timeline'
    templateUrl : 'views/timeline.html'

  states['messaging'] =
    url         : '/messaging/:id'
    title       : 'Messaging'
    templateUrl : 'views/messaging.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


