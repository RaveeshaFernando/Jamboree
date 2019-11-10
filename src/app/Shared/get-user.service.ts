import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore' ;

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor( private Data : AngularFirestore) { }

  addUser(userData){
    this.Data.collection('Users').add(userData).then(() => {
      console.log('Done');
    })
  }

  getUsers(){
    return this.Data.collection('Users', ref => ref.orderBy('FirstName')).valueChanges();
  }
}
