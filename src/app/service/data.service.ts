import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { user } from '../bean/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = "http://localhost:8080"

  constructor(private _http:HttpClient) { }

  fetchOrgandModules() {
    let url = this.baseUrl + "/organization/viewOrg";
    return this._http.get<any>(url);
  }

  registerNewUser(userObj:any){
    let regurl = this.baseUrl + "/register";
    console.log("user "+JSON.stringify(userObj));
    return this._http.post<string>(regurl,userObj,{responseType: 'text' as 'json'});
  }
  getUser(auth:any,name:any){
    let loginUrl=this.baseUrl+'/user/getUserdata';
    return this._http.get(loginUrl,{
      params:{
        username:name
      },
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+auth
      }
   });
  }

  getUserType(name:any,auth:any){
    let typeUrl=this.baseUrl+'/userType';
    return this._http.get(typeUrl,{
      params:{
        username:name
      },
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+auth
      }
    })

  }

}
