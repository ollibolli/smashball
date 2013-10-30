define(['utils/_'],function(_){
    'use strict';
    var testUtils = {
        mockNewConst : function mockConst(constructor){
            var surrogateConstructor = function MockConstructor(){};
            surrogateConstructor.prototype = constructor.prototype;
            return new surrogateConstructor();
        }
    };



    return testUtils;
});