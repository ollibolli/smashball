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

        pubsub.subscribe('keyboard/keyup', eventExecute);

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