angular-klp
================

In angular execute only the last promise.

KLP for Keep Last Promise.

How to used
==========

Create an object instance and wrap call with this instance

var queryKlp = new Klp();

queryKlp.wrap(myPromise);

fiddle example: http://jsfiddle.net/bertrandgressier/FPhS4/

===

If you want execute a callback to be the last promise executed, you can used the helper exec(function)

example :

queryKlp.exec(function(){
    //handling
});


