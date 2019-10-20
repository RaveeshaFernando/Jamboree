import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    UpdateprofileComponent, 
    AdminComponent, SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
