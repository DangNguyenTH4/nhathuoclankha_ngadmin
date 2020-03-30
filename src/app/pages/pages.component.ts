import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS_ALL,MENU_ITEMS_STAFF } from './pages-menu';
import { TokenStorageService } from '../service/tokenstorage.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu ;
  constructor(
    private tokenStorageServce: TokenStorageService,
  ) {
    console.log("Check role");
    let role = this.tokenStorageServce.getRole();
    if(role==='ROLE_ADMIN'){
      
      this.menu=MENU_ITEMS_ALL;
    }else{
      this.menu=MENU_ITEMS_STAFF;
    }
  }
  ngOnInit(): void {
   

  }
}

