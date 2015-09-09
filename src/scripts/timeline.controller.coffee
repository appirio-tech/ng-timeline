'use strict'

TimelineController = ($scope, $stateParams, TimelineAPIService) ->
  vm        = this
  vm.eventGroups = []

  vm.expanded =
    'Project Submitted'     : false
    # launched      : false
    # designConcepts: false
    # finalDesigns  : false
    # finalFixes    : false

  approve = ->

  vm.itemCompleted = (events, item) ->
    completed = false
    events.forEach (event) ->
      if event.type == item
        completed = true
    completed

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

