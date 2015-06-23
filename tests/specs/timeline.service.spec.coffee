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

  it 'should have a coPilotHandle of `abc`', ->
    expect(timeline.coPilotHandle).to.be.equal 'abc'

  it 'should have an avatar url of `abc`', ->
    expect(timeline.avatars['abc']).to.be.equal 'http://www.topcoder.com/i/m/cardiboy_big.jpg'

  it 'should have 1 members', ->
    expect(timeline.members.length).to.be.equal 1

  it 'should have a member of `exampleHandle`', ->
    expect(timeline.members[0].handle).to.be.equal 'exampleHandle'

  it 'should have a submission of `Batman9000`', ->
    expect(timeline.submission).to.be.equal 'Batman9000'

  it 'should have a feedback of `Batman9000`', ->
    expect(timeline.feedback).to.be.equal 'Batman9000'

  it 'should have a submission thumb url', ->
    expect(timeline.submissionThumbs[0]).to.be.equal 'https://studio.topcoder.com/?module=DownloadSubmission&sbmid=1234&sbt=tiny'
