define(['smashball/Base','chai'],function(Base,chai){
    var expect = chai.expect;
    var assert = chai.assert;
    describe('Base',function(){
        describe('Extend',function(){
            it('inherit functionality ',function(){
                function Obj(){
                    this.Super();
                    this.fn1 = function(){};
                    this.member = 'string';
                }
                Obj.Extend(Base);

                var o = new Obj();
                expect(o.instanceOf).to.exsist
                expect(o.fn1).to.exsist

            });
        });
    });
});