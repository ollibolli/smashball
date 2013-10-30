define([
    'sinon',
    'chai',
    'smashball/comp/FrictionMoveDecorator',
    'smashball/comp/Move',
    'test/js/testUtils',
    'utils/Vector',
    'smashball/Entity',
    'smashball'
],function(sinon, chai, FrictionMoveDecorator, Move, testUtils, Vector, Entity, smashball){
    'use strict';

    var expect = chai.expect;
    var assert = chai.assert;
    var bus = smashball.eventBus;

    describe('FrictionMoveDecorator',function(){
        describe('constructor(move,friction)',function(){
            it('should decorate a object',function(){
                var move = new Move(new Vector(2,2));
                var v = move.getVelocity();
                assert.equal(2, v.x, '1');

                var move1 = new FrictionMoveDecorator(move, 3);
                var v1 = move1.getVelocity();
                assert.equal(6, v1.x ,'2');

                var move2 = new FrictionMoveDecorator(move1, 2);
                v1 = move2.getVelocity();
                assert.equal(12, v1.x ,'3');
            });
        });
        describe('remove(move)',function(){
            it.skip('should remove a decorator',function(){
                var move = new Move(new Vector(2,2));
                var move1 = new FrictionMoveDecorator(move, 3);
                var move2 = new FrictionMoveDecorator(move1, 2);
                move2.removeDecorator(move1);
                var v1 = move2.getVelocity();
                assert.equal(6, v1.x ,'2');
            });
        });
        describe('onGameloopGameTick()',function(){

            it('test',function(done){
                var e = new Entity('testObj');
                var spy = sinon.spy(function(type,data){
                    assert.equal(6, data.x);
                    done();
                });
                e.subscribe('move/posDelta',spy);
                var move = new Move(new Vector(2,2));
                move = new FrictionMoveDecorator(move, 3);
                e.addComponent(move);
                e.componentsSubscriptions();
                console.log('[.]',move);
                bus.publish('gameloop/gameTick');
            });
        });
    });
});