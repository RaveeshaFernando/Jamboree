
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './SharedComponents/navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './Admin/admin.component';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ProfileInsightsComponent } from './Admin/profile-insights/profile-insights.component';
import { BookingInfoComponent } from './Admin/booking-info/booking-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    SigninComponent,
    SignupComponent,
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileInsightsComponent,
    BookingInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
