console.log('My script');

function dropMenu(){
	$('header nav').addClass('drop_menu');
	// $('.header_top .drop_menu_button').css("display","none");
	// $('.header_top .close_menu_button').css("display","block");
	document.getElementsByClassName('drop_menu_button')[0].style.display = "none";
	document.getElementsByClassName('close_menu_button')[0].style.display = "block";
	$('.drop_menu').fadeTo('slow', 1);
	// document.getElementsByClassName('drop_menu').style.opacity = "1";
	// $('.drop_menu').css({
	// 	opacity: '1',
	// });
}

function closeMenu(){
	// $('.drop_menu').fadeTo('slow', 0);
	$('.drop_menu').removeClass('drop_menu');
	document.getElementsByClassName('header_menu').style = "";
	// $('.header_top .close_menu_button').css("display","none");
	// $('.header_top .drop_menu_button').css("display","block");
	document.getElementsByClassName('close_menu_button')[0].style = "";
	document.getElementsByClassName('drop_menu_button')[0].style = "";
}

$(document).ready(function(){

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
			// sliderOffset = ((sliderIndex * slidesWidth)/slidesWidth)*100;
			// sliderOffset = window.inner.width();
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