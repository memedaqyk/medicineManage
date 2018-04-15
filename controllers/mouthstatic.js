'use stric';
//此模块用来分月统计
const recond = require('../sql/recordsum');
const Sequelize = require('sequelize');
const url = require('url');
let id;
const fn_month = async function(ctx,next){
    id= url.parse(ctx.url,true).query.id;
    ctx.render('month.html');
}

const fn_monthData = async function (ctx,next) {
    
    //const id = 12;
    const data = await recond.findAll({
        attributes : ['name',[Sequelize.fn('SUM', Sequelize.col('number')), 'number']],
        where : {
            data : {
                $gte: `2017-${id}-1`,
                $lte: `2017-${id}-31`
            }
        },
        group : 'name'
    });
    //减少传输数据
    let values = [];
    for(let t of data){
        values.push({id : t.name,number : t.number});
    }
    console.log(values.length);
    ctx.rest(values);
}
//fn_mouth();
module.exports = {
    'GET /month' : fn_month,
    'GET /api/month/data' : fn_monthData
}