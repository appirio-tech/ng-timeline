'use strict'

timeline = null
coPilot  = null

describe 'TimelineService', ->
  beforeEach inject (TimelineService, $httpBackend) ->
    params =
      workId: 123

    TimelineService.getEvents params, (response) ->
      timeline = response

    $httpBackend.flush()

  it 'should have an array of events', ->
    expect(timeline.events.length).to.be.ok

  it 'should have created dates for completed', ->
    expect(timeline.createdDates.completed).to.be.equal '2015-05-05T20:53:41.467Z'

  it 'should have a co-pilot of `Batman9000`', ->
    expect(timeline.coPilot).to.be.equal 'Batman9000'

  it 'should have 1 members', ->
    expect(timeline.members.length).to.be.equal 1

  it 'should have a member of `Batman9000`', ->
    expect(timeline.members[0]).to.be.equal 'Batman9000'

