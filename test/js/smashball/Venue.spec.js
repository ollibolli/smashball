define([
    'sinon',
    'chai',
    'smashball/Entity',
    'smashball/Graphic',
    'smashball/Venue'
],function(
    sinon,
    chai,
    Entity,
    Graphic,
    Venue
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
                }).to.throw();

                expect(function() {
                    v = new Venue({});
                }).to.throw();

                expect(function() {
                    v = new Venue(graphic);
                }).not.to.throw();
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
                expect(v._entityPool[e.id]).to.equals(e);
            });
            it('Should activate the entities subscriptions',function(){
                var v,
                    e;
                e = new Entity('test-name');
                e.
                v = new Venue(new Graphic());
                v.addEntity(e);
                expect(v).to.equals(e);

            });
        });
        describe.skip('removeEntity(entity)',function(){
            it('',function(){

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
        describe('addToStage([smashball/Entity])',function(){
            it('should activate the subscriptions for entity',function(){
                var venue = new Venue(new Graphic());
                var entity = new Entity('name');
                entity.subs
                venue.addEntity(entity);
                venue.addToStage(entity);
                expect()
            });
        })
    });
});
