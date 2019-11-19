import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileInsightsComponent } from './profile-insights/profile-insights.component';
import { UserDataComponent } from './userdata/userdata.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'Admin', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile-ingsights', component: ProfileInsightsComponent },
      { path: 'userdata', component: UserDataComponent },
      { path: 'sidebar', component: SidebarComponent }
    ]

  }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
