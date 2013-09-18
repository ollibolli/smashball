define(['smashball/comp/Component','utils/_'],function(Component,_){
    Render.Extend(Component);

    function Render(renderFn){
       // _.assertParam('Function');
        this._renderFn = renderFn;
        this.Super();
    }

    Render.prototype.addSubscriptions = function() {
      var x = 30, y = 30;
      this.entity.subscribeGlobal('gameloop/render', this._renderFn);
    };

    return Render;

});
