import { Injectable } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from "./contact.model";
import { Message } from 'src/app/BackendConfig/message.model';
import { AuthService } from 'src/app/BackendConfig/auth.service';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  formData: Message;
  Log: any

  constructor(private firestore : AngularFirestore,
    public authService : AuthService) { }
  

  getMessage(){
    this.Log = this.authService.GetUserData().subscribe(user => {
      this.Log = user ;})

      console.log(this.Log.email);
    
    return this.firestore.collection('Contact', ref => ref.where('receiver','==', "sashika2950@gmail.com")).snapshotChanges();
  }

}