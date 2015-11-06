'use strict'

TimelineController = ($scope, $stateParams, TimelineAPIService, CopilotApprovalAPIService) ->
  vm                       = this
  vm.eventGroups           = []
  vm.loading               = true
  vm.projectCompletionDate = null
  vm.projectCompleted      = false
  vm.showAcceptQuoteButton = true

  vm.expanded =
    'Project Submitted'     : true
    'Project Launched'      : true
    'Design Concepts'       : true
    'Final Designs'         : true
    'Final Fixes'           : true
    'Development Launched'  : true
    'Development Begins'    : true
    'Project Complete'      : true
    'STATUS_UPDATE'         : true
    'STATUS_REPORT'         : true
    'COPILOT_ASSIGNED'      : true
    'QUOTE_INFO'            : true
    'PAYMENT_ACCEPTED'      : true
    'MEMBER_REGISTRATION'   : true
    'THREAD_INFO'           : true
    'WORKSTEP_SUBMITTERS'   : true
    'SUBMISSION_THREAD_INFO': true
    'WORKSTEP_WINNERS'      : true
    'FINALFIXES_SUBMISSION' : true

  vm.isAFinishEvent = (text, type, completed) ->
    # text == 'Development Begins' || type == 'PAYMENT_ACCEPTED' || (type == 'WORKSTEP_SUBMITTERS' && !completed) || type == 'WORKSTEP_WINNERS'

    text == 'Development Begins' || type == 'PAYMENT_ACCEPTED' || type == 'WORKSTEP_WINNERS'

  vm.acceptQuote = (event) ->
    if vm.copilotId
      params =
        userId: vm.copilotId
        projectId: vm.workId

      body =
        "status": "APPROVED"

    resource = CopilotApprovalAPIService.post params, body

    resource.$promise.then (response) ->
      vm.showAcceptQuoteButton = false

      activate()

    resource.$promise.finally ->

  vm.messageUnread = (message) ->
    message.unreadMessageCount > 0

  vm.allMessagesRead = (messages) ->
    unread = messages.filter(vm.messageUnread)

    unread.length == 0

  findCompletionDate = (data) ->
    data.forEach (eventGroup) ->
      if eventGroup.text == 'Project Complete'
        vm.projectCompleted      = true
        vm.projectCompletionDate = eventGroup.createdTime

  configureProjectSubmittedComponents = (data) ->
    data.forEach (eventGroup) ->
      if eventGroup.text == 'Project Submitted'
        eventGroup.events.forEach (event) ->
          if event.type == 'COPILOT_ASSIGNED'
            vm.copilotId = event.copilot.userId

          if event.type == 'QUOTE_INFO' && event.status == 'Accepted'
            vm.showAcceptQuoteButton = false

  vm.isSubmissionCompleted = (eventGroup) ->
    show = false

    for e in eventGroup.events
      show = true if e.type == 'WORKSTEP_SUBMITTERS' && e.completed

    show


  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.query params

    resource.$promise.then (data) ->
      vm.eventGroups = data

      findCompletionDate data

      configureProjectSubmittedComponents data

    resource.$promise.catch ->

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

TimelineController.$inject = [
  '$scope'
  '$stateParams'
  'TimelineAPIService'
  'CopilotApprovalAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

