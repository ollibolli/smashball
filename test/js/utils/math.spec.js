define([
    'sinon',
    'chai',
    'utils/math'
],function(sinon,chai,math){
    'use strict';
    var expect = chai.expect;
    var assert = chai.assert;

    describe('math',function(){
        describe('keneticEnergy(mass,velocity)',function(){
            it ('should calculate the keneticEnergy of mass and velocity',function(){
                expect(math.keneticEnergy(30,34)).to.equals(260100);

            });
        });
    });
});