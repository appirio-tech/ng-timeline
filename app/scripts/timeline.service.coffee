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

srv = (TimelineAPIService) ->
  getEvents = (params, onSuccess) ->
    resource = TimelineAPIService.query params

    resource.$promise.then (response) ->
      createdDates = {}
      for eventType in eventTypes
        createdDates[eventType] = getCreatedAt eventType, response

      timeline =
        events      : response
        createdDates: createdDates

      onSuccess? timeline

    resource.$promise.catch ->
      # need handle error

    resource.$promise.finally ->
      # need handle finally

  findEvent = (type, events) ->
    for e in events
      return e if e.eventSubType == type

    false

  getCreatedAt = (type, events) ->
    e = findEvent type, events
    e?.createdAt

  getEvents: getEvents

srv.$inject = ['TimelineAPIService']

angular.module('timeline').factory 'TimelineService', srv
