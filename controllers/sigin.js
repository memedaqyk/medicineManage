'use strict';
const clients = require('../sql/clients');
const sequelize = require('../sql/sequelize');

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

var fn_register = async function (ctx,next) {
    var user = ctx.request.body.user;
    var pw = ctx.request.body.pw;
    
    const sql = `insert into clients (usename,passward,class,email) values('${user}','${pw}','1','${email}');`;
    sequelize.query(sql);
}
module.exports = {
    'POST /home' : fn_signin,
    'POST /signup' : fn_register
}