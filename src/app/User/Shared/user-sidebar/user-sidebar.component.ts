import { Component, OnInit } from '@angular/core';
import { SampleUserService } from 'src/app/BackendConfig/sample-user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/BackendConfig/user.model';
import { AuthService } from "../../../BackendConfig/auth.service";

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  Users: User[];
  flag: Boolean
  Log: any
  

  constructor(private userService: SampleUserService, public authService : AuthService) { }

  ngOnInit() {
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