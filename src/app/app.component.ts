import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isDashboard: boolean = false;

   constructor(private router: Router, private authService: AuthGuard) { 

   }

  ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0) 
        });


       this.isDashboard = this.authService.isDashboard()

       if (this.authService.canActivate()) {
          this.router.navigate(['dashboard']);
      }
    }
}
