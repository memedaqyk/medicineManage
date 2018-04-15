$(function() {
	
	$('.brand_left .numA-Z a').on('click', function(event) {
		event.preventDefault();
		var $self=$(this),
			navT=$self.text(),
			$list=$self.closest('.brand_left').find('.brand_list');

		$self.addClass('active').siblings().removeClass('active');
		$list.animate({
			scrollTop:$list.find('.name:contains('+navT+')').prop('offsetTop')
		}, 'fast');
	});

	
	$('.brand_list li').on('click', function(event) {
		event.preventDefault();
		var $self=$(this),
			$downList=$self.next('.a1');
		$downList.length>0?$downList.slideToggle('fast'):false;
	});
	
});