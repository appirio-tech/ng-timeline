(function() {
  'use strict';
  var TimelineController;

  TimelineController = function(TimelineService, $stateParams) {
    var activate, mapEvents, onSuccess, setStatus, vm;
    vm = this;
    mapEvents = [['submitted', 'submitted'], ['email', 'email-verified'], ['quote', 'quote-created'], ['payment', 'payment-accepted'], ['coPilot', 'copilot-assigned'], ['launched', 'launched'], ['joined', 'challenge-member-registered'], ['submissions', 'challenge-submission'], ['feedback', 'challenge-feedback-provided'], ['checkpoint1', 'checkpoint1'], ['finalists', 'finalists'], ['finalistsSelected', 'challenge-finalists-selected'], ['finalDesign', 'final-design'], ['winner', 'winner'], ['finalFeedback', 'final-feedback'], ['completed', 'completed']];
    activate = function() {
      var j, len, mapEvent, params, workId;
      for (j = 0, len = mapEvents.length; j < len; j++) {
        mapEvent = mapEvents[j];
        vm[mapEvent[0]] = {
          passed: false,
          completed: false
        };
      }
      params = workId = $stateParams.workId;
      return TimelineService.getEvents(params, onSuccess);
    };
    onSuccess = function(timeline) {
      return setStatus(timeline);
    };
    setStatus = function(timeline) {
      var i, j, k, len, len1, mapEvent, results;
      for (j = 0, len = mapEvents.length; j < len; j++) {
        mapEvent = mapEvents[j];
        vm[mapEvent[0]].completed = timeline.createdDates[mapEvent[1]] != null;
      }
      results = [];
      for (i = k = 0, len1 = mapEvents.length; k < len1; i = ++k) {
        mapEvent = mapEvents[i];
        if (mapEvents[i + 1]) {
          results.push(vm[mapEvent[0]].passed = vm[mapEvents[i + 1][0]].completed);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    activate();
    return vm;
  };

  TimelineController.$inject = ['TimelineService', '$stateParams'];

  angular.module('timeline').controller('TimelineController', TimelineController);

}).call(this);
