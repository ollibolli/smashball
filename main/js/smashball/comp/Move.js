define([
    'smashball/comp/Component'
],function(Component){
    'use strict';
    Move.Extend(Component);

    function Move(moveCb){
        Component.prototype.constructor.call(this);
        this._moveCb = moveCb;
    };

    /*override*/
    Move.prototype.addSubscriptions = function(){
        var entity = this._entity;
        this._tokens['gameloop/gameTick'] = this._entity.subscribeGlobal('gameloop/gameTick',this._moveCb.bind(this));
    };

    /*override*/
    Move.prototype.removeSubscriptions = function(){
        if (!this._entity.unsubscribeGlobal(this._tokens['gameloop/gameTick'])){
          console.log('Subscription "gameloop/gameTick" in Move" could not be removeed');
        };
    };
    Move.prototype.setVelocity = function(vector){
        this._velocity = vector;
    };

    return Move;
});