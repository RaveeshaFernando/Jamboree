import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/BackendConfig/user.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/BackendConfig/user.model';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserDataComponent implements OnInit {

  getUserList : User[] ; 

  constructor(
    private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.resetForm();

    //Data retrieving from firestore
    this.users.getUsers().subscribe(dataArray => {
      this.getUserList = dataArray.map(item =>{
        return {id : item.payload.doc.id,
        ...item.payload.doc.data()
      } as User
      })
    })

  }

  resetForm(form ?: NgForm){
    if(form!=null)
      form.resetForm();
      this.users.userData= {
        id : null ,
        firstName : '',
        lastName : '' ,
        email : '',
        contact : '',
        password : '',
        userType : '',
        eType : '' ,
        description : '' ,
        displayPic : '',
        district : ''
    }
  }

  //Data sending to firestore
  onSubmit(form : NgForm){ 
    let data = Object.assign({}, form.value) ;
    delete data.id ;
    if(form.value.id==null){
      if (form.value.Password == form.value.RePassword){
        console.log("sucess");
        this.firestore.collection('Users').add(data);
        this.toastr.success('User Added Sucessfully', 'Jamboree.NewUser');
      }
      else {
        console.log("Failed");
        this.toastr.error('Passwords not matching', 'Jamboree.NewUser');
      }
    }
    else{
      this.firestore.doc('Users/' + form.value.id).update(data);
      this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdata');

    }

    this.resetForm(form);
  }

  //Edit data
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }

  //Delete Data
  onDelete(id : string){
    if(confirm("Are you sure, you want to delete this record?")){
      this.firestore.doc('Users/' + id).delete();
      this.toastr.success('User deleted sucessfully', 'Jamboree.UserDelete');

    }
  }
}
