import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../Components/admin.guard";
import { AuthGuard } from "../Components/auth.guard";
import { AdminComponent } from "./admin.component";
import { BloodDonationComponent } from "./blood-donation/blood-donation.component";
import { BloodgroupsComponent } from "./bloodgroups/bloodgroups.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


const routes: Routes = [
    { 
        path: "", component: AdminComponent, 
        canActivate: [AuthGuard, AdminGuard],       
        children:[
            { path: "", component: DashboardComponent },
            {path: "bloodgroups", component: BloodgroupsComponent},
            {path: "blooddonation" , component: BloodDonationComponent}
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }