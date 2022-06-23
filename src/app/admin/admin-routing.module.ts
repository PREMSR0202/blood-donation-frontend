import { BlooddonationComponent } from './blooddonation/blooddonation.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { BloodgroupsComponent } from "./bloodgroups/bloodgroups.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { UsersComponent } from './users/users.component';
import { RequestFormComponent } from '../Components/request-form/request-form.component';


const routes: Routes = [
    {
        path: "", component: AdminComponent,
        children: [
            { path: "", component: DashboardComponent },
            { path: "bloodgroups", component: BloodgroupsComponent },
            { path: "blooddonation", component: BlooddonationComponent },
            { path: "employees", component: UsersComponent },
            { path: "bloodrequest", component: BloodRequestComponent }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }