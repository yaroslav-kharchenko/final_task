console.log('My script');

function dropMenu(){
	$('header nav').addClass('drop_menu');
	document.getElementsByClassName('drop_menu_button')[0].style.display = "none";
	document.getElementsByClassName('close_menu_button')[0].style.display = "block";
	$('.drop_menu').fadeTo(500, 1);
}

function closeMenu(){
	$('.drop_menu').fadeTo(500, 0);
	setTimeout(function(){
			$('.drop_menu').removeClass('drop_menu');
			$('#header_menu').removeAttr("style");
			document.getElementsByClassName('close_menu_button')[0].style = "";
			document.getElementsByClassName('drop_menu_button')[0].style = "";
		},600);
}

function calculateBag(){
	var totalPrice = 0;
	var totalQuantity = 0;
	var priceStr = '';
	var headStr;
	var tailStr;
	var storage = $.parseJSON(localStorage.getItem('bagStorage'));
	if (storage == null || storage.items.length == 0) {
		$('.bag_price').html('');
		$('.bag_count').html('');
		$('.total_cost').html('£0.00');
	} else{
		for (var i = 0; i < storage.items.length; i++) {
			totalPrice += storage.items[i].price * storage.items[i].quantity;
			totalQuantity += storage.items[i].quantity;
		}
		totalPrice = totalPrice.toFixed(2);
		if (totalPrice >= 1000) {
			priceStr += totalPrice;
			headStr = priceStr.substr(0, priceStr.length - 6);
			tailStr = priceStr.substr(-6);
			totalPrice = headStr + " " + tailStr;
			$('.bag_price').html('£'+totalPrice);
			if ($('.total_cost')) {
				$('.total_cost').html('£'+totalPrice);
			}
		} else{
			$('.bag_price').html('£'+totalPrice);
			if ($('.total_cost')) {
				$('.total_cost').html('£'+totalPrice);
			}
		}
		$('.bag_count').html('('+totalQuantity+')');
	}
}

$(document).ready(function(){
	calculateBag();

	var slidesBox = $('.slider_inner');
	var slides = slidesBox.children('.slide');
	var slidesNav = $('.slider_nav');
	var slidesWidth = slidesBox.width();
	var slidesLength = slides.length;
	var sliderIndex = slidesLength;
	var sliderOffset = ((sliderIndex * slidesWidth)/slidesWidth)*100;

	slidesBox.css('width', sliderOffset+'%');

	function moveSlide(){
		var tempIndex = $('.slider_nav .active').index();
		tempIndex += 1;
		var windowWidth =  document.documentElement.clientWidth;
		if(tempIndex < slidesLength){
			$('.slider_nav .active').removeClass('active');
			$('.slider_nav .dot').eq(tempIndex).addClass('active');
			if (windowWidth > 1300) {
				windowWidth = 1300;
			}
			sliderOffset = tempIndex * windowWidth;
			slidesBox.css("transform","translate3d(-"+sliderOffset+"px, 0px, 0px)");
		} else{
			$('.slider_nav .active').removeClass('active');
			$('.slider_nav .dot').eq(0).addClass('active');
			slidesBox.css("transform","translate3d(0px, 0px, 0px)");
		}	
	}

	function autoplay(){
		interval = setInterval(function(){
	    	moveSlide();
	    }, 2500);
	}

	for (var i = 0; i < slides.length-1; i++) {
		if(i == 0){
			slidesNav.append('<div class="dot active"></div>');
		}
		slidesNav.append('<div class="dot"></div>');
	}

	var dots = slidesNav.children('.dot');

	sliderOffset = 0;
	sliderIndex = 0;

	dots.click(function(){
		$('.slider_nav .active').removeClass('active');
		$(this).addClass('active');
		var windowWidth =  document.documentElement.clientWidth;
		if (windowWidth > 1300) {
			windowWidth = 1300;
		}
		sliderIndex = $(this).index();
		sliderOffset = sliderIndex * windowWidth;
		slidesBox.css("transform","translate3d(-"+sliderOffset+"px, 0px, 0px)");
	})

	autoplay();

	$('.baner_slider').hover(function(){
		clearInterval(interval);
	});
	$('.baner_slider').mouseleave(function(){
		autoplay()
	});
})