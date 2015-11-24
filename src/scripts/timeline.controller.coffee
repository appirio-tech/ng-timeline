'use strict'

TimelineController = ($scope, $stateParams, $document, TimelineAPIService, CopilotApprovalAPIService) ->
  vm                       = this
  vm.eventGroups           = []
  vm.loading               = true
  vm.projectCompletionDate = null
  vm.projectCompleted      = false
  vm.showAcceptQuoteButton = true

  vm.expanded = {}

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
    unread = messages.filter vm.messageUnread

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

  findLastActiveIndex = (eventGroups) ->
    activeGroups = eventGroups.filter (eventGroup) ->
      eventGroup.events.length > 0

    lastIndex = activeGroups.length - 1

    eventGroups.indexOf activeGroups[lastIndex]

  setScrollElement = (index) ->
    angular.element(document).ready ->
      element = angular.element document.getElementById index
      $document.scrollToElement element

  setExpanded = (data) ->
    data.forEach (eventGroup, index) ->
      if eventGroup.events.length == 0
        vm.expanded[index].expanded = false

      else
        lastIndex = findLastActiveIndex(data)
        vm.expanded[lastIndex].expanded = true
        setScrollElement "#{vm.expanded[lastIndex].id}"

  setIndexes = (data) ->
    data.forEach (eventGroup, index) ->
      vm.expanded[index] = {}
      vm.expanded[index].id = index
      vm.expanded[index].expanded = false
      vm.expanded[index].events = {}

      eventGroup.events.forEach (event, eventIndex) ->
        vm.expanded[index].events[eventIndex] = true

  vm.isSubmissionCompleted = (eventGroup) ->
    show = false

    for e in eventGroup.events
      show = true if e.type == 'WORKSTEP_SUBMITTERS' && e.completed

    show

  vm.submissionsDueDatePassed = (eventGroup) ->
    dueDatePassed = false
    if new Date(Date.now()) > new Date(eventGroup.submissionsDueBy)
      dueDatePassed = true

    dueDatePassed

  vm.generateProfileUrl = (handle) ->
    "https://www.topcoder.com/members/#{handle}"

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.query params

    resource.$promise.then (data) ->
      vm.eventGroups = data

      findCompletionDate data

      configureProjectSubmittedComponents data

      setIndexes data

      setExpanded data


    resource.$promise.catch ->

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

TimelineController.$inject = [
  '$scope'
  '$stateParams'
  '$document'
  'TimelineAPIService'
  'CopilotApprovalAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

