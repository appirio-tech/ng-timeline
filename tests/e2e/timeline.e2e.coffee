timelineText = null

describe 'timeline directive', ->
  beforeEach (done) ->
    browser.get 'http://localhost:9999/#/'

    $('timeline').getText().then (value) ->
      timelineText = value

      done()

  it 'should have batman in header', ->
    expect(timelineText.length).to.be.ok
