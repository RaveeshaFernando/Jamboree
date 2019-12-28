import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../BackendConfig/auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  flag: Boolean

  constructor(
    public authService : AuthService
  ) { }

  ngOnInit() {
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
    });
  }

}
