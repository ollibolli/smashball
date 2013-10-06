define(['smashball/comp/Component'],function(Component){
    'use strict';
    var UserControl = function UserControl(keyEventCb){
        Component.prototype.constructor.call();
        this._keyEventCb = keyEventCb;
    };

    UserControl.Extend(Component);

    /* override */
    UserControl.prototype.addSubscriptions = function(){
        this._entity.subscribeGlobal('keyboard/keydown',this._keyEventCb);
    };


    return UserControl;
});