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
<<<<<<< Updated upstream
import {Router}  from '@angular/router'

=======
import { Router }  from '@angular/router';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
  imgSrc : string;
  selectedImg : any = null;
  isSubmitted : boolean = false;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  image: string = null;
  list: photo[];
  message: string = '';

>>>>>>> Stashed changes
  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

<<<<<<< Updated upstream
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
=======
  formTemplate = new FormGroup( {
    imageUrl : new FormControl('',Validators.required),
  })
>>>>>>> Stashed changes


  constructor(private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    public route:Router,
    private storage : AngularFireStorage)
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
     //upload image in firestore storage (user)
     uploadImage(event) {
      let file = event.target.files[0];
      let path = `user/${file.name}`;
      if (file.type.split('/')[0] !== 'image') {
        return alert('Error in upload image');
      } else {
        let ref = this.storage.ref(path);
        let task = this.storage.upload(path, file);
        this.uploadPercent = task.percentageChanges();
        console.log('Image upload success');
        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = ref.getDownloadURL();
            this.downloadURL.subscribe(url => {
              this.message = url;
              this.UploadURL();
              this.message = url;
              console.log('.......image uploading........\n'+url);
            });
          }
          )
        ).subscribe();
      }
    }

<<<<<<< Updated upstream
  ngOnInit() {
    this.resetForm();
    var count : number = 0 ;


    //Data retrieving from firestore
    /*this.users.getUsers().subscribe(dataArray => {
      this.getUserList = dataArray.map(item =>{
        count ++ ;
        console.log(count);
        return {id : item.payload.doc.id,
        ...item.payload.doc.data()
        } as User
      })

    })*/

    //*********** */
    /*var docRef = this.firestore.collection("users").doc("ymocxIkpb0Rm91Sg6zbuj9PsidA3");
    docRef.get().subscribe(function(doc)  {
      if(doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!!!!");
      }
    })*/

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user
      });
    });
  }
=======
    //store image url into firestore database
    UploadURL() {
      return new Promise<any>((resolve, reject) => {
        // this.firestore
        //   .collection("userImage")
        //   .add({ data: this.message })
        //   .then(res => { }, err => { reject(err) });
        // console.log("Upload function")
        this.firestore.collection('users').doc(this.userData.uid).update({photoURL:this.message});
        //this.toastr.success('Saving...', 'Photo updated');
      });
    }

    ngOnInit() {
      this.resetForm();
      var count : number = 0 ;

      this.authService.authenticated.subscribe(isAuthed => {
        this.flag = isAuthed;
        this.Log = this.authService.GetUserData().subscribe(user => {
          this.Log = user;
          this.message = user.photoURL;
          console.log(user.photoURL + "*********************");
          console.log(this.Log);
        });
      });
    }
  // select image
  // showPreview(event : any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e:any) => this.imgSrc = e.target.result;
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.selectedImg = event.target.files[0];
  //   }
  //   else {
  //     this.imgSrc = "/assets/img/edit3.png";
  //     this.selectedImg = null;
  //   }
  // }
  //upload image
  // imgSubmit(formValue) {
  //   this.isSubmitted = true;
  // }

>>>>>>> Stashed changes

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
  //************************************* */
  onSubmit(form : NgForm){
    let data = Object.assign({}, form.value) ;
    delete data.uid ;
<<<<<<< Updated upstream

=======
    console.log(data);
    console.log(this.userData.uid);
>>>>>>> Stashed changes
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
    if(data.district!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({district:data.district});
      this.toastr.success('Saving...', 'district updated');
    }
    
    // if(data.photoURL!=""){
    //   this.firestore.collection('users').doc(this.userData.uid).update({photoURL:data.photoURL});
    //   this.toastr.success('Saving...', 'photo updated');
    // }



    // this.isSubmitted = true;
    // if (this.formTemplate.valid) {
    //   var filePath = 'user/${this.selectedImage.name}';
    //   const fileRef = this.storage.ref(filePath);
      
    //   this.storage.upload(filePath,this.selectedImg).snapshotChanges().pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe((url) => {
    //         form['imageUrl']=url;
    //       })
    //     })
    //   ).subscribe();
    // }

    


    // else{
    //   this.firestore.doc('users/' + form.value.uid).update(data);
    //   this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdate');

    // }
    this.route.navigate(['../UserProfile'])
  }
 

  // resetImg() {
  //   this.formTemplate.reset();
  //   this.formTemplate.setValue({
  //     imageUrl : '',
  //   });
  //   this.imgSrc= "/assets/img/avatar.jpg";
  //   this.selectedImg = null;
  //   this.isSubmitted = false;
  // }

  //Edit data from User
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }
  }
<<<<<<< Updated upstream
=======

  interface photo {
    id?: string;
    data?: string;
  }


>>>>>>> Stashed changes
