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

    e2 = new Entity('gustaf');


    function printGametickEvents(){
        var gametick = 0;
        eventBus.subscribe('gameloop/gameTick',function(ev,data){
            document.getElementsByTagName('body')[0].innerHTML = 'Event : '+ ev +' Data : '+JSON.stringify(data)+' GameTick: '+ gametick;
            gametick++;
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