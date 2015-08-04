(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-auth', 'appirio-tech-messaging'];

  angular.module('appirio-tech-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.html","<h1>Project Timeline</h1><hr/><ul><li ng-class=\"{ completed: vm.submitted.completed }\" class=\"milestone completed passed\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">0%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Project Submitted</label></section></li><li ng-class=\"{ completed: vm.coPilot.completed, passed: vm.coPilot.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">5%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-show=\"!vm.payment.completed &amp;&amp; !vm.coPilot.completed\">Assign Co-Pilot</label><label ng-show=\"vm.coPilot.completed\">Co-Pilot Assigned</label></section><div ng-show=\"vm.coPilot.completed\" class=\"avatar-box\"><svg class=\"avatar\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" enable-background=\"new 0 0 512 512\" xml:space=\"preserve\"><path fill=\"#020201\" d=\"M454.426,392.582c-5.439-16.32-15.298-32.782-29.839-42.362c-27.979-18.572-60.578-28.479-92.099-39.085 c-7.604-2.664-15.33-5.568-22.279-9.7c-6.204-3.686-8.533-11.246-9.974-17.886c-0.636-3.512-1.026-7.116-1.228-10.661 c22.857-31.267,38.019-82.295,38.019-124.136c0-65.298-36.896-83.495-82.402-83.495c-45.515,0-82.403,18.17-82.403,83.468 c0,43.338,16.255,96.5,40.489,127.383c-0.221,2.438-0.511,4.876-0.95,7.303c-1.444,6.639-3.77,14.058-9.97,17.743 c-6.957,4.133-14.682,6.756-22.287,9.42c-31.521,10.605-64.119,19.957-92.091,38.529c-14.549,9.58-24.403,27.159-29.838,43.479 c-5.597,16.938-7.886,37.917-7.541,54.917h205.958h205.974C462.313,430.5,460.019,409.521,454.426,392.582z\"/></svg><span>Hi I\'m </span><a href=\"#\">{{ vm.coPilotHandle }}</a><span>. I\'ll be your project manager.</span></div></li><li ng-class=\"{ completed: vm.quote.completed, passed: vm.quote.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">15%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.quote.completed\">Generate Quote</label><label ng-show=\"vm.quote.completed &amp;&amp; !vm.quoteAccepted.completed\">Quote has been generated.</label><label ng-show=\"vm.quoteAccepted.completed\">Quote accepted</label></section><div ng-show=\"vm.quote.completed &amp;&amp; !vm.quoteAccepted.completed\" class=\"quote\"><div class=\"cost\"><label>cost:</label><span class=\"price\">{{ vm.quotedAmount }}</span></div><div class=\"container\"><button ng-click=\"vm.acceptQuote()\" class=\"success\">accept</button><button class=\"danger\">reject</button></div></div></li><li ng-class=\"{ completed: vm.launched.completed, passed: vm.launched.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">25%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label>Project Launched</label></section></li><li ng-show=\"vm.showMessages\" class=\"notification messages no-progress completed\"><section class=\"checkpoint\"><div ng-class=\"{\'notification\': vm.unreadCount &gt; 0}\" class=\"point\"><button ng-click=\"vm.showMessagingWidget = true\" title=\"You have {{ vm.unreadCount }} new messages.\" class=\"count clean\">{{ vm.unreadCount }}</button><div ng-class=\"{active: vm.showMessagingWidget}\" class=\"tooltip\"><button ng-click=\"vm.showMessagingWidget = false\" class=\"clean close\">x</button><messaging thread-id=\"{{ vm.threadId }}\" subscriber-id=\"{{ vm.subscriberId }}\" class=\"widget\"></messaging></div></div><div class=\"lead-after\"></div><label><div class=\"avatar-box\"><img ng-src=\"http://www.topcoder.com/i/m/cardiboy_big.jpg\" class=\"avatar\"/>{{ vm.lastMessage }}</div></label></section><ul class=\"links\"><li><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean\">View</button></li><li><a ui-sref=\"messaging({ id: vm.threadId })\">View full thread</a></li></ul></li><li ng-class=\"{ completed: vm.joined.completed, passed: vm.joined.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">35%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.coPilot.completed\">Meet others</label><label ng-show=\"vm.coPilot.completed\">{{ vm.members.length }} member(s) have joined.</label></section></li><li ng-class=\"{ completed: vm.submissions.completed, passed: vm.submissions.passed }\" class=\"submissions\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 8</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.submissions.completed\">Recieve submissions</label><label ng-show=\"vm.submissions.completed\">Submission Recieved from <a href=\"#\">{{ vm.submissionHandle }} </a><time ng-show=\"vm.submissions.completed\" class=\"time\">{{ vm.submissions.completed | date : &quot;h:mma MMMM d, y&quot; }}</time></label></section><ul ng-show=\"vm.submissions.completed\"><li ng-repeat=\"submissionThumb in vm.submissionThumbs\"><img ng-src=\"{{ submissionThumb }}\"/></li></ul></li><li ng-class=\"{ completed: vm.checkpoint1.completed, passed: vm.checkpoint1.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Checkpoint 1</label></section></li><li ng-class=\"{ completed: vm.feedback.completed, passed: vm.feedback.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">65%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.feedback.completed\">Give Feedback?</label><label ng-show=\"vm.feedback.completed\">Feedback given to <a href=\"#\">{{ vm.feedbackHandle }}</a></label></section></li><li ng-class=\"{ completed: vm.finalists.completed, passed: vm.finalists.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">70%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Select Finalists</label></section><a href=\"\" ng-show=\"vm.finalists.completed &amp;&amp; !vm.finalistsSelected.completed\">View submissions and select finalists</a></li><li ng-show=\"vm.finalistsSelected.completed\" ng-class=\"{ passed: vm.finalistsSelected.passed }\" class=\"no-progress completed\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><label>You selected 4 finalists</label></section></li><li ng-class=\"{ completed: vm.finalDesign.completed, passed: vm.finalDesign.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">70%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Final Design Phase</label></section></li><li ng-class=\"{ completed: vm.winner.completed, passed: vm.winner.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">85%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Choose Winner!</label></section></li><li ng-class=\"{ completed: vm.finalFeedback.completed, passed: vm.finalFeedback.passed }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">95%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.finalFeedback.completed\">Final Feedback</label><label ng-show=\"vm.finalFeedback.completed\">Feedback given to <a href=\"#\">{{ vm.feedback2Handle }}</a></label></section><p ng-show=\"vm.finalFeedback.completed &amp;&amp; !vm.complete.completed\">Awaiting final design changes.</p></li><li ng-class=\"{ completed: vm.completed.completed, passed: vm.completed.passed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">100%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Project Complete</label></section></li></ul>");}]);
(function() {
  'use strict';
  var TimelineController;

  TimelineController = function($scope, TimelineService, $stateParams, UserV3Service, ThreadsAPIService, CoPilotAPIService) {
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
      return $scope.$watch(UserV3Service.getCurrentUser, function(user) {
        var params, publishers, resource, thread;
        vm.subscriberId = user.id;
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
      vm.workName = timeline.workName;
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
      var ref;
      vm.unreadCount = response.unreadCount;
      if (response.messages.length) {
        vm.showMessages = true;
        return vm.lastMessage = (ref = response.messages[response.messages.length - 1]) != null ? ref.body : void 0;
      }
    };
    activate();
    return vm;
  };

  TimelineController.$inject = ['$scope', 'TimelineService', '$stateParams', 'UserV3Service', 'ThreadsAPIService', 'CoPilotAPIService'];

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
        if (typeof onChange === "function") {
          onChange(timeline);
        }
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
        workId: params.workId
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
    url = API_URL + '/work/:workId/events';
    params = {
      workId: '@workId'
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
    url = API_URL + '/copilots/:copilotId/projects/:projectId/approved';
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
