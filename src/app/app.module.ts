import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { DataService } from './service/data.service';
import { JwttokenService } from './service/jwttoken.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MomentModule } from 'angular2-moment'; 
import { ErrorInterceptor } from './error-interceptor';
import { AuthInterceptor } from './login/auth-interceptor';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    ModalModule.forRoot(),
  ],
  providers: [BnNgIdleService,DataService,JwttokenService, 
    { provide: 'AuthGuard', useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true},
    // { provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    { provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
