define([
    'smashball/Base'
],function(Base){
    'use strict';
    Vector.Extend(Base);

    function Vector(x,y){
        Base.prototype.constructor.call(this);
        this.x = x;
        this.y = y;
    };

    Vector.prototype.dot = function (v) {
      return this.x * v.x + this.y * v.y;
    };

    Vector.prototype.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    Vector.prototype.length2 = function() {
      return this.x * this.x + this.y * this.y ;
    };

    Vector.prototype.normalize = function() {
      var s = 1 / this.length();
      this.x *= s;
      this.y *= s;
      return this;
    };

    Vector.prototype.multiply = function(s) {
      this.x *= s;
      this.y *= s;
      return this;
    };

    Vector.prototype.tx = function(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };

    Vector.prototype.subTx = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };

    return Vector;
});