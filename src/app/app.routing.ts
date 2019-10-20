import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

import { HomeComponent } from './home/home.component' ;
import { SigninComponent } from './signin/signin.component' ;
import { SignupComponent } from './signup/signup.component' ;
import { ProfileComponent } from './profile/profile.component' ;
import { AdminComponent } from './admin/admin/admin.component';


//Those are loaded inside the Admin dashboard
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UpdateprofileComponent } from './admin/updateprofile/updateprofile.component';

const routes: Routes =[
    { path: '',                     component: HomeComponent },
    { path: 'Signin',               component: SigninComponent },
    { path: 'Signup',               component: SignupComponent },
    { path: 'Profile',              component: ProfileComponent },
    { path: 'Admin',                component: AdminComponent},
    
    { path: 'Dashboard',            component: DashboardComponent},
    { path: 'UpdateProfile',        component: UpdateprofileComponent},

    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
