'use strict'

TimelineController = (TimelineService, $stateParams, UserV3Service, ThreadsAPIService, CoPilotAPIService) ->
  vm                     = this
  vm.coPilotHandle       = null
  vm.members             = []
  vm.avatars             = {}
  vm.submissionHandle    = null
  vm.feedbackHandle      = null
  vm.feedback2Handle     = null
  vm.showMessagingWidget = false
  vm.unreadCount         = null

  mapEvents = [
    { key: 'submitted', value: 'submitted' }
    { key: 'email', value: 'email-verified' }
    { key: 'coPilot', value: 'copilot-assigned' }
    { key: 'quote', value: 'quote-created' }
    { key: 'quoteAccepted', value: 'work-estimate-approved' }
    { key: 'payment', value: 'payment-accepted' }
    { key: 'launched', value: 'work-project-launched' }
    { key: 'joined', value: 'Registration' }
    { key: 'submissions', value: 'Submission' }
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

    vm.acceptQuote = acceptQuote

  getOrCreateThread = ->
    #TODO: get rid of this call
    UserV3Service.getCurrentUser (user) ->
      publishers = [
        vm.coPilotId
        user.id
      ]

      params =
        clientIdentifier: $stateParams.workId
        context         : 'work'
        subject         : vm.workName
        publishers      : publishers
        subscribers     : publishers

      thread  = new ThreadsAPIService params
      resource = thread.$save()

      resource.then (response) ->
        vm.threadId = response?.result?.content?.id
        #TODO: get rid of this call since we should be able to get unread count some where else
        TimelineService.getUnreadCount vm.threadId, user.id, setUnreadCount

  acceptQuote = ->
    params =
      copilotId: vm.coPilotId
      projectId: $stateParams.workId
      approved : true

    copilot  = new CoPilotAPIService params
    resource = copilot.$save()

    resource.then (response) ->
      vm.quoteAccepted.completed = true

  onChange = (timeline) ->
    setStatus timeline

    vm.coPilotHandle    = timeline.coPilotHandle
    vm.coPilotId        = timeline.coPilotId
    vm.members          = timeline.members
    vm.avatars          = timeline.avatars
    vm.submissionHandle = timeline.submission
    vm.submissionThumbs = timeline.submissionThumbs
    vm.feedbackHandle   = timeline.feedback
    vm.feedback2Handle  = timeline.feedback2
    vm.quotedAmount     = timeline.quotedAmount

    getOrCreateThread() if vm.coPilotId

  setStatus = (timeline) ->
    for mapEvent in mapEvents
      vm[mapEvent.key].completed = timeline.createdDates?[mapEvent.value]

    for mapEvent, i in mapEvents
      if mapEvents[i + 1]
        vm[mapEvent.key].passed = vm[mapEvents[i + 1].key].completed

  setUnreadCount = (response) ->
    vm.unreadCount = response.unreadCount
    vm.showMessages = true if response.messages.length

  activate()

  vm

TimelineController.$inject = [
  'TimelineService'
  '$stateParams'
  'UserV3Service'
  'ThreadsAPIService'
  'CoPilotAPIService'
]

angular.module('appirio-tech-timeline').controller 'TimelineController', TimelineController

