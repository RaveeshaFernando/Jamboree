import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;
import { map } from 'rxjs/operators'
import { Action } from 'rxjs/internal/scheduler/Action';
import { element } from 'protractor';
import { BookingService } from "../../BackendConfig/booking.service";
import { Booking } from "../../BackendConfig/booking.model";

export interface booking {
  bid: string;
  date :string;
  eventType: string;
  userName: string;
  profId: string;
  status: string;
  userComplete: string;
  eventComplete: string;
  cancel: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {

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

  constructor(
    public authService : AuthService ,
    private store: AngularFireStorage, 
    private firestore: AngularFirestore,
    private PlaceBooking : BookingService) { 
  
      


  }


  ngOnInit() {
    let flag: boolean = false;
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user ;
        this.bookDoc = this.firestore.collection('Booking')
        this.bookDoc.snapshotChanges().pipe(
          map(items=>items.map(
            bookings=>{
              if(!flag && bookings.payload.doc.data().profId==this.Log.uid && bookings.payload.doc.data().status=="pending"){
                const id = bookings.payload.doc.id;
                this.bookinglist.push(bookings.payload.doc.data());
                console.log(id);
              }
              else if(!flag && bookings.payload.doc.data().profId ==this.Log.uid && bookings.payload.doc.data().eventComplete=="false"  && bookings.payload.doc.data().status=="accepted"){
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

                if(this.currentDate > bookDateNew){
                  this.firestore.collection('Booking').doc(newdate.id).update({cancel:"false"});
                }
                else{
                  this.firestore.collection('Booking').doc(newdate.id).update({cancel:"true"});
                }
              }
              else if(!flag && bookings.payload.doc.data().profId==this.Log.uid && (bookings.payload.doc.data().status=="completed" || bookings.payload.doc.data().status=="rejected" || bookings.payload.doc.data().status=="cancelled" || bookings.payload.doc.data().cancel=="false" )){
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

    // this.PlaceBooking.getRequests().subscribe(actionArray =>{
    //   this.BookList = actionArray.map(item =>{
    //     if(item.payload.doc.data().profId == this.Log.uid && item.payload.doc.data().eventComplete=="false"  && item.payload.doc.data().status=="accepted"){
    //       return {
    //         id : item.payload.doc.id,
    //         ...item.payload.doc.data() 
    //       } as Booking;
    //     }  
    //   })
    // })
    
   
  }


  async changeStatus(id, status){
    await this.firestore.collection('Booking').doc(id).update({status: status });
    location.reload();
  }

  

}
