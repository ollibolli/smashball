define(['smashball/Base'],function(Base){

    Component.Extend(Base);

    function Component(){
        this.Super();
        this.entity = null;
    }

    Component.prototype.subscribeGlobal = function(){
         throw "Implement This "+ this.name;
    }

    Component.prototype.subscribeEntity = function(){
         throw "Implement This "+ this.name;
    }

    Component.prototype.addEntity = function(entity){
        this.entity = entity || null;
    }

    return Component;
});