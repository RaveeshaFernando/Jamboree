import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {formatDate } from '@angular/common';


import { Contact } from 'src/app/BackendConfig/contact.model';
import { ContactService } from 'src/app/BackendConfig/contact.service';
import { RecMsgs } from "src/app/BackendConfig/rec-msgs.model";
import { RecMsgsService } from "src/app/BackendConfig/rec-msgs.service";
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-profile-insights',
  templateUrl: './profile-insights.component.html',
  styleUrls: ['./profile-insights.component.scss']
})
export class ProfileInsightsComponent implements OnInit {
  year= new Date().getFullYear();
  date = new Date().getDate();
  month = new Date().getMonth();
  hour = new Date().getHours();
  minute = new Date().getMinutes();
  min : string = "0" ;
  mon : number = this.month + 1 ;
  ms ;
  
    constructor(
      private Msg : ContactService,
      private Rmsg : RecMsgsService,
      private toastr : ToastrService,
      private firestore : AngularFirestore,
      ) { }

  getMessageList : Contact[];
  getUserMessages : RecMsgs[];

  ngOnInit() {
  if(this.minute<10){
      this.min = this.min + this.minute.toString(); 
  }
  else{
    this.min = this.minute.toString(); 
  }
  this.resetForm();

  //Data retrieving from firestore
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
    this.firestore.collection('Contact').add(data);
    this.toastr.success('Message Sent Sucessfully', 'Jamboree.NewMessage');
    this.resetForm(form);
  }

  resetForm(form ?: NgForm){
    if(form!=null)
      form.resetForm();
      this.Msg.sendMessage= {
        id : null ,
        name : 'Jamboree Team',
        email : 'jamboree.inco@gmail.com' ,
        message : '' ,
        date : this.year + '/' + this.mon  + '/' + this.date,
        time : this.hour + ':' + this.min + 'Hrs',
        receiverType : '',
        receiver : ' '
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

  showFrame(ms , frame2){
    this.ms = ms ;
    frame2.show();
  }
}
