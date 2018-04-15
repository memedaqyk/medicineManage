'use strict'
var Users = require('../sql/geom').geom;
var fn_index = async(ctx,next) =>{
    ctx.render('index.html');
}


var fn_denglu = async(ctx,next)=>{
    ctx.render('login.html');
}

var fn_zhuce = async(ctx,next)=>{
    ctx.render('zhuce.html');
}

var fn_main = async(ctx,next)=>{
    ctx.render('main.html');
}

var fn_vue1 = async(ctx,next)=>{
    ctx.render('vue1.html');
}

var fn_vue2 = async(ctx,next)=>{
    ctx.render('vue2.html');
}

var fn_vue3 = async(ctx,next)=>{
    ctx.render('vue3.html');
}

var fn_vue4 = async(ctx,next)=>{
    console.log(ctx.url);
    ctx.render('from.html');
}

var fn_huangjinggis = async(ctx,next) => {
    var data = [];
    for(let i=0;i<100;i+=1){
        data[i] = i;
    }
    ctx.render('main3.html',{data : data})
}

module.exports = {
    'GET /': fn_index,
    'GET /denglu' : fn_denglu,
    'GET /zhuce'  : fn_zhuce,  
    'GET /vue1'   : fn_vue1,
    'GET /vue2'   : fn_vue2,
    'GET /vue3'   : fn_vue3,
    'GET /form'   : fn_vue4,
    'GET /huangjing'  : fn_huangjinggis
}