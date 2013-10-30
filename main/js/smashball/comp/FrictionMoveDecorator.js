define([
    'utils/_',
    'smashball/comp/Move',
    'utils/Vector'

],function(_, Move, Vector){
    'use strict';

    function FrictionMoveDecorator(move,friction){
        var getVelocity = move.getVelocity;
        move.getVelocity = function newVelocity(){
            return getVelocity().multiply(friction);
        };

        return move;
    };

    return FrictionMoveDecorator;
});
