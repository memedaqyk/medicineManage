'use strict';
//此模块来处理区域分析
const FindIdOfpolygon = require('../sql/point');
const recond = require('../sql/record');
const Sequelize = require('sequelize');

let polygonarr = {};
//let polygondata;
let fn_getDate = async function(ctx,next){
     polygonarr[ctx.getUsername()] =  ctx.request.body.content;
     
     ctx.response.body = 'ok';
    }
let replace =async function(usename){
    let str = polygonarr[usename];
    //将参数修改为 标准的sql格式
    //select id from geom where ST_Contains(polygon.geom,point.geom);
    str = str.replace(/\[/g,'(');
    str = str.replace(/\]/g,')');
    str = str.replace(/,/g,' ');
    str = str.replace(/\) \(/g,',');
    str = str.slice(1,str.length - 1);
    const idArr = await FindIdOfpolygon(str);
    for(let i in idArr){
        idArr[i] = idArr[i].id;
    }
    return idArr;
}
let findRecordFre = async function(arr){
    const data = await recond.findAll({
        attributes : ['id',[Sequelize.fn('COUNT', Sequelize.col('id')), 'number'],'shopname'],
        where : {
            id : {
                $in : arr
            }
        },
        group : 'id'
    });
    return data;
}
let fn_often = async function(ctx,next){
    
     ctx.render('echarts.html');
}

let fn_data = async function(ctx,next){
     const arr = await replace(ctx.getUsername());
     const data =await findRecordFre(arr);
     ctx.rest(data);
}



module.exports = {
    'POST /polygon' : fn_getDate,
    'GET /often' : fn_often,
    'GET /api/often/data' : fn_data
}