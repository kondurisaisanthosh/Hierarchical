import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwttokenService {


  baseUrl = "http://localhost:8080"

  token:any;


  constructor(private _http:HttpClient) { }

  generateToken(auth: any) {
    
  }

}
