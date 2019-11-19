import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(Users => {
      console.log(Users);
      this.Users = Users;

      console.log('test test test');

    })
  }

}
