define(function(){
    'use strict';
    var util = {};

    util.getNameOf = function getNameOf(object) {
        var funcNameRegex = /function (.{1,})\(/;
        if (typeof object === 'function' ){
            var results = (funcNameRegex).exec(object.toString());
        } else {
            var results = (funcNameRegex).exec((object).constructor.toString());
        }
        return (results && results.length > 1) ? results[1] : "";
    };

    return util;
});