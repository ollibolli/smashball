'use strict'
var vm = require("vm");
var fs = require("fs");
var _ = require('lodash');

    var nameCaches = [];
    var nameCache;
    var _dependencies = {};
    var config = {
        baseUrl:''
    };

    function define(name,deps,callback){
        if (typeof name === 'function'){
            callback = name;
            name = null;
            deps = [];
        } else if (typeof name !== 'string' && name instanceof Array){
            callback = deps;
            deps = name;
            name = null
        }
        var depsObj = [];
        deps.forEach(function(dep){
            var obj;
            if (_dependencies.hasOwnProperty(dep)){
                obj = _dependencies[dep];
            } else {
                try{
                    obj = require(dep);
                }catch (err){
                    nameCaches.push(dep);
                    require(config.baseUrl+dep);
                    obj = _dependencies[dep];
                }
            }
            depsObj.push(obj);
        });
        var module = callback.apply(global,depsObj)
        nameCache = nameCaches.pop();
        if (!module ){
            if(nameCache){
                console.log('Cant find module '+ nameCache)
            }
        }else{
            console.log(nameCache + ' Registred');
            _dependencies[nameCache] = module;
        }
    };

    define.config = function(conf){
        config = _.merge(config,conf);
    };

    define.register = function(id,obj){
        _dependencies[id] = obj;
        return this;
    };

    function fixArgs(args){
            // resolve args
			// valid combinations for define:
			// (string, array, object|function) sax|saf
			// (array, object|function) ax|af
			// (string, object|function) sx|sf
			// (object|function) x|f


            var id, deps, defFunc, defFuncArity, len, cjs;

			len = args.length;

			defFunc = args[len - 1];
			defFuncArity = isType(defFunc, 'Function') ? defFunc.length : -1;

			if (len == 2) {
				if (isType(args[0], 'Array')) {
					deps = args[0];
				}
				else {
					id = args[0];
				}
			}
			else if (len == 3) {
				id = args[0];
				deps = args[1];
			}

			// Hybrid format: assume that a definition function with zero
			// dependencies and non-zero arity is a wrapped CommonJS module
			if (!deps && defFuncArity > 0) {
				deps = ['require', 'exports', 'module'].slice(0, defFuncArity).concat(core.extractCjsDeps(defFunc));
			}

			return {
				id: id,
				deps: deps || [],
				res: defFuncArity >= 0 ? defFunc : function () { return defFunc; },
			};
    }

module.exports = define;


