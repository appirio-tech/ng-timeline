'use strict'
describe 'TimelineController', ->

  controller = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'TimelineAPIService'
    scope = $rootScope.$new()

    bard.mockService TimelineAPIService,
      _default: $promise: $q.when({})

    controller = $controller('TimelineController', $scope: scope)
    scope.vm = controller

  describe 'Final Fixes Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should initialize events', ->
      expect(controller.events).to.be.ok

    it 'should call TimelineAPIService to initialize events', ->
      expect(TimelineAPIService.get.called).to.be.ok

    it 'should have a vm.expanded property', ->
      expect(controller.expanded).to.be.ok
