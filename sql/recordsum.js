'use strict';
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');
const sql = sequelize.define('sum',{
    id : {
        type:Sequelize.STRING(10),
        primaryKey:true
    },
    size : Sequelize.STRING(10),
    name : Sequelize.STRING(60),
    price : Sequelize.FLOAT,
    number : Sequelize.INTEGER,
    countmouth : Sequelize.INTEGER,
    data : Sequelize.DATE,
    money : Sequelize.FLOAT
    },{
        timestamps: false,
        tableName : 'sum'
    });

//test
/*
(async function () {
    const data = await sql.findAll();
    console.log(data.length);
})();
*/
module.exports = sql;