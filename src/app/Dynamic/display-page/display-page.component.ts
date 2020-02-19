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
  list:photo[];

userId;
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

    this.firestore.collection('CustomerPosts').snapshotChanges().subscribe(actionArray =>{
      this.list = actionArray.map(item => {
        return{id : item.payload.doc.id,
          ...item.payload.doc.data() 
          } as photo
      })
    })

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user ;
        this.userId = user.uid;
        // console.log(this.userId);
      });
    });

    // console.log(this.userId);

  } 

  fetchUser() {
    if (!!this.id) {
      this.firestore.collection('users').doc(this.id.toString()).snapshotChanges().subscribe(data => {
        this.user = data.payload.data() as User;
        console.log("mama :" + this.user);
      });
    }
  }

  onSubmit(form : NgForm){
    let data = Object.assign({}, form.value) ;
    data.status = "pending" ;
    data.eventComplete = "false" ;
    data.userComplete = "false" ;
    data.cancel = "false" ;
    this.firestore.collection('Booking').add(data).then(doc => {
      doc.update({
        bid : doc.id
      })
    });
  }
}

interface photo {
  id?:string;
  data?:string;
}