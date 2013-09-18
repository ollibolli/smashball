define(['smashball/comp/Component'],function(Component){
    'use strict';
    var UserControl = function UserControl(keyEventCb){
        this.Super();
        this._keyEventCb = keyEventCb;
    };

    UserControl.Extend(Component);

    /* override */
    UserControl.prototype.addSubscriptions = function(){
        this.entity.subscribeGlobal('keyboard/keydown',this._keyEventCb);
    };


    return UserControl;
});