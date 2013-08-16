define(['smashball/Base','utils/_Pubsub','smashball'],function(Base,_Pubsub, smashball){
    var eventbus = smashball.eventBus;

    Entity.Extend(Base);

    function Entity(name){
        this.Super();
        this.mixin(new _Pubsub());
        this.name = name;
    };

    Entity.prototype.subscribeGlobal = function(event,fn){
       eventbus.subscribe(event,fn);
    }

    Entity.prototype.publishGlobal = function(event,){

    }

    Entity.prototype.addComponent = function(component){
        component.addEntity(this);
    }



    return Entity;

});