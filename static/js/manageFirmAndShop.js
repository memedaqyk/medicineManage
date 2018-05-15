$('.switch label').on('click', function() {
    var indicator = $(this).parent('.switch .switch-header').find('span');
    if ($(this).hasClass('right')) {
        $(indicator).addClass('right');
    } else {
        $(indicator).removeClass('right');
    }
    var addshop = $("#addshop");
    var addfirm = $("#addfirm");

    if (addfirm.hasClass('form-hidden')) {
        addfirm.removeClass('form-hidden');
        addshop.addClass('form-hidden');
    } else {
        addfirm.addClass('form-hidden');
        addshop.removeClass('form-hidden');
    }
});
