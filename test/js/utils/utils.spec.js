define([
    'sinon',
    'chai',
    'utils/util'
],function(sinon,chai,util){
    'use strict';

    var expect = chai.expect;
    var assert = chai.assert;

    describe('util',function(){
        describe('getNameOf(fn)',function(){
            it ('should return the name of the function if function',function(){
                var fn = function Test(){}
                expect(util.getNameOf(fn)).to.equals('Test');

            });
            it ('should return the name of the constructor function if obj ',function(){
                var obj = {}
                expect(util.getNameOf(obj)).to.equals('Object');

            });
        });
    });
});