define(['utils/_',
    'sb/Base',
    'smashball',
    'utils/util'
],function(_, Base, smashball, util){
    var eventBus = smashball.eventBus;

    Entity.Extend(Base);

    function Entity(id, pubsub){
        _.assertParam(id,'String');
        Base.call(this);
        this._id = id;
        this._components = {};
        this._venue = null;
        this._subscriptions = {};
    };

    Entity.prototype.addComponent = function(component){
        _.assertParam(component,'sb/comp/Component');
        this._components[util.getNameOf(component)] = component;
        component.setEntity(this);
    };

    Entity.prototype.getComponents = function(){
        return this._components
    };

    Entity.prototype.getComponent = function(name){
        var component = this._components[name];
        if (component) {
            return component;
        } else {
            throw new Error('[Entity.getComponent] missing requested component '+ name);
        }
    };

    Entity.prototype.removeComponent = function(component){
        _.assertParam(component,'sb/comp/Component');
        component.removeSubscriptions();
    };

    Entity.prototype.subscribe = function(topic, callback){
        this._subscriptions[topic] = callback;
    };

    Entity.prototype.unsubscribe = function(topic){
        delete this._subscriptions[topic];
        eventBus.unsubscribe(this._subscriptions[topic])
    };

    Entity.prototype.activateSubs = function(){
        for (var topic in this._subscriptions){
            eventBus.subscribe(topic , this._subscriptions[topic]);
        }
    };

    Entity.prototype.deactivateSubs = function(){
        for (var topic in this._subscriptions){
            eventBus.unsubscribe(this._subscriptions[topic]);
        }
    };

    Entity.prototype.publish = function(topic, data){
        eventBus.publish(topic, data);
    };

//    Entity.prototype.setVenue = function (venue){
//        this._venue=venue;
//    }

    Entity.prototype.getId = function (){
        return this._id;
    };


    return Entity;
});
