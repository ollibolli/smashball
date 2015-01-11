var amdefine = require('amdefine');

define = global.define = amdefine();
define.config({
    base:'../main/js/'
});

define(['../main/js/sb/Base.js'],function(Base){
    console.log(Base);
});
