console.log('My script');

$(document).ready(function(){

	var slidesBox = $('.slider_inner');
	var slides = slidesBox.children('.slide');
	var slidesNav = $('.slider_nav');
	console.log(slides);
	var slidesWidth = slidesBox.width();
	var slidesLength = slides.length;
	var sliderIndex = slidesLength;
	var sliderOffset = sliderIndex * slidesWidth;

	slidesBox.css('width', sliderOffset);

	function moveSlide(){
		var tempIndex = $('.slider_nav .active').index();
		console.log(tempIndex);
		tempIndex += 1;
		if(tempIndex < slidesLength){
			$('.slider_nav .active').removeClass('active');
			$('.slider_nav .dot').eq(tempIndex).addClass('active');
			sliderOffset = tempIndex * slidesWidth;
			console.log(sliderOffset);
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
	    }, 3000);
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
		sliderIndex = $(this).index();
		sliderOffset = sliderIndex * slidesWidth;
		slidesBox.css("transform","translate3d(-"+sliderOffset+"px, 0px, 0px)");
	})

	autoplay()

	$('.baner_slider').hover(function(){
		clearInterval(interval);
	});
	$('.baner_slider').mouseleave(function(){
		autoplay()
	});

})