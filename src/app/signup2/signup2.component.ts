import { Component, OnInit } from '@angular/core';
import { AuthService } from "../BackendConfig/auth.service";

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.scss']
})
export class Signup2Component implements OnInit {

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit() {
  }
}



