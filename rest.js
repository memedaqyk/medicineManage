'use strict';

const rest = {
    restify : (pathPrefix) => {
        //REST API前缀 默认为/api/
        pathPrefix = pathPrefix || '/api/';
        return async(ctx,next) => {
            //首先判断是否为REST API前缀 如果不是，则是普通请求
            if(ctx.request.path.startsWith(pathPrefix)){
                ctx.rest = (data) => {
                    //设置好返回类型
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                await next();
            }else{
                await next();
            }
        }
    }
}

module.exports = rest;