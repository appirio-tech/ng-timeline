(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-messaging'];

  angular.module('appirio-tech-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.html","<h1>Project Timeline</h1><hr/><ul><li ng-class=\"{ completed: vm.submitted.completed }\" class=\"milestone completed passed\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">0%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Project Submitted</label></section></li><li ng-class=\"{ completed: vm.coPilot.completed, passed: vm.coPilot.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">5%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-show=\"!vm.payment.completed &amp;&amp; !vm.coPilot.completed\">Assign Co-Pilot</label><label ng-show=\"vm.coPilot.completed\">Co-Pilot Assigned</label></section></li><li ng-class=\"{ completed: vm.quote.completed, passed: vm.quote.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">15%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.quote.completed\">Generate Quote</label><label ng-show=\"vm.quote.completed\">Quote has been generated.</label></section><div ng-show=\"vm.quote.completed &amp;&amp; !vm.quoteAccepted.completed\" class=\"quote\"><div class=\"cost\"><label>cost:</label><span class=\"price\">${{ vm.quotedAmount }}</span></div><div class=\"time\"><label>time:</label><span class=\"time\">21 days</span></div><button ng-click=\"vm.acceptQuote()\">accept</button><button>reject</button></div></li><li ng-class=\"{ completed: vm.launched.completed, passed: vm.launched.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">25%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label>Project Launched</label></section></li><li ng-show=\"vm.showMessages\" class=\"notification messages no-progress completed\"><section class=\"checkpoint\"><div ng-class=\"{\'notification\': vm.unreadCount &gt; 0}\" class=\"point\"><button ng-click=\"vm.showMessagingWidget = true\" title=\"You have {{ vm.unreadCount }} new messages.\" class=\"count clean\">{{ vm.unreadCount }}</button><div ng-class=\"{active: vm.showMessagingWidget}\" class=\"tooltip\"><button ng-click=\"vm.showMessagingWidget = false\" class=\"clean close\">x</button><messaging thread-id=\"{{ vm.threadId }}\" class=\"widget\"></messaging></div></div><div class=\"lead-after\"></div><label ng-hide=\"vm.coPilot.completed\">Messages</label><label ng-show=\"vm.coPilot.completed\"><div ng-show=\"vm.coPilot.completed\" class=\"avatar-box\"><img ng-src=\"{{ vm.avatars[member.handle] }}\" class=\"avatar\"/><span class=\"message\">Maybe it\'s best if we stick with the current logo and Maybe it\'s best if we stick with the current logo and</span></div></label></section><ul class=\"links\"><li><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean\">View</button></li><li><a ui-sref=\"messaging({ id: vm.threadId })\">View full thread</a></li></ul></li><li ng-class=\"{ completed: vm.joined.completed, passed: vm.joined.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">35%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.coPilot.completed\">Meet others</label><label ng-show=\"vm.coPilot.completed\">{{ vm.members.length }} member(s) have joined.</label></section></li><li ng-class=\"{ completed: vm.submissions.completed, passed: vm.submissions.passed }\" class=\"submissions\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 8</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.submissions.completed\">Recieve submissions</label><label ng-show=\"vm.submissions.completed\">Submission Recieved from <a href=\"#\">{{ vm.submissionHandle }} </a><time ng-show=\"vm.submissions.completed\" class=\"time\">{{ vm.submissions.completed | date : &quot;h:mma MMMM d, y&quot; }}</time></label></section><ul ng-show=\"vm.submissions.completed\"><li ng-repeat=\"submissionThumb in vm.submissionThumbs\"><img ng-src=\"{{ submissionThumb }}\"/></li></ul></li><li ng-class=\"{ completed: vm.checkpoint1.completed, passed: vm.checkpoint1.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Checkpoint 1</label></section></li><li ng-class=\"{ completed: vm.feedback.completed, passed: vm.feedback.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">65%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.feedback.completed\">Give Feedback?</label><label ng-show=\"vm.feedback.completed\">Feedback given to <a href=\"#\">{{ vm.feedbackHandle }}</a></label></section></li><li ng-class=\"{ completed: vm.finalists.completed, passed: vm.finalists.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">50%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Select Finalists</label></section><a href=\"\" ng-show=\"vm.finalists.completed &amp;&amp; !vm.finalistsSelected.completed\">View submissions and select finalists</a></li><li ng-show=\"vm.finalistsSelected.completed\" ng-class=\"{ passed: vm.finalistsSelected.passed }\" class=\"no-progress completed\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><label>You selected 4 finalists</label></section></li><li ng-class=\"{ completed: vm.finalDesign.completed, passed: vm.finalDesign.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">70%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Final Design Phase</label></section></li><li ng-class=\"{ completed: vm.winner.completed, passed: vm.winner.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">85%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Choose Winner!</label></section></li><li ng-class=\"{ completed: vm.finalFeedback.completed, passed: vm.finalFeedback.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">95%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.finalFeedback.completed\">Final Feedback</label><label ng-show=\"vm.finalFeedback.completed\">Feedback given to <a href=\"#\">{{ vm.feedback2Handle }}</a></label></section><p ng-show=\"vm.finalFeedback.completed &amp;&amp; !vm.complete.completed\">Awaiting final design changes.</p></li><li ng-class=\"{ completed: vm.completed.completed, passed: vm.completed.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">100%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Project Complete</label></section></li></ul>");}]);
(function() {
  'use strict';
  var TimelineController;

  TimelineController = function(TimelineService, $stateParams, UserV3Service, ThreadsAPIService, CoPilotAPIService) {
    var acceptQuote, activate, getOrCreateThread, mapEvents, onChange, setStatus, setUnreadCount, vm;
    vm = this;
    vm.coPilotHandle = null;
    vm.members = [];
    vm.avatars = {};
    vm.submissionHandle = null;
    vm.feedbackHandle = null;
    vm.feedback2Handle = null;
    vm.showMessagingWidget = false;
    vm.unreadCount = null;
    mapEvents = [
      {
        key: 'submitted',
        value: 'submitted'
      }, {
        key: 'email',
        value: 'email-verified'
      }, {
        key: 'coPilot',
        value: 'copilot-assigned'
      }, {
        key: 'quote',
        value: 'quote-created'
      }, {
        key: 'quoteAccepted',
        value: 'work-estimate-approved'
      }, {
        key: 'payment',
        value: 'payment-accepted'
      }, {
        key: 'launched',
        value: 'work-project-launched'
      }, {
        key: 'joined',
        value: 'Registration'
      }, {
        key: 'submissions',
        value: 'Submission'
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
      TimelineService.getEvents(params, onChange);
      return vm.acceptQuote = acceptQuote;
    };
    getOrCreateThread = function() {
      return UserV3Service.getCurrentUser(function(user) {
        var params, publishers, resource, thread;
        publishers = [vm.coPilotId, user.id];
        params = {
          clientIdentifier: $stateParams.workId,
          context: 'work',
          subject: vm.workName,
          publishers: publishers,
          subscribers: publishers
        };
        thread = new ThreadsAPIService(params);
        resource = thread.$save();
        return resource.then(function(response) {
          var ref, ref1;
          vm.threadId = response != null ? (ref = response.result) != null ? (ref1 = ref.content) != null ? ref1.id : void 0 : void 0 : void 0;
          return TimelineService.getUnreadCount(vm.threadId, user.id, setUnreadCount);
        });
      });
    };
    acceptQuote = function() {
      var copilot, params, resource;
      params = {
        copilotId: vm.coPilotId,
        projectId: $stateParams.workId,
        approved: true
      };
      copilot = new CoPilotAPIService(params);
      resource = copilot.$save();
      return resource.then(function(response) {
        return vm.quoteAccepted.completed = true;
      });
    };
    onChange = function(timeline) {
      setStatus(timeline);
      vm.coPilotHandle = timeline.coPilotHandle;
      vm.coPilotId = timeline.coPilotId;
      vm.members = timeline.members;
      vm.avatars = timeline.avatars;
      vm.submissionHandle = timeline.submission;
      vm.submissionThumbs = timeline.submissionThumbs;
      vm.feedbackHandle = timeline.feedback;
      vm.feedback2Handle = timeline.feedback2;
      vm.quotedAmount = timeline.quotedAmount;
      if (vm.coPilotId) {
        return getOrCreateThread();
      }
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
    setUnreadCount = function(response) {
      vm.unreadCount = response.unreadCount;
      if (response.messages.length) {
        return vm.showMessages = true;
      }
    };
    activate();
    return vm;
  };

  TimelineController.$inject = ['TimelineService', '$stateParams', 'UserV3Service', 'ThreadsAPIService', 'CoPilotAPIService'];

  angular.module('appirio-tech-timeline').controller('TimelineController', TimelineController);

}).call(this);

(function() {
  'use strict';
  var eventTypes, srv;

  eventTypes = ['copilot-assigned', 'created', 'submitted', 'quote-created', 'work-estimate-approved', 'email-verified', 'payment-accepted', 'challenge-feedback-provided', 'Submission', 'Registration', 'challenge-finalists-selected', 'state-change', 'work-project-launched', 'checkpoint1', 'finalists', 'final-design', 'winner', 'final-feedback', 'completed'];

  srv = function(TimelineAPIService, UserAPIService, AVATAR_URL, SUBMISSION_URL, ThreadsAPIService, UserV3APIService) {
    var buildAvatar, buildTimeline, findEvent, getCopilotHandle, getCreatedAt, getEvents, getField, getSubmissionThumbs, getUnreadCount;
    buildTimeline = function(events, onChange) {
      var coPilotId, createdDates, eventType, feedback, feedback2, i, j, len, len1, member, members, quotedAmount, submission, submissionThumbs, timeline, workName;
      createdDates = {};
      coPilotId = getField(events, 'copilot-assigned', 'copilotId');
      workName = getField(events, 'created', 'name');
      submission = 'Batman9000';
      feedback = 'Batman9000';
      feedback2 = 'Batman9000';
      members = getField(events, 'Registration', 'registrants');
      members = members || [];
      quotedAmount = getField(events, 'quote-created', 'quotedAmount');
      submissionThumbs = getSubmissionThumbs(events);
      for (i = 0, len = eventTypes.length; i < len; i++) {
        eventType = eventTypes[i];
        createdDates[eventType] = getCreatedAt(eventType, events);
      }
      timeline = {
        events: events,
        workName: workName,
        createdDates: createdDates,
        quotedAmount: quotedAmount,
        coPilotId: coPilotId,
        members: members,
        avatars: {},
        submission: submission,
        submissionThumbs: submissionThumbs,
        feedback: feedback,
        feedback2: feedback2
      };
      if (timeline.coPilotId) {
        getCopilotHandle(timeline, onChange);
      }
      for (j = 0, len1 = members.length; j < len1; j++) {
        member = members[j];
        buildAvatar(timeline, member.handle, onChange);
      }
      return typeof onChange === "function" ? onChange(timeline) : void 0;
    };
    getCopilotHandle = function(timeline, onChange) {
      var params;
      params = {
        id: timeline.coPilotId
      };
      return UserV3APIService.get(params, function(response) {
        timeline.coPilotHandle = response.handle;
        return buildAvatar(timeline, timeline.coPilotHandle, onChange);
      });
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
      var i, len, submission, submissions, thumbUrl, thumbs;
      thumbs = [];
      submissions = (getField(events, 'Submission', 'submissions')) || [];
      for (i = 0, len = submissions.length; i < len; i++) {
        submission = submissions[i];
        thumbUrl = SUBMISSION_URL + '/?module=DownloadSubmission&sbmid=';
        thumbUrl += (submission != null ? submission.submissionId : void 0) + '&sbt=tiny';
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
    getField = function(events, type, field) {
      var event, ref;
      event = findEvent(type, events);
      return event != null ? (ref = event.sourceObjectContent) != null ? ref[field] : void 0 : void 0;
    };
    getCreatedAt = function(type, events) {
      var e;
      e = findEvent(type, events);
      return e != null ? e.createdAt : void 0;
    };
    getUnreadCount = function(threadId, subscriberId, callback) {
      var params, resource;
      params = {
        id: threadId,
        subscriberId: subscriberId
      };
      resource = ThreadsAPIService.get(params);
      resource.$promise.then(function(response) {
        return callback(response);
      });
      resource.$promise["catch"](function() {});
      return resource.$promise["finally"](function() {});
    };
    return {
      getEvents: getEvents,
      getUnreadCount: getUnreadCount
    };
  };

  srv.$inject = ['TimelineAPIService', 'UserAPIService', 'AVATAR_URL', 'SUBMISSION_URL', 'ThreadsAPIService', 'UserV3APIService'];

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

  srv = function($resource, API_URL) {
    var params, url;
    url = API_URL + '/copilots/:copilotId/projects/:projectId';
    params = {
      copilotId: '@copilotId',
      projectId: '@projectId'
    };
    return $resource(url, params);
  };

  srv.$inject = ['$resource', 'API_URL'];

  angular.module('appirio-tech-timeline').factory('CoPilotAPIService', srv);

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
