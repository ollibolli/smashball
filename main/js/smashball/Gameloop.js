/* Pubsub is the global event handler for the system */
//TODO pass venue instead of graphic to gameloop

define([
    'smashball',
    'smashball/Base',
    'utils/_'
],function(smashball, Base, _){

    var eventBus = smashball.eventBus;

    function Gameloop(){
        Base.prototype.constructor.call(this);
        this._fps = 60;
        this._running = false;
        this._loops = 0;
        this._skipTicks = 1000 / this._fps;
        this._maxFrameSkip = 100;
        this._startTime;
        this._requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60);
            };

        this._cancelRequestAnimationFrame = window.cancelRequestAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            function(id) {
                window.clearTimeout(id);
            };
    };

    Gameloop.Extend(Base);

    Gameloop.prototype.setFrameRate = function setFrameRate(rate){
        this._fps =  rate;
        this._skipTicks = 1000 / this._fps;
    };

    Gameloop.prototype.getFrameRate = function getFrameRate(){
        return this._fps;
    };

    Gameloop.prototype.start = function start(){
        var self = this;
        self._startTime = (new Date).getTime();
        self._running = true;
        self._loops = 0;


        function onframe(){
            while ((new Date).getTime() > self._startTime) {
                eventBus.publish('gameloop/gameTick');
                self._startTime += self._skipTicks;
                self._loops++;
            }

            if (self._running){
                self.getVenue().getGraphic().clear();
                eventBus.publishSync('gameloop/render', self.getVenue().getGraphic());
                onframe._id = self._requestAnimationFrame.call(window, onframe);
            } else {
                self._cancelRequestAnimationFrame.call(window,onframe._id);
            }
        };
        self._onFrame = onframe;
        onframe();
    };

    Gameloop.prototype.stop = function stop(){
        this._running = false;
    }

    Gameloop.prototype.setVenue = function(venue) {
        _.assertParam(venue,'smashball/Venue');
        this._venue = venue;
    }
    Gameloop.prototype.getVenue = function() {
        if (!this._venue) throw new Error('Graphic on Gameloop not set');
        return this._venue
    }

    return Gameloop;
});
