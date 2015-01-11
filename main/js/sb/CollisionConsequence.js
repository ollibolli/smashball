define([
    'smashball',
    'sb/base'

],function(smashball,Base){
    'use strict';
    var eventBus = smashball.eventBus;

    CollisionConsequence.Extend(Base);

    function CollisionConsequence(venue){
        this._venue = venue;
        eventBus.subscribe('gameloop/gameTick',this._onGameTick.bind(this));
    };

    CollisionConsequence.prototype._onGameTick = function(){
        var entities = this._venue.getEntitiesByComponent('Collision');
        for (var i = 0; i < entities.length; i++) {
            for (var j = i + 1; j < entities.length; j++) {
                entities[j].getComponent('Collision').collide(entities[i].getComponent('Collision'));
            }
        }
    };


    return CollisionConsequence;
});