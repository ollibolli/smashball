require.config({

});

define([
    'sb/Gameloop'
    ,'sb/keyboard'
    ,'smashball'
    ,'sb/Entity'
    ,'sb/comp/Pos'
    ,'sb/comp/Render'
    ,'utils/Vector'
    ,'sb/Venue'
    ,'sb/Graphic'
    ,'sb/Scene'
    ,'sb/entities/player'
    ,'sb/scenes/basicScene'
    ,'sb/entities/Ball'
    ,'sb/entities/board'
    ,'sb/CollisionConsequence'

], function(
    Gameloop
    ,keyboard
    ,smashball
    ,Entity
    ,Pos
    ,Render
    ,Vector
    ,Venue
    ,Graphic
    ,Scene
    ,player
    ,basicScene
    ,Ball
    ,board
    ,CollitionConcequence
    ){
    var eventBus = smashball.eventBus;
    /* subscribe to gametick event */
    printGametickEvents();
    toggleStartStop(keyboard.P);
    e1 = new Entity('olle');
    e1.addComponent(new Render(function(){}));
    e1.addComponent(new Pos(new Vector(10,12)));

    function printGametickEvents(){

        var gametick = 0;

        eventBus.subscribe('gameloop/gameTick',function(ev,data){
            document.getElementById('diven').innerHTML = 'Event : '+ ev +' Data : '+JSON.stringify(data)+' GameTick: '+ gametick;
            gametick++;
        });
        var render = 0;
        eventBus.subscribe('gameloop/render',function(ev,data){
            render++;
            if (render%100 > 50){
                document.getElementById('diven2').innerHTML = '<p>GOOOOO</p>';
            } else {
                document.getElementById('diven2').innerHTML = '<p>NOOOOO</p>';
            }
        });
    }

    function toggleStartStop(key) {

        var element = document.getElementById('board');
        var venue = new Venue(Graphic.factory('canvas2d',element, 400, 400));

        venue.getGraphic().background = "#eeeeee";
        //move to a scene//
        venue.addEntity(player);
        venue.addToStage(player);
//    venue.addEntity(opponent);
//    venue.addToStage(opponent);
        venue.addEntity(board);
        venue.addToStage(board);

        //move to game logic
        var ballIndex= 0;
        var ball = new Ball('ballRed',new Vector(230,170),new Vector(0,1), 256, 0, 0);
        venue.addEntity(ball);
        venue.addToStage(ball);
        var ball = new Ball('ballGreen',new Vector(235,230),new Vector(0,-1), 0, 256, 0);
        venue.addEntity(ball);
        venue.addToStage(ball);

        smashball.eventBus.subscribe('player/fireball',function(type,options){
            var ball = new Ball('ball'+ballIndex,options.pos,options.velocity.multiply(3));
            ballIndex++;
            venue.addEntity(ball);
            venue.addToStage(ball);
        });

        smashball.eventBus.subscribe('pos/outsideBoundery',function(type,entity){
            venue.removeEntity(entity);
        });

        var collDect = new CollitionConcequence(venue);

        var gameloop = new Gameloop();
        venue.setScene(basicScene);
        gameloop.setVenue(venue);
        gameloop.setFrameRate(25);
        gameloop.start();


        eventBus.subscribe('keyboard/keyup', eventExecute);

        var toggle = true;
        function eventExecute(event,data) {
            if (data.keyCode === key) {
                if (toggle) {
                    gameloop.start();
                    venue.initScene();
                    toggle = false;
                } else {
                    gameloop.stop();
                    toggle = true;
                }
            }
        };
    };

});