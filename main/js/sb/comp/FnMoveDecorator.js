define([
    'utils/_',
    'utils/Vector'
],function(_, Vector) {
    'use strict';

    function FnMoveDecorator(move, centerVector, gravity) {
        _.assertParam(move, 'sb/comp/Move', this);
        _.assertParam(centerVector, 'utils/Vector', this);
        _.assert(gravity);
        //_.assertParam(width,'number',this);
        //_.assertParam(height,'number',this);

        var moveOrg = move.move;

        move.move = function () {
            var deltaX = move.getEntityComponent('Pos').getPos().x - centerVector.x;
            var deltaY = move.getEntityComponent('Pos').getPos().y - centerVector.y;
            var length2 = Math.abs(deltaX * deltaX) + Math.abs(deltaY * deltaY);
            var friction = 1;
            var g;
            if (length2 < 50) {
                g = gravity * 100;
                friction *= 0.8;
            } else if (length2 < 225) {
                g = gravity * 20;
                friction *= 0.90;
            } else if (length2 < 350) {
                g = gravity * 20;
                friction *= 0.99;
            } else {
                g = gravity;
            }

            var v = new Vector(deltaX * g , deltaY * g );

            move.setVelocity(move.getVelocity().tx(v).multiply(friction));
            moveOrg.call(move);
        };

        return move;
    };

    return FnMoveDecorator;
});