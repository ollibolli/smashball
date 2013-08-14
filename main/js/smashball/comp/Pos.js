define(['smashball/comp/Component'],function(Component){
    Pos.Extend(Component);

    function Pos(){
        this.pos = {}
        this.x = 1;
        this.y = 1;
    }

    /*override*/
    Pos.prototype.subscribeEntity = function(entity){

    }

    Pos.prototype.subscribeGlobal = function(eventBus){
        eventBus.subscribe('gameloop/gameTick', this.doGametick.bind(this))
    }

    Pos.prototype.doGametick = function(evt,data){
        console.log('Pos,doGametick');
        this.entity.publish('pos/newPos',{x:this.x++ ,y:this.y++})
    };

    Pos.prototype.renderMe = function(){
        console.log('renderMe : Pos x:'+ this.pos.x + ' y:'+this.pos.y);
    }
    return Pos;
});