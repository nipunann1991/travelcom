import { Injectable } from '@angular/core';
import { Routes, CanActivate} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HotelComponent } from './hotel/hotel.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component'; 
import { AddHotelComponent } from './admin/hotel/add-hotel/add-hotel.component';
import { ViewHotelComponent } from './admin/hotel/view-hotel/view-hotel.component';
import { HoteldataComponent } from './admin/hotel/hoteldata/hoteldata.component';
import { EditHotelComponent } from './admin/hotel/edit-hotel/edit-hotel.component';
import { ImageGalleryComponent } from './admin/hotel/image-gallery/image-gallery.component';
import { AdsListComponent } from './admin/ads/ads-list/ads-list.component'; 
import { NewAdComponent } from './admin/ads/new-ad/new-ad.component';
import { EditAdComponent } from './admin/ads/edit-ad/edit-ad.component';
import { SettingsComponent } from './admin/settings/settings.component';


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
  	{ path: 'search-hotel', 
    	component: SearchHotelComponent 
  	},
    { path: 'login', 
      component: LoginComponent,  
    },
    { path: 'admin/dashboard', 
      component: DashboardComponent,
      canActivate: [AuthGuard], 
      
    },

    { path: 'admin/hotel/add-hotel', 
      component: AddHotelComponent,
      canActivate: [AuthGuard], 
    },

    { path: 'admin/hotel/view-hotel', 
      component: ViewHotelComponent,
      canActivate: [AuthGuard], 
      
    },

    { path: 'admin/hotel/view-hotel/:id', 
      component: HoteldataComponent, 
      canActivate: [AuthGuard], 
    },

    { path: 'admin/hotel/edit-hotel/:id', 
      component: EditHotelComponent, 
      canActivate: [AuthGuard], 
    },

    { path: 'admin/hotel/add-gallery/:id', 
      component: ImageGalleryComponent, 
      canActivate: [AuthGuard], 
    },


    { path: 'admin/ads/ads-list', 
      component: AdsListComponent,
      canActivate: [AuthGuard], 
      
    },

    { path: 'admin/ads/new-ad', 
      component: NewAdComponent,
      canActivate: [AuthGuard], 
      
    },

    { path: 'admin/ads/edit-ad/:id', 
      component: EditAdComponent,
      canActivate: [AuthGuard], 
      
    },

    { path: 'admin/information', 
      component:  SettingsComponent,
      canActivate: [AuthGuard], 
      
    },

   


    
];

 