define(['smashball/Base'],function(Base){

    Venue.Extend(Base);

    /**
     * Define the enviromental places for the entities
     * @param graphic [smashball/Graphic]
     */
    function Venue(graphic){
        this.Super();
        this.assert(this.instanceOf(graphic,'smashball/Graphic'), new TypeError ('Not a smashball/Graphic'));
        this._graphic=graphic;
    };

    /**
     * Add entity to the Venue
     * @param entity [smashball/Entity]
     * @return id [Number]
     */
    Venue.prototype.addEntity = function(entity){
        return 0;
    };

    /**
     * Remove entity from the Venue
     * @param entity [smashball/Entity]
     * @return id [Number]
     */
    Venue.prototype.removeEntity = function(entity){
        return entity;
    };

    /**
     * Remove entity from the Venue
     * @param id [Number] the id returned by addEntity
     */
    Venue.prototype.removeEntityById = function(id){
        return null;
    };

    Venue.prototype.addToScene = function(entity){
        return null;
    };

    Venue.prototype.removeFromScene = function(entity){
        return null;
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


    /**
     * "Static" functions
     */

    return Venue
});