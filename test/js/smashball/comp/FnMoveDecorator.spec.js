define([
    'sinon',
    'chai',
    'sb/comp/FnMoveDecorator',
    'sb/comp/Move',
    'test/js/testUtils',
    'utils/Vector',
    'sb/Entity',
    'sb'
],function(sinon, chai, FnMoveDecorator, Move, testUtils, Vector, Entity, smashball){
    'use strict';

    var expect = chai.expect;
    var assert = chai.assert;

    describe('FnMoveDecorator',function(){
        describe('implement addSubscriptions()',function(){
            it('should add listen fn to "pos/posChanged" events who stores the position',function(){
                var move = new Move(testUtils.mockNewConst(Vector));
                move = new FnMoveDecorator(move,new Vector(200,200),400,400);
                var e = new Entity('identi');
                move.setEntity(e);
                move.addSubscriptions();
                var v = new Vector(3,5);
                e.publishSync('pos/posChanged',v);



            });
        });
        describe.skip('onGameTickEvent()',function(){
            it('should publish a "move/posDelta" event calcutated the velocity',function(done){
                var move = new Move(testUtils.mockNewConst(Vector)),
                    e = new Entity('identisss');

                function cb(type,data){
                    done();
                };
                e.subscribe('move/posDelta',cb);
                move = new FnMoveDecorator(move,new Vector(200,200),400,400);
                e.addComponent(move);
                e.componentsSubscriptions();
                smashball.eventBus.publish('gameloop/gameTick',{});


            });
        });
        describe('FnMoveDecorator.f(v,g,width)',function(){
            it.skip('testing',function(){
                var f = FnMoveDecorator.f,
                    vector = new Vector(100,100);
                assert.equal(30,f(vector,1,400).x);
            });
        });
        describe.skip('FnMoveDecorator.f',function(){
            it('should be some derivata',function(){
                assert.equal(1,FnMoveDecorator.f(0,1,400,0));
                assert.equal(1,FnMoveDecorator.f(50,1,400,50));
                assert.equal(2,FnMoveDecorator.f(50,2,400,50));
            });
        });
        describe('FnMoveDecorator.deltaVelocity',function(){
            it('should calculate the movement on x and y ',function(){
                assert.equal(0,FnMoveDecorator.deltaVelocity(new Vector(100,0),new Vector(100,100),200).x, '1')
                assert.equal(1,FnMoveDecorator.deltaVelocity(new Vector(50,100),new Vector(100,100),200).x, '2')
                assert.equal(1,FnMoveDecorator.deltaVelocity(new Vector(100,150),new Vector(100,100),200).x ,'3')
            });
        });
    });


});