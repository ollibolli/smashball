define([
    'smashball/comp/Compoonent'
],function(Component){
    'use strict';
    Collision.Extend(Component);

    function Collision(elasticity,velocity){
      Collision._super_.constructor.call(this);
      this._dependencies = ['smashball/comp/Pos'];
      this._velocity = velocity; // velocity: m/s^2
      this._mass = 10;
      this._radius = 10;
      this._pos = new Vector(0, 0);
      this.elasticity = elasticity;
    };

    /*override*/
    Collision.prototype.addSubscriptions = function(){

    };

    Collision.prototype.collide = function(collisonComponent) {

      var dt, mT, v1, v2, cr, sm,
          dn = new Vector(this.p.x - obj.p.x, this.p.y - obj.p.y),
          sr = this.r + obj.r, // sum of radii
          dx = dn.length(); // pre-normalized magnitude

      if (dx > sr) {
        return; // no collision
      }

      // sum the masses, normalize the collision vector and get its tangential
      sm = this._mass + obj.mass;
      dn.normalize();
      dt = new Vector(dn.y, -dn.x);

      // avoid double collisions by "un-deforming" balls (larger mass == less tx)
      // this is susceptible to rounding errors, "jiggle" behavior and anti-gravity
      // suspension of the object get into a strange state
      mT = dn.multiply(this.r + obj.r - dx);
      this.p.tx(mT.multiply(obj.m / sm));
      obj.p.tx(mT.multiply(-this.m / sm));

      // this interaction is strange, as the CR describes more than just
      // the ball's bounce properties, it describes the level of conservation
      // observed in a collision and to be "true" needs to describe, rigidity,
      // elasticity, level of energy lost to deformation or adhesion, and crazy
      // values (such as cr > 1 or cr < 0) for stange edge cases obviously not
      // handled here (see: http://en.wikipedia.org/wiki/Coefficient_of_restitution)
      // for now assume the ball with the least amount of elasticity describes the
      // collision as a whole:
      cr = Math.min(this.cr, obj.cr);

      // cache the magnitude of the applicable component of the relevant velocity
      v1 = dn.multiply(this.v.dot(dn)).length();
      v2 = dn.multiply(obj.v.dot(dn)).length();

      // maintain the unapplicatble component of the relevant velocity
      // then apply the formula for inelastic collisions
      this.v = dt.multiply(this.v.dot(dt));
      this.v.tx(dn.multiply((cr * obj.m * (v2 - v1) + this.m * v1 + obj.m * v2) / sm));

      // do this once for each object, since we are assuming collide will be called
      // only once per "frame" and its also more effiecient for calculation cacheing
      // purposes
      obj.v = dt.multiply(obj.v.dot(dt));
      obj.v.tx(dn.multiply((cr * this.m * (v1 - v2) + obj.m * v2 + this.m * v1) / sm));
    };

    return Collision;
});