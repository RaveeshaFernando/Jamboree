import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component' ;
import { SigninComponent } from './signin/signin.component' ;
import { SignupComponent } from './signup/signup.component' ;

import { ProfileComponent } from './profile/profile.component' ;

import { AdminComponent } from './Admin/admin.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component'
import { ProfileInsightsComponent } from './Admin/profile-insights/profile-insights.component'
import { UserDataComponent } from './Admin/userdata/userdata.component';

import { UserProfileComponent } from "./User/user-profile/user-profile.component";
import { EditUserComponent } from "./User/edit-user/edit-user.component";
import { BookingHistoryComponent } from "./User/booking-history/booking-history.component";


const routes: Routes =[
  { path: '',                     component: HomeComponent },
  { path: 'Signin',               component: SigninComponent },
  { path: 'Signup',               component: SignupComponent },
  { path: 'Profile',              component: ProfileComponent },

  { path: 'Admin',                component: AdminComponent },
  { path: 'dashboard',            component: DashboardComponent},
  { path: 'profile-insights',     component: ProfileInsightsComponent},
  { path: 'user-data',            component: UserDataComponent},

  { path: 'User/userProfile',     component: UserProfileComponent},
  { path: 'User/editUser',         component: EditUserComponent},
  { path: 'User/bookingHistory',  component: BookingHistoryComponent},
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

