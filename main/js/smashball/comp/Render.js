define(['smashball/comp/Component'],function(Component){
    Rendable.Extend(Component);

    function Rendable(){
        this.Super();
    }
    Rendable.prototype.addSubscriptions = function() {
      var x = 30, y = 30;
      this.entity.subscribeGlobal('gameloop/render', function(type, graphic){

        graphic.context.beginPath();
        graphic.context.arc(x, y, 13, 0, 2 * Math.PI, false);
        graphic.context.fillStyle = "#0ff";

        graphic.context.fill();
      });


    }
    return Rendable;

});
