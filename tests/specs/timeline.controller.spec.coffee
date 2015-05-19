'use strict'

vm = null

describe 'TimelineController', ->
  beforeEach inject ($rootScope, $controller, $httpBackend) ->
    scope = $rootScope.$new()
    vm    = $controller 'TimelineController', $scope: scope

    $httpBackend.flush()

  it 'should have createdDates array', ->
    expect(vm.createdDates.length).to.be.equal 11

