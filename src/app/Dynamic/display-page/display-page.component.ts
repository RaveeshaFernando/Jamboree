import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/BackendConfig/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss']
})
export class DisplayPageComponent implements OnInit {

  flag: Boolean
  Log: any
  id: any;
  user: User;

  constructor(
    private route: ActivatedRoute,
    public authService : AuthService ,
    private store: AngularFireStorage, private firestore: AngularFirestore) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetchUser();
    });

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user ;
      });
    });
  } 
  fetchUser() {
    if (!!this.id) {
      this.firestore.collection('users').doc(this.id.toString()).snapshotChanges().subscribe(data => {
        this.user = data.payload.data() as User;
        console.log(this.user);
      });
    }
  }

  onSubmit(form : NgForm){
    console.log("avaaaaa methanata");
    let data = Object.assign({}, form.value) ;
    this.firestore.collection('Booking').add(data);
    // this.firestore.collection('Booking').add({
    //   userId:this.Log.uid,
    //   profId:this.user.uid,
    //   userComplete:false,
    //   eventComplete:false,
    //   status:"pending",
    //   cancel:false ,
      // userName : data.userName ,
      // profName : data.profName ,
      // userMail : data.userMail ,
      // profMail : data.profMail ,
      // eventName : data.eName ,
      // eventDistrict : data.district ,
      // eventLocation : data.city ,
      // eventDate : (new Date()).toLocaleString ,
      // note : data.description
    // });
    // console.log(form);
  }
}