'use strict';
let shops = require('../function/shopshow');
let foo = require('../function/foo');
const lines = require('../function/sellrelation');
const recordSql = require('../sql/record.js');
const firms = require('../function/firmshow');

let fn_data = async function(ctx,next) {
    const data = await shops.geojson();
    ctx.rest(data);
}

let fn_firm = async function(ctx,next) {
    const data = await firms.geojson();
    ctx.rest(data);
}

let fn_toLines = async function(ctx,next){
    const id = ctx.params.id;
    //尚未定义find函数
    console.log('firm id : ' + id);
    const dataArr = await foo.findto(id);
    const data = await lines.toLines(id,dataArr);
    
    //console.log(JSON.stringify(data));
    ctx.rest(data);
    
}


let fn_sellrecord = async function(ctx,next){
    const {id} = ctx.params;
    
    var data = await recordSql.findAll({
        attributes : ['name','size','price','number','data','countmouth'],
        where : {
            'id' : id
        }
    });
    console.log(data);
    ctx.rest(data);
}


module.exports = {
    'GET /api/shop' : fn_data,
    'GET /api/firm' : fn_firm,
    'GET /api/toline/:id' : fn_toLines,   
    'GET /api/sellrecorld/:id' : fn_sellrecord
}