import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

import { serverURL, fileManager } from  "../app.global";
import { Router } from "@angular/router";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	
	hotel : any = []; search_txt : string = '';   content : any = []; search_hotel_id: number; selected_city: string;
	dataLoaded : boolean = true; ads: any; fm : any = fileManager; filepath : string = this.fm+"ads/"; 

  cities: any = [{
    city: "Colombo",
    img_url: "./assets/images/colombo.jpg",
    province: "Western Province - Sri Lanka",
    alias: "colombo",
    size: "col-md-6"
  },
  {
    city: "Nuwaraeliya",
    img_url: "./assets/images/nuwaraeliya.jpg",
    province: "Central Province - Sri Lanka",
    alias: "nuwaraeliya",
    size: "col-md-3"
  },
  {
    city: "Ella",
    img_url: "./assets/images/ella.jpg",
    province: "Uva Province - Sri Lanka",
    alias: "ella",
    size: "col-md-3"
  },
  {
    city: "Kandy",
    img_url: "./assets/images/kandy.jpg",
    province: "Central Province - Sri Lanka",
    alias: "kandy",
    size: "col-md-4"
  },
  {
    city: "Hikkaduwa",
    img_url: "./assets/images/hikkaduwa.jpg",
    province: "Southern Province - Sri Lanka",
    alias: "hikkaduwa",
    size: "col-md-4"
  },
  {
    city: "Anuradhapura",
    img_url: "./assets/images/anuradhapura.jpg",
    province: "North Central Province - Sri Lanka",
    alias: "anuradhapura",
    size: "col-md-4"
  }
  ]
 
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 5,  'dots': true, 'responsive': [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]};
 

// slides : any = [
//     {img: "assets/images/ad1.jpg"}, 
//     {img: "assets/images/ad2.jpg"}, 
//   ];



  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

   
    this.selectAds();
  	this.getHotel();  
  }


  getHotel(){

  	this.http.get(serverURL+'/HomePageController/getHotels')
    .subscribe(
        res => { 
 			this.hotel = res; 

 			let hotelData : any = res; 
 			hotelData = hotelData.data

 			  this.hotel = hotelData;

         setTimeout(function(){
           $('.loader_screen').fadeOut();
         },1000);
        

 
        },
        err => {
          console.log(err);
        }
    );

  }



  viewAllHotels(){

    this.http.get(serverURL+'/HomePageController/viewAllHotels')
    .subscribe(
        res => { 
       this.hotel = res; 

       let hotelData : any = res; 
       hotelData = hotelData.data

       this.hotel = hotelData;

       console.log(this.hotel)   
       
        },
        err => {
          console.log(err);
        }
    );

  }


  searchString(val){
    this.content = [];

     const params2 = new HttpParams({
       fromObject : { hotel_name: val }
     });
          
      this.http.post(serverURL+'/HomePageController/searchHotels',params2)
      .toPromise()
      .then(
        res => { 
           
           let response : any  = res;

           console.log();

           if (response.status == 200 ) {   
             

             for (var i = 0; i < response.data.length; i++) {
               
               this.content.push({ category: 'Hotels', title: response.data[i].hotel_name, hotel_id: response.data[i].hotel_id }); 
             }
 
             this.searchTrigger(); 

           }else{
              
           } 
             
        }
      );


      this.http.post(serverURL+'/HomePageController/searchCities',params2)
      .toPromise()
      .then(
        res => { 
           
           let response : any  = res;

           console.log();

           if (response.status == 200 ) {   
             //this.content = [];

             for (var i = 0; i < response.data.length; i++) {
               
               this.content.push({ category: 'Cities', title: response.data[i].city }); 
             }

                
             this.searchTrigger(); 

           }else{
              
           } 
             
        }
      );
  }


  searchTrigger(){

     let self = this;

      $('.ui.search').search({
         type: 'category',
          source: this.content,
          onSelect : function(result, response){ 

            // console.log(result, response);

             if (typeof result.hotel_id != 'undefined') {
                self.search_hotel_id = result.hotel_id; 
             }

             if (result.category == "Cities") { 
               self.selected_city = result.title; 
                console.log( self.selected_city)
             }

          }
      });
  }

  search(){ 

      console.log( this.selected_city)


    if (typeof this.search_hotel_id != 'undefined') {
      this.router.navigate(['/hotel/'+this.search_hotel_id]); 
      
    } else if (typeof this.selected_city != 'undefined') {
      this.router.navigate(['/search-hotel'], { queryParams: { city: this.selected_city.toLowerCase() } });
    }


  }

  selectAds(){
    this.http.get(serverURL+'/AdsController/selectAds')
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
