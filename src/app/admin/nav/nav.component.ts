import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


	navLinks: any = [
		{
			id: 1,
			label: 'Dashboard',
			url: 'admin/dashboard',
			icon: 'icon-dashboard'
			
		},
		{
			id: 2,
			label: 'Hotel',
			url: 'admin/hotel/view-hotel',
			icon: 'icon-three-buildings'
		},
		{
			id: 3,
			label: 'Advertisments',
			url: 'admin/ads/ads-list',
			icon: 'icon-desktop-monitor'
		},
		{
			id: 3,
			label: 'Info',
			url: 'admin/information',
			icon: 'icon-icon'
		}

		
	]

  constructor() { }

  ngOnInit() {
  }

}
