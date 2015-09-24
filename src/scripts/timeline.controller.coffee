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
    'Project Complete': false
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
    # TODO: REMOVE
    data.forEach (eventGroup) ->
      if eventGroup.text == "Final Fixes" || eventGroup.text =="Final Designs"
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
                  "avatar": "http://pict.ly"
                }
              }
            },
            "submissionThumbnails": [
              "http://thumbnail.url/"
            ]
          }
        ]
      else if eventGroup.text == 'Project Complete'
        vm.projectCompletionDate = eventGroup.createdTime

    data.push(
      {
        "type": "EVENT_GROUP",
        "text": "Development Begins",
        "createdTime": "2015-09-18T12:28:33.843-07:00",
        "events": [
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
                            "avatar": "http://pict.ly"
                        }
                    }
                },
                "submissionThumbnails": [
                    "http://thumbnail.url/"
                ]
            }
        ]
        }
      )

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

