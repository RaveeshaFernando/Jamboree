import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;
import { map } from 'rxjs/operators'
import { Action } from 'rxjs/internal/scheduler/Action';
import { element } from 'protractor';

export interface booking {
  bid: string;
  date :string;
  eventType: string;
  userName: string;
  profId: string;
  status: string;
  userComplete: string;
  eventComplete: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})




export class BookingComponent implements OnInit {

  flag: Boolean
  Log: any
  list:booking[];

  private bookDoc: AngularFirestoreCollection<booking>
  bookings: Observable<booking[]>
  bookinglist: booking[] = [] as booking[]
  tempBooking: booking = {} as booking;

  constructor(
    public authService : AuthService ,
    private store: AngularFireStorage, private firestore: AngularFirestore) { 
    

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
              if(!flag && bookings.payload.doc.data().profId==this.Log.uid){
                const id = bookings.payload.doc.id;
                this.bookinglist.push(bookings.payload.doc.data());
                console.log(id);
              }
            }
          ))
        ).subscribe(c=>{
          flag = true;
        });

      });
    });

    console.log(this.bookinglist);
  }

  async changeStatus(id, status){
    await this.firestore.collection('Booking').doc(id).update({status: status });
    location.reload();
  }

}
