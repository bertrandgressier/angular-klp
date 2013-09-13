'use strict';

angular.module('klp',[])

.factory('Klp',function($q){

    var Klp = function() {
    };

    Klp.prototype.wrap = function(promise){

        var self = this;
        var deferred = self.lastDeferred = $q.defer();

        promise.then(function(result){

            if (deferred === self.lastDeferred){
                return deferred.resolve(result);
            }
        },function(error){
            if (deferred === self.lastDeferred){
                return deferred.reject(error);
            }
        });

        return deferred.promise;
    };

    return Klp;
});