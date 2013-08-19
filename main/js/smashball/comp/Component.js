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
        this.doSubscriptions();
    };

    /**
     * Override this function
     * Here is a good place to add subscriptions
     */
    Component.prototype.doSubscriptions = function(){
        return null;
    }

    /**
     * Override this function
     * Here is a good place to remove subscriptions
     */
    Component.prototype.undoSubscriptions = function(){
        return null;
    }

    return Component;
});