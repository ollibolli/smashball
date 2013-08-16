/**
 * Ollibolli javascript inheritence
 * The goal of this is to create a simple prototyping.
 * Using the javascript constructor function as the constructor and not breaking the prototype chain
 * by copying functions. And be able to verify constructor parameters in the constructor function.
 *
 *
 *
 * Big contributor is Juan Mendes (http://js-bits.blogspot.se/);
 */
//'use strict';

/**
 * This is the core function for Ollibolli javascript Inheritence
 * By copying the prototype of the prototyping object to a surrogate Constructor function and using the new on that prevent
 * using the constructor function.
 */

(function (){
    /**
     *  @param parent the parent constructor function
     *  @param methods a obj that is added to the objects prototype
     */
    Function.prototype.Extend = function(parent, methods){

        extend (parent,this);
        if (methods) {
            mixin(this.prototype,methods, true);
        }
    }


    Function.prototype.Include = function (object, allowOverride) {
        mixin(this.prototype, object, allowOverride);
    };

    Function.prototype.hasIncluded = function(object){
        hasIncluded(this,object);
    };

    if(!Function.prototype.bind) {
        /**
         * The bind function i binding this to oThis and not to the object that the function is sitting on
         * @param oThis [object object]
         */
        Function.prototype.bind = function(oThis) {
            if( typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {
            }, fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    function extend(base, sub){
        if (!sub.name){
            sub.name = 'Proto'+base.name || 'Anonymous'
        }

        //using a surrogate constructor to prevent the using the new on the
        var surrogateConstructor;
        eval('surrogateConstructor = function '+ sub.name + '(){}');
        surrogateConstructor.prototype = base.prototype;
        sub.prototype = new surrogateConstructor();
        sub.prototype.constructor = sub;
        sub.prototype.$ = base.prototype;
    }

    function mixin(target,object,allowOverride){
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if (allowOverride || ! target[property]) {
                    target[property] = object[property];
                } else throw new Error('mixin : Property '+ property + ' already  defined not alowed to be overrided');
            }
        };
        return true;
    };

    function hasIncluded(subject,included,deep){
        for (var property in object) {
            if (object.hasOwnProperty(property) && !subject.prototype.hasOwnProperty(property)){
                return false;
            } else {
                if (deep && obj[property]!==subject[property]){
                    return false;
                }
            }
        };
        return true;

    }


    /**
     * Object father off all
     */

    define(function(){

        function Base(){};

        /**
         * A function equal to super. use this only in constructor Functions
         * Important to always call Super in the extended constructor function.
         * By calling Super, every constructor in the prototype chain is applied on the new object
         *
         */
        Base.prototype.Super = function(){
            this.$.constructor.apply(this.$,arguments);
        }

        /**
         * @return the name of the constructor function that created the obj
         */
        Base.prototype.getNameOfInstance = function (){
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        };

        /**
         * Check the instance of a object by the requireJs dependency id eg 'folder/Module'
         * @param requireJSId {String}
         * @return true if object is instance of that object.
         */
        Base.prototype.instanceOf = function(requireJsId){
            try {
                var result = (this instanceof require(requireJsId));
            } catch (e){
                return false;
            }
            return result;
        };

        Base.prototype.mixin = function(obj,allowOverride){
            mixin(this,obj,allowOverride);
        }

        Base.prototype.hasMixedin = function(obj){
            return hasIncluded(this,obj);
        }

        return Base;
    });
})();