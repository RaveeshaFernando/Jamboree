import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module' ;

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileInsightsComponent } from './profile-insights/profile-insights.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserDataComponent } from './userdata/userdata.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileInsightsComponent,
    SidebarComponent,
    UserDataComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
