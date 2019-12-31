import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

//Bootstrap, ng Forms and Angular Material
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatInputModule ,  MatButtonModule , MatSortModule , MatSort} from '@angular/material' ;

//Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

//website Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './SharedComponents/navbar/navbar.component';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

//Website Components - User
import { UserProfileComponent } from "./User/user-profile/user-profile.component";
import { BookingHistoryComponent } from './User/booking-history/booking-history.component';
import { EditUserComponent } from './User/edit-user/edit-user.component';
import { UserSidebarComponent } from "./User/Shared/user-sidebar/user-sidebar.component";

//Website Components - Event Prof
import { ProfMainComponent } from './eventProf/prof-main/prof-main.component';
import { ProfSidebarComponent } from './eventProf/prof-sidebar/prof-sidebar.component';
import { ProfEditProfileComponent } from './eventProf/prof-edit-profile/prof-edit-profile.component';
import { ProfBookingComponent } from './eventProf/prof-booking/prof-booking.component';

//Website Components - Admin
import { AdminComponent } from './Admin/admin.component';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ProfileInsightsComponent } from './Admin/profile-insights/profile-insights.component';
import { UserDataComponent } from './Admin/userdata/userdata.component';

//Services
import { AuthenticationService } from './Shared/authentication.service';
import { GetUserService } from "./Shared/get-user.service";
import { UserService } from './BackendConfig/user.service';
import { SampleUserService } from './BackendConfig/sample-user.service';
import { ContactService } from "./BackendConfig/contact.service";
import { RecMsgsService } from "./BackendConfig/rec-msgs.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    
    SigninComponent,
    SignupComponent,
    
    //Admin
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileInsightsComponent,
    UserDataComponent,
    
    //User 
    UserProfileComponent,
    EditUserComponent,
    BookingHistoryComponent,
    UserSidebarComponent,

    //Extra
    ProfileComponent,

    //Event Prof
    ProfMainComponent,
    ProfSidebarComponent,
    ProfEditProfileComponent,
    ProfBookingComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,

    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,

    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,

  ],
  providers: [
    UserService,
    SampleUserService,
    AuthenticationService,
    GetUserService,
    ContactService,
    RecMsgsService,
    MatSort,
  ],
  bootstrap: [AppComponent],
  schemas:   [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  
 }
