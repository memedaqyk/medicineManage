// 2018/4/6 赵小明
//本模块用来添加药店
'use strict';
const sequelize = require('../sql/sequelize');

let fn_addshop = async function (ctx,next) {
    const id = ctx.request.body.id;
    const fatherid = ctx.request.body.fatherid;
    const name = ctx.request.body.name;
    const x = ctx.request.body.x;
    const y = ctx.request.body.y;
    const $shopSql = `insert into geom(id,name,fatherid) values('${id}','${name}','${fatherid}');`;
    const $pointSql = `insert into point values('${id}',ST_PointFromText('POINT(${x} ${y})'));`;
    sequelize.query($shopSql);
    sequelize.query($pointSql);
    ctx.response.body = 'ok';
}
let fn_addfirm = async function (ctx,next) {
    const id = ctx.request.body.id;
    const name = ctx.request.body.name;
    const x = ctx.request.body.x;
    const y = ctx.request.body.y;
    const $shopSql = `insert into firmgeom(id,name,longitude,latitude) values('${id}','${name}','${x}','${y}');`;
    sequelize.query($shopSql);
    ctx.response.body = 'ok';
}

module.exports = {
    'POST /addshop': fn_addshop,
    'POST /addfirm': fn_addfirm
}