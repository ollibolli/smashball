define(['lib/pubsub','smashball/Base'],function(pubSub, Base){


	function Gameloop(){
        this.Super(this);
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

    Gameloop.Include(pubSub);


    Gameloop.Extend(Base, {
		setFrameRate : function setFrameRate(rate){
			this._fps =  rate;
			this._skipTicks = 1000 / this._fps;
		},
		getFrameRate : function getFrameRate(){
			return this._fps;	
		},
		start : function start(){
	       	var self = this;
			self._startTime = (new Date).getTime();
	       	self._running = true;
	       	self._loops = 0;

			function onframe(){
	//	    	while ((new Date).getTime() > self._startTime && self._loops < self._maxFrameSkip) {	    
		    	while ((new Date).getTime() > self._startTime) {	    
		        	self.publish('gameTick');
		           	self._startTime += self._skipTicks;
		            self._loops++;
		        }
		       	if (self._running){
			        self.publish('render');
					onframe._id = self._requestAnimationFrame.call(window, onframe);
		       	} else {
		       		self._cancelRequestAnimationFrame.call(window,onframe._id);
		       	}
			};
			self._onFrame = onframe;
			onframe();
		},
		stop : function stop(){
			this._running = false;
		}
	});
	

	return Gameloop;
});
