import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

const routes: Routes = [
    { path: 'Admin',                    component: AdminComponent,
        children: [
            { path: 'dashboard',        component: DashboardComponent},
            { path: 'updateprofile',    component: UpdateprofileComponent}
        ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }