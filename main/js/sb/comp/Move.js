define([
    'utils/_',
    'sb/comp/Component'
],function(_, Component){
    'use strict';
    Move.Extend(Component);

    function Move(velocity){
        _.assertParam(velocity,'utils/Vector');
        Component.call(this);
        this._velocity = velocity;

        this._tokens = {};
    };

    Move.prototype.setEntity = function(entity){
        Move._super_.setEntity.call(this,entity);
        this._Pos = this.getEntityComponent('Pos');
        entity.subscribe('gameloop/gameTick', this.move.bind(this));
    };

    Move.prototype.setVelocity = function(vector){
        this._velocity = vector;
    };

    Move.prototype.getVelocity = function(){
        return this._velocity;
    };

    Move.prototype.move = function(){
        this._Pos.setPos(this._Pos.getPos().tx(this._velocity));
    };

    return Move;
});