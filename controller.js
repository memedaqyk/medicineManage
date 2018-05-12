'use strict'

var fs = require('fs');
var path = require('path');


//处理js文件；
function addMapping(router,mapping){
    for(var url in mapping){
        if(url.startsWith('GET')){
            var pt = url.substring(4); 
            router.get(pt,mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if (url.startsWith('POST')){
            var pt = url.substring(5);
            router.post(pt,mapping[url]);
            console.log(`register URL mapping: POST ${pt}`);
        }else{
            console.log(`invalid URL : ${url}`);
        }
    }
}

function addControllers(router) {
    var ps = path.join(__dirname,'/controllers');
    console.log(`js文件目录地址${ps}`);
    var files = fs.readdirSync(ps);

    //找到js文件
    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    });

    for(var f of js_files) {
        console.log(`process controller: ${f} ...`);
        let mapping = require(path.join(__dirname,'/controllers/',f));
        addMapping(router,mapping);
    }
}

module.exports  = function(dir){
    let 
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router,controllers_dir);
    return router.routes();
    
}
