define(['smashball/Entity','chai','sinon'],function(Entity, chai, sinon){
    describe('Entity s',function(){
        describe('Entity(name)',function(){
            it('shall take a [name] as first parameret of type String as a identifier');
        });
        describe('addComponent(component)',function(){
            it('shall take a [component] as first parameter of type smashball/Component');
            it('shall return a component identifier');
        });

        describe('removeComponent(component)',function(){
            it('shall take a [component] as first parameter of type smashball/Component');
            it('shall take a component identifier')
            it('shall remove the component from the Entity');
        });

    });
});