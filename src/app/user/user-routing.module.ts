import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Components/auth.guard';
import { RequiredfieldsGuard } from '../Components/requiredfields.guard';
import { UserGuard } from '../Components/user.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';

const routes : Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: 'user', component: DashboardComponent }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }