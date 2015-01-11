define(['sb/comp/Component'],function(Component){
    'use strict';

    UserControl.Extend(Component);

    function UserControl(keyEventCb){
        UserControl._super_.constructor.call(this);
        this._keyEventCb = keyEventCb;
    }

    /* override */
    UserControl.prototype.setEntity = function(entity){
        UserControl._super_.setEntity.call(this,entity)
        entity.subscribe('keyboard/keydown',this._keyEventCb.bind(this));
    };

    return UserControl;
});