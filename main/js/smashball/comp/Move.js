define([
    'smashball/comp/Component'
],function(Component){
    'use strict';
    Move.Extend(Component);

    function Move(moveCb){
        this.Super();
        this._moveCb = moveCb;
    };

    /*override*/
    Move.prototype.addSubscriptions = function(){
        var entity = this._entity;
        this._tokens['gameloop/gameTick'] = this._entity.subscribeGlobal('gameloop/gameTick',this._moveCb.bind(this));
    };

    /*override*/
    Move.prototype.removeSubscriptions = function(){
        var entity = this._entity;
        this._entity.subscribeGlobal(this._tokens['gameloop/gameTick']);
    };
    Move.prototype.setVelocity = function(vector){
        this._velocity = vector;
    };

    return Move;
});