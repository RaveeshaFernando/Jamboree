import { Component, OnInit } from '@angular/core';
import { User } from "src/app/BackendConfig/user.model";
import { UserService } from "src/app/BackendConfig/user.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router }  from '@angular/router';
//import {TooltipPosition} from '@angular/material/tooltip';


@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  getUserList: User[];
  editState: boolean = false;
  userToEdit: User;
  userData: any;

  flag: Boolean
  Log: any
  userSubject = new BehaviorSubject<Boolean>(false);

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  // positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  // position = new FormControl(this.positionOptions[0]);

  constructor(
    private users : UserService,
    public afAuth: AngularFireAuth,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public route:Router,
  ) {
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
        displayName: ''
    }
  }

  //data sending to firestore
  //************************************* */
  onSubmit(form : NgForm){
    let data = Object.assign({}, form.value) ;
    delete data.uid ;
    console.log(data);
    console.log(this.userData.uid);
    // if(data.email!=""){
    //   this.firestore.collection('users').doc(this.userData.uid).update({email:data.email})
    //   this.toastr.success('Saving...', 'email updated');
    // }
    // if(data.firstName!=""){
    //   this.firestore.collection('users').doc(this.userData.uid).update({firstName:data.firstName});
    //   this.toastr.success('Saving...', 'Firstname updated');
    // }
    // if(data.lastName!=""){
    //   this.firestore.collection('users').doc(this.userData.uid).update({lastName:data.lastName});
    //   this.toastr.success('Saving...', 'lastname updated');
    // }
    if(data.eType!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({eType:data.eType});
      this.toastr.success('Saving...', 'Event Type updated');
    }
    if(data.district!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({district:data.district});
      this.toastr.success('Saving...', 'district updated');
    }
    
    
    this.route.navigate(['../UserProfile'])
  }

  // //Data sending to firestore
  // onSubmit(form : NgForm){ 
  //   let data = Object.assign({}, form.value) ;
  //   delete data.id ;
  //   if(form.value.id==null){
  //     if (form.value.Password == form.value.RePassword){
  //       console.log("sucess");
  //       this.firestore.collection('users').add(data);
  //       this.toastr.success('User Added Sucessfully', 'Jamboree.NewUser');
  //     }
  //     else {
  //       console.log("Failed");
  //       this.toastr.error('Passwords not matching', 'Jamboree.NewUser');
  //     }
  //   }
  //   else{
  //     this.firestore.doc('users/' + form.value.id).update(data);
  //     this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdata');

  //   }

  //   this.resetForm(form);
  // }

}
