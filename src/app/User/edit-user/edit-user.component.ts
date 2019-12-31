import { Component, OnInit } from '@angular/core';
import { SampleUserService } from "src/app/BackendConfig/sample-user.service";
import { User } from "src/app/BackendConfig/user.model";
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  getUserList: User[];
  editState: boolean = false;
  userToEdit: User;
  imgSrc : string;
  // public imagePath;
  // imgURL: any;
  // public message: string;
 
  // preview(files) {
  //   if (files.length === 0)
  //     return;
 
  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }
 
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }
  // }

  // saveEdits() {
  //   //get the editable element
  //   var editElem = document.getElementById("edit");
  //   //get the edited element content
  //   var userVersion = editElem.innerHTML;
  //   //save the content to local storage
  //   localStorage.userEdits = userVersion;
  //   //write a confirmation to the user
  //   document.getElementById("update").innerHTML="Edits saved!";
  // }


  constructor(private users : SampleUserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();

    var count : number = 0 ;

    //Data retrieving from firestore
    this.users.getUsers().subscribe(dataArray => {
      this.getUserList = dataArray.map(item =>{
        count ++ ;
        console.log(count);
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

  //data sending to firestore
  onSubmit(form : NgForm){ 
    let data = Object.assign({}, form.value) ;
    delete data.id ;
    if(form.value.id==null){
      if (form.value.Password == form.value.RePassword){
        console.log("sucess");
        this.firestore.collection('Sample').add(data);
        this.toastr.success('Saving...', 'Jamboree.NewUser');
      }
      else {
        console.log("Failed");
        this.toastr.error('Passwords not matching', 'Jamboree.NewUser');
      }
    }
    else{
      this.firestore.doc('Sample/' + form.value.id).update(data);
      this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdata');

    }

    this.resetForm(form);
  }

  //Edit data from User
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }

  /*clearState() {
    this.editState = false;
    this.userToEdit = null;
  }*/

  }


