import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../User';

export class UserService {
  userCollection : AngularFirestoreCollection<User>;
  Users: Observable<User[]>;
  
  constructor(public afs: AngularFirestore) {
    this.Users = this.afs.collection('Users').valueChanges();
   }

  getUsers(){
    return this.Users;
    // return "Hello";
  }
}

