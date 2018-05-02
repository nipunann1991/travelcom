import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from  "./app.routes";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard'; 

// Import your library
import { SlickModule } from 'ngx-slick';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HotelComponent } from './hotel/hotel.component';
import { NavbarComponent } from './common-components/navbar/navbar.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { LoginComponent } from './admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavComponent } from './admin/nav/nav.component';
import { AddHotelComponent } from './admin/hotel/add-hotel/add-hotel.component';
import { ViewHotelComponent } from './admin/hotel/view-hotel/view-hotel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HotelComponent,
    NavbarComponent,
    FooterComponent,
    SearchHotelComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    AddHotelComponent,
    ViewHotelComponent,
  ],
  imports: [
   		RouterModule.forRoot(AppRoutes, { useHash: false }),
    	BrowserModule, FormsModule, HttpClientModule, 
      SlickModule.forRoot()
   
  ],
  exports: [ RouterModule ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
 