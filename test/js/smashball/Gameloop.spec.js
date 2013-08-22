define(['smashball/Gameloop','chai','smashball','sinon', 'smashball/Graphic'],function(Gameloop, chai, smashball, sinon, Graphic){
    var expect = chai.expect;
    var assert = chai.assert;
    var pubsub = smashball.eventBus;
    describe('Gameloop',function(){
        var gameloop = new Gameloop();
        describe('get/setFrameRate',function(){
            it ('Set and gets the framerate',function(){
               var fps = gameloop.getFrameRate();
               gameloop.setFrameRate(30);
               expect(gameloop.getFrameRate()).to.equal(30);
               expect(gameloop.getFrameRate()).to.not.equal(fps);
            });
        });
        describe('get/set graphic',function(){
            it ('Set and gets graphic',function(){
              var graphic = Graphic.factory('canvas2d', document.createElement('element'), 500, 500);
              gameloop.setGraphic(graphic);
              expect(gameloop.getGraphic()).equals(graphic);
            });
        });
        describe('start',function(){
            it('shoud start sending "gameloop/gameTick" and "gameloop/render" events',function(done){


                var gametickCb = sinon.spy();
                var renderCb = sinon.spy();

                pubsub.subscribe('gameloop/gameTick',gametickCb);
                pubsub.subscribe('gameloop/render',renderCb);

                gameloop.setFrameRate(20);
                gameloop.start();
                //wait some time and then check
                setTimeout(function (){
                  gameloop.stop();
                  expect(gametickCb.called).to.be.ok;
                  expect(renderCb.called).to.be.ok;
                  expect(renderCb.getCall(5).args[1]);
                  done();

                },100);
            });
        });
    })
});
