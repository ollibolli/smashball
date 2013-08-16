define(['smashball/Base','chai'],function(Base,chai){
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Extend Function prototype',function(){
        describe('[Function].Extend(constructor)',function(){
            it('shall be a instance of constructor',function(){
                function Parent(){}
                function Child(){}
                Child.Extend(Parent);
                expect(new Child()).to.be.an.instanceof(Parent);

            });
            
            it('shall add obj properties to prototype of caller ',function(){
                function Parent(){}
                Parent.prototype.fn = function (){
                    return true;
                };
                function Child(){}

                expect(Child.prototype).hasOwnProperty('fn');
            });
        });
        describe('[Function].Include(object)',function(){
            it('add object properties to caller',function(){
                function Fn(){};
                Fn.Include({o:function(){},d:'öö'
                })
            });
        });

    });

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