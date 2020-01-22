import { Component, OnInit, Inject } from '@angular/core';
import { SampleUserService } from "src/app/BackendConfig/sample-user.service";
import { User } from "src/app/BackendConfig/user.model";
import { AuthService } from "./../../BackendConfig/auth.service";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Users: User[];
  flag: Boolean
  Log: any


  constructor(
    private userService: SampleUserService,
    public authService : AuthService,
    ) { }

  // openDialog() {
  //   this.dialog.open(UserProfileComponent, {
  //     data: {
  //       animal: 'panda'
  //     }
  //   })
  // }

  ngOnInit(){
    this.userService.getUsers().subscribe(dataArray => {
    this.Users = dataArray.map(item =>{
      return {id : item.payload.doc.id,
      ...item.payload.doc.data()
    } as User
    })
    })
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user
      });
    });
  }
}
