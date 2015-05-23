'use strict'

eventTypes = [
  'copilot-assigned'
  'created'
  'submitted'
  'quote-created'
  'email-verified'
  'payment-accepted'
  'challenge-feedback-provided'
  'challenge-submission'
  'challenge-member-registered'
  'challenge-finalists-selected'
  'state-change'
  'launched'
  'checkpoint1'
  'finalists'
  'final-design'
  'winner'
  'final-feedback'
  'completed'
]

srv = (TimelineAPIService, UserAPIService, avatarUrl) ->
  getEvents = (params, onChange) ->
    queryParams =
      filter: 'sourceObjectId=' + params.workId

    resource = TimelineAPIService.query queryParams

    resource.$promise.then (response) ->
      createdDates = {}
      coPilot = getCoPilot response
      members = getMembers response

      for eventType in eventTypes
        createdDates[eventType] = getCreatedAt eventType, response

      timeline =
        events      : response
        createdDates: createdDates
        coPilot     : coPilot
        members     : members

      if coPilot
        userParams =
          handle: coPilot

        coPilotUser = UserAPIService.get userParams

        coPilotUser.$promise.then (response) ->
          timeline.coPilotAvatarUrl = avatarUrl + response?.photoLink

          onChange? timeline

      onChange? timeline

    resource.$promise.catch ->
      # need handle error

    resource.$promise.finally ->
      # need handle finally

  findEvent = (type, events) ->
    for e in events
      return e if e.eventSubType == type

    false

  findAllEvents = (type, events) ->
    foundEvents = []

    for e in events
      foundEvents.push(e) if e.eventSubType == type

    foundEvents

  getCoPilot = (events) ->
    coPilotEvent = findEvent 'copilot-assigned', events
    coPilotEvent?.sourceObjectContent?.handle

  getMembers = (events) ->
    members = []
    memberEvents = findAllEvents 'challenge-member-registered', events

    for memberEvent in memberEvents
      members.push memberEvent?.sourceObjectContent?.handle

    members

  getCreatedAt = (type, events) ->
    e = findEvent type, events
    e?.createdAt

  getEvents: getEvents

srv.$inject = ['TimelineAPIService', 'UserAPIService', 'avatarUrl']

angular.module('appirio-tech-timeline').factory 'TimelineService', srv
