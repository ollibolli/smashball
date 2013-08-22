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
            var v,
                e;
            e = new Entity('test-name');

            it('should throw error if parameter is not instance of [smashball/Entity]', function(){

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
                v = new Venue(new Graphic());
                v.addEntity(e);
                expect(v._entityPool[e.id]).to.equals(e);
            });
        });
        describe('removeEntity(entity)',function(){
            it('',function(){

            });
        });
        describe('removeEntityById()',function(){
            it('_',function(){

            });
        });
        describe('setScene(scene)',function(){
            it('_',function(){

            });
        });
        describe('initScene()',function(){
            it('',function(){

            });
        });
        describe('resetScene()',function(){
            it('_',function(){

            });
        });
    });
});
