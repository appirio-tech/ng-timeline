(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-messaging'];

  angular.module('appirio-tech-ng-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-ng-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.directive.html","<h1>Project Timeline</h1><hr/><ul><li ng-class=\"{ completed: vm.completed.submitted, expanded: vm.expanded.submitted }\" ng-click=\"vm.expanded.submitted = !vm.expanded.submitted\" class=\"milestone completed passed\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">0%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Project Submitted</h4><time>{{ vm.completed.submitted | date }}</time></label></section><hr/></li><li ng-class=\"{ completed: vm.completed.email, passed: vm.passed.email, info: !vm.completed.email, expanded: vm.expanded.submitted }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">6%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label ng-hide=\"vm.completed.email\">We sent an email to johndoe@example.com. <br /> Click the link in the email to verify your email address.</label><label ng-show=\"vm.completed.email\">Thanks! Your email is verified.</label></section><a href=\"#\" ng-hide=\"vm.completed.email\" class=\"resend\">Re-send Email</a></li><li ng-class=\"{ completed: vm.completed.coPilot, passed: vm.passed.coPilot, expanded: vm.expanded.submitted }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">5%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-show=\"!vm.completed.payment &amp;&amp; !vm.completed.coPilot\">Assign Co-Pilot</label><label ng-show=\"!vm.completed.payment &amp;&amp; vm.completed.coPilot\">We are choosing a Co-Pilot best suited for your project.</label><label ng-show=\"vm.completed.coPilot\">Co-Pilot Assigned<time>12:30pm April 5 2015</time></label></section><div ng-show=\"vm.completed.coPilot\" class=\"avatar-box\"><img src=\"{{ vm.avatars[vm.coPilotHandle] }}\" class=\"avatar\"/>Hi I\'m <a href=\"#\">{{ vm.coPilotHandle }}</a>. I\'ll be your project manager.</div></li><li ng-class=\"{ completed: vm.completed.quote, passed: vm.passed.quote}\" class=\"quote\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">15%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.completed.quote\">Generate Quote</label><label ng-show=\"vm.completed.quote\"><div class=\"carat\"></div>Quote has been generated.</label></section><p ng-show=\"vm.completed.quote &amp;&amp; !vm.completed.payment\"><a href=\"#\">View quote and pay to continue.</a></p><div class=\"expandable-content\"><button type=\"button\" class=\"clean close\">x</button><ul><li><label>Cost:</label> \n$12,000</li><li><label>Time:</label> \n21 Days</li></ul><ul><li class=\"accept\"><button>Accept</button></li><li class=\"Reject\"><Button>Reject</Button></li></ul></div></li><li ng-class=\"{ completed: vm.completed.payment, passed: vm.passed .payment}\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">20%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.completed.payment\">Add Payment Method</label><label ng-show=\"vm.completed.payment\">Payment Method Accepted.</label></section></li><li ng-class=\"{ completed: vm.completed.launched, passed: vm.passed.launched, expanded: vm.expanded.launched }\" ng-click=\"vm.expanded.launched = !vm.expanded.launched\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">25%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label><h4>Project Launched</h4><time>May 5, 2015</time></label></section><hr/></li><li ng-class=\"{ completed: vm.completed.joined, passed: vm.passed.joined, expanded: vm.expanded.launched }\" class=\"joined\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">35%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point icon\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.completed.coPilot\">Meet others</label><label ng-show=\"vm.completed.coPilot\"><div class=\"carat\"></div><span>{{ vm.members.length }} member(s) have joined.</span></label></section><div class=\"expandable-content\"><button type=\"button\" class=\"clean close\">x</button><ul><li ng-repeat=\"member in vm.members track by $index\"><img ng-src=\"{{ vm.avatars[member.handle] }}\" class=\"avatar\"/><a>{{ member.handle }} </a>joined the project.</li></ul></div></li><li class=\"comment messages no-progress completed\"><section class=\"checkpoint\"><div class=\"point comment icon\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"count clean\"><div class=\"notification\">6</div></button></div><div class=\"lead-after\"></div><label><img ng-src=\"{{ vm.avatars[member.handle] }}\" class=\"avatar\"/>Batman99 commented on project requirements</label></section></li><li class=\"notification messages no-progress completed\"><section class=\"checkpoint\"><div class=\"point icon\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"count clean\"><div class=\"notification\">6</div></button></div><div class=\"lead-after\"></div><label><img ng-src=\"{{ vm.avatars[member.handle] }}\" class=\"avatar\"/>Maybe it\'s best if we stick with the current logo and Maybe it\'s best if we stick with the current logo and</label></section><ul class=\"links\"><li><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean\">View</button></li><li><a ui-sref=\"messaging({id: 123})\">View full thread</a></li></ul><div ng-class=\"{active: vm.showMessagingWidget}\" class=\"expandable-content\"><button ng-click=\"vm.showMessagingWidget = false\" class=\"clean close\">x</button><messaging thread-id=\"123\" subscriber-id=\"Batman\" class=\"widget\"></messaging></div></li><li ng-class=\"{ completed: vm.completed.checkpoint1, passed: vm.passed.checkpoint1 }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Submissions Due</h4><time>May 5, 2015</time></label></section><hr/></li><li ng-class=\"{ completed: vm.completed.submissions, passed: vm.passed.submissions }\" class=\"submissions\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 8</div></div><div class=\"lead\"></div><div class=\"point icon\"></div><div class=\"lead-after\"></div><label><img ng-src=\"{{ vm.avatars[member.handle] }}\" class=\"avatar\"/>Batman99 submitted files to your project.</label></section></li><li ng-class=\"{ completed: vm.completed.finalDesign, passed: vm.passed.finalDesign }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">70%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Final Submissions Due</h4><time>May 5, 2015</time></label></section><hr/></li><li ng-class=\"{ completed: vm.completed.finalists, passed: vm.passed.finalists }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">50%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Select Finalists</h4><time>May 5, 2015</time></label></section><hr/><a href=\"\" ng-show=\"vm.completed.finalists &amp;&amp; !vm.completed.finalistsSelected\">View submissions and select finalists</a></li><li ng-show=\"vm.completed.finalistsSelected\" ng-class=\"{ passed: vm.passed.finalistsSelected }\" class=\"no-progress completed\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><label>You selected 4 finalists</label></section></li><li ng-class=\"{ completed: vm.completed.winner, passed: vm.passed.winner }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">85%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label>Choose Winner!</label></section></li><li ng-class=\"{ completed: vm.completed.finalFeedback, passed: vm.passed.finalFeedback }\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">95%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.completed.finalFeedback\">Final Feedback</label><label ng-show=\"vm.completed.finalFeedback\">Feedback given to <a href=\"#\">{{ vm.feedback2Handle }}</a></label></section><p ng-show=\"vm.completed.finalFeedback &amp;&amp; !vm.completed.complete\">Awaiting final design changes.</p></li><li ng-class=\"{ completed: vm.completed.completed, passed: vm.passed.completed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">100%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Project Complete</h4><time>May 5, 2015</time></label></section><hr/></li></ul>");}]);
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

  TimelineController = function(TimelineService, $stateParams) {
    var activate, mapEvents, vm;
    vm = this;
    vm.coPilotHandle = null;
    vm.members = [];
    vm.avatars = {};
    vm.submissions = null;
    vm.feedbackHandle = null;
    vm.feedback2Handle = null;
    vm.showMessagingWidget = false;
    vm.completed = {};
    vm.passed = {};
    vm.expanded = {
      submitted: false,
      launched: false,
      submissions: false,
      finalSubmissions: false,
      chooseWinner: false
    };
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
      return vm;
    };
    return activate();
  };

  TimelineController.$inject = ['$stateParams'];

  angular.module('appirio-tech-ng-timeline').controller('TimelineController', TimelineController);

}).call(this);
