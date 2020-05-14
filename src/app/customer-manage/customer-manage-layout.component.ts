import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/tokenstorage.service';
import { MENU_ITEMS_ALL, MENU_ITEMS_ACCOUNTANT, MENU_ITEMS_STAFF } from './customer-manage-menu';

@Component({
  selector: 'ngx-customer-manage',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class CustomerManageLayoutComponent implements OnInit {

  menu ;
  constructor(
    private tokenStorageServce: TokenStorageService,
  ) {
    console.log("Check role");
    let role = this.tokenStorageServce.getRole();
    if(role==='ROLE_ADMIN'){
      
      this.menu=MENU_ITEMS_ALL;
    }else if (role === 'ROLE_ACCOUNTANT'){
      this.menu = MENU_ITEMS_ACCOUNTANT;
    }
    else{
      this.menu=MENU_ITEMS_STAFF;
    }
  }
  ngOnInit(): void {
   

  }

}
