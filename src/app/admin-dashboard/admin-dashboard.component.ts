import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { JwttokenService } from '../service/jwttoken.service';
import { organization } from '../bean/orgnaization';

import {modules} from '../bean/modules'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  organizations:organization;
  currentOrgs: organization;
  currentOrganization:organization;
  modules:modules;
  modulesPresent:boolean=false;
  selectedOrganization:any;
  cachedData: string;
  constructor(private dataService :DataService,private jwtService :JwttokenService) { }

  ngOnInit() {
    // this.getAllOrgs();
    this.dataService.setUserLoggedIn(true);
    this.getAllOrgs();

  }

  getAllOrgs(){
    this.dataService.getOrganization(<any>localStorage.getItem('authKey')).subscribe(org=>{
      this.organizations=org;
      // console.log(JSON.stringify(this.organizations));
    })
  }

  currentOrg(orgs:organization){
    this.currentOrgs = orgs;
  }


  getModules(organization){
    this.selectedOrganization=organization;
    let cacheData=localStorage.getItem(organization['organization_UUID']);
    if(cacheData){
      this.modules=JSON.parse(cacheData);
        console.log(this.modules)
        if(Object.keys(this.modules).length>0){
          this.modulesPresent=true;
        }else{
          this.modulesPresent=false;
        }
    }else{
      this.dataService.getModules(organization['organization_UUID']).subscribe(data=>{
        this.modules=data;
        console.log(this.modules)
        if(Object.keys(this.modules).length>0){
          this.modulesPresent=true;
        }else{
          this.modulesPresent=false;
        }
      })
    }
  }

}
