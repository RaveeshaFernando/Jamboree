import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component' ;
import { SigninComponent } from './signin/signin.component' ;
import { SignupComponent } from './signup/signup.component' ;
import { ProfileComponent } from './profile/profile.component' ;
import { AdminComponent } from './Admin/admin.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component'
import { ProfileInsightsComponent } from './Admin/profile-insights/profile-insights.component';
import { BookingInfoComponent } from './Admin/booking-info/booking-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes =[
  { path: '',                     component: HomeComponent },
  { path: 'Signin',               component: SigninComponent },
  { path: 'Signup',               component: SignupComponent },
  { path: 'Profile',              component: ProfileComponent },
  { path: 'Admin',                component: AdminComponent },
  { path: 'dashboard',            component: DashboardComponent},
  { path: 'profile-insights',     component: ProfileInsightsComponent},
  { path: 'booking-info',         component: BookingInfoComponent},
  { path: 'user-profile',         component: UserProfileComponent},
  { path: 'edit-user',            component: EditUserComponent}


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

