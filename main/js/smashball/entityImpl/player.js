define([
    'smashball/Entity',
    'smashball/comp/Render',
    'smashball/comp/UserControl',
    'smashball/keyboard'

],function(Entity, Render, UserControl, keyboard){
    'use strict';

    var player = new Entity('player');

    player.addComponent(new Render(function(type, graphic){
        graphic.context.beginPath();
        graphic.context.rect(0, 230, 100, 40);
        graphic.context.fillStyle = "#f00";
        graphic.context.fill();
    }));

    player.addComponent(new UserControl(keyCb.bind(player)));

    function keyCb(type, keyEvent){
        if (keyEvent.keyCode == keyboard.SPACE){
            this.publishGlobal('player/fireball',{ x:100, y:250, angle:0, speed: 10 });
        };
    };

    return player;
});