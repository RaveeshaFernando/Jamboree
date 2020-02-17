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
  status=true;

  flag=[];
  Log:  any
  userSubject = new BehaviorSubject<Boolean>(false);
  d : Date ;
  a : Date ;
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
  )
  {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('users', this.userData.uid);
        this.userData.uid;
        //console.log(this.userData.uid);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(true);
        //console.log(this.currentDate);
        
      } else {
        localStorage.setItem('users', null);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(false);
      }
    })
  }

  ngOnInit() {
    // this.d = new Date();
    // console.log("Today :"+ this.d);
    // a.setDate(this.d.getDate()-25);
    // console.log("new  :"+ this.d);
    
    
    this.shani=true;
    this.shani2 = true;

    this.authService.authenticated.subscribe(isAuthed => {
    //this.flag = isAuthed;
    this.Log = this.authService.GetUserData().subscribe(user => {
      this.Log = user;
      this.booking.getBooking().subscribe(data=>{
        this.userBooking=data;
        console.log(data);

        //retrieve user bookings by userId and uid
        if(this.shani){
          this.shani = false;
          this.userBooking.forEach(user=>{
            var newuser=user.payload.doc.data();
            newuser.id=user.payload.doc.id;
            if((this.userData.uid===newuser.userId )){
              this.getBookingList.push(newuser);
              //var result = angular.equals(newuser.userId, this.userData.uid);
            }
          });
        }
        //comparing currentdate and eventdate
          this.booking.getBooking().subscribe(date => {
            this.userBooking = date;
            if(this.shani2) {
              this.shani2 = false;
              
              this.userBooking.forEach(user => {
                var newdate = user.payload.doc.data();
                newdate.id=user.payload.doc.id;
                
                console.log(newdate);
                var bookDate=newdate.Date;
                console.log(bookDate);
                var resBook = bookDate.split("-");
                var resCur = this.currentDate.toISOString().split('T')[0];
                console.log(this.currentDate.toISOString().split('T')[0]);
                var resCurr = resCur.split("-");
                var bookDateNew = new Date(resBook[0],resBook[1]-1,resBook[2]);
                console.log(resCurr[1]);
                var currentDateNew = new Date(parseInt(resCurr[0]),parseInt(resCurr[1])-1,parseInt(resCurr[2]));
                //this.currentDate.setDate(this.currentDate.getDay());
                //bookDate.setDate(bookDate.getDay());
                console.log(bookDateNew);
                console.log(currentDateNew);
                if((this.userData.uid===newdate.userId )){
                  if(currentDateNew > bookDateNew){
                    console.log("kolaaaaaa");
                    this.flag.push(true);
                    // this.flag = true;
                    return;
                  }
  
                  //a.setDate(a.getDate()+1)
                  //currentDateNew.setDate(currentDateNew.getDate()+5);
                  else if(currentDateNew < bookDateNew){
                    console.log("rathuuuuuu");
                    this.flag.push(false);
                    // this.flag = false;
                    //currentDateNew.setDate(currentDateNew.getDate()-5);
                    return;
                  }
                  
                  //var result = angular.equals(newuser.userId, this.userData.uid);
                }
                
                console.log(this.flag);
                //this.flag = false;
                //currentDateNew.setDate(currentDateNew.getDate()-5);
              })
            }
            console.log(this.flag)
          })
        })
      }); 
    });

    
  }

  //booking complete button
  //set userComplete as true.
  onComplete(id) {
    this.status=false;
    console.log(id)
    this.firestore.collection('Booking').doc(id).update({userComplete: true}).then(a=>{
      location.reload();
    });
    
  }
}
