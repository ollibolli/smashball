define(['utils/_Pubsub'],function(_Pubsub){
    console.log(new _Pubsub())
    return {
        eventBus :new _Pubsub()
    }
});