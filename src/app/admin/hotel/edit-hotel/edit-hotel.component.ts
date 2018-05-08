import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

import { serverURL } from  "../../../app.global";
import { Router, ActivatedRoute } from "@angular/router";
import { ViewChild } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
 

declare var bootbox:any
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['../add-hotel/add-hotel.component.css']
})

export class EditHotelComponent implements OnInit {

	public files: UploadFile[] = [];

	hotelID: number; province : any; property_type : any; service_list : any; card_list : any; fileToUpload: File = null;
	isCheckedServices: boolean = false; isCheckedCards: boolean = false; x : number = 3;

	hotel_details : any = {
		 ptype_id: '',
		 hotel_name: '',
		 hotel_desc: '',
		 address1: '',
		 address2: '',
		 city: '', 
		 province: '',
		 tel1: '',
		 tel2: '',
		 email: '',
		 website: '',
		 image_url: ''

	};

	facilities : any = {}; selected_card_list : any = {}; 
	


  constructor(private http: HttpClient, private router: Router, private bootstrapGrowlService: BootstrapGrowlService, private activeRoute: ActivatedRoute) { 

  }

  ngOnInit() { 
  	this.hotelID = this.activeRoute.snapshot.params['id'];
  	this.getProvince();
  	this.getServiceList();
  	this.getPropertyType();
  	this.getCardList();
  	this.getHotelData();
 	
  }

  
  getProvince() : any {

  	this.http.get(serverURL+'/HotelController/getProvince')
    .subscribe(
        res => { 
 			this.province = res; 
 			this.province = this.province.data  		 
        },
        err => {
          console.log(err);
        }
    );

  }


	getHotelData() : any {

		let hotel_id : any = { 'hotel_id': this.hotelID };

		const params = new HttpParams({
	 		fromObject : hotel_id
	 	});
	 
 
	  	this.http.post(serverURL+'/HotelController/getHotelData', params)
	    .subscribe(
	        res => { 
	 			this.hotel_details = res; 
	 			this.hotel_details = this.hotel_details.data[0] 

	 			console.log(this.hotel_details)
	 		 
	        },
	        err => {
	          console.log(err);
	        }
	    );

	}


	getPropertyType(){

		this.http.get(serverURL+'/HotelController/getPropertyType')
	    .subscribe(
	        res => { 
	 			this.property_type = res; 
	 			this.property_type = this.property_type.data

	 			 
	 			this.hotel_details.ptype_id = this.property_type[0].ptype_id;
	 		 
	        },
	        err => {
	          console.log(err);
	        }
	    );

	}

  	setProvince(val) {
	    this.hotel_details.province = val;
	}

	setPropertyType(val) {
	    this.hotel_details.ptype_id = val;
	}

	checkValueServices(alias: any){ 

	    let status = this.facilities[alias];

	    if (status == 0) {
	    	this.facilities[alias] = 1
	    }else{
	    	this.facilities[alias] = 0 
	    }

	    console.log(this.facilities); 

	}


	checkValueCards(alias: any){
	     
	    let status = this.selected_card_list[alias];

	    if (status == 0) {
	    	this.selected_card_list[alias] = 1
	    }else{
	    	this.selected_card_list[alias] = 0 
	    }

	    console.log(this.selected_card_list); 

	}

  	public editHotel() {

	  	let h = this.hotel_details;
	  
	  	const params = new HttpParams({
	 		fromObject : this.hotel_details
	 	});
	 

		let promise = new Promise((resolve, reject) => {

		 	this.http.post(serverURL+'/HotelController/updateHotelDetails',params)
	      	.toPromise()
	      	.then(
	        	res => { 
	        		 
	         		let response : any  = res;

	         		if (response.status == 200 ) {

	         			this.facilities['hotel_id'] = this.hotelID;



	         			alert('added successfully');  

	         			const params1 = new HttpParams({
					 		fromObject : this.facilities
					 	});

					 	console.log(this.facilities);
	         			 
	         			this.http.post(serverURL+'/HotelController/editFacilities',params1)
				      	.toPromise()
				      	.then(
				        	res => { 
				        		 
				         		let response : any  = res;

				         		console.log(response);

				         		if (response.status == 200 ) { 

				         			alert('');   

				         			this.bootstrapGrowlService.addAlert("Added facilities successfully", BootstrapAlertType.SUCCESS);

				         		}else{
				         			 
				         		}

				         		 
				          		resolve();
				        	}
				    ); 

         			alert('added successfully');  

         			this.selected_card_list['hotel_id'] = this.hotelID;

         			const params2 = new HttpParams({
				 		fromObject : this.selected_card_list
				 	});
         			 
         			this.http.post(serverURL+'/HotelController/editCardsAccepted',params2)
			      	.toPromise()
			      	.then(
			        	res => { 
			        		 
			         		let response : any  = res;

			         		console.log(response);

			         		if (response.status == 200 ) {   

			         			this.bootstrapGrowlService.addAlert("Added accepetd cards successfully", BootstrapAlertType.SUCCESS);

			         		}else{
			         			 
			         		}

			         		 
			          		resolve();
			        	}
				    );




	         		}else{
	         			// error msg code...
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

 						this.facilities = response.data[0];

 						console.log(this.facilities)

 						let alias, isActive;

			 			for (var i = 0; i <  this.service_list.length; i++) { 
			 				
			 				alias = ''+this.service_list[i].alias;
			 				isActive = '';

			 				this.facilities[alias] == 1 ? isActive = true :  isActive = false; 

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

	getCardList()  : any { 

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

 						this.selected_card_list = response.data[0];

 						let alias, isActive;

			 			for (var i = 0; i < this.card_list.length; i++) { 
			 				
			 				alias = ''+this.card_list[i].alias;
			 				isActive = '';

			 				this.selected_card_list[alias] == 1 ? isActive = true :  isActive = false; 

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



  	 
	public dropped(event: UploadEvent) {
	    this.files = event.files; 
	    let upload_file;
	    for (const droppedFile of event.files) {
	 
	      // Is it a file?
	      if (droppedFile.fileEntry.isFile) {
		        
		        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
		        fileEntry.file((file: File) => {
	 
	           	$('file-drop .content').append('<div class="ui active loader"></div>');

	          	let fd = new FormData()
	         		 
 			  	fd.append('file', file);
	         	fd.append('name', file.name);
	         	fd.append('item_id', '1');
	 			
	 			var headers = new HttpHeaders();
  				headers.append('Content-Type', 'undefined');

				this.http.post(serverURL+'/HotelController/fileUpload', fd, { headers: headers  })
	          		.subscribe(data => {

	          		upload_file = data
	 				 

	 				this.hotel_details.image_url =  upload_file.data.target_file

	 				$('.hotel_img').attr('style','background-image: url('+upload_file.data.target_file+')');
	             	$('file-drop .content .loader').remove()
	          	})
 
	         
	 
	        });
	      } else {
	        // It was a directory (empty directories are added, otherwise only files)
	        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
	        console.log(droppedFile.relativePath, fileEntry);
	      }
	    }
	  }
	 
	  public fileOver(event){
	    console.log(event);
	  }
	 
	  public fileLeave(event){
	    console.log(event);
	  }

	
	submitForm() : any {
	 
 

   		let self = this;
   		

	  	$('.ui.form')
		  .form({
		    fields: {
		      hotelname   : ['minLength[4]', 'empty'],
		      description : ['minLength[10]', 'empty'],
		      address1 : 	['minLength[2]', 'empty'],
		      city : 		['minLength[2]', 'empty'],
		      tel1 : ['minLength[8]', 'empty']
		    },
		    onSuccess: function(data ){ 
		    	 
		    	self.editHotel();

		    }
		  })

	}

}
