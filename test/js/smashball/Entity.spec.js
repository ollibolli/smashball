define(['smashball/Entity',
    'chai',
    'sinon',
    'utils/_Pubsub',
    'smashball/comp/Component',
    'utils/util'
],function(
    Entity,
    chai,
    sinon,
    _Pubsub,
    Component,
    util
    ){
    var expect = chai.expect;
    describe('Entity',function(){
        describe('mixin [utils/_Pubsub]',function(){
            it('instance of Entity shall has mixed in [utils/_Pubsub]',function(){
                expect(new Entity('test').hasMixedin(_Pubsub));
            });
        });

        describe('Entity(identifier)',function(){
            it('shall take a [String] as first parameter a identifier',function(){
                expect(function(){
                    var e = new Entity();
                }).to.throw();

                expect(function(){
                    var e = new Entity('identifier');
                }).to.not.throw();
                var entity= new Entity('test');
                expect(entity.getId()).to.equal('test');
            });
            it('should have a _componets propertie of type Object "{}" ', function() {
                var e = new Entity('test');
                expect(typeof e._components).equals(typeof {});
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
            it('shall add the component to the Entity',function(){
                var e = new Entity('idet');

                function Test(){};

                Test.Extend(Component);
                var component = new Test();

                e.addComponent(component);
                expect(util.getNameOf(e._components['Test'])).to.equals('Test');
            });
            it('should call componets setEntity([entity])',function (){
                var comp = new Component();
                comp.setEntity = sinon.spy();

                var e = new Entity('Test');
                e.addComponent(comp);

                expect(comp.setEntity.called).to.be.ok;
            });
        });

        describe('removeComponent(component)',function(){
            it('shall take a [component] as first parameter of type smashball/Component',function(){
                expect(function(){
                    var entity= new Entity('test');
                    var component = new Component();
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
            it('stub',function(){

            });
        });

        describe('componentsSubscriptions()',function(){
            it('should call components addSubscriptions()',function(){
                var e = new Entity('test');
                var comp = new Component();
                //override
                comp.addSubscriptions = function(){};
                sinon.spy(comp,"addSubscriptions");
                e.addComponent(comp);
                e.componentsSubscriptions();
                expect(comp.addSubscriptions.called).to.be.ok;
            });
        });
//        describe.skip ('setVenue(venue)',function(){
//            it('take a [smashball/Graphic] as first parameter',function(){
//
//            });
//        });
    });
});