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
    for mapEvent in mapEvents
      vm[mapEvent.key] =
        passed   : false
        completed: false

    params =
      workId: $stateParams.workId

    TimelineService.getEvents params, onChange

    vm

  onChange = (timeline) ->
    setStatus timeline

    vm.coPilotHandle    = timeline.coPilot
    vm.members          = timeline.members
    vm.avatars          = timeline.avatars
    vm.submissions      = timeline.submissions
    vm.feedbackHandle   = timeline.feedback
    vm.feedback2Handle  = timeline.feedback2

  setStatus = (timeline) ->
    for mapEvent in mapEvents
      vm.completed[mapEvent.key] = timeline.createdDates?[mapEvent.value]

    for mapEvent, i in mapEvents
      if mapEvents[i + 1]
        vm.passed[mapEvent.key] = vm[mapEvents[i + 1].key].completed

  activate()

TimelineController.$inject = [
  'TimelineService'
  '$stateParams'
]

angular.module('appirio-tech-timeline').controller 'TimelineController', TimelineController

