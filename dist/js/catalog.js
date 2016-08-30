'use strict'
$(document).ready(function(){
	var browserMinWidth;

	filtersFunctional();
	bag.calculate();

	$(window).resize(function() {
        filtersFunctional();
        popup.toCenter();
    });

	window.onorientationchange = function() {
        filtersFunctional();
        popup.toCenter();
    };

    //Filters functionality
	function filtersFunctional(){
		browserMinWidth = document.documentElement.clientWidth;
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
					optionParent = option.parent();
					if (option.hasClass('checked')) {
						option.removeClass('checked');
						optionParent.parent().removeClass('selected');
						//Request to the server imitation
						localStorage.setItem(optionParent.siblings('.filter_name').text(),'Not selected');
						$($('.filters_toolbar_list .filter_value')[optionIndex]).html(optionParent.siblings('.filter_name').text());
						$($('.filters_toolbar_list .filter_value')[optionIndex]).removeClass('checked');
					} else{
						$(optionParent).find('.checked').removeClass('checked');
						option.addClass('checked');
						optionParent.parent().addClass('selected');
						optionParent.siblings('.filter_value').html(option.text());
						//Request to the server imitation
						localStorage.setItem(optionParent.siblings('.filter_name').text(),option.text());
						$($('.filters_toolbar_list .filter_value')[optionIndex]).addClass('checked');
						$($('.filters_toolbar_list .filter_value')[optionIndex]).html(option.text());
					}
				});
			}
		}

		//Script for tablet & mobile resolutions

		function slideFilterHorizontally(e,elem,touchModel){
        	var list = elem;
        	e.stopPropagation();
        	var rangeClientOffset = $(list).offset().left;

        	//Checking the type of user device
        	if(touchModel) {
        		// e.preventDefault() important for the functioning on desctop browsers!
        		// e.preventDefault();
        		var clientX = e.targetTouches[0].clientX;
        		document.addEventListener("touchmove", moveHandler);
        		document.addEventListener("touchend", removeDocListener);
        		
        		// console.log('dragModel', dragModel);
        	} else {
        		var clientX = e.clientX;
        		document.addEventListener("mousemove", moveHandler);
	            document.addEventListener("mouseup",removeDocListener);
        		// alert(e.isDefaultPrevented());
        		// console.log('dragModel', dragModel);
        	} 
        	
            
            function removeDocListener(e){
            	e.stopPropagation();
            	filtersStabilization(list);
            	if (touchModel) {
					document.removeEventListener("touchmove", moveHandler);
            		document.removeEventListener("touchend", removeDocListener);
	        	} else{
	        		document.removeEventListener("mousemove", moveHandler);
            		document.removeEventListener("mouseup", removeDocListener);
            		// console.log('removed EventListeners on ', dragModel);
	        	}
            }

            function moveHandler(e) {
            	e.stopPropagation();
            	if (touchModel) {
            		var deltaX = clientX - e.targetTouches[0].clientX;
            	} else {
            		var deltaX = clientX - e.clientX;
            	}
                var offset = rangeClientOffset - deltaX;
                // console.log(offset);
                $(list).css("transform","translate3d("+ offset +"px, 0px, 0px)");
                selectLeftmostElement(list);
            }
        }

        //Function to set the item into leftmost position
        function setLeftmostPosition(element){
        	var elemOffset = $(element).position();
			var list = $(element).parent();
			var rangeClientOffset = $(list[0]).offset().left;
			var listOffset = -(elemOffset.left - parseFloat(list.css('padding-left')) - rangeClientOffset);
			$(list).css("transform","translate3d("+ listOffset +"px, 0px, 0px)");
        }

        //Function to select leftmost item while dragging
        function selectLeftmostElement(filtersList){
        	var listLeftPadding = parseFloat($(filtersList).css('padding-left'));
        	var optionsList = $(filtersList).children('.filter_option');
        	var elemLeftPosition;
        	for (var i = 0; i < optionsList.length; i++) {
        		elemLeftPosition = optionsList[i].getBoundingClientRect().left;
        		//drag option 1
        		// if (elemLeftPosition > 0 && elemLeftPosition < ($(optionsList[i]).width()/10 + listLeftPadding)) {

        		//drag option 2
        		if (elemLeftPosition > 0) {

        			$($(optionsList[i]).siblings('.filter_option')).removeClass('checked');
        			$(optionsList[i]).addClass('checked');
        			setLeftmostPosition(optionsList[i]);
        			approving.toolbar(optionsList[i]);
        			break;
        		}
        	}
        }

        function filtersStabilization(filtersList){
        	var optionsList = $(filtersList).children('.filter_option');
        	var firstElemet = $(optionsList).first();
        	var lastElement = $(optionsList).last();
        	if (lastElement[0].getBoundingClientRect().left < 0) {
        		setLeftmostPosition(lastElement);
        	}
        	//Exception for drag option 1
        	// if (firstElemet[0].getBoundingClientRect().left > 0) {
        	// 	setLeftmostPosition(firstElemet);
        	// }
        	return false;
        }

        //Set of functions for approving filters
        var approving = {
        	thisIndex : '',
			parentIndex : '',
			setIndexes: function(elem){
				approving.thisIndex = +$(elem).attr('data-id');
				approving.parentIndex = $(elem).parent('.options_list').parent().index();
			},
			//Approving with filters toolbar
			toolbar: function(elem){
				approving.setIndexes(elem);
				if ($(elem).text() == "Not Selected") {
					$($('.filters_toolbar_list .filter_value')[approving.parentIndex]).removeClass('checked');
					$($('.filters_toolbar_list .filter_value')[approving.parentIndex]).html($($($(elem)).parent()).siblings('h5').text());
				} else{
					$($('.filters_toolbar_list .filter_value')[approving.parentIndex]).addClass('checked');
					$($('.filters_toolbar_list .filter_value')[approving.parentIndex]).html($(elem).text());
				}
			},
        	//Approving with desctop filters
			filters: function(elem){
				approving.setIndexes(elem);
				if ($(elem).text() == "Not Selected") {
					$($($('.filters_wrap .options_list')[approving.parentIndex]).children()).removeClass('checked');
					$($('.filters_wrap .filter')[approving.parentIndex]).removeClass('selected');
					$($('.filters_wrap .filter_value')[approving.parentIndex]).html('');
				} else{
					$($($($('.filters_wrap .options_list')[approving.parentIndex]).find('.filter_option')[approving.thisIndex]).siblings()).removeClass('checked');
					$($($('.filters_wrap .options_list')[approving.parentIndex]).find('.filter_option')[approving.thisIndex]).addClass('checked');
					$($('.filters_wrap .filter')[approving.parentIndex]).addClass('selected');
					$($('.filters_wrap .filter_value')[approving.parentIndex]).html($(elem).text());
				}
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
			//Toolbar opening
			$('.filters_toolbar').click(function(e){
				e.stopPropagation();
				if (!$(this).parent().hasClass('popup_opened')) {
					var filtersChilds = document.getElementsByClassName('filters_list');
					var filtersClone = filtersChilds[0].cloneNode(true);
					e.stopPropagation();

					document.getElementsByClassName('popup_wrap')[0].appendChild(filtersClone);

					var filtersLists = $('.popup_wrap .options_list');

					for (var i = 0; i < filtersLists.length; i++) {
						var notSelected = document.createElement('li');
						$(notSelected).attr({id: 'not_selected'});
						$(notSelected).addClass('filter_option')
						notSelected.innerHTML = 'Not Selected';
						var filter = filtersLists[i];
						filter.insertBefore(notSelected, filter.firstElementChild);
					}

					$(".filters_popup").addClass('popup_opened');
					$(".popup_wrap").css({display: 'block'});
					toolbar.addClass('fixed');
					$('body').addClass('popup_open');

					//Default leftmost positions with opening popup 1
					var optionsListsArr = $('.filters_popup .options_list');
					for (var i = 0; i < optionsListsArr.length; i++) {
						var optionsArr = $(optionsListsArr[i]).children('.filter_option');
						for (var j = 0; j < optionsArr.length; j++) {
							if ($(optionsArr[j]).hasClass('checked')) {
								setLeftmostPosition(optionsArr[j]);
								break;
							}
						}
					}
					
					//Default leftmost positions with opening popup 2
					// var optionsArr = $('.filters_popup .filter_option');
					// for (var i = 0; i <= optionsArr.length; i++) {
					// 	if ($(optionsArr[i]).hasClass('checked')) {
					// 		$(optionsArr[i]).prependTo($(optionsArr[i]).parent());
					// 	}
					// }

					$('.filters_popup .filter_option').click(function(e){
						e.preventDefault();
						e.stopPropagation();
						$(this).siblings('.checked').removeClass('checked');
						$(this).addClass('checked');
						
						// Leftmost position onclick 1
						// $(this).prependTo($(this).parent());

						// Leftmost position onclick 2
						$($(this).parent()).css({transition: '.2s transform'});
						setTimeout(function(){
							$($(this).parent()).css({transition: ''});
						}.bind(this), 200);

						setLeftmostPosition(this);
						approving.toolbar(this);
					});

					if('onmousedown' in window) {
				        $('.filters_popup .options_list').mousedown(function(e){
				        	e.preventDefault();
				        	slideFilterHorizontally(e, this, false);
				        });
				    }
				    if('ontouchstart' in window) {
				        $('.filters_popup .options_list').bind('touchstart',function(e){
				        	slideFilterHorizontally(e, this, true);
				        });;
				    }


					// Draggable lists with JQueryUI
					// $('.popup_wrap .options_list').draggable({
					//    axis:'x',
					//    revert: true,
					//    snap: true
					// });
				}
			});

			//Toolbar close function
			function closeFilters(){
				var popupWrap = document.getElementsByClassName('popup_wrap')[0];
				var optionsListsArr = $('.filters_popup .options_list');
				for (var i = 0; i < optionsListsArr.length; i++) {
					var optionsArr = $(optionsListsArr[i]).children('.filter_option');
					for (var j = 0; j < optionsArr.length; j++) {
						if ($(optionsArr[j]).hasClass('checked')) {
							approving.filters(optionsArr[j]);
							break;
						}
					}
				}

				popupWrap.removeChild(popupWrap.lastChild);
				$(".popup_opened").removeClass('popup_opened');
				$(".popup_wrap").css({display: 'none'});
				$('body').removeClass('popup_open');

				var headerDiv = $('header');
				var headerHeight = -parseFloat(headerDiv.css('height'));
				var headerOffset = headerDiv.offset().top - $(window).scrollTop();

				if (headerOffset > headerHeight) {
					toolbar.removeClass('fixed');
				}
			}

			$('.close_filters').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				closeFilters();
			});
			// $('html').click(function(){
			// 	closeFilters();
			// });
		}
	}

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
});