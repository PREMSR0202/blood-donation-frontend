import { BloodRequestComponent } from './blood-request/blood-request.component';
import { EmployeesComponent } from './employees/employees.component';
import { BloodDonationComponent } from './blood-donation/blood-donation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodDonarsGroupComponent } from './blood-donars-group/blood-donars-group.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: "", component: DashboardComponent },
            { path: "bloodgroup", component: BloodDonarsGroupComponent },
            { path: "profile", component: UserProfileComponent },
            { path: "blooddonation", component: BloodDonationComponent },
            { path: "employees", component: EmployeesComponent },
            { path: "bloodrequest", component: BloodRequestComponent }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }