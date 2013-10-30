define([
    'sinon',
    'chai',
    'smashball/comp/MoveDecorator',
    'smashball/Entity',
    'utils/Vector',
    'smashball/comp/Move',
    'test/js/testUtils',
    'utils/_'
],function(sinon, chai, MoveDecorator, Entity, Vector, Move ,utils, _){
    'use strict';
    
    var expect = chai.expect,
        assert = chai.assert;

    describe('MoveDecorator.prototype',function(){
        
        it('should have all properties as Move',function(){
            var move = new Move(utils.mockNewConst(Vector));
            var decorator = new MoveDecorator(move);
            for (var k in move){
                if (!decorator[k] === undefined){
                    assert.fail();
                }
            }
        });
        it('sould call decorated object in every methods.',function(){
            
        });
    });
});