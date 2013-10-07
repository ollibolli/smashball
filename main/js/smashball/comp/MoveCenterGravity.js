define([
    'smashball/comp/Component'
],function(Move){
    'use strict';
    MoveCenterGravity.Extend(Move);

    function MoveCenterGravity(velocity){
        Component.prototype.constructor.call(this);
        this._moveCb = moveCb;
    };

    /*override*/
    MoveCenterGravity.prototype.addSubscriptions = function(){
        var entity = this._entity;
        this._tokens['gameloop/gameTick'] = this._entity.subscribeGlobal('gameloop/gameTick',this._moveCb.bind(this));
    };

    return MoveCenterGravity;
});