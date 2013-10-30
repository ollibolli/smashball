define([
    'smashball/Entity',
    'utils/_',
    'smashball/comp/Render',
    'smashball/comp/Move',
    'smashball/comp/Pos',
    'utils/Vector',
    'smashball/comp/FnMoveDecorator',
    'smashball/comp/FrictionMoveDecorator'

],function(Entity,_ , Render, Move, Pos, Vector, FnDecorator, FrictionMoveDecorator){
    'use strict';
    Ball.Extend(Entity);

    function Ball(id,pos,velocity){
        Ball._super_.constructor.call(this, id);
        _.assertParam(velocity, 'utils/Vector');
        this.addComponent(new Pos(pos));
        this.addComponent(new Render(Ball.renderCb));
        var move = new Move(velocity);
        move = new FnDecorator(move,new Vector(200,200),-0.00005);
        move = new FrictionMoveDecorator(move,0.999);
        window.move = move;
        this.addComponent(move);
    };

    Ball.renderCb = function(type, graphic){
        graphic.context.beginPath();
        graphic.context.arc(this._pos.x,this._pos.y,10,0,2*Math.PI,false);
        graphic.context.fillStyle = "#f55";
        graphic.context.fill();
    };

    return Ball;
});