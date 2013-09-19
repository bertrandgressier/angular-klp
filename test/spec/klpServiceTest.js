'use strict';

describe('Service: Keep Last Promise KLP', function () {

    beforeEach(module('klp'));

    it('verified race condition in success', inject(function ($q, Klp, $rootScope) {

        var defered = $q.defer();
        var defered2 = $q.defer();

        var promiseRace = new Klp();

        var valueModifiedInPromise = null;

        promiseRace.wrap(defered.promise).then(function () {
            valueModifiedInPromise = 'promise 1';
        });
        promiseRace.wrap(defered2.promise).then(function () {
            valueModifiedInPromise = 'promise 2';
        });

        defered.resolve();
        $rootScope.$apply();
        expect(valueModifiedInPromise).toBeNull();

        defered2.resolve();
        $rootScope.$apply();
        expect(valueModifiedInPromise).toEqual('promise 2');
    }));

    it('verified race condition in error', inject(function ($q, Klp, $rootScope) {

        var defered = [$q.defer(), $q.defer(), $q.defer()];

        var promiseRace = new Klp();

        var valueModifiedInPromise = null;
        var valueErrorInPromise = null;

        for (var i = 0; i < defered.length; i++) {

            var iSnap = i;

            /*jshint loopfunc: true */
            promiseRace.wrap(defered[i].promise).then(function () {
                valueModifiedInPromise = 'promise ' + iSnap;
            }, function () {
                valueErrorInPromise = 'error ' + iSnap;
            });
        }

        defered[0].resolve();
        $rootScope.$apply();
        expect(valueModifiedInPromise).toBeNull();
        expect(valueErrorInPromise).toBeNull();

        defered[1].reject();
        $rootScope.$apply();
        expect(valueModifiedInPromise).toBeNull();
        expect(valueErrorInPromise).toBeNull();

        defered[2].reject();
        $rootScope.$apply();
        expect(valueModifiedInPromise).toBeNull();
        expect(valueErrorInPromise).toEqual('error 2');
    }));

    it('should executed the callback in first', inject(function ($q, Klp, $rootScope) {
        var defered = $q.defer();

        var promiseRace = new Klp();

        var valueModifiedInPromise = null;

        promiseRace.wrap(defered.promise).then(function () {
            valueModifiedInPromise = 'promise 1';
        });

        promiseRace.exec(function () {
            valueModifiedInPromise = 'my callback';
        });

        defered.resolve();
        $rootScope.$apply();
        expect(valueModifiedInPromise).toEqual('my callback');
    }));
});