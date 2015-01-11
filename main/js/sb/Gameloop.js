/* Pubsub is the global event handler for the system */
//TODO pass venue instead of graphic to gameloop

define([
    'smashball',
    'sb/Base',
    'utils/_'
],function(smashball, Base, _){

    var eventBus = smashball.eventBus;

    function GameLoop(){
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

    GameLoop.Extend(Base);

    GameLoop.prototype.setFrameRate = function setFrameRate(rate){
        this._fps =  rate;
        this._skipTicks = 1000 / this._fps;
    };

    GameLoop.prototype.getFrameRate = function getFrameRate(){
        return this._fps;
    };

    GameLoop.prototype.start = function start(){
        var self = this;
        self._startTime = (new Date).getTime();
        self._running = true;
        self._loops = 0;


        function onFrame(){
            while ((new Date).getTime() > self._startTime) {
                eventBus.publish('gameloop/gameTick');
                self._startTime += self._skipTicks;
                self._loops++;
            }

            if (self._running){
                self.getVenue().getGraphic().clear();
                eventBus.publishSync('gameloop/render', self.getVenue().getGraphic());
                onFrame._id = self._requestAnimationFrame.call(window, onFrame);
            } else {
                self._cancelRequestAnimationFrame.call(window,onFrame._id);
            }
        };
        self._onFrame = onFrame;
        onFrame();
    };

    GameLoop.prototype.stop = function stop(){
        this._running = false;
    };

    GameLoop.prototype.setVenue = function(venue) {
        _.assertParam(venue,'sb/Venue');
        this._venue = venue;
    };
    GameLoop.prototype.getVenue = function() {
        if (!this._venue) throw new Error('Graphic on Gameloop not set');
        return this._venue
    };

    return GameLoop;
});
