define([
    'sb/Base',
    'utils/_',
    'smashball'
],function(Base,_,smashball){
    'use strict';

    Component.Extend(Base);

    function Component(){
        Base.call(this);
        this._entity = null;
        this._tokens = {};
    }

    /**
     * @param entity
     */
    Component.prototype.setEntity = function(entity){
        _.assertParam(entity,'sb/Entity');
        this.hasEntityDependencies(entity);
        this._entity = entity || null;
    };

    Component.prototype.getEntity = function(){
        return this._entity;
    };

    Component.prototype.getEntityComponent = function(name){
        return this._entity.getComponent(name);
    };

    /**
     * Check that entity have the dependent components are added.
     * @param entity
     */
    Component.prototype.hasEntityDependencies = function(entity){
        _.assertParam(entity,'sb/Entity');
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
