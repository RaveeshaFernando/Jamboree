import { Injectable, NgZone } from '@angular/core';
import { User } from "./user.model";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  type : string = 'eventProf' ;
  userData: any;
  Log : any ;
  userSubject = new BehaviorSubject<Boolean>(false);
  item: any;

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone             // NgZone service to remove outside scope warning
  ) {



    this.afAuth.authState.subscribe(user => { 
      if (user) {
        console.log(this.userData);
        this.userData = user;
        localStorage.setItem('user', user["uid"]);
        console.log("lllll - ", localStorage.getItem('type'));

        this.afs.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(async userNew =>{
          // var AA = userNew.id
          localStorage.setItem('type', await userNew.payload.data()['userType']);
          // console.log(AA);
          console.log("hi3")
          localStorage.setItem('type',this.Log.uid);
          console.log('methenata enwa');
         // console.log(JSON.stringify(userNew));
          
        });
        
  
        //console.log(JSON.stringify(this.userData,null ,2));
        this.Log = localStorage.getItem('user');
        this.userSubject.next(true);
      } else {
        console.log("else")
        localStorage.setItem('user', null);
        localStorage.setItem('type',null);
        this.Log = localStorage.getItem('user');
        this.userSubject.next(false);
      }

    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password,fName,lName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user,fName,lName);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['Sign2']);
    })
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user,fName, lName) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      firstName: fName,
      lastName: lName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      displayName: fName + ' ' + lName,
      userType: 'User',
      contact: null,
      eType: null, 
      description: null,
      district: null ,
      age : null ,
      city : null , 
      gender: null
    }
    return userRef.set(userData, {
      merge: true
    })
  }

    
  get isLoggedIn():boolean{
    var user =  localStorage.getItem('user') ; 
    return (user !=="Professional") ? true :false;
  } 
  

  GetUserData(): Observable<any> {
    return this.afs.collection("users").doc(localStorage.getItem("user") as string).valueChanges().pipe(first());
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('type');
      this.router.navigate(['Signin']);
    })
  }


  isProfessional(){
    return this.GetUserData().pipe(map(user => {
      console.log(user.userType)
      return (user.userType == 'Professional' ) ? true : false;
    })); 
  } 
  
  isAdmin(){
    return this.GetUserData().pipe(map(user => {
      console.log(user.userType)
      return (user.userType == 'Admin' ) ? true : false;
    })); 
} 

  isUser(){
    return this.GetUserData().pipe(map(user => {
      console.log(user.userType)
      return (user.userType == 'User' ) ? true : false;
    })); 
  } 



}
