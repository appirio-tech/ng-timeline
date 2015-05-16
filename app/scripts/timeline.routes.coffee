'use strict'

config = ($stateProvider) ->
  state =
    url         : '/timeline/:workId'
    title       : 'Timeline'
    controller  : 'TimelineController'
    controllerAs: 'vm'
    templateUrl : 'views/timeline.html'

  $stateProvider.state 'timeline', state

config.$inject = ['$stateProvider']

angular.module('timeline').config(config).run()


