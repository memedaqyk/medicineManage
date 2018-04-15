'use strict';
//生成对应数据库的函数  数据库对应 传入id 旗下药店的进货记录
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const firmRecord = sequelize.define('recordwithid',{
    id :{
        primaryKey:true,
        type : Sequelize.STRING(10),
    } ,
    shopname : Sequelize.STRING(60),
    size : Sequelize.STRING(10),
    name : Sequelize.STRING(60),
    price : Sequelize.FLOAT,
    data : Sequelize.DATE,
    number : Sequelize.INTEGER,
    countmouth : Sequelize.INTEGER,
    fatherid : Sequelize.STRING(10),
    },{
        timestamps: false,
        tableName : 'recordwithid'
    });
module.exports = firmRecord;

