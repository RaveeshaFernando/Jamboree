import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore' ;
import { DataSource } from '@angular/cdk/collections' ;
import { MatSort } from '@angular/material/sort';
import { GetUserService } from './../../Shared/get-user.service' ;
import { MatTableDataSource } from '@angular/material';


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

  constructor(
    private User : GetUserService ,
    private Data : AngularFirestore 
  ) { }

  addUser(){
    this.User.addUser(this.UserDetails);
  }

  // selectedFile: File
  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0]
  // }

  
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

    sort(){
      
    }
}