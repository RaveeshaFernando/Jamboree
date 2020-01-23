import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component' ;
import { SigninComponent } from './signin/signin.component' ;
import { SignupComponent } from './signup/signup.component' ;
// import { SearchComponentComponent } from "../SharedComponents/SearchComponentComponent";

import { DisplayPageComponent } from "./Dynamic/display-page/display-page.component";
import { DisplayPageBarComponent } from "./Dynamic/display-page-bar/display-page-bar.component";

import { ProfileComponent } from './profile/profile.component' ;

import { AdminComponent } from './Admin/admin.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component'
import { ProfileInsightsComponent } from './Admin/profile-insights/profile-insights.component'
import { UserDataComponent } from './Admin/userdata/userdata.component';

import { UserProfileComponent } from "./User/user-profile/user-profile.component";
import { EditUserComponent } from "./User/edit-user/edit-user.component";
import { BookingHistoryComponent } from "./User/booking-history/booking-history.component";
import { UserDeleteComponent } from './User/user-delete/user-delete.component';

import { ProfBookingComponent } from "./eventProf/prof-booking/prof-booking.component";
import { ProfEditProfileComponent } from "./eventProf/prof-edit-profile/prof-edit-profile.component";
import { ProfMainComponent } from "./eventProf/prof-main/prof-main.component";
import { EventProfRequestComponent } from './User/event-prof-request/event-prof-request.component';



const routes: Routes =[
  { path: '',                     component: HomeComponent },
  { path: 'Signin',               component: SigninComponent },
  { path: 'Signup',               component: SignupComponent },
  { path: 'Profile',              component: ProfileComponent },
  // { path: 'search',               component: SearchComponentComponent},

  {path: 'DynamicUser',           component: DisplayPageComponent},
  {path: 'dBar',                  component: DisplayPageBarComponent},

  { path: 'Admin',                component: AdminComponent },
  { path: 'dashboard',            component: DashboardComponent},
  { path: 'profile-insights',     component: ProfileInsightsComponent},
  { path: 'user-data',            component: UserDataComponent},

  { path: 'UserProfile',          component: UserProfileComponent},
  { path: 'UserEditUser',         component: EditUserComponent},
  { path: 'UserBooking',          component: BookingHistoryComponent},
  { path: 'UserDelete' ,          component: UserDeleteComponent},
  { path: 'EventProfRequest' ,    component: EventProfRequestComponent},

  { path: 'EventMain',            component:ProfMainComponent},
  { path: 'EventEditProfile',     component:ProfEditProfileComponent},
  { path: 'EventBooking',         component:ProfBookingComponent},

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
