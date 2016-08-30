'use strict'

var bagStorage = JSON.parse(localStorage.getItem('bagStorage'));

//Shopping bag content generation
function generateItem(iteratorValue, storage){
	var i = iteratorValue;
	var itemStr = "";
	//Img
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
	itemStr += '<a href="#" class="remove_btn">Remove item</a>';
	//append to page
	var itemElement = $('<div></div>');
	itemElement.addClass('item');
	itemElement.attr('data-bag-id', iteratorValue);
	itemElement.html(itemStr);
	$(".bag_items").append(itemElement);
}

//Adding listeners
function addListeners(){
	$('.empty_bag').click(function(event) {
		event.preventDefault();
		localStorage.removeItem('bagStorage');
		$('.bag_items').html('<h2>Your shopping bag is empty. Use <a href="catalog.html">Catalog</a> to add new items</h2>')
		bag.calculate();
	});
	$('.buy_btn').click(function(event) {
		event.preventDefault();
		localStorage.removeItem('bagStorage');
		$('.bag_items').html('<h2>Thank you for your purchase</h2>')
		bag.calculate();
	});
	$('.remove_btn').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
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
		bag.calculate();
	});
}


$(document).ready(function(){
	if (bagStorage != null && bagStorage.items.length != 0) {
		for (var i = 0; i < bagStorage.items.length; i++) {
			generateItem(i, bagStorage);
		}
	} else if(bagStorage == null || bagStorage.items.length == 0){
		$('.bag_items').html('<h2>Your shopping bag is empty. Use <a href="catalog.html">Catalog</a> to add new items</h2>');
	}
	addListeners();
	bag.calculate();

	//Event on some changes in other pages
	window.addEventListener('storage',function(){
		// bag.calculate();
		window.location.reload(); //Bug in IE
	});
});