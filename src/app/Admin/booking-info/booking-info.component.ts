import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore' ;
import { DataSource } from '@angular/cdk/collections' ;
import { GetUserService } from './../../Shared/get-user.service' ;

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.scss']
})
export class BookingInfoComponent implements OnInit {

  
  UserDetails = { 
    FirstName : '',
    LastName : '' ,
    Email : '' , 
    Mobile :'',
    UserType : ''
  }

  displayedColumns  = ['FirstName' , 'LastName' , 'Email' , 'Mobile' , 'UserType'];
  dataSource = new UserDataSource(this.User); 

  constructor(
    private User : GetUserService ,
    private Data : AngularFirestore 
  ) { }

  addUser(){
    this.User.addUser(this.UserDetails);
  }

  ngOnInit() {
  }

}

export class UserDataSource extends DataSource<any>{
    constructor (private user : GetUserService){
      super();
    }

    connect(){
      return this.user.getUsers();
    }
    disconnect(){

    }
}