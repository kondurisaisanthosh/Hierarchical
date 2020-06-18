import { Component } from '@angular/core';
import { userDetails } from './bean/userDetails';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from './service/data.service';
import{fader} from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[fader]
})
export class AppComponent {

  prepareRoute(outlet:RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'] ; 
  }



  title = 'Hierarchical';
  currentUser: userDetails;

    constructor(
        private router: Router,
        private dataService: DataService
    ) {
        this.dataService.currentUser.subscribe(x => this.currentUser = x);
    }

   isAdmin(){
     return !(this.currentUser['type']);
   }

    logout() {
        this.dataService.logout();
        this.router.navigate(['/login']);
    }
}
