(function() {
  'use strict';
  var eventTypes, srv;

  eventTypes = ['copilot-assigned', 'created', 'submitted', 'quote-created', 'email-verified', 'payment-accepted', 'challenge-feedback-provided', 'challenge-submission', 'challenge-member-registered', 'challenge-finalists-selected', 'state-change', 'launched', 'checkpoint1', 'finalists', 'final-design', 'winner', 'final-feedback', 'completed'];

  srv = function(TimelineAPIService) {
    var findEvent, getCreatedAt, getEvents;
    getEvents = function(params, onSuccess) {
      var resource;
      resource = TimelineAPIService.query(params);
      resource.$promise.then(function(response) {
        var createdDates, eventType, i, len, timeline;
        createdDates = {};
        for (i = 0, len = eventTypes.length; i < len; i++) {
          eventType = eventTypes[i];
          createdDates[eventType] = getCreatedAt(eventType, response);
        }
        timeline = {
          events: response,
          createdDates: createdDates
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
