import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { BloodDonarsGroupComponent } from './blood-donars-group/blood-donars-group.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    BloodDonarsGroupComponent,
    UserNavbarComponent,
    UserSidebarComponent,
    UserProfileComponent,
    LandingpageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
