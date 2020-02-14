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
  shani2 :boolean;

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
        console.log(this.currentDate);
        
      } else {
        localStorage.setItem('users', null);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(false);
      }
    })
   }

  ngOnInit() {
    this.shani=true;
    this.shani2 = true;
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

    this.booking.getBooking().subscribe(date => {
      this.userBooking = date;

      if(this.shani2) {
        this.shani2 = false;
        this.userBooking.forEach(user => {
          var newdate = user.payload.doc.data();
          console.log(this.currentDate);
          var bookDate=new Date(newdate.date.toDate());
          console.log(bookDate);
          this.currentDate.setDate(this.currentDate.getDay());
          bookDate.setDate(bookDate.getDay());
          if(this.currentDate > bookDate){
            console.log("here");
            this.flag = true;
            return;

          }
          this.currentDate.setDate(this.currentDate.getDay()+5);
          if(this.currentDate<bookDate){
            this.flag = false;
            console.log("hereeeeeee");
            this.currentDate.setDate(this.currentDate.getDay()-5);
            return;

          }
          // else if(this.currentDate.getDate() < (newdate.date-5) )
        })
      }

    })
  }

  onComplete() {

  }
}
