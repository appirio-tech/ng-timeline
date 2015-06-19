'use strict'

eventTypes = [
  'copilot-assigned'
  'created'
  'submitted'
  'quote-created'
  'email-verified'
  'payment-accepted'
  'challenge-feedback-provided'
  'Submission'
  'Registration'
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
    coPilot          = getField events, 'copilot-assigned', 'copilotId'
    submission       = 'Batman9000' # placeholders
    feedback         = 'Batman9000'
    feedback2        = 'Batman9000'
    members          = getField events, 'Registration', 'registrants'
    submissionThumbs = getSubmissionThumbs events

    for eventType in eventTypes
      createdDates[eventType] = getCreatedAt eventType, events

    timeline =
      events          : events
      createdDates    : createdDates
      coPilot         : coPilot
      members         : members
      avatars         : {}
      submission      : submission
      submissionThumbs: submissionThumbs
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

  getSubmissionThumbs = (events) ->
    thumbs = []
    submissions = (getField events, 'Submission', 'submissions') or []

    for submission in submissions
      thumbUrl = SUBMISSION_URL + '/?module=DownloadSubmission&sbmid='
      thumbUrl +=  submission?.submissionId + '&sbt=tiny'

      thumbs.push thumbUrl

    thumbs

  findEvent = (type, events) ->
    for e in events
      return e if e.eventSubType == type

    false

  findAllEvents = (type, events) ->
    foundEvents = []

    for e in events
      foundEvents.push(e) if e.eventSubType == type

    foundEvents

  getField = (events, type, field) ->
    event = findEvent type, events
    event?.sourceObjectContent?[field]

  getCreatedAt = (type, events) ->
    e = findEvent type, events
    e?.createdAt

  getEvents: getEvents

srv.$inject = ['TimelineAPIService', 'UserAPIService', 'AVATAR_URL', 'SUBMISSION_URL']

angular.module('appirio-tech-timeline').factory 'TimelineService', srv
