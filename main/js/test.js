require([
    'smashball/Entity',
    'smashball/Gameloop',
    'smashball',
    'smashball/keyboard',
    'smashball/Venue',
    'smashball/Graphic',
    'smashball/comp/Render',
    'smashball/entities/player',
    'smashball/entities/opponent',
    'smashball/entities/board',
    'smashball/entities/Ball',
    'utils/Vector'

], function(Entity, Gameloop, smashball, keyboard, Venue, Graphic, Rendable, player, opponent, board, Ball, Vendor) {
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
    var ball1 = new Entity('ball1');
    var render = new Rendable();
    ball1.addComponent(render);
    venue.addEntity(player);
    venue.addToStage(player);
    venue.addEntity(opponent);
    venue.addToStage(opponent);
    venue.addEntity(board);
    venue.addToStage(board);

    //move to game logic
    var ballIndex= 0;
    smashball.eventBus.subscribe('player/fireball',function(type,options){
        var ball = new Ball('ball'+ballIndex);
        ball.setOptions(options);
        ballIndex++;
        venue.addEntity(ball);
        venue.addToStage(ball);
    });

    smashball.eventBus.subscribe('pos/outsideBoundery',function(type,entity){
        venue.removeEntity(entity);
    });

    gameloop = new Gameloop();
    gameloop.setVenue(venue);
    gameloop.setFrameRate(60);
    gameloop.start();

});

