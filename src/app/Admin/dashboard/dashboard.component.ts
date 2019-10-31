import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Shared/authentication.service';
import { Authentication } from 'src/app/Shared/authentication.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  list : Authentication[];
  constructor(private service : AuthenticationService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(actionArray =>{
    this.list = actionArray.map(item =>{
      return {
        id: item.payload.doc.id,
        ...item.payload.doc.data()
      } as Authentication
    })
    });
  }

}
