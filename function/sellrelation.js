//依据药店ID，将公司与子药店连接起来
'use strict';
const lines = require('../gisfunction/geoJson');
const clients = require('../sql/geom').geom;
const firms = require('../sql/firmgeom').geom;

var MassgeErr = function(name){
    this.name = name || '原因未知';
}
//firm将id转换为经纬度
var fid2ads = async function(id){
    
    const data = await firms.findAll({
        where : {
            id : id
        }
    })
    if(data.length !== 1){
        //console.log('数据库出错了');
        throw new MassgeErr('主键有误');
    }
    console.log('firm : ' + [data[0].longitude,data[0].latitude])
    return [data[0].longitude,data[0].latitude];
}

//shop将id转换为经纬度
var id2ads = async function(id){
    
    const data = await clients.findAll({
        where : {
            id : id 
        },
        attributes : ['longitude','latitude']
    })
    if(data.length === 1){
        return [data[0].longitude,data[0].latitude];
    }else{
        return [null,null];
    }
    
}

var toLine = async function(str,end){
    
    const b = await id2ads(end);
    //console.log(a);
    if(b){
    lines.addLine(str,b);
    }
}
//参数为 id
const toLines = async function(ct,sides){
    //删除以前的数据
    lines.clear();
    ct = await fid2ads(ct);
    for(let t of sides){
       
        await toLine(ct,t);
    }
    //console.log('查询数据完成');
    return lines;
}

//测试

module.exports = {
    'toLines' : toLines
}