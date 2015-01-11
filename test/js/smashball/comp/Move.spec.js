define([
    'sinon',
    'chai',
    'sb/comp/Move',
    'sb/Entity',
    'sb',
    'utils/Vector'
],function(sinon, chai, Move, Entity, smashball, Vector){
    'use strict';
    var eventBus = smashball.eventBus;
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Move',function(){

        var move,e,vector;

        beforeEach(function(done){
            vector = new Vector(3,5)
            move = new Move(vector);
            e = new Entity('identi');
            move.setEntity(e);
            done()
        });

        describe('implement addSubscriptions()',function(){

            it ('should add/remove listen to global gameloop/gameTick events and call onGameTick',function(){
                sinon.spy(move,'onGameloopGameTick');
                move.addSubscriptions();
                eventBus.publishSync('gameloop/gameTick');
                expect(move.onGameloopGameTick.calledOnce).to.be.ok;
                move.removeSubscriptions();
                eventBus.publishSync('gameloop/gameTick');
                expect(move.onGameloopGameTick.calledOnce).to.be.ok;


            });
        });
        describe('onGameTick(type,data) ',function(){
            it('should publish a move/posDelta event with the movement in next GameTick',function(done){
                var cb = sinon.spy(function(){
                    expect(cb.called).to.be.ok;
                    expect(cb.withArgs('move/posDelta',vector).calledOnce);
                    done();
                });
                cb.withArgs('move/posDelta',vector);
                e.subscribe('move/posDelta',cb);
                move.onGameloopGameTick();

            });
        });
    });
});