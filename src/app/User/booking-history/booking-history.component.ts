import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';

import { Router }  from '@angular/router';

import { analytics } from 'firebase';
import { Booking } from 'src/app/BackendConfig/booking.model';
import { BookingService } from 'src/app/BackendConfig/booking.service';

import { User } from 'src/app/BackendConfig/user.model';
import { UserService } from 'src/app/BackendConfig/user.service';
import { map } from 'rxjs/operators'


import { AuthService } from "./../../BackendConfig/auth.service";

import { formatDate }  from "@angular/common";

export interface booking {
  bid: string;
  date :string;
  eventType: string;
  userName: string;
  profId: string;
  userId: string;
  status: string;
  userComplete: string;
  eventComplete: string;
  cancel: string;
}

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

  //flag=[];
  //Log:  any
  userSubject = new BehaviorSubject<Boolean>(false);
  d : Date ;
  a : Date ;

  flag: Boolean
  flag2 : Boolean 
  Log: any
  list:booking[];
  BookList : Booking[]
  compDate = new Date();


  currentDate = new Date();

  private bookDoc: AngularFirestoreCollection<booking>
  bookings: Observable<booking[]>
  bookinglist: booking[] = [] as booking[]
  bookinglist2: booking[] = [] as booking[]
  bookinglist3: booking[] = [] as booking[]
  
  tempBooking: booking = {} as booking;

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
    
    
    //this.shani=true;
    //this.shani2 = true;
    let flag: boolean = false;
    this.authService.authenticated.subscribe(isAuthed => {
    this.flag = isAuthed;
    this.Log = this.authService.GetUserData().subscribe(user => {
      this.Log = user;
      this.bookDoc = this.firestore.collection('Booking')

      this.bookDoc.snapshotChanges().pipe(
        map(items=>items.map(
          bookings=>{
           
            if(!flag && bookings.payload.doc.data().userId ==this.Log.uid && bookings.payload.doc.data().eventComplete=="false"  && bookings.payload.doc.data().status=="accepted"){
              this.bookinglist2.push(bookings.payload.doc.data());

              var newdate = bookings.payload.doc.data();
              newdate.id=bookings.payload.doc.id;
              
              var bookDate=newdate.Date;
              var resBook = bookDate.split("-");
              var resCur = this.currentDate.toISOString().split('T')[0];
              var resCurr = resCur.split("-");
              var bookDateNew = new Date(resBook[0],resBook[1]-1,resBook[2]);
              var currentDateNew = new Date(parseInt(resCurr[0]),parseInt(resCurr[1])-1,parseInt(resCurr[2]));
              
              console.log("Book Date : " + bookDateNew);                
              bookDateNew.setDate(bookDateNew.getDate()-7);
              console.log("Comp Date : " + bookDateNew);
              console.log("Ada Date : " + this.currentDate);
              console.log(this.currentDate > bookDateNew)

              if(this.currentDate > bookDateNew){this.firestore.collection('Booking').doc(newdate.id).update({cancel:"false"});}
              else{this.firestore.collection('Booking').doc(newdate.id).update({cancel:"true"});}
            }
            else if(!flag && bookings.payload.doc.data().userId==this.Log.uid && (bookings.payload.doc.data().status=="completed" || bookings.payload.doc.data().status=="rejected" || bookings.payload.doc.data().status=="cancelled" || bookings.payload.doc.data().cancel=="false")){
              const id = bookings.payload.doc.id;
              this.bookinglist3.push(bookings.payload.doc.data()); 
            }
          }
        ))
      ).subscribe(c=>{
        flag = true;
      });

    });
  });

      // this.booking.getBooking().subscribe(data=>{
      //   this.userBooking=data;
      //   console.log(data);

        //retrieve user bookings by userId and uid
        // if(this.shani){
        //   this.shani = false;
        //   this.userBooking.forEach(user=>{
        //     var newuser=user.payload.doc.data();
        //     newuser.id=user.payload.doc.id;
        //     if((this.userData.uid===newuser.userId )){
        //       this.getBookingList.push(newuser);
        //       //var result = angular.equals(newuser.userId, this.userData.uid);
        //     }
        //   });
        // }
        // //comparing currentdate and eventdate
        //   this.booking.getBooking().subscribe(date => {
        //     this.userBooking = date;
        //     if(this.shani2) {
        //       this.shani2 = false;
              
        //       this.userBooking.forEach(user => {
        //         var newdate = user.payload.doc.data();
        //         newdate.id=user.payload.doc.id;
                
                // console.log(newdate);
                // var bookDate=newdate.Date;
                // console.log(bookDate);
                // var resBook = bookDate.split("-");
                // var resCur = this.currentDate.toISOString().split('T')[0];
                // console.log(this.currentDate.toISOString().split('T')[0]);
                // var resCurr = resCur.split("-");
                // var bookDateNew = new Date(resBook[0],resBook[1]-1,resBook[2]);
                // console.log(resCurr[1]);
                // var currentDateNew = new Date(parseInt(resCurr[0]),parseInt(resCurr[1])-1,parseInt(resCurr[2]));
                //this.currentDate.setDate(this.currentDate.getDay());
                //bookDate.setDate(bookDate.getDay());
                // console.log(bookDateNew);
                // console.log(currentDateNew);
                // if((this.userData.uid===newdate.userId )){
                //   if(currentDateNew > bookDateNew){
                //     console.log("kolaaaaaa");
                //     this.flag.push(true);
                //     // this.flag = true;
                //     return;
                //   }
  
                //   //a.setDate(a.getDate()+1)
                //   //currentDateNew.setDate(currentDateNew.getDate()+5);
                //   else if(currentDateNew < bookDateNew){
                //     console.log("rathuuuuuu");
                //     this.flag.push(false);
                //     // this.flag = false;
                //     //currentDateNew.setDate(currentDateNew.getDate()-5);
                //     return;
                //   }
                  
                //   //var result = angular.equals(newuser.userId, this.userData.uid);
                // }
                
                //console.log(this.flag);
                //this.flag = false;
                //currentDateNew.setDate(currentDateNew.getDate()-5);
              //})
           // }
            //console.log(this.flag)
          //})
        //})
      //}); 
    //});

    
  //}

  //booking complete button
  //set userComplete as true.
  // onComplete(id) {
  //   this.status=false;
  //   console.log(id)
  //   this.firestore.collection('Booking').doc(id).update({userComplete: true}).then(a=>{
  //     location.reload();
  //   });
    
  // }
}
async changeStatus(id, status){
  await this.firestore.collection('Booking').doc(id).update({status: status });
  location.reload();
}

}