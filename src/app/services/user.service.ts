// import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators'

// import { User } from '../User';

// export class UserService {
//   userCollection : AngularFirestoreCollection<User>;
//   Users: Observable<User[]>;
  
//   constructor(public afs: AngularFirestore) {
//     //this.Users = this.afs.collection('Users').valueChanges();
//     //getting access to the id valueChanges-->sanpshotChanges
//     this.Users = this.afs.collection('Users').snapshotChanges().pipe(map(changes =>{
//       return changes.map(a => {
//         const data = a.payload.doc.data() as User;
//         data.id = a.payload.doc.id;
//         return data;
//       })
//     }))
//   }

//   getUsers(){
//     return this.Users;
//     // return "Hello";
//   }
// }

