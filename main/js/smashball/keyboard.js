define(['smashball'],function(smashball){
    var pubsub = smashball.eventBus;
    var Keyboard = {
        _pressed: {},
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ESC: 27,
        S: 83,
        P: 80,
        R: 82,
        SPACE: 32
    };

    Keyboard.isDown = function(keyCode) {
        return Keyboard._pressed[keyCode];
    };

    Keyboard.onKeydown = function(event) {
        Keyboard._pressed[event.keyCode] = true;
        pubsub.publish('keyboard/keydown',event);

    };
    Keyboard.onKeyup = function(event) {
        delete Keyboard._pressed[event.keyCode];
        pubsub.publish('keyboard/keyup',event);
    };

    attachListener('keyup', Keyboard.onKeyup);
    attachListener('keydown', Keyboard.onKeydown);


    /* browser compatibility */
    function attachListener(event,callback){
        if (window.attachEvent) {
            window.attachEvent('on'+event,callback);
        } else {
            window.addEventListener(event, callback, false);
        }
    }

    function removeListener(event,callback){
        if (window.attachEvent) {
            window.removeEvent('on'+event,callback);
        } else {
            window.removeEventListener(event, callback, false);
        }
    }
/*    Keyboard.executeOnceWhenPressed = function(keycode, callback) {
        var _this = this;
        function cbWrapper(event) {
            if (event.keyCode === keycode) {
                if (callback instanceof Function) {
                    callback.call(_this);
                    removeListener('keyup', cbWrapper, false);
                }
            }
        }

        attachListener('keyup',cbWrapper, false);
    };

    Keyboard.toggleWhenPressed = function(keycode, callback1, callback2) {
        var eventExecute, firstCallback;
        firstCallback = true;
        eventExecute = function(event) {
            if (event.keyCode === keycode) {
                if (firstCallback) {
                    callback1.call(this);
                    firstCallback = false;
                } else {
                    callback2.call(this);
                    firstCallback = true;
                }
            }
        };
        attachListener('keyup', eventExecute);
    };  */

    return Keyboard;
});
