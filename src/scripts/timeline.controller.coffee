'use strict'

TimelineController = ($scope, $stateParams, TimelineAPIService) ->
  vm        = this
  vm.events = {}

  vm.expanded =
    submitted     : false
    launched      : false
    designConcepts: false
    finalDesigns  : false
    finalFixes    : false

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.get params
    resource.$promise.then (data) ->
      vm.events = data
      console.log('vm events', vm.events)

    vm

  activate()

TimelineController.$inject = [
  '$scope', '$stateParams', 'TimelineAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

