define(['smashball/Base','utils/_Pubsub','smashball'],function(Base, _Pubsub, smashball){
    var eventbus = smashball.eventBus;

    Entity.Extend(Base);

    function Entity(name){
        this.Super();
        this.mixin(new _Pubsub());
        this.name = name;
        this._venue = null;
    };

    Entity.prototype.subscribeGlobal = function(event,fn){
       eventbus.subscribe(event,fn);
    }

    Entity.prototype.unsubscribeGlobal = function( tokenOrFunction ){
       eventbus.unsubscribe(tokenOrFunction);
    }

    Entity.prototype.publishGlobal = function(event,data){
       eventbus.publish(event,data);
    }

    Entity.prototype.publishSyncGlobal = function(event,data){
       eventbus.publishSync(event,data);
    }

    Entity.prototype.addComponent = function(component){
        this.assert(this.instanceOf(component,'smashball/comp/Component'),'Not a smashball/comp/Component');
        component.setEntity(this);
    }

    Entity.prototype.removeComponent = function(component){
        this.assert(this.instanceOf(component,'smashball/comp/Component'),'Not a smashball/comp/Component');
        component.undoSubscriptions();
    }

    Entity.prototype.setVenue = function (venue){
        this._venue=venue;
    }


    return Entity;

});