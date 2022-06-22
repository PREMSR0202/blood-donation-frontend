import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './Components/admin.guard';
import { AuthGuard } from './Components/auth.guard';
import { BasicInfoComponent } from './Components/basic-info/basic-info.component';
import { BloodDetailsComponent } from './Components/blood-details/blood-details.component';
import { GuestGuard } from './Components/guest.guard';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { RequestFormComponent } from './Components/request-form/request-form.component';
import { RequiredfieldsGuard } from './Components/requiredfields.guard';
import { UserGuard } from './Components/user.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
    data: {
      isAdmin: true
    }
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard, UserGuard,RequiredfieldsGuard]    
  },
  {
    path: 'basic-info',
    component: BasicInfoComponent,
    canActivate: [AuthGuard, UserGuard, RequiredfieldsGuard]
  },
  {
    path: 'blood-group-details',
    component: BloodDetailsComponent,
    canActivate: [AuthGuard, UserGuard, RequiredfieldsGuard]
  },
  {path: 'login' , component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'requestform', component:RequestFormComponent, canActivate: [GuestGuard]},
];

// const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
