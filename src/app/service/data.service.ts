import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { user } from '../bean/user';
import { map } from 'rxjs/operators';
import { userDetails } from '../bean/userDetails';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BnNgIdleService } from 'bn-ng-idle';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userLoggedIn = new Subject<boolean>();

  currentUserSubject: any;
  public currentUser: Observable<userDetails>;
  userDetails: any;
  
  constructor(private _http:HttpClient,private bnIdle: BnNgIdleService,) { 
    this.userLoggedIn.next(false);

    this.currentUserSubject = new BehaviorSubject<userDetails>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  registerNewUser(userObj:any){
    let regurl = `${environment.apiUrl}/register`;
    console.log("user "+JSON.stringify(userObj));
    return this._http.post<string>(regurl,userObj,{responseType: 'text' as 'json'});
  }
  public get currentUserValue(): userDetails {
    return this.currentUserSubject.value;
}

  getOrganization(auth:any){
    console.log("test" + auth);
    let orgUrl=`${environment.apiUrl}/organization/allOrganizations`;
    return this._http.get<any>(orgUrl,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':auth
      }
    })
  }

  getUser(auth:any,name:any){
    let loginUrl=`${environment.apiUrl}/user/getUserdata`;
    return this._http.get(loginUrl,{
      params:{
        username:name
      },
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+auth
      }
   }).pipe(map(user=>{
      this.userDetails=user;
      console.log(this.userDetails);
      if(this.userDetails){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
   }))
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.currentUserSubject.next(null);
}
}
