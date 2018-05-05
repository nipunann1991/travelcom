import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { serverURL } from  "../../../app.global";


class Person {
  id: number;
  firstName: string;
  lastName: string;
}


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}



@Component({
  selector: 'app-view-hotel',
  templateUrl: './view-hotel.component.html',
  styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent implements OnInit {
	
	dtOptions: DataTables.Settings = {};
	Hotels: any;


  constructor(private http: HttpClient) { }

  ngOnInit() {
  	
  	const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,

      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(serverURL+'/HotelController/viewHotelDT',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.Hotels = resp.data;

            console.log(that.Hotels)

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      //columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };

  }

}
