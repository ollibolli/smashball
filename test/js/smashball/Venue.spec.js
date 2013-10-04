define([
    'sinon',
    'chai',
    'smashball/Entity',
    'smashball/Graphic',
    'smashball/Venue',
    'utils/_'
],function(
    sinon,
    chai,
    Entity,
    Graphic,
    Venue,
    _
){
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Venue',function(){
        describe('Venue(graphic)',function(){

            it('should throw error if parameter is not instance of [smashball/Graphic]',function(){

                var graphic = new Graphic();
                var v;
                expect(function() {
                    v = new Venue();
                }).to.throws();

                expect(function() {
                    v = new Venue({});
                }).to.throws();

                expect(function() {
                    v = new Venue(graphic);
                }).not.to.throws();
            });
            it('should have a entityPool propertie of type Object "{}" ', function() {
                var v = new Venue(new Graphic());
                expect(typeof v._entityPool).equals(typeof {});
            });
        });
        describe('addEntity(entity) ,getEntity(entity)',function(){

            it('should throw error if parameter is not instance of [smashball/Entity]', function(){
                var v,
                    e;
                e = new Entity('test-name');

                expect(function() {
                    v = new Venue(new Graphic())
                    v.addEntity({});
                }).to.throw();

                expect(function() {
                    v = new Venue(new Graphic())
                    v.addEntity(e)
                }).to.not.throw();
            });

            it('should add the entity to a pool', function() {
                var v,
                    e;
                e = new Entity('test-name');
                v = new Venue(new Graphic());
                v.addEntity(e);
                expect(v._entityPool[e._id]).to.equals(e);
            });
        });
        describe.skip('removeEntityById()',function(){
            it('_',function(){

            });
        });
        describe.skip('setScene(scene)',function(){
            it('_',function(){

            });
        });
        describe.skip('initScene()',function(){
            it('',function(){

            });
        });
        describe.skip('resetScene()',function(){
            it('_',function(){

            });
        });
        describe('addToStage([smashball/Entity])', function(){
            it('should activate the subscriptions for entity', function(){
                var venue = new Venue(new Graphic());
                var entity = new Entity('name');
                sinon.spy(entity, 'componentsSubscriptions');
                venue.addEntity(entity);
                venue.addToStage(entity);
                expect(entity.componentsSubscriptions.called).to.be.ok;
            });
        });
        describe('isOnStage(entity)',function(){
            it('should check if entity is on stage',function(){
                var venue = new Venue(new Graphic());
                var entity = new Entity('name');
                expect(venue.isOnStage(entity)).not.to.be.ok;
                venue.addEntity(entity);
                expect(venue.isOnStage(entity)).not.to.be.ok;
                venue.addToStage(entity);
                expect(venue.isOnStage(entity)).to.be.ok;

            });
        });
        describe('removeFromStage([smashball/Entity])',function(){
            it('should remove the entitiy subscriptions by calling entity.removeSubscriptions',function(){
                var venue = new Venue(new Graphic());
                var entity = new Entity('name');
                sinon.spy(entity, 'removeComponentsSubscriptions');
                venue.addEntity(entity);
                venue.addToStage(entity);
                venue.removeFromStage(entity);
                expect(entity.removeComponentsSubscriptions.called).to.be.ok;

            });
        });
        describe('removeEntity(Entity)',function(){
            it('should remove the entity from stage by deleting the events subscription and remove from pool',function(){
                var venue = new Venue(new Graphic());
                var entity = new Entity('backara');
                sinon.spy(entity, 'removeComponentsSubscriptions');
                venue.addEntity(entity);
                venue.addToStage(entity);
                venue.removeEntity(entity);

                expect(entity.removeComponentsSubscriptions.called).to.be.ok;
                console.log(venue._entityPool);
                expect(_.contains(venue._entityPool, entity)).not.to.be.ok;

            });
        });
    });
});
