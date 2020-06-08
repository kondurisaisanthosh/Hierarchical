import { Component, OnInit } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { OrganizationService } from '../organization.service';
import { NgForm } from '@angular/forms';
import { JwttokenService } from '../service/jwttoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private orgService:OrganizationService, private _token:JwttokenService) { }

  username: String;
  password: String;

  ngOnInit() {
    this.getOrg(); 
  }

  onSubmit(loginform: NgForm) {
    console.log(loginform.value);
  }

  getOrg(){
    this.orgService.getOrganizations().subscribe(data=>{
      console.log(data)
    },(error)=>{
      console.log(error);
    })

  }
}
