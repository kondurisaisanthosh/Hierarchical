import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { AdminUsersComponent } from './admin-users/admin-users.component';


const routes: Routes = [
  { path:'',component:LoginComponent },

  { path:'login',redirectTo: '' },

  { path:'register',component:RegisterComponent},
 
  {
    path:'user',
    component:UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { type: 1}
  },
  {
    path:'admin',
    component : AdminDashboardComponent,
    canActivate: [AuthGuard],     
    // data: { type: 0,animation:'home'}
    data: { type: 0}
  },
  {
    path:'admin-users',
    component : AdminUsersComponent,
    canActivate: [AuthGuard],     
    data: { type: 0}
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
