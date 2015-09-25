(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-messaging', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-ng-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.directive.html","<h2>Timeline</h2><main><div class=\"timeline\"></div><ul><li ng-repeat-start=\"eventGroup in vm.eventGroups\" ng-if=\"eventGroup.text != \'Project Complete\' \" class=\"event-group\"><header><button ng-class=\"{expanded: vm.expanded[eventGroup.text]}\" ng-click=\"vm.expanded[eventGroup.text] = !vm.expanded[eventGroup.text]\" class=\"clean point\"></button><h4>{{eventGroup.text}}</h4><time>{{eventGroup.createdTime | date}}</time></header><ul ng-class=\"{expanded: vm.expanded[eventGroup.text] }\" class=\"expanded-big events\"><li><hr class=\"biggest\"/></li><li ng-repeat-start=\"event in eventGroup.events\" ng-if=\"vm.expanded[event.type] != undefined\" class=\"event\"><button ng-class=\"{expanded: vm.expanded[event.type]}\" ng-click=\"vm.expanded[event.type] = !vm.expanded[event.type]\" class=\"clean point\"></button><timeline-copilot ng-class=\"{expanded: vm.expanded[event.type] }\"><div ng-if=\"event.type == \'COPILOT_ASSIGNED\' \"><h1>Co-pilot assigned!</h1><time>{{ event.eventTime | timeLapse}}</time><main ng-show=\"event.copilot.handle\" class=\"avatar-box\"><avatar avatar-url=\"{{ event.copilot.avatar }}\"></avatar>Hi I\'m <a href=\"#\">{{ event.copilot.handle }}</a>. I\'ll be your project manager.</main></div></timeline-copilot><timeline-quote ng-class=\"{expanded: vm.expanded[event.type] }\"><div ng-if=\"event.type == \'QUOTE_INFO\' \"><h1>Quote generated</h1><time>{{event.eventTime | timeLapse}}</time><main><p>Your project has been reviewed and a quote has been generated.</p><button class=\"action wider\">view quote</button></main></div></timeline-quote><div ng-if=\"event.type == \'PAYMENT_ADDED\' &amp;&amp; !event.eventTime \"><h1>Add payment method</h1><time>{{event.eventTime | timeLapse}}</time><p>Add a payment method to launch your project.</p><button class=\"action wider\">add payment method</button></div><div ng-if=\"event.type == \'PAYMENT_ACCEPTED\' \" class=\"event finish\"><h1>Payment method added</h1><time>{{event.eventTime | timeLapse}}</time></div><div ng-if=\"event.type == \'MEMBER_REGISTRATION\' \"><h1>{{event.members.length}} people have joined your project</h1><time>{{event.eventTime | timeLapse}}</time><ul class=\"avatars\"><li ng-repeat=\"member in event.members\"><avatar avatar-url=\"{{member.avatar}}\"></avatar></li></ul></div><timeline-messaging><div ng-if=\"event.type == \'THREAD_INFO\' \"><ul class=\"header\"><li><div class=\"icon\"></div></li><li><avatar avatar-url=\"{{event.lastMessageInfo.publisherInfo.avatar}}\"></avatar></li><li class=\"name\"><p><a href=\"#\">{{event.lastMessageInfo.publisherInfo.handle}}</a></p><p class=\"role\">Project Contributor</p></li><li><time>{{event.eventTime | timeLapse}}</time></li></ul><hr/><p>{{event.lastMessageInfo.content}}</p><textarea placeholder=\"Reply to this message\" class=\"wider\"></textarea><button class=\"wider action\">reply</button><button ui-sref=\"messaging({ id: event.threadId })\" class=\"wider\">view all messages</button></div></timeline-messaging><div ng-if=\"event.type == \'WORKSTEP_SUBMITTERS\' \"><h1>{{event.avatars.length}} people have submitted Designs</h1><time>{{eventGroup.createdTime | timeLapse}}</time><ul class=\"avatars\"><li ng-repeat=\"avatar in event.avatars\"><avatar avatar-url=\"avatar\"></avatar></li></ul></div><timeline-comments><div ng-if=\"event.type == \'SUBMISSION_THREAD_INFO\' &amp;&amp; (eventGroup.text == \'Final Designs\' || eventGroup.text == \'Design Concepts\') \"><ul class=\"header\"><li><div class=\"icon\"></div></li><li><avatar avatar-url=\"{{event.threadInfo.lastMessageInfo.publisherInfo.avatar}}\"></avatar></li><li class=\"name\"><p><a href=\"#\">{{event.threadInfo.lastMessageInfo.publisherInfo.handle}}</a></p><p class=\"role\">{{event.threadInfo.lastMessageInfo.publisherInfo.role}}</p></li><li><time>{{event.threadInfo.lastMessageInfo.createdTime | timeLapse}}</time></li></ul><hr/><p>{{event.threadInfo.lastMessageInfo.publisherInfo.handle}} has commented on {{event.submissionThreads.length}} submission images.</p><ul class=\"submissions\"><li ng-repeat=\"submission in event.submissionThreads\"><div class=\"notification\">{{submission.unreadMessageCount}}</div><div ng-src=\"submission.thumbnailUrl\" class=\"img\"></div></li></ul><button class=\"wider view-all\">view all comments</button></div></timeline-comments><div ng-if=\"event.type == \'WORKSTEP_SUBMITTERS\' \" class=\"event finish\"><h1>Select the winners</h1><p>48 hours left</p><button ui-sref=\"design-concepts({projectId: vm.workId})\" class=\"wider\">view submissions</button></div><div ng-if=\"event.type == \'WORKSTEP_WINNERS\' \" class=\"event finish\"><h1>Congratulations!</h1><p>You have chosen {{event.avatars.length}} winner(s)</p><ul class=\"avatars\"><li ng-repeat=\"avatar in event.avatars\"><avatar avatar-url=\"{{avatar}}\"></avatar></li></ul></div><timeline-status-report><div ng-if=\"event.type == \'STATUS_REPORT\' \"><h1>{{eventTime.createdTime | date : \'MMMM d\' }} status report</h1><time>{{event.eventTime | timeLapse}}</time><p>{{event.text}}</p><ul class=\"submissions\"><li ng-repeat=\"image in event.images\"><div ng-src=\"image\" class=\"img\"></div></li></ul><button class=\"action wider\">view prototype</button><button class=\"wider\">share link</button></div></timeline-status-report><div ng-if=\"eventGroup.text == \'Development Begins\' &amp;&amp; eventGroup.createdTime \" class=\"event finish\"><h1>Development complete</h1></div><timeline-final-deliverables><div ng-if=\"eventGroup.text == \'Final Fixes\' &amp;&amp; event.type == \'SUBMISSION_THREAD_INFO\' \"><h1>Final deliverables</h1><time>{{event.eventTime | timeLapse }}</time><p>{{event.threadInfo.lastMessageInfo.content}}</p><ul class=\"submissions\"><li ng-repeat=\"submission in event.submissionThreads\"><div class=\"notification\">{{submission.unreadMessageCount}}</div><div ng-src=\"submission.thumbnailUrl\" class=\"img\"></div></li></ul><button class=\"action wider\">view prototype</button><button class=\"wider\">share link</button></div></timeline-final-deliverables></li><li ng-repeat-end=\"ng-repeat-end\" ng-if=\"eventGroup.events.indexOf(event) != eventGroup.events.length - 1 &amp;&amp; vm.expanded[event.type] != undefined\"><hr class=\"biggest\"/></li></ul></li><li ng-repeat-end=\"ng-repeat-end\" class=\"splitter\"></li><li class=\"complete\"><header><button class=\"clean point\"></button><h1>Project complete</h1><p>{{vm.projectCompletionDate | date}}</p></header></li></ul></main>");}]);
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

  TimelineController = function($scope, $stateParams, TimelineAPIService) {
    var activate, mockify, vm;
    vm = this;
    vm.eventGroups = [];
    vm.loading = true;
    vm.expanded = {
      'Project Submitted': false,
      'Project Launched': false,
      'Design Concepts': false,
      'Final Designs': false,
      'Final Fixes': false,
      'Development Launched': false,
      'Development Begins': false,
      'Project Complete': false,
      'COPILOT_ASSIGNED': false,
      'QUOTE_INFO': false,
      'PAYMENT_ACCEPTED': false,
      'MEMBER_REGISTRATION': false,
      'THREAD_INFO': false,
      'WORKSTEP_SUBMITTERS': false,
      'SUBMISSION_THREAD_INFO': false,
      'WORKSTEP_WINNERS': false
    };
    mockify = function(data) {
      data.forEach(function(eventGroup) {
        if (eventGroup.text === "Final Fixes") {
          return eventGroup.events = [
            {
              "type": "SUBMISSION_THREAD_INFO",
              "threadInfo": {
                "type": "THREAD_INFO",
                "threadId": "abc123",
                "unreadMessageCount": 5,
                "lastMessageInfo": {
                  "content": "Maybe its best if we stick with something something something something.",
                  "publisherInfo": {
                    "userId": "id",
                    "handle": "Batman",
                    "avatar": "http://pict.ly",
                    "role": "Project Creator"
                  }
                }
              },
              "submissionThreads": [
                {
                  "submissionId": "123",
                  "threadId": "abc123",
                  "unreadMessageCount": 2,
                  "thumbnailUrl": "http://thumbnail.url/"
                }
              ]
            }
          ];
        } else if (eventGroup.text === 'Project Complete') {
          return vm.projectCompletionDate = eventGroup.createdTime;
        }
      });
      return data;
    };
    activate = function() {
      var params, resource;
      vm.workId = $scope.workId;
      params = {
        workId: vm.workId
      };
      resource = TimelineAPIService.query(params);
      resource.$promise.then(function(data) {
        vm.eventGroups = mockify(data);
        return vm.loading = false;
      });
      return vm;
    };
    return activate();
  };

  TimelineController.$inject = ['$scope', '$stateParams', 'TimelineAPIService'];

  angular.module('appirio-tech-ng-timeline').controller('TimelineController', TimelineController);

}).call(this);
