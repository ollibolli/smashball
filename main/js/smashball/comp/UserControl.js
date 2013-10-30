define(['smashball/comp/Component'],function(Component){
    'use strict';

    UserControl.Extend(Component);

    function UserControl(keyEventCb){
        UserControl._super_.constructor.call(this);
        this._keyEventCb = keyEventCb;
    };

    /* override */
    UserControl.prototype.addSubscriptions = function(){
        this._entity.subscribeGlobal('keyboard/keydown',this._keyEventCb);
    };

    return UserControl;
});