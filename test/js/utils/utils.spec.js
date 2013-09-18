define([
    'sinon',
    'chai',
    'utils/util',
    'smashball/Base'
],function(sinon, chai, util, Base){
    'use strict';

    var expect = chai.expect;
    var assert = chai.assert;

    describe('util',function(){
        describe('getNameOf(fn)',function(){
            it ('should return the name of the function if function',function(){
                var fn = function Test(){}
                expect(util.getNameOf(fn)).to.equals('Test');

            });
            it ('should return the name of the constructor function if obj ',function(){
                var obj = {}
                expect(util.getNameOf(obj)).to.equals('Object');

            });
        });

        describe('assertParam(object,instanceOf)',function(){
            it ('shall check param against',function(){

            });
        });
        describe('instanceOf(object,requireId)',function(){
            it('should check instances',function(){
                expect(util.instanceOf('string','String'),'"String"').to.be.ok;
                expect(util.instanceOf(new String('string'),'String'),'new String').to.be.ok;
                expect(util.instanceOf([],'String'),'"String 2"').not.to.be.ok;

                expect(util.instanceOf({},'Object'),'"Object"').to.be.ok;
                expect(util.instanceOf(new Object(),'Object'),'"Object"').to.be.ok;
                expect(util.instanceOf(new Number(23),'Object'),'"Object"').to.be.ok;
                expect(util.instanceOf('','Object'),'"Object"').not.to.be.ok;
                expect(util.instanceOf(3,'Object'),'"Object"').not.to.be.ok;
                expect(util.instanceOf(false,'Object'),'"Object"').not.to.be.ok;
                expect(util.instanceOf(undefined,'Object'),'"Object"').not.to.be.ok;


                expect(util.instanceOf(12.3,'Number'),'Number').to.be.ok;
                expect(util.instanceOf(new Number(12.4),'Number'),'new Number').to.be.ok;
                expect(util.instanceOf([],'Number'),'[]').not.to.be.ok;

                expect(util.instanceOf(12.3,'Number'),'Number').to.be.ok;
                expect(util.instanceOf(new Number(12.4),'Number'),'new Number').to.be.ok;
                expect(util.instanceOf([],'Number'),'[]').not.to.be.ok;

                expect(util.instanceOf(false,'Boolean'),'Boolean').to.be.ok;
                expect(util.instanceOf(new Boolean(true),'Boolean'),'new Boolean').to.be.ok;
                expect(util.instanceOf([],'Boolean'),'[]').not.to.be.ok;



                var b = new Base();
                expect(util.instanceOf(b,'smashball/Base','utils')).to.be.ok;
            });
        })

    });
});