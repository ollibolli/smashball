define(['sinon'],function(sinon){
    global.document = {
        getElementsByTagName:sinon.spy(function(tag){
            return {};
        })
    }

    global.window= {
        document : global.document,
        attachEvent : sinon.spy(),
        event:sinon.spy()
    }
});
