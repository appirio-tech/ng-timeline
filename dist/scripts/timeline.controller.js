(function() {
  'use strict';
  var TimelineController;

  TimelineController = function(TimelineService, $stateParams) {
    var activate, onSuccess, vm;
    vm = this;
    vm.submittedDate = null;
    vm.quotedDate = null;
    vm.coPilotedDate = null;
    activate = function() {
      var params, workId;
      params = workId = $stateParams.workId;
      return TimelineService.getEvents(params, onSuccess);
    };
    onSuccess = function(timeline) {
      vm.submittedDate = timeline.submittedDate;
      vm.quotedDate = timeline.quotedDate;
      return vm.coPilotedDate = timeline.coPilotedDate;
    };
    activate();
    return vm;
  };

  TimelineController.$inject = ['TimelineService', '$stateParams'];

  angular.module('timeline').controller('TimelineController', TimelineController);

}).call(this);
