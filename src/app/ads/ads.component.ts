import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise'; 
import { serverURL, fileManager } from  "../app.global";
import { Router, ActivatedRoute } from "@angular/router";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

	filepath: string = fileManager+'ads/';
	ads : any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

  	$(document).ready(function(){ 

       $(".fancybox").fancybox({
           openEffect: "elastic",
           closeEffect: "none",
           padding: 0
       }); 
       
   });

  	this.getFeaturedAds();


  }

  getFeaturedAds(){
  	this.http.get(serverURL+'/AdsController/selectFeaturedAds')
    .subscribe(
        res => { 

        	console.log(res)

        	let data : any = res;

        	data = data.data;

        	this.ads = data; 	

        },
        err => {
          console.log(err);
        }
    );

  }

}
