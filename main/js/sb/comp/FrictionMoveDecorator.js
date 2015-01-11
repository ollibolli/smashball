define([
    'utils/_',
    'sb/comp/Move',
    'utils/Vector'

],function(_, Move, Vector){
    'use strict';

    function FrictionMoveDecorator(move,friction){

        var moveOrg = move.move;
        move.move = function newMove(){
            move.setVelocity(move.getVelocity().multiply(friction));
            moveOrg.call(move)
        };
        return move;
    };

    return FrictionMoveDecorator;
});
