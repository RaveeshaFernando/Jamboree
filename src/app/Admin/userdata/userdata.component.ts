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

    //Retrieve User Data From Firestore
    this.users.getUsers().subscribe(dataArray => {
      this.getUserList = dataArray.map(item =>{
        return {id : item.payload.doc.id,
        ...item.payload.doc.data() 
        } as User  
      })
    })

  }

  
  //Update or Deleting User Data
  onSubmit(form : NgForm){ 
    let data = Object.assign({}, form.value) ;
    delete data.id ;
    this.firestore.doc('users/' + form.value.id).update(data);
    this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdata');
    this.resetForm(form);
  }

  //Edit data from User
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }

  //Delete Data from Users
  onDelete(id : string){
    if(confirm("Are you sure, you want to delete this record?")){
      this.firestore.doc('users/' + id).delete();
      this.toastr.success('User deleted sucessfully', 'Jamboree.UserDelete');
    }
  }

  resetForm(form ?: NgForm){
    if(form!=null)
      form.resetForm();
      this.users.userData= {
        uid : null ,
        firstName : '',
        lastName : '' ,
        email : '',
        contact : '',
        userType : '',
        eType : '' ,
        description : '' ,
        district : '' ,
        emailVerified : null ,
        photoURL: '',
        displayName: '' ,
        age : '' ,
        city : '' , 
        gender: '' 
    }
  }

}