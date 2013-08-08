define(['smashball/Base','chai'],function(Base,chai){
    var expect = chai.expect;
    describe('Base',function(){
        describe('Extend',function(){
            it('inherit functionality ',function(){
                var obj = {
                    fn1 : function(){},
                    member:'string'
                }
                Base.Extend(obj);
                var b = new Base();
                expect(b).to.haveOwnProperty('fn1');
            });
        });
    });
});