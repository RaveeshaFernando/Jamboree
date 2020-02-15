import { Injectable } from '@angular/core';
import { Booking } from "./booking.model";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  userBooking : Booking = new Booking();

  constructor(private firestore : AngularFirestore) { }

  //list document from firestore collection
  getBooking() {
    return this.firestore.collection('Booking').snapshotChanges();
  }
}
