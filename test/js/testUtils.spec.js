define([
    'sinon',
    'chai',
    'test/js/testUtils'
],function(sinon,chai,utils){
    'use strict';

    var expect = chai.expect;
    var assert = chai.assert;

    describe('utils',function(){
        describe('mockNewConstr(constructor)',function(){
            it ('should return a object instance of constructor',function(){
                function Base(){
                   throw new Error('[testUtils Base]');
                   this._kompis = 2;
                };

                Base.prototype = {
                    a : function(){},
                    b : 'string'
                }

                function Other (){
                    throw new Error('[testUtils Base]');
                    this._ovan = 1;
                };

                var mock = utils.mockNewConst(Base);
                expect(mock instanceof Base).to.be.ok;
                expect(mock instanceof Other).not.to.be.ok;
            });
        });
    });
});