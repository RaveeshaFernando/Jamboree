import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module' ;

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileInsightsComponent } from './profile-insights/profile-insights.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookingInfoComponent } from './booking-info/booking-info.component';
import { DropzoneDirective } from './booking-info/dropzone.directive';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileInsightsComponent,
    SidebarComponent,
    BookingInfoComponent,
    DropzoneDirective
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
