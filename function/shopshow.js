'use strict';
const clients = require('../sql/geom').geom;
//直接将坐标转化为geojson数据
//实现点坐标的转换
//对象字面量
var geojsonObject = require('../gisfunction/geoJson');
/*
geojsonObject.addPonint(117,34);
console.log(JSON.stringify(geojsonObject));
*/

let fun = async()=>{
   //清除残留数据
    
    const datas = await clients.findAll({
        attributes : [`longitude`, `latitude`,`name`, `id`, `fathername`, `fatherid`]
    });
    geojsonObject.clear();
    for(let obj of datas){
        geojsonObject.addPonint(obj.longitude,obj.latitude,{
            name : obj.name,
            id : obj.id,
            fathername : obj.fathername,
            fatherid : obj.fatherid
        })
    }
    //console.log(JSON.stringify(geojsonObject));
    return geojsonObject;
};
//  fun();
module.exports.geojson = fun;
