define([
    'sinon',
    'chai',
    'smashball/comp/Rendable',
    'smashball/Entity',
    'smashball',
    'smashball/Graphic'
],function(sinon, chai, Rendable, Entity, smashball, Graphic){
    'use strict';
    var eventBus = smashball.eventBus;
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Rendable',function(){
        //mock
        var graphic = Graphic.factory('canvas2d', document.createElement('element'), 500, 500);

        describe('implement addSubscriptions()',function(){
            var rendable = new Rendable();
            it ('should add subscriptions',function(done){
                //mock
                graphic.context.beginPath = function() {done();};
                var e = new Entity('identi');
                rendable.setEntity(e);
                rendable.addSubscriptions();
                eventBus.publishSync('gameloop/render', graphic);
            });
        });
    });
});
