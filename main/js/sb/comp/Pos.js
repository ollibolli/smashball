define([
    'utils/_',
    'sb/comp/Component'
],function(_, Component){
    Pos.Extend(Component);

    function Pos(vector){
        Component.call(this);
        _.assertParam(vector,'utils/Vector');
        this._pos = vector;
    }

    Pos.prototype.setPos = function(vector){
        _.assertParam(vector,'utils/Vector');
        this._pos = vector;
        if (( 197 < vector.x && vector.x < 203 && 197 < vector.y && vector.y < 203) || vector.x > 400 || vector.y > 400 || vector.x < 0 || vector.y < 0 ){
            this._entity.publish('pos/outsideBoundery',this._entity);
        }
    };

    Pos.posDeltaCb = function(type,vector){
        this.setPos(this._pos.tx(vector));
    };

    Pos.prototype.getPos = function(){
        return this._pos;
    };

    return Pos;
});