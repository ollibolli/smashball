define([
    'sinon',
    'chai',
    'smashball/comp/Render',
    'smashball/Entity',
    'smashball',
    'smashball/Graphic'
],function(sinon, chai, Render, Entity, smashball, Graphic){
    'use strict';
    var eventBus = smashball.eventBus;
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Render',function(){
        //mock
        var graphic = Graphic.factory('canvas2d', document.createElement('element'), 500, 500);

        describe('implement addSubscriptions()',function(){
            var render = new Render();
            it ('should add subscriptions',function(done){
                //mock
                graphic.context.beginPath = function() {done();};
                var e = new Entity('identi');
                render.setEntity(e);
                render.addSubscriptions();
                eventBus.publishSync('gameloop/render', graphic);
            });
        });
    });
});
