define(['smashball/Base','utils/_Pubsub','smashball'],function(Base,pubsub, smashball){

    Entity.Extend(Base);

    function Entity(name){
        this.Super();
        this.mixin(new pubsub());
        this.name = name;
    };

    Entity.prototype.addComponent = function(component){
        component.addEntity(this);
        component.subscribeEntity();
        component.subscribeGlobal(smashball.eventBus);
    }

    return Entity;

});