'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || []

srv = ($resource, API_URL) ->
  url     = API_URL + '/work/:workId/events'
  params  =
    workId: '@workId'
  actions =
    query:
      method           :'GET'
      isArray          : true
      transformResponse: transformResponse

  $resource url, params, actions

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-timeline').factory 'TimelineAPIService', srv
