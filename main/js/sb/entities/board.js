define([
    'sb/Entity',
    'sb/comp/Render'
],function(Entity,Render){
    'use strict';

    var board = new Entity('board');

    board.addComponent(new Render(function(type, graphic){
        graphic.context.beginPath();
        graphic.context.arc(200,200,15,0,2*Math.PI,false);
        graphic.context.fillStyle = "#000";
        graphic.context.fill();
    }));

    return board;
});