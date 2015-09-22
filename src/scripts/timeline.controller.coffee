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

  order = (data) ->
    timeStamped = data.filter (eventGroup) ->
      eventGroup.createdTime

    unStamped = data.filter (eventGroup) ->
      !eventGroup.createdTime

    sorted = timeStamped.sort (prev, next) ->
      prev.createdTime - next.createdTime

    merged = sorted.concat unStamped

    merged

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.query params
    resource.$promise.then (data) ->
      vm.eventGroups = order(data)

    vm

  activate()

TimelineController.$inject = [
  '$scope', '$stateParams', 'TimelineAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

