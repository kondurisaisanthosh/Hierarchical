import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { nextTick } from 'process';
import { JsonPipe } from '@angular/common';

export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler){
    
        let authReq=req;
        const token=localStorage.getItem('authKey');
        if(token){
             authReq=req.clone({
                setHeaders:{
                    'Authorization':token,
                    'Content-Type':'application/json',  
                }
            });
        }
        return next.handle(authReq);
    }
}
    