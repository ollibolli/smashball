define(['utils/_',
    'smashball/Base',
    'utils/_Pubsub',
    'smashball',
    'utils/util'
],function(_, Base, _Pubsub, smashball, util){
    var eventbus = smashball.eventBus;

    Entity.Extend(Base);

    function Entity(id){
        _.assertParam(id,'String');
        this.Super();
        this.mixin(new _Pubsub(),true);
        this._id = id;
        this._components = {};
        this._venue = null;
    };

    Entity.prototype.subscribeGlobal = function(event,fn){
       return eventbus.subscribe(event, fn);
    };

    Entity.prototype.unsubscribeGlobal = function( tokenOrFunction ){
       return eventbus.unsubscribe(tokenOrFunction);
    };

    Entity.prototype.publishGlobal = function(event,data){
       return eventbus.publish(event, data);
    };

    Entity.prototype.publishSyncGlobal = function(event,data){
       return eventbus.publishSync(event, data);
    };

    Entity.prototype.addComponent = function(component){
        _.assertParam(component,'smashball/comp/Component');
        this._components[util.getNameOf(component)] = component;
        component.setEntity(this);
    };

    Entity.prototype.getComponents = function(){
        return this._components
    };

    Entity.prototype.removeComponent = function(component){
        _.assertParam(component,'smashball/comp/Component');
        component.removeSubscriptions();
    };

    Entity.prototype.componentsSubscriptions = function(){
        for (var key in this._components){
            this._components[key].addSubscriptions();
        }
    };

    Entity.prototype.removeComponentsSubscriptions = function(){
        for (var key in this._components){
            this._components[key].removeSubscriptions();
        }
    };

//    Entity.prototype.setVenue = function (venue){
//        this._venue=venue;
//    }

    Entity.prototype.getId = function (){
        return this._id;
    };


    return Entity;
});
