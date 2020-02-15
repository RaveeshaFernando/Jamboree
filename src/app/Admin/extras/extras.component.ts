import { Component, OnInit } from '@angular/core';
import { UserReqService } from "../../BackendConfig/user-req.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Requests } from "src/app/BackendConfig/user-req.model";

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent implements OnInit {

  approves : Requests[];
  declines : Requests[];

  constructor(
    private firestore : AngularFirestore, 
    private req : UserReqService
  ) { }

  ngOnInit() {
    this.req.getApproves().subscribe(actionArray =>{
      this.approves = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Requests  
      })
    })

    this.req.getDeclines().subscribe(actionArray =>{
      this.declines = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Requests  
      })
    })
  }
}
