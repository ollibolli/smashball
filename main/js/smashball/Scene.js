/**
 * A scene is a defined set of entities with start values. Then it is up to the players
 * to play the scene.
 */

define(['smashball/Base'],function(Base){

    Scene.Extend(Base);

    function Scene(){
        this.Super();
    };

    /**
     * Load the scene on this venue
     * @param venue
     */
    Scene.prototype.load = function(venue){
        throw 'Override this [smashball/Scene.load]' ;
    }

    return Scene
});