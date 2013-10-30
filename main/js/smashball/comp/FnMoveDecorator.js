define([
    'utils/_',
    'utils/Vector'
],function(_, Vector){
    'use strict';

    function FnMoveDecorator(move,centerVector,gravity){
        _.assertParam(move,'smashball/comp/Move',this);
        _.assertParam(centerVector,'utils/Vector',this);
        _.assert(gravity);
        //_.assertParam(width,'number',this);
        //_.assertParam(height,'number',this);
        move.pos = centerVector;

        var getVelocity = move.getVelocity;
        move.getVelocity = function(){
            var v = FnMoveDecorator.deltaVector(move.pos,centerVector,gravity)
            v.tx(getVelocity.call(move));
            move.setVelocity(v);
            return v;
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

    FnMoveDecorator.f = function (x,width,e){
        var sin = Math.sin,
            halfPi = Math.PI/2,
            pi= Math.PI,
            y = sin(((x-e)/(((width)-(e*2))/pi))*2);
        return y;
    };
    FnMoveDecorator.f2 = function (x,width,e){
        var cos = Math.cos,
            pi= Math.PI,
            a = x-e,
            b = (width)-(e*2),
            y = cos((a/(b/pi))*2);
        return y;
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
        var deltaVector = new Vector((pos.x - centerVector.x) * gravity , (pos.y - centerVector.y) * gravity);
        return deltaVector;
    }


    return FnMoveDecorator;
});