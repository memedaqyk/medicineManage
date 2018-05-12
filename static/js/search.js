'use strict';

$(function(){
const $searchBut = $('#searchBut');
const $search = $('#search input');

$searchBut.click(function(){
    console.log('点击了')
    if(!$search){
          console.log('未找到文本框');
     }
     let searchtext = $search.val();
     select(searchtext);
})

var select = function(value){
    const $shoparr = $('a.yaodian');
    console.log('药店数量' + $shoparr.length);
    let selectarr = [];
    
    for(let i=0;i<$shoparr.length;i+=1){
        let element = $shoparr[i];
        
        if(element.innerText.match(value)){
            selectarr.push($(element));
        }
    }
    selectarr.forEach((element)=>{
        element.css("background-color",'#98F5FF');
    })
    selectarr[0].click();
}
})