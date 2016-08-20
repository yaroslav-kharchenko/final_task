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

var currentItem = JSON.parse(localStorage.getItem('itemData'));
function generatePage(){
	var pageStr = "";
	//Generate header
	pageStr += '<h2 class="item_name">' + currentItem.name + '</h2>';
	//Price
	pageStr += '<p class="item_price"> £' + currentItem.price.toFixed(2) + '</p>';
	//Info
	pageStr += '<cite class="item_info">' + currentItem.info + '</cite>';
	//Size
	pageStr += '<section class="item_size"><h4>Size</h4><ul class = "options">';
	for (var i = 0; i < currentItem.size.length; i++) {
		pageStr += '<li class="option"><a href="#">' + currentItem.size[i] + '</a></li>';
	}
	pageStr += '</ul></section>'
	//Color
	pageStr += '<section class="item_color"><h4>Color</h4><ul class = "options">';
	for (var i = 0; i < currentItem.color.length; i++) {
		pageStr += '<li class="option"><a href="#">' + currentItem.color[i] + '</a></li>';
	}
	pageStr += '</ul></section>'
	//Button
	pageStr += '<a href="#" class="add_btn">Add to bag</a>'
	//append to page
	$('.item_details').html(pageStr);
	addListeners();
}

function addListeners(){
	$('.item_size li').click(function(event) {
		event.preventDefault();
		$(this).siblings('.checked').removeClass('checked');
		$(this).addClass('checked');
	});
	$('.item_color li').click(function(event) {
		event.preventDefault();
		$(this).siblings('.checked').removeClass('checked');
		$(this).addClass('checked');
	});
	$('.add_btn').click(function(event) {
		event.preventDefault();
		addItem();
	});
}

//Bag functional

function addItem(){
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
	console.log(currentItem);
	generatePage();
	calculateBag();
	//Gallery
	$('.small_img').click(function(event) {
		event.preventDefault();
		$(this).parent().parent().find('.active').removeClass('active');
		$(this).addClass('active');
		$('.main_img').children('img').attr('src',$(this).children('img').attr('src'));
	});
	//Default values for options
	$($('.item_size .option')[0]).addClass('checked');
	$($('.item_color .option')[0]).addClass('checked');
	//Gallery 2 (with src)
	// var minImgArr = $('.small_img img');
	// for (var i = 0; i < currentItem.imgBaseSrc.min.length; i++) {
	// 	minImgArr[i].attr('src',currentItem.imgBaseSrc.min[i]);
	// }
	// $('.main_img img').attr('src',currentItem.imgBaseSrc.full[0]);
});