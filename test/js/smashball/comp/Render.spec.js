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

        describe('Render(rederObject)',function(){
            it.skip('skip',function(){

            });
        });

        describe('implement addSubscriptions()',function(){
            it ('should add global "gameloop/render" subscription',function(done){
                var render = new Render(function(type,data){
                    done();
                });
                var e = new Entity('identi');
                e.addComponent(render);
                render.addSubscriptions();
                eventBus.publishSync('gameloop/render', graphic);
            });
            it ('should add entity "pos/posChanged" subscription',function(done){
                var render = new Render(function(type,data){
                    done();
                });
                var e = new Entity('identi');
                e.addComponent(render);
                render.addSubscriptions();
                e.publishSync('pos/posChanged');
            });

        });
    });
});
