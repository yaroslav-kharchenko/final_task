// 'use strict'

var Data = {
	items: [
		{
			id: 1,
			imgsrc: 'img/catalog/catalog_item_1.jpg',
			name: 'Dark classic fit suit',
			price: 180.60,
			color: ['Black','Blue'],
			size: ['UK 52','UK 54','UK 56'],
			quantity: 1,
			info: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs and a subtle stripe pattern throughout.',
			imgBaseSrc: {
				min: ['img/item/img_base/item_img_1.jpg','img/item/img_base/item_img_2.jpg','img/item/img_base/item_img_2.jpg'],
				full: ['img/item/img_base/item_img_1_small.jpg','img/item/img_base/item_img_2_small.jpg','img/item/img_base/item_img_3_small.jpg']
			}
		},
		{
			id: 2,
			imgsrc: 'img/catalog/catalog_item_2.jpg',
			name: 'Neck Knitted Jumper',
			price: 76.25,
			color: ['Blue','Red','Golden'],
			size: ['UK 20','UK 22'],
			quantity: 1,
			info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae quia at nisi deleniti veritatis dolorum, quaerat delectus, error ducimus perspiciatis.'
		},
		{
			id: 3,
			imgsrc: 'img/catalog/catalog_item_3.jpg',
			name: 'Turtle Neck Jumper in Rib',
			price: 130.25,
			color: ['Blue','Red','Golden'],
			size: ['UK 18L','UK 20'],
			quantity: 1,
			info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quibusdam itaque deserunt, libero saepe quis excepturi eum.'
		},
		{
			id: 4,
			imgsrc: 'img/catalog/catalog_item_4.jpg',
			name: 'With Patchwork Crochet',
			price: 80.60,
			color: ['Blue','Black','Green'],
			size: ['UK 18','UK 20S','UK 20L'],
			quantity: 1,
			info: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs and a subtle stripe pattern throughout.'
			
		}
	]
}

var shoppingBag = {};
// var serialData = JSON.stringify(Data);
// localStorage.setItem("catalogData", serialData);