'use strict'

eventTypes = [
  'copilot-assigned'
  'created'
  'submitted'
  'quote-created'
  'work-estimate-approved'
  'email-verified'
  'payment-accepted'
  'challenge-feedback-provided'
  'Submission'
  'Registration'
  'challenge-finalists-selected'
  'state-change'
  'work-project-launched'
  'checkpoint1'
  'finalists'
  'final-design'
  'winner'
  'final-feedback'
  'completed'
]

srv = (
  TimelineAPIService
  UserAPIService
  AVATAR_URL
  SUBMISSION_URL
  ThreadsAPIService
  UserV3APIService
) ->
  buildTimeline = (events, onChange) ->
    createdDates     = {}
    coPilotId        = getField events, 'copilot-assigned', 'copilotId'
    workName         = getField events, 'created', 'name'
    submission       = 'Batman9000' # placeholders
    feedback         = 'Batman9000'
    feedback2        = 'Batman9000'
    members          = getField events, 'Registration', 'registrants'
    members          = members || []
    quotedAmount     = getField events, 'quote-created', 'quotedAmount'
    submissionThumbs = getSubmissionThumbs events

    for eventType in eventTypes
      createdDates[eventType] = getCreatedAt eventType, events

    timeline =
      events          : events
      workName        : workName
      createdDates    : createdDates
      quotedAmount    : quotedAmount
      coPilotId       : coPilotId
      members         : members
      avatars         : {}
      submission      : submission
      submissionThumbs: submissionThumbs
      feedback        : feedback
      feedback2       : feedback2

    getCopilotHandle timeline, onChange if timeline.coPilotId

    for member in members
      buildAvatar timeline, member.handle, onChange

    onChange? timeline

  getCopilotHandle = (timeline, onChange) ->
    params =
      id: timeline.coPilotId

    UserV3APIService.get params, (response) ->
      timeline.coPilotHandle = response.handle

      buildAvatar timeline, timeline.coPilotHandle, onChange

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

  getField = (events, type, field) ->
    event = findEvent type, events
    event?.sourceObjectContent?[field]

  getCreatedAt = (type, events) ->
    e = findEvent type, events
    e?.createdAt

  getUnreadCount = (threadId, subscriberId, callback) ->
    params =
      id          : threadId
      subscriberId: subscriberId

    resource = ThreadsAPIService.get params

    resource.$promise.then (response) ->
      callback response.unreadCount

    resource.$promise.catch ->
      # need handle error

    resource.$promise.finally ->
      # need handle finally


  getEvents     : getEvents
  getUnreadCount: getUnreadCount

srv.$inject = [
  'TimelineAPIService'
  'UserAPIService'
  'AVATAR_URL'
  'SUBMISSION_URL'
  'ThreadsAPIService'
  'UserV3APIService'
]

angular.module('appirio-tech-timeline').factory 'TimelineService', srv
