'use strict';
const firmsql = require('../sql/firmgeom').geom;
const shopsql = require('../sql/geom').geom;
const medic = require('../sql/medicinal.js');


class Firm  {
    constructor(id,name,shops){
        this.id = id;
        this.name = name;
        this.shops = shops;
    }
}

let findAll = async function () {
    let firms = [];
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
       let t = new Firm(id,name,names);
       firms.push(t);
    }
    //console.log(firms);
    return firms;
}

var home = async(ctx,next)=>{
    const data = await findAll();
    //console.log(ctx.getClass());
    const medicName = await medic.as_getNames();
    ctx.render('main.html',{'firms' :data,'denglu': ctx.getClass(),medic : medicName});
}

module.exports = {
    'GET /home': home
}