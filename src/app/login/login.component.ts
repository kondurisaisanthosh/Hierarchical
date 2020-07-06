import { Component, OnInit } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { JwttokenService } from '../service/jwttoken.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../service/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: import("/Users/santoshkonduri/Downloads/Hierarchical/src/app/bean/userDetails").userDetails;


  username: String;
  password: String;
  type:any;
  userdata:any;
  auth:any;
  errorMessage:String=''
  errorOccured:boolean=false;
  loginForm:NgForm;

  constructor(private _token:JwttokenService,private dataService:DataService,private router: Router,private errorHandler: ErrorHandlerService) { 
    this._token.loginError.subscribe(errormessage=>{
      this.errorMessage=errormessage;
      this.errorOccured=true;
      this.emptyForm(this.loginForm);
      this.dataService.isLoading.next(false);
    })
  }

  emptyForm(loginForm:NgForm){
    loginForm.resetForm();
  }

  
  ngOnInit() {
    this.currentUser = this.dataService.currentUserValue;
    if(this.currentUser){
      this.dataService.setUserLoggedIn(true);
      if(this.currentUser['type']==1){
        this.router.navigate(["/user"]);
        this.dataService.isLoading.next(false);
      }else{
        this.router.navigate(["/admin"]);
        this.dataService.isLoading.next(false);
      }
    }else{
      this.router.navigate(["/login"]);
      this.dataService.isLoading.next(false);
    }
  }

  onSubmit(loginform: NgForm) {
    this.loginForm=loginform;
    console.log(loginform.value);
    this.dataService.isLoading.next(true);
    let newuser={
      "username":this.username,
      "password":this.password
    }
    this._token.generateToken(newuser).subscribe(data=>{
      this.auth=data;
      console.log(this.auth);
      localStorage.setItem('authKey','Bearer '+this.auth);
      this.dataService.getUser(data,this.username).subscribe(user=>{
         this.userdata=user;
         console.log(this.userdata.type)
         if(this.userdata.type==1){
          this.dataService.setUserLoggedIn(true);
           this.router.navigate(["user"]);
           this.dataService.isLoading.next(false);
         }else{
           this.dataService.setUserLoggedIn(true);
          this.router.navigate(["admin"]);
          this.dataService.isLoading.next(false);
         }
         
      })
    })
  }
}

