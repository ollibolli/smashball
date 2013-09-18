require([
        'smashball/Entity',
        'smashball/Gameloop',
        'smashball',
        'smashball/keyboard',
        'smashball/Venue',
        'smashball/Graphic',
        'smashball/comp/Rendable'
    ], function(Entity, Gameloop, smashball, keyboard, Venue, Graphic, Rendable) {
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

        //move to a scene//
        ball1 = new Entity('ball1');
        var rendable = new Rendable();
        ball1.addComponent(rendable);
        venue.addEntity(ball1);
        venue.addToStage(ball1);
        gameloop = new Gameloop();
        gameloop.setVenue(venue);
        gameloop.setFrameRate(2);
        gameloop.start();

});

