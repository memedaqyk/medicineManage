'use strict';
//2017/12/27  不可用
const fs = require('fs');
var arr = [];
var data = fs.readFileSync('./data/shop2.txt').toString();
for(let s of data){
    let ss;
    if(s!=='\r'&&s!=='\n'){
        ss += s;
    }else{
        arr[arr.length] = ss;
        arr.length+=1;
        ss = undefined;
    }
}
console.log(arr);




