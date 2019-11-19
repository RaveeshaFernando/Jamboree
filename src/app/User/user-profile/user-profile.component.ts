import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/BackendConfig/user.service";
import { User } from "src/app/BackendConfig/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Users: User[];

   constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(dataArray => {
    this.Users = dataArray.map(item =>{
      return {id : item.payload.doc.id,
      ...item.payload.doc.data()
    } as User
    })
  })


   }

}
