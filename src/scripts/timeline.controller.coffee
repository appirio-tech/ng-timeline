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

  vm.events.members = []

  [0, 1, 2, 3, 4].forEach (i) ->
    vm.events.members.push
      created: '12:30pm April 5 2015'
      handle: "Batman #{i}"
      avatar: ''



  vm.coPilotHandle       = null
  vm.members             = []
  vm.avatars             = {}
  vm.submissions         = null
  vm.feedbackHandle      = null
  vm.feedback2Handle     = null
  vm.showMessagingWidget = false
  vm.completed           = {}
  vm.passed              = {}

  vm.expanded =
    submitted       : false
    launched        : false
    submissions     : false
    finalSubmissions: false
    chooseWinner    : false

  mapEvents = [
    { key: 'submitted', value: 'submitted' }
    { key: 'email', value: 'email-verified' }
    { key: 'quote', value: 'quote-created' }
    { key: 'payment', value: 'payment-accepted' }
    { key: 'coPilot', value: 'copilot-assigned' }
    { key: 'launched', value: 'launched' }
    { key: 'joined', value: 'challenge-member-registered' }
    { key: 'submissions', value: 'challenge-submission' }
    { key: 'feedback', value: 'challenge-feedback-provided' }
    { key: 'checkpoint1', value: 'checkpoint1' }
    { key: 'finalists', value: 'finalists' }
    { key: 'finalistsSelected', value: 'challenge-finalists-selected' }
    { key: 'finalDesign', value: 'final-design' }
    { key: 'winner', value: 'winner' }
    { key: 'finalFeedback', value: 'final-feedback' }
    { key: 'completed', value: 'completed' }
  ]

  activate = ->
    vm

  activate()

TimelineController.$inject = [
  '$stateParams'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

