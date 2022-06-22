import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BloodgroupsComponent } from './bloodgroups/bloodgroups.component';
import { BloodDonationComponent } from './blood-donation/blood-donation.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    BloodgroupsComponent,
    BloodDonationComponent,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
