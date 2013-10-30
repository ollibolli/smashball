define([
    'utils/_',
    'smashball/comp/Move',
    'smashball/Base'
],function(_, Move, Base){
    'use strict';
    MoveDecorator.Extend(Move);

    function MoveDecorator(move){
        _.assertParam(move,'smashball/comp/Move',this);
        this._subject = move;
    };

    /*override*/
    MoveDecorator.prototype.addSubscriptions = function(){
        return this._subject.addSubscriptions();
    };
    /*override*/
    MoveDecorator.prototype.removeSubscriptions = function(){
        return this._subject.removeSubscriptions();
    };

    /*override*/
    MoveDecorator.prototype.setVelocity = function(vector){
        return this._subject.setVelocity(vector);
    };

    /*override*/
    MoveDecorator.prototype.getVelocity = function(){
        return this._subject.getVelocity();
    };

    /*override*/
    MoveDecorator.prototype.onGameloopGameTick = function(type,data){
        return this._subject.onGameloopGameTick(type,data);
    };

    /*override*/
    MoveDecorator.prototype.setEntity = function(entity){
        return this._subject.setEntity(entity);
    };

    /*override*/
    MoveDecorator.prototype.getEntity = function(){
        return this._subject.getEntity();
    };

    /*override*/
    MoveDecorator.prototype.setSubject = function(entity){
        return this._subject.setEntity(entity);
    };

    /*override*/
    MoveDecorator.prototype.getSubject = function(){
        return this._subject.getEntity();
    };


    MoveDecorator.prototype.removeDecorator = function(decorator){
        if (this._subject == null) {
            return;
        } else if (this._subject === decorator) {
            this._subject = this._subject.getSubject();
        } else {
            this._subject = this._subject.removeDecorator(decorator);
        }
    };

    return MoveDecorator;


});