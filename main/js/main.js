require.config({

});


define([
    'smashball/Gameloop'
    ,'smashball/keyboard'
    ,'smashball'
    ,'smashball/Entity'
    ,'smashball/comp/Pos'
    ,'smashball/comp/Render'
], function(
    Gameloop
    ,keyboard
    ,smashball
    ,Entity
    ,Pos
    ,Render
){
    var eventBus = smashball.eventBus;
    var gameloop = new Gameloop();
    gameloop.setFrameRate(2);

    /* subscribe to gametick event */
    printGametickEvents();
    toggleStartStop(keyboard.P);

    e1 = new Entity('olle');
    e1.addComponent(new Render());
    e1.addComponent(new Pos());

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

        eventBus.subscribe('keyboard/keyup', eventExecute);

        var toggle = true;
        function eventExecute(event,data) {
            if (data.keyCode === key) {
                if (toggle) {
                    gameloop.start();
                    toggle = false;
                } else {
                    gameloop.stop();
                    toggle = true;
                }
            }
        };
    };

});