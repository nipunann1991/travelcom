import { Component, OnInit } from '@angular/core';
import { Router  , ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { serverURL, fileManager } from  "../../app.global";
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  contact_details : any = [];

  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute,  private bootstrapGrowlService: BootstrapGrowlService) { }

  ngOnInit() {
  	this.getContact();
  }

    getContact(): any { 

  		let promise = new Promise((resolve, reject) => {

		  	this.http.get(serverURL+'/HomePageController/getContactDetails')
		    .toPromise()
	      	.then(
		        res => { 

		 			this.contact_details = res; 
		 			this.contact_details = this.contact_details.data[0]; 

		 			console.log(this.contact_details)

		 			resolve();

		        },
		        err => {
		          console.log(err);
		        }
		    );


		});
			
		return promise;

	  
  	}

  	saveDetails(){

  		const params1 = new HttpParams({
	 		fromObject : this.contact_details
	 	});
 
		let promise = new Promise((resolve, reject) => {		 
			this.http.post(serverURL+'/HomePageController/updateHotelDetails',params1)
	      	.toPromise()
	      	.then(
	        	res => { 
	        		 
	         		let response : any  = res; 

	         		if (response.status == 200 ) { 

	         			this.bootstrapGrowlService.addAlert("Details updated successfully.", BootstrapAlertType.SUCCESS);

	         		}else{
	         			 
	         		}

	         		 
	          		resolve();
	        	}
	   	 	); 

	   	 	return promise;
	   	 }); 

  	}

  saveInfo(){

  	this.saveDetails()

  }

}
