'use strict'

vm = null

describe 'TimelineController', ->
  beforeEach inject ($rootScope, $controller, $httpBackend) ->
    scope = $rootScope.$new()
    vm    = $controller 'TimelineController', $scope: scope

    $httpBackend.flush()

  it 'should have vm.email completed and passed', ->
    expect(vm.email.completed).to.be.ok
    expect(vm.email.passed).to.be.ok

