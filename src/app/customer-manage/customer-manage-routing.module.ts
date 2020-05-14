import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { CustomerManageComponent } from './customer-manage/customer-manage.component';
import { CustomerManageLayoutComponent } from './customer-manage-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerManageLayoutComponent,  // <---
    children: [
      {
        path: 'customer',
        component: CustomerManageComponent, // <---
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManageModuleRouting{

}