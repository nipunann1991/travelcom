import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	
	hotel : any = [];
	dataLoaded : boolean = true;
 
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 5,  'dots': true};
 

slides : any = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
  ];

  constructor() { }

  ngOnInit() {



  	this.hotel = [{
		id: '18753',
		hotel_name: 'Pan Pacific Colombo',
		location: 'Colombo',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: './assets/images/properties1.jpg',
		featured: false,

	},

	{
		id: '18753',
		hotel_name: 'Comfort Inn & Hostel',
		location: 'Nuwaraeliya',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: './assets/images/properties2.jpg',
		featured: true,

	}, {
		id: '18753',
		hotel_name: 'Pan Pacific Colombo',
		location: 'Colombo',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: '../../assets/images/properties1.jpg',
		featured: false,

	},

	{
		id: '18753',
		hotel_name: 'Comfort Inn & Hostel',
		location: 'Nuwaraeliya',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: '',
		featured: true,

	}, {
		id: '18753',
		hotel_name: 'Pan Pacific Colombo',
		location: 'Colombo',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: '../../assets/images/properties1.jpg',
		featured: false,

	},

	{
		id: '18753',
		hotel_name: 'Comfort Inn & Hostel',
		location: 'Nuwaraeliya',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: '',
		featured: true,

	}, 
	{
		id: '18753',
		hotel_name: 'Comfort Inn & Hostel',
		location: 'Nuwaraeliya',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: './assets/images/properties2.jpg',
		featured: true,

	}, {
		id: '18753',
		hotel_name: 'Pan Pacific Colombo',
		location: 'Colombo',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: '../../assets/images/properties1.jpg',
		featured: false,

	},

	{
		id: '18753',
		hotel_name: 'Comfort Inn & Hostel',
		location: 'Nuwaraeliya',
		desc: 'The 5-star Pan Pacific Singapore provides direct access to Marina Square Mall and Suntec Convention Centre.',
		image: '',
		featured: true,

	},

	]

	//  $('.multiple-items, .hotel_list').slick({
	//   infinite: true,
	//   slidesToShow: 4,
	//   slidesToScroll: 4,
	//   dots: true,
	//   responsive: [
	//   	{
	//       breakpoint: 1200,
	//       settings: {
	//         slidesToShow: 3,
	//         slidesToScroll: 3,
	//         infinite: true,
	//         dots: true
	//       }
	//     },
	//     {
	//       breakpoint: 1024,
	//       settings: {
	//         slidesToShow: 2,
	//         slidesToScroll: 2,
	//         infinite: true,
	//         dots: true
	//       }
	//     },
	//     {
	//       breakpoint: 600,
	//       settings: {
	//         slidesToShow: 1,
	//         slidesToScroll: 1
	//       }
	//     },
	     
	//   ]
	// });

  }

}
