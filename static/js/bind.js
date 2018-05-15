'use strict';

//分时统计绑定
$(function(){
    const $mouth = $('.mouth');
    for(let i = 0; i<$mouth.length; i+=1){
        let t = $($mouth[i]);
        t.click(function(){
            //console.log(t.attr('value'));
            const url = `/month?id=${t.attr('value')}`
            subWin(url)
        })
    }
})



$(function(){
    let medicName;
    let medic = $('a.medic');
    let old;
    for(let t of medic){
        $(t).click(function(){
            medicName = $(t).text();
            $(t).css({  "background": "#7AB893", "color": "white", "text-decoration": "none" });
            try{old.css({  "background": "white", "color": "black" })}
            catch(e){}
            old = $(t);
        })
    }
    let check = function(){
        if(medicName){
            return true;
        }else{
            alert("请先选择需要统计的药品");
            return false;
        }
    }
    $('#numberchange').click(function(){
        // 统计全年的销量变化
        if(!check()){
            return false;
        }
        const url = `/xiaoliang?id=xiaoliang&medic=${medicName}`;
        subWin(url);
    });
    $('#moneychange').click(function(){
        //统计全年药品变化
        if(!check()){
            return false;
        }
        const url = `/money?id=money&medic=${medicName}`;
        subWin(url);
    })
})

$(function(){
    let shopshow = $('#shopshow');
    let medihide = $('#medihide');
    let adminhide = $('#adminhide');
    shopshow.click(function(){
        console.log('shopshow');
       try{ $('#medics').hide()}
       catch(e){};
       try{ $('.switch').hide()}
       catch(e){}
       try{ $('#firmlist').show()}
       catch(e){}
        shopshow.css({"background":"#7AB893", "outline":"none"});
        medihide.css("background", "white");
        adminhide.css("background", "white");
    }).css("background", "#7AB893");
    medihide.click(function(){
        console.log('medishow');
       try{ $('#firmlist').hide()}
       catch(e){console.log(e)};
       try{ $('.switch').hide()}
       catch(e){}
       try{ $('#medics').show()}
        catch(e){}
        shopshow.css("background", "white");
        medihide.css({"background":"#7AB893", "outline":"none"});
        adminhide.css("background", "white");
    });
    adminhide.click(function(){
       console.log('adminshow')
       try{ $('#medics').hide()}
       catch(e){}
       try{ $('#firmlist').hide()}
       catch(e){console.log(e)}
       try{ $('.switch').show()}
        catch(e){}
        shopshow.css("background", "white");
        medihide.css("background", "white");
        adminhide.css({"background":"#7AB893", "outline":"none"});
    })

});

$('#buffer').click(function(){
    let status = true;
    return function(){
        if(status){
            map.addLayer(shoplayerbuff);
            status = false;
        }else{
            map.removeLayer(shoplayerbuff);
            status = true;
        }
    }
}())
