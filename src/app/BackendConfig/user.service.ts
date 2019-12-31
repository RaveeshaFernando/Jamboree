import { Injectable } from '@angular/core'; 
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from "./user.model";
import { map } from "rxjs/operators";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//retrieving a document from the collections
/*this.UsersCollection = this.afs.collection('Users');
this.Users = this.UsersCollection.snapshotChanges();

this.Users.pipe(
  map(changes => {
    return changes.map(change =>{
      const userData = change.payload.doc.userData();
      const id = change.payload.doc.id;
      return {id, userData};
    });
  }
  ).subscribe(changes => {
    console.log(changes[0].id);
  }));*/



export class UserService {
  userData : User = new User();
  userDoc : AngularFirestoreDocument<User>;
  //userCollection: AngularFirestoreCollection<User>
  //Users: Observable<User[]>
  constructor(private firestore : AngularFirestore) {
    
   }
  getUsers(){
    return this.firestore.collection('Users').snapshotChanges();
    
  }

  addUser(user: User){
    this.firestore.collection('Users').add(User);
  }

  /*updateUser(user: User) {
    this.userDoc = this.firestore.doc('Sample/${User.id}');
    this.userDoc.update(user);*/

  }
  /*editUser(user: User) {
    this.userCollection.add(user);
  }*/





