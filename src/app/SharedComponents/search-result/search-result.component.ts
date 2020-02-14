import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/BackendConfig/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  id: String;
  user: User;
  router: any;
  value: string = "";
  dispalyName: string = "";

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetchUser();
    });
  }

  fetchUser() {
    if (!!this.id) {
      this.firestore.collection('users').doc(this.id.toString()).snapshotChanges().subscribe(data => {
        this.user = data.payload.data() as User;
        console.log(this.user);
      });
    }
  }
  onButtonclick(){

    let userID = this.user;
    this.router.navigate(['../Dynamic/DynamicUser/${userID[0].uid}']);
    console.log("sex");
  }

  }
  


