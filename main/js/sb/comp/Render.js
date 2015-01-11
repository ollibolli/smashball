define([
    'sb/comp/Component',
    'utils/_',
    'utils/Vector'
],function(Component,_, Vector){
    'use strict';

    Render.Extend(Component);

    function Render(renderFn){
        _.assert(typeof renderFn === 'function');
        Render._super_.constructor.call(this);
        this._renderEventCb = renderFn;
        this._pos = new Vector(0,0);
    }

    /* overrride */
    Render.prototype.setEntity = function(entity){
        Render._super_.setEntity.call(this, entity);
        entity.subscribe('gameloop/render', this._renderEventCb.bind(this));
    };

    return Render;

});
