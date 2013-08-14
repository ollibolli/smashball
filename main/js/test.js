define(['smashball/Entity'],function(Entity){
    e1 = new Entity('olle');
    e2 = new Entity('gustaf');

    e1.subscribe('pow',function(type,data){
        console.log('E1 POW :' + type + data);
    });

    e2.subscribe('pow',function(type,data){
        console.log('E2 POW :' + type + data);
    });

    e1.publish('pow','powwww');
    e2.publish('pow','wwwwwww')

});