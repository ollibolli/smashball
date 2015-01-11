define([
    'utils/_',
    'utils/Vector'
],function(_, Vector){
    'use strict';

    function FnMoveDecorator(move,centerVector,gravity){
        _.assertParam(move,'sb/comp/Move',this);
        _.assertParam(centerVector,'utils/Vector',this);
        _.assert(gravity);
        //_.assertParam(width,'number',this);
        //_.assertParam(height,'number',this);

        var moveOrg = move.move;

        move.move = function(){
            var deltaX = move.getEntityComponent('Pos').getPos().x - centerVector.x;
            var deltaY = move.getEntityComponent('Pos').getPos().y - centerVector.y;
            var length2 = Math.abs(deltaX*deltaX)+Math.abs(deltaY*deltaY);
            var friction = 1;
            var g;
            if (length2 < 50){
                g = gravity * 100;
                friction *= 0.7;
            } else if (length2 < 225){
                g = gravity * 20;
                friction *= 0.99;
            } else if (length2 < 300){
                g = gravity * 10;
                friction *= 0.992;
            } else {
                g = gravity;
            }

            var v = new Vector(deltaX * g , deltaY * g);

            move.setVelocity(move.getVelocity().tx(v));
            moveOrg.call(move);
        };

        var addSubscriptions = move.addSubscriptions;

        move.addSubscriptions = function(){
            addSubscriptions.call(move);
            this._tokens['pos/posChanged'] = move.getEntity().subscribe('pos/posChanged',FnMoveDecorator._onPosChanged.bind(this));
        };

        var removeSubscriptions = move.removeSubscriptions;

        move.removeSubscriptions = function() {
            removeSubscriptions.call(move);
            if (!this.getEntity().unsubscribe(this._tokens['pos/posChanged'])){
                console.log("[Render] Unable to remove subscription 'pos/posChanged'");
            };
        };

        FnMoveDecorator._onPosChanged = function(type,position){
            _.assertParam(position,'utils/Vector');
            move.pos = position;
        };

        return move;
    };


    FnMoveDecorator.deltaVelocity = function deltaVelocity(pos){
        _.assertParam(pos,'utils/Vector',this);
        var refPos = deltaVelocity.centerVector | null,
            width = deltaVelocity.width | null,
            deltaV = pos.subTx(refPos),
            length = deltaV.length(),
            force = FnMoveDecorator.f(length,width,0),
            radianX = Math.atan(deltaV.x/deltaV.y),
            //radianY = Math.atan(deltaV.y/deltaV.x);
            radianY = (deltaV.y/deltaV.x);

        return new Vector(Math.sin(radianX)*force,Math.sin(radianY)*force);

    }

    FnMoveDecorator.deltaVector = function(pos,centerVector,gravity){
        var deltaX = pos.x - centerVector.x;
        var deltaY = pos.y - centerVector.y;
        var length2 = Math.abs(deltaX*deltaX)+Math.abs(deltaY*deltaY);
        var gravityX = gravity;
        var gravityY = gravity;
        var friction = 1;

        if (length2 < 125){
            gravity = -0.1;
            friction = 0.1;
        } else if (length2 < 250){
            gravity = -0.04;
            friction = 0.4;
        } else if (length2 < 500){
            gravity = -0.01;
            friction = 0.5;
        }


        var deltaVector = new Vector(deltaX * gravity , deltaY * gravity);
        deltaVector.multiply(friction);
        return deltaVector;
    }


    return FnMoveDecorator;
});