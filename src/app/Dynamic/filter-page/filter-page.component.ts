import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserService } from 'src/app/BackendConfig/user.service';
import { AuthService } from "../../../app/BackendConfig/auth.service";
import { User } from 'src/app/BackendConfig/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit {

  flag: Boolean
  Log: any
  getUserList : User[] ;
  filtered: User[];
  users: User[];
  id: string;


  constructor(
    
    private route: ActivatedRoute,
    private firestore : AngularFirestore,
    private authService : AuthService,
    private eRef: ElementRef,
    private router: Router
    ) {}

  ngOnInit() {

    
     //Retrieve User Data From Firestore
    this.firestore.collection('users').snapshotChanges().subscribe(dataArray => {
      this.users = dataArray.map(item =>{
        return {id : item.payload.doc.id,
        ...item.payload.doc.data() 
        } as User  
      })

      this.route.params.subscribe(params => {
        this.id = params['id'];
      })

      this.filtered = this.users;

      this.filtered = this.users.filter(item => {
        return item.userType == "Professional" ;
      
    })
   
      this.getUserList= this.filtered;
    })

  
   

    
}

      onVisitClick(){
        this.router.navigate([`DynamicUser/${this.id}`]);
        console.log(this.id);
      }
}
