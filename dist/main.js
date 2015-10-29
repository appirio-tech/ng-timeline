(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-api-services', 'appirio-tech-ng-ui-components'];

  angular.module('appirio-tech-ng-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-ng-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.directive.html","<main class=\"flex center stretch\"><loader ng-if=\"vm.loading\"></loader><div class=\"timeline\"></div><ul><li ng-repeat-start=\"eventGroup in vm.eventGroups\" ng-if=\"eventGroup.text != \'Project Complete\' \" ng-class=\"{ expanded: vm.expanded[eventGroup.text], disabled: eventGroup.events.length == 0 }\" class=\"event-group\"><header class=\"flex\"><button ng-class=\"{ expanded: vm.expanded[eventGroup.text]}\" ng-click=\"vm.expanded[eventGroup.text] = !vm.expanded[eventGroup.text]\" class=\"clean point\"></button><h4 class=\"flex-grow\">{{eventGroup.text}}</h4><time>{{eventGroup.createdTime | date}}</time></header><ul ng-class=\"{ expanded: vm.expanded[eventGroup.text] }\" class=\"expand-big events\"><li><hr/></li><li ng-repeat-start=\"event in eventGroup.events\" ng-if=\"vm.expanded[event.type] != undefined\" ng-class=\"{expanded: vm.expanded[event.type], finish: vm.isAFinishEvent(eventGroup.text, event.type, event.completed) }\" class=\"event\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"></button><timeline-status-update ng-if=\"event.type == \'STATUS_UPDATE\' \"><h2>{{event.header}}</h2><time>{{event.eventTime | timeLapse}}</time><p>{{event.text}}</p></timeline-status-update><timeline-copilot ng-if=\"event.type == \'COPILOT_ASSIGNED\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\"><h2>Co-pilot assigned!</h2><time>{{ event.eventTime | timeLapse}}</time><main ng-show=\"event.copilot.handle\" class=\"avatar-box flex center middle\"><avatar avatar-url=\"{{ event.copilot.avatar }}\"></avatar><p class=\"co-pilot\">Hi I\'m <a href=\"#\"> {{ event.copilot.handle }} </a>. I\'ll be your project manager.</p></main></timeline-copilot><timeline-quote ng-if=\"event.type == \'QUOTE_INFO\' &amp;&amp; event.status != \'Accepted\' \" ng-class=\"{ expanded: vm.expanded[event.type] }\"><h2>Quote generated</h2><time>{{event.eventTime | timeLapse}}</time><main><p>View quote and accept to continue your project.</p><div class=\"estimate\"><ul class=\"flex middle space-between\"><li class=\"cost\"><div class=\"range\">${{ event.price.min }} - ${{ event.price.max }}</div><h6>Cost estimate</h6></li><li class=\"splitter\"></li><li class=\"duration\"><div class=\"range\">{{ event.duration.min }} - {{ event.duration.max }} {{ event.duration.unit }}</div><h6>Time estimate</h6></li></ul></div><button ng-click=\"vm.acceptQuote()\" ng-if=\"vm.showAcceptQuoteButton\" class=\"action wider\">accept quote</button></main></timeline-quote><timeline-quote-accepted ng-if=\"event.type == \'QUOTE_INFO\' &amp;&amp; event.status == \'Accepted\' \" ng-class=\"{ expanded: vm.expanded[event.type] }\"><h2>Quote accepted</h2><time>{{event.eventTime | timeLapse}}</time></timeline-quote-accepted><timeline-payment ng-if=\"event.type == \'PAYMENT_ADDED\' &amp;&amp; !event.eventTime\" ng-class=\"{ expanded: vm.expanded[event.type] }\"><h2>Add payment method</h2><time>{{event.eventTime | timeLapse}}</time><p>Add a payment method to launch your project.</p><button class=\"action wider\">add payment method</button></timeline-payment><timeline-payment-added ng-if=\"event.type == \'PAYMENT_ACCEPTED\' \"><h2>Payment method added</h2><time>{{event.eventTime | timeLapse}}</time></timeline-payment-added><timeline-members ng-if=\"event.type == \'MEMBER_REGISTRATION\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\"><h2 ng-if=\"event.members.length == 1\">{{event.members.length}} person has joined your project</h2><h2 ng-if=\"event.members.length &gt; 1\">{{event.members.length}} people have joined your project</h2><time>{{event.eventTime | timeLapse}}</time><ul class=\"avatars flex center\"><li ng-repeat=\"member in event.userProfiles track by $index\"><avatar avatar-url=\"{{member.avatar}}\"></avatar></li></ul></timeline-members><timeline-messaging ng-if=\"event.type == \'THREAD_INFO\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\"><ul class=\"header flex center middle\"><li><div class=\"icon envelope smallest\"></div></li><li><avatar avatar-url=\"{{event.lastMessageInfo.publisherInfo.avatar}}\"></avatar></li><li class=\"name\"><p><a href=\"#\">{{event.lastMessageInfo.publisherInfo.handle}}</a></p><p class=\"role\">{{event.lastMessageInfo.publisherInfo.role}}</p></li><li><time>{{event.eventTime | timeLapse}}</time></li></ul><main><hr/><p>{{event.lastMessageInfo.content}}</p><button ui-sref=\"messaging({ id: vm.workId, threadId: event.lastMessageInfo.threadId })\" class=\"wider action\">reply</button></main></timeline-messaging><timeline-submissions ng-if=\"event.type == \'WORKSTEP_SUBMITTERS\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\"><h2 ng-if=\"event.userProfiles.length == 1\">{{event.userProfiles.length}} person has submitted Designs</h2><h2 ng-if=\"event.userProfiles.length &gt; 1\">{{event.userProfiles.length}} people have submitted Designs</h2><time>{{event.eventTime | timeLapse}}</time><ul class=\"avatars flex center\"><li ng-repeat=\"user in event.userProfiles track by $index\"><avatar avatar-url=\"{{user.avatar}}\"></avatar></li></ul><p ng-if=\"event.completed == false\">48 hours left to select your winners</p><main ng-if=\"event.completed == false\"><button ui-sref=\"step({projectId: vm.workId, stepId: eventGroup.workStepId})\" class=\"wider\">view submissions</button></main></timeline-submissions><timeline-comments ng-if=\"event.type == \'SUBMISSION_THREAD_INFO\' &amp;&amp; (eventGroup.text == \'Final Designs\' || eventGroup.text == \'Design Concepts\') \" ng-class=\"{ expanded: vm.expanded[event.type] }\"><ul class=\"header flex center middle\"><li><div class=\"icon bubble smallest\"></div></li><li><avatar avatar-url=\"{{event.threadInfo.lastMessageInfo.publisherInfo.avatar}}\"></avatar></li><li class=\"name flex-grow\"><p><a href=\"#\">{{event.threadInfo.lastMessageInfo.publisherInfo.handle}}</a></p><p class=\"role\">{{event.threadInfo.lastMessageInfo.publisherInfo.role}}</p></li><li><time>{{event.threadInfo.eventTime | timeLapse}}</time></li></ul><main ng-if=\"event.submissionThreads.length &gt; 0\"><hr/><p>{{event.threadInfo.lastMessageInfo.publisherInfo.handle}} has commented on {{event.submissionThreads.length}} submission images.</p><ul class=\"submissions flex center\"><li ng-repeat=\"submission in event.submissionThreads track by $index\"><div class=\"notification absolute\">{{submission.unreadMessageCount}}</div><a ui-sref=\"file-detail({projectId: vm.workId, stepId: eventGroup.workStepId, submissionId: submission.submissionId, fileId: submission.submissionFileId})\"><img ng-src=\"{{submission.thumbnailUrl}}\" class=\"img\"/></a></li></ul><button ui-sref=\"submission-detail({projectId: vm.workId, stepId: eventGroup.workStepId, submissionId: event.submissionThreads[0].submissionId})\" class=\"wider view-all\">view all comments</button></main></timeline-comments><timeline-winners ng-if=\"event.type == \'WORKSTEP_WINNERS\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\"><h2>Congratulations!</h2><p>You have chosen {{event.userProfiles.length}} winner(s)</p><ul class=\"avatars flex center\"><li ng-repeat=\"user in event.userProfiles track by $index\"><avatar avatar-url=\"{{user.avatar}}\"></avatar></li></ul></timeline-winners><timeline-status-report ng-if=\"event.type == \'STATUS_REPORT\' \" class=\"flex center column\"><h2>{{eventTime.createdTime | date : \'MMMM d\' }} status report</h2><time>{{event.eventTime | timeLapse}}</time><p>{{event.text}}</p><ul class=\"submissions\"><li ng-repeat=\"image in event.images track by $index\"><img ng-src=\"{{image}}\" class=\"img\"/></li></ul><button class=\"action wider\">view prototype</button><button class=\"wider\">share link</button></timeline-status-report><timeline-development-complete ng-if=\"eventGroup.text == \'Development Begins\' &amp;&amp; eventGroup.createdTime \"><h2>Development complete</h2></timeline-development-complete><timeline-final-deliverables ng-if=\"eventGroup.text == \'Final Fixes\' &amp;&amp; event.type == \'SUBMISSION_THREAD_INFO\' \" class=\"flex center\"><h2>Final deliverables</h2><time>{{event.eventTime | timeLapse }}</time><p>{{event.threadInfo.lastMessageInfo.content}}</p><ul class=\"submissions\"><li ng-repeat=\"submission in event.submissionThreads track by $index\"><img ng-src=\"{{submission.thumbnailUrl}}\" class=\"img\"/></li></ul><button class=\"action wider\">view prototype</button><button class=\"wider\">share link</button></timeline-final-deliverables></li><li ng-repeat-end=\"ng-repeat-end\" ng-if=\"eventGroup.events.indexOf(event) != eventGroup.events.length - 1 &amp;&amp; vm.expanded[event.type] != undefined &amp;&amp; eventGroup.events[$index + 1].type != \'WORKSTEP_ENDS\' \"><hr class=\"biggest\"/></li></ul></li><li ng-repeat-end=\"ng-repeat-end\" class=\"splitter\"></li><li class=\"complete disabled\"><header><button class=\"clean point\"></button><h2>Project complete</h2><p>{{vm.projectCompletionDate | date}}</p></header></li></ul></main>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'TimelineController as vm',
      templateUrl: 'views/timeline.directive.html',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-timeline').directive('timeline', directive);

}).call(this);

(function() {
  'use strict';
  var TimelineController;

  TimelineController = function($scope, $stateParams, TimelineAPIService, CopilotApprovalAPIService) {
    var activate, configureProjectSubmittedComponents, findCompletionDate, hideEmptySubmissionThreads, setExpanded, vm;
    vm = this;
    vm.eventGroups = [];
    vm.loading = true;
    vm.projectCompletionDate = null;
    vm.showAcceptQuoteButton = true;
    vm.expanded = {
      'Project Submitted': false,
      'Project Launched': false,
      'Design Concepts': false,
      'Final Designs': false,
      'Final Fixes': false,
      'Development Launched': false,
      'Development Begins': false,
      'Project Complete': false,
      'STATUS_UPDATE': false,
      'COPILOT_ASSIGNED': false,
      'QUOTE_INFO': false,
      'PAYMENT_ACCEPTED': false,
      'MEMBER_REGISTRATION': false,
      'THREAD_INFO': false,
      'WORKSTEP_SUBMITTERS': false,
      'SUBMISSION_THREAD_INFO': false,
      'WORKSTEP_WINNERS': false
    };
    vm.isAFinishEvent = function(text, type, completed) {
      return text === 'Development Begins' || type === 'PAYMENT_ACCEPTED' || (type === 'WORKSTEP_SUBMITTERS' && !completed) || type === 'WORKSTEP_WINNERS';
    };
    vm.acceptQuote = function(event) {
      var body, params, resource;
      if (vm.copilotId) {
        params = {
          userId: vm.copilotId,
          projectId: vm.workId
        };
        body = {
          "status": "APPROVED"
        };
      }
      resource = CopilotApprovalAPIService.post(params, body);
      resource.$promise.then(function(response) {
        vm.showAcceptQuoteButton = false;
        return activate();
      });
      return resource.$promise["finally"](function() {});
    };
    findCompletionDate = function(data) {
      return data.forEach(function(eventGroup) {
        if (eventGroup.text === 'Project Complete') {
          return vm.projectCompletionDate = eventGroup.createdTime;
        }
      });
    };
    configureProjectSubmittedComponents = function(data) {
      return data.forEach(function(eventGroup) {
        if (eventGroup.text === 'Project Submitted') {
          return eventGroup.events.forEach(function(event) {
            if (event.type === 'COPILOT_ASSIGNED') {
              vm.copilotId = event.copilot.userId;
            }
            if (event.type === 'QUOTE_INFO' && event.status === 'Accepted') {
              return vm.showAcceptQuoteButton = false;
            }
          });
        }
      });
    };
    setExpanded = function(data) {
      return data.forEach(function(eventGroup) {
        if (eventGroup.expanded === true) {
          vm.expanded[eventGroup.text] = true;
          return eventGroup.events.forEach(function(event) {
            if (event.expanded) {
              return vm.expanded[event.type] = true;
            }
          });
        }
      });
    };
    hideEmptySubmissionThreads = function(data) {
      return data.forEach(function(eventGroup) {
        return eventGroup.events.forEach(function(event) {
          if (event.type === 'SUBMISSION_THREAD_INFO') {
            if (event.submissionThreads.length === 0) {
              return vm.expanded[event.type] = void 0;
            }
          }
        });
      });
    };
    activate = function() {
      var params, resource;
      vm.workId = $scope.workId;
      params = {
        workId: vm.workId
      };
      resource = TimelineAPIService.query(params);
      resource.$promise.then(function(data) {
        vm.eventGroups = data;
        setExpanded(data);
        findCompletionDate(data);
        configureProjectSubmittedComponents(data);
        return hideEmptySubmissionThreads(data);
      });
      resource.$promise["catch"](function() {});
      resource.$promise["finally"](function() {
        return vm.loading = false;
      });
      return vm;
    };
    return activate();
  };

  TimelineController.$inject = ['$scope', '$stateParams', 'TimelineAPIService', 'CopilotApprovalAPIService'];

  angular.module('appirio-tech-ng-timeline').controller('TimelineController', TimelineController);

}).call(this);
