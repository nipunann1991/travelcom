import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { serverURL, fileManager } from  "../../../app.global";
import { AuthGuard } from '../../../auth.guard';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

	dtOptions: DataTables.Settings = {}; 
	ads: any; isDataTable : boolean = false;

  	constructor(private http: HttpClient, private authService: AuthGuard) { }

  	ngOnInit() {
  		this.getAds();
  		
  	}


  	getAds(){
  		const that = this;
	  
	    this.dtOptions = {
	      pagingType: 'full_numbers',
	      pageLength: 10,
	      serverSide: true,
	      processing: true,

	      ajax: (dataTablesParameters: any, callback) => {
	        that.http
	          .post<DataTablesResponse>(serverURL+'/AdsController/viewAdsDT',
	            dataTablesParameters, {}
	          ).subscribe(resp => {
	            that.ads = resp.data;

	            

	            for (var i = 0 ; i < that.ads.length; i++) {
	              	

	              	that.ads[i].img_url = fileManager+"ads/"+that.ads[i].img_url;
	               
	               
	            }
 

	              	if (that.ads.length) {
		              this.isDataTable = true
		           	}
	           

	            callback({
	              recordsTotal: resp.recordsTotal,
	              recordsFiltered: resp.recordsFiltered,
	              data: []
	            });
	          });
	      }, 
	    };
  	}

}
