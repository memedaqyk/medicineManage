'use strict';
$(function () {
    let type = 'addshop';
    $('#seleAddShop').click(function () {
        try {
            $('#addshop').show()
        }
        catch (e) {}
        try {
            $('#addfirm').hide()
        }
        catch (e) {}
        type = 'addshop';
    });
    $('#seleAddFirm').click(function () {
        try {
            $('#addshop').hide()
        }
        catch (e) {}
        try {
            $('#addfirm').show()
        }
        catch (e) {}
        type = 'addfirm';
    });
    $("#map").click(function (e) {
        // alert('X ; '+ e.clientX  + 'Y: '+e.clientY);
        var t = map.getEventCoordinate(e);
        $('#add_long_shop').val(t[0]);
        $('#add_lat_shop').val(t[1]);
        $('#add_long_firm').val(t[0]);
        $('#add_lat_firm').val(t[1]);
    })
    $('#addSubmit1').click(function () {
        const x = $('#add_long_shop').val();
        const y = $('#add_lat_shop').val();

        const id = $('#addshop_shopid').val();
        const name = $('#addshop_shopname').val();
        const fatherid = $('#addshop_firmid').val();
        $.post("addshop", {
            x,
            y,
            id,
            name,
            fatherid
        });

    })
    $('#addSubmit2').click(function () {
        const x = $('#add_long_firm').val();
        const y = $('#add_lat_firm').val();

        const id = $('#addfirm_firmid').val();
        const name = $('#addfirm_firmname').val();
        $.post("addfirm", {
            x,
            y,
            id,
            name
        });

    })

    $("#addSubmit5").click(function() {
        location.reload();
    });
})