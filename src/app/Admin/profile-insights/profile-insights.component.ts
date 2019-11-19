import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/BackendConfig/contact.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from 'src/app/BackendConfig/contact.model';

@Component({
  selector: 'app-profile-insights',
  templateUrl: './profile-insights.component.html',
  styleUrls: ['./profile-insights.component.scss']
})
export class ProfileInsightsComponent implements OnInit {
    constructor(
      private Msg : ContactService,
      private toastr : ToastrService,
      private firestore : AngularFirestore
    ) { }

  getMessageList : Contact[];

  ngOnInit() {
  this.resetForm();

  //Data retrieving from firestore
  this.Msg.getMessage().subscribe(dataArray => {
    this.getMessageList = dataArray.map(item =>{
    return {id : item.payload.doc.id,
          ...item.payload.doc.data()
          } as Contact
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
}
