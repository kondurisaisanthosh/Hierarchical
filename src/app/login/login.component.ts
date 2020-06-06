import { Component, OnInit } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private orgService:OrganizationService) { }

  username: String;
  password: String;

  ngOnInit() {
    this.getOrg(); 
  }

  login(): void{
    
  }

  getOrg(){
    this.orgService.getOrganizations().subscribe(data=>{
      console.log(data)
    },(error)=>{
      console.log(error);
    })

  }
}
