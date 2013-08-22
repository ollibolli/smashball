<<<<<<< HEAD
define(['smashball/Entity'],function(Entity){
=======
define([
    'smashball/Entity',
    'smashball/Gameloop',
    'smashball',
    'smashball/keyboard',
    'smashball/Venue',
    'smashball/Graphic'
     ],
     function(Entity, Gameloop, smashball, keyboard, Venue, Graphic) {
        var gameloop,
            eventBus,
            venue,
            ball1;
        eventBus = smashball.eventBus;
        eventBus.subscribe('keyboard/keydown', function (type, event) {
            if (event.keyCode === keyboard.P) {
                gameloop.stop();
            }
        });
        eventBus.subscribe('gameloop/gameTick', function() {
            console.log('hej');
        });

        venue = new Venue(Graphic.factory('canvas2d', document.getElementById('venue'), 500, 500));
        ball1 = new Entity('ball1');
        ball1.addComponent(new Rendable())
        venue.addEntity(ball1);


>>>>>>> 05a1207345b2c8a43d15dca5c3323473ece8bd81


        gameloop = new Gameloop();
        gameloop.setFrameRate(2);
        gameloop.start();



});
