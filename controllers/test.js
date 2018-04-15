'use strict';
const firmsql = require('../sql/firmgeom').geom;
const shopsql = require('../sql/geom').geom;

let firms = [];
class Firm  {
    constructor(name,shops){
        this.name = name;
        this.shops = shops;
    }
}

let findAll = async function () {
    const firmdata = await firmsql.findAll({
         attributes : ['name','id']
    });
    for(let firm of firmdata){
       const {name,id} = firm;
       const shops = await shopsql.findAll({
           where : {
               fatherid : id
           },
           attributes : ['name']
       });
       let names = [];
       for(let shop of shops){
           names.push(shop.name);
       }
       let t = new Firm(name,names);
       firms.push(t);
    }
    console.log(firms);
    return firms;
}


