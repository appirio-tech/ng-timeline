(function() {
  'use strict';
  var srv;

  srv = function(TimelineAPIService) {
    var findEvent, getCreatedAt, getEvents;
    getEvents = function(params, onSuccess) {
      var resource;
      resource = TimelineAPIService.query(params);
      resource.$promise.then(function(response) {
        var coPilotedDate, quotedDate, submittedDate, timeline;
        submittedDate = getCreatedAt('submitted', response);
        quotedDate = getCreatedAt('quote-created', response);
        coPilotedDate = getCreatedAt('copilot-assigned', response);
        timeline = {
          events: response,
          submittedDate: submittedDate,
          quotedDate: quotedDate,
          coPilotedDate: coPilotedDate
        };
        return typeof onSuccess === "function" ? onSuccess(timeline) : void 0;
      });
      resource.$promise["catch"](function() {});
      return resource.$promise["finally"](function() {});
    };
    findEvent = function(type, events) {
      var e, i, len;
      for (i = 0, len = events.length; i < len; i++) {
        e = events[i];
        if (e.eventSubType === type) {
          return e;
        }
      }
      return false;
    };
    getCreatedAt = function(type, events) {
      var e;
      e = findEvent(type, events);
      return e != null ? e.createdAt : void 0;
    };
    return {
      getEvents: getEvents
    };
  };

  srv.$inject = ['TimelineAPIService'];

  angular.module('timeline').factory('TimelineService', srv);

}).call(this);
