define(['smashball/Base'],function(Base){

    Component.Extend(Base);

    function Component(){
        this.Super();
        this.entity = null;
    }

    /**
     * @param entity
     */
    Component.prototype.setEntity = function(entity){
        this.entity = entity || null;
    };

    /**
     * Override this function
     * Here is a good place to add subscriptions
     */
    Component.prototype.addSubscriptions = function(){
        throw 'Not implemented';
    }

    /**
     * Override this function
     * Here is a good place to remove subscriptions
     */
    Component.prototype.removeSubscriptions = function(){
        throw 'Not implemented'; //TODO check which component not implemented
    }

    return Component;
});
