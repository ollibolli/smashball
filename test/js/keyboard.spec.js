define(['smashball/keyboard', 'chai','sinon','smashball'], function(keyboard, chai, sinon, smashball) {
    var eventBus = smashball.eventBus;
    var expect;
    expect = chai.expect;

    describe('keyboard', function() {

        describe('onKeyDown', function() {
            it('shoud register a key down', function() {
                var event;
                event = {
                    keyCode: 34
                };
                keyboard.onKeydown(event);
                expect(keyboard._pressed[34]).to.be.ok;
                expect(keyboard.isDown(34)).to.be.ok;
            });
            it ('should send a "keyboard/keydown" event',function(done){
                var spy = sinon.spy(function(){
                    expect(spy.called).to.be.ok;
                    done();
                });
                eventBus.subscribe('keyboard/keydown',spy);
                keyboard.onKeydown(event);


            });
        });

        describe('onKeyUP', function() {
            it('should unregister a key down', function() {
                var event;
                event = {
                    keyCode: keyboard.S
                };
                keyboard.onKeyup(event);
                expect(keyboard._pressed[83]).to.not.be.ok;
                expect(keyboard.isDown(83)).to.not.be.ok;
            });
            it ('should send a "keyboard/keyup" event',function(done){
                var spy = sinon.spy(function(){
                    expect(spy.called).to.be.ok;
                    done();
                });
                eventBus.subscribe('keyboard/keyup',spy);
                keyboard.onKeyup(event);

            });
        });

        /*Do not know good way to trigger a keyboard event*/
        describe.skip('executeOnceWhenPressed', function() {
            it('should execute a callback once when key is pressed', function(done) {

                var spy = sinon.spy(function(){
                    expect(spy.called).to.be.ok;
                    done();
                });

                keyboard.executeOnceWhenPressed(83, spy);
                keyboard.onKeydown(keyboard.P);
            });
        });

        describe.skip('toggleWhenPressed', function() {
            it('should toggle between two callbacks when key is pressed', function(done) {
                var toggled = 0;

                var spy1 = function(){
                    toggled ++;
                    console.log(toggled);
                    if (toggle == 2){
                        done();
                    }
                };

                var spy2 = function(){
                    toggled++;
                };

                keyboard.toggleWhenPressed(keyboard.P, spy1, spy2);
                keyboard.onKeydown(keyboard.P);
                keyboard.onKeydown(keyboard.P);
                keyboard.onKeydown(keyboard.P);
            });

        });

        simulateKeyEvent = function(character) {
            var canceled, evt;
            evt = document.createEvent("KeyboardEvent");
            evt.initKeyboardEvent("keyup", true, true, window, 0, 0, 0, 0, 0, character.charCodeAt(0));
            canceled = !dispatchEvent(evt);
            console.log("#####", evt);
            if (canceled) {
                return console.log("canceled");
            } else {
                return console.log("not canceled");
            }
        };
    });
});
