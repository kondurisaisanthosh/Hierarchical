import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { user } from '../bean/user';
import { map, catchError } from 'rxjs/operators';
import { userDetails } from '../bean/userDetails';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BnNgIdleService } from 'bn-ng-idle';
import { modules } from '../bean/modules';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userLoggedIn = new Subject<boolean>();

  private regError:any;
  public errorMessage=new Subject<string>();
  public isLoading=new Subject<boolean>();
  public cacheData=new Subject<modules[]>();
  public addOrganizationError=new Subject();

  public registerError=new Subject<string>();

  currentUserSubject: any;
  public currentUser: Observable<userDetails>;
  userDetails: any;
  cachedData: any;

  expirationMS=5*60*1000;
  allOrganizations: any;
  orgError: any;
  
  constructor(private _http:HttpClient) { 
    this.userLoggedIn.next(false);

    this.currentUserSubject = new BehaviorSubject<userDetails>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  registerNewUser(userObj:any){
    let regurl = `${environment.apiUrl}/register`;
    console.log("user "+JSON.stringify(userObj));
    return this._http.post<string>(regurl,userObj,{responseType: 'text' as 'json'})
    .pipe(catchError(error=>{
      this.regError=JSON.parse(error.error)
      // console.log(this.regError.message)
      this.registerError.next(this.regError.message);
      return throwError(error);
    }));
  }
  
  
  public get currentUserValue(): userDetails {
    return this.currentUserSubject.value;
  }

  getOrganization(){
    let orgUrl=`${environment.apiUrl}/organization/allOrganizations`;
    return this._http.get<any>(orgUrl)
    .pipe(map(organizations=>{
      this.allOrganizations=organizations;
      return organizations;
    }))
  }

  getUser(auth:any,name:any){
    let loginUrl=`${environment.apiUrl}/user/getUserdata`;
    return this._http.get(loginUrl,{
      params:{
        username:name
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

  clearOrganizationCache(){
   if(this.allOrganizations){
    this.allOrganizations.forEach(organization => {
      localStorage.removeItem(organization.organization_UUID);
    });
    console.log('cache cleared')
   }
  }

  getModules(organizationUUID:string){
    let getModuleUrl=`${environment.apiUrl}/module/getModules`;
    return this._http.get(getModuleUrl,{params:{
      orgUUID:organizationUUID
    }
    }).pipe(map(moduleData=>{

      let cacheData={
        modules:moduleData,
        expiration: this.expirationMS !== 0 ? new Date().getTime() + this.expirationMS : null,
      }


      localStorage.setItem(organizationUUID,JSON.stringify(cacheData));
      return moduleData;
    }))
  }



  addOrganization(org:string){
    let addOrgUrl=`${environment.apiUrl}/organization/storeOrganization?`;
    let body=`orgName=${org}`
    return this._http.post(`${addOrgUrl}${body}`,{},{responseType: 'text'} )
    .pipe(catchError(error=>{
      this.orgError=JSON.parse(error.error)
      // console.log(this.orgError.message)
      this.addOrganizationError.next(this.orgError.message);
      return throwError(error);
    }))
  }

  removeOrganization(organization){
    let delOrgUrl=`${environment.apiUrl}/organization/deleteOrganization?`;
    let body=`org_UUID=${organization.organization_UUID}`;
    return this._http.post(`${delOrgUrl}${body}`,{},{responseType:'text'});
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
