import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DataService } from '../service/data.service';
import { organization } from '../bean/organization';
import { user } from '../bean/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataservice:DataService) { }

  orgs:organization;
  username:any;
  password:any;
  response:string;

  ngOnInit() {
    this.dataservice.fetchOrgandModules().subscribe(data=>this.orgs=data);
  }

  registerUser(){

    let newuser={
      "username":this.username,
      "password":this.password
    };
    
    this.dataservice.registerNewUser(newuser).subscribe(data=>{
      this.response=data;
      console.log(this.response);
    });

    

  }


  onSubmit(registerForm: NgForm) {
    console.log(registerForm.value);
  }

}
