define([
    'utils/_',
    'smashball/comp/Component'
],function(_, Component){
    Pos.Extend(Component);

    function Pos(vector){
        Pos._super_.constructor.call(this);
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
        if (! this._entity.unsubscribe(this._tokens['move/posDelta']),this._entity){
            console.log("Pos unable to remove Subscriptions 'move/posDelta'");
        };
    };

    Pos.prototype.setPos = function(vector){
        _.assertParam(vector,'utils/Vector');
        this._pos = vector;
        if (( 190 < vector.x && vector.x < 210 && 190 < vector.y && vector.y < 210) || vector.x > 400 || vector.y > 400 || vector.x < 0 || vector.y < 0 ){
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