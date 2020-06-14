import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataservice:DataService) { }
  username:any;
  password:any;
  email:any;
  confirmPassword:any;
  dob:any;
  phone:any;
  response:string;

  ngOnInit() {
    
  }

  registerUser(){
    if(this.confirmPassword===this.password){
      let newuser={
        "name":this.username,
        "password":this.password,
        "email":this.email,
        "phone":this.phone,
        "dob":this.dob
        };

        this.dataservice.registerNewUser(newuser).subscribe(data=>{
          this.response=data;
          alert(this.response);
        });

    }else{
      alert("passwords mismatch");
    }
  }
  onSubmit(registerForm: NgForm) {
    console.log(registerForm.value);
    registerForm.resetForm();
  }

}
