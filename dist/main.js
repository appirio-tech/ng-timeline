(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-messaging'];

  angular.module('appirio-tech-ng-timeline', dependencies);

}).call(this);

angular.module("appirio-tech-ng-timeline").run(["$templateCache", function($templateCache) {$templateCache.put("views/timeline.directive.html","<h1>Project Timeline</h1><hr/><ul><li ng-class=\"{ completed: vm.completed.submitted, expanded: vm.expanded.submitted }\" ng-click=\"vm.expanded.submitted = !vm.expanded.submitted\" class=\"milestone completed passed\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">0%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Project Submitted</h4><time>{{ vm.completed.submitted | date }}</time></label></section><hr/></li><li ng-class=\"{ completed: vm.events.confirmEmail.created, passed: vm.events.assignCopilot.created }\" ng-show=\"vm.expanded.submitted\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">6%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label ng-hide=\"vm.events.confirmEmail.created\">We sent an email to {{ vm.events.confirmEmail.address }}. <br /> Click the link in the email to verify your email address.</label><label ng-show=\"vm.events.confirmEmail.created\">Thanks! Your email is verified.</label></section><a href=\"#\" ng-hide=\"vm.events.confirmEmail.created\" class=\"resend\">Re-send Email</a></li><li ng-class=\"{ completed: vm.events.assignCopilot.created, passed: vm.events.quote.created, expanded: 1 }\" ng-show=\"vm.expanded.submitted\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">5%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.events.assignCopilot.created\">Assign Co-Pilot</label><label ng-show=\"vm.events.confirmEmail.created &amp;&amp; !vm.events.assignCopilot.created\">We are choosing a Co-Pilot best suited for your project.</label><label ng-show=\"vm.events.assignCopilot.created\">Co-Pilot Assigned<time>{{ vm.events.assignCopilot.created }}</time></label></section><div ng-show=\"vm.events.assignCopilot.avatar\" class=\"avatar-box\"><avatar url=\"{{ vm.events.assignCopilot.avatar }}\"></avatar>Hi I\'m <a href=\"#\">{{ vm.events.assignCopilot.handle }}</a>. I\'ll be your project manager.</div></li><li ng-class=\"{ completed: vm.events.quote.created, passed: vm.events.payment.created }\" ng-show=\"vm.expanded.submitted\" class=\"quote\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">15%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.events.quote.created\">Generate Quote</label><label ng-show=\"vm.events.quote.created\"><div class=\"carat\"></div>Quote has been generated.</label></section><p ng-show=\"vm.events.quote.created &amp;&amp; !vm.events.payment.created\"><a href=\"#\">View quote and pay to continue.</a></p><div class=\"expandable-content\"><button type=\"button\" class=\"clean close\">x</button><ul><li><label>Cost:</label> \n${{ vm.events.payment.total }}</li><li><label>Time:</label> \n{{ vm.events.payment.duration }} Days</li></ul><ul><li class=\"accept\"><button class=\"info\">Accept</button></li><li><button>Reject</button></li></ul></div></li><li ng-class=\"{ completed: vm.events.payment.created, passed: vm.events.launch.created }\" ng-show=\"vm.expanded.submitted\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">20%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label ng-hide=\"vm.events.payment.created\">Add Payment Method</label><label ng-show=\"vm.events.payment.created\">Payment Method Accepted.</label></section></li><li ng-class=\"{ completed: vm.events.launch.created, passed: vm.events.launch.created, expanded: vm.expanded.launched }\" ng-click=\"vm.expanded.launched = !vm.expanded.launched\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">25%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point\"><div class=\"info\">!</div></div><div class=\"lead-after\"></div><label><h4>Project Launched</h4><time>{{ vm.events.launch.created }}</time></label></section><hr/></li><li ng-class=\"{ completed: vm.events.members.length, passed: 1, expanded: vm.expanded.launched }\" ng-show=\"vm.expanded.launched\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">35%</div><div class=\"status\">Complete</div><div class=\"day\">Day 1</div></div><div class=\"lead\"></div><div class=\"point icon\"></div><div class=\"lead-after\"></div><label><div class=\"carat\"></div><span>{{ vm.members.length }} member(s) have joined.</span></label></section><div class=\"expandable-content\"><button type=\"button\" class=\"clean close\">x</button><ul><li ng-repeat=\"member in vm.events.members track by $index\"><avatar url=\"{{ member.avatar }}\"></avatar><a>{{ member.handle }} </a>joined the project.</li></ul></div></li><li ng-show=\"vm.expanded.launched\" class=\"notification messages no-progress completed passed\"><section class=\"checkpoint\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"point count clean\"><div class=\"notification\">{{ message.notification }}</div></button><div class=\"lead-after\"></div><label><avatar url=\"{{ message.avatar }}\"></avatar>{{ message.message }}</label></section><ul class=\"links\"><li><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean\">View</button></li><li><a ui-sref=\"messaging({ id: message.threadId })\">View full thread</a></li></ul><div ng-class=\"{ active: vm.showMessagingWidget }\" class=\"expandable-content\"><button ng-click=\"vm.showMessagingWidget = false\" class=\"clean close\">x</button><messaging thread-id=\"{{ message.threadId }}\" subscriber-id=\"Batman\" class=\"widget\"></messaging></div></li><li ng-class=\"{ completed: vm.events.designConcepts.created, passed: vm.events.designConcepts.created, expanded: vm.expanded.designConcepts }\" ng-click=\"vm.expanded.designConcepts = !vm.expanded.designConcepts\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">55%</div><div class=\"status\">Complete</div><div class=\"day\">Day 14</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Design Concepts</h4><time>{{ vm.events.designConcepts.created }}</time></label></section><hr/></li><li ng-show=\"vm.expanded.designConcepts\" class=\"submissions completed no-progress passed\"><section class=\"checkpoint\"><a href=\"{{ vm.events.designConcepts.submissionUrl }}\"><button ng-click=\"vm.showMessagingWidget = true\" title=\"download files\" class=\"point count clean\"><div class=\"icon download smallest\"></div></button></a><div class=\"lead-after\"></div><label><ul class=\"avatars\"><li ng-repeat=\"avatarUrl in vm.events.designConcepts.submissionAvatars track by $index\"><avatar avatar-url=\"{{ avatarUrl }}\"></avatar></li></ul></label></section><p>{{ vm.events.designConcepts.submissionAvatars.length }} people have submitted design concepts to your project.</p><p><a href=\"#\">View all submissions</a></p></li><li ng-repeat=\"comment in vm.events.designConcepts.comments track by $index\" ng-show=\"vm.expanded.designConcepts\" class=\"comment no-progress completed passed\"><section class=\"checkpoint\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean point\"><div class=\"notification\">{{ comment.notification }}</div><div class=\"icon envelope smallest\"></div></button><div class=\"lead-after\"></div><label><avatar ng-src=\"{{ comment.avatar }}\"></avatar>{{ comment.handle }}</label></section><p>Ok, I\'ll give the yellow buttons at the top a try and see how it looks.</p><ul class=\"files\"><li ng-repeat=\"thumbnail in comment.thumbnails track by $index\"><img ng-src=\"{{ thumbnail }} \"/></li></ul><a href=\"#\">view message</a></li><li ng-show=\"vm.expanded.designConcepts\" class=\"winners completed no-progress passed\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><label>Congratulations you have confirmed your winners for the final design phase.</label></section><ul class=\"avatars\"><li ng-repeat=\"avatar in vm.events.finalDesigns.winnerAvatars track by $index\"><avatar avatar-url=\"{{ avatar }}\"></avatar></li></ul></li><li ng-show=\"vm.expanded.designConcepts\" class=\"notification messages no-progress completed passed\"><section class=\"checkpoint\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"point count clean\"><div class=\"notification\">{{ message.notification }}</div></button><div class=\"lead-after\"></div><label><avatar url=\"{{ message.avatar }}\"></avatar>{{ message.message }}</label></section><ul class=\"links\"><li><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean\">View</button></li><li><a ui-sref=\"messaging({ id: message.threadId })\">View full thread</a></li></ul><div ng-class=\"{ active: vm.showMessagingWidget }\" class=\"expandable-content\"><button ng-click=\"vm.showMessagingWidget = false\" class=\"clean close\">x</button><messaging thread-id=\"{{ message.threadId }}\" subscriber-id=\"Batman\" class=\"widget\"></messaging></div></li><li ng-class=\"{ completed: vm.events.finalDesigns.created, passed: vm.events.finalDesigns.created, expanded: vm.expanded.finalDesigns }\" ng-click=\"vm.expanded.finalDesigns = !vm.expanded.finalDesigns\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">70%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Final Designs</h4><time>{{ vm.events.finalDesigns.created }}</time></label></section><hr/></li><li ng-show=\"vm.expanded.finalDesigns\" class=\"submissions completed no-progress passed\"><section class=\"checkpoint\"><button ng-click=\"vm.showMessagingWidget = true\" title=\"download files\" class=\"point count clean\"><div class=\"icon download smallest\"></div></button><div class=\"lead-after\"></div><label><ul class=\"avatars\"><li ng-repeat=\"avatarUrl in vm.events.finalDesigns.submissionAvatars track by $index\"><avatar avatar-url=\"{{ avatarUrl }}\"></avatar></li></ul></label></section><p>{{ vm.events.finalDesigns.submissionAvatars.length }} people have submitted design concepts to your project.</p><p><a href=\"#\">View all submissions</a></p></li><li ng-show=\"vm.expanded.finalDesigns\" class=\"winners completed no-progress passed\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><label>Congratulations you have confirmed your winners for the final design phase.</label></section><ul class=\"avatars\"><li ng-repeat=\"avatar in vm.events.designConcepts.winnerAvatars track by $index\"><avatar avatar-url=\"{{ avatar }}\"></avatar></li></ul></li><li ng-class=\"{ completed: vm.events.finalFixes.created, passed: vm.events.finalFixes.created, expanded: vm.expanded.finalFixes }\" ng-click=\"vm.expanded.finalFixes = !vm.expanded.finalFixes\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">70%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Final Fixes</h4><time>{{ vm.events.finalFixes.created }}</time></label></section><hr/></li><li ng-show=\"vm.expanded.finalFixes\" class=\"submissions completed no-progress passed\"><section class=\"checkpoint\"><a href=\"{{ vm.events.finalFixes.submissionUrl }}\"><button ng-click=\"vm.showMessagingWidget = true\" title=\"download files\" class=\"point count clean\"><div class=\"icon download smallest\"></div></button></a><div class=\"lead-after\"></div><label><avatar avatar-url=\"{{  vm.events.finalFixes.submissionAvatar }}\"></avatar></label></section><p>1 person have submitted design concepts to your project.</p><p><a href=\"#\">View all submissions</a></p></li><li ng-repeat=\"comment in vm.events.finalFixes.comments track by $index\" ng-show=\"vm.expanded.finalFixes\" class=\"comment no-progress completed passed\"><section class=\"checkpoint\"><button ng-click=\"vm.showMessagingWidget = true\" class=\"clean point\"><div class=\"notification\">{{ comment.notification }}</div><div class=\"icon envelope smallest\"></div></button><div class=\"lead-after\"></div><label><avatar ng-src=\"{{ comment.avatar }}\"></avatar>{{ comment.handle }}</label></section><p>Ok, I\'ll give the yellow buttons at the top a try and see how it looks.</p><ul class=\"files\"><li ng-repeat=\"thumbnail in comment.thumbnails track by $index\"><img ng-src=\"{{ thumbnail }} \"/></li></ul><a href=\"#\">view message</a></li><li ng-show=\"vm.expanded.finalFixes\" class=\"completed no-progress passed\"><section class=\"checkpoint\"><div class=\"point\"></div><div class=\"lead-after\"></div><label><avatar avatar-url=\"{{ vm.events.finalFixes.winnerAvatar }}\"></avatar>Congratulations your project has been completed successfully.</label></section></li><li ng-class=\"{ completed: vm.events.completed, passed: vm.events.completed }\" class=\"milestone\"><section class=\"checkpoint\"><div class=\"progress\"><div class=\"percent\">100%</div><div class=\"status\">Complete</div><div class=\"day\">Day 20</div></div><div class=\"lead\"></div><div class=\"point\"></div><div class=\"lead-after\"></div><label><h4>Project Complete</h4><time>May 5, 2015</time></label></section><hr/></li></ul>");}]);
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
    var activate, vm;
    vm = this;
    vm.events = {};
    vm.events.confirmEmail = {
      address: 'john@example.com',
      created: '12:30pm April 5 2015'
    };
    vm.events.assignCopilot = {
      created: '12:30pm April 5 2015',
      handle: 'Batman'
    };
    vm.events.quote = {
      created: '12:30pm April 5 2015'
    };
    vm.events.payment = {
      created: '12:30pm April 5 2015',
      total: 12000,
      duration: 21
    };
    vm.events.launch = {
      created: '12:30pm April 5 2015',
      comments: []
    };
    vm.events.members = [];
    vm.events.designConcepts = {
      created: '12:30pm April 5 2015',
      submissionUrl: 'http://www.google.com',
      submissionAvatars: ['http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ'],
      comments: [],
      winnerAvatars: ['http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ']
    };
    vm.events.finalDesigns = {
      created: '12:30pm April 5 2015',
      submissionUrl: 'http://www.google.com',
      submissionAvatars: ['http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ'],
      winnerAvatars: ['http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ']
    };
    vm.events.finalFixes = {
      created: '12:30pm April 5 2015',
      submissionUrl: 'http://www.google.com',
      submissionAvatar: 'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg',
      comments: [],
      winnerAvatar: 'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg'
    };
    vm.events.completed = {
      created: '12:30pm April 5 2015'
    };
    vm.messages = [];
    vm.messages.push({
      avatar: '',
      handle: "Batman",
      notification: 5,
      threadId: "abc123",
      message: 'Maybe its best if we stick with something something something something.'
    });
    [0, 1].forEach(function(i) {
      vm.events.members.push({
        created: '12:30pm April 5 2015',
        handle: "Batman " + i,
        avatar: ''
      });
      vm.events.launch.comments.push({
        avatar: '',
        handle: "Batman " + i,
        notification: 5,
        threadId: "abc123",
        fileName: 'Project Requirement'
      });
      vm.events.designConcepts.comments.push({
        avatar: '',
        handle: "Batman " + i,
        notification: 5,
        threadId: 'abc123',
        thumbnails: ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeNwaztw8GRj92kWle4aR_aZL3S67eSDhr0BHlvCZCjq0IYV5o', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTefWG90x9rpWeS5eWCNMu1EJx5VU2x8pAr0ARSg7Meq92DtkdYnSkVMg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQlmG6IREY5HXEU8bW6cpAMZv1KhlbfGnOSTe-qwc44aOzAfAujYoxN8w']
      });
      return vm.events.finalFixes.comments.push({
        avatar: '',
        handle: "Batman " + i,
        notification: 5,
        threadId: 'abc123',
        thumbnails: ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeNwaztw8GRj92kWle4aR_aZL3S67eSDhr0BHlvCZCjq0IYV5o', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTefWG90x9rpWeS5eWCNMu1EJx5VU2x8pAr0ARSg7Meq92DtkdYnSkVMg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQlmG6IREY5HXEU8bW6cpAMZv1KhlbfGnOSTe-qwc44aOzAfAujYoxN8w']
      });
    });
    vm.expanded = {
      submitted: false,
      launched: false,
      designConcepts: false,
      finalDesigns: false,
      finalFixes: false
    };
    activate = function() {
      return vm;
    };
    return activate();
  };

  TimelineController.$inject = ['$stateParams'];

  angular.module('appirio-tech-ng-timeline').controller('TimelineController', TimelineController);

}).call(this);
