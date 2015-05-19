'use strict'

timeline  = null

describe 'TimelineService', ->
  beforeEach inject (TimelineService, $httpBackend) ->
    params =
      workId: 123

    TimelineService.getEvents params, (response) ->
      timeline = response

    $httpBackend.flush()

  it "should have an array of events", ->
    expect(timeline.events.length).to.be.ok

  it "should have 11 created dates"
    expect(timeline.createdDates.length).to.be.equal 11
