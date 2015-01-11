define([
    'sb/Entity',
    'sb/comp/Render'
],function(Entity,Render){
    'use strict';

    var opponent = new Entity('opponent');

    opponent.addComponent(new Render(function(type, graphic){
        graphic.context.beginPath();
        graphic.context.rect(600, 230, 100, 40);
        graphic.context.fillStyle = "#0f0";
        graphic.context.fill();
    }));

    return opponent;
});