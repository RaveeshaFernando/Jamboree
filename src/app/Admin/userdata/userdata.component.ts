import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/BackendConfig/user.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/BackendConfig/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserDataComponent implements OnInit {

  getUserList : User[] ;

  totalCount: number;
  total : number = 0 ;

  constructor(
    private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.resetForm();

    //Data retrieving from firestore
    this.users.getUsers().subscribe(dataArray => {
      this.totalCount = dataArray.length;
      
      this.getUserList = dataArray.map(item =>{
        this.total ++ ;
        console.log(this.total);          
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

  //Data sending to firestore
  onSubmit(form : NgForm){ 
    let data = Object.assign({}, form.value) ;
    delete data.id ;
    if(form.value.id==null){
      if (form.value.Password == form.value.RePassword){
        console.log("sucess");
        this.firestore.collection('users').add(data);
        this.toastr.success('User Added Sucessfully', 'Jamboree.NewUser');
      }
      else {
        console.log("Failed");
        this.toastr.error('Passwords not matching', 'Jamboree.NewUser');
      }
    }
    else{
      this.firestore.doc('users/' + form.value.id).update(data);
      this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdata');

    }

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
}