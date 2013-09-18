define([
    'smashball/Entity',
    'smashball/comp/Render'
],function(Entity,Render){
    'use strict';

    var board = new Entity('board');

    board.addComponent(new Render(function(type, graphic){
        graphic.context.beginPath();
        graphic.context.rect(100, 50, 500, 400);
        graphic.context.fillStyle = "#eee";
        graphic.context.fill();
    }));

    return board;
});