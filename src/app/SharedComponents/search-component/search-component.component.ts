import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  '7417ZEQGC5',
  'bdfd22d8f11adc455b2b5869da134fd9'
);

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit  { //implements OnInit

  searchConfig = {
    indexName: 'users',
    searchClient
  }

  showResult = true;

 

  constructor() { 
    // console.log('im born');
  }
  
  searchChanged(query){
    if (query.length){
      this.showResult = true;
    }else{
      this.showResult = false;
    }
  }

  ngOnInit() {
    // console.log('initialized');


  }

  onClick() {
    // console.log("saoetuh");
     
  }
}
