import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

import { serverURL } from  "../../../app.global";
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

	province : any; property_type : any; service_list : any; fileToUpload: File = null;
	isChecked: boolean = false;

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

	facilities : any = {};
	


  constructor(private http: HttpClient, private router: Router, private bootstrapGrowlService: BootstrapGrowlService) { 

  }

  ngOnInit() { 

  	this.getProvince();
  	this.getServiceList();
  	this.getPropertyType();
 	
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

	 			console.log(this.property_type[0].ptype_id)	 
	 			 
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

	checkValue(event: any, alias: any){
	    console.log(event,alias);

	    let status = this.facilities[alias];

	    if (status == 0) {
	    	this.facilities[alias] = 1
	    }else{
	    	this.facilities[alias] = 0 
	    }

	    console.log(this.facilities);
	      


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

	         			alert('added successfully');  

	         			const params1 = new HttpParams({
					 		fromObject : this.facilities
					 	});
	         			
	         			console.log(this.facilities)

	         			this.http.post(serverURL+'/HotelController/addFacilities',params1)
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

	         		}else{
	         			// error msg code...
	         		}

	         		// if (condition) {
	         		// 	// code...
	         		// }
	         		// ; 
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
	 			

	 			console.log(this.facilities)
	 		 
	        },
	        err => {
	          console.log(err);
	        }
	    );

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
 
	          /**
	          // You could upload it like this:
	          const formData = new FormData()
	          formData.append('logo', file, relativePath)
	 
	          // Headers
	         
	 
	          
	          **/
	 
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
		    	 
		    	self.addHotel();

		    }
		  })

	}


}
