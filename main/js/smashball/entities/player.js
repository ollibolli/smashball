define([
    'smashball/Entity',
    'smashball/comp/Render',
    'smashball/comp/UserControl',
    'smashball/keyboard',
    'utils/Vector'
],function(Entity, Render, UserControl, keyboard, Vector){
    'use strict';

    var player = new Entity('player');

//    player.addComponent(new Render(renderEventCb.bind(player)));

    player.addComponent(new UserControl(keyEventCb.bind(player)));

    function keyEventCb(type, keyEvent){
        if (keyEvent.keyCode == keyboard.SPACE){
            var rand = Math.random,
                power = 2;
            this.publishGlobal('player/fireball', { pos : new Vector(rand()*400,rand()*400), velocity : new Vector((rand()-0.5)*power,(rand()-0.5)*power)});
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