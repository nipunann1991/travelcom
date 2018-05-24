import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	$('.camera_wrap').camera({ 
		loader: 'bar',
		pagination: false,
		thumbnails: true,
		hover: false,
		opacityOnGrid: false,
		imagePath: '../images/',
		overlayer: true,
		fx: 'topLeftBottomRight', 
  	}); //the basic method

  	
  
  }

}
