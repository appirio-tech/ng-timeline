(function() {
  'use strict';
  angular.module('appirio-tech-timeline', ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-messaging']);

}).call(this);

angular.module("appirio-tech-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.html","<h1>Project Timeline</h1><hr/><ul><li ng-class=\"{ completed: vm.submitted.completed }\" class=\"milestone completed passed\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">0%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Project Submitted</label></section><p><time>{{ vm.submitted.completed | date }}</time></p></li><li ng-class=\"{ completed: vm.email.completed, passed: vm.email.passed, info: !vm.email.completed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">6%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label ng-hide=\"vm.email.completed\">We sent an email to johndoe@example.com. <br /> Click the link in the email to verify your email address.</label><label ng-show=\"vm.email.completed\">Thanks! Your email is verified.</label></section><a href=\"#\" ng-hide=\"vm.email.completed\" class=\"resend\">Re-send Email</a></li><li ng-class=\"{ completed: vm.quote.completed, passed: vm.quote.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">15%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.quote.completed\">Generate Quote</label><label ng-show=\"vm.quote.completed\">Quote has been generated.</label></section><p ng-show=\"vm.quote.completed &amp;&amp; !vm.payment.completed\"><a href=\"#\">View quote and pay to continue.</a></p><p ng-show=\"vm.quote.completed &amp;&amp; !vm.payment.completed\"><em>Co-Pilot will not be assigned until your payment has been approved.</em></p></li><li ng-class=\"{ completed: vm.payment.completed, passed: vm.payment.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">20%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.payment.completed\">Add Payment Method</label><label ng-show=\"vm.payment.completed\">Payment Method Accepted.</label></section></li><li ng-class=\"{ completed: vm.coPilot.completed, passed: vm.coPilot.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">5%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-show=\"!vm.payment.completed &amp;&amp; !vm.coPilot.completed\">Assign Co-Pilot</label><label ng-show=\"!vm.payment.completed &amp;&amp; vm.coPilot.completed\">We are choosing a Co-Pilot best suited for your project.</label><label ng-show=\"vm.coPilot.completed\">Co-Pilot Assigned</label></section><div ng-show=\"vm.coPilot.completed\" class=\"avatar-box\"><img src=\"{{ vm.avatars[vm.coPilotHandle] }}\" class=\"avatar\"/><span>Hi I\'m </span><a href=\"#\">{{ vm.coPilotHandle }}</a><span>. I\'ll be your project manager.</span></div></li><li ng-class=\"{ completed: vm.launched.completed, passed: vm.launched.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">25%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label>Project Launched</label></section></li><li class=\"notification messages no-progress\"><section class=\"checkpoint\"><div class=\"point tooltip-item\"><div ng-click=\"vm.showMessagingWidget = true\" class=\"button clean\">6</div><div ng-class=\"{active: vm.showMessagingWidget}\" class=\"tooltip\"><button ng-click=\"vm.showMessagingWidget = false\" class=\"clean close\">x</button><messaging thread-id=\"123\" created-by=\"Batman\" class=\"widget\"></messaging></div></div><div class=\"lead-after\"></div><label ng-hide=\"vm.coPilot.completed\">Messages</label><label ng-show=\"vm.coPilot.completed\"><div ng-show=\"vm.coPilot.completed\" class=\"avatar-box\"><img ng-src=\"{{ vm.avatars[member.handle] }}\" class=\"avatar\"/><span class=\"message\">Maybe it\'s best if we stick with the current logo and Maybe it\'s best if we stick with the current logo and</span></div></label></section><ul class=\"links\"><li><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean\">View</button></li><li><a ui-sref=\"messaging({id: 123})\">View full thread</a></li></ul></li><li ng-class=\"{ completed: vm.joined.completed, passed: vm.joined.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">35%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.coPilot.completed\">Meet others</label><label ng-show=\"vm.coPilot.completed\">{{ vm.members.length }} member(s) have joined.</label></section></li><li ng-class=\"{ completed: vm.submissions.completed, passed: vm.submissions.passed }\" class=\"submissions\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 8</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.submissions.completed\">Recieve submissions</label><label ng-show=\"vm.submissions.completed\">Submission Recieved from <a href=\"#\">{{ vm.submissionHandle }} </a><time ng-show=\"vm.submissions.completed\" class=\"time\">{{ vm.submissions.completed | date : &quot;h:mma MMMM d, y&quot; }}</time></label></section><ul ng-show=\"vm.submissions.completed\"><li ng-repeat=\"submissionThumb in vm.submissionThumbs\"><img ng-src=\"{{ submissionThumb }}\"/></li></ul></li><li ng-class=\"{ completed: vm.checkpoint1.completed, passed: vm.checkpoint1.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Checkpoint 1</label></section></li><li ng-class=\"{ completed: vm.feedback.completed, passed: vm.feedback.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">65%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.feedback.completed\">Give Feedback?</label><label ng-show=\"vm.feedback.completed\">Feedback given to <a href=\"#\">{{ vm.feedbackHandle }}</a></label></section></li><li ng-class=\"{ completed: vm.finalists.completed, passed: vm.finalists.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">50%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Select Finalists</label></section><a href=\"\" ng-show=\"vm.finalists.completed &amp;&amp; !vm.finalistsSelected.completed\">View submissions and select finalists</a></li><li ng-show=\"vm.finalistsSelected.completed\" ng-class=\"{ passed: vm.finalistsSelected.passed }\" class=\"no-progress completed\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><label>You selected 4 finalists</label></section></li><li ng-class=\"{ completed: vm.finalDesign.completed, passed: vm.finalDesign.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">70%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Final Design Phase</label></section></li><li ng-class=\"{ completed: vm.winner.completed, passed: vm.winner.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">85%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Choose Winner!</label></section></li><li ng-class=\"{ completed: vm.finalFeedback.completed, passed: vm.finalFeedback.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">95%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.finalFeedback.completed\">Final Feedback</label><label ng-show=\"vm.finalFeedback.completed\">Feedback given to <a href=\"#\">{{ vm.feedback2Handle }}</a></label></section><p ng-show=\"vm.finalFeedback.completed &amp;&amp; !vm.complete.completed\">Awaiting final design changes.</p></li><li ng-class=\"{ completed: vm.completed.completed, passed: vm.completed.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">100%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Project Complete</label></section></li></ul>");}]);
(function() {
  'use strict';
  var TimelineController;

  TimelineController = function(TimelineService, $stateParams) {
    var activate, mapEvents, onChange, setStatus, vm;
    vm = this;
    vm.coPilotHandle = null;
    vm.members = [];
    vm.avatars = {};
    vm.submissionHandle = null;
    vm.feedbackHandle = null;
    vm.feedback2Handle = null;
    vm.showMessagingWidget = false;
    mapEvents = [
      {
        key: 'submitted',
        value: 'submitted'
      }, {
        key: 'email',
        value: 'email-verified'
      }, {
        key: 'quote',
        value: 'quote-created'
      }, {
        key: 'payment',
        value: 'payment-accepted'
      }, {
        key: 'coPilot',
        value: 'copilot-assigned'
      }, {
        key: 'launched',
        value: 'launched'
      }, {
        key: 'joined',
        value: 'challenge-member-registered'
      }, {
        key: 'submissions',
        value: 'challenge-submission'
      }, {
        key: 'feedback',
        value: 'challenge-feedback-provided'
      }, {
        key: 'checkpoint1',
        value: 'checkpoint1'
      }, {
        key: 'finalists',
        value: 'finalists'
      }, {
        key: 'finalistsSelected',
        value: 'challenge-finalists-selected'
      }, {
        key: 'finalDesign',
        value: 'final-design'
      }, {
        key: 'winner',
        value: 'winner'
      }, {
        key: 'finalFeedback',
        value: 'final-feedback'
      }, {
        key: 'completed',
        value: 'completed'
      }
    ];
    activate = function() {
      var j, len, mapEvent, params;
      for (j = 0, len = mapEvents.length; j < len; j++) {
        mapEvent = mapEvents[j];
        vm[mapEvent.key] = {
          passed: false,
          completed: false
        };
      }
      params = {
        workId: $stateParams.workId
      };
      return TimelineService.getEvents(params, onChange);
    };
    onChange = function(timeline) {
      setStatus(timeline);
      vm.coPilotHandle = timeline.coPilot;
      vm.members = timeline.members;
      vm.avatars = timeline.avatars;
      vm.submissionHandle = timeline.submission;
      vm.submissionThumbs = timeline.submissionThumbs;
      vm.feedbackHandle = timeline.feedback;
      return vm.feedback2Handle = timeline.feedback2;
    };
    setStatus = function(timeline) {
      var i, j, k, len, len1, mapEvent, ref, results;
      for (j = 0, len = mapEvents.length; j < len; j++) {
        mapEvent = mapEvents[j];
        vm[mapEvent.key].completed = (ref = timeline.createdDates) != null ? ref[mapEvent.value] : void 0;
      }
      results = [];
      for (i = k = 0, len1 = mapEvents.length; k < len1; i = ++k) {
        mapEvent = mapEvents[i];
        if (mapEvents[i + 1]) {
          results.push(vm[mapEvent.key].passed = vm[mapEvents[i + 1].key].completed);
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

  angular.module('appirio-tech-timeline').controller('TimelineController', TimelineController);

}).call(this);

(function() {
  'use strict';
  var eventTypes, srv;

  eventTypes = ['copilot-assigned', 'created', 'submitted', 'quote-created', 'email-verified', 'payment-accepted', 'challenge-feedback-provided', 'challenge-submission', 'challenge-member-registered', 'challenge-finalists-selected', 'state-change', 'launched', 'checkpoint1', 'finalists', 'final-design', 'winner', 'final-feedback', 'completed'];

  srv = function(TimelineAPIService, UserAPIService, AVATAR_URL, SUBMISSION_URL) {
    var buildAvatar, buildTimeline, findAllEvents, findEvent, getCreatedAt, getEvents, getHandle, getMembers, getSubmissionThumbs;
    buildTimeline = function(events, onChange) {
      var coPilot, createdDates, eventType, feedback, feedback2, i, j, len, len1, member, members, submission, submissionThumbs, timeline;
      createdDates = {};
      coPilot = getHandle(events, 'copilot-assigned');
      submission = getHandle(events, 'challenge-submission');
      feedback = getHandle(events, 'challenge-feedback-provided');
      feedback2 = getHandle(events, 'final-feedback');
      members = getMembers(events);
      submissionThumbs = getSubmissionThumbs(events);
      for (i = 0, len = eventTypes.length; i < len; i++) {
        eventType = eventTypes[i];
        createdDates[eventType] = getCreatedAt(eventType, events);
      }
      timeline = {
        events: events,
        createdDates: createdDates,
        coPilot: coPilot,
        members: members,
        avatars: {},
        submission: submission,
        submissionThumbs: submissionThumbs,
        feedback: feedback,
        feedback2: feedback2
      };
      if (coPilot) {
        buildAvatar(timeline, coPilot, onChange);
      }
      for (j = 0, len1 = members.length; j < len1; j++) {
        member = members[j];
        buildAvatar(timeline, member.handle, onChange);
      }
      return typeof onChange === "function" ? onChange(timeline) : void 0;
    };
    buildAvatar = function(timeline, handle, onChange) {
      var user, userParams;
      if (!timeline.avatars[handle]) {
        userParams = {
          handle: handle
        };
        user = UserAPIService.get(userParams);
        user.$promise.then(function(response) {
          timeline.avatars[handle] = AVATAR_URL + (response != null ? response.photoLink : void 0);
          return typeof onChange === "function" ? onChange(timeline) : void 0;
        });
        user.$promise["catch"](function() {});
        return user.$promise["finally"](function() {});
      }
    };
    getEvents = function(params, onChange) {
      var queryParams, resource;
      queryParams = {
        filter: 'sourceObjectId=' + params.workId
      };
      resource = TimelineAPIService.query(queryParams);
      resource.$promise.then(function(response) {
        return buildTimeline(response, onChange);
      });
      resource.$promise["catch"](function() {});
      return resource.$promise["finally"](function() {});
    };
    getSubmissionThumbs = function(events) {
      var i, len, ref, submissionEvent, submissionEvents, thumbUrl, thumbs;
      thumbs = [];
      submissionEvents = findAllEvents('challenge-submission', events);
      for (i = 0, len = submissionEvents.length; i < len; i++) {
        submissionEvent = submissionEvents[i];
        thumbUrl = SUBMISSION_URL + '/?module=DownloadSubmission&sbmid=';
        thumbUrl += (submissionEvent != null ? (ref = submissionEvent.sourceObjectContent) != null ? ref.submissionId : void 0 : void 0) + '&sbt=tiny';
        thumbs.push(thumbUrl);
      }
      return thumbs;
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
    findAllEvents = function(type, events) {
      var e, foundEvents, i, len;
      foundEvents = [];
      for (i = 0, len = events.length; i < len; i++) {
        e = events[i];
        if (e.eventSubType === type) {
          foundEvents.push(e);
        }
      }
      return foundEvents;
    };
    getHandle = function(events, type) {
      var event, ref;
      event = findEvent(type, events);
      return event != null ? (ref = event.sourceObjectContent) != null ? ref.handle : void 0 : void 0;
    };
    getMembers = function(events) {
      var i, len, memberEvent, memberEvents, members, ref;
      members = [];
      memberEvents = findAllEvents('challenge-member-registered', events);
      for (i = 0, len = memberEvents.length; i < len; i++) {
        memberEvent = memberEvents[i];
        members.push({
          handle: memberEvent != null ? (ref = memberEvent.sourceObjectContent) != null ? ref.handle : void 0 : void 0,
          joined: memberEvent != null ? memberEvent.createdAt : void 0
        });
      }
      return members;
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

  srv.$inject = ['TimelineAPIService', 'UserAPIService', 'AVATAR_URL', 'SUBMISSION_URL'];

  angular.module('appirio-tech-timeline').factory('TimelineService', srv);

}).call(this);

(function() {
  'use strict';
  var srv, transformResponse;

  transformResponse = function(response) {
    var parsed, ref;
    parsed = JSON.parse(response);
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || [];
  };

  srv = function($resource, API_URL) {
    var actions, params, url;
    url = API_URL + '/events';
    params = {
      filter: 'sourceObjectId%3D@workId'
    };
    actions = {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: transformResponse
      }
    };
    return $resource(url, params, actions);
  };

  srv.$inject = ['$resource', 'API_URL'];

  angular.module('appirio-tech-timeline').factory('TimelineAPIService', srv);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($resource, API_URL_V2) {
    var params, url;
    url = API_URL_V2 + '/users/:handle';
    params = {
      handle: '@handle'
    };
    return $resource(url, params);
  };

  srv.$inject = ['$resource', 'API_URL_V2'];

  angular.module('appirio-tech-timeline').factory('UserAPIService', srv);

}).call(this);
