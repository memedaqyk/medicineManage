'use strict';
//一些常用的功能函数
const clients = require('../sql/clients')
const relation = require('../sql/relation')
const name2id = async function (name) {
    const data = await clients.findAll({
        where : {
            'name' : name
        },
        attributes : ['clientid']
    })
    //console.log(data[0].clientid);
    return data;
}

//找到下属药店
const findto = async function(id){
    var arr=[];
    const dataarr = await relation.findAll({
        where : {
            fatherid : id
        },
        attributes : ['id']
    })
    
    for( let t of dataarr){
        arr.push(t.id);
    }
    //console.log('子节点id' + arr);
    return arr;
}


module.exports = {
    name2id : name2id,
    findto : findto
}