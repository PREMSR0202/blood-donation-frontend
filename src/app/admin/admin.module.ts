import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BloodgroupsComponent } from './bloodgroups/bloodgroups.component';
import { BlooddonationComponent } from './blooddonation/blooddonation.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    BloodgroupsComponent,
    BlooddonationComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
