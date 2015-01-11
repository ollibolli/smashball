define(['utils/_','sb/Base'],function(_, Base){
    'use strict';
    Venue.Extend(Base);

    /**
     * Define the enviromental places for the entities
     * @param graphic [sb/Graphic]
     */
    function Venue(graphic, eventHandler){
        Base.prototype.constructor.call(this);
        _.assertParam(graphic,'sb/Graphic');
        this._entityPool = {};
        this._graphic = graphic;
        this._onStage = {};
    };

    /**
     * Add entity to the Venue
     * @param entity [sb/Entity]
     * @return id [Number]
     */
    Venue.prototype.addEntity = function(entity){
        _.assertParam(entity, 'sb/Entity');
        this._entityPool[entity._id] = entity;
    };

    /**
     * Remove entity from the Venue
     * @param entity [sb/Entity]
     * @return id [Number]
     */
    Venue.prototype.removeEntity = function(entity){
        if (this.isOnStage(entity)){
            this.removeFromStage(entity);
        }
        this._entityPool = _.omit(this._entityPool, entity.getId());
    };

    /**
     * Remove entity from the Venue
     * @param id [Number] the id returned by addEntity
     */
    Venue.prototype.removeEntityById = function(id){
        return null;
    };

    /**
     *
     * @param {sb/Entity} entity
     */
    Venue.prototype.addToStage = function(entity){
        _.assertParam(entity, 'sb/Entity');
        entity.activateSubs();
        this._onStage[entity._id] = entity;
    };

    Venue.prototype.isOnStage = function(entity){
        return _.contains(this._onStage,entity);
    };

    Venue.prototype.removeFromStage = function(entity){
        entity.deactivateSubs();
    };

    Venue.prototype.getEntitiesByName = function(name){
        return null;
    };

    Venue.prototype.getEntitiesByComponent = function(Component){
        var entities = [];
        for (var i in this._entityPool){
            var item = this._entityPool[i];
            if (item.getComponents()[Component]){
                entities.push(item);
            }
        }
        return entities;
    };

    Venue.prototype.getEntityById = function(id){
        return null;
    };

    /**
     * Set the current active scene
     * A scene is a defined set of entities with start values. Then it is up to the players
     * to play the scene.
     * @param scene [smachball/Scene]
     */
    Venue.prototype.setScene = function (scene){
        this._scene = scene;
    };

    Venue.prototype.initScene = function(){
        if (!this._scene){
            throw new Error('Venue.initScene not possible due to missing scene');
        }
        this._scene.init(this);
    };

    Venue.prototype.resetScene = function(){
    };

    Venue.prototype.getGraphic = function(){
         return this._graphic;
    }

    return Venue
});
