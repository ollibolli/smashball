define([
    'utils/_',
    'smashball/comp/Component'
],function(_, Component){
    Pos.Extend(Component);

    function Pos(vector){
        _.assertParam(vector,'utils/Vector');
        this._pos = vector;
        this._tokens = {};
    }

    /*override*/
    Pos.prototype.addSubscriptions = function(){
        this._tokens['move/posDelta'] = this._entity.subscribe('move/posDelta',Pos.posDeltaCb.bind(this));
    };

    /*override*/
    Pos.prototype.removeSubscriptions = function(){
        console.log(this._entity);
        if (! this._entity.unsubscribe(this._tokens['move/posDelta'])){
            throw new Error("Pos unable to remove Subscriptions");
        };
    };

    Pos.prototype.setPos = function(vector){
        _.assertParam(vector,'utils/Vector');
        this._pos = vector;
        if (vector.x > 500 || vector.y > 400 ){
            this._entity.publishGlobal('pos/outsideBoundery',this._entity);
        }else{
            this._entity.publish('pos/posChanged',vector);
        }
    };

    Pos.posDeltaCb = function(type,vector){
        this.setPos(this._pos.tx(vector));
    };

    return Pos;
});