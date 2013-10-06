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

    function Ball(id){
        Entity.prototype.constructor.call(this, id);
        this.addComponent(new Pos(new Vector(100,250)));
        this.addComponent(new Render(Ball.renderCb));
        this.addComponent(new Move(Ball.moveCb));
        this.test = "test";
    };

    Ball.prototype.setOptions = function(options){
       this._components['Pos'].setPos(options.pos);
    };

    Ball.renderCb = function(type, graphic){
        graphic.context.beginPath();
        graphic.context.arc(this._pos.x,this._pos.y,10,0,2*Math.PI,false);
        graphic.context.fillStyle = "#555";
        graphic.context.fill();
    };

    Ball.moveCb =  function(type,event){
        this._entity.publish('move/posDelta',new Vector(1,0));
    };

    return Ball;
});