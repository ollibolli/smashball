define([
    'sinon',
    'chai',
    'smashball/comp/Component',
    'smashball/Entity',
    'require'
],function(sinon,chai,Component,Entity,require){
    'use strict';

    var expect = chai.expect;
    var assert = chai.assert;

    describe('Component',function(){
        describe('hasEntityDepencencies(entity)',function(){
            var Comp1;
            var entity;

            before(function(){
                define('relative/Comp1',[],function(){
                    Comp1 = function Comp1(){};
                    Comp1.Extend(Component);
                    entity = new Entity('test');
                    entity.addComponent(new Comp1());
                    return Comp1;
                });
            });

            it ('should check that entity has required components',function(done){
                require(['relative/Comp1'],function(Comp1){
                    var comp = new Comp1();
                    comp._dependencies = ['smashball/not_existing_dependency'];
                    expect(comp.hasEntityDependencies(entity)).not.to.be.ok;
                    comp._dependencies = ['relative/Comp1','smashball/not_existing_dependency'];
                    expect(comp.hasEntityDependencies(entity)).not.to.be.ok;
                    comp._dependencies = ['relative/Comp1'];
                    expect(comp.hasEntityDependencies(entity)).to.be.ok;
                    done();
                });
            });
        });
    });
});