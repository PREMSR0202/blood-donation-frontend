import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../Components/admin.guard";
import { AuthGuard } from "../Components/auth.guard";
import { AdminComponent } from "./admin.component";
import { BloodgroupsComponent } from "./bloodgroups/bloodgroups.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


const routes: Routes = [
    { 
        path: "", component: AdminComponent,     
        children:[
            { path: "", component: DashboardComponent },
            {path: "bloodgroups", component: BloodgroupsComponent}
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }