'use strict'

TimelineController = (TimelineService, $stateParams) ->
  vm               = this
  vm.submittedDate = null
  vm.quotedDate    = null
  vm.coPilotedDate = null

  activate = ->
    params =
      workId = $stateParams.workId

    TimelineService.getEvents params, onSuccess

  onSuccess = (timeline) ->
    vm.submittedDate = timeline.submittedDate
    vm.quotedDate    = timeline.quotedDate
    vm.coPilotedDate = timeline.coPilotedDate

  activate()

  vm

TimelineController.$inject = ['TimelineService', '$stateParams']

angular.module('timeline').controller 'TimelineController', TimelineController

