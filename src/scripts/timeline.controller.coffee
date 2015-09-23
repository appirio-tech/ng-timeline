'use strict'

TimelineController = ($scope, $stateParams, TimelineAPIService) ->
  vm        = this
  vm.eventGroups = []
  vm.showMessagingWidget = false
  vm.loading = true

  vm.expanded =
    # eventGroups
    'Project Submitted': false
    'Project Launched': false
    'Design Concepts': false
    'Final Designs': false
    'Final Fixes': false
    'Development Launched': false
    'Development Begins': false
    # events
    'EMAIL_CONFIRMED': false
    'COPILOT_ASSIGNED': false
    'QUOTE_INFO': false
    'PAYMENT_ACCEPTED': false
    'MEMBER_REGISTRATION': false
    'THREAD_INFO': false
    'WORKSTEP_SUBMITTERS': false
    'SUBMISSION_THREAD_INFO': false
    'WORKSTEP_WINNERS': false

  order = (data) ->
    timeStamped = data.filter (eventGroup) ->
      eventGroup.createdTime

    unStamped = data.filter (eventGroup) ->
      !eventGroup.createdTime

    sorted = timeStamped.sort (prev, next) ->
      if prev.createdTime < next.createdTime
        return -1
      else if prev.createdTime > next.createdTime
        return 1
      else
        return 0

    merged = sorted.concat unStamped

    merged

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.query params
    resource.$promise.then (data) ->
      vm.eventGroups = order(data)
      vm.loading = false

    vm

  activate()

TimelineController.$inject = [
  '$scope', '$stateParams', 'TimelineAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

