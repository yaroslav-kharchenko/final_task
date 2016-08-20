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

var bagStorage = JSON.parse(localStorage.getItem('bagStorage'));

function generateItem(iteratorValue, storage){
	var i = iteratorValue;
	var itemStr = "";
	//Generate Img
	itemStr += '<figure><img src="' + storage.items[i].imgsrc + '" alt="' + storage.items[i].name + '">';
	//Price
	itemStr += '<figcaption>£' + storage.items[i].price.toFixed(2) + '</figcaption></figure>';
	//Side Info
	//Name
	itemStr += '<div class="side_info"><span class="item_name">' + storage.items[i].name + '</span>';
	//Color
	itemStr += '<span class="item_color">Color: ' + storage.items[i].color + '</span>';
	//Size
	itemStr += '<span class="item_size">Size: ' + storage.items[i].size + '</span>';
	//Quantity
	itemStr += '<span class="item_quantity">Quantity: ' + storage.items[i].quantity + '</span>';
	//Remove Button
	itemStr += '<a href="#" class="remove_btn">Remove item</a>'
	//append to page
	var itemElement = $('<div></div>');
	itemElement.addClass('item');
	itemElement.attr('data-bag-id', iteratorValue);
	itemElement.html(itemStr);
	$(".bag_items").append(itemElement);
}

function addListeners(){
	$('.empty_bag').click(function(event) {
		event.preventDefault();
		localStorage.removeItem('bagStorage');
		$('.bag_items').html('<h2>Your shopping bag is empty. Use <a href="catalog.html">Catalog</a> to add new items</h2>')
		calculateBag();
	});
	$('.buy_btn').click(function(event) {
		event.preventDefault();
		localStorage.removeItem('bagStorage');
		$('.bag_items').html('<h2>Thank you for your purchase</h2>')
		calculateBag();
	});
	$('.remove_btn').click(function(event) {
		event.preventDefault();
		if (bagStorage.items[$(this).parent().parent().attr('data-bag-id')].quantity > 1) {
			bagStorage.items[$(this).parent().parent().attr('data-bag-id')].quantity--;
		} else {
			var removedItem = bagStorage.items.splice($(this).parent().parent().attr('data-bag-id'),1);
		}
		localStorage.setItem('bagStorage',JSON.stringify(bagStorage));
		$(".bag_items").html('');
		bagStorage = JSON.parse(localStorage.getItem('bagStorage'));
		if (bagStorage.items.length == 0) {
			$('.bag_items').html('<h2>Your shopping bag is empty. Use <a href="catalog.html">Catalog</a> to add new items</h2>');
		} else{
			for (var i = 0; i < bagStorage.items.length; i++) {
				generateItem(i, bagStorage);
			}
		}
		addListeners();
		calculateBag();
	});
}

//Bag functional

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
	console.log(bagStorage.items.length);
	if (bagStorage != null && bagStorage.items.length != 0) {
		for (var i = 0; i < bagStorage.items.length; i++) {
			generateItem(i, bagStorage);
		}
	} else if(bagStorage == null || bagStorage.items.length == 0){
		$('.bag_items').html('<h2>Your shopping bag is empty. Use <a href="catalog.html">Catalog</a> to add new items</h2>');
	}
	addListeners();
	calculateBag();
});