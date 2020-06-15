import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { JwttokenService } from '../service/jwttoken.service';
import { organization } from '../bean/orgnaization';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  organizations:organization;
  currentOrgs: organization;
  constructor(private dataService :DataService,private jwtService :JwttokenService) { }

  ngOnInit() {
    // this.getAllOrgs();
  }

  getAllOrgs(){
    this.dataService.getOrganization(<any>localStorage.getItem('authKey')).subscribe(org=>{
      this.organizations=org;
      console.log(JSON.stringify(this.organizations));
    })
  }

  currentOrg(orgs:organization){
    this.currentOrgs = orgs;
  }

}
