import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from './service/data.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUser: import("/Users/santoshkonduri/Downloads/Hierarchical/src/app/bean/userDetails").userDetails;
    
    constructor( private router: Router,private dataService: DataService)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         this.currentUser = this.dataService.currentUserValue;
        if (this.currentUser) {
            // check if route is restricted by role
            if (route.data.type===0 && this.currentUser['type']  === 1) {
                // role not authorised so redirect to home page
                // this.dataService.setUserLoggedIn(true);
                this.router.navigate(['/user']);
                return false;
            }else if (route.data.type===1 && this.currentUser['type']  === 0) {
                // role not authorised so redirect to home page
                // this.dataService.setUserLoggedIn(true);
                this.router.navigate(['/admin']);
                return false;
            }
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;;
    }

  
}