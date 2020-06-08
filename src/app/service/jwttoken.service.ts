import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwttokenService {


  token:any;


  constructor(private _http:HttpClient) { }

  generateToken(auth: any) {
    
  }

}
