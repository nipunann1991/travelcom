import { Component, OnInit } from '@angular/core';
import { Router  , ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { serverURL } from  "../../../app.global";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hoteldata',
  templateUrl: './hoteldata.component.html',
  styleUrls: ['./hoteldata.component.css']
})
export class HoteldataComponent implements OnInit {

	hotelID: number; service_list : any;

	hotel_details : any = {
		 ptype_id: '',
		 hotel_name: '',
		 hotel_desc: '',
		 address: '',
		 city: '', 
		 province: '',
		 tel1: '',
		 tel2: '',
		 email: '',
		 website: '',
		 image_url: ''

	};

	facilities : any = {}; selected_card_list : any = {}; card_list : any;


  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.hotelID = this.activeRoute.snapshot.params['id'];
  	this.getHotel();  
  	this.getServiceList();
  	this.getCardList();
  }

 public getHotel() {

	  	let hotel_id : any = { 'hotel_id': this.hotelID };
	  
	  	const params = new HttpParams({
	 		fromObject : hotel_id
	 	});
	 

		let promise = new Promise((resolve, reject) => {

		 	this.http.post(serverURL+'/HotelController/getSingleHotel',params)
	      	.toPromise()
	      	.then(
	        	res => { 
	        		 
	         		let response : any  = res;

	         		if (response.status == 200 ) {
 					 

 						let hotel_data = response.data[0];
 						let address, tel;

 						if (hotel_data.address1 != '' && hotel_data.address2 != '' ) {
 							address = hotel_data.address1+ ', '+hotel_data.address2+', '+hotel_data.city+', '+hotel_data.country
 						}else{
 							address = hotel_data.address1+ ', '+hotel_data.city+', '+hotel_data.county

 						}

 						if (hotel_data.tel1 != '' && hotel_data.tel2 != '' ) {
 							tel = hotel_data.tel1+ ', '+hotel_data.tel2;
 						}else{
 							tel = hotel_data.tel1

 						}

 						this.hotel_details = {
							ptype_id: hotel_data.ptype_id,
							hotel_name: hotel_data.hotel_name,
							city: hotel_data.city,
							hotel_desc: hotel_data.hotel_desc,
							address: address, 
							province: hotel_data.province,
							tel: tel, 
							email: hotel_data.email,
							website: hotel_data.website,
							image_url: hotel_data.image_url

						};

	 					$('.hotel_img').attr('style','background-image: url('+this.hotel_details.image_url+')');

 						//console.log(this.hotel_details);


	         		}else{
	         			 
	         		}

	         		 
	          		resolve();
	        	}
	      );
		   
		   
		});
			
			return promise;

  	}


  	getServiceList() : any { 

  		let promise = new Promise((resolve, reject) => {

		  	this.http.get(serverURL+'/HotelController/getHotelServiceList')
		    .toPromise()
	      	.then(
		        res => { 

		 			this.service_list = res; 
		 			this.service_list = this.service_list.data;  

		 			this.getHotelProvidedServices();
 

		 			resolve();

		        },
		        err => {
		          console.log(err);
		        }
		    );


		});
			
		return promise;

	}


	getCardList() : any { 

  		let promise = new Promise((resolve, reject) => {

		  	this.http.get(serverURL+'/HotelController/getHotelCardsAcceptedList')
		    .toPromise()
	      	.then(
		        res => { 

		 			this.card_list = res; 
		 			this.card_list = this.card_list.data;  

		 			this.getHotelAcceptedCards(); 

		 			resolve();

		        },
		        err => {
		          console.log(err);
		        }
		    );


		});
			
		return promise;

	}

	getHotelProvidedServices() : any {  

	    let hotel_id : any = { 'hotel_id': this.hotelID };
	  
	  	const params = new HttpParams({
	 		fromObject : hotel_id
	 	});
	 

		let promise = new Promise((resolve, reject) => {

		 	this.http.post(serverURL+'/HotelController/getHotelProvidedServices',params)
	      	.toPromise()
	      	.then(
	        	res => { 
	        		 
	         		let response : any  = res;

	         		if (response.status == 200 ) { 

 						this.facilities = response.data;

 						let alias, isActive;

			 			for (var i = 0; i <  this.service_list.length; i++) { 
			 				
			 				alias = ''+this.service_list[i].alias;
			 				isActive = '';

			 				this.facilities[0][alias] == 1 ? isActive = true :  isActive = false; 

			 				this.service_list[i].isActive = isActive;
		 
			 				
			 			}

			 			console.log( this.service_list  );
 						
 
	         		}else{
	         			 
	         		}

	         		 
	          		resolve();
	        	}
	      );
		   
		   
		});
			
		return promise;

	}

	getHotelAcceptedCards() : any {  

	    let hotel_id : any = { 'hotel_id': this.hotelID };
	  
	  	const params = new HttpParams({
	 		fromObject : hotel_id
	 	});
	 

		let promise = new Promise((resolve, reject) => {

		 	this.http.post(serverURL+'/HotelController/getHotelAcceptedCards',params)
	      	.toPromise()
	      	.then(
	        	res => { 
	        		 
	         		let response : any  = res;

	         		if (response.status == 200 ) { 

 						this.selected_card_list = response.data;

 						let alias, isActive;

			 			for (var i = 0; i < this.card_list.length; i++) { 
			 				
			 				alias = ''+this.card_list[i].alias;
			 				isActive = '';

			 				this.selected_card_list[0][alias] == 1 ? isActive = true :  isActive = false; 

			 				this.card_list[i].isActive = isActive;
		 
			 				
			 			}

			 			console.log( this.card_list  );
 						
 
	         		}else{
	         			 
	         		}

	         		 
	          		resolve();
	        	}
	      );
		   
		   
		});
			
		return promise;

	}

}





