(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-api-services', 'appirio-tech-ng-ui-components'];

  angular.module('appirio-tech-ng-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-ng-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.directive.html","<main class=\"flex center stretch\"><loader ng-if=\"vm.loading\"></loader><div class=\"timeline\"></div><ul><li ng-repeat-start=\"eventGroup in vm.eventGroups\" ng-if=\"eventGroup.text != \'Project Complete\' \" ng-class=\"{ expanded: vm.expanded[eventGroup.text], disabled: eventGroup.events.length == 0 }\" class=\"event-group elevated-bottom\"><header class=\"flex\"><button ng-class=\"{ expanded: vm.expanded[eventGroup.text], disabled: !vm.expanded[eventGroup.text]}\" ng-click=\"vm.expanded[eventGroup.text] = !vm.expanded[eventGroup.text]\" class=\"clean point\"><div class=\"icon plus\"></div><div class=\"icon minus\"></div></button><h5 class=\"flex-grow\">{{eventGroup.text}}</h5><p class=\"secondary\">{{eventGroup.createdTime | date}}</p></header><ul lock-height=\"no-height\" retain-class=\"{{ !vm.expanded[eventGroup.text] }}\" ng-class=\"{ \'no-height\': !vm.expanded[eventGroup.text] }\" class=\"expand-big events transition\"><li class=\"hr\"><hr class=\"smallest\"/></li><li ng-repeat-start=\"event in eventGroup.events track by $index\" ng-if=\"vm.expanded[event.type] != undefined\" class=\"event\"><event-card ng-if=\"event.type == \'STATUS_UPDATE\' \" class=\"status-update\"><h1>{{ event.header }}</h1><time>{{ event.eventTime | timeLapse }}</time><event-card-main><p>{{ event.text }}</p></event-card-main></event-card><event-card ng-if=\"event.type == \'COPILOT_ASSIGNED\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"copilot\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><h1>Co-pilot assigned</h1></div><time>{{ event.eventTime | timeLapse}}</time><event-card-main ng-show=\"event.copilot.handle\" ng-class=\"{ \'no-height\': !vm.expanded[event.type] }\" lock-height=\"no-height\" class=\"transition avatar-box flex center middle\"><avatar avatar-url=\"{{ event.copilot.avatar }}\"></avatar><p class=\"co-pilot\">Hi I\'m <a href=\"#\"> {{ event.copilot.handle }} </a>. I\'ll be your project manager.</p></event-card-main></event-card><event-card ng-if=\"event.type == \'QUOTE_INFO\' \" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"quote\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><h1>Quote generated</h1></div><time>{{event.eventTime | timeLapse}}</time><event-card-main ng-class=\"{ \'no-height\': !vm.expanded[event.type] }\" lock-height=\"no-height\" class=\"transition\"><p>View quote and accept to continue your project.</p><div ng-class=\"{active: event.status != \'Accepted\'}\" class=\"estimate\"><h6>quote</h6><ul class=\"flex middle space-between stretch\"><li class=\"cost\"><div class=\"range\">${{ event.price.min }} - ${{ event.price.max }}</div><h6>Cost estimate</h6></li><li class=\"splitter\"></li><li class=\"duration\"><div class=\"range\">{{ event.duration.min }} - {{ event.duration.max }} {{ event.duration.unit }}</div><h6>Time estimate</h6></li></ul></div><button ng-click=\"vm.acceptQuote()\" ng-if=\"vm.showAcceptQuoteButton\" class=\"action wider\">accept quote</button></event-card-main></event-card><event-card ng-if=\"event.type == \'PAYMENT_ADDED\' &amp;&amp; !event.eventTime\" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"payment\"><h1>Add payment method</h1><time>{{event.eventTime | timeLapse}}</time><p>Add a payment method to launch your project.</p><button class=\"action wider\">add payment method</button></event-card><event-card ng-if=\"event.type == \'PAYMENT_ACCEPTED\' \" class=\"payment-added\"><h1>Payment method accepted</h1><time>{{event.eventTime | timeLapse}}</time></event-card><event-card ng-if=\"event.type == \'MEMBER_REGISTRATION\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"members\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><h1 ng-if=\"event.members.length == 1\">{{event.members.length}} person has joined your project</h1><h1 ng-if=\"event.members.length &gt; 1\">{{event.members.length}} people have joined your project</h1></div><time>{{event.eventTime | timeLapse}}</time><event-card-main><ul class=\"avatars flex center\"><li ng-repeat=\"member in event.userProfiles track by $index\"><avatar avatar-url=\"{{member.avatar}}\"></avatar></li></ul></event-card-main></event-card><event-card ng-if=\"event.type == \'THREAD_INFO\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"messaging\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><ul class=\"header flex center middle\"><li><div class=\"icon envelope smallest\"></div></li><li><avatar avatar-url=\"{{event.lastMessageInfo.publisherInfo.avatar}}\"></avatar></li><li class=\"name flex-grow\"><p><a href=\"#\">{{event.lastMessageInfo.publisherInfo.handle}}</a></p><p class=\"role\">{{event.lastMessageInfo.publisherInfo.role}}</p></li><li><time>{{event.eventTime | timeLapse}}</time></li></ul></div><event-card-main ng-class=\"{ \'no-height\': !vm.expanded[event.type] }\" lock-height=\"no-height\" class=\"transition\"><p>{{event.lastMessageInfo.content}}</p><button ng-if=\"event.lastMessageInfo.publisherInfo.isCopilot == true\" ui-sref=\"messaging({ id: vm.workId, threadId: event.lastMessageInfo.threadId })\" class=\"wider action\">reply</button><button ng-if=\"event.lastMessageInfo.publisherInfo.isCopilot == false\" ui-sref=\"messaging({ id: vm.workId, threadId: event.lastMessageInfo.threadId })\" class=\"wider action\">send another message</button></event-card-main></event-card><event-card ng-if=\"event.type == \'WORKSTEP_SUBMITTERS\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"submissions\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><h1 ng-if=\"!(event.userProfiles.length &gt; 1)\">{{event.userProfiles.length || 0}} person has submitted Designs</h1><h1 ng-if=\"event.userProfiles.length &gt; 1\">{{event.userProfiles.length || 0}} people have submitted Designs</h1></div><time>{{event.eventTime | timeLapse}}</time><event-card-main ng-class=\"{ \'no-height\': !vm.expanded[event.type] }\" lock-height=\"no-height\" class=\"transition\"><ul class=\"avatars flex center\"><li ng-repeat=\"user in event.userProfiles track by $index\"><avatar avatar-url=\"{{user.avatar}}\"></avatar></li></ul><button ui-sref=\"step({projectId: vm.workId, stepId: eventGroup.workStepId})\" class=\"wider\">view submissions</button></event-card-main></event-card><event-card ng-if=\"event.type == \'SUBMISSION_THREAD_INFO\' &amp;&amp; (eventGroup.text == \'Final Designs\' || eventGroup.text == \'Design Concepts\') \" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"comments\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><ul class=\"header flex center middle\"><li><div class=\"icon bubble smallest\"></div></li><li><avatar avatar-url=\"{{event.submitter.avatar}}\"></avatar></li><li class=\"name flex-grow\"><p><a href=\"#\">{{event.submitter.handle}}</a></p><p class=\"role\">{{event.submitter.role}}</p></li><li><time>{{event.submissionThreads[event.submissionThreads.length - 1].lastMessageDate | timeLapse}}</time></li></ul></div><event-card-main ng-if=\"event.submissionThreads.length &gt; 0\" ng-class=\"{ \'no-height\': !vm.expanded[event.type] }\" lock-height=\"no-height\" class=\"transition\"><p ng-if=\"event.publishers.length == 1 &amp;&amp; !vm.allMessagesRead(event.submissionThreads)\">{{event.publishers[0].handle}} has commented on {{event.submissionThreads.length}} submission images.</p><p ng-if=\"event.publishers.length == 2 &amp;&amp; !vm.allMessagesRead(event.submissionThreads)\">{{event.publishers[0].handle}} and {{event.publishers[1].handle}} have commented on {{event.submissionThreads.length}} submission images.</p><p ng-if=\"event.publishers.length == 1 &amp;&amp; vm.allMessagesRead(event.submissionThreads)\">{{event.publishers[0].handle}} commented on {{event.submissionThreads.length}} submission images.</p><p ng-if=\"event.publishers.length == 2 &amp;&amp; vm.allMessagesRead(event.submissionThreads)\">{{event.publishers[0].handle}} and {{event.publishers[1].handle}} commented on {{event.submissionThreads.length}} submission images.</p><ul ng-if=\"vm.allMessagesRead(event.submissionThreads)\" class=\"submissions flex center\"><li ng-repeat=\"submission in event.submissionThreads track by $index\"><div ng-if=\"submission.unreadMessageCount &gt; 0\" class=\"notification absolute\">{{submission.unreadMessageCount}}</div><a ui-sref=\"file-detail({projectId: vm.workId, stepId: eventGroup.workStepId, submissionId: event.submissionId, fileId: submission.submissionFileId})\"><img ng-src=\"{{submission.thumbnailUrl}}\"/></a></li></ul><ul ng-if=\"!vm.allMessagesRead(event.submissionThreads)\" class=\"submissions flex center\"><li ng-repeat=\"submission in event.submissionThreads.filter(vm.messageUnread) track by $index\"><div ng-if=\"submission.unreadMessageCount &gt; 0\" class=\"notification absolute\">{{submission.unreadMessageCount}}</div><a ui-sref=\"file-detail({projectId: vm.workId, stepId: eventGroup.workStepId, submissionId: event.submissionId, fileId: submission.submissionFileId})\"><img ng-src=\"{{submission.thumbnailUrl}}\"/></a></li></ul><button ui-sref=\"submission-detail({projectId: vm.workId, stepId: eventGroup.workStepId, submissionId: event.submissionId})\" class=\"wider view-all\">view all comments</button></event-card-main></event-card><event-card ng-if=\"event.type == \'FINALFIXES_SUBMISSION\'\" ng-class=\"{ expanded: vm.expanded[event.type] }\" class=\"final-fixes-submissions\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><h1>Final Designs Submitted</h1></div><time>{{event.eventTime | timeLapse}}</time><event-card-main ng-if=\"event.completed == false\" ng-class=\"{ \'no-height\': !vm.expanded[event.type] }\" lock-height=\"no-height\" class=\"transition\"><ul class=\"user-detail flex center middle\"><li><avatar avatar-url=\"{{event.submitter.avatar}}\"></avatar></li><li class=\"user-name\"><a href=\"#\">{{event.submitter.handle}}</a><p class=\"secondary\">Project WINNER</p></li></ul><ul class=\"submissions flex center\"><li ng-repeat=\"file in event.files track by $index\"><a ui-sref=\"file-detail({projectId: vm.workId, stepId: eventGroup.workStepId, submissionId: event.submissionId, fileId: file.id})\"><img ng-src=\"{{file.url}}\"/></a></li></ul><button ng-if=\"event.completed == false\" ui-sref=\"step({projectId: vm.workId, stepId: eventGroup.workStepId})\" class=\"wider\">view submissions</button><simple-countdown ng-if=\"event.completed == false\" end=\"{{eventGroup.endsAt}}\"></simple-countdown></event-card-main></event-card><event-card ng-if=\"event.type == \'STATUS_REPORT\' \" class=\"status-report\"><div class=\"flex middle center\"><button ng-class=\"{ expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"><div class=\"icon plus hollow\"></div><div class=\"icon minus hollow\"></div></button><h1>{{ eventTime.createdTime | date : \'MMMM d\' }} status report</h1></div><time>{{ event.eventTime | timeLapse }}</time><event-card-main ng-class=\"{ \'no-height\': !vm.expanded[event.type] }\" lock-height=\"no-height\" class=\"transition\"><p>{{ event.text || \'no subject\' }}</p><ul class=\"links\"><li ng-repeat=\"link in event.links track by $index\"><a href=\"{{link.url}}\">{{link.url}}</a></li></ul><ul class=\"thumbnails flex center\"><li ng-repeat=\"image in event.images track by $index\"><img ng-src=\"{{image.url}}\"/></li></ul></event-card-main></event-card><event-card ng-if=\"eventGroup.text == \'Development Begins\' &amp;&amp; eventGroup.createdTime \" class=\"development-complete\"><h1>Development complete</h1></event-card></li><li ng-if=\"(event.type == \'QUOTE_INFO\' &amp;&amp; event.status == \'Accepted\') &amp;&amp; ($index == eventGroup.events.length - 1)\" class=\"event finish\"><event-card class=\"quote-accepted\"><h1>Quote accepted</h1><time>{{event.eventTime | timeLapse}}</time></event-card></li><li ng-if=\"(eventGroup.text == \'Design Concepts\' || eventGroup.text == \'Final Designs\') &amp;&amp; ($index == eventGroup.events.length - 1) &amp;&amp; !vm.isSubmissionCompleted(eventGroup)\" class=\"event finish\"><event-card class=\"select-winners\"><h1>Select the winners</h1><simple-countdown end=\"{{eventGroup.endsAt}}\"></simple-countdown><event-card-main><button ui-sref=\"step({projectId: vm.workId, stepId: eventGroup.workStepId})\" class=\"wider hollow\">view submissions</button></event-card-main></event-card></li><li ng-if=\"(eventGroup.text == \'Design Concepts\' || eventGroup.text == \'Final Designs\') &amp;&amp; ($index == eventGroup.events.length - 1) &amp;&amp; vm.isSubmissionCompleted(eventGroup) \" class=\"event finish\"><event-card class=\"winners\"><h1>Congratulations!</h1><event-card-main><p>You have chosen {{event.userProfiles.length}} winner(s)</p><ul class=\"avatars flex center\"><li ng-repeat=\"user in event.userProfiles track by $index\"><avatar avatar-url=\"{{user.avatar}}\"></avatar></li></ul></event-card-main></event-card></li><li ng-repeat-end=\"ng-repeat-end\" ng-if=\"($index != eventGroup.events.length - 1) &amp;&amp; (vm.expanded[event.type] != undefined) &amp;&amp; (eventGroup.events[$index + 1].type != \'WORKSTEP_WINNERS\' )\"><hr class=\"biggest\"/></li></ul></li><li ng-repeat-end=\"ng-repeat-end\" class=\"splitter\"></li><li class=\"complete disabled\"><header><button class=\"clean point\"></button><h4 ng-class=\"{inactive: !vm.projectCompleted}\">Project complete</h4><p ng-if=\"vm.projectCompleted\">{{ vm.projectCompletionDate | date }}</p></header></li></ul></main>");}]);
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
    var activate, configureProjectSubmittedComponents, findCompletionDate, setExpanded, vm;
    vm = this;
    vm.eventGroups = [];
    vm.loading = true;
    vm.projectCompletionDate = null;
    vm.projectCompleted = false;
    vm.showAcceptQuoteButton = true;
    vm.expanded = {
      'Project Submitted': true,
      'Project Launched': true,
      'Design Concepts': true,
      'Final Designs': true,
      'Final Fixes': true,
      'Code': true,
      'Development Launched': true,
      'Development Begins': true,
      'Project Complete': true,
      'STATUS_UPDATE': true,
      'STATUS_REPORT': true,
      'COPILOT_ASSIGNED': true,
      'QUOTE_INFO': true,
      'MEMBER_REGISTRATION': true,
      'THREAD_INFO': true,
      'WORKSTEP_SUBMITTERS': true,
      'SUBMISSION_THREAD_INFO': true,
      'WORKSTEP_WINNERS': true,
      'FINALFIXES_SUBMISSION': true
    };
    vm.isAFinishEvent = function(text, type, completed) {
      return text === 'Development Begins' || type === 'PAYMENT_ACCEPTED' || type === 'WORKSTEP_WINNERS';
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
    vm.messageUnread = function(message) {
      return message.unreadMessageCount > 0;
    };
    vm.allMessagesRead = function(messages) {
      var unread;
      unread = messages.filter(vm.messageUnread);
      return unread.length === 0;
    };
    findCompletionDate = function(data) {
      return data.forEach(function(eventGroup) {
        if (eventGroup.text === 'Project Complete') {
          vm.projectCompleted = true;
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
        if (eventGroup.events.length === 0) {
          return vm.expanded[eventGroup.text] = false;
        }
      });
    };
    vm.isSubmissionCompleted = function(eventGroup) {
      var e, i, len, ref, show;
      show = false;
      ref = eventGroup.events;
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (e.type === 'WORKSTEP_SUBMITTERS' && e.completed) {
          show = true;
        }
      }
      return show;
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
        findCompletionDate(data);
        configureProjectSubmittedComponents(data);
        return setExpanded(data);
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
