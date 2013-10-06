define(function(){
    // 'use strict';
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

    util.Extend = function(base, sub){
        if (!sub.name){
            sub.name = 'Proto'+base.name || 'Anonymous'
        }

        for (var key in base) {
            if ({}.hasOwnProperty.call(parent, key)){
              sub[key] = base[key];
            }
        }
        //using a surrogate constructor to prevent the using the new on the
        var surrogateConstructor;
        eval('surrogateConstructor = function '+ sub.name + '(){}');
        surrogateConstructor.prototype = base.prototype;
        sub.prototype = new surrogateConstructor();
        sub.prototype.constructor = sub;
        sub.prototype.$ = base.prototype;
        sub.prototype._Super = base.prototype.constructor;

    };

    util.Mixin = function mixin(target,object,allowOverride){
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if (allowOverride || ! target[property]) {
                    target[property] = object[property];
                } else throw new Error('mixin : Property '+ property + ' already  defined not alowed to be overrided');
            }
        };
        return true;
    };

    util.hasIncluded = function hasIncluded(subject,included){
        if (!included) return false ;
        for (var property in included) {
            if (included.hasOwnProperty(property) && !subject.hasOwnProperty(property)){
                return false;
            } else {
                if (
                    included.hasOwnProperty(property)
                        && typeof included[property] === 'function'
                        && included[property].toString() !== subject[property].toString())
                {
                    return false;
                }
            }
        };
        return true;
    };

    util.assert = function assert(expression,message){
        if (expression){
            return true;
        } else {
            message = message || ' ';
            throw message;
        }
    };

    util.assertParam = function(param,requireId){
        return util.assert(util.instanceOf(param,requireId), new TypeError('Parameter error: expected [' + requireId + '] got ' + param))
    }

    util.instanceOf = function instanceOf(object, requireId){
        if ( !requireId  && typeof object === 'string'){
            requireId = object;
            object = this;
        }

        if (typeof requireId === 'string'){
            try {
                if(object instanceof require(requireId)){
                    return true;
                }
            } catch (e){
                switch(requireId){
                    case 'String': return typeof(object) === 'string' || object instanceof String;
                    case 'Object': return typeof(object) === 'object';
                    case 'Number': return typeof(object) === 'number' || object instanceof Number;
                    case 'Boolean': return typeof(object) === 'boolean' || object instanceof Boolean;
                    default :
                        var type;
                        try {
                            eval ('type = '+requireId);
                            return object instanceof type;
                        }catch (e){
                            return false;
                        }
                }
                return false;
            }
        } else {
           return object instanceof requireId
        }
    };

    return util;
});