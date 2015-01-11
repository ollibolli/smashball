define([
    'sb/Entity',
    'utils/_',
    'sb/comp/Render',
    'sb/comp/Move',
    'sb/comp/Pos',
    'utils/Vector',
    'sb/comp/FnMoveDecorator',
    'sb/comp/FrictionMoveDecorator',
    'sb/comp/Collision'

],function(Entity,_ , Render, Move, Pos, Vector, FnDecorator, FrictionMoveDecorator, Collision){
    'use strict';
    Ball.Extend(Entity);

    function Ball(id,pos,velocity, r, g, b){
        Ball._super_.constructor.call(this, id);
        _.assertParam(velocity, 'utils/Vector');
        this.addComponent(new Pos(pos));
        this.addComponent(new Render(Ball.renderCbFactory(r, g, b)));
        var move = new Move(velocity);
        move = new FnDecorator(move,new Vector(200,200),-0.001);
        move = new FrictionMoveDecorator(move,0.99);
        this.addComponent(move);
        this.addComponent(new Collision(0.7));
    };

    Ball.renderCbFactory = function(r,g,b){
        r = r || Math.floor(Math.random()*100+40);
        g = g ||Math.floor(Math.random()*100+40);
        b = b ||Math.floor(Math.random()*100+40);
        var style = "rgb("+r+","+g+","+b+")";


        return function(type, graphic){
            var pos = this.getEntityComponent('Pos').getPos();
            graphic.context.beginPath();
            graphic.context.arc(pos.x,pos.y,10,0,2*Math.PI,false);
            graphic.context.fillStyle = style;
            graphic.context.fill();
        };

    };
    return Ball;
});