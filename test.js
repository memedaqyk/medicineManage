'use strict';
const fun = function *(x){
    let j= yield 5 + x;
    return j;

} 
const f = fun(3);
const ff = f.next()
console.log(ff);
console.log(ff.value);
console.log(f.next(5));

