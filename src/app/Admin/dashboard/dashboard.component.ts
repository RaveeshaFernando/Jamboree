import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Shared/authentication.service';
import { Authentication } from 'src/app/Shared/authentication.model';
import { UserService } from "src/app/BackendConfig/user.service";
import { User } from 'src/app/BackendConfig/user.model';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  list : Authentication[];
  
  getUserList : User[] ;
  totalCount: number;
  total : number = 0 ;

  constructor(
    private users : UserService,
    private service : AuthenticationService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(actionArray =>{
    this.list = actionArray.map(item =>{
      return {
        id: item.payload.doc.id,
        ...item.payload.doc.data()
      } as Authentication
    })
    });

  //Data retrieving from firestore
  this.users.getUsers().subscribe(dataArray => {
    this.totalCount = dataArray.length;
    
    this.getUserList = dataArray.map(item =>{
      this.total ++ ;
      console.log(this.total);          
      return {id : item.payload.doc.id,
      ...item.payload.doc.data() 
      } as User  
    })
    
  })
  
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];