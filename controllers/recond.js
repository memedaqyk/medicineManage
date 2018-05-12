'use strict';
const url = require('url');
const sql = require('../sql/record.js');

const fn_record = async(ctx,next) => {
    const {query} = url.parse(ctx.url,true);
    ctx.render('form.html',{data : query});
    
}

module.exports = {
    'GET /record' : fn_record
}