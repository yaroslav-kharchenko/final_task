'use script'

// ====================================
// HEADER MENU FUNCTIONS
// ====================================

var menu = {
	drop: function(){
		$('header nav').addClass('drop_menu');
		document.getElementsByClassName('drop_menu_button')[0].style.display = "none";
		document.getElementsByClassName('close_menu_button')[0].style.display = "block";
		$('.drop_menu').fadeTo(500, 1);
	},
	close: function(){
		$('.drop_menu').fadeTo(500, 0);
		setTimeout(function(){
			$('.drop_menu').removeClass('drop_menu');
			$('#header_menu').removeAttr("style");
			document.getElementsByClassName('drop_menu_button')[0].style.display = "block";
			document.getElementsByClassName('close_menu_button')[0].style.display = "none";
			$('.drop_menu_button').removeAttr("style");
			$('.close_menu_button').removeAttr("style");
		},600);
	}
}

// ====================================
// SHOPPING BAG FUNCTIONS
// ====================================

var bag = {
	calculate: function(){
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
	},
	addItem: function(itemNameStr){
		var tempObj = {
			items: []
		};
		var tempArr = [];
		var itemConfig = JSON.parse(localStorage.getItem(itemNameStr));
		var repetition = false;
		//Color
		itemConfig.color = $($('.item_color').find('.checked')[0]).text();
		//Size
		itemConfig.size = $($('.item_size').find('.checked')[0]).text();
		if( localStorage.getItem('bagStorage') == null ){
			tempArr.push(itemConfig);
			tempObj.items = tempArr;
			localStorage.setItem('bagStorage',JSON.stringify(tempObj));
		} else{
			tempObj = JSON.parse(localStorage.getItem('bagStorage'));
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
		bag.calculate();
	}
}

// ====================================
// ITEM POPUP FUNCTIONS
// ====================================

var popup = {
	toCenter: function(){
		var popupWidth = $('.popup-item').width();
		var popupHeight = $('.popup-item').height();
		var winWidth = window.innerWidth - 80;
	    var winHeight = window.innerHeight - 80;
	    var scrollPos = $(window).scrollTop();

	    var posWidth = (winWidth - popupWidth) / 2;
	    var posHeight = (winHeight - popupHeight) / 2 + scrollPos;

	    $('.popup-item').css({'width' : popupWidth+'px', 'left' : posWidth+'px', 'top' : posHeight + 'px'});
	},
	addListeners: function(){
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
	}
}