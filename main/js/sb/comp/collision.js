define([
    'sb/comp/Component',
    'utils/Vector'
],function(Component, Vector){
    'use strict';
    Collision.Extend(Component);

    function Collision(elasticity){
        Collision._super_.constructor.call(this);
        this.mass = 10;
        this.radius = 10;
        this.elasticity = elasticity;
    };

    Collision.prototype.setEntity = function(entity){
        Collision._super_.setEntity.call(this,entity);
    };

    Collision.prototype.collide = function(collisionComponent) {
        var self = {};
        self.mass = this.mass;
        self.radius = this.radius;
        self.elasticity = this.elasticity;
        var selfPos = this.getEntityComponent('Pos').getPos();
        self.position = new Vector(selfPos.x, selfPos.y );
        var selfVel = this.getEntityComponent('Move').getVelocity();
        self.velocity = new Vector(selfVel.x, selfVel.y );

        var obj = {};
        obj.mass = collisionComponent.mass;
        obj.radius = collisionComponent.radius;
        obj.elasticity = collisionComponent.elasticity;
        var objPos = collisionComponent.getEntityComponent('Pos').getPos();
        obj.position = new Vector(objPos.x, objPos.y );
        var objVel = collisionComponent.getEntityComponent('Move').getVelocity();
        obj.velocity = new Vector(objVel.x, objVel.y );

        var deltaTangental, mT, v1, v2, elacticy, sumOfMass,
            deltaVector = new Vector(self.position.x - obj.position.x, self.position.y - obj.position.y),
            sumOfRadie = self.radius + obj.radius, // sum of radii
            deltaVLength = deltaVector.length(); // pre-normalized magnitude

        if (deltaVLength > sumOfRadie) {
            return; // no collision
        }

        // sum the masses, normalize the collision vector and get its tangential
        sumOfMass = self.mass + obj.mass;
        deltaVector.normalize();
        deltaTangental = new Vector(deltaVector.y, -deltaVector.x);

        // avoid double collisions by "un-deforming" balls (larger mass == less tx)
        // self is susceptible to rounding errors, "jiggle" behavior and anti-gravity
        // suspension of the object get into a strange state
        mT = deltaVector.multiply(self.radius + obj.radius - deltaVLength);
        self.position.tx(mT.multiply(obj.mass / sumOfMass));
        obj.position.tx(mT.multiply(-self.mass / sumOfMass));

        // self interaction is strange, as the CR describes more than just
        // the ball's bounce properties, it describes the level of conservation
        // observed in a collision and to be "true" needs to describe, rigidity,
        // elasticity, level of energy lost to deformation or adhesion, and crazy
        // values (such as cr > 1 or cr < 0) for stange edge cases obviously not
        // handled here (see: http://en.wikipedia.org/wiki/Coefficient_of_restitution)
        // for now assume the ball with the least amount of elasticity describes the
        // collision as a whole:
        elacticy = Math.min(self.elasticity, obj.elasticity);

        // cache the magnitude of the applicable component of the relevant velocity
        v1 = deltaVector.multiply(self.velocity.dot(deltaVector)).length();
        v2 = deltaVector.multiply(obj.velocity.dot(deltaVector)).length();

        // maintain the unapplicatble component of the relevant velocity
        // then apply the formula for inelastic collisions
        self.velocity = deltaTangental.multiply(self.velocity.dot(deltaTangental));
        self.velocity.tx(deltaVector.multiply((elacticy * obj.mass * (v2 - v1) + self.mass * v1 + obj.mass * v2) / sumOfMass));

        // do self once for each object, since we are assuming collide will be called
        // only once per "frame" and its also more effiecient for calculation cacheing
        // purposes
        obj.velocity = deltaTangental.multiply(obj.velocity.dot(deltaTangental));
        obj.velocity.tx(deltaVector.multiply(-(elacticy * self.mass * (v1 - v2) + obj.mass * v2 + self.mass * v1) / sumOfMass));

        collisionComponent.getEntityComponent('Move').setVelocity(obj.velocity);
        this.getEntityComponent('Move').setVelocity(self.velocity);
        console.log('[Collision.collide] this', this.getEntity().getId());
        console.log('[Collision.collide] obj', collisionComponent.getEntity().getId());
    };

    return Collision;
});