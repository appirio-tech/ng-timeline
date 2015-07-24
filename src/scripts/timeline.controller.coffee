'use strict'

TimelineController = (TimelineService, $stateParams) ->
  vm                     = this
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

