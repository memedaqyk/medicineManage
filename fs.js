'use strict';
const fs = require('mz/fs');
const path = require('path');
const shop =require('./mysql');
//var fp = 'e:\课件\node-mysql连接\test.txt';
/*
fs.exists(fp,(err)=>{
    if(err){
        console.log('文件不存在');
    }else{
        console.log('文件存在');
        
        fs.readFile('test.txt','utf-8',(err,data)=>{
            if(err){
                console.log('读文件失败');

            }else{
                console.log(data);
            }

        })
    }
});

*/

(async ()=>{
    let fp = path.join(__dirname,'test.txt');
    console.log(fp);
    
    if(await fs.exists(fp)){
        console.log('文件存在');
        var users = await shop.findAll()
        console.log(`find ${users.length} user`);
        for(let p of users){
            //console.log(p.dataValues.khmc);
            await fs.writeFile('test.txt',p.dataValues.khmc+',',{ 'flag': 'a' });
         }
    }else{
        console.log('文件不存在');
    }
    
    
})()
