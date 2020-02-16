import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/BackendConfig/auth.service';

@Component({
  selector: 'app-prof-delete',
  templateUrl: './prof-delete.component.html',
  styleUrls: ['./prof-delete.component.scss']
})
export class ProfDeleteComponent implements OnInit {
  Log:any;
  constructor(public authService : AuthService ,) { }

  ngOnInit() {
    
   
  }

  onDelete(){
   
  }
  }
