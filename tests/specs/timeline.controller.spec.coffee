'use strict'

vm = null
serviceSpy = null

describe 'TimelineController', ->
  beforeEach inject ($rootScope, $controller, $httpBackend, $stateParams, TimelineService) ->
    stashIt $stateParams, 'workId'

    scope               = $rootScope.$new()
    $stateParams.workId = 'abc'
    serviceSpy          = sinon.spy TimelineService, 'getEvents'
    vm                  = $controller 'TimelineController', $scope: scope

    $httpBackend.flush()

  afterEach inject ($stateParams) ->
    serviceSpy.restore()
    unstashIt $stateParams, 'workId'

  it 'should have called TimelineService with `workId: "abc"', ->
    serviceSpy.calledWith workId: 'abc'
