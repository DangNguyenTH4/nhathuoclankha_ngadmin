import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellMedicineComponent } from './sell-medicine.component';
import { DialogNamePromptComponent } from './dialog/dialog-name-prompt/dialog-name-prompt.component';
import { InvoiceComponent } from './invoice/invoice.component';


const routes: Routes = [{
  path: '',
  component: SellMedicineComponent,
  children: [
    {
      path: 'smart-table',
      component: SellMedicineComponent,
    },
    {
      path: 'dialog',
      component: DialogNamePromptComponent,
    },
    {
      path: 'invoice',
      component: InvoiceComponent,
    },
    {
        path:'**',
        component: InvoiceComponent,
        // redirectTo:'',
        // pathMatch:'full'
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellMedicineRoutingModule { }

export const routedComponents = [
];
