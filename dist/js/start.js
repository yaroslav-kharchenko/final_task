$(document).ready(function(){

	bag.calculate();

	// Slider functionality
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

	//Slider autoplay
	function autoplay(){
		interval = setInterval(function(){
	    	moveSlide();
	    }, 2500);
	}

	//Slider nav dots
	for (var i = 0; i < slides.length - 1; i++) {
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

	//Slider stabilization
	function stabilizateSlide(){
		var tempIndex = $('.slider_nav .active').index();
		var windowWidth =  document.documentElement.clientWidth;
		if (windowWidth > 1300) {
			windowWidth = 1300;
		}
		sliderOffset = tempIndex * windowWidth;
		slidesBox.css("transform","translate3d(-"+sliderOffset+"px, 0px, 0px)");
	}
	$(window).resize(function() {
        stabilizateSlide();
    });
	window.onorientationchange = function() {
        stabilizateSlide();
    };

	autoplay();

	//Autoplay pause after hover
	$('.baner_slider').hover(function(){
		clearInterval(interval);
	});
	$('.baner_slider').mouseleave(function(){
		autoplay()
	});

	//Forvarding to the product page
	$('.more_photos').click(function() {
		var itemId = $(this).parents('figure').attr('data-item-id');
		for (var i = 0; i < Data.items.length; i++) {
			if (Data.items[i].id == itemId) {
				localStorage.setItem('itemData',JSON.stringify(Data.items[i]));
			}
		}
	});
	$('.item_name').click(function() {
		var itemId = $(this).parents('figure').attr('data-item-id');
		for (var i = 0; i < Data.items.length; i++) {
			if (Data.items[i].id == itemId) {
				localStorage.setItem('itemData',JSON.stringify(Data.items[i]));
			}
		}
	});

	//Quick view fuctionality
	$('.quick_view').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var scrollPos = $(window).scrollTop();
		var itemObj = {};
		var tempStr = '';

		//Content generation
		var itemId = $(this).parents('figure').attr('data-item-id');
		for (var i = 0; i < Data.items.length; i++) {
			if (Data.items[i].id == itemId) {
				localStorage.setItem('itemObj',JSON.stringify(Data.items[i]));
				itemObj = Data.items[i];
			}
		}
		$('#popup-item figure img').attr({src: itemObj.imgsrc});
		$('.popup-item-price').html('£'+itemObj.price.toFixed(2));
		$('.popup-item-name').html(itemObj.name);

		for (var i = 0; i < itemObj.color.length; i++) {
			tempStr += '<li class="option"><a href="#">' + itemObj.color[i] + '</a></li>';
		}
		$('.item_color ul').html(tempStr);
		tempStr = '';

		for (var i = 0; i < itemObj.size.length; i++) {
			tempStr += '<li class="option"><a href="#">' + itemObj.size[i] + '</a></li>';
		}
		$('.item_size ul').html(tempStr);

		$('.popup-item-description').html(itemObj.info);

		$($('.item_size .option')[0]).addClass('checked');
		$($('.item_color .option')[0]).addClass('checked');

		//Popup showing
		$('#popup-item').show();
		$('#popup-item').css({display: 'flex'});
		$('body').addClass('overlay');
		$('html').scrollTop(scrollPos);
		popup.toCenter();
		popup.addListeners();
	});
	//Popup listeners
	$('html').click(function() { 
        var scrollPos = $(window).scrollTop();
        $('#popup-item').hide(); 
        $('body').removeClass('overlay');
        $('html').scrollTop(scrollPos);
    });
    $('#popup-close').click(function(e) {
    	e.preventDefault();
        var scrollPos = $(window).scrollTop();
        $('#popup-add').unbind('click', bag.addItem);
        $('#popup-item').hide(); 
        $('body').removeClass('overlay');
        $('html').scrollTop(scrollPos);
    });
    $('#popup-add').click(function(e) {
		e.preventDefault();
		bag.addItem('itemObj');
	});
	$('#popup-item').click(function(e) { 
        e.stopPropagation();
    });
    
    //Event on some changes in other pages
	window.addEventListener('storage',function(){
		bag.calculate();
	});
})