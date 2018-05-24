import { Component, OnInit } from '@angular/core';
import { serverURL, fileManager } from  "../../../app.global";
import { Router, ActivatedRoute } from "@angular/router";
import { ViewChild } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['../new-ad/new-ad.component.css'] 
})
export class EditAdComponent implements OnInit {
	public files: UploadFile[] = [];

	ad_details : any = {
		ad_id: '',
		hotel_id: 0,
		img_url: '',
		featured: 0,
		ad_desc: '',
		status: 0

	};

	
	isFeatured: boolean = false; isPublished: boolean = false; ad_id : number;

  	constructor(private http: HttpClient, private router: Router, private bootstrapGrowlService: BootstrapGrowlService, private activeRoute: ActivatedRoute) { }

  	ngOnInit() {
  		this.ad_id = this.activeRoute.snapshot.params['id'];

  		this.selectAd()
  		$('.ui.radio.checkbox').checkbox();
  		$('select.dropdown').dropdown(); 
  	}


  	selectAd(){

  		let ad_id : any = { 'ad_id': this.ad_id };

		const params = new HttpParams({
	 		fromObject : ad_id
	 	});
	 
 
	  	this.http.post(serverURL+'/AdsController/selectAd', params)
	    .subscribe(
	        res => { 

	 		  

	 		 	let data : any = res;

	 		 	data = data.data[0];
 

	 		 	this.ad_details = {
	 		 		ad_id: this.ad_id,
	 		 		hotel_id: data.hotel_id,
					img_url: data.img_url,
					featured: data.featured,
					ad_desc: data.ad_desc,
					status: data.status,
	 		 	}


	 		 	if ( this.ad_details.featured == '1') {
	 		 		this.isFeatured = true;
	 		 	}

	 		 	if ( this.ad_details.status == '1') {
	 		 		this.isPublished = true;
	 		 	}
 

	 			if (this.ad_details.img_url != null) {
	 				$('.ads_img').attr('style','background-image: url('+fileManager+"ads/"+this.ad_details.img_url+')');
	 			}

	 			
	 		 
	        },
	        err => {
	          console.log(err);
	        }
	    );
  	}

  	cancel(){
	    this.router.navigate(['/admin/ads/ads-list']);

  	}

  	updateAd(){

		const params = new HttpParams({
	 		fromObject : this.ad_details
	 	});

		let promise = new Promise((resolve, reject) => {

	 	this.http.post(serverURL+'/AdsController/updateAd',params)
	      	.toPromise()
	      	.then(
	        	res => { 
	        		 
	         		let response : any  = res;

	         		console.log(response);

	         		if (response.status == 200 ) {   

	         			this.bootstrapGrowlService.addAlert("Ad has been updated  successfully", BootstrapAlertType.SUCCESS);
	         			this.router.navigate(['/admin/ads/ads-list']);

	         		}else{
	         			 
	         		}
 
	          		resolve();
	        	}
		    );

		});
			
		return promise;
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
