'use strict'

srv = ($resource, API_URL) ->
  url     = API_URL + '/copilots/:copilotId/projects/:projectId/approved'
  params  =
    copilotId: '@copilotId'
    projectId: '@projectId'

  $resource url, params

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-timeline').factory 'CoPilotAPIService', srv
