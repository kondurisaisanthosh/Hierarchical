import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataservice:DataService,private router: Router) { 

    this.dataservice.registerError.subscribe(error=>{
      this.exceptionOccured=error.split(' ');
      
      this.exceptionOccured.forEach(element => {
        console.log(element);
        if(element==='username'){
          this.nonExistentUsername=true;
        }else if(element==='email'){
          this.nonExistentEmail=true;
        }else if(element==='phone'){
          this.nonExistentPhone=true;
        }else{
          this.nonExistentUsername=false;
          this.nonExistentEmail=false;
          this.nonExistentPhone=false
        }
        
      });
    })
  }
  exceptionOccured:any;
  username:any;
  password:any;
  email:any;
  confirmPassword:any;
  dob:any;
  phone:any;
  response:string;
  nonExistentUsername:boolean=false;
  nonExistentEmail:boolean=false;
  nonExistentPhone:boolean=false;

  errorOccured:boolean=false;
  errorMessage:string;

  signupForm:FormGroup;


  ngOnInit() {
    this.signupForm=new FormGroup({
      'username':new FormControl(null,Validators.required),
      'password':new FormControl(null,Validators.required),
      'confirmPassword':new FormControl(null,Validators.required),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phone':new FormControl(null,Validators.required),
      'dob':new FormControl(null),
    })
  }

  registerUser(){
    if(this.signupForm.value.confirmPassword===this.signupForm.value.password){
      let newuser={
        "username":this.signupForm.value.username,
        "password":this.signupForm.value.password,
        "email":this.signupForm.value.email,
        "phone":this.signupForm.value.phone,
        "dob":this.signupForm.value.dob
        };

        this.dataservice.registerNewUser(newuser).subscribe(data=>{
          this.response=data;
          this.signupForm.reset();
          
          this.nonExistentUsername=false;
          this.nonExistentEmail=false;
          this.nonExistentPhone=false;
          
          this.errorOccured=true;
          this.errorMessage="Registered!"
          // this.router.navigate(["/login"]);
        }),(error)=>{
          console.log(error);
        };

    }else{
      this.errorOccured=true;
      this.errorMessage="Passwords Mismatch"
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

}
