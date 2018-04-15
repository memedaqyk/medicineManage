'use strict';
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');
/*
let sql = sequelize.define('point',{
    id :{
        type : Sequelize.STRING(10),
         primaryKey:true                       
    },
    geom : Sequelize.POINT
},{
    tableName : 'point',
    timestamps : false
})
*/
/* 导入point代码
const geom = require('./geom').geom;
const fun = async function () {
    const data = await geom.findAll({
        attributes : ['id','longitude','latitude'],
        where : {
            longitude: {
                $ne: null
            }
        }
    })
    for(let t of data){
        const $sql = `insert into point values('${t.id}',ST_PointFromText('POINT(${t.longitude} ${t.latitude})'));`
        sequelize.query($sql);
    }
    console.log('ok');
}
fun();
*/
const GetIdInPoly = async function(polygon){
    const $sql = `select id from point where ST_Contains(ST_PolygonFromText('POLYGON${polygon}'),point.geom)`
    console.log($sql);
    const data = await  sequelize.query($sql);
    return data[0];
}
//测试代码
/*
makeSql('((117.3 31.8,117.4 31.8,117.4 31.9,117.3 31.9,117.3 31.8))')；
*/

module.exports = GetIdInPoly;