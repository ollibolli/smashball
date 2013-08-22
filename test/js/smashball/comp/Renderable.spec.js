define(['sinon','chai','smashball/comp/Rendable'],function(sinon, chai, Rendable){
    'use strict';
    
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Rendable',function(){
        describe('implement addSubscriptions()',function(){
            var rendable = new Rendable();
            it ('should add subscriptions',function(){
                rendable.addSubscriptions();

            });
        });
    });
});