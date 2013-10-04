define(['utils/_','smashball/Base'],function(_, Base){
    'use strict';
    Venue.Extend(Base);

    /**
     * Define the enviromental places for the entities
     * @param graphic [smashball/Graphic]
     */
    function Venue(graphic){
        _.assertParam(graphic,'smashball/Graphic');
        this.Super();
        this._entityPool = [];
        this._graphic = graphic;
        this._onStage = [];
    };

    /**
     * Add entity to the Venue
     * @param entity [smashball/Entity]
     * @return id [Number]
     */
    Venue.prototype.addEntity = function(entity){
        _.assertParam(entity, 'smashball/Entity');
        this._entityPool[entity._id] = entity;
    };

    /**
     * Remove entity from the Venue
     * @param entity [smashball/Entity]
     * @return id [Number]
     */
    Venue.prototype.removeEntity = function(entity){
        entity.removeComponentsSubscriptions();
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
     * @param entity
     */
    Venue.prototype.addToStage = function(entity){
        _.assertParam(entity, 'smashball/Entity');
        entity.componentsSubscriptions();
        this._onStage.push(entity);
    };

    Venue.prototype.isOnStage = function(entity){
        return _.contains(this._onStage,entity);
    }

    Venue.prototype.removeFromStage = function(entity){
        entity.removeComponentsSubscriptions();
    };

    Venue.prototype.getEntitiesByName = function(name){
        return null;
    };

    Venue.prototype.getEntitiesByComponent = function(Component){
        return null;
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
        this._scene.init(this);
    };

    Venue.prototype.resetScene = function(){
    };

    Venue.prototype.getGraphic = function(){
         return this._graphic;
    }

    return Venue
});
