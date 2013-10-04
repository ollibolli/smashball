define([
    'sinon',
    'chai',
    'smashball/comp/Move',
    'smashball/Entity',
    'smashball'
],function(sinon, chai, Move, Entity, smashball){
    'use strict';
    var eventBus = smashball.eventBus;
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Move',function(){

        describe('implement addSubscriptions()',function(){
            var move = new Move();
            it ('should add listen to global gameloop/gameTick events',function(done){
                var e = new Entity('identi');
                move.setEntity(e);
                move.addSubscriptions();
                eventBus.publishSync('gameloop/gameTick');

            });
            it ('should add listen to "pos/posChanged" events',function(done){
                var e = new Entity('identi');
                move.setEntity(e);
                move.addSubscriptions();
                eventBus.publishSync('gameloop/gameTick');

            });

        });
    });
});