'use strict'

TimelineController = ($scope, $stateParams, TimelineAPIService) ->
  vm        = this
  vm.eventGroups = []
  vm.showMessagingWidget = false

  vm.expanded =
    'Project Submitted'     : false
    'Project Launched'      : false
    'Design Concepts' : false
    'Final Designs'  : false
    'Final Fixes'    : false

  approve = ->

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.get params
    resource.$promise.then (data) ->
      vm.eventGroups = data

    vm

  activate()

TimelineController.$inject = [
  '$scope', '$stateParams', 'TimelineAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

