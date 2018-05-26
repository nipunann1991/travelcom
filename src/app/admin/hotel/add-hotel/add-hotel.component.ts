import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

import { serverURL, fileManager } from  "../../../app.global";
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
 

declare var bootbox:any
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})


export class AddHotelComponent implements OnInit {

	public files: UploadFile[] = [];

	province : any; property_type : any; service_list : any; card_list : any; fileToUpload: File = null;
	isCheckedServices: boolean = false; isCheckedCards: boolean = false; 

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

	facilities : any = {}; hotel_categories : any = {}; selected_card_list : any = {}; room_type : any = []; room_type_txt : any; categories : any = [];
	


  constructor(private http: HttpClient, private router: Router, private bootstrapGrowlService: BootstrapGrowlService) { 

  }

  ngOnInit() { 

  	this.getProvince();
  	this.getServiceList();
  	this.getPropertyType();
  	this.getCardList();
   	this.getCategories();

  }


  addRoomTypes(): any {

  	let x =  { 'rt_name': this.room_type_txt }
  	this.room_type.push(x);

  	this.room_type_txt = '';
 

  }

  removeIndex(i){ 
  	this.room_type.splice(i, 1);
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





	getPropertyType() : any {

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
 

	}


	checkValueCategories(alias: any){ 

	    let status = this.hotel_categories[alias];

	    if (status == 0) {
	    	this.hotel_categories[alias] = 1
	    }else{
	    	this.hotel_categories[alias] = 0 
	    }


	    console.log(this.hotel_categories);
 

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

  	public addHotel() {

	  	let h = this.hotel_details;
	  
	  	const params = new HttpParams({
	 		fromObject : this.hotel_details
	 	});
	 

		let promise = new Promise((resolve, reject) => {

		 	this.http.post(serverURL+'/HotelController/addHotel',params)
	      	.toPromise()
	      	.then(
	        	res => { 
	        		 
	         		let response : any  = res;

	         		if (response.status == 200 ) {

	         			this.facilities['hotel_id'] = response.data.inserted_id
	         			this.hotel_categories['hotel_id'] = response.data.inserted_id
 
	         			const params1 = new HttpParams({
					 		fromObject : this.facilities
					 	});

					 	
	         			 
	         			this.http.post(serverURL+'/HotelController/addFacilities',params1)
				      	.toPromise()
				      	.then(
				        	res => { 
				        		 
				         		let response : any  = res;

				         		console.log(response);

				         		if (response.status == 200 ) { 
 
				         			this.bootstrapGrowlService.addAlert("Hotel has been created successfully", BootstrapAlertType.SUCCESS);

				         		}else{
				         			 
				         		}

				         		 
				          		resolve();
				        	}
				   	 	); 

				      	const params3 = new HttpParams({
					 		fromObject : this.hotel_categories
					 	});

				   	 	this.http.post(serverURL+'/HotelController/addCategories',params3)
				      	.toPromise()
				      	.then(
				        	res => { 
				        		 
				         		let response : any  = res;

				         		console.log(response);

				         		if (response.status == 200 ) { 
  

				         		}else{
				         			 
				         		}

				         		 
				          		resolve();
				        	}
				    	); 

         			alert('added successfully');  

         			this.selected_card_list['hotel_id'] = response.data.inserted_id

         			const params2 = new HttpParams({
				 		fromObject : this.selected_card_list
				 	});
         			 
         			this.http.post(serverURL+'/HotelController/addCardsAccepted',params2)
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

				    if (this.room_type.length > 0) {

				    	for (var i =0; i < this.room_type.length; i++) {
				    		this.room_type[i]['hotel_id'] = response.data.inserted_id;


				    			const params3 = new HttpParams({
							 		fromObject : this.room_type[i]
							 	});
			         			 
			         			this.http.post(serverURL+'/HotelController/addRoomType',params3)
						      	.toPromise()
						      	.then(
						        	res => { 
						        		 
						         		let response : any  = res;

						         		console.log(response);

						         		if (response.status == 200 ) {   

						         			//this.bootstrapGrowlService.addAlert("Added accepetd cards successfully", BootstrapAlertType.SUCCESS);

						         		}else{
						         			 
						         		}

						         		 
						          		resolve();
						        	}
							    );
				    	}
				    	// code...

				    	console.log(this.room_type);
				    }




	         		}else{
	         			// error msg code...
	         		}


	         		this.router.navigate(['/admin/hotel/view-hotel/'+response.data.inserted_id])
 
	          		resolve();
	        	}
	      );
		   
		   
		});
			
			return promise;

  	}

	getServiceList() : any { 

	  	this.http.get(serverURL+'/HotelController/getHotelServiceList')
	    .subscribe(
	        res => { 
	 			this.service_list = res; 
	 			this.service_list = this.service_list.data 

	 			for (var i = 0; i < this.service_list.length; i++) {

	 				  	let key = this.service_list[i].alias;
	 				
	 					this.facilities[key] = 0; 
	 			} 

	 			//console.log(this.facilities)
	 		 
	        },
	        err => {
	          console.log(err);
	        }
	    );

	}


	getCategories() : any {

	  	this.http.get(serverURL+'/HotelController/getCategories')
	    .subscribe(
	        res => { 
	 			this.categories = res; 
	 			this.categories = this.categories.data

	 			for (var i = 0; i < this.categories.length; i++) {

	 				  	let key = this.categories[i].alias;
	 				
	 					this.hotel_categories[key] = 0; 
	 			} 
 
	        },
	        err => {
	          console.log(err);
	        }
	    );

	}

	getCardList()  : any { 

	  	this.http.get(serverURL+'/HotelController/getHotelCardsAcceptedList')
	    .subscribe(
	        res => { 
	 			this.card_list = res; 
	 			this.card_list = this.card_list.data 

	 			for (var i = 0; i < this.card_list.length; i++) {

	 				  	let key = this.card_list[i].alias;

	 				  	this.selected_card_list[key] = 0;
 
	 			} 
	 		 
	        },
	        err => {
	          console.log(err);
	        }
	    );

	}


	getError(){
		this.bootstrapGrowlService.addAlert("Uploaded file is too large. Please Upload files below 1.5MB. ", BootstrapAlertType.DANGER);
		 
	}

  	 
	public dropped(event: UploadEvent) {
	    this.files = event.files; 
	    let upload_file;
	    let error = 0;

	    for (const droppedFile of event.files) {
	 //
	 console.log(event.files)
	      // Is it a file?
	      if (droppedFile.fileEntry.isFile) {
		        
		        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
		        
		        fileEntry.file((file: File) => {
		        	  
		        	
		        	if (file.size > 1500000 ) {
		        		$('#max_upload').trigger('click');
		        		
		        	}else if (file.size > 1500000 ) {

		        	}else{

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
			 				 

			 				this.hotel_details.image_url =  upload_file.data.new_file

			 				$('.hotel_img').attr('style','background-image: url('+fileManager+""+upload_file.data.new_file+')');
			             	$('file-drop .content .loader').remove();

			          	})
 
	         

		        	}
	 
	 
	        });

		        if (error == 1) {
		        	 this.getError();
		        }
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
   		
   		//self.addHotel();

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
		    	 
		    	self.addHotel();

		    }
		  })

	}


}
