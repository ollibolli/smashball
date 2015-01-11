/**
 * A scene is a defined set of entities with start values. Then it is up to the players
 * to play the scene.
 */

define(['sb/Base'],function(Base){

    Scene.Extend(Base);

    function Scene(){
        Base.prototype.constructor.call(this);
    };

    /**
     * Load the scene on this venue
     * @param venue
     */
    Scene.prototype.load = function(venue){
        throw new Error('Override this [sb/Scene.load]') ;
    }

    return Scene
});