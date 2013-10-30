define([
    'smashball/Entity',
    'smashball/comp/Render'
],function(Entity,Render){
    'use strict';

    var board = new Entity('board');

    board.addComponent(new Render(function(type, graphic){
        graphic.context.beginPath();
        graphic.context.rect(0, 0, 400, 400);
        graphic.context.fillStyle = "#eee";
        graphic.context.fill();
    }));

    return board;
});