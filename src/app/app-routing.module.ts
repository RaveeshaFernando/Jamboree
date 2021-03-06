// Core
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

// Authentication
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SearchResultComponent } from './SharedComponents/search-result/search-result.component';
import { AuthGuard } from './guards/auth.guard';
import { InnerPagesGuard } from './guards/inner-pages.guard';
import { ProfessionalGuard } from './guards/professional.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

// Admin panel - imports
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ProfileInsightsComponent } from './Admin/profile-insights/profile-insights.component';
import { UserDataComponent } from './Admin/userdata/userdata.component';
import { ExtrasComponent } from './Admin/extras/extras.component';
import { LogComponent } from './Admin/log/log.component';

// User Panel - Imports
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { EditUserComponent } from './User/edit-user/edit-user.component';
import { BookingHistoryComponent } from './User/booking-history/booking-history.component';
import { UserDeleteComponent } from './User/user-delete/user-delete.component';
import { EventProfRequestComponent } from './User/event-prof-request/event-prof-request.component';
import { MessageComponent } from './User/message/message.component';

// Event proffessional - Imports
import { ProfEditProfileComponent } from './eventProf/prof-edit-profile/prof-edit-profile.component';
import { ProfMainComponent } from './eventProf/prof-main/prof-main.component';
import { MessagingComponent } from './eventProf/messaging/messaging.component';
import { BookingComponent    } from './eventProf/booking/booking.component';

// Dynamic Content
import { FilterPageComponent } from './Dynamic/filter-page/filter-page.component';
import { ViewComponent } from './Dynamic/view/view.component';
import { FilterPageProComponent } from './Dynamic/filter-page-pro/filter-page-pro.component';
import { AboutComponent } from './Dynamic/about/about.component';
import { DisplayPageComponent } from './Dynamic/display-page/display-page.component';
import { DisplayPageBarComponent } from './Dynamic/display-page-bar/display-page-bar.component';

const routes: Routes = [
  { path: '',                     component: HomeComponent },

  { path: 'Signin',               component: SigninComponent    },
  { path: 'Signup',               component: SignupComponent    },
  { path: 'Profile',              component: ProfileComponent },
  { path: '',                     component: HomeComponent },

  { path: 'DynamicUser/:id',      component: DisplayPageComponent },
  { path: 'FilterPage/:type' ,    component: FilterPageComponent},
  { path: 'View/:id'         ,    component: ViewComponent},
  { path: 'FilterPagePro/:type' , component: FilterPageProComponent},

  // Admin Panel
  { path: 'dashboard',            component: DashboardComponent, canActivate: [AdminGuard] ,  },
  { path: 'profile-insights',     component: ProfileInsightsComponent, canActivate: [AdminGuard] },
  { path: 'user-data',            component: UserDataComponent, canActivate: [AdminGuard] },
  { path: 'Extra',                component: ExtrasComponent, canActivate: [AdminGuard] },
  { path: 'ActivityLog',          component: LogComponent, canActivate: [AdminGuard] },

  // User Panel
  { path: 'UserEditUser',         component: EditUserComponent , canActivate: [UserGuard]},
  { path: 'UserBooking',          component: BookingHistoryComponent, canActivate: [UserGuard]},
  { path: 'UserDelete' ,          component: UserDeleteComponent , canActivate: [UserGuard]},
  { path: 'EventProfRequest' ,    component: EventProfRequestComponent, canActivate: [UserGuard]},
  { path: 'UserProfile',          component: UserProfileComponent, canActivate: [UserGuard]},
  { path: 'Message',              component: MessageComponent, canActivate: [UserGuard] },

  // Event Professional
  { path: 'EventMain',            component: ProfMainComponent , canActivate: [ProfessionalGuard]},
  { path: 'EventEditProfile',     component: ProfEditProfileComponent, canActivate: [ProfessionalGuard]},
  { path: 'Messaging',            component: MessagingComponent  , canActivate: [ProfessionalGuard]},
  { path: 'Booking',              component: BookingComponent   , canActivate: [ProfessionalGuard]},
  { path: 'EventMain',            component: ProfMainComponent , canActivate: [ProfessionalGuard]},
  { path: 'EventEditProfile',     component: ProfEditProfileComponent , canActivate: [ProfessionalGuard]},
  { path: 'SearchResult/:id',      component: SearchResultComponent   , canActivate: [ProfessionalGuard]},
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
