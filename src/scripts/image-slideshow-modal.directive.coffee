'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'ImageSlideShowModalController as vm'
  templateUrl : 'views/image-slideshow-modal.directive.html'
  scope       :
    showModal:    '@'
    handle:       '@'
    avatar:       '@'
    reportDate:   '@'
    files:        '='
    startingFile: '='
    handleClose:  '='

angular.module('appirio-tech-ng-timeline').directive 'imageSlideshowModal', directive