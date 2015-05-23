'use strict'

srv = ($resource, apiUrlV2) ->
  url     = apiUrlV2 + '/users/:handle'
  params  = handle: '@handle'

  $resource url, params

srv.$inject = ['$resource', 'apiUrlV2']

angular.module('appirio-tech-timeline').factory 'UserAPIService', srv
