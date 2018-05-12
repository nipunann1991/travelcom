import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


	constructor(private router: Router) { 

  }

	token: any = sessionStorage.getItem('token');
  isAdmin : boolean= false;



  canActivate() {
    console.log('i am checking to see if you are logged in');

    if (this.token) {
    	 return true;
    }else{
    	//this.router.navigate(['login']);
    	return false;
    }
   
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

  isDashboard(){

    if (this.token) {
       return true;
    }else{
      //this.router.navigate(['login']);
      return false;
    }
    
  }

 

}