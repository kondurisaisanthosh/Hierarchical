import { Component, OnInit } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { JwttokenService } from '../service/jwttoken.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: import("/Users/santoshkonduri/Downloads/Hierarchical/src/app/bean/userDetails").userDetails;

  constructor(private _token:JwttokenService,private dataService:DataService,private router: Router) { }

  username: String;
  password: String;
  type:any;
  userdata:any;
  auth:any;

  
  ngOnInit() {
    this.currentUser = this.dataService.currentUserValue;
    if(this.currentUser){
      
    }
  }

  onSubmit(loginform: NgForm) {
    console.log(loginform.value);
    let newuser={
      "username":this.username,
      "password":this.password
    }
    this._token.generateToken(newuser).subscribe(data=>{
      this.auth=data;
      console.log(this.auth);
      this.dataService.getUser(data,this.username).subscribe(user=>{
         this.userdata=user;
         console.log(this.userdata.type)
         if(this.userdata.type==1){
           this.router.navigate(["user"]);
         }else{
          this.router.navigate(["admin"]);
         }
        //  console.log(this.userdata)
         loginform.resetForm();
      })
    });
  }
}

