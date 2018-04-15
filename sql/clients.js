'use strict';
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const clients = sequelize.define('client',{
    
    usename:{
        type : Sequelize.STRING(30),
        primaryKey:true        
    },
    passward:Sequelize.STRING(20),
    class:Sequelize.INTEGER
},{
    tableName : 'clients',
    timestamps: false
});

//测试代码
/*
(async()=>{
    const datas = await clients.findAll();
    for(let data of datas){
        console.log(JSON.stringify(data));
    }
})();
*/
module.exports = clients;
