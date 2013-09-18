define([
    'smashball/Gameloop',
    'chai',
    'smashball',
    'sinon',
    'smashball/Graphic',
    'smashball/Venue'
],function(Gameloop, chai, smashball, sinon, Graphic, Venue){
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
        describe('get/set Venue',function(){
            it ('Set and gets graphic',function(){
                var graphic = Graphic.factory('canvas2d', document.createElement('element'), 500, 500);
                var venue = new Venue(graphic);
                expect(function(){
                    gameloop.getVenue();
                }).to.throw(Error);
                gameloop.setVenue(venue);
                expect(gameloop.getVenue()).equals(venue);
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
                    expect(renderCb.getCall(1).args[1]);
                    done();

                },100);
            });
        });
    })
});
