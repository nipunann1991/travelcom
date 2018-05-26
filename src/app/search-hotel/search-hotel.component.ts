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

  hotel : any = []; property_type: any = [];  result_length: number; fm: any = fileManager;
  search_param: any; search_param_service: any; allChecked:boolean = false; otherChecked:boolean = false; title : string; param_title : string;
  property_type_index: any = []; checkbox: number; ads : any; gallery_url: any = this.fm+'ads/';

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

	  	ngOnInit() {

	  	this.activatedRoute.queryParams.subscribe((params: Params) => {
	         
	  		 
	        if ( typeof params['city'] != 'undefined' ) {

	        	this.title = 'Hotels in '+params['city'];
	        	this.search_param = { hotel_name: params['city'] };
	        	this.search_param_service = 'searchHotelFromCity';
	        	this.getHotels();
	         

	        }else if(typeof params['hotels'] != 'undefined' ){
	        	this.title = 'All Hotels Listed'; 
	        	this.search_param = { status: 1 }; 
	        	this.search_param_service = 'getAllHotels';
	        	this.allChecked = true;  
	        	this.getHotels();
	        	 
	        }else if(typeof params['ptype_id'] != 'undefined'){
 

	        	let str = params['ptype_id'].toString();  
	        	let res = str.split(',').join(' OR ptype_id='); 

	        	this.search_param = { ptype_id: res }; 
	        	this.search_param_service = 'searchProperty';
	        	this.getHotels();
	         	
	        }else if(typeof params['category'] != 'undefined'){
  

	        	this.search_param = { category: params['category'] }; 
	        	this.search_param_service = 'searchHotelFromCategory';
	        	this.getHotels();
	         	
	        }else if(typeof params['ads'] != 'undefined'){
	        	this.title = 'All Ads';
	        	this.selectAds();
	        }


	        
	         
	    });

		
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

	 				if(typeof this.search_param['category'] != 'undefined'){
	 					this.title = 'Hotels Listed by '+response.data[0].cat_name; 
	 					 
	 				}
 
	           }else{
	              
	           } 
	             
	        }
	      ); 
	  }


	selectAds(){
	    this.http.get(serverURL+'/AdsController/selectAllAds')
	    .subscribe(
	        res => { 

	          console.log(res)

	          let data : any = res;

	          data = data.data;

	          this.ads = data;  

	          this.result_length = this.ads.length;
	          //console.log(this.ads); 

	        },
	        err => {
	          console.log(err);
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
	             	

	 				//self.property_type = response.data;


	 				for (var i = 0; i < response.data.length; i++) {
	 					self.property_type.push(response.data[i]);
	 					self.property_type[i].checked = false;
	 				}

	 				self.property_type.push({ ptype_id: "0", ptype_name: "All", ptype_color: "", checked: true})

	 				



	             	console.log(self.property_type)

	           }else{
	              
	           } 
	             
	        }
	      );

	
	}

	onCheckboxChange(ptype_id, i){

		if(ptype_id == 0){

			this.router.navigate(['/search-hotel'], { queryParams: { 'hotels': 'all' } });
			this.property_type['6'].checked = true;


		}else{

			this.title = 'Sorted by Property Type'

			if (!this.property_type[i].checked) {

				this.property_type[i].checked = true;
				this.property_type['6'].checked = false;
				this.property_type_index.push(ptype_id);  

			}else{

				this.property_type[i].checked = false; 
				var index = this.property_type_index.indexOf(ptype_id);

				if (index > -1) {
				  this.property_type_index.splice(index, ptype_id);
				}

			}

			if (this.property_type_index.length != 0) {
				this.router.navigate(['/search-hotel'], { queryParams: { 'ptype_id': this.property_type_index } })


			}else{
				this.router.navigate(['/search-hotel'], { queryParams: { 'hotels': 'all' } });
				this.property_type['6'].checked = true;

			}

		}
		

		

	}


}
