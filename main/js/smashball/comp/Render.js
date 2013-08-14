define(['smashball/comp/Component'],function(Component){
    Render.Extend(Component);

    function Render(){
        this.pos = {}
    }

    /*override*/
    Render.prototype.subscribeEntity = function(entity){
        this.entity.subscribe('pos/newPos', this.updatePos)
    }

    Render.prototype.subscribeGlobal = function(){
        this.entity.subscribe('gameloop/render', this.renderMe)
    }

    Render.prototype.updatePos = function(ev,data){
       console.log('updatePos', ev ,data);
    };

    Render.prototype.renderMe = function(){
        console.log('renderMe : Pos x:'+ this.pos.x + ' y:'+this.pos.y);
    }
    return Render;

});