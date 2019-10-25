import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component' ;
import { SigninComponent } from './signin/signin.component' ;
import { SignupComponent } from './signup/signup.component' ;
import { ProfileComponent } from './profile/profile.component' ;
import { AdminComponent } from './Admin/admin/admin.component';

const routes: Routes =[
  { path: '',                     component: HomeComponent },
  { path: 'Signin',               component: SigninComponent },
  { path: 'Signup',               component: SignupComponent },
  { path: 'Profile',              component: ProfileComponent },
  { path: 'Admin',                component: AdminComponent }
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

