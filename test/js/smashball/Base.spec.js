define(['sb/Base','chai'],function(Base,chai){
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Extend Function prototype',function(){
        describe('[Function].Extend(constructor)',function(){
            it('shall add constructor in protoype chain',function(){
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
                Fn.Include({o:function(){},d:'öö'});
                expect(new Fn()).to.hasOwnProperty('o');
                expect(new Fn()).to.hasOwnProperty('d');
            });
        });
        describe('[Function].hasIncluded(object)',function(){
            it('with deep, return true if this has same methods as object',function(){
                function Fn(){};
                var obj1 = {o:function(){},d:'öö'}
                var obj2 = {oo:function(){},d:'öö'}
                var obj3 = {o:function(){},d:'öö', e:function(){}}
                var obj4 = {o:'olle',d:function(){}}
                Fn.Include(obj1);
                obj1.d = 'ppp';
                expect(Fn.hasIncluded(obj1,true)).to.be.ok;
                expect(Fn.hasIncluded(obj2,true)).to.not.be.ok;
                expect(Fn.hasIncluded(obj3,true)).to.not.be.ok;
                expect(Fn.hasIncluded(obj4,true)).to.not.be.ok;

            });
        });

    });

    describe('Base.prototype',function(){
        describe('Extend',function(){
            it('inherit functionality ',function(){
                function Obj(){
                    Base.prototype.constructor.call(this);
                    this.fn1 = function(){};
                    this.member = 'string';
                }
                Obj.Extend(Base);

                var o = new Obj();
                expect(o.instanceOf).to.exsist
                expect(o.fn1).to.exsist

            });
        });
        describe('_super_',function(){
            it('it call the prototyped (parent) constructor function as this',function(){
                function Parent(){
                    Parent._super_.constructor.call(this);
                    this.name = 'name'
                }
                Parent.Extend(Base);

                function Child(){
                    Child._super_.constructor.call(this);
                }
                Child.Extend(Parent);

                var child = new Child();
                expect(child.name).to.equal('name');

            });
        });
        describe('Base.toString()',function(){
            it('should pritty print object eg [object Base]',function(){
                var b = new Base();
                function Test(){};
                Test.Extend(Base);
                expect('[object Base]').to.equal(b.toString());
                expect('[object Test]').to.equal((new Test()).toString());
            });
        });
        describe.skip('mixin(object)',function(){
            it('Included tests this',function(){

            });
        });
        describe.skip('hasMixedin(object)',function(){
            it('hasIncluded tests this',function(){

            });
        });
        describe('instanceOf(moduleId[String])',function(){
            it('return true if moduleId exists and instanceof is true',function(){
                var b = new Base();
                var c = new Base();
                expect(b.instanceOf('sb/Base')).to.be.ok;
                expect(b.instanceOf('Error')).to.not.be.ok;
                expect(c.instanceOf( b,'sb/Base')).to.be.ok;
                expect(c.instanceOf( b,'Error')).to.not.be.ok;

            });
        });
        describe('assert(expression,message)',function(){
            it('throws a AssertError with [message]',function(){
                function fn(){
                    var instance = new Base();
                    instance.assert(false,'expect thrown');
                }
                expect(fn).throws('expect thrown');

                function fn2(){
                    var instance = new Base();
                    instance.assert(true,'expect thrown');
                }
                expect(fn2).not.throws(Error);
            });
        });

    });

});
