import { Component } from '@angular/core';
import { userDetails } from './bean/userDetails';
import { Router } from '@angular/router';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hierarchical';
  currentUser: userDetails;

    constructor(
        private router: Router,
        private dataService: DataService
    ) {
        this.dataService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.dataService.logout();
        this.router.navigate(['/login']);
    }
}
