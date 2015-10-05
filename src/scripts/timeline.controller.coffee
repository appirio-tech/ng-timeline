'use strict'

TimelineController = ($scope, $stateParams, TimelineAPIService) ->
  vm        = this
  vm.eventGroups = []
  vm.loading = true
  vm.projectCompletionDate = null

  vm.expanded =
    # eventGroups
    'Project Submitted': false
    'Project Launched': false
    'Design Concepts': false
    'Final Designs': false
    'Final Fixes': false
    'Development Launched': false
    'Development Begins': false
    'Project Complete': false
    # events
    'COPILOT_ASSIGNED': false
    'QUOTE_INFO': false
    'PAYMENT_ACCEPTED': false
    'MEMBER_REGISTRATION': false
    'THREAD_INFO': false
    'WORKSTEP_SUBMITTERS': false
    'SUBMISSION_THREAD_INFO': false
    'WORKSTEP_WINNERS': false

  vm.isAFinishEvent = (text, type) ->
    text == 'Development Begins' || type == 'PAYMENT_ACCEPTED' || type == 'WORKSTEP_SUBMITTERS' || type == 'WORKSTEP_WINNERS'

  findCompletionDate = (data) ->
    data.forEach (eventGroup) ->
      if eventGroup.text == 'Project Complete'
        vm.projectCompletionDate = eventGroup.createdTime

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.query params
    resource.$promise.then (data) ->
      vm.eventGroups = data
      findCompletionDate(data)
      vm.loading = false

    vm

  activate()

TimelineController.$inject = [
  '$scope', '$stateParams', 'TimelineAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

