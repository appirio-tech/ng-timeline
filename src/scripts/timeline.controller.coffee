'use strict'

TimelineController = (TimelineService, $stateParams) ->
  vm        = this
  vm.events = {}

  vm.events.confirmEmail =
    address: 'john@example.com'
    created: '12:30pm April 5 2015'

  vm.events.assignCopilot =
    created: '12:30pm April 5 2015'
    handle: 'Batman'

  vm.events.quote =
    created: '12:30pm April 5 2015'

  vm.events.payment =
    created : '12:30pm April 5 2015'
    total   : 12000
    duration: 21

  vm.events.launch =
    created: '12:30pm April 5 2015'
    comments: []

  vm.events.members = []

  vm.events.submissions =
    created: '12:30pm April 5 2015'
    submissions: []
    comments: []

  vm.events.finalSubmissions =
    created: '12:30pm April 5 2015'
    submissions: []
    comments: []

  vm.events.chooseWinner =
    created: '12:30pm April 5 2015'
    winner:
      created: '12:30pm April 5 2015'
      avatar: ''
      handle: 'Batman'

  vm.messages = []

  vm.messages.push
    avatar: ''
    handle: "Batman"
    notification: 5
    threadId: "abc123"
    message: 'Maybe its best if we stick with something something something something.'

  [0, 1].forEach (i) ->
    vm.events.members.push
      created: '12:30pm April 5 2015'
      handle: "Batman #{i}"
      avatar: ''

    vm.events.launch.comments.push
      avatar: ''
      handle: "Batman #{i}"
      notification: 5
      threadId: "abc123"
      fileName: 'Project Requirement'

    vm.events.submissions.submissions.push
      avatar: ''
      handle: "Batman #{i}"

    vm.events.submissions.comments.push
      avatar: ''
      handle: "Batman #{i}"
      notification: 5
      threadId: 'abc123'
      fileName: 'some-picture.jpg'

    vm.events.finalSubmissions.submissions.push
      avatar: ''
      handle: "Batman #{i}"

    vm.events.finalSubmissions.comments.push
      avatar: ''
      handle: "Batman #{i}"
      notification: 5
      threadId: 'abc123'
      fileName: 'some-picture.jpg'

  vm.expanded =
    submitted       : false
    launched        : false
    submissions     : false
    finalSubmissions: false
    chooseWinner    : false

  activate = ->
    vm

  activate()

TimelineController.$inject = [
  '$stateParams'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

