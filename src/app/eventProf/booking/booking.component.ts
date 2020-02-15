import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;
import { map } from 'rxjs/operators'

export interface booking {
  date :string;
  eventType: string;
  userDisplayName: string;
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
              // console.log(bookings.payload.doc.data())
              if(!flag && bookings.payload.doc.data().profId==this.Log.uid){
                const id = bookings.payload.doc.id
                this.bookinglist.push(bookings.payload.doc.data());
                console.log(id);
              }
            }
          ))
        ).subscribe(c=>{
          flag = true;
        })

      });
    });
  }

}
