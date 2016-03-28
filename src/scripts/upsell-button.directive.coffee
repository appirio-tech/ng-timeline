'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'UpsellButtonController as vm'
  templateUrl : 'views/upsell-button.directive.html'
  scope       :
    workId    : '@'

angular.module('appirio-tech-ng-timeline').directive 'upsellButton', directive