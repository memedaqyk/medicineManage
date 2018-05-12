'use strict';
$(function(){
    let type = 'addshop';
    $('#seleAddShop').click(function(){
        try{ $('#addshop').show()}
        catch(e){}
        try{ $('#addfirm').hide()}
        catch(e){}
        type = 'addshop';
    });
    $('#seleAddFirm').click(function(){
        try{ $('#addshop').hide()}
        catch(e){}
        try{ $('#addfirm').show()}
        catch(e){}
        type = 'addfirm';
    });
    $("#map").click(function (e) {
     // alert('X ; '+ e.clientX  + 'Y: '+e.clientY);
      var t = map.getEventCoordinate(e);
      $('#add_long').val(t[0]);
      $('#add_lat').val(t[1]);
    })
    $('#addSumbit').click(function(){
        const x = $('#add_long').val();
        const y = $('#add_lat').val();
        if(type === 'addshop'){
            const id = $('#addshop_shopid').val();
            const name = $('#addshop_shopname').val();
            const fatherid = $('#addshop_firmid').val()
            alert(fatherid);
            $.post("addshop", {x,y,id,name,fatherid} );
        }else if(type === 'addfirm'){
            console.log('添加公司');
            const id = $('#addfirm_firmid').val();
            const name = $('#addfirm_firmname').val();
            $.post("addfirm", {x,y,id,name} );
        }
    })
    
})