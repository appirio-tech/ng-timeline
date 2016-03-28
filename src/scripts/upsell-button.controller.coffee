'use strict'

UpsellButtonController = ($scope, UpsellAPIService) ->
  vm                = this
  vm.workId         = $scope.workId

  upsellProject = ->
    params =
      workId: vm.workId

    resource = UpsellAPIService.post params

    resource.$promise.then (data) ->
      $scope.projectUpsold()

    resource.$promise.catch ->

    resource.$promise.finally ->

  vm


UpsellButtonController.$inject = ['$scope', 'UpsellAPIService']

angular.module('appirio-tech-ng-timeline').controller 'UpsellButtonController', UpsellButtonController