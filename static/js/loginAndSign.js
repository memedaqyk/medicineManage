$('.form').find('input, textarea').on('keyup blur focus', function (e) {
    
    var $this = $(this),
	label = $this.prev('label');

    if (e.type === 'keyup') {
	if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    	    label.removeClass('active highlight'); 
	} else {
	    label.removeClass('highlight');   
	}   
    } else if (e.type === 'focus') {
	
	if( $this.val() === '' ) {
    	    label.removeClass('highlight'); 
	} 
	else if( $this.val() !== '' ) {
	    label.addClass('highlight');
	}
    }

});

$('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
    console.log(target);

    $('.tab-content > div').not(target).hide();
    
    $(target).show();
    
});

var getCookies = function() {
    cookies = document.cookie;
    if(cookies != "") {
        var userName = cookies.split(';')[1].split('=')[1];
        return userName;
    } else {
        return "未登录";
    }
};

var changeLogState = function() {
    var userName = getCookies();
    if (userName == "未登录") {
        $('#logOrSign').show();
    } else {
        $('#logOrSign').find('li a').hide();
        
        $('#logOrSign').find('li').html('<a>' + userName + '</a>');
    }
};
changeLogState();
