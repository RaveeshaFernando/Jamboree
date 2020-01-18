import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from '../../BackendConfig/auth.service';
import { NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-prof-edit-profile',
  templateUrl: './prof-edit-profile.component.html',
  styleUrls: ['./prof-edit-profile.component.scss']
})
export class ProfEditProfileComponent implements OnInit {
  message: string = '';

  profileForm = this.formBuilder.group({
    eType: [''],
    email: [''],
    contact: [''],
    description: ['']
  });

  flag: Boolean
  Log: any
  user: any


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  image: string = null;
  list: photo[];


  constructor(public authService: AuthService,
    private formBuilder: FormBuilder,
    private store: AngularFireStorage, private firestore: AngularFirestore) { }

  uploadImage(event) {
    let file = event.target.files[0];
    let path = `profile_images/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Error in upload image');
    } else {
      let ref = this.store.ref(path);
      let task = this.store.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      console.log('Image upload success');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.message = url;
            this.UploadURL();
            this.message = url;
            console.log('aghdfga'+url);
          });
        }
        )
      ).subscribe();
    }
  }

  UploadURL() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("usersImages")
        .add({ data: this.message })
        .then(res => { }, err => { reject(err) });
      console.log("Upload function")
    });
  }

  ngOnInit() {
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user;
        this.message = user.photoURL;
        console.log(this.Log);
      });
    });
  }

  updateData(formData) {
    const promise = this.firestore.firestore.collection('users').doc(localStorage.getItem("user") as string).get();
    promise.then( snapshot =>{
      this.user = snapshot.data();
      this.user.eType = formData.eType;
      this.user.email = formData.email;
      this.user.contact = formData.contact;
      this.user.description = formData.description;
      this.user.photoURL = this.message;
      this.firestore.collection("users").doc(this.user.uid).update(this.user);
    });

   //console.log(this.user);
    // this.firestore.collection("users").doc(this.Log.uid).update({
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   eType: formData.eType,
    //   email: formData.email,
    //   username: formData.username,
    //   profileImageURl:this.message
    // }).then(res => {
    //   console.log("success");
    // }, err => {
    //   console.log(err.message);
    // }

    // );
  }

  

}
interface photo {
  id?: string;
  data?: string;
}





