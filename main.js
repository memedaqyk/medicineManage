'use strict';
//导入Koa
const Koa = require('koa');
//创建一个web app
const app = new Koa();
//导入rest api
const rest = require('./rest');
//处理post请求
const bodyParser = require('koa-bodyparser');

const isProduction = process.env.NODE_ENV === 'production';


app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var startTime = new Date().getTime(),execTime;
    await next();
    execTime = new Date().getTime() - startTime;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
})
//开发环境下
if(!isProduction){
    let staticFiles = require('./static-file');
    //请求静态文件
    app.use(staticFiles('/static/',__dirname+'/static'));
}
//ctx.getClas 注册
const cookie = require('./cookie.js');
app.use(cookie);
//body解析
app.use(bodyParser());
//请求json格式数据
app.use(rest.restify());
//添加渲染器，ctx.render()函数
var templating = require('./templating')
app.use(templating('view',{
    noCache: !isProduction,
    watch: !isProduction
}));
//请求html数据
var controller  = require('./controller');
app.use(controller());


app.listen(3000);
console.log('app started at port 3000...');

