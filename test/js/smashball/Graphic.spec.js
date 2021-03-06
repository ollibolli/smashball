define( ['sinon','chai','sb/Graphic','../../test/mock/dom.js']
,function(sinon,  chai,     Graphic){
    var expect = chai.expect;
    var assert = chai.assert;

    describe('Graphic',function(){

        var body = document.getElementsByTagName('body')[0];

        describe('Graphic.factory(type,elem,width,height,depth)',function(){
            //register a factory method
            Graphic.factory.test = function (element,width,height){
                var graphic = new Graphic();
                graphic.div = document.createElement("div");
                graphic.div.style.background = '#065656';
                graphic.div.setAttribute('id','identifier');
                graphic.div.style.width = graphic.width = width+'px';
                graphic.div.style.height = graphic.height = height+'px';
                element.appendChild(graphic.div);

                return graphic;

            };

            it.skip('Register a custom graphic factory method',function(){
                 expect(Graphic.factory.test).to.be.a(Function);
            });

            it ('return a graphic obj from a factory function from the factory obj',function(){
                var grapical = Graphic.factory('test',body,100,10);
                var element = document.getElementById('identifier');
                expect(element.style.height).to.equal('10px');
                expect(element.style.width).to.equal('100px');

            });
        });
        describe('Graphic.factory.canvas2d(element,width,height)',function(){
            it('shall return a [sb/Graphic] object', function(){
                var graphic = Graphic.factory('canvas2d', document.getElementsByTagName('body')[0],500,534);
                expect(graphic.canvas instanceof HTMLCanvasElement).to.be.ok;
                expect(graphic.context instanceof CanvasRenderingContext2D).to.be.ok;
                expect(graphic.width).to.equal(500);
                expect(graphic.height).to.equal(534);

            });
            it('shall implement clear()', function(){
                var graphic = Graphic.factory('canvas2d', document.getElementsByTagName('body')[0],500.534);
                expect(graphic).to.have.property('clear');

            });
        });

    });
});