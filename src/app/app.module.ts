import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database' ;

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from 'environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent,
        ProfileComponent
    ],
    imports: [
        
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})

export class AppModule { }
