'use strict'

TimelineController = (TimelineService, $stateParams) ->
  vm        = this
  vm.events = {}

  vm.events.confirmEmail =
    address: 'john@example.com'
    created: '12:30pm April 5 2015'

  vm.events.assignCopilot =
    created: '12:30pm April 5 2015'
    handle: 'Batman'

  vm.events.quote =
    created: '12:30pm April 5 2015'

  vm.events.payment =
    created : '12:30pm April 5 2015'
    total   : 12000
    duration: 21

  vm.events.launch =
    created: '12:30pm April 5 2015'
    comments: []

  vm.events.members = []

  vm.events.designConcepts =
    created: '12:30pm April 5 2015'
    submissionUrl: 'http://www.google.com'
    submissionAvatars: [
      'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg'
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g'
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ'
    ]
    comments: []
    winnerAvatars: [
      'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg'
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g'
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ'
    ]

  vm.events.finalDesigns =
    created: '12:30pm April 5 2015'
    submissionUrl: 'http://www.google.com'
    submissionAvatars: [
      'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg'
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g'
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ'
    ]
    winnerAvatars: [
      'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg'
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxtTgmLDFyV4Y4XEK8kDZFK2Niq1AQ0NemIYK79M3rWZ8sgvBVPsns7g'
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgQhu21jX-_dmf2q0npjBFskOzUyy2waoYS3h1C6zzkICmwQz98NSjVQ'
    ]

  vm.events.finalFixes =
    created         : '12:30pm April 5 2015'
    submissionUrl   : 'http://www.google.com'
    submissionAvatar: 'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg'
    comments        : []
    winnerAvatar    : 'http://www.freakpic.in/wp-content/uploads/2014/10/funny-avatar-6-300x300.jpg'

  vm.events.completed =
    created: '12:30pm April 5 2015'

  vm.messages = []

  vm.messages.push
    avatar: ''
    handle: "Batman"
    notification: 5
    threadId: "abc123"
    message: 'Maybe its best if we stick with something something something something.'

  [0, 1].forEach (i) ->
    vm.events.members.push
      created: '12:30pm April 5 2015'
      handle: "Batman #{i}"
      avatar: ''

    vm.events.launch.comments.push
      avatar: ''
      handle: "Batman #{i}"
      notification: 5
      threadId: "abc123"
      fileName: 'Project Requirement'

    vm.events.designConcepts.comments.push
      avatar: ''
      handle: "Batman #{i}"
      notification: 5
      threadId: 'abc123'
      thumbnails: [
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeNwaztw8GRj92kWle4aR_aZL3S67eSDhr0BHlvCZCjq0IYV5o'
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTefWG90x9rpWeS5eWCNMu1EJx5VU2x8pAr0ARSg7Meq92DtkdYnSkVMg'
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQlmG6IREY5HXEU8bW6cpAMZv1KhlbfGnOSTe-qwc44aOzAfAujYoxN8w'
      ]

    vm.events.finalFixes.comments.push
      avatar: ''
      handle: "Batman #{i}"
      notification: 5
      threadId: 'abc123'
      thumbnails: [
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeNwaztw8GRj92kWle4aR_aZL3S67eSDhr0BHlvCZCjq0IYV5o'
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTefWG90x9rpWeS5eWCNMu1EJx5VU2x8pAr0ARSg7Meq92DtkdYnSkVMg'
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQlmG6IREY5HXEU8bW6cpAMZv1KhlbfGnOSTe-qwc44aOzAfAujYoxN8w'
      ]

  vm.expanded =
    submitted       : false
    launched        : false
    submissions     : false
    finalDesigns: false
    chooseWinner    : false

  activate = ->
    vm

  activate()

TimelineController.$inject = [
  '$stateParams'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController

