import { BloodRequestComponent } from './../user/blood-request/blood-request.component';
import { EmployeesComponent } from './../user/employees/employees.component';
import { BlooddonationComponent } from './blooddonation/blooddonation.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../Components/admin.guard";
import { AuthGuard } from "../Components/auth.guard";
import { AdminComponent } from "./admin.component";
import { BloodgroupsComponent } from "./bloodgroups/bloodgroups.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RequestFormComponent } from '../Components/request-form/request-form.component';


const routes: Routes = [
    {
        path: "", component: AdminComponent,
        children: [
            { path: "", component: DashboardComponent },
            { path: "bloodgroups", component: BloodgroupsComponent },
            { path: "blooddonation", component: BlooddonationComponent },
            { path: "employees", component: EmployeesComponent },
            { path: "bloodrequest", component: BloodRequestComponent }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }