'use strict';
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

let sql = sequelize.define('firmgeom',{
    id :{
        type : Sequelize.INTEGER,
         primaryKey:true                       
    },
    longitude : Sequelize.FLOAT,
    latitude : Sequelize.FLOAT,
    name : Sequelize.STRING(60),
},{
    tableName : 'firmgeom',
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
