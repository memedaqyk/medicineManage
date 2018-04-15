'use stric';
//此模块用来统计分析全年某种药品的变化趋势
const recond = require('../sql/recordsum');
const Sequelize = require('sequelize');

const url = require('url');

const asfindMoney = async function(month,name){
    const data = await recond.findAll({
        attributes : [[Sequelize.fn('SUM', Sequelize.col('money')), 'money']],
        where : {
            data : {
                $gte: `2017-${month}-1`,
                $lte: (month===12)?`2017-${month }-31` : `2017-${month + 1}-1`
            },
            name : name
        }
    });
    return data[0].money;
}

const asfindNumber = async function(month,name){
    const data = await recond.findAll({
        attributes : [[Sequelize.fn('SUM', Sequelize.col('number')), 'number']],
        where : {
            data : {
                $gte: `2017-${month}-1`,
                $lte: (month===12)?`2017-${month }-31` : `2017-${month + 1}-1`
            },
            name : name
        }
    });
    return data[0].number;
}
let medicName,type;
let fn_money = async function (ctx,next) {
    medicName = url.parse(ctx.url,true).query.medic;
    type = url.parse(ctx.url,true).query.id;
    ctx.render('moneychange.html');
}

let fn_moneychange = async function(ctx,name) {
    //console.log('执行fn_moneychange');
    let dataArr = [];
    let data;
    for(let t=1;t<=12;t+=1){  
        data = await asfindMoney(t,medicName);
        dataArr.push({id : `${t}月`,number : data})
    };
    //console.log(dataArr);
    ctx.rest(dataArr);
    
}

let fn_xiaoliang = async function (ctx,next) {
    medicName = url.parse(ctx.url,true).query.medic;
    type = url.parse(ctx.url,true).query.id;
    ctx.render('xiaoliangchange.html');
}

let fn_xiaoliangchange = async function(ctx,name) {
    //console.log('执行fn_moneychange');
    let dataArr = [];
    let data;
    for(let t=1;t<=12;t+=1){
        data = await asfindNumber(t,medicName);
        dataArr.push({id : `${t}月`,number : data})
    };
    //console.log(dataArr);
    ctx.rest(dataArr);
    
}

module.exports = {
    'GET /money' : fn_money,
    'GET /api/moneychange' : fn_moneychange,
    'GET /xiaoliang' : fn_xiaoliang,
    'GET /api/xiaoliangchange' : fn_xiaoliangchange,
}