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

srv = (TimelineAPIService, UserAPIService, AVATAR_URL, SUBMISSION_URL) ->
  buildTimeline = (events, onChange) ->
    createdDates     = {}
    coPilot          = getHandle events, 'copilot-assigned'
    submissions      = getSubmissions events
    feedback         = getHandle events, 'challenge-feedback-provided'
    feedback2        = getHandle events, 'final-feedback'
    members          = getMembers events

    for eventType in eventTypes
      createdDates[eventType] = getCreatedAt eventType, events

    timeline =
      events          : events
      createdDates    : createdDates
      coPilot         : coPilot
      members         : members
      avatars         : {}
      submissions     : submissions
      feedback        : feedback
      feedback2       : feedback2

    buildAvatar timeline, coPilot, onChange if coPilot

    for member in members
      buildAvatar timeline, member.handle, onChange

    onChange? timeline

  buildAvatar = (timeline, handle, onChange) ->
    unless timeline.avatars[handle]
      userParams =
        handle: handle

      user = UserAPIService.get userParams

      user.$promise.then (response) ->
        timeline.avatars[handle] = AVATAR_URL + response?.photoLink

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

  getSubmissions = (events) ->
    submissions      = []
    submissionEvents = findAllEvents 'challenge-submission', events

    for submissionEvent in submissionEvents
      submission =
        handle: submissionEvent?.sourceObjectContent?.handle
        url: SUBMISSION_URL + '/?module=DownloadSubmission&sbmid='

      submission.url += submissionEvent?.sourceObjectContent?.submissionId

      submissions.push submission

    submissions

  findEvent = (type, events) ->
    for e in events
      return e if e.eventSubType == type

    false

  findAllEvents = (type, events) ->
    foundEvents = []

    for e in events
      foundEvents.push(e) if e.eventSubType == type

    foundEvents

  getHandle = (events, type) ->
    event = findEvent type, events
    event?.sourceObjectContent?.handle

  getMembers = (events) ->
    members = []
    memberEvents = findAllEvents 'challenge-member-registered', events

    for memberEvent in memberEvents
      members.push
        handle: memberEvent?.sourceObjectContent?.handle
        joined: memberEvent?.createdAt

    members

  getCreatedAt = (type, events) ->
    e = findEvent type, events
    e?.createdAt

  getEvents: getEvents

srv.$inject = ['TimelineAPIService', 'UserAPIService', 'AVATAR_URL', 'SUBMISSION_URL']

angular.module('appirio-tech-timeline').factory 'TimelineService', srv
