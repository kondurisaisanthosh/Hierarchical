import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwttokenService {


  baseUrl = "http://localhost:8080/"

  token:any;
  authUrl:any;

  constructor(private _http:HttpClient) { }

  generateToken(user:any) {
    this.authUrl="register/";
    return this._http.post<string>(this.baseUrl+this.authUrl,user,{responseType: 'text' as 'json'});
  }

}
