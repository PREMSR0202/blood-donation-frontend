import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Components/auth.guard';
import { RequiredfieldsGuard } from '../Components/requiredfields.guard';
import { UserGuard } from '../Components/user.guard';
import { BloodDonarsGroupComponent } from './blood-donars-group/blood-donars-group.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';

const routes : Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: "", component: DashboardComponent },
            { path: "bloodgroup", component: BloodDonarsGroupComponent}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }