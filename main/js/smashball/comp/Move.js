define([
    'utils/_',
    'smashball/comp/Component'
],function(_, Component){
    'use strict';
    Move.Extend(Component);

    function Move(velocity){
        _.assertParam(velocity,'utils/Vector');
        Move._super_.constructor.call(this);
        this._velocity = velocity;
        this._tokens = velocity;
    };

    /*override*/
    Move.prototype.addSubscriptions = function(){
        this._tokens['gameloop/gameTick'] = this.getEntity().subscribeGlobal('gameloop/gameTick',this.onGameloopGameTick.bind(this));
    };

    /*override*/
    Move.prototype.removeSubscriptions = function(){
        if (!this._entity.unsubscribeGlobal(this._tokens['gameloop/gameTick'])){
          console.log('[Move.removeSubscriptions] Subscription "gameloop/gameTick" could not be removeed');
        };
    };

    /*override*/
    Move.prototype.onGameloopGameTick = function(type,data){
        this._entity.publish('move/posDelta',this.getVelocity());
    };

    Move.prototype.setVelocity = function(vector){
        this._velocity = vector;
    };

    Move.prototype.getVelocity = function(){
        return this._velocity;
    };

    return Move;
});