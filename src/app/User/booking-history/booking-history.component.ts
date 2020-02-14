import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';

import { Router }  from '@angular/router';

import { analytics } from 'firebase';
import { Booking } from 'src/app/BackendConfig/booking.model';
import { BookingService } from 'src/app/BackendConfig/booking.service';

import { User } from 'src/app/BackendConfig/user.model';
import { UserService } from 'src/app/BackendConfig/user.service';


import { AuthService } from "./../../BackendConfig/auth.service";

import { formatDate }  from "@angular/common";

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  getBookingList=[];
  userBooking: any;
  userData: any;
  shani:boolean;

  flag: Boolean
  Log:  any
  userSubject = new BehaviorSubject<Boolean>(false);

  currentDate = new Date();
 

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

 


  constructor(
    private users : UserService,
    private booking : BookingService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public route:Router,

   
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('users', this.userData.uid);
        this.userData.uid;
        console.log(this.userData.uid);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(true);
        
      } else {
        localStorage.setItem('users', null);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(false);
      }
    })
   }

  ngOnInit() {
    this.shani=true;
    console.log("kd");
    
    console.log(this.currentDate);
      
      this.authService.authenticated.subscribe(isAuthed => {
        //this.shani = false;
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user;
        this.booking.getBooking().subscribe(data=>{
          this.userBooking=data;
          if(this.shani){
            this.shani = false;
            this.userBooking.forEach(user=>{
              var newuser=user.payload.doc.data();
              // console.log(newuser.userId);
              
              if((this.userData.uid===newuser.userId)){
                
                this.getBookingList.push(newuser);
              //var result = angular.equals(newuser.userId, this.userData.uid);
              }
          });
          }
        })
      }); 
    });
  }
}
