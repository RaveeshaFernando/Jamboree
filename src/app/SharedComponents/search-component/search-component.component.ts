import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {

  searchConfig = {
    ...environment.algolia,
    indexName: 'users'
  }

    showResult = false;


  constructor() { }

  searchChanged(query){
    if (query.length){
      this.showResult = true;

    }else{
      this.showResult = false;
    }
  }

  ngOnInit() {
  }

}
