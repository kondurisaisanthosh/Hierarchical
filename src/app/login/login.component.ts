import { Component, OnInit } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { JwttokenService } from '../service/jwttoken.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _token:JwttokenService,private dataService:DataService) { }

  username: String;
  password: String;
  type:any;
  userdata:any;
  auth:any;

  
  ngOnInit() {
  }

  onSubmit(loginform: NgForm) {
    console.log(loginform.value);
    let newuser={
      "username":this.username,
      "password":this.password
    }
    this._token.generateToken(newuser).subscribe(data=>{
      this.auth=data;
      this.dataService.getUser(data,this.username).subscribe(user=>{
         this.userdata=user;
         console.log(this.userdata)
        this.dataService.getUserType(this.userdata.username,this.auth).subscribe(type=>{
          console.log(type);
        })
      })
    });
    loginform.reset();
  }

  
}

