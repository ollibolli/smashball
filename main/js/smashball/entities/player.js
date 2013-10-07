define([
    'smashball/Entity',
    'smashball/comp/Render',
    'smashball/comp/UserControl',
    'smashball/keyboard',
    'utils/Vector'
],function(Entity, Render, UserControl, keyboard, Vector){
    'use strict';

    var player = new Entity('player');

    player.addComponent(new Render(renderEventCb.bind(player)));

    player.addComponent(new UserControl(keyEventCb.bind(player)));

    function keyEventCb(type, keyEvent){
        if (keyEvent.keyCode == keyboard.SPACE){
            this.publishGlobal('player/fireball', { pos : new Vector(100,250), velocity : new Vector(Math.random()*5+1,Math.random()*2-1)});
        };
    };

    function renderEventCb(type, graphic){
        graphic.context.beginPath();
        graphic.context.rect(0, 230, 100, 40);
        graphic.context.fillStyle = "#f00";
        graphic.context.fill();
    }

    return player;
});