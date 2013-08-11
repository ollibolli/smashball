define(['smashball/Gameloop','smashball/keyboard','lib/pubsub'], function(Gameloop,keyboard,pubsub){
    var gameloop = new Gameloop();
    gameloop.setFrameRate(2);

    /* subscribe to gametick event */

    printGametickEvents();

    toggleStartStop(keyboard.P);


    function printGametickEvents(){
        var gametick = 0;
        pubsub.subscribe('gameloop/gameTick',function(ev,data){
            document.getElementsByTagName('body')[0].innerHTML = 'Event : '+ ev +' Data : '+JSON.stringify(data)+' GameTick: '+ gametick;
            gametick++;
        });
    }

    function toggleStartStop(key) {
        var firstCallback = true;
        var eventExecute = function(event,data) {
            if (data.keyCode === key) {
                if (firstCallback) {
                    gameloop.start();
                    firstCallback = false;
                } else {
                    gameloop.stop();
                    firstCallback = true;
                }
            }
        };
        pubsub.subscribe('keyboard/keyup', eventExecute);
    };

});