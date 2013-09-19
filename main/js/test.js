require([
        'smashball/Entity',
        'smashball/Gameloop',
        'smashball',
        'smashball/keyboard',
        'smashball/Venue',
        'smashball/Graphic',
        'smashball/comp/Render',
        'smashball/entityImpl/player',
        'smashball/entityImpl/opponent',
        'smashball/entityImpl/board',
        'smashball/entityImpl/Ball'

    ], function(Entity, Gameloop, smashball, keyboard, Venue, Graphic, Rendable, player, opponent, board, ball) {
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

        venue = new Venue(Graphic.factory('canvas2d', document.getElementById('venue'), 700, 500));

        //move to a scene//
//        var ball1 = new Entity('ball1');
//        var render = new Rendable();
//        ball1.addComponent(render);
        venue.addEntity(player);
        venue.addToStage(player);
        venue.addEntity(opponent);
        venue.addToStage(opponent);
        venue.addEntity(board);
        venue.addToStage(board);

        //move to game logic
        smashball.eventBus.subscribe('player/fireball',function(type,options){
            ball.setOptions(options);
            venue.addEntity(ball);
            venue.addToStage(ball);
        });


        gameloop = new Gameloop();
        gameloop.setVenue(venue);
        gameloop.setFrameRate(20);
        gameloop.start();

});

