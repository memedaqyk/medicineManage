'use strict'

let cookie = async function (ctx,next) {
    
    ctx.getClass = function(){
          const str = ctx.cookies.get('class');
          if(str === '111'){
              return 1;
          }else if(str === '222'){
              return 2;
          }else{
              return 0;
          }
    }
    ctx.getUsername = function(){
        const username = ctx.cookies.get('username');
        return username;
    }
    await next();
}
module.exports = cookie;
