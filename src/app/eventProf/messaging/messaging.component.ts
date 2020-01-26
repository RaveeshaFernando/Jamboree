import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { EventProfSendMsgsService } from 'src/app/BackendConfig/event-prof-send-msgs.service';
import { RecMsgsService } from 'src/app/BackendConfig/rec-msgs.service';
import { Contact } from 'src/app/BackendConfig/contact.model';
import { RecMsgs } from 'src/app/BackendConfig/rec-msgs.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  constructor(
    private Msg : EventProfSendMsgsService,
    private Rmsg : RecMsgsService,
    private toastr : ToastrService,
    private firestore : AngularFirestore,
  ) { }

  getMessageList : Contact[];
  getUserMessages : RecMsgs[];

  ngOnInit() {
    this.resetForm();

    this.Msg.getMessage().subscribe(dataArray => {
      this.getMessageList = dataArray.map(item =>{
      return {id : item.payload.doc.id,
            ...item.payload.doc.data()
            } as Contact
        })
    })

    this.Rmsg.getRecMessage().subscribe(MsgArray => {
      this.getUserMessages = MsgArray.map(item =>{
      return {id : item.payload.doc.id,
            ...item.payload.doc.data()
            } as RecMsgs
        })
    })
  }

  onSubmit(form : NgForm){
    let data = form.value ;
    console.log("sucess");
    this.firestore.collection('EventProfSendMsgs').add(data);
    this.toastr.success('Message Sent Sucessfully', 'Jamboree.NewMessage');
    this.resetForm(form);
  }

  resetForm(form ?: NgForm){
    if(form!=null)
      form.resetForm();
      this.Msg.sendMessage= {
        id : null ,
        name : '',
        email : '' ,
        message : '' ,
        date : '' ,
        time : '' ,
        receiverType : '',
        receiver : ''
    }
  }

  //Delete Data
  onDelete(id : string){
    if(confirm("Are you sure, you want to delete this message?")){
      this.firestore.doc('Contact/' + id).delete();
      this.toastr.success('Message deleted sucessfully', 'Jamboree.MessageDelete');

    }
  }
  RecOnDelete(id : string){
    if(confirm("Are you sure, you want to delete this message?")){
      this.firestore.doc('ResMessages/' + id).delete();
      this.toastr.success('Message deleted sucessfully', 'Jamboree.MessageDelete');

    }
  }

}
