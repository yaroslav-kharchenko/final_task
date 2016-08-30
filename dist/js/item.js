'use strict'

//Product page content generation
var currentItem = JSON.parse(localStorage.getItem('itemData'));

function generateItemPage(){
	var pageStr = "";
	//Header
	pageStr += '<h2 class="item_name">' + currentItem.name + '</h2>';
	//Price
	pageStr += '<p class="item_price"> £' + currentItem.price.toFixed(2) + '</p>';
	//Info
	pageStr += '<cite class="item_info">' + currentItem.info + '</cite>';
	//Size options list
	pageStr += '<section class="item_size"><h4>Size</h4><ul class = "options">';
	for (var i = 0; i < currentItem.size.length; i++) {
		pageStr += '<li class="option"><a href="#">' + currentItem.size[i] + '</a></li>';
	}
	pageStr += '</ul></section>'
	//Color options list
	pageStr += '<section class="item_color"><h4>Color</h4><ul class = "options">';
	for (var i = 0; i < currentItem.color.length; i++) {
		pageStr += '<li class="option"><a href="#">' + currentItem.color[i] + '</a></li>';
	}
	pageStr += '</ul></section>'
	//Button
	pageStr += '<a href="#" class="add_btn">Add to bag</a>'
	//Appending to page
	$('.item_details').html(pageStr);
	addListeners();
}

//Adding listeners
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
		bag.addItem('itemData');
	});
}

function generateGallery(){
	var imgBase = currentItem.imgBaseSrc;
	// console.log(imgBase);
	var galleryNavStr = '<ul>';
	for(var i = 0; i < imgBase.min.length; i++){
		galleryNavStr += '<li><a href="#" class="small_img"><img src="'
		+ imgBase.min[i] + '"></a></li>';
	}
	galleryNavStr += '</ul>';
	$('.img_nav').html(galleryNavStr);
	$($('.small_img')[0]).addClass('active');
	$('.main_img').html('<img src="'+ imgBase.full[0] + '"></a></li>')

}

$(document).ready(function(){
	generateItemPage();
	bag.calculate();
	generateGallery();
	
	//Gallery functional
	$('.small_img').click(function(event) {
		event.preventDefault();
		$(this).parent().parent().find('.active').removeClass('active');
		$(this).addClass('active');
		$('.main_img').children('img').attr({
			src: currentItem.imgBaseSrc.full[$(this).parent().index()]
		});
	});
	
	//Default values for options
	$($('.item_size .option')[0]).addClass('checked');
	$($('.item_color .option')[0]).addClass('checked');

	//Event on some changes in other pages
	window.addEventListener('storage',function(){
		bag.calculate();
	});
});