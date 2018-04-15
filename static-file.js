'use strict'

const path = require('path');
//处理文件俺路径
const mine = require('mime');
//检查文件类型
const fs = require('mz/fs');

function staticFiles(url,dir){
    return async (ctx,next) =>{
        let rpath = ctx.request.path;
        console.log(`rpath ${rpath}`);
        if(rpath.startsWith(url)){
            let fp = path.join(dir,rpath.substring(url.length));
            //判断文件是否存在
            console.log(fp);
            
            if(await fs.exists(fp)){
                ctx.response.type = mine.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);

            }else{
                //文件不存在
                console.log('没有找到文件');
                ctx.response.status = 404;
            }
            /*
            fs.exists(fp,(err)=>{
                if(err){
                    console.log('没有找到文件');
                    ctx.response.status = 404;
                }else{
                    ctx.response.type = mine.lookup(rpath);
                    ctx.response.body = await fs.readFile(fp);
                }
            })
            */
        }else{
            //不是查找url中文件
            await next();
        }
    };
}

module.exports = staticFiles;