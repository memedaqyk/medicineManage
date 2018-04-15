//不属于此项目，环境GIS实验

'use strict';
const Sequelize = require('sequelize');
const config = require('./config2');

var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:30000
    }
});

let sql = sequelize.define('geomview',{
    id :{
        type : Sequelize.STRING(10),
         primaryKey:true                       
    },
    longitude : Sequelize.FLOAT,
    latitude : Sequelize.FLOAT,
    name : Sequelize.STRING(60),
    fathername : Sequelize.STRING(60),
    fatherid : Sequelize.STRING(10)
},{
    tableName : 'geomview',
    timestamps : false
});
/*
(async ()=>{
    let data = await sql.findAll();
    for(let t of data){
        console.log(t);
    }
})();
*/
exports.geom = sql;