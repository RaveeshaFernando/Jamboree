import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/BackendConfig/user.service";
import { AuthService } from "./../../BackendConfig/auth.service";
import { User } from "src/app/BackendConfig/user.model";
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router }  from '@angular/router';
import { FormGroup , FormControl , Validators } from '@angular/forms'


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  getUserList: User[];
  editState: boolean = false;
  userToEdit: User;
  userData: any;  

  flag: Boolean
  Log: any
  userSubject = new BehaviorSubject<Boolean>(false);

  imgSrc : string = "/assets/img/avatar.jpg";
  selectedImg : any = null;
  isSubmitted : boolean = false;

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  formTemplate = new FormGroup( {
    imageUrl : new FormControl('',Validators.required),
  })

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


  constructor(private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    public route:Router)
     {

      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', this.userData.uid);
          this.userData.uid;
          console.log(this.userData.uid);
          this.Log = localStorage.getItem('user');
          this.userSubject.next(true);
        } else {
          localStorage.setItem('user', null);
          this.Log = localStorage.getItem('user');
          this.userSubject.next(false);
        }
      })

     }

  ngOnInit() {
    this.resetForm();
    var count : number = 0 ;

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user
      });
    });
  }
  //select image image
  showPreview(event : any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    }
    else {
      this.imgSrc = "/assets/img/edit3.png";
      this.selectedImg = null;
    }
  }
  //upload image
  imgSubmit(formValue) {
    this.isSubmitted = true;
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
        //displayPic : '',
        district : '',
        emailVerified : false,
        photoURL : '',
        displayName : '',
    }
  }

  //data sending to firestore
  onSubmit(form : NgForm){ 
    let data = Object.assign({}, form.value) ;
    delete data.uid ;
    
    if(data.email!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({email:data.email})
      this.toastr.success('Saving...', 'email updated');
    }
    if(data.firstName!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({firstName:data.firstName});
      this.toastr.success('Saving...', 'Firstname updated');
    }
    if(data.lastName!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({lastName:data.lastName});
      this.toastr.success('Saving...', 'lastname updated');
    }
    if(data.contact!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({contact:data.contact});
      this.toastr.success('Saving...', 'contact updated');
    }

    
    // else{
    //   this.firestore.doc('users/' + form.value.uid).update(data);
    //   this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdate');
      
    // }
    this.route.navigate(['../UserProfile'])
  }
  //Edit data from User
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }
  }


