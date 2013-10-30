define([
    'smashball/Base',
    'utils/_'
],function(Base,_){
    Component.Extend(Base);

    function Component(){
        Component._super_.constructor.call(this);
        this._entity = null;
        this._dependencies = [];
        this._tokens = {};
    }

    /**
     * @param entity
     */
    Component.prototype.setEntity = function(entity){
        _.assertParam(entity,'smashball/Entity');
        this._entity = entity || null;
    };

    Component.prototype.getEntity = function(){
        return this._entity;
    };

    /**
     * Override this function
     * Here is a good place to add subscriptions
     */
    Component.prototype.addSubscriptions = function(){
        throw 'Not implemented' + arguments.callee;
    };

    /**
     * Override this function
     * Here is a good place to remove subscriptions
     */
    Component.prototype.removeSubscriptions = function(){
        throw 'removeSubscriptions not implemented '; //TODO check which component not implemented
    };

    /**
     * Check that entity have the dependent components are added.
     * @param entity
     */
    Component.prototype.hasEntityDependencies = function(entity){
        _.assertParam(entity,'smashball/Entity');
        for (var i in this._dependencies){
            var dependency = this._dependencies[i];
            var result = false;
            for (var key in entity.getComponents()){
                var comp = entity.getComponents()[key];
                if (comp.instanceOf(dependency)){
                    result = true;
                    break;
                }
            }
            if (! result){
                return false
            }
        }
        return true;
    };
    
    
    return Component;
});
