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

srv = (TimelineAPIService, UserAPIService, AVATAR_URL) ->
  buildTimeline = (events, onChange) ->
    createdDates = {}
    coPilot = getCoPilot events
    members = getMembers events

    for eventType in eventTypes
      createdDates[eventType] = getCreatedAt eventType, events

    timeline =
      events      : events
      createdDates: createdDates
      coPilot     : coPilot
      members     : members

    buildAvatar timeline, 'coPilot', onChange if coPilot

    onChange? timeline

  buildAvatar = (timeline, key, onChange) ->
    userParams =
    handle: timeline[key]

    user = UserAPIService.get userParams

    user.$promise.then (response) ->
      timeline[key + 'AvatarUrl'] = AVATAR_URL + response?.photoLink

      onChange? timeline

    user.$promise.catch ->
      # need handle error

    user.$promise.finally ->
      # need handle finally

  getEvents = (params, onChange) ->
    queryParams =
      filter: 'sourceObjectId=' + params.workId

    resource = TimelineAPIService.query queryParams

    resource.$promise.then (response) ->
      buildTimeline response, onChange

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

srv.$inject = ['TimelineAPIService', 'UserAPIService', 'AVATAR_URL']

angular.module('appirio-tech-timeline').factory 'TimelineService', srv
