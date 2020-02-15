import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "./../../BackendConfig/auth.service";
import { User } from "src/app/BackendConfig/user.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastrService } from 'ngx-toastr';
import { UserService } from "src/app/BackendConfig/user.service";
import { Router }  from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  Users: User[];
  flag: Boolean
  Log: any

  constructor(private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    public route:Router,) { }

  ngOnInit() {
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
      this.Log = user
      });
    });
  }


  // deleteUser(uid: number) {
    
  // }
}


