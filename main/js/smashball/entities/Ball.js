define([
    'smashball/Entity',
    'utils/_',
    'smashball/comp/Render',
    'smashball/comp/Move',
    'smashball/comp/Pos',
    'utils/Vector'

],function(Entity,_ , Render, Move, Pos, Vector){
    'use strict';
    Ball.Extend(Entity);

    function Ball(id,pos,velocity){
        Entity.prototype.constructor.call(this, id);
        _.assertParam(velocity, 'utils/Vector');
        this._velocity = velocity;
        this.addComponent(new Pos(pos));
        this.addComponent(new Render(Ball.renderCb));
        this.addComponent(new Move(moveCb));


        var self = this;
        function moveCb(type,event){
           //x + y + current velocity
           this._entity.publish('move/posDelta',self._velocity);
        };
    };

    Ball.renderCb = function(type, graphic){
        graphic.context.beginPath();
        graphic.context.arc(this._pos.x,this._pos.y,10,0,2*Math.PI,false);
        graphic.context.fillStyle = "#555";
        graphic.context.fill();
    };

    return Ball;
});