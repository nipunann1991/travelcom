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
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

public files: UploadFile[] = [];
galleryImages : any = [];
hotelID : any;

  constructor(private http: HttpClient, private router: Router, private bootstrapGrowlService: BootstrapGrowlService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  		this.hotelID = this.activeRoute.snapshot.params['id'];
  		this.getHotelGalleryImages();

  }

  	public dropped(event: UploadEvent) {
	    this.files = event.files; 
	    let upload_file;
	    for (const droppedFile of event.files) {
	 
	      // Is it a file?
	      let self = this;

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

  				let promise = new Promise((resolve, reject) => {

					this.http.post(serverURL+'/HotelController/imageGalleryUpload', fd, { headers: headers  })
		          		.toPromise()
		          		.then(data => {

		          		upload_file = data
		 				 
		          		//self.galleryImages.push(upload_file.data.target_file);


		          		const params2 = new HttpParams({
					 		fromObject : {hotel_id: this.hotelID, image_url: upload_file.data.target_file }
					 	});
	         			 
	         			this.http.post(serverURL+'/HotelController/addGalleryImages',params2)
				      	.toPromise()
				      	.then(
				        	res => { 
				        		 
				         		let response : any  = res;

				         		console.log(response);

				         		if (response.status == 200 ) {   

				         			this.bootstrapGrowlService.addAlert("Added accepetd cards successfully", BootstrapAlertType.SUCCESS);
				         			this.getHotelGalleryImages();
				         			
				         		}else{
				         			 
				         		}



				         		 
				          		resolve();
				        	}
					    );



		 				//this.hotel_details.image_url =  upload_file.data.target_file

		 				$('.hotel_img').attr('style','background-image: url('+upload_file.data.target_file+')');
		             	$('file-drop .content .loader').remove()

		             	resolve();
		          	})
 
	         	});
			
				return promise;
	 
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

	
		getHotelGalleryImages(){

			let self = this;

		  	const params1 = new HttpParams({
		 		fromObject : {hotel_id: this.hotelID}
		 	});

		  	let promise = new Promise((resolve, reject) => {

		  	this.http.post(serverURL+'/HotelController/getHotelGalleryImages',params1)
		      	.toPromise()
		      	.then(
		        	res => { 
		        		 
		         		let response : any  = res;

		         		console.log(response);

		         		if (response.status == 200 ) {   


		         			self.galleryImages = response.data;

		         			this.bootstrapGrowlService.addAlert("Added accepetd cards successfully", BootstrapAlertType.SUCCESS);

		         		}else{
		         			 
		         		}

		         		 
		          		resolve();
		        	}
			    );

		      });
				
			   return promise;

	  	}

	  	deleteItem(i){
	  		 

	  		let self = this;

		  	const params1 = new HttpParams({
		 		fromObject : {file_name: this.galleryImages[parseInt(i)].image_url}
		 	});

		  	let promise = new Promise((resolve, reject) => {

		  	this.http.post(serverURL+'/HotelController/deleteFile',params1)
		      	.toPromise()
		      	.then(
		        	res => { 
		        		 
		         		let response : any  = res; 

		         		if (response.status == 200 ) {    

		         			this.bootstrapGrowlService.addAlert("Added accepetd cards successfully", BootstrapAlertType.SUCCESS);

		         		}else{
		         			 
		         		}

		         		 
		          		resolve();
		        	}
			    );

		      });
				
			   return promise;

	  		//console.log()

	  		//deleteFile
	  	}
}
