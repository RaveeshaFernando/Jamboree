import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/BackendConfig/user.model';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from "@angular/material";

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
  userId: any;
  image: string = null;
  list:photo[];
  minDate: any;

  constructor(
    private route: ActivatedRoute,
    public authService : AuthService ,
    private store: AngularFireStorage, private firestore: AngularFirestore) {

      
  }

  ngOnInit() {

    this.minDate = new Date();

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

        this.firestore.collection("CustomerPosts",ref=>
        ref.where('id','==',this.user.uid )).valueChanges().subscribe(
          imageList=>{
            this.list = imageList as photo[];
            console.log(this.list);
          }
        )
      });
    });   
    console.log(this.userId);

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
  previewImage(image : any,frame : any){
    this.image = image.data;
    frame.show();
  }
}


interface photo {
  id?:string;
  data?:string;
}