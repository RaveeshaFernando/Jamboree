import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Shared/authentication.service';
import { Authentication } from 'src/app/Shared/authentication.model';
import { UserService } from "src/app/BackendConfig/user.service";
import { UserReqService } from "src/app/BackendConfig/user-req.service";
import { Requests } from "src/app/BackendConfig/user-req.model";
import { User } from 'src/app/BackendConfig/user.model';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  list : Authentication[];
  getUserList : User[] ;
  requests : Requests[];

  totalCount: number;
  total : number = 0 ;

  constructor(
    private firestore : AngularFirestore, 
    private toastr : ToastrService,
    private users : UserService,
    private service : AuthenticationService,
    private req : UserReqService ) { }

  ngOnInit() {
    this.service.getUsers().subscribe(actionArray =>{
    this.list = actionArray.map(item =>{
      return {
        id: item.payload.doc.id,
        ...item.payload.doc.data()
      } as Authentication
    })
    });

    //Data retrieving from firestore
    this.users.getUsers().subscribe(dataArray => {
      this.totalCount = dataArray.length;
      
      this.getUserList = dataArray.map(item =>{
        this.total ++ ;
        console.log(this.total);          
        return {id : item.payload.doc.id,
        ...item.payload.doc.data() 
        } as User  
      })  
    })

    this.req.getRequests().subscribe(actionArray =>{
      this.requests = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Requests  
      })
    })
  }

  changeStatus1(uid : any){
    if(confirm("Advance to event professional?")){
      this.firestore.doc('users/' + uid).update({userType:"Professional"});
      this.firestore.doc('userReq/' + uid).update({status :"approved"});
      this.toastr.success('New Event Proffessional Added', 'Jamboree.EventProfAdded');
    } 
  }

  changeStatus2(uid : any){
    if(confirm("Reject the user application?")){
      this.firestore.doc('userReq/' + uid).update({status :"declined"});
      this.toastr.success('New Event Proffessional Added', 'Jamboree.EventProfAdded');
    } 
  }


}
