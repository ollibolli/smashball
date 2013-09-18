define([
    'smashball/comp/Component'
],function(Component){
    'use strict';
    Move.Extend(Component);

    function Move(){
        this.Super();
    };

    /*override*/
    Move.prototype.addSubscriptions = function(){
        var entity = this.entity;
        this.entity.subscribeGlobal('gameloop/gameTick',function(type,event){
            console.log(entity.x);
            entity.x = entity.x + entity.speed;
        });
    }

    return Move;
});