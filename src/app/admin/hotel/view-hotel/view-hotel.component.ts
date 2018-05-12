import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { serverURL } from  "../../../app.global";
import { AuthGuard } from '../../../auth.guard';

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
	Hotels: any; isDataTable : boolean = false;


  constructor(private http: HttpClient, private authService: AuthGuard) { }

  ngOnInit() {
  	
  	const that = this;

  //   $('.ui.active.dimmer').removeClass('hide');

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

            

            for (var i = 0 ; i < that.Hotels.length; i++) {
              
               if (that.Hotels[i].status == 0) {
                  that.Hotels[i].status_class = 'unpublished';
                  
               }else{
                  that.Hotels[i].status_class = 'published';

               }
               
            }

             console.log(that.Hotels); 

          //   $('.ui.active.dimmer').addClass('hide')

            
           if (that.Hotels.length) {
              this.isDataTable = true
           }

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
