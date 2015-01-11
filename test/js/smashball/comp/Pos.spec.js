define([
    'sinon',
    'chai',
    'sb/comp/Pos',
    'utils/Vector',
    'sb/Entity'
],function(sinon,chai,Pos,Vector,Entity){
    'use strict';
    
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Pos',function(){
        describe('new Pos([utils/Vector])',function(){
            it('should save the vector',function(){
                var vector =new Vector(1,0);
                var pos = new Pos(vector);
                expect(pos._pos).to.equals(vector);
            });        
        });

        describe('setPos([utils/Vector])',function(){
            it ('should publish a "pos/posChange" event on entity',function(done){
                var pos = new Pos(new Vector(1,0));
                var entity = new Entity('name');
                entity.addComponent(pos);

                var spy = sinon.spy(function(type,data){
                    verify(data);
                });

                function verify(data){
                    assert.equal(data.x,3);
                    assert.equal(data.y,5);
                    assert(spy.calledOnce);
                    done();
                };

                entity.subscribe('pos/posChanged',spy);
                pos.setPos(new Vector(3,5));

            });
            it ('should publishGlobal a "deleteEntity" pos is outside venue ',function(done){
                var pos = new Pos(new Vector(1,0));
                var entity = new Entity('name');
                entity.addComponent(pos);

                var spy = sinon.spy(function(type,data){
                    verify(data);
                });

                function verify(data){
                    assert(spy.calledOnce);
                    done();
                };

                entity.subscribeGlobal('pos/outsideBoundery',spy);
                pos.setPos(new Vector(701,501));

            });
        });
    });
});