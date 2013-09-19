'use strict';

angular.module('klp', [])

    .factory('Klp', function ($q) {

        var Klp = function () {
        };

        /*
         Wrap promise to keep only the last promise registred and then return just it
         */
        Klp.prototype.wrap = function (promise) {

            var self = this;
            var deferred = self.lastDeferred = $q.defer();

            promise.then(function (result) {

                if (deferred === self.lastDeferred) {
                    return deferred.resolve(result);
                }
            }, function (error) {
                if (deferred === self.lastDeferred) {
                    return deferred.reject(error);
                }
            });

            return deferred.promise;
        };

        /*
         Create a promise and use the system to be the last promise executed.
         if the promise is executed, so the callback passed too.
         */
        Klp.prototype.exec = function (callback) {

            this.wrap($q.when().then(function () {
                callback();
            }));
        };

        return Klp;
    });