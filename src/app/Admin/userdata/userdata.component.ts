import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore' ;
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference} from '@angular/fire/storage'
import { DataSource } from '@angular/cdk/collections' ;
import { MatSort } from '@angular/material/sort';
import { GetUserService } from '../../Shared/get-user.service' ;

import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserDataComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  UserDetails = { 
    FirstName : '',
    LastName : '' ,
    Email : '' , 
    Mobile :'',
    UserType : '',
    Password: '',
    Etype : '',
    District : '',
    Description : '',
    DisplayPic : ''
  }

  displayedColumns  = ['FirstName' , 'LastName' , 'Email' , 'Mobile' , 'UserType','Etype','District','Edit' ,'Delete'];
  dataSource = new UserDataSource(this.User); 
  
  defaultImage : string  = '/assets/img/default-avatar.png' ;
  SelectedImage : any = null ;

  constructor(
    private User : GetUserService ,
    private Data : AngularFirestore ,
    private afStorage: AngularFireStorage
  ) { }

  showPreview(event : any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.defaultImage = e.target.result ;
      reader.readAsDataURL(event.target.files[0]);
      this.SelectedImage = event.target.files[0];
    }
    else{
      this.defaultImage = '/assets/img/default-avatar.png' ;
      this.SelectedImage = null ;
    }
  }

  addUser(){
    const imagePath = "DisplayPictures/"  + this.UserDetails.UserType + "/" + this.UserDetails.Email ;
    const imageRef = this.afStorage.ref(imagePath);
    const task = this.afStorage.upload(imagePath,this.SelectedImage);

    task.snapshotChanges().pipe(
        finalize(() => {
          imageRef.getDownloadURL().subscribe((url) => {
            this.UserDetails.DisplayPic = url ;
            this.User.addUser(this.UserDetails);    
          })
        })
     )
    .subscribe()
    
  }

  deleteUser(email : any){
    console.log(email);
    //this.Data.doc('Users/'+ email).delete();
  }

  ngOnInit() {
    //this.dataSource.sort = this.sort;
    this.User.getUsers().subscribe(userArray =>{
      
    })
  }
}

export class UserDataSource extends DataSource<any>{
    constructor (private user : GetUserService){
      super();
    }

    connect(){
      return this.user.getUsers();
    }
    disconnect(){}
}