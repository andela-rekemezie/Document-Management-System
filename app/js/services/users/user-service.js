(function() {

  'use strict';

  angular.module('docKip.services')
    .factory('Users', ['$resource', '$http', '$q',
      function($resource, $http, $q) {

        var user = $resource('/api/users/:id', {
          id: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        }, {
          stripTrailingSpaces: false
        });

        // login
       user.login = function(user) {
          var deferred = $q.defer();
          $http.post('/api/users/login', user)
            .success(deferred.resolve)
            .error(deferred.reject);
          return deferred.promise;
        };

        // logout
        user.logout = function() {
          var deferred = $q.defer();
          $http.post('/api/users/logout')
            .success(deferred.resolve)
            .error(deferred.reject);
          return deferred.promise;
        };

        // get all user's documents
        user.getUserDocs = function(user) {
          var deferred = $q.defer();
          $http.get('/api/users/' + user.id + '/documents')
            .success(deferred.resolve)
            .error(deferred.reject);
          return deferred.promise;
        };
        return user;
      }
    ]);
})();