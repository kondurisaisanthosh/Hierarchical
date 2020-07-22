import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { JwttokenService } from '../service/jwttoken.service';
import { organization } from '../bean/orgnaization';

import {modules} from '../bean/modules'
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

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
  errorOccured:boolean=false;
  errorMessage:any;
  addOneOrganization:boolean=false;
  addOneModule:boolean=false;

  public modalRef: BsModalRef;
  @ViewChild('addOrgChildModal', { static: false }) addOrgChildModal: ModalDirective;

  constructor(private dataService :DataService,private jwtService :JwttokenService) {

    this.dataService.organizations.subscribe(org=>{
      this.organizations=org;
    })

    this.dataService.addOrganizationError.subscribe(error=>{
      this.errorOccured=true;
      this.errorMessage=error;
    })

   }

  ngOnInit() {
    // this.getAllOrgs();
    this.dataService.setUserLoggedIn(true);
    this.getAllOrgs();

  }

  getAllOrgs(){
    this.dataService.getOrganization().subscribe(org=>{
      this.organizations=org;
    })

    
  }

  clearCache(){
    this.dataService.clearOrganizationCache();
  }

  currentOrg(orgs:organization){
    this.currentOrgs = orgs;
  }

  addOrganization(){
    this.addOneOrganization=true;
    this.addOrgChildModal.show();
  }

  addModuleToOrganization(){
    this.addOneModule=true;
    this.addOrgChildModal.show();
  }

  addOrg(orgForm:NgForm){
    // console.log(orgForm.value.organization_name);
    this.dataService.addOrganization(orgForm.value.organization_name).subscribe(res=>{
      this.errorOccured=true;
      this.errorMessage=res;
      orgForm.resetForm();
      console.log(JSON.stringify(res))
    });

  }


  hideChildModal(){
    this.addOrgChildModal.hide();
    this.addOneOrganization=false;

  }

  addModule(){
    console.log(this.selectedOrganization.organization_name)

  }

  getModules(organization){
    this.modulesPresent=true;
    this.selectedOrganization=organization;
    let cacheData=localStorage.getItem(organization['organization_UUID']);
    let now=new Date().getTime();
    if(cacheData){
      this.modules=JSON.parse(cacheData)['modules'];
      let expiry=JSON.parse(cacheData)['expiration']
      if(expiry<=now){
        this.getModuleApi(organization)
      }else{
        console.log(this.modules)
        if(Object.keys(this.modules).length>0){
          this.modulesPresent=true;
        }
      }
    }else{
      this.getModuleApi(organization);
    }
  }

  removeOrganization(organization){
    this.dataService.removeOrganization(organization).subscribe(response=>{
      console.log(response);
      this.dataService.clearOrganizationCache();
      this.dataService.getOrganization();
    });
  }

  getModuleApi(organization){
    this.dataService.getModules(organization['organization_UUID']).subscribe(data=>{
      this.modules=data;
      // console.log(this.modules)
      if(Object.keys(this.modules).length>0){
        this.modulesPresent=true;
      }
    })
  }

}
