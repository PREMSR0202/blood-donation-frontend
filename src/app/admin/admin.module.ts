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
import { UsersComponent } from './users/users.component';
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    BloodgroupsComponent,
    BlooddonationComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    UsersComponent,
    BloodRequestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    DataTablesModule,
  ],
})
export class AdminModule { }
