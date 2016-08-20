'use strict'
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

function addItem(){
	var currentItem = JSON.parse(localStorage.getItem('itemObj'));
	var tempObj = {
		items: []
	};
	var tempArr = [];
	var itemConfig = currentItem;
	var repetition = false;
	//color
	itemConfig.color = $($('.item_color').find('.checked')[0]).text();
	//size
	itemConfig.size = $($('.item_size').find('.checked')[0]).text();
	if( localStorage.getItem('bagStorage') == null ){
		tempArr.push(itemConfig);
		tempObj.items = tempArr;
		localStorage.setItem('bagStorage',JSON.stringify(tempObj));
	} else{
		tempObj = $.parseJSON(localStorage.getItem('bagStorage'));
		tempArr = tempObj.items;
		for (var i = 0; i < tempArr.length; i++) {
			if (tempArr[i].name == itemConfig.name &&
				tempArr[i].color == itemConfig.color &&
				tempArr[i].size == itemConfig.size) {
				tempArr[i].quantity++;
				repetition = true;
				break;
			}
		}
		if (repetition == false) {
			tempArr.push(itemConfig);
			tempObj.items = tempArr;
			localStorage.setItem('bagStorage',JSON.stringify(tempObj));
		} else {
			tempObj.items = tempArr;
			localStorage.setItem('bagStorage',JSON.stringify(tempObj));
		}
	}
	calculateBag();
}

// item popup
function centerPopup(){
	var popupWidth = $('.popup-item').width();
	var popupHeight = $('.popup-item').height();
	var winWidth = window.innerWidth - 80;
    var winHeight = window.innerHeight - 40;
    var scrollPos = $(window).scrollTop();

    var posWidth = (winWidth - popupWidth) / 2;
    var posHeight = (winHeight - popupHeight) / 2 + scrollPos;

    $('.popup-item').css({'width' : popupWidth+'px', 'left' : posWidth+'px', 'top' : posHeight + 'px'});
}

//popup

function popupListeners(){
	$('html').click(function() { 
        var scrollPos = $(window).scrollTop();
        $('#popup-item').hide(); 
        $('body').removeClass('overlay');
        $('html').scrollTop(scrollPos);
    });
    $('#popup-close').click(function() { 
        var scrollPos = $(window).scrollTop();
        $('#popup-item').hide(); 
        $('body').removeClass('overlay');
        $('html').scrollTop(scrollPos);
    });
    $('.item_size ul li').click(function(event) {
		event.preventDefault();
		$(this).siblings('.checked').removeClass('checked');
		$(this).addClass('checked');
	});
	$('.item_color ul li').click(function(event) {
		event.preventDefault();
		$(this).siblings('.checked').removeClass('checked');
		$(this).addClass('checked');
	});
    $('#popup-add').click(function(event) {
		event.preventDefault();
		addItem();
	});
	$('#popup-item').click(function(e) { 
        e.stopPropagation();
    });
}



$(document).ready(function(){
	var browserMinWidth;
	// $('.filters_list').clone().appendTo('.filters_popup');
	filtersFunctional();
	calculateBag();

	$(window).resize(function() {
        filtersFunctional();
        // centerPopup();
    });

	window.onorientationchange = function() {
        filtersFunctional();
        // centerPopup();
    };

	function filtersFunctional(){
		// var browserMinWidth = parseInt($('.wrapper').css('max-width'), 10);
		browserMinWidth = document.documentElement.clientWidth;
		console.log(browserMinWidth);
		//Script for desctop resolution
		if (browserMinWidth > 1024) {
			var filterListArr = $('.filter');
			var flLength = filterListArr.length;
			var optionList = [];
			for (var i = 0; i < flLength; i++) {
				$(filterListArr[i]).on('click', function(event) {
					optionList = $(this);
					if (optionList.hasClass('visible')) {
						optionList.removeClass('visible');
					} else{
						optionList.addClass('visible');
					}
				});
			}

			var optionsListArr = $('.filter_option');
			var olLength = optionsListArr.length;
			var option;
			var optionParent;
			var optionIndex;
			for (var i = 0; i < olLength; i++) {
				$(optionsListArr[i]).on('click', function(event) {
					event.preventDefault();
					option = $(this);
					optionIndex = $(this).parent().parent().index();
					// console.log(optionIndex);
					optionParent = option.parent();
					if (option.hasClass('checked')) {
						option.removeClass('checked');
						optionParent.parent().removeClass('selected');
						localStorage.setItem(optionParent.siblings('.filter_name').text(),'Not selected');
						$($('.filters_toolbar_list .filter_value')[optionIndex]).html($(this).parent().siblings('filter_name').text())
					} else{
						$(optionParent).find('.checked').removeClass('checked');
						option.addClass('checked');
						optionParent.parent().addClass('selected');
						optionParent.siblings('.filter_value').html(option.text());
						localStorage.setItem(optionParent.siblings('.filter_name').text(),option.text());
						console.log(optionIndex);
						$($('.filters_toolbar_list .filter_value')[optionIndex]).addClass('checked');
						$($('.filters_toolbar_list .filter_value')[optionIndex]).html(option.text());
					}
				});
			}
		}
		if (browserMinWidth <= 1024) {
			var toolbar = $('.filters_popup');
			var headerDiv = $('header');
			$(window).scroll(function(event) {
				var headerHeight = -parseFloat(headerDiv.css('height'));
				var headerOffset = headerDiv.offset().top - $(window).scrollTop();
				if (headerOffset <= -139) {
					toolbar.addClass('fixed');
				} else{
					toolbar.removeClass('fixed');
				}
			});
			$('.filters_toolbar').click(function(event){
				if (!$(this).parent().hasClass('popup_opened')) {
					var filtersChilds = document.getElementsByClassName('filters_list');
					var filtersClone = filtersChilds[0].cloneNode(true);
					event.stopPropagation()
					document.getElementsByClassName('popup_wrap')[0].appendChild(filtersClone);
					$(".filters_popup").addClass('popup_opened');
					$(".popup_wrap").css({
						display: 'block'
					});
					toolbar.addClass('fixed');
					$('body').addClass('popup_open');
					$('.filter_option').click(function(e){
						e.preventDefault();
						$(this).siblings('.checked').removeClass('checked');
						$(this).addClass('checked');
						var thisIndex = +$(this).attr('data-id');
						var parentIndex = $(this).parent('.options_list').parent().index();

						// Leftmost position
						$(this).prependTo($(this).parent());

						$($('.filters_toolbar_list .filter_value')[parentIndex]).addClass('checked');
						$($('.filters_toolbar_list .filter_value')[parentIndex]).html($(this).text());
						$($($($('.filters_wrap .options_list')[parentIndex]).find('.filter_option')[thisIndex]).siblings()).removeClass('checked');
						$($($('.filters_wrap .options_list')[parentIndex]).find('.filter_option')[thisIndex]).addClass('checked');
						$($('.filters_wrap .filter')[parentIndex]).addClass('selected')
						$($('.filters_wrap .filter_value')[parentIndex]).html($(this).text());
					});

					// Draggable
					$('.popup_wrap .options_list').draggable({
					   axis:'x',
					   revert: true,
					   snap: true
					});


				}
			});
			$('.close_filters').click(function(){
				// $(".popup_wrap").remove(".filters_list");
				var popupWrap = document.getElementsByClassName('popup_wrap')[0];
				popupWrap.removeChild(popupWrap.lastChild);
				$(".popup_opened").removeClass('popup_opened')
				$(".popup_wrap").css({
					display: 'none'
				});
				$('body').removeClass('popup_open');
				toolbar.removeClass('fixed');
			});
		}
	}

	$('.more_photos').click(function(event) {
		var itemId = $(this).parents('figure').attr('data-item-id');
		for (var i = 0; i < Data.items.length; i++) {
			if (Data.items[i].id == itemId) {
				localStorage.setItem('itemData',JSON.stringify(Data.items[i]));
			}
		}
	});

	$('.quick_view').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var scrollPos = $(window).scrollTop();
		var itemObj = {};
		var tempStr = '';

		//Генерация содержимого
		var itemId = $(this).parents('figure').attr('data-item-id');
		for (var i = 0; i < Data.items.length; i++) {
			if (Data.items[i].id == itemId) {
				localStorage.setItem('itemObj',JSON.stringify(Data.items[i]));
				itemObj = Data.items[i];
			}
		}
		$('#popup-item figure img').attr({src: itemObj.imgsrc});
		$('.popup-item-price').html('£'+itemObj.price);
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

		//Показ поп-апа
		$('#popup-item').show();
		centerPopup();
		$('body').addClass('overlay');
		$('html').scrollTop(scrollPos);
		popupListeners();
	});
});