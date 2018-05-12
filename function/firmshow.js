'use strict';
const clients = require('../sql/firmgeom').geom;
//直接将坐标转化为geojson数据
//实现点坐标的转换
//对象字面量
var geojsonObject = require('../gisfunction/geoJson');
/*
geojsonObject.addPonint(117,34);
console.log(JSON.stringify(geojsonObject));
*/

module.exports.geojson = async()=>{
    //清除残留数据
    
    const datas = await clients.findAll();
    //再数据库查询完再清理   否则会因异步出错
    geojsonObject.clear();
    for(let obj of datas){
        geojsonObject.addPonint(obj.longitude,obj.latitude,{
            name : obj.name,
            id : obj.id
        })
    }
    //console.log(JSON.stringify(geojsonObject));
    return geojsonObject;
};
