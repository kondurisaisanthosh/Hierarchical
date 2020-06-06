import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private _http:HttpClient) { }

  urlApi='http://localhost:8080/'
  getOrganizations(){
    return this._http.get(this.urlApi);
  }
}
