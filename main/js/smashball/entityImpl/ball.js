define([
    'smashball/Entity',
    'utils/_',
    'smashball/comp/Render',
    'smashball/comp/Move'

],function(Entity,_ , Render, Move){
    'use strict';
    Ball.Extend(Entity);

    function Ball(id){
        this.Super(id);
        var self = this;
        this.addComponent(new Render(function(type, graphic){
            graphic.context.beginPath();
            graphic.context.arc(self.x,self.y,13,0,2*Math.PI,false);
            graphic.context.fillStyle = "#f00";
            graphic.context.fill();
        }));
        this.addComponent(new Move(10));
    };

    Ball.prototype.setOptions = function(options){
       _.extend(this, options);
    };



    return new Ball('ball');
});