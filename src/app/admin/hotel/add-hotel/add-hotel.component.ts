import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { serverURL } from  "../../../app.global";
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})


export class AddHotelComponent implements OnInit {

	public files: UploadFile[] = [];

	province : any; service_list : any; fileToUpload: File = null;

	hotel_details : any = {
		 hotel_name: '',
		 hotel_desc: '',
		 address1: '',
		 address2: '',
		 city: '', 
		 province: '',
		 tel1: '',
		 tel2: '',
		 email: '',
		 website: ''

	};

	 

  constructor(private http: HttpClient, private router: Router) { 

  }

  ngOnInit() {

  	this.getProvince();
  	this.getServiceList();


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

  	setProvince(val) {
	    this.hotel_details.province = val;
	}


  addHotel() : any {

  	let h = this.hotel_details;
  
  	const params = new HttpParams({
 		fromObject : this.hotel_details
 	});

 	console.log(params);

    this.http.post(serverURL+'/HotelController/addHotel',params)
    .subscribe(
        res => {
 			
 			alert('added successfully');
      	 
  
 		 
        },
        err => {
          console.log(err);
        }
    );

  }

	getServiceList() : any {

	  	this.http.get(serverURL+'/HotelController/getHotelServiceList')
	    .subscribe(
	        res => { 
	 			this.service_list = res; 
	 			this.service_list = this.service_list.data
	 			
	 			console.log(this.service_list)	 
	 		 
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
	 
	           

	          	let fd = new FormData()
	         		 
 			  	fd.append('file', file);
	         	fd.append('name', file.name);
	         	fd.append('item_id', '1');
	 			
	 			var headers = new HttpHeaders();
  				headers.append('Content-Type', 'undefined');

				this.http.post(serverURL+'/HotelController/fileUpload', fd, { headers: headers  })
	          		.subscribe(data => {

	          		upload_file = data
	 				console.log(upload_file.data.target_file);

	 				$('.hotel_img').attr('style','background-image: url('+upload_file.data.target_file+')');
	             
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
	  	//this.addHotel();

	  	$('.ui.form')
		  .form({
		    fields: {
		      hotelname   : ['minLength[4]', 'empty'],
		      description : ['minLength[10]', 'empty'],
		      address1 : 	['minLength[2]', 'empty'],
		      city : 		['minCount[2]', 'empty'],
		      tel1 : ['minCount[8]', 'empty']
		    }
		  })
	}


}
