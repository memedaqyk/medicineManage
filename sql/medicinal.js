'use strict';
//药品数据库
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

let sql = sequelize.define('medicinal',{
    name : {
        type : Sequelize.STRING(30),
        primaryKey : true
    }
},{
    tableName : 'medicinal',
    timestamps: false
});

const as_mediNames = async function () {
    let data =  await sql.findAll({
        attributes : ['name']
    });
    let dataArr = [];
    for( let t of data){
        dataArr.push(t.name);
    }
    return dataArr;
    //console.log(dataArr);
}

//mediNames();

module.exports = {
    sql : sql,
    as_getNames : as_mediNames
}