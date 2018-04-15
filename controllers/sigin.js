'use strict';
const clients = require('../sql/clients');

var fn_signin = async(ctx,next)=>{
    var user = ctx.request.body.user;
    var pw = ctx.request.body.pw;
    try{
    var users = await clients.findAll({
        where:{
            usename : user
        }
    })
    //console.log(users.length);
    if(users.length ===1){
         
        if(users[0].passward === pw){
            
            if(users[0].class === 1){
                
                ctx.cookies.set('class','111');
                ctx.cookies.set('username',user);
            }else if(users[0].class === 2) {
                ctx.cookies.set('class','222');
                ctx.cookies.set('username',user);
            }
            ctx.response.body = `<h1>成功登录</h1>`;
         }else{
            ctx.response.body = `<h1>密码错误</h1>`;
         }
    }else{
        ctx.response.body = `<h1>账号错误</h1>`;
    }
}catch(e){
        console.log(e);
        ctx.response.body = `<h1>未知错误</h1>`;
    }    
}

module.exports = {
    'POST /sigin' : fn_signin
}