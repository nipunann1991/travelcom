import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { serverURL } from  "../../app.global";
import {Router} from "@angular/router";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username: any = ''; password: any = ''; response: any;

	loginDetails : any = {
		username : "",
		password : "", 
	};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
 

  	$('.ui.form')
	  .form({
	    fields: {
	      'username' : 'empty',
	      'password'   : 'empty',
	       
	    }
	  })
  }

 
  login() : any{
 	
 	$('#login').addClass('loading');
 

 	const params = new HttpParams({
 		fromObject :{
 			username: this.loginDetails.username,
 			password: this.loginDetails.password,
 		}
 	});

    this.http.post(serverURL+'LoginController/getLoginCredentials',params)
    .subscribe(
        res => {

        	$('#login').removeClass('loading');
          
          this.response = res;

          if (this.response.status == 200) {
            sessionStorage.setItem('token', '1234'); 
            this.router.navigate(['dashboard']);
          }

          console.log(this.response.status);
  
 		 
        },
        err => {
          console.log(err);
        }
    );
  	//console.log(this.loginDetails)

  }

}
