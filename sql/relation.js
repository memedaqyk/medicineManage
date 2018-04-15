'use strict';
//对应shop2 数据表
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const relations = sequelize.define('geom',{
    id:{
        type:Sequelize.STRING(10),
        primaryKey:true
    },
    name:Sequelize.STRING(60),
    fatherid : Sequelize.STRING(10)   
},{
    timestamps: false,
    tableName : 'geom'
});

module.exports = relations;