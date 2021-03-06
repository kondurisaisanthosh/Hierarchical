import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwttokenService {

  token:any;
  authUrl:any;
  errorMessage:any;

  public loginError=new Subject<string>();

  public errorOccured=new Subject<String>();

  constructor(private _http:HttpClient) { }

  generateToken(user:any) {
    this.authUrl="authenticate";
    return this._http.post<string>(`${environment.apiUrl}/${this.authUrl}`,user,{responseType: 'text' as 'json'})
    .pipe(catchError(error=>{
      
      this.errorMessage=JSON.parse(error.error)
      // console.log(this.errorMessage.message)
      this.loginError.next(this.errorMessage.message);
      return throwError(error);
    }));
  }
}
