define([
    'sinon',
    'chai',
    'smashball/Scene'
],function(sinon,chai,Scene){
    'use strict';

    var expect = chai.expect;
    var assert = chai.assert;

    describe('Scene',function(){
        describe('load(venue)',function(){
            it ('throw not implemented error',function(){
                expect((new Scene).load).to.throw;
            });
        });
    });
});