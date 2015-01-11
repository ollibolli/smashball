global.define = require('amdefine');
var assert = require('assert');



define([
    'sb/comp/Collision',
    'assert'
],function test(Base,assert){
    'use strict';
    describe('testet',function(){
        it('sould',function(){
            assert(Base);
        });
        it('should have hasIncluded ',function(){
            assert(Base.hasIncluded({}));
        });
        it('should create a new instance of Base',function(){
            var base = new Base();
            assert(base);
        });
    });
});
