(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-messaging', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-ng-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.directive.html","<h1>Project Timeline</h1><hr/><ul><li ng-repeat-start=\"eventGroup in vm.eventGroups\" ng-class=\"{ completed: vm.completed[eventGroup.text], expanded: vm.expanded[eventGroup.text] }\" ng-click=\"vm.expanded[eventGroup.text] = !vm.expanded[eventGroup.text]\" class=\"milestone completed\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">0%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><button class=\"clean point\"></button><div class=\"lead-after\"></div><ul class=\"headings\"><li><button class=\"clean\"><h4>{{eventGroup.text}}</h4></button></li><li><time>{{ eventGroup.createdTime | date }}</time></li></ul></section><hr/></li><li ng-repeat-end=\"ng-repeat-end\" ng-repeat=\"event in eventGroup.events track by $index\"><ul ng-show=\"vm.expanded[eventGroup.text]\" class=\"events\"><li ng-if=\"event.type == \'THREAD_INFO\' \" class=\"notification messages no-progress completed\"><section class=\"checkpoint\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"point count clean\"><div class=\"notification\">{{ event.unreadMessageCount }}</div></button><div class=\"lead-after\"></div><p><avatar url=\"{{ event.lastMessage.avatarUrl }}\"></avatar>{{ event.lastMessage.content }}</p></section><ul class=\"links\"><li><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean\">View</button></li><li><a ui-sref=\"messaging({ id: event.threadId })\">View full thread</a></li></ul><div ng-class=\"{ active: vm.showMessagingWidget }\" class=\"expandable-content\"><button ng-click=\"vm.showMessagingWidget = false\" class=\"clean close\">&times;</button><messaging thread-id=\"{{ event.threadId }}\" subscriber-id=\"Batman\" class=\"widget\"></messaging></div></li><li ng-if=\"event.type == \'SUBMISSION_THREAD_INFO\' \" class=\"comment no-progress completed\"><section class=\"checkpoint\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean point\"><div class=\"notification\">{{ event.threadInfo.unreadMessageCount }}</div><div class=\"icon envelope smallest\"></div></button><div class=\"lead-after\"></div><p><avatar ng-src=\"{{ event.threadInfo.lastMessage.avatar }}\"></avatar>{{ event.threadInfo.lastMessage.handle }}</p></section><p>Ok, I\'ll give the yellow buttons at the top a try and see how it looks.</p><ul class=\"files\"><li ng-repeat=\"thumbnail in event.threadInfo.submissionThumbnails track by $index\"><img ng-src=\"{{ thumbnail }} \"/></li></ul><a href=\"#\">view message</a></li><li ng-if=\"event.type == \'statusUpdate\' \"><section class=\"checkpoint\"></section><p>{{event.text}}</p><time>{{event.eventTime}}</time></li><li ng-class=\"{ completed: vm.events.confirmEmail.created}\" ng-if=\"event.type == \'EMAIL_CONFIRMED\' \"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">6%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><p ng-hide=\"vm.events.confirmEmail.created\">{{event.text}}</p></section></li><li ng-if=\"event.type == \'PAYMENT_ACCEPTED\' \"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">20%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><p ng-hide=\"vm.events.paymentAccepted.created\">{{event.text}}</p></section></li><li ng-if=\"event.type == \'COPILOT_ASSIGNED\' \" ng-class=\"{ completed: event.eventTime, expanded: 1 }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">5%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><p ng-hide=\"event.eventTime\">Assign Co-Pilot</p><ul class=\"headings\"><li><p ng-show=\"event.eventTime\">Co-Pilot Assigned</p></li><li><time>{{ event.eventTime }}</time></li></ul></section><div ng-show=\"event.copilot.handle\" class=\"avatar-box\"><avatar url=\"{{ event.copilot.avatarUrl }}\"></avatar>Hi I\'m <a href=\"#\">{{ event.copilot.handle }}</a>. I\'ll be your project manager.</div></li><li ng-if=\"event.type == \'QUOTE_INFO\' \" ng-class=\"{ completed: event.eventTime}\" class=\"quote\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">15%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><p ng-hide=\"event.eventTime\">Generate Quote</p><p ng-show=\"event.eventTime\"><div class=\"carat\"></div>Quote has been generated.</p></section><p ng-show=\"event.status != \'Accepted\' \"><a href=\"#\">View quote and pay to continue.</a></p><div class=\"expandable-content\"><button type=\"button\" class=\"clean close\">x</button><ul><li><label>Cost:</label> \n${{ event.price }}</li><li><label>Time:</label> \n{{ event.duration }} Days</li></ul><ul><li class=\"accept\"><button>Accept</button></li><li><button>Reject</button></li></ul></div></li><li ng-if=\"event.type == \'MEMBER_REGISTRATION\'\" ng-class=\"{ completed: vm.events.members.length, expanded: vm.expanded[\'Project Launched\'] }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">35%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point icon\"></div><div class=\"lead-after\"></div><p><div class=\"carat\"></div><span>{{ event.members.length }} member(s) have joined.</span></p></section><div class=\"expandable-content\"><button type=\"button\" class=\"clean close\">&times;</button><ul><li ng-repeat=\"member in event.members track by $index\"><avatar url=\"{{ member.avatarUrl }}\"></avatar><a>{{ member.handle }} </a>joined the project.</li></ul></div></li><li ng-if=\"event.type == \'WORKSTEP_SUBMITTERS\' \" class=\"submissions completed no-progress\"><section class=\"checkpoint\"><a href=\"#\"><button ng-click=\"vm.showMessagingWidget = true\" title=\"download files\" class=\"point count clean\"><div class=\"icon download smallest\"></div></button></a><div class=\"lead-after\"></div><ul class=\"avatars\"><li ng-repeat=\"avatarUrl in event.avatars track by $index\"><avatar avatar-url=\"{{ avatarUrl }}\"></avatar></li></ul></section><p>{{ event.avatars.length }} people have submitted {{eventGroup.text}} to your project.</p><p><a href=\"#\">View all submissions</a></p></li><li ng-if=\"event.type == \'WORKSTEP_WINNERS\' \" class=\"winners completed no-progress\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><p ng-if=\"eventGroup.createdTime\">Congratulations! You have confirmed your winners for the {{eventGroup.text}} phase.</p></section><ul class=\"avatars\"><li ng-repeat=\"avatar in event.avatars track by $index\"><avatar avatar-url=\"{{ avatar }}\"></avatar></li></ul></li></ul></li></ul>");}]);
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
    var activate, order, vm;
    vm = this;
    vm.eventGroups = [];
    vm.showMessagingWidget = false;
    vm.expanded = {
      'Project Submitted': false,
      'Project Launched': false,
      'Design Concepts': false,
      'Final Designs': false,
      'Final Fixes': false
    };
    order = function(data) {
      var merged, sorted, timeStamped, unStamped;
      timeStamped = data.filter(function(eventGroup) {
        return eventGroup.createdTime;
      });
      unStamped = data.filter(function(eventGroup) {
        return !eventGroup.createdTime;
      });
      sorted = timeStamped.sort(function(prev, next) {
        var nextTime, prevTime;
        prevTime = '' + prev.createdTime;
        nextTime = '' + next.createdTime;
        return prevTime - nextTime;
      });
      merged = sorted.concat(unStamped);
      return merged;
    };
    activate = function() {
      var params, resource;
      vm.workId = $scope.workId;
      params = {
        workId: vm.workId
      };
      resource = TimelineAPIService.query(params);
      resource.$promise.then(function(data) {
        return vm.eventGroups = order(data);
      });
      return vm;
    };
    return activate();
  };

  TimelineController.$inject = ['$scope', '$stateParams', 'TimelineAPIService'];

  angular.module('appirio-tech-ng-timeline').controller('TimelineController', TimelineController);

}).call(this);
