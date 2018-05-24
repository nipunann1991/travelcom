import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

import { serverURL, fileManager } from  "../app.global";
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.css']
})
export class SearchHotelComponent implements OnInit {

  hotel : any = []; property_type: any;  result_length: number; fm: any = fileManager;
  search_param: any; search_param_service: any; title : string; param_title : string;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

	  	ngOnInit() {

	  	this.activatedRoute.queryParams.subscribe((params: Params) => {
	         

	        if ( typeof params['city'] != 'undefined' ) {
	        	this.title = 'Hotels in '+params['city'];
	        	this.search_param = { hotel_name: params['city'] };
	        	this.search_param_service = 'searchHotelFromCity'
	         

	        }else if(params['hotel'] != 'undefined' ){
	        	this.title = 'All Hotels Listed'; 
	        	this.search_param = { status: 1 }; 
	        	this.search_param_service = 'getAllHotels' 
	        	 
	        } 
	        
	         
	    });




	    this.getHotels();
	    this.getPropertyType();

	  }


	  getHotels(){

	  	let self = this;

	  	 const params2 = new HttpParams({
	       fromObject : this.search_param
	     });
	          
	      this.http.post(serverURL+'/HomePageController/'+this.search_param_service ,params2)
	      .toPromise()
	      .then(
	        res => { 
	           
	           let response : any  = res; 

	           if (response.status == 200 ) {   
	              
	 				self.result_length =  response.data.length;
	 				self.hotel = response.data;
 
	           }else{
	              
	           } 
	             
	        }
	      ); 
	  }



	getPropertyType(){


		let self = this; 
	          
	      this.http.get(serverURL+'/HomePageController/getPropertyType')
	      .toPromise()
	      .then(
	        res => { 
	           
	           	let response : any  = res;

 				$('.loader_screen').fadeOut();
	          	

	           if (response.status == 200 ) {   
	               
	 				self.property_type = response.data;

	             	console.log(self.property_type)

	           }else{
	              
	           } 
	             
	        }
	      );

	
	}


	// getCities(){


	// 	let self = this;

	  	  
	          
	//       this.http.get(serverURL+'/HomePageController/getPropertyType')
	//       .toPromise()
	//       .then(
	//         res => { 
	           
	//            let response : any  = res;

	          

	//            if (response.status == 200 ) {   
	               
	//  				self.property_type = response.data;

	//              	console.log(self.property_type)

	//            }else{
	              
	//            } 
	             
	//         }
	//       );

	
	// }

}
