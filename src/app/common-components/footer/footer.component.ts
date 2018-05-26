import { Component, OnInit } from '@angular/core';
import { Router  , ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { serverURL, fileManager } from  "../../app.global";
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	contact_details : any = [];

  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute) { }

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

}
