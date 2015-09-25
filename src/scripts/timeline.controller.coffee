'use strict'

TimelineController = ($scope, $stateParams, TimelineAPIService) ->
  vm        = this
  vm.eventGroups = []
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

  mockify = (data) ->
    # TODO: REMOVE MOCK DATA
    data.forEach (eventGroup) ->
      if eventGroup.text == "Final Fixes"
        eventGroup.events = [
          {
            "type": "SUBMISSION_THREAD_INFO",
            "threadInfo": {
              "type": "THREAD_INFO",
              "threadId": "abc123",
              "unreadMessageCount": 5,
              "lastMessageInfo": {
                "content": "Maybe its best if we stick with something something something something.",
                "publisherInfo": {
                  "userId": "id",
                  "handle": "Batman",
                  "avatar": "http://pict.ly",
                  "role": "Project Creator"
                }
              }
            },
            "submissionThreads": [
              {
                "submissionId": "123",
                "threadId": "abc123",
                "unreadMessageCount": 2,
                "thumbnailUrl": "http://thumbnail.url/"
              }
            ]
          }
        ]
      else if eventGroup.text == 'Project Complete'
        vm.projectCompletionDate = eventGroup.createdTime

    data

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    resource = TimelineAPIService.query params
    resource.$promise.then (data) ->
      vm.eventGroups = mockify(data)
      vm.loading = false

    vm

  activate()

TimelineController.$inject = [
  '$scope', '$stateParams', 'TimelineAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

