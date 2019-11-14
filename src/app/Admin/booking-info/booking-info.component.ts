import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore' ;
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference} from '@angular/fire/storage'
import { DataSource } from '@angular/cdk/collections' ;
import { MatSort } from '@angular/material/sort';
import { GetUserService } from './../../Shared/get-user.service' ;
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.scss']
})
export class BookingInfoComponent implements OnInit {

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

  displayedColumns  = ['FirstName' , 'LastName' , 'Email' , 'Mobile' , 'UserType','Etype','District','DisplayPic'];
  dataSource = new UserDataSource(this.User); 
  
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  
  constructor(
    private User : GetUserService ,
    private Data : AngularFirestore ,
    private afStorage: AngularFireStorage
  ) { }

  uploadProgress: Observable<number>;

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
  }

  downloadURL: Observable<string>;

  addUser(){
    this.User.addUser(this.UserDetails);
  }
  
  ngOnInit() {
    //this.dataSource.sort = this.sort;
    
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

  
