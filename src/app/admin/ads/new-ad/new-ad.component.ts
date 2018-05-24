import { Component, OnInit } from '@angular/core';
import { serverURL } from  "../../../app.global";
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {

	public files: UploadFile[] = [];

	ad_details : any = {
		hotel_id: 0,
		img_url: '',
		featured: 0,
		ad_desc: '',
		status: 0

	};

	
	isFeatured: boolean = false; isPublished: boolean = false;  



  	constructor(private http: HttpClient, private router: Router, private bootstrapGrowlService: BootstrapGrowlService) { }

  	ngOnInit() {
  		$('.ui.radio.checkbox').checkbox();
  		$('select.dropdown').dropdown();  
  	}


  	createAd(){
  	 	
  	 	if (this.ad_details.img_url != "") {

	  	 	const params = new HttpParams({
		 		fromObject : this.ad_details
		 	});

			let promise = new Promise((resolve, reject) => {

		 	this.http.post(serverURL+'/AdsController/insertAd',params)
		      	.toPromise()
		      	.then(
		        	res => { 
		        		 
		         		let response : any  = res;

		         		console.log(response);

		         		if (response.status == 200 ) {   

		         			this.bootstrapGrowlService.addAlert("Ad has been added  successfully", BootstrapAlertType.SUCCESS);
		         			this.router.navigate(['/admin/ads/ads-list']);
		         		}else{
		         			 
		         		}
	 
		          		resolve();
		        	}
			    );

			});
				
			return promise;
  	 		 
  	 	}else{
  			this.bootstrapGrowlService.addAlert("Please upload your ad first.", BootstrapAlertType.DANGER);

  	 	} 
  
  	}

  	cancel(){
	    this.router.navigate(['/admin/ads/ads-list']);

  	}


  	featured(){
  		
  		if (this.isFeatured) {
  			 this.ad_details.featured = 1
  		}else{
  			 this.ad_details.featured = 0 
  		} 

  	}


  	published(){

  		if (this.isPublished) {
  			 this.ad_details.status = 1
  		}else{
  			 this.ad_details.status = 0 
  		}
 
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

				this.http.post(serverURL+'/AdsController/adsUpload', fd, { headers: headers  })
	          		.subscribe(data => {

	          		upload_file = data;

  			 		this.ad_details.img_url = upload_file.data.new_file; 

	 				$('.ads_img').attr('style','background-image: url('+upload_file.data.target_file+')');
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

}
