define([
    'smashball/comp/Component',
    'utils/_',
    'utils/Vector'
],function(Component,_, Vector){
    'use strict';

    Render.Extend(Component);

    function Render(renderFn){
       // _.assertParam('Function');
        this._renderEventCb = renderFn;
        this.Super();
        this._pos = new Vector(0,0);
    }

    /**
     * Add subscriptions, global or within entity
     */
    /*override*/
    Render.prototype.addSubscriptions = function() {
      this._tokens['gameloop/render'] = this._entity.subscribeGlobal('gameloop/render', this._renderEventCb.bind(this));
      this._tokens['pos/posChanged'] = this._entity.subscribe('pos/posChanged',Render.posChangedCb.bind(this));
    };
    /**
     * Add subscriptions, global or within entity
     */
    /*override*/

    Render.prototype.removeSubscriptions = function() {
      if (!this._entity.unsubscribe(this._tokens['pos/posChanged'])){
            throw new Error("[Render] Unable to remove subscription 'pos/posChanged'");
      };
      if (!this._entity.unsubscribeGlobal(this._tokens['gameloop/render'])){
          throw new Error("[Render] Unable to remove subscription 'gameloop/render'");
      };
    };
    Render.posChangedCb = function(type,posVector){
        this._pos = posVector;
      };

    return Render;

});
