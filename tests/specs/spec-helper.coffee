'use strict'

window.__karma__.loaded = ->
  # prevent karma from starting
  AutoConfigFakeServer.init()

  AutoConfigFakeServer.fakeServer.respondImmediately = true

  schema = __fixtures__['bower_components/work-api-schema/work-api-schema']

  AutoConfigFakeServer.consume schema, window.__karma__.start

beforeEach ->
  module 'appirio-tech-timeline'

# Transfer fakeserver responses to $httpBackend
beforeEach inject ($httpBackend) ->
  responses = window.AutoConfigFakeServer?.fakeServer?.responses

  if responses
    for response in responses
      upperCaseMethod = response.method.toUpperCase()
      request         = $httpBackend.when upperCaseMethod, response.url

      request.respond response.response[0], response.response[2]
