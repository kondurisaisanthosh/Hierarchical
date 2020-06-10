import { Component, OnInit } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { JwttokenService } from '../service/jwttoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _token:JwttokenService) { }

  username: String;
  password: String;

  
  ngOnInit() {
  }

  onSubmit(loginform: NgForm) {
    console.log(loginform.value);
    let newuser={
      "username":this.username,
      "password":this.password
    };
    this._token.generateToken(newuser).subscribe(data=>{
      console.log(data);
      
    });
  }
}

