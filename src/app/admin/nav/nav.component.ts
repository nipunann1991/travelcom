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
			url: 'dashboard'
		},
		{
			id: 2,
			label: 'Hotel',
			url: 'admin/hotel/view-hotel'
		}
	]

  constructor() { }

  ngOnInit() {
  }

}
