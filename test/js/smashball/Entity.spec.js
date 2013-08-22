define(['smashball/Entity',
    'chai',
    'sinon',
    'utils/_Pubsub',
    'smashball/comp/Component'
],function(
    Entity,
    chai,
    sinon,
    _Pubsub,
    Component
){
    var expect = chai.expect;
    describe('Entity',function(){
        describe('mixin [utils/_Pubsub]',function(){
            it('instance of Entity shall has mixed in [utils/_Pubsub]',function(){
                expect(new Entity('test').hasMixedin(_Pubsub));
            });
        });

        describe.skip('Entity(identifier)',function(){
            it('shall take a [String] as first parameter a identifier',function(){
                 var entity= new Entity('test');
                expect(entity.name).to.equal('test');
            });
        });
        describe('addComponent(component)',function(){
            it('shall take first parameter of type [smashball/comp/Component]', function(){

                expect(function(){
                    var entity = new Entity('test');
                    var component = new Component();
                    entity.addComponent(new Component());
                }).not.throws(Error);

                expect(function(){
                    var entity = new Entity('test');
                    entity.addComponent(new Entity('name'));
                }).throws();
            });
            it.skip('shall add the component to the Entity',function(){

            });
        });

        describe('removeComponent(component)',function(){
            it('shall take a [component] as first parameter of type smashball/Component',function(){
                expect(function(){
                    var entity= new Entity('test');
                    var component =new Component();
                    entity.addComponent(component);
                    entity.removeComponent(component);
                }).not.throws(Error);

                expect(function(){
                    var entity= new Entity('test');
                    entity.removeComponent(new Entity('name'));
                }).throws();

            });
            it.skip('shall remove the component from the Entity',function(){

            });
        });

        describe.skip('subscribeGlobal(event,callback)',function(){
            it('stub',function(){

            });
        });

        describe.skip('unsubscribeGlobal(tockenOrFunction)',function(){
            it('stub',function(){

            });
        });

        describe.skip('publishGlobal(event,data)',function(){
            it('stub',function(){

            });
        });

        describe.skip('publishSyncGlobal(event,data)',function(){
            it('_',function(){

            });
        });
        describe('setVenue(venue)',function(){
            it('take a [smashball/Graphic] as first parameter',function(){

            });
        });
    });
});
