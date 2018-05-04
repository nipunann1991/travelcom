import { Injectable } from '@angular/core';
import { Routes, CanActivate} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HotelComponent } from './hotel/hotel.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component'; 
import { AddHotelComponent } from './admin/hotel/add-hotel/add-hotel.component';

import { AuthGuard } from './auth.guard'; 

export const AppRoutes: Routes = [ 
	  { path: '', 
    	component: HomePageComponent 
  	},
  	{ path: 'home', 
    	component: HomePageComponent 
  	},

  	{ path: 'hotel/:id', 
    	component: HotelComponent 
  	},
  	{ path: 'search-hotel/:city', 
    	component: SearchHotelComponent 
  	},
    { path: 'login', 
      component: LoginComponent,  
    },
    { path: 'dashboard', 
      component: DashboardComponent,
      canActivate: [AuthGuard], 
      
    },

    { path: 'admin/hotel/add-hotel', 
      component: AddHotelComponent,
      canActivate: [AuthGuard], 
      
    },
];

 