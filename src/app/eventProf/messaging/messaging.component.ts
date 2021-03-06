import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecMsgsService } from 'src/app/BackendConfig/rec-msgs.service';
import { Contact } from 'src/app/BackendConfig/contact.model';
import { RecMsgs } from 'src/app/BackendConfig/rec-msgs.model';
import { AuthService } from 'src/app/BackendConfig/auth.service';
import { MessageService } from 'src/app/BackendConfig/message.service';
import { Message } from 'src/app/BackendConfig/message.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  flag: Boolean ;
  Log;
  list:Message[];
  Msg: Contact[];

  constructor(
    private Rmsg : RecMsgsService,
    private toastr : ToastrService,
    private firestore : AngularFirestore,
    public authService : AuthService ,
    private service: MessageService
  ) { }

  getMessageList : Contact[];
  getUserMessages : RecMsgs[];

  ngOnInit() {
      // this.authService.GetUserData().subscribe(user=>{
      //   this.Log = user ;
      // })

      // this.firestore.collection('Contact',ref=> ref.where("Receiver","==","this.Log.email")).snapshotChanges().subscribe(actionArray=>{
      //   this.Msg = actionArray.map(item=>{
      //     return {
      //      id : item.payload.doc.id,
      //      ...item.payload.doc.data()
      //     } as Contact
      //     })
      //   })
      
      
      this.authService.GetUserData().subscribe(user => {
        this.Log = user.email;

      })
      console.log(this.Log);        

      // this.service.getMessage(this.Log)
      // .pipe()
      // .subscribe(
      //   item => {
      //   }
      // );
        
    //   this.service.getMessage(this.Log).subscribe(actionArray => {
      
    //   this.list = actionArray.map(item => {
    //   return{
    //     // : item.payload.doc.id, 
    //     ...item.payload.doc.data()
    //   } as Message;
    // })
    // })
  } 
}
